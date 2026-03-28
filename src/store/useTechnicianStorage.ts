/**
 * store do obsługi techników
 */



import { create } from 'zustand'
import { Technician, TechnicianSchema } from '../../constants/initialData'
import { persist, createJSONStorage } from 'zustand/middleware'
import { idbStorage } from './idbStorage'


interface techniciansState {
  technicianList: Technician[],
  addTechnician: (technician: Technician) => void,
  removeTechnician: (id: string) => void,
  updateTechnician: (technician: Technician) => void,
  setTechnicians: (list: Technician[]) => void,
}

export const useTechniciansStore = create<techniciansState>()(

  persist(
    (set) => ({
      technicianList: [],

      // functions
      addTechnician: (newTechnician) =>
        set((state) => ({
          technicianList: [...state.technicianList, newTechnician]
        })),

      removeTechnician: (id) =>
        set((state) => ({
          technicianList: state.technicianList.filter(t => t.id !== id)
        })),

      updateTechnician: (updTech) =>
        set((state) => ({
          technicianList: state.technicianList.map((tech) => tech.id === updTech.id ? updTech : tech)
        })),

      setTechnicians: (list) => set({ technicianList: list })

    }),
    {
      name: 'testowy-magazyn-technikow',
      storage: createJSONStorage(() => idbStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('błąd podczas ładownia techników z bazy danych')
          return
        }
        if (state) {
          console.log('dane techników dotarły z bazy. Rozpoczynam inspekcję...')

          // biorę dane z bazy danych i filtruję
          const validatedList = state.technicianList.filter((tech) => {
            const result = TechnicianSchema.safeParse(tech)
            if (!result.success) {
              console.error('wykryto uszkodzony rekord technika - pomijamy go')
              return false //wyrzucamy go
            }
            return true
          })
          if (validatedList.length !== state.technicianList.length) {
            console.warn(`Uxunięto ${state.technicianList.length - validatedList.length} błędnych rekordów`)
            state.setTechnicians(validatedList)
          }
        }
      }
    }
  )

)