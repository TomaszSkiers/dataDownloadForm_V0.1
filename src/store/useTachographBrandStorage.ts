import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'
import { TachographBrand, TACHOGRAPHS_BRANDS } from '../../constants/tachographBrands'

interface TachographBrandsStorage {
  brandsList: TachographBrand[]
  isSeeded: boolean
  brandToDelete: TachographBrand | null
  brandToEdit: TachographBrand | null
  isAddBrandDialogOpen: boolean
  seedInitialData: () => void
  setBrandToDelete: (brand: TachographBrand | null) => void
  setBrandToEdit: (brand: TachographBrand | null) => void
  setIsAddBrandDialogOpen: (open: boolean) => void
  addBrand: (brand: TachographBrand) => void
  removeBrand: (id: string) => void
  editBrand: (updated: TachographBrand) => void
}

export const useTachographBrandsStorage = create<TachographBrandsStorage>()(
  persist(
    (set, get): TachographBrandsStorage => ({
      brandsList: [],
      isSeeded: false,
      brandToDelete: null,
      brandToEdit: null,
      isAddBrandDialogOpen: false,

      seedInitialData: () => {
        if (!get().isSeeded) {
          set({ brandsList: [...TACHOGRAPHS_BRANDS], isSeeded: true })
        }
      },

      setBrandToDelete: (brand) => set({ brandToDelete: brand }),
      setBrandToEdit: (brand) => set({ brandToEdit: brand }),
      setIsAddBrandDialogOpen: (open) => set({ isAddBrandDialogOpen: open }),

      addBrand: (brand) =>
        set({ brandsList: [...get().brandsList, brand] }),

      removeBrand: (id) =>
        set({ brandsList: get().brandsList.filter((b) => b.id !== id) }),

      editBrand: (updated) =>
        set({
          brandsList: get().brandsList.map((b) =>
            b.id === updated.id ? updated : b
          ),
        }),
    }),
    {
      name: 'tachograph-brands-storage',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        brandsList: state.brandsList,
        isSeeded: state.isSeeded,
      }),
      onRehydrateStorage: () => {
        return (stateAfter, error) => {
          if (error) {
            console.error('[tachograph-brands-storage] błąd hydration:', error)
            stateAfter?.seedInitialData()
            return
          }
          stateAfter?.seedInitialData()
        }
      },
    },
  ),
)