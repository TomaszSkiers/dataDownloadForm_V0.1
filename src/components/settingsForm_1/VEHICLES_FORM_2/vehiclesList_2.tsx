"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { Truck, Fuel, Calendar, Info, Badge, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function VehiclesList2() {
  const vehiclesList = useVehicalStorage2((state) => state.vehicleList);

  return (
    <Card className="flex-1 rounded-none border-b-0 sm:border-b ">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Lista pojazdów</CardTitle>
        <Button>
          <PlusCircle className="text-chart-7"></PlusCircle>
          <span>dodaj pojazd</span>
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 relative">
        <div className=" absolute inset-0 flex flex-col gap-3 overflow-auto">
          {vehiclesList.length === 0 ? (
            <div className="mx-auto text-2xl font-extrabold text-center">
              brak danych o pojazdach <br />
              <span className="text-sm">kliknij dodaj pojazd</span>
            </div>
          ) : (
            vehiclesList.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background"
              >
                <div className=" flex-1 flex flex-col justify-center">
                  <CardHeader className="flex">
                    <span className="text-muted-foreground">
                      marka pojazdu:{" "}
                    </span>
                    <span className="font-extrabold">{vehicle.name}</span>
                  </CardHeader>
                  <CardContent className="">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        typ pojazdu:{" "}
                      </span>
                      {vehicle.types.map((type, index) => (
                        <span key={index} className=" ">
                          {type}
                        </span>
                      ))}
                    </div>

                    <br />
                    <span className="text-xs text-muted-foreground">
                      id: {vehicle.id}
                    </span>
                  </CardContent>
                </div>
                <div className="flex flex-col justify-center gap-5 p-4 md:flex-row">
                  <Button size="sm">edytuj</Button>
                  <Button size={'sm'} variant={'destructive'}>Usuń</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
//! poprawić ikonkę dodaj warsztat na kolor zielony i w kółeczku
//! przemyśleć jak utworzyć okienko dialogowe dodaj pojazd