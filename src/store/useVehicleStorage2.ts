import { create } from 'zustand'
import { INITIAL_VEHICLES, Vehicle } from '../../constants/initialData'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'



interface vehiclesState2 {
  vehicleList: Vehicle[];
  seedInitialData: () => void;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: string) => void;
  updateVehicle: (id: string, updatedVehicle: Vehicle) => void;
  // === sortowanie =====================
  activeSort: string;
  setActiveSort: (vehicleKind: string) => void,
  sortedVehicles: Vehicle[]
}

export const useVehicalStorage2 = create<vehiclesState2>()(
  persist(
    (set, get) => ({
      vehicleList: [] as Vehicle[],
      seedInitialData: () => {
        if (get().vehicleList.length === 0) {
          set({ vehicleList: INITIAL_VEHICLES })
        }
      },
      addVehicle: (vehicle)=> set((state) => ({vehicleList: [...state.vehicleList, vehicle]})),
      removeVehicle: (id) => {set((state) => ({vehicleList: state.vehicleList.filter((vehicle) => vehicle.id !== id)}))},
      updateVehicle: (id, updatedVehicle) => set((state) => ({vehicleList: state.vehicleList.map((vehicle) => vehicle.id === id ? updatedVehicle : vehicle)})),

// === sortowanie ===============================================================================================================================================
      activeSort: 'truck',
      setActiveSort: (vehKind) => set(() => ({activeSort: vehKind})),
      sortedVehicles: [], //* ? - czy to jest potrzebne? 
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