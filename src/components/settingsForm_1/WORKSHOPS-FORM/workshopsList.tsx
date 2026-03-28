/**
 * KOMPONENT WYŚWIETLA LISTĘ WARSZTATÓW ORAZ ICH ADRESY
 */

import { Button } from "@/components/ui/button";

import { generateRandomWorkshop } from "@/lib/generateMockWorkshop";
import { useWorkshopStore } from "@/store/useWorkshopsStorage";
import { CirclePlus } from "lucide-react";
import { WorkshopCard } from "./WorkshopCard";

import AddWorkshopDialog from "./AddWorkshopDialog";

export default function WorkshopsList() {
  const workshopList = useWorkshopStore((store) => store.workshopsList);
  const addWorkshop = useWorkshopStore((store) => store.addWorkshop);

  return (
    <div className="border h-full flex flex-col">
      <div className="flex justify-between p-5 items-center">
        <h2 className="text-xl font-bold tracking-wide">Lista warsztatów</h2>

        <div className=" flex flex-col-reverse gap-3">
          <Button
            variant="ghost"
            className="border flex justify-between"
            onClick={() => addWorkshop(generateRandomWorkshop())}
          >
            <CirclePlus className="text-chart-2" />
            <span>Dodaj losowy warsztat</span>
          </Button>
          <AddWorkshopDialog>
            <Button variant="ghost" className="border flex justify-between">
              <CirclePlus className="text-chart-1" />
              <span>Dodaj warszat manulanie</span>
            </Button>
          </AddWorkshopDialog>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 border-t-2">
        {/* Poprawiony warunek: Sprawdzamy czy lista jest pusta */}
        {workshopList.length === 0 ? (
          <div className="h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
            Brak warsztatów
          </div>
        ) : (
          /* Mapowanie listy gdy dane istnieją */
          workshopList.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))
        )}
      </div>
    </div>
  );
}
