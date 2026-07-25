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
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import { RemoveVehicleDialog_2 } from "./removeVehicleDialog_2";
// import AddVehicleDialog_3 from "./addVehicleDialog_3";
import AddVehicleDialog_4 from "./addVehicleDialog_4";

// =====================================================
// Main
// =====================================================
export default function VehicleList_4() {
  const isAddDialogOpen = useVehicleUiStore((state) => state.isAddDialogOpen);
  const setOpenAddDialog = useVehicleUiStore((state) => state.setOpenAddDialog);
  const vehicleToDelete = useVehicleUiStore((state) => state.vehicleToDelete);
  const closeDeleteDialog = useVehicleUiStore(
    (state) => state.closeDeleteDialog,
  );


  return (
    <>
      <Card className="flex-1">
        <CardHeader className="gap-3">
          <CardTitle>
            <span>Lista pojazdów: </span>
            <VehiclesCounter />
          </CardTitle>
          <div className="flex justify-between">
            <SelectKindOfVehicle />
            <AddVehicleButton />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <VehiclesListStart />
        </CardContent>
      </Card>

      {/* Dialog usuwania */}
      {vehicleToDelete && (
        <RemoveVehicleDialog_2
          id={vehicleToDelete.id}
          open={Boolean(vehicleToDelete)}
          onOpenChange={(open) => !open && closeDeleteDialog()}
        />
      )}

      {/* Dialog dodawania nowego pojazdu */}
      {/* tu była popraweczka */}
        <AddVehicleDialog_4
          open={isAddDialogOpen}
          onOpenChange={setOpenAddDialog}
        />
      
    </>
  );
}

// =====================================================
// SINGLE VEHICLE ROW
// =====================================================
interface VehicleMapRowProps {
  vehicle: Vehicle;
}

function VehicleSingleRow({ vehicle }: VehicleMapRowProps) {
  const setVehicleToDelete = useVehicleUiStore(
    (state) => state.setVehicleToDelete,
  );

  return (
    <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background">
      <div className="flex-1 flex flex-col justify-center">
        <CardHeader>
          <span className="text-muted-foreground">marka pojazdu:</span>
          <span className="font-extrabold">{vehicle.name}</span>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">typ pojazdu:</span>
            {vehicle.types.map((type, index) => (
              <span key={index}>{type}</span>
            ))}
          </div>

          <span className="text-muted-foreground">kategoria pojazdu:</span>
          <span>{vehicle.category}</span>
          <br />
          <span className="text-xs text-muted-foreground">
            id: {vehicle.id}
          </span>
        </CardContent>
      </div>

      <div className="flex flex-col justify-center gap-5 p-4 md:flex-row">
        <Button size="sm">edytuj</Button>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={() => {
            // Logujemy obiekt w konsoli przeglądarki i przekazujemy go do sklepu
            console.log("Kliknięto usuń dla pojazdu:", vehicle);
            setVehicleToDelete(vehicle);
          }}
        >
          Usuń
        </Button>
      </div>
    </Card>
  );
}

// =====================================================
// vehicles list .map() wrapper
// =====================================================
function VahiclesListMapWrapper() {
  const vehicles = useFilteredVehicles();
  return (
    <>
      {vehicles.map((vehicle) => (
        <VehicleSingleRow vehicle={vehicle} key={vehicle.id} />
      ))}
    </>
  );
}

// =====================================================
// VEHICLE LIST WRAPPER
// =====================================================
function VehiclesListStart() {
  const vehicles = useFilteredVehicles();

  return (
    <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
      {vehicles.length === 0 ? (
        <div className="mx-auto text-2xl font-extrabold text-center">
          brak danych o pojazdach
          <br />
          <span className="text-sm text-muted-foreground">
            kliknij dodaj pojazd
          </span>
        </div>
      ) : (
        <VahiclesListMapWrapper />
      )}
    </div>
  );
}

// =====================================================
// AddVehicleButton - <CardHeader>
// =====================================================
function AddVehicleButton() {
  // 1. Pobieramy funkcję otwierającą ze sklepu UI
  const openAddDialog = useVehicleUiStore((state) => state.openAddDialog);

  return (
    // 2. Podpinamy ją pod onClick
    <Button type="button" onClick={openAddDialog}>
      <PlusCircle className="text-chart-1" />
      <span>dodaj pojazd</span>
    </Button>
  );
}

// =====================================================
// Select - wybierz rodzaj pojazdu - <CardHeader>
// =====================================================
function SelectKindOfVehicle() {
  const kindOfVehicle = useVehicalStorage2((state) => state.activeSort);
  const setKindOfVehicle = useVehicalStorage2((state) => state.setActiveSort);

  return (
    <Select value={kindOfVehicle} onValueChange={setKindOfVehicle}>
      <SelectTrigger>
        <SelectValue placeholder="wybierz kategorię" />
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
// Licznik pojazdów
// =====================================================
function VehiclesCounter() {
  const filteredVehiclesCounter = useFilteredVehicles().length;

  return <> {filteredVehiclesCounter}</>;
}
