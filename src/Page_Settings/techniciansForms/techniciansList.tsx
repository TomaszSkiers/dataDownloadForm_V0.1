import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTechniciansStore } from "@/store/useTechnicianStorage";
import { PenLine, PlusCircle, Trash2 } from "lucide-react";
import { Technician } from "../../../constants/initialData";
import React from "react";
import AddTechnicianDialog from "./addTechnician";
import RemoveTechnicianDialog from "./removeTechnician";

//todo ===============================================================

//* robię addTechnicianDialog
//todo ===============================================================

// =====================================================
// Main
// =====================================================
export default function TechniciansList() {
  return (
    <>
      <Card className="flex-1 rounded-md ">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h2>Lista techników</h2>
          </CardTitle>
          <AddTechnicianButton />
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <ListMain />{" "}
        </CardContent>
      </Card>
      <AddTechnicianDialog />
      <RemoveTechnicianDialog />
    </>
  );
}
// =====================================================
// List - main
// =====================================================
function ListMain() {
  const technicians = useTechniciansStore((s) => s.technicianList);
  if (technicians.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center">
        <span className="text-2xl font-extrabold">
          Brak danych o technikach.
        </span>
        <span className="text-sm text-muted-foreground">
          Kliknij Dodaj „Dodaj technika”, aby utworzyć nowy wpis.
        </span>
      </div>
    );
  return <ListMapLoop technicians={technicians} />;
}
// =====================================================
// List of vehicles - .map() - loop
// =====================================================
interface ListMapProps {
  technicians: Technician[];
}
function ListMapLoop({ technicians }: ListMapProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {technicians.map((technic) => (
        <li key={technic.id}>
          <TechnicianSingleRow technician={technic} />
        </li>
      ))}
    </ul>
  );
}
// =====================================================
// Add technician Button - header
// =====================================================
function AddTechnicianButton() {
  const openAddDialog = useTechniciansStore((s) => s.addDialogOnOpenChange);
  return (
    <Button
      type="button"
      variant={"outline"}
      className="bg-background dark:bg-background"
      onClick={() => {
        openAddDialog(true);
      }}
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj technika</span>
    </Button>
  );
}
// =====================================================
// Single card of vehicle
// =====================================================
const TechnicianSingleRow = React.memo(function TechnicianSingleRow({
  technician,
}: {
  technician: Technician;
}) {

  const setTechnicianToDelete = useTechniciansStore(s => s.setTechnicianToDelete)

  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background ">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent className="">
            {/* Lista opisowa <dl> ze wszystkimi danymi w jednakowej strukturze */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
              {/* IMIĘ I NAZWISKO */}
              <dt className="text-muted-foreground">Imię i nazwisko:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {technician.fullName}
                </h3>
              </dd>

              {/* NR KARTY WARSZTATOWEJ*/}
              <dt className="text-muted-foreground">Nr karty warsztatowej:</dt>
              <dd className="font-medium">{technician.cardNumber}</dd>

              {/* ID */}
              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">
                {technician.id}
              </dd>
            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            // onClick={() => setVehicleToEdit(vehicle)}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setTechnicianToDelete(technician)
            }}
            className="dark:bg-background"
          >
            <Trash2 className="text-chart-5" />
            <span>Usuń</span>
          </Button>
        </div>
      </Card>
    </article>
  );
});
