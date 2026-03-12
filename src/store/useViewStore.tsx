import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { Technician, TechnicianSchema } from '../../constans/initialData';


// Pomocnik do obsługi asynchronicznego IndexedDB
// Konfiguracja IndexedDB z bezpiecznym typowaniem
const idbStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await get(name);
    return value || null;
  },
  setItem: async (name: string, value: unknown): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface ViewState {
  activeView: string;
  techniciansList: Technician[];
  setActiveView: (view: string) => void;
  setTechnicians: (technicians: Technician[]) => void; // Zostawiamy do testów
  addTechnician: (technician: Technician) => void;
  updateTechnician: (technician: Technician) => void;
  removeTechnician: (id: string) => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      activeView: 'power',
      techniciansList: [],

      setActiveView: (view) => set({ activeView: view }),
      setTechnicians: (list) => set({ techniciansList: list }),
      
      addTechnician: (newTech) => set((state) => ({
        techniciansList: [...state.techniciansList, newTech]
      })),

      updateTechnician: (updatedTech) => set((state) => ({
        techniciansList: state.techniciansList.map((t) => t.id === updatedTech.id ? updatedTech : t)
      })),

      removeTechnician: (id) => set((state) => ({
        techniciansList: state.techniciansList.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'workshop-technicians-storage',
      storage: createJSONStorage(() => idbStorage),
      
      // TA CZĘŚĆ ZABEZPIECZA PRZED ŚMIECIAMI:
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Walidujemy całą listę zebraną z bazy
          const validatedList = state.techniciansList.filter((tech) => {
            const result = TechnicianSchema.safeParse(tech);
            if (!result.success) {
              console.error("Wykryto uszkodzone dane technika, pomijam:", result.error);
              return false; // Usuwa rekord z widoku, jeśli jest błędny
            }
            return true;
          });
          
          // Nadpisujemy stan tylko "czystymi" danymi
          state.techniciansList = validatedList;
        }
      },
      
      partialize: (state): Pick<ViewState, 'techniciansList'> => ({ 
        techniciansList: state.techniciansList 
      }),
    }
  )
);