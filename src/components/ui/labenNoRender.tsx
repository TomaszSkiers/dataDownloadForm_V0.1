import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
// Używamy gotowego hooka z Twojego pliku
import { useFormField } from "@/components/ui/form"

type OptimizedFormLabelProps = React.ComponentProps<typeof Label>

const OptimizedFormLabelComponent = React.forwardRef<
  React.ElementRef<typeof Label>,
  OptimizedFormLabelProps
>(({ className, ...props }, ref) => {
  // Hook sam wie, w jakim polu (np. "name") się znajduje i pobiera jego stan
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

OptimizedFormLabelComponent.displayName = "OptimizedFormLabelComponent";

export const OptimizedFormLabel: React.NamedExoticComponent<OptimizedFormLabelProps> =
  React.memo(OptimizedFormLabelComponent, (prevProps, nextProps) => {
    // Ponieważ nie przekazujemy już hasError przez props, React.memo sprawdza 
    // tylko czy nie zmienił się tekst etykiety lub jej klasy (np. przy re-renderze rodzica).
    // Zmiana stanu błędu i tak zostanie wyłapana przez useFormField(), bo subskrypcje
    // kontekstu automatycznie przebijają blokadę React.memo!
    return (
      prevProps.children === nextProps.children &&
      prevProps.className === nextProps.className
    );
  });