/**
 * WYŚWIETLA LISTĘ TECHNIKOW URUCHAMIANY KLIKNIĘCIEM Z LEWEGO MENU
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useViewStore } from "@/store/useViewStore";

import { Technician } from "../../../../constans/initialData";
import { Button } from "@/components/ui/button";
import { techniciansMock } from "../../../../constans/initialData";
import { Edit2, Trash2 } from "lucide-react";

import { ConfirmDialog } from "../confirmDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TechnicianForm } from "./addTechnician";
import { useState } from "react";

export default function TechniciansList() {
  const { techniciansList, setTechnicians, removeTechnician } = useViewStore();

  // Przechowujemy cały obiekt technika, którego edytujemy
  const [editingTechnician, setEditingTechnician] = useState<Technician | null>(
    null,
  );
  // Nowy stan dla modala dodawania
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card className="h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Lista techników</CardTitle>

        {/* PRZYCISK DODAWANIA */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="px-4">
              + Dodaj technika
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader >
              <DialogTitle>Nowy pracownik</DialogTitle>
              {/* <DialogDescription>
                Wprowadź dane nowego technika, aby dodać go do systemu.
              </DialogDescription> */}
            </DialogHeader>

            <TechnicianForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {techniciansList.map((tech: Technician) => (
          <div
            key={tech.id}
            className="flex justify-between border p-3 rounded-md "
          >
            <div className="flex flex-col">
              <span>{tech.fullName}</span>
              <span className="text-sm text-muted-foreground">
                {tech.cardNumber}
              </span>
            </div>

            <div className="flex gap-3 items-center">
              {/* Przycisk tylko ustawia technika w stanie */}
              <Button
                variant="ghost"
                size="icon"
                className="border hover:text-chart-1"
                onClick={() => setEditingTechnician(tech)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>

              <ConfirmDialog
                title="Usuwanie technika"
                description={`Czy na pewno chcesz usunąć technika ${tech.fullName}?`}
                onConfirm={() => removeTechnician(tech.id)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="border hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </ConfirmDialog>
            </div>
          </div>
        ))}
      </CardContent>

      {/* JEDEN MODAL DLA WSZYSTKICH - poza pętlą */}
      <Dialog
        open={!!editingTechnician}
        onOpenChange={(open) => !open && setEditingTechnician(null)}
      >
        <DialogContent>
          <DialogTitle>Edytuj Technika</DialogTitle>
          {editingTechnician && (
            <TechnicianForm
              key={editingTechnician.id} // Klucz zapewnia reset formularza
              initialData={editingTechnician}
              onSuccess={() => setEditingTechnician(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="flex-1"></div>

      <Button
        className="mx-20 mb-4"
        onClick={() => setTechnicians(techniciansMock)}
      >
        Zapisz dane testowe
      </Button>
    </Card>
  );
}
