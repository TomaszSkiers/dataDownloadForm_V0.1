import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'
import { IKindOfData, KIND_OF_DATA } from '../../constants/kindsOfData'


interface KindOfDataStorage {
  kindOfDataList: IKindOfData[]
  isSeeded: boolean
  kindToDelete: IKindOfData | null
  kindToEdit: IKindOfData | null
  isAddKindDialogOpen: boolean
  seedInitialData: () => void
  setKindToDelete: (kind: IKindOfData | null) => void
  setKindToEdit: (kind: IKindOfData | null) => void
  setIsAddKindDialogOpen: (open: boolean) => void
  addKind: (kind: IKindOfData) => void
  removeKind: (id: string) => void
  editKind: (updated: IKindOfData) => void
}

export const useKindOfDataStorage = create<KindOfDataStorage>()(
  persist(
    (set, get): KindOfDataStorage => ({
      kindOfDataList: [],
      isSeeded: false,
      kindToDelete: null,
      kindToEdit: null,
      isAddKindDialogOpen: false,

      seedInitialData: () => {
        if (!get().isSeeded) {
          set({ kindOfDataList: KIND_OF_DATA, isSeeded: true })
        }
      },

      setKindToDelete: (kind) => set({ kindToDelete: kind }),
      setKindToEdit: (kind) => set({ kindToEdit: kind }),
      setIsAddKindDialogOpen: (open) => set({ isAddKindDialogOpen: open }),

      addKind: (kind) =>
        set({ kindOfDataList: [...get().kindOfDataList, kind] }),

      removeKind: (id) =>
        set({ kindOfDataList: get().kindOfDataList.filter((k) => k.id !== id) }),

      editKind: (updated) =>
        set({
          kindOfDataList: get().kindOfDataList.map((k) =>
            k.id === updated.id ? updated : k
          ),
        }),
    }),
    {
      name: 'kind-of-data-storage',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        kindOfDataList: state.kindOfDataList,
        isSeeded: state.isSeeded,
      }),
      onRehydrateStorage: () => {
        return (stateAfter, error) => {
          if (error) {
            console.error('[kind-of-data-storage] błąd hydration:', error)
            stateAfter?.seedInitialData()
            return
          }
          stateAfter?.seedInitialData()
        }
      },
    },
  ),
)