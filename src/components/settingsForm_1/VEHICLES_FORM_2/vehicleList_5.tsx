// =====================================================
// Main -

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilteredVehicles } from "@/customHooks/useFilteredVehicles";
import { useVehiclesStorage2 } from "@/store/useVehicleStorage2";
import { bodyType, Vehicle } from "../../../../constants/initialData";
import { Button } from "@/components/ui/button";
import { PenLine, PlusCircle, Trash2 } from "lucide-react";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import AddVehicleDialog_5 from "./addVehicleDialog_5";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { RemoveVehicleDialog_2 } from "./removeVehicleDialog_2";
import EditVehicleDialog from "./editVehicleDialog_1";
//todo =================================================
// skończyłem na przycisku dodawania pojazdu
//todo =================================================
interface VehiclesListProps {
  vehicles: Vehicle[];
}
// =====================================================
// Main
// =====================================================
export default function VehicleList_5() {
  const vehicles = useFilteredVehicles();

  return (
    <>
      <Card className="flex-1 rounded-md">
        <CardHeader>
          <CardTitle className="flex gap-0.5">
            <h2>Lista pojazdów:</h2>
            <VehicleCounter count={vehicles.length} />
          </CardTitle>
          <div className="flex justify-between">
            <SelectKindOfVehicle />
            <AddVehicleButton />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <VehiclesList vehicles={vehicles} />
        </CardContent>
      </Card>
      <AddVehicleDialog_5 />
      <RemoveVehicleDialog_2 />
      <EditVehicleDialog />
    </>
  );
}
// =====================================================
// List of vehicles Wrapper - main
// =====================================================
function VehiclesList({ vehicles }: VehiclesListProps) {
  if (vehicles.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak danych o pojazdach
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj pojazd”, aby utworzyć nowy wpis.
          </span>
        </div>
      </div>
    );
  return <VehiclesMapLoop vehicles={vehicles} />;
}
// =====================================================
// List of vehicles - .map() - loop
// =====================================================
function VehiclesMapLoop({ vehicles }: VehiclesListProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {vehicles.map((vehicle) => {
        return (
          <li key={vehicle.id}>
            <VehicleSingleRow vehicle={vehicle} />
          </li>
        );
      })}
    </ul>
  );
}
// =====================================================
// Single card of vehicle
// =====================================================
const VehicleSingleRow = React.memo(function VehicleSingleRow({
  vehicle,
}: {
  vehicle: Vehicle;
}) {
  const setVehicleToDelete = useVehicleUiStore(
    (state) => state.setVehicleToDelete,
  );
  const setVehicleToEdit = useVehicleUiStore((s) => s.setVehicleToEditNull);
  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background ">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent className="">
            {/* Lista opisowa <dl> ze wszystkimi danymi w jednakowej strukturze */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
              {/* MARKA POJAZDU */}
              <dt className="text-muted-foreground">Marka pojazdu:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {vehicle.name}
                </h3>
              </dd>

              {/* TYP POJAZDU */}
              <dt className="text-muted-foreground">Typ pojazdu:</dt>
              <dd className="font-medium">
                {vehicle.types.map((type, index) => (
                  <span
                    key={`${vehicle.id}-type-${index}`}
                    className="after:content-[',_'] last:after:content-none"
                  >
                    {type}
                  </span>
                ))}
              </dd>

              {/* KATEGORIA POJAZDU */}
              <dt className="text-muted-foreground">Kategoria pojazdu:</dt>
              <dd className="font-medium">{vehicle.category}</dd>

              {/* ID */}
              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">
                {vehicle.id}
              </dd>
            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            onClick={()=>setVehicleToEdit(vehicle)}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setVehicleToDelete(vehicle);
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

// =====================================================
// Button - ad vehicle
// =====================================================
function AddVehicleButton() {
  const openAddDialog = useVehicleUiStore((s) => s.openAddDialog);
  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={openAddDialog}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj pojazd</span>
    </Button>
  );
}

// =====================================================
// Select kind of vehicle
// =====================================================
function SelectKindOfVehicle() {
  const kindOfVehicle = useVehiclesStorage2((state) => state.activeSort);
  const setKindOfVehicle = useVehiclesStorage2((state) => state.setActiveSort);

  return (
    <Select value={kindOfVehicle} onValueChange={setKindOfVehicle}>
      <SelectTrigger className="dark:bg-background bg-background">
        <SelectValue placeholder="wybierz kategorię" />
      </SelectTrigger>
      <SelectContent position={"popper"}>
        {bodyType.map((type) => {
          return (
            <SelectItem key={type.id} value={type.bodyName}>
              {type.description}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
// =====================================================
// vehicle counter
// =====================================================
function VehicleCounter({ count }: { count: number }) {
  return <span>{count}</span>;
}
