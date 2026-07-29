"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SETTINGS_BUTTONS_LEFT } from "../../../constants/initialData";

// =================================================================
//  komponent nadrzędny - pętla
//* wyświetla pasek przycisków na górze strony
// =================================================================

interface Props {
  className?: string;
}

export default function TopFormButtons({ className }: Props) {
  return (
    <div className={cn("mt-5 px-3 sm:px-0", className)} role="tablist">
      {SETTINGS_BUTTONS_LEFT.map((button) => (
        <FormButton
          key={button.id}
          id={button.id}
          icon={button.icon}
          header={button.header}
        />
      ))}
    </div>
  );
}

// =================================================================
// komponent przycisku - wydzielam dla lepszej wydajności
// =================================================================
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useViewStore } from "@/store/useViewStore";

interface FormButtonProps {
  id: string;
  icon: React.ReactNode;
  header: string;
}

function FormButton({ id, icon, header }: FormButtonProps) {
  // Przycisk subskrybuje TYLKO do wyniku warunku boolean!
  const isActive = useViewStore((state) => state.activeView === id);
  const setActiveView = useViewStore((state) => state.setActiveView);

  return (
    <Card
      role="tab"
      className={cn(
        "cursor-pointer transition-all hover:bg-accent select-none flex-1 p-0",
        isActive
          ? "border-2 border-destructive bg-accent"
          : "border-2 border-border",
      )}
    >
      <CardHeader
        className="flex flex-col items-center justify-center text-center flex-1 py-3"
        onClick={() => setActiveView(id)}
      >
        <CardTitle className="flex flex-col items-center gap-2 font-medium text-sm">
          <span>{icon}</span>
          <span className="tracking-wider hidden md:block">{header}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
