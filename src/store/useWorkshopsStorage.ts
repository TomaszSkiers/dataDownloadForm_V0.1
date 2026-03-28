import { create } from "zustand";
import { WORKSHOP } from "../../constants/initialData";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage } from "./idbStorage";



interface workshopsState {
  workshopsList: WORKSHOP[],
  addWorkshop: (workshop: WORKSHOP) => void,
  removeWorkshop: (id: string) => void,
  editWorkshop: (editedWorkshop: WORKSHOP) => void,
}

export const useWorkshopStore = create<workshopsState>()(
  persist(
    (set) => ({
      workshopsList: [],

      addWorkshop: (newWorkshop) =>
        set((state) => ({
          workshopsList: [...state.workshopsList, newWorkshop]
        })),

      removeWorkshop: (id) =>
        set((state) => ({
          workshopsList: state.workshopsList.filter((workshop) => workshop.id !== id)
        })),

      editWorkshop: (editedWorkshop) =>
        set((state) => ({
          workshopsList: state.workshopsList.map((workshop) => workshop.id === editedWorkshop.id ? editedWorkshop : workshop)
        })),
    }),
    {
      name: 'workshops',
      storage: createJSONStorage(() => idbStorage),
    }
  )
)

