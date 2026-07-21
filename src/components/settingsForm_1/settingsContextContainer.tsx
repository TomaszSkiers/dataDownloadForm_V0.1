"use client";
import { cn } from "@/lib/utils";
import { useViewStore } from "@/store/useViewStore";
import TechniciansList from "../settingsForm_1/techniciansForms/techniciansList";
// import WorkshopsList from "./WORKSHOPS-FORM/workshopsList"
// import VehiclesList from "../settingsForm_1/vehiclesForms/vehiclesList";
import ReasonsList from "../settingsForm_1/reasonsForm/reasonsList";
import PowerOff from "./power/settingsPowerOff";
import WorkshopList2 from "./WORKSHOP-FORM-2/workshopList2";

import SimpleVehicleForm from "./reasonsForm/reasonList2";
import VehicleList_3 from "./VEHICLES_FORM_2/vehicleList_3";

interface Props {
  className?: string;
}

/**
 *  WYŚWIETLA FORMULARZE SŁUŻĄCE DO USTAWIEŃ PO KLIKNIĘCIU W PRZYCISKI W LEWYM MENU
 */
export default function SettingsContextContainer({ className }: Props) {

  const { activeView } = useViewStore();

  return (
    <div className={cn("", className)}>
      {activeView === "technicy" && <TechniciansList />}
      {activeView === "warsztaty" && <WorkshopList2 />}
      {activeView === "pojazdy" && <VehicleList_3 />}
      {activeView === "powody" && <SimpleVehicleForm />}
      {activeView === 'power' && <PowerOff />}
    </div>
  );
}
