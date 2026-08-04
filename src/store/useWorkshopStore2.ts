import { z } from 'zod'
import { createJSONStorage, persist } from 'zustand/middleware';
import { idbStorage } from './idbStorage';
import { create } from 'zustand';

export const workshopSchema10 = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'wymagane minimun 2 znaki').max(20, 'maksymalnie możesz wpisać 20 znaków'),
  address: z.string().min(2, 'wymagane minimun 2 znaki').max(20, 'maksymalnie możesz wpisać 20 znaków'),
})

type workshop = z.infer<typeof workshopSchema10>

interface WorkshopState {
  workshopList: workshop[],
  isAddWorkshopDialogOpen: boolean

  addWorkshop: (workshop: workshop) => void,
  deleteWorkshop: (id: string) => void,
  editWorkshop: (workshop: workshop) => void,
  setIsAddWorkshopDialogOpen: (open: boolean) => void,

}

export const useWorkshopStore2 = create<WorkshopState>()(
  persist(
    (set) => ({
      isAddWorkshopDialogOpen: false,
      workshopList: [],
      addWorkshop: (newWorkshop) => set((state) => ({ workshopList: [...state.workshopList, newWorkshop] })),
      deleteWorkshop: (id) => set((state) => ({ workshopList: state.workshopList.filter((w) => w.id !== id) })),
      editWorkshop: (editedWorkshop) => set((state) => ({ workshopList: state.workshopList.map((workshop) => workshop.id === editedWorkshop.id ? editedWorkshop : workshop) })),
      setIsAddWorkshopDialogOpen: (open) => set({isAddWorkshopDialogOpen: open})
    }),
    {
      name: 'test-workshop-list-10',
      storage: createJSONStorage(() => idbStorage)
    }
  )
)