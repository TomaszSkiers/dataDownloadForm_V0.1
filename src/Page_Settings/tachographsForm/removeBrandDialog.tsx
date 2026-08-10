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
import { useTachographBrandsStorage } from "@/store/useTachographBrandStorage";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export default function RemoveBrandDialog() {
  const brandToDelete = useTachographBrandsStorage((s) => s.brandToDelete);
  const setBrandToDelete = useTachographBrandsStorage(
    (s) => s.setBrandToDelete,
  );
  const removeBrand = useTachographBrandsStorage((s) => s.removeBrand);

  const handleDelete = () => {
    if (!brandToDelete) return;
    removeBrand(brandToDelete.id);
    toast.success(
      <>
        Producent{" "}
        <span className="font-semibold text-chart-3">{brandToDelete.name}</span>{" "}
        został usunięty.
      </>,
    );
    setBrandToDelete(null);
  };

  return (
    <AlertDialog
      open={Boolean(brandToDelete)}
      onOpenChange={(open) => !open && setBrandToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć tego producenta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Producent{" "}
            <span className="text-chart-5 font-bold">
              {brandToDelete?.name}
            </span>{" "}
            zostanie usunięty z bazy danych.
          </AlertDialogDescription>
          <Separator className="bg-chart-10 mt-2" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel autoFocus>
            <X className="text-chart-2" />
            <span>Anuluj</span>
          </AlertDialogCancel>
          <AlertDialogAction variant="outline" onClick={handleDelete}>
            <Check className="text-chart-5" />
            <span>Potwierdź</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
