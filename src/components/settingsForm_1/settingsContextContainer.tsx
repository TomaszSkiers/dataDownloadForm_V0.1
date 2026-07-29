"use client";
import { cn } from "@/lib/utils";
import { useViewStore } from "@/store/useViewStore";
import TechniciansList from "../settingsForm_1/techniciansForms/techniciansList";
import PowerOff from "./power/settingsPowerOff";
import WorkshopList2 from "./WORKSHOP-FORM-2/workshopList2";
import SimpleVehicleForm from "./reasonsForm/reasonList2";
import VehicleList_4 from "./VEHICLES_FORM_2/vehicleList_4";

interface Props {
  className?: string;
}

/**
 *  WYŚWIETLA FORMULARZE SŁUŻĄCE DO USTAWIEŃ PO KLIKNIĘCIU W PRZYCISKI W LEWYM MENU
 */
export default function SettingsContextContainer({ className }: Props) {

  const { activeView } = useViewStore();

  return (
    <div className={cn("", className)} role="tabpanel">
      {activeView === "technicy" && <TechniciansList />}
      {activeView === "warsztaty" && <WorkshopList2 />}
      {activeView === "pojazdy" && <VehicleList_4 />}
      {activeView === "powody" && <SimpleVehicleForm />}
      {activeView === 'power' && <PowerOff />}
    </div>
  );
}
