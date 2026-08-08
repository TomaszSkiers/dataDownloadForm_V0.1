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
import { useTechniciansStore } from "@/store/useTechnicianStorage";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

//todo ======================================================================
// przeanalizować jeszcze raz ze spokojną głową
//todo ======================================================================

export default function RemoveTechnicianDialog() {
  const technicianToDelete = useTechniciansStore((s) => s.technicianToDelete);
  const closeDeleteDialog = useTechniciansStore(
    (s) => s.closeDeleteTechnicianDialog,
  );
  const removeTechnician = useTechniciansStore((s) => s.removeTechnician);

  const handleDelete = () => {
    if (!technicianToDelete) return;

    removeTechnician(technicianToDelete.id);
    toast.success(
      <>
        Technik{" "}
        <span className="font-semibold text-chart-3">
          {technicianToDelete.fullName}
        </span>{" "}
        został usunięty.
      </>,
    );
    closeDeleteDialog();
  };

  return (
    <AlertDialog
      open={Boolean(technicianToDelete)}
      onOpenChange={(open) => !open && closeDeleteDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć tego technika?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Technik zostanie usunięty z bazy
            danych.
          </AlertDialogDescription>
          <Separator className="bg-chart-10 mt-2" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel autoFocus>
            <X className="text-chart-2" />
            <span>Anuluj</span>
          </AlertDialogCancel>
          <AlertDialogAction variant={"outline"} onClick={handleDelete}>
            <Check className="text-chart-5" />
            <span>Potwierdź</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
