/**
 * MODEL ZUSTANDOWY: MARKA I RODZAJ POJAZDU (RHF + FormProvider)
 */
import React from "react";
import { useForm, FormProvider, useFormContext, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Schemat walidacji dostosowany do Twojego przykładu
const vehicleSchema = z.object({
  brand: z.string().min(2, "Marka pojazdu musi mieć minimum 2 znaki"),
  type: z.enum(["passenger", "motorcycle", "agricultural"]),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

// ==========================================
// KOMPONENT 1: WYSEPAROWANE POLE "MARKA POJAZDU"
// ==========================================
const IsolatedBrandField = React.memo(() => {
  const { control, formState: { errors } } = useFormContext<VehicleFormValues>();
  
  // Subskrypcja TYLKO pod pole 'brand'
  const brandValue = useWatch({ control, name: "brand" });

  // ANALIZA: Loguje się tylko, gdy klepiesz tekst w Marce
  console.log(`%c[RENDER] Pole: MARKA POJAZDU (Wartość: ${brandValue})`, "color: #06b6d4; font-weight: bold;");

  return (
    <div className="space-y-2">
      <Label htmlFor="brand">Marka Pojazdu</Label>
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <Input {...field} id="brand" placeholder="Wpisz markę (np. Toyota, BMW)" />
        )}
      />
      {errors.brand && (
        <p className="text-sm text-destructive mt-1">{errors.brand.message}</p>
      )}
    </div>
  );
});
IsolatedBrandField.displayName = "IsolatedBrandField";

// ==========================================
// KOMPONENT 2: WYSEPAROWANY SELECT "RODZAJ POJAZDU"
// ==========================================
const IsolatedTypeSelect = React.memo(() => {
  const { control } = useFormContext<VehicleFormValues>();
  
  // Subskrypcja TYLKO pod pole 'type'
  const typeValue = useWatch({ control, name: "type" });

  // ANALIZA: Loguje się tylko przy otwarciu/zmianie opcji w tym Selekcie
  console.log(`%c[RENDER] Select: RODZAJ POJAZDU (Wartość: ${typeValue})`, "color: #10b981; font-weight: bold;");

  return (
    <div className="space-y-2">
      <Label htmlFor="type">Rodzaj Pojazdu</Label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Wybierz rodzaj pojazdu" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="passenger">Osobowy</SelectItem>
              <SelectItem value="motorcycle">Motocykl</SelectItem>
              <SelectItem value="agricultural">Rolniczy</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
});
IsolatedTypeSelect.displayName = "IsolatedTypeSelect";

// ==========================================
// GŁÓWNY KONTENER (Pudełko na stan całego formularza)
// ==========================================
export default function RhfVehicleExampleForm() {
  const methods = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      type: "passenger",
    },
  });

  const onSubmit = (data: VehicleFormValues) => {
    console.log("SUKCES! Przesłane dane pojazdu:", data);
  };

  // ANALIZA: Odpala się TYLKO RAZ na starcie! Pisanie po polach go nie rusza.
  console.log("%c[RENDER] Główny kontener (STAN FORMULARZA MROŻONY)", "color: #f43f5e; font-weight: bold; font-size: 14px;");

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(onSubmit)} 
        className="space-y-6 max-w-md p-4 border rounded-lg"
      >
        {/* Odizolowane pola, które dbają same o siebie */}
        <IsolatedBrandField />
        
        <IsolatedTypeSelect />

        <Button type="submit" className="w-full">
          Zapisz Dane
        </Button>
      </form>
    </FormProvider>
  );
}