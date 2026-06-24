/**
 * KOMPONENT WYŚWIETLA LISTĘ POWODÓW POBRANIA DANYCH
 */

import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/testowyDebouncer";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import React from "react";

export default function ReasonsList() {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      userName: ''
    }
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="border w-full">
      <h1>komponent wyświetla powody dla których pobieramy dane z tachografu</h1>
      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 2. Klucz wydajności: metoda register zwraca obiekt z:
           onChange, onBlur, name, ref.
           Dzięki React.memo i unikalnej referencji z RHF,
           ten input NIE będzie się przerenderowywał, kiedy wpisujesz tekst!
      */}
      <InputNoRender {...register("userName")} placeholder="Nazwa użytkownika" />
      
      <Button type="submit">wyślij</Button>
    </form>
    </div>
  );
}


// 1. Definiujemy czysty komponent Input
const InputComponent = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

// 2. Owijamy go w React.memo, aby zapobiec niepotrzebnym renderom od rodzica
export const InputNoRender = React.memo(InputComponent)

// Przydatne dla czytelności w React DevTools
// InputNoRender.displayName = "InputNoRender"