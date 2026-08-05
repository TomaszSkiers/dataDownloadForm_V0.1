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
import { useWorkshopStore2 } from "@/store/useWorkshopStore2";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

export default function RemoveWorkshopDialog() {
  const workshopToDelete = useWorkshopStore2((s) => s.workshopToDelete);
  const closeDeleteDialog = useWorkshopStore2(
    (s) => s.closeWorkshopDeleteDialog,
  );
  const removeWorkshop = useWorkshopStore2((s) => s.deleteWorkshop);

  const handleDelete = () => {
    if (!workshopToDelete) return;

    removeWorkshop(workshopToDelete.id);
    toast.success(
      <>
        <span>Punkt </span>
        <span className="font-semibold text-chart-3">
          {workshopToDelete.name}
        </span>
        <span> został usunięty.</span>
      </>,
    );
    closeDeleteDialog();
  };
  return (
    <AlertDialog
      open={Boolean(workshopToDelete)}
      onOpenChange={(open) => !open && closeDeleteDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć ten punkt?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Punkt zostanie usunięty z bazy
            danych.
          </AlertDialogDescription>
          <Separator className="bg-chart-10 mt-2" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel autoFocus>
            <X className="text-chart-2" />
            <span>Anuluj</span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant={"outline"}>
            <Check className="text-chart-5" />
            <span>Potwierdź</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
