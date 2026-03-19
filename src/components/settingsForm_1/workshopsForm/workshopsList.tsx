/**
 * KOMPONENT WYŚWIETLA LISTĘ WARSZTATÓW ORAZ ICH ADRESY
 */

import { Button } from "@/components/ui/button";
import { useTechniciansStore } from "@/store/useTechnicianStorage";
import { generateSingleTechnician } from "@/lib/generateTechnicians";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkshopsList() {
  const technicians = useTechniciansStore((s) => s.technicianList);
  const addTechnician = useTechniciansStore((s) => s.addTechnician);
  const removeTechnician = useTechniciansStore((s) => s.removeTechnician);

  const handleClick = () => {
    const user = generateSingleTechnician();
    addTechnician(user);
    console.log(technicians);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1>Lista warsztatów</h1>
      <Button onClick={handleClick} className="">
        dodaj technika
      </Button>

      {/* Kontener z listą - ten będzie się scrollował */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col gap-5 pr-2">
          {technicians.map((technic) => (
            <Card key={technic.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{technic.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {technic.cardNumber}
                    </p>
                    <p className="text-xs text-muted-foreground/50 font-mono mt-1">
                      {technic.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      edytuj
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        removeTechnician(technic.id);
                      }}
                    >
                      usuń
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
