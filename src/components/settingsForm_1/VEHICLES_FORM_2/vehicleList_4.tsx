import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilteredVehicles } from "@/customHooks/useFilteredVehicles";
import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { bodyType, Vehicle } from "../../../../constants/initialData";
import { Button } from "@/components/ui/button";
import { PenLine, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import { RemoveVehicleDialog_2 } from "./removeVehicleDialog_2";
import AddVehicleDialog_5 from "./addVehicleDialog_5";
import { memo } from "react";
import EditVehicleDialog from "./editVehicleDialog_1";

//todo =================================================
//* przepisać
//todo =================================================

// =====================================================
// TYPY DLA PROPSÓW
// =====================================================
interface VehiclesListProps {
  vehicles: Vehicle[];
}

interface VehiclesCounterProps {
  count: number;
}

// =====================================================
// Główny komponent widoku listy pojazdów
// =====================================================
export default function VehicleList_4() {
  // Wywołujemy hooka tylko raz, na najwyższym poziomie
  const vehicles = useFilteredVehicles();

  return (
    <>
      <Card className="flex-1 rounded-md ">
        <CardHeader className="gap-3">
          <CardTitle className="flex gap-0.5">
            <h2>Lista pojazdów:</h2>
            <VehiclesCounter count={vehicles.length} />
          </CardTitle>
          <div className="flex justify-between">
            <SelectKindOfVehicle />
            <AddVehicleButton />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <VehiclesListStart vehicles={vehicles} />
        </CardContent>
      </Card>

      {/* Dialog usuwania pojazdu */}
      <RemoveVehicleDialog_2 />

      {/* Dialog dodawania nowego pojazdu */}
      <AddVehicleDialog_5 />

      {/* Dialog edytowania pojazdu */}
      <EditVehicleDialog />
    </>
  );
}

// =====================================================
// Pojedyncza karta pojazdu (Semantyczny <article> + <dl>)
// =====================================================
interface VehicleMapRowProps {
  vehicle: Vehicle;
}

const VehicleSingleRow = memo(function VehicleSingleRow({
  vehicle,
}: VehicleMapRowProps) {
  const setVehicleToDelete = useVehicleUiStore(
    (state) => state.setVehicleToDelete,
  );
  const openEditDialog = useVehicleUiStore((s) => s.openEditDialog);

  return (
    // <article> tworzy samodzielny, semantyczny blok dla pojedynczego wpisu
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

        {/* Akcje dla wybranego pojazdu */}
        {/* dołożyc ikony i przyciski zrobić na outline */}
        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            onClick={openEditDialog}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              // console.log("Kliknięto usuń dla pojazdu:", vehicle);
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
// Semantyczne mapowanie listy (pętla ul -> li)
// =====================================================
function VehiclesListMapWrapper({ vehicles }: VehiclesListProps) {
  return (
    // Używamy natywnego znacznika <ul> wyzerowanego z domyślnego stylowania listy
    <ul className="flex flex-col gap-3 p-0 m-0 list-none">
      {vehicles.map((vehicle) => (
        // Każdy element pętli otaczamy znacznikiem <li>
        <li key={vehicle.id}>
          <VehicleSingleRow vehicle={vehicle} />
        </li>
      ))}
    </ul>
  );
}

// =====================================================
// Kontener listy pojazdów (obsługa pustego stanu)
// =====================================================
function VehiclesListStart({ vehicles }: VehiclesListProps) {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
      {vehicles.length === 0 ? (
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak danych o pojazdach
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj pojazd”, aby utworzyć nowy wpis.
          </span>
        </div>
      ) : (
        <VehiclesListMapWrapper vehicles={vehicles} />
      )}
    </div>
  );
}

// =====================================================
// Przycisk dodawania nowego pojazdu
// =====================================================
function AddVehicleButton() {
  const openAddDialog = useVehicleUiStore((state) => state.openAddDialog);

  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={openAddDialog}
      className="dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj pojazd</span>
    </Button>
  );
}

// =====================================================
// Select filtrujący rodzaj pojazdu
// =====================================================
function SelectKindOfVehicle() {
  const kindOfVehicle = useVehicalStorage2((state) => state.activeSort);
  const setKindOfVehicle = useVehicalStorage2((state) => state.setActiveSort);

  return (
    <Select value={kindOfVehicle} onValueChange={setKindOfVehicle}>
      <SelectTrigger className="dark:bg-background">
        <SelectValue placeholder="Wybierz kategorię" />
      </SelectTrigger>
      <SelectContent position={"popper"}>
        {bodyType.map((type) => (
          <SelectItem key={type.id} value={type.bodyName}>
            {type.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// =====================================================
// Licznik skompresowany w funkcji
// =====================================================
function VehiclesCounter({ count }: VehiclesCounterProps) {
  return <span>{count}</span>;
}
