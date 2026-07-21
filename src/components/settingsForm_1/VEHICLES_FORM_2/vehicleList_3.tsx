import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { PlusCircle } from "lucide-react";

import { useFilteredVehicles } from "@/customHooks/useFilteredVehicles";
import { useVehicalStorage2 } from "@/store/useVehicleStorage2";

import { bodyType, Vehicle } from "../../../../constants/initialData";

import AddVehicleDialog_3 from "./addVehicleDialog_3";
import { RemoveVehicleDialog_2 } from "./removeVehicleDialog_2";

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function VehicleList_3() {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);

  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const handleSelectDelete = useCallback((vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
  }, []);

  const handleCloseDeleteDialog = useCallback((open: boolean) => {
    if (!open) {
      setVehicleToDelete(null);
    }
  }, []);

  const handleOpenAddVehicle = useCallback(() => {
    setOpenAddVehicleDialog(true);
  }, []);

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex justify-between items-center">
          <SelectKindOfVehicle />

          <BtnAddVehicle showDialog={handleOpenAddVehicle} />
        </CardHeader>

        <Separator />

        <CardContent className="flex-1 relative">
          <VehicleListWrapper onSelectDelete={handleSelectDelete} />
        </CardContent>
      </Card>

      {openAddVehicleDialog && (
        <AddVehicleDialog_3
          open={openAddVehicleDialog}
          onOpenChange={setOpenAddVehicleDialog}
        />
      )}

      {vehicleToDelete && (
        <RemoveVehicleDialog_2
          id={vehicleToDelete.id}
          open={true}
          onOpenChange={handleCloseDeleteDialog}
        />
      )}
    </>
  );
}

// =====================================================
// VEHICLE LIST WRAPPER
// =====================================================

interface VehicleListWrapperProps {
  onSelectDelete: (vehicle: Vehicle) => void;
}

const VehicleListWrapper = React.memo(function VehicleListWrapper({
  onSelectDelete,
}: VehicleListWrapperProps) {
  const vehicles = useFilteredVehicles();

  return (
    <div
      className="
        absolute
        inset-0
        flex
        flex-col
        gap-3
        overflow-auto
      "
    >
      {vehicles.length === 0 ? (
        <div
          className="
            mx-auto
            text-2xl
            font-extrabold
            text-center
          "
        >
          brak danych o pojazdach
          <br />
          <span
            className="
              text-sm
              text-muted-foreground
            "
          >
            kliknij dodaj pojazd
          </span>
        </div>
      ) : (
        <VehiclesListMapWrapper
          vehicles={vehicles}
          onSelectDelete={onSelectDelete}
        />
      )}
    </div>
  );
});

VehicleListWrapper.displayName = "VehicleListWrapper";

// =====================================================
// MAP VEHICLES
// =====================================================

interface VehiclesListMapWrapperProps {
  vehicles: Vehicle[];

  onSelectDelete: (vehicle: Vehicle) => void;
}

const VehiclesListMapWrapper = React.memo(function VehiclesListMapWrapper({
  vehicles,

  onSelectDelete,
}: VehiclesListMapWrapperProps) {
  return (
    <>
      {vehicles.map((vehicle) => (
        <VehicleMapRow
          key={vehicle.id}
          vehicle={vehicle}
          onSelectDelete={onSelectDelete}
        />
      ))}
    </>
  );
});

VehiclesListMapWrapper.displayName = "VehiclesListMapWrapper";

// =====================================================
// SINGLE VEHICLE ROW
// =====================================================

interface VehicleMapRowProps {
  vehicle: Vehicle;

  onSelectDelete: (vehicle: Vehicle) => void;
}

export const VehicleMapRow = React.memo(function VehicleMapRow({
  vehicle,

  onSelectDelete,
}: VehicleMapRowProps) {
  return (
    <Card
      className="
    grid
    grid-cols-[1fr]
    md:grid-cols-[1fr_auto]
    mx-5
    bg-background
  "
    >
      <div
        className="
  flex-1
  flex
  flex-col
  justify-center
 "
      >
        <CardHeader>
          <span className="text-muted-foreground">marka pojazdu:</span>

          <span className="font-extrabold">{vehicle.name}</span>
        </CardHeader>

        <CardContent>
          <div
            className="
 flex
 items-center
 gap-2
 "
          >
            <span className="text-muted-foreground">typ pojazdu:</span>

            {vehicle.types.map((type, index) => (
              <span key={index}>{type}</span>
            ))}
          </div>

          <span className="text-muted-foreground">kategoria pojazdu:</span>

          <span>{vehicle.category}</span>

          <br />

          <span
            className="
text-xs
text-muted-foreground
"
          >
            id: {vehicle.id}
          </span>
        </CardContent>
      </div>

      <div
        className="
flex
flex-col
justify-center
gap-5
p-4
md:flex-row
"
      >
        <Button size="sm">edytuj</Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onSelectDelete(vehicle)}
        >
          Usuń
        </Button>
      </div>
    </Card>
  );
});

VehicleMapRow.displayName = "VehicleMapRow";

// =====================================================
// SELECT (Z dodanym licznikiem)
// =====================================================

function SelectKindOfVehicle() {
  const kindOfVehicle = useVehicalStorage2((state) => state.activeSort);
  const setKindOfVehicle = useVehicalStorage2((state) => state.setActiveSort);

  // Pobieramy przefiltrowaną listę i odczytujemy tylko jej długość
  const filteredVehicles = useFilteredVehicles();
  const count = filteredVehicles.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Wyświetlamy aktualny licznik */}
      <CardTitle>Lista pojazdów: {count}</CardTitle>

      <Select value={kindOfVehicle} onValueChange={setKindOfVehicle}>
        <SelectTrigger className="border border-destructive w-full">
          <SelectValue placeholder="wybierz kategorię" />
        </SelectTrigger>

        <SelectContent position="popper">
          {bodyType.map((type) => (
            <SelectItem key={type.id} value={type.bodyName}>
              {type.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// =====================================================
// ADD BUTTON
// =====================================================

interface BtnAddVehicleProps {
  showDialog: () => void;
}

const BtnAddVehicle = React.memo(function BtnAddVehicle({
  showDialog,
}: BtnAddVehicleProps) {
  return (
    <Button onClick={showDialog}>
      <PlusCircle className="text-chart-1" />

      <span>dodaj pojazd</span>
    </Button>
  );
});

BtnAddVehicle.displayName = "BtnAddVehicle";
