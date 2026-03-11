// components/SettingsContent.tsx
"use client";

import { useSettingsStore, SettingsTab } from "@/store/useViewStore";
import WorkshopsList from "@/components/settingsForms/workshops";
import TechniciansList from "@/components/settingsForms/technicians";
import ReasonsList from "@/components/settingsForms/reasons";
import VehiclesList from "@/components/settingsForms/vehicles";

const TAB_COMPONENTS: Record<SettingsTab, React.ReactNode> = {
  warsztat: <WorkshopsList />,
  technicy: <TechniciansList />,
  pojazdy: <VehiclesList />,
  powody: <ReasonsList />,
};

export function SettingsContent() {
  const activeTab = useSettingsStore((state) => state.activeTab);

  return <div className="w-full mt-4">{TAB_COMPONENTS[activeTab]}</div>;
}
