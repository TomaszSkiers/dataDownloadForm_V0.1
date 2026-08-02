"use client";
// import TopFormButtons from "@/components/settingsForm_1/topButtons";
// import SettingsContextContainer from "@/components/settingsForm_1/settingsContextContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewStore } from "@/store/useViewStore";
import { SETTINGS_BUTTONS_LEFT } from "../../../constants/initialData";
import TechniciansList from "@/components/settingsForm_1/techniciansForms/techniciansList";
import WorkshopList2 from "@/components/settingsForm_1/WORKSHOP-FORM-2/workshopList2";
// import VehicleList_4 from "@/components/settingsForm_1/VEHICLES_FORM_2/vehicleList_4";
import ReasonsList from "@/components/settingsForms/reasons";
import PowerOff from "@/components/settingsForm_1/power/settingsPowerOff";

import VehicleList_5 from "@/components/settingsForm_1/VEHICLES_FORM_2/vehicleList_5";
// import TechniciansList from "../settingsForm_1/techniciansForms/techniciansList";
// import PowerOff from "./power/settingsPowerOff";
// import WorkshopList2 from "./WORKSHOP-FORM-2/workshopList2";
// import SimpleVehicleForm from "./reasonsForm/reasonList2";
// import VehicleList_4 from "./VEHICLES_FORM_2/vehicleList_4";
// import TopFormsButtons from "@/components/settingsForm_1/topFormButtons";

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

// export default function Settings() {
//   return (
//     <section className="flex flex-1 flex-col gap-5" aria-labelledby="settings-title">
//       <h1 id="settings-title" className="sr-only">Ustawienia</h1> {/* ukrywam nagłówek */}
//       <TopFormButtons className="flex gap-2 sm:gap-5 " />
//       <SettingsContextContainer className=" flex-1 flex" />
//     </section>
//   );
// }

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
        className="flex flex-1 flex-col "
      >
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5  gap-1.5 bg-transparent p-0">
          {SETTINGS_BUTTONS_LEFT.map((button) => (
            <TabsTrigger
              key={button.id}
              value={button.id}
              className="h-25 border rounded-md flex flex-col items-center gap-1 justify-center"
            >
              <span className="">{button.icon}</span>
              <span className="text-center leading-tight whitespace-normal p-1">
                {button.header}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Zawartość zakładek */}
        <TabsContent value="technicy" className="flex-1 mt-0 ">
          <TechniciansList />
        </TabsContent>

        <TabsContent value="warsztaty" className="flex-1 mt-0 flex">
          <WorkshopList2 />
        </TabsContent>

        <TabsContent value="pojazdy" className="flex-1 mt-0 flex">
          <VehicleList_5/>
        </TabsContent>

        <TabsContent value="powody" className="flex-1 mt-0">
          <ReasonsList />
        </TabsContent>

        <TabsContent value="power" className="flex-1 mt-0 flex">
          <PowerOff />
        </TabsContent>
      </Tabs>
    </section>
  );
}
