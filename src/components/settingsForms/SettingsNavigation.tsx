// components/SettingsNavigation.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/useViewStore";

export function SettingsNavigation() {
  const { activeTab, tabs, setActiveTab } = useSettingsStore();

  return (
    <ButtonGroup>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          className={cn(
            activeTab === tab.id &&
              "bg-emerald-500 hover:bg-emerald-600 text-white",
          )}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
