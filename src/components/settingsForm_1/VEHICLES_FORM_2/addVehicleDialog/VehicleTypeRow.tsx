import React from "react"; // Dodajemy import React
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputDebouncer } from "@/components/ui/inputDebouncer";
import { VehicleFormValues } from "./schema";

interface VehicleTypeRowProps {
  index: number;
  form: UseFormReturn<VehicleFormValues>;
  onRemove: (index: number) => void;
}

// 1. Zmieniamy nazwę bazowej funkcji na wewnętrzną
function VehicleTypeRowComponent({ index, form, onRemove }: VehicleTypeRowProps) {
  return (
    <FormField
      control={form.control}
      name={`types.${index}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Typ pojazdu {index + 1}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <InputDebouncer
                placeholder="Wprowadź model pojazdu"
                defaultValue={field.value}
                debounceDelay={500}
                onDebounceChange={(newValue) => {
                  form.setValue(`types.${index}.value`, newValue, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </FormControl>
            
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onRemove(index)}
            >
              Usuń
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// 2. Eksportujemy komponent owinięty w React.memo z precyzyjną kontrolą renderu
export const VehicleTypeRow = React.memo(VehicleTypeRowComponent, (prevProps, nextProps) => {
  // Pobieramy aktualną wartość błędu oraz wartość pola dla tego konkretnego indeksu
  const prevValue = prevProps.form.getValues(`types.${prevProps.index}.value`);
  const nextValue = nextProps.form.getValues(`types.${nextProps.index}.value`);

  const prevError = prevProps.form.formState.errors.types?.[prevProps.index]?.value?.message;
  const nextError = nextProps.form.formState.errors.types?.[nextProps.index]?.value?.message;

  // Renderuj ponownie TYLKO wtedy, gdy zmienił się indeks, wartość tekstowa lub komunikat o błędzie dla tego wiersza
  return (
    prevProps.index === nextProps.index &&
    prevValue === nextValue &&
    prevError === nextError
  );
});