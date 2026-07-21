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
import { useVehicalStorage2 } from "@/store/useVehicleStorage2"; // dostosuj ścieżkę do swojego sklepu

// 1. Zaktualizowany interfejs propów
interface RemoveVehicleProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveVehicleDialog_2({
  id,
  open,
  onOpenChange,
}: RemoveVehicleProps) {
  // Pobieramy funkcję do usuwania ze stoiska Zustand
  const removeVehicle = useVehicalStorage2((s) => s.removeVehicle); // dostosuj nazwę metody

  const handleDelete = () => {
    removeVehicle(id);
    onOpenChange(false); // zamykamy dialog po usunięciu
  };

  return (
    // 2. Przekazujemy open i onOpenChange bezpośrednio do AlertDialog
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy na pewno chcesz usunąć ten pojazd?</AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Pojazd zostanie usunięty z bazy danych.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Potwierdź
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}