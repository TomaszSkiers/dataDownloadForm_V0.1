/**
 * WYŚWIETLA LISTĘ TECHNIKOW URUCHAMIANY KLIKNIĘCIEM Z LEWEGO MENU
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useViewStore } from "@/store/useViewStore";

import { Technician } from "../../../../constans/initialData";
import { Button } from "@/components/ui/button";
import { techniciansMock } from "../../../../constans/initialData";
import { Trash2 } from "lucide-react";

import { ConfirmDialog } from "../confirmDialog";

export default function TechniciansList() {
  const { techniciansList, setTechnicians, removeTechnician } = useViewStore();

  return (
    <Card className="h-full ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          Lista techników
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 ">
        {techniciansList.map((tech: Technician) => (
          <div
            key={tech.id}
            className="flex justify-between border p-3 rounded-md bg-accent"
          >
            <div className="flex flex-col">
              <span>{tech.fullName}</span>
              <span>{tech.cardNumber}</span>
            </div>
            <div className="flex gap-3 items-center">
              <Button> Edytuj</Button>
              {/* PRZYCISK USUWANIA */}
              <ConfirmDialog
                title="Usuwanie technika"
                description={`Czy na pewno chcesz usunąć technika ${tech.fullName}?`}
                onConfirm={() => removeTechnician(tech.id)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </ConfirmDialog>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="flex-1"></div>
      {/* przycisk testowy */}
      <Button
        className="mx-20"
        onClick={() => {
          setTechnicians(techniciansMock);
        }}
      >
        zapisz dane testowe
      </Button>
    </Card>
  );
}
