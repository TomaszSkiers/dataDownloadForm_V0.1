/**
 * store do obsługi pojazdów
 * vehicles service store
 ** this store is good but I will make it again for practice
 */

import { create } from 'zustand'
import { INITIAL_VEHICLES, Vehicle } from '../../constants/initialData'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'



interface vehiclesState {
  vehiclesList: Vehicle[],
  addVehicles: (list: Vehicle[]) => void,
  seedInitialData: () => void,
  addVehicle: (vehicle: Vehicle) => void,
  deleteVehicle: (id: string) => void,
}

export const useVehiclesStorage = create<vehiclesState>()(
  persist(
    (set, get) => ({
      vehiclesList: [] as Vehicle[],
      addVehicles: (list) => set({ vehiclesList: list }),
      addVehicle: (vehicle) =>
        set((state) => ({
          vehiclesList: [...state.vehiclesList, vehicle]
        })),
      seedInitialData: () => {
        if (get().vehiclesList.length === 0) {
          set({ vehiclesList: INITIAL_VEHICLES })
        }
      },

      deleteVehicle: (id) => {
        set((state) => ({
          vehiclesList: state.vehiclesList.filter((vehicle) => vehicle.id !== id)
        }))
      },

    }),
    {
      name: 'testowy-magazyn-pojazdow',
      storage: createJSONStorage(() => idbStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.seedInitialData()
        }
      }
    }
  )
)