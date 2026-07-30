import { create } from 'zustand'
import { Vehicle } from '../../constants/initialData'

interface VehicleUiState {
  isAddDialogOpen: boolean;
  vehicleToDelete: Vehicle | null;
 

  openAddDialog: () => void;
  closeAddDialog: () => void;
  setOpenAddDialog: (open: boolean) => void;

  setVehicleToDelete: (vehicle: Vehicle | null) => void;
  closeDeleteDialog: () => void;

  // edit ----
  isEditDialogOpen: boolean;
  closeEditDialog: () => void;
  setOpenEditDialog: (open: boolean) => void
  openEditDialog: ()=> void
}

export const useVehicleUiStore = create<VehicleUiState>((set) => ({
  isAddDialogOpen: false,
  vehicleToDelete: null,
  

  openAddDialog: () => set({ isAddDialogOpen: true }),
  closeAddDialog: () => set({ isAddDialogOpen: false }),
  // Poprawiono: dodano set()
  setOpenAddDialog: (open) => set({ isAddDialogOpen: open }),

  // Poprawiono: dodano set()
  setVehicleToDelete: (vehicle) => set({ vehicleToDelete: vehicle }),
  closeDeleteDialog: () => set({ vehicleToDelete: null }),

  // Edit dialog
  isEditDialogOpen: false,
  closeEditDialog: () => set({isEditDialogOpen: false}),
  setOpenEditDialog: (open) => set({isEditDialogOpen: open}),
  openEditDialog: () => set({isEditDialogOpen: true})
}))