"use client";
import { cn } from "@/lib/utils";
import { useViewStore } from "@/store/useViewStore";
import TechniciansList from "../settingsForm_1/techniciansForms/techniciansList";
import WorkshopsList from "../settingsForm_1/workshopsForm/workshopsList"
import VehiclesList from "../settingsForm_1/vehiclesForms/vehiclesList";
import ReasonsList from "../settingsForm_1/reasonsForm/reasonsList";
import PowerOff from "./power/settingsPowerOff";

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
      {activeView === "warsztaty" && <WorkshopsList />}
      {activeView === "pojazdy" && <VehiclesList />}
      {activeView === "powody" && <ReasonsList />}
      {activeView === 'power' && <PowerOff />}
    </div>
  );
}
