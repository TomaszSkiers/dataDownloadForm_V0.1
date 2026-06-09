import { create } from 'zustand'
import { INITIAL_VEHICLES, Vehicle } from '../../constants/initialData'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'


interface vehiclesState2 {
  vehicleList: Vehicle[];
  seedInitialData: () => void;
}

export const useVehicalStorage2 = create<vehiclesState2>()(
  persist(
    (set, get) => ({
      vehicleList: [] as Vehicle[],
      seedInitialData: () => {
        if (get().vehicleList.length === 0) {
          set({ vehicleList: INITIAL_VEHICLES })
        }
      }
    }),
    {
      name: 'testowy-magazyn-pojazdow-2',
      storage: createJSONStorage(() => idbStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.seedInitialData()
        }
      }
    },

  )
)