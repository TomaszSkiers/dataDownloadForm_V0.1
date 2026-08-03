import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useVehiclesStorage2 } from "@/store/useVehicleStorage2";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export function RemoveVehicleDialog_2() {
  const removeVehicle = useVehiclesStorage2((s) => s.removeVehicle);
  const vehicleToDelete = useVehicleUiStore((s) => s.vehicleToDelete);
  const closeDeleteDialog = useVehicleUiStore((s) => s.closeDeleteDialog);

  const handleDelete = () => {
    if (!vehicleToDelete) return;

    removeVehicle(vehicleToDelete.id);
    toast.success(
      <span>
        <span>Pojazd </span>
        <span className="font-semibold text-chart-3">
          {vehicleToDelete.name}
        </span>
        <span> został usunięty.</span>
      </span>,
    );
    closeDeleteDialog();
  };

  return (
    <AlertDialog
      open={Boolean(vehicleToDelete)}
      onOpenChange={(open) => !open && closeDeleteDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć ten pojazd?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Pojazd zostanie usunięty z bazy
            danych.
          </AlertDialogDescription>

          <Separator className="bg-chart-10 mt-2" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X color="green" />
            <span>Anuluj</span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant={"outline"}>
            <Check color="red" />
            <span>Potwierdź</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
