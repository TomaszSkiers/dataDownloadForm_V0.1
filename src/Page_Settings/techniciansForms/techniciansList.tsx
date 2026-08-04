/**
 * WYŚWIETLA LISTĘ TECHNIKOW URUCHAMIANY KLIKNIĘCIEM Z LEWEGO MENU
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Technician } from "../../../constants/initialData";
import { Button } from "@/components/ui/button";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
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
import { useTechniciansStore } from "@/store/useTechnicianStorage";

export default function TechniciansList() {
  const techniciansList = useTechniciansStore((store) => store.technicianList);
  const removeTechnician = useTechniciansStore(
    (store) => store.removeTechnician,
  );

  // Przechowujemy cały obiekt technika, którego edytujemy
  const [editingTechnician, setEditingTechnician] = useState<Technician | null>(
    null,
  );
  // Nowy stan dla modala dodawania
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card className="flex-1 rounded-none ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Lista techników</CardTitle>

        {/* PRZYCISK DODAWANIA */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="px-4">
              <PlusCircle className="" />{" "}
              <span className="hidden sm:block">dodaj technika</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Nowy pracownik</DialogTitle>
            </DialogHeader>

            <TechnicianForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="flex flex-col gap-3  top-20 bottom-5 overflow-y-auto">
        {techniciansList.map((tech: Technician) => (
          <div
            key={tech.id}
            className="flex justify-between border p-3 rounded-md bg-background"
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
          <DialogDescription></DialogDescription>
          {editingTechnician && (
            <TechnicianForm
              key={editingTechnician.id} // Klucz zapewnia reset formularza
              initialData={editingTechnician}
              onSuccess={() => setEditingTechnician(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
