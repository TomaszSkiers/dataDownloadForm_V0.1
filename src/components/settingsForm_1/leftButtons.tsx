"use client";
import { cn } from "@/lib/utils";
import { SETTINGS_BUTTONS_LEFT } from "../../../constants/initialData";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useViewStore } from "@/store/useViewStore";
import React from "react";

/**
 * * KOMPONENT GENERUJE PRZYCISKI DLA GÓRNEGO MENU USTAWIEŃ
 */

interface Props {
  className?: string;
}

export default function LeftFormButtons({ className }: Props) {
  const { activeView, setActiveView } = useViewStore();

  return (
    <div className={cn("mt-5 px-3 sm:px-0" , className)}>
      {SETTINGS_BUTTONS_LEFT.map((button) => (
        <Card
          key={button.id}
          className={cn(
            "cursor-pointer transition-all hover:bg-accent select-none flex-1 p-0",
            activeView === button.id
              ? "border-2 border-destructive bg-accent"
              : "border-2 border-border",
          )}
        >
          <CardHeader
            className="flex flex-col items-center justify-center text-center flex-1 py-3"
            onClick={() => {
              setActiveView(button.id);
            }}
          >
            <CardTitle className="flex flex-col items-center gap-2 font-medium text-sm ">
              <span className="">{button.icon}</span>
              <span className="tracking-wider hidden md:block">{button.header}</span>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}



