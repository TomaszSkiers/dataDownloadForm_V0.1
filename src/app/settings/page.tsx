"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewStore } from "@/store/useViewStore";
import { SETTINGS_BUTTONS_LEFT } from "../../../constants/initialData";
import TechniciansList from "@/Page_Settings/techniciansForms/techniciansList";
import PowerOff from "@/Page_Settings/power/settingsPowerOff";
import VehiclesList from "@/Page_Settings/vehiclesForm/vehicleList";
import ReasonsList_1 from "@/Page_Settings/reasonsForm/reasonList2";
import WorkshopList from "@/Page_Settings/workshops/workshopsList";



/**
 * * /settings
 *
 * KOMPONENT GENERUJE STRONĘ USTAWIENIA NA GÓRZE PASEK PRZYCISKÓW NAWIGUJĄCYCH DO ODPOWIEDNICH
 * STRON FORMULARZY PONIŹEJ Z LEWEJ STRONY PRZYCISKI A Z PRAWEJ FORMULARZE SŁUŻĄCE DO USTAWIENIA
 * APLIKACJI
 */

//todo ===============================
// do poprawki przyciski w widoku mobile
// wyłączyć napisy w widoku mobile i niech będą w jednej linii
//todo ===============================



export default function Settings() {
  const activeView = useViewStore((s) => s.activeView);
  const setActiveView = useViewStore((s) => s.setActiveView);

  return (
    <section
      className="flex flex-1 flex-col gap-5"
      aria-labelledby="settings-title"
    >
      <h1 id="settings-title" className="sr-only">
        Ustawienia
      </h1>
      <Tabs
        value={activeView}
        onValueChange={setActiveView}
        className="flex flex-1 flex-col"
      >
        <TabsList className="flex w-full gap-2 border p-10 dark:bg-card">
          {SETTINGS_BUTTONS_LEFT.map((button) => (
            <TabsTrigger
              key={button.id}
              value={button.id}
              className=" border rounded-md flex  items-center gap-1 justify-center flex-1 p-5"
            >
              <span className="">{button.icon}</span>
              <span className="text-center leading-tight whitespace-normal p-1">
                {button.header}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Zawartość zakładek */}
        <TabsContent value="technicy" className="flex-1 mt-0 flex">
          <TechniciansList />
        </TabsContent>

        <TabsContent value="warsztaty" className="flex-1 mt-0 flex">
          <WorkshopList/>
        </TabsContent>

        <TabsContent value="pojazdy" className="flex-1 mt-0 flex">
          <VehiclesList />
        </TabsContent>

        <TabsContent value="powody" className="flex-1 mt-0 flex">
          <ReasonsList_1 />
        </TabsContent>

        <TabsContent value="power" className="flex-1 mt-0 flex">
          <PowerOff />
        </TabsContent>
      </Tabs>
    </section>
  );
}
