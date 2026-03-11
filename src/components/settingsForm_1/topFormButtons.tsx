"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FORMS_BUTTONS_TOP } from "../../../constans/initialData";

/**
 * górne przyciski przenoszące do formularzy
 * widok strony dla breakpointu lg - 1024px i więcej
 * trzeba przebudować dla mniejszych rozdzielczości, zamiast umieszczać przyciski w rzędzie dam w pione
 * zastosować grid
 * to ma być wydzielony kontener na przyciski do zmiany stron formularzy, umieszczony na górze,
 */
export default function TopFormsButtons({ className }: Props) {
  return (
    <div className={cn("", className)}>
      <section className="flex gap-10">
        {FORMS_BUTTONS_TOP.map((button) => (
          <Card
            key={button.id}
            className="flex-1 cursor-pointer hover:bg-accent transition-colors select-none"
            onClick={() => {
              console.log("test");
            }}
          >
            <CardHeader className="h-full p-0 flex flex-col">
              {/* Sekcja Title - zajmuje ok. 33% (4/12) wysokości */}
              <CardTitle className="h-1/3 flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-4">
                  <span className="text-primary">{button.icon}</span>
                  <span className="font-semibold">{button.header}</span>
                </div>
              </CardTitle>

              {/* Sekcja Description - zajmuje resztę (8/12) wysokości */}
              <CardDescription className="h-2/3 px-6 py-4 overflow-hidden text-sm leading-relaxed">
                {button.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
