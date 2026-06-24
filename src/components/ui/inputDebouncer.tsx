"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Rozszerzamy standardowe właściwości inputu o opcje debouncera
interface DebouncedInputProps extends React.ComponentProps<"input"> {
  debounceDelay?: number;
  onDebounceChange?: (value: string) => void;
}

function InputDebouncer({
  className,
  type,
  debounceDelay,
  onDebounceChange,
  onChange,
  defaultValue,
  value,
  ...props
}: DebouncedInputProps) {
  // Lokalny stan przechowujący wpisywany tekst (żeby litery pojawiały się natychmiast)
  const [localValue, setLocalValue] = React.useState(
    (value ?? defaultValue ?? "") as string,
  );

  // Synchronizacja stanu lokalnego, jeśli wartość przyjdzie z góry (np. reset formularza)
  React.useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value as string);
    }
  }, [value]);

  // Tworzymy stabilną referencję debouncera za pomocą useMemo
  const debouncedCallback = React.useMemo(() => {
    if (!onDebounceChange || !debounceDelay) return null;
    return debounce((val: string) => {
      onDebounceChange(val);
    }, debounceDelay);
  }, [onDebounceChange, debounceDelay]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue); // Natychmiastowa aktualizacja liter na ekranie

    // 1. Wywołujemy standardowe onChange (jeśli React Hook Form je podpiął)
    if (onChange) {
      onChange(e);
    }

    // 2. Wywołujemy wersję opóźnioną (nasz debouncer)
    if (debouncedCallback) {
      debouncedCallback(newValue);
    }
  };

  return (
    <input
      type={type}
      data-slot="input"
      value={localValue}
      onChange={handleChange}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { InputDebouncer };

// ==========================================
// LOKALNA FUNKCJA POMOCNICZA (ZGODNA Z ESLINT)
// ==========================================
function debounce<Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
