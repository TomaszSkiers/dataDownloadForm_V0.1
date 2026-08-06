import { createJSONStorage, persist } from 'zustand/middleware';
import { idbStorage } from './idbStorage';
import { create } from 'zustand';
import { WORKSHOP } from '../../constants/initialData';


interface WorkshopState {
  workshopList: WORKSHOP[],
  isAddWorkshopDialogOpen: boolean
  workshopToDelete: WORKSHOP | null
  workshopToEdit: WORKSHOP | null

  addWorkshop: (workshop: WORKSHOP) => void,
  deleteWorkshop: (id: string) => void,
  editWorkshop: (workshop: WORKSHOP) => void,
  setIsAddWorkshopDialogOpen: (open: boolean) => void,
  setWorkshopToDelete: (workshop: WORKSHOP) => void,
  closeWorkshopDeleteDialog: () => void,
  setIsEditWorkshopDialogOpen: (workshop: WORKSHOP) => void,
  closeWorkshopEditDialog: () => void,
}

export const useWorkshopStore = create<WorkshopState>()(
  persist(
    (set) => ({
      isAddWorkshopDialogOpen: false,
      workshopList: [],
      workshopToDelete: null,
      workshopToEdit: null,

      addWorkshop: (newWorkshop) => set((state) => ({ workshopList: [...state.workshopList, newWorkshop] })),
      deleteWorkshop: (id) => set((state) => ({ workshopList: state.workshopList.filter((w) => w.id !== id) })),
      editWorkshop: (editedWorkshop) => set((state) => ({ workshopList: state.workshopList.map((workshop) => workshop.id === editedWorkshop.id ? editedWorkshop : workshop) })),
      setIsAddWorkshopDialogOpen: (open) => set({ isAddWorkshopDialogOpen: open }),
      setWorkshopToDelete: (workshop) => set({ workshopToDelete: workshop }),
      closeWorkshopDeleteDialog: () => set({ workshopToDelete: null }),
      setIsEditWorkshopDialogOpen: (workshop) => set({workshopToEdit: workshop}),
      closeWorkshopEditDialog: () => set({workshopToEdit: null}), 
    }),
    {
      name: 'test-workshop-list-10',
      storage: createJSONStorage(() => idbStorage)
    }
  )
)