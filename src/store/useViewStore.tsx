import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { Technician, TechnicianSchema } from "../../constans/initialData";

// Pomocnik do obsługi asynchronicznego IndexedDB
// Konfiguracja IndexedDB z bezpiecznym typowaniem
const idbStorage = {
  async getItem(name: string): Promise<string | null> {
    const value = await get<string>(name);
    return value ?? null;
  },

  async setItem(name: string, value: string): Promise<void> {
    await set(name, value);
  },

  async removeItem(name: string): Promise<void> {
    await del(name);
  },
};

interface ViewState {
  activeView: string;
  techniciansList: Technician[];
  setActiveView: (view: string) => void;
  setTechnicians: (technicians: Technician[]) => void; // Zostawiam do testów
  addTechnician: (technician: Technician) => void;
  updateTechnician: (technician: Technician) => void;
  removeTechnician: (id: string) => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      activeView: "power",
      techniciansList: [],

      setActiveView: (view) => set({ activeView: view }),
      setTechnicians: (list) => set({ techniciansList: list }),

      addTechnician: (newTech) =>
        set((state) => ({
          techniciansList: [...state.techniciansList, newTech],
        })),

      updateTechnician: (updatedTech) =>
        set((state) => ({
          techniciansList: state.techniciansList.map((t) =>
            t.id === updatedTech.id ? updatedTech : t,
          ),
        })),

      removeTechnician: (id) =>
        set((state) => ({
          techniciansList: state.techniciansList.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "workshop-technicians-storage",
      storage: createJSONStorage(() => idbStorage),

      // TA CZĘŚĆ ZABEZPIECZA PRZED ŚMIECIAMI:
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Błąd podczas odtwarzania stanu:", error);
          return;
        }

        if (state) {
          // Walidujemy całą listę zebraną z bazy
          const validatedList = state.techniciansList.filter((tech) => {
            const result = TechnicianSchema.safeParse(tech);
            if (!result.success) {
              console.error(
                "Wykryto uszkodzone dane technika, pomijam:",
                result.error,
              );
              return false;
            }
            return true;
          });

          // Jeśli usunęliśmy jakieś śmieci, aktualizujemy stan przez dedykowaną akcję
          if (validatedList.length !== state.techniciansList.length) {
            console.log(
              `🧹 Usunięto ${state.techniciansList.length - validatedList.length} uszkodzonych rekordów`,
            );

            // ✅ POPRAWNIE: używamy akcji setTechnicians do aktualizacji stanu
            useViewStore.getState().setTechnicians(validatedList);

            // persist SAM automatycznie zapisze do IndexedDB!
          }
        }
      },

      partialize: (state): Pick<ViewState, "techniciansList"> => ({
        techniciansList: state.techniciansList,
      }),
    },
  ),
);
