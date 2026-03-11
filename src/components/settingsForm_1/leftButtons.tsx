/**
 * * KOMPONENT GENERUJE PRZYCISKI DLA LEWEGO MENU USTAWIEŃ
 */
'use client'
import { cn } from "@/lib/utils";
import { SETTINGS_BUTTONS_LEFT } from "../../../constans/initialData";

import { Card, CardHeader, CardTitle } from "../ui/card";

import { useViewStore } from "@/store/useViewStore";

interface Props {
  className?: string;
}

export default function LeftFormButtons({ className }: Props) {

  const {activeView, setActiveView} = useViewStore()

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {SETTINGS_BUTTONS_LEFT.map((button) => (
        <Card
          key={button.id}
          className={cn(
            'cursor-pointer transition-all hover:bg-accent select-none p-0 min-h-25',
            activeView === button.id
            ? 'border-2 border-destructive'
            : 'border-2' 
          )}
        >
          <CardHeader className="flex flex-col items-center justify-center text-center flex-1"
          onClick={()=> {setActiveView(button.id)}}
          >
            <CardTitle className="flex flex-col items-center gap-2 font-medium text-sm">
              <span className="text-2xl">{button.icon}</span>
              <span className="tracking-wider">{button.header}</span>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
