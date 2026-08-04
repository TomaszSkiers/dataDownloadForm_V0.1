import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useWorkshopStore2 } from "@/store/useWorkshopStore2";
import { PenLine, PlusCircle, Trash2 } from "lucide-react";
import { WORKSHOP } from "../../../constants/initialData";
import React from "react";
import AddWorkshopDialog_3 from "./addWorkshopDialog";

//todo ==================================================
//* robię dialog dodaj punkt
//todo ==================================================

interface WorkshopsListProps {
  workshopsList: WORKSHOP[];
}

export default function WorkshopList_3() {
  const workshopList = useWorkshopStore2((s) => s.workshopList);

  return (
    <>
      <Card className="flex-1 rounded-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h2>Lista punktów serwisowych</h2>
          </CardTitle>
          <AddWorkshop />
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <WorkshopsListMain workshopsList={workshopList} />
        </CardContent>
      </Card>
      <AddWorkshopDialog_3 />
    </>
  );
}
// =====================================================
// List of workshops wrapper - main
// =====================================================
function WorkshopsListMain({ workshopsList }: WorkshopsListProps) {
  if (workshopsList.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak danych o punktach serwisowych
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj punkt”, aby utworzyć nowy wpis.
          </span>
        </div>
      </div>
    );
  return <WorkshopsMapLoop workshopsList={workshopsList} />;
}
// =====================================================
// List of workshops - .map() - loop
// =====================================================
function WorkshopsMapLoop({ workshopsList }: WorkshopsListProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {workshopsList.map((workshop) => (
        <li key={workshop.id}>
          <WorkshopSingleRow workshop={workshop} />
        </li>
      ))}
    </ul>
  );
}
// =====================================================
// Single card of workshop
// =====================================================
interface WorkshopSingleRowProps {
  workshop: WORKSHOP;
}
const WorkshopSingleRow = React.memo(function WorkshopSingleRow({
  workshop,
}: WorkshopSingleRowProps) {
  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background ">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent className="">
            {/* Lista opisowa <dl> ze wszystkimi danymi w jednakowej strukturze */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
              {/* NAZWA WARSZTATU */}
              <dt className="text-muted-foreground">Nazwa warsztatu:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {workshop.name}
                </h3>
              </dd>

              {/* ADRES WARSZTATU */}
              <dt className="text-muted-foreground">Adres warsztatu:</dt>
              <dd className="font-medium">{workshop.address}</dd>

              {/* ID */}
              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">
                {workshop.id}
              </dd>
            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            // onClick={() => {onOpenChange(true)}}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            // onClick={() => {
            //   setVehicleToDelete(vehicle);
            // }}
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

// =====================================================
// Button add workshop
// =====================================================
function AddWorkshop() {
  const onOpenChange = useWorkshopStore2((s) => s.setIsAddWorkshopDialogOpen);
  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={() => {
        onOpenChange(true);
      }}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj punkt</span>
    </Button>
  );
}
