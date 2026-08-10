import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { idbStorage } from './idbStorage'
import { IReasonDownload, REASONS_DOWNLOAD } from '../../constants/downloadReasons'

interface ReasonsStorage {
  reasonsList: IReasonDownload[]
  isSeeded: boolean
  reasonToDelete: IReasonDownload | null
  reasonToEdit: IReasonDownload | null
  isAddReasonDialogOpen: boolean
  seedInitialData: () => void
  setReasonToDelete: (reason: IReasonDownload | null) => void
  setReasonToEdit: (reason: IReasonDownload | null) => void
  setIsAddReasonDialogOpen: (open: boolean) => void
  addReason: (reason: IReasonDownload) => void
  removeReason: (id: string) => void
  editReason: (updated: IReasonDownload) => void
}

export const useReasonStorage = create<ReasonsStorage>()(
  persist(
    (set, get): ReasonsStorage => ({
      reasonsList: [],
      isSeeded: false,
      reasonToDelete: null,
      reasonToEdit: null,
      isAddReasonDialogOpen: false,

      seedInitialData: () => {
        if (!get().isSeeded) {
          set({ reasonsList: REASONS_DOWNLOAD, isSeeded: true })
        }
      },

      setReasonToDelete: (reason) => set({ reasonToDelete: reason }),
      setReasonToEdit: (reason) => set({ reasonToEdit: reason }),
      setIsAddReasonDialogOpen: (open) => set({ isAddReasonDialogOpen: open }),

      addReason: (reason) =>
        set({ reasonsList: [...get().reasonsList, reason] }),

      removeReason: (id) =>
        set({ reasonsList: get().reasonsList.filter((r) => r.id !== id) }),

      editReason: (updated) =>
        set({
          reasonsList: get().reasonsList.map((r) =>
            r.id === updated.id ? updated : r
          ),
        }),
    }),
    {
      name: 'reasons-storage',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      // UI state nie powinno być persystowane
      partialize: (state) => ({
        reasonsList: state.reasonsList,
        isSeeded: state.isSeeded,
      }),
      onRehydrateStorage: () => {
        return (stateAfter, error) => {
          if (error) {
            console.error('[reasons-storage] błąd hydration:', error)
            stateAfter?.seedInitialData()
            return
          }
          stateAfter?.seedInitialData()
        }
      },
    },
  ),
)