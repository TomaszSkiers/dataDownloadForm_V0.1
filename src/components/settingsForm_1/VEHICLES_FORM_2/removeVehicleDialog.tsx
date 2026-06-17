"use client";

import React from "react";
import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RemoveVehicleProps {
  children: React.ReactNode;
  id: string;
}

// Prosty, reużywalny komponent opakowujący dowolny przycisk triggerujący usunięcie
export function RemoveVehicleDialog({ children, id }: RemoveVehicleProps) {
  const removeVehicle = useVehicalStorage2((state) => state.removeVehicle);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy na pewno chcesz usunąć ten pojazd?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => removeVehicle(id)}
          >
            Potwierdź
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}