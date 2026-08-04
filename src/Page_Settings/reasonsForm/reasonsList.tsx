/**
 * KOMPONENT WYŚWIETLA LISTĘ POWODÓW POBRANIA DANYCH
 */
//* próby useForm z zachowaniem minimalnego renderowania komponentów

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import {
  useForm,
  useFormState,
  Control,
  UseFormRegister,
  FieldPath,
  Controller,
} from "react-hook-form";
import { Vehicle, vehicleSchema } from "../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReasonsList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border w-full p-4">
      <Button onClick={() => setOpen(true)}>dodaj pojazd</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>dodaj pojazd</DialogTitle>
          </DialogHeader>

          <FormForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormForm() {
  const { register, handleSubmit, control } = useForm<Vehicle>({
    resolver: zodResolver(vehicleSchema),
    mode: "onBlur",
    defaultValues: {
      id: uuidv4(),
      name: "",
      types: [],
      category: "truck",
    },
  });

  function onSubmit(data: Vehicle) {
    console.log("SUKCES! Wysłane dane pojazdu:", data);
  }

  function onError(errors: unknown) {
    console.log("BŁĄD WALIDACJI ZOD:", errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* 1. ODIZOLOWANA SEKCJA NAZWY POJAZDU */}
      <VehicleNameSection control={control} register={register} />

      {/* 2. ODIZOLOWANA SEKCJA KATEGORII (SELECT) */}
      <VehicleCategorySection control={control} />

      {/* 3. ODIZOLOWANA SEKCJA TYPÓW */}
      <VehicleTypesSection control={control} register={register} />

      <Button type="submit" className="w-full">
        Zapisz Pojazd
      </Button>
    </form>
  );
}

// --- KOMPONENT: SEKRETY IZOLACJI NAZWY POJAZDU ---
interface NameSectionProps {
  control: Control<Vehicle>;
  register: UseFormRegister<Vehicle>;
}

function VehicleNameSection({ control, register }: NameSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Nazwa Pojazdu</Label>
      <Input id="name" placeholder="marka pojazdu" {...register("name")} />
      <FormErrorWatcher control={control} name="name" />
    </div>
  );
}

// --- KOMPONENT: ODZOLOWANA SEKCJA DLA SELECTA KATEGORII ---
interface CategorySectionProps {
  control: Control<Vehicle>;
}

function VehicleCategorySection({ control }: CategorySectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Kategoria</Label>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Wybierz kategorię" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="car">Osobowy (Car)</SelectItem>
              <SelectItem value="truck">Ciężarowy (Truck)</SelectItem>
              <SelectItem value="van">Dostawczy (Van)</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <FormErrorWatcher control={control} name="category" />
    </div>
  );
}

// --- KOMPONENT: ZARZĄDZANIE TABLICĄ STRINGÓW ---
interface TypesSectionProps {
  control: Control<Vehicle>;
  register: UseFormRegister<Vehicle>;
}

function VehicleTypesSection({ control, register }: TypesSectionProps) {
  const [keys, setKeys] = useState<string[]>([]);

  const addTypeField = () => {
    setKeys((prev) => [...prev, crypto.randomUUID()]);
  };

  const removeTypeField = (indexToRemove: number) => {
    setKeys((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-3 border p-3 rounded-lg bg-slate-50/50">
      <div className="flex items-center justify-between">
        <Label>Typy pojazdu</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTypeField}
        >
          + Dodaj typ
        </Button>
      </div>

      {keys.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Brak dodanych typów.
        </p>
      )}

      <div className="space-y-2">
        {keys.map((keyId, index) => (
          <div key={keyId} className="flex gap-2 items-center">
            <div className="flex-1">
              <Input
                placeholder={`Typ ${index + 1}`}
                {...register(`types.${index}` as FieldPath<Vehicle>)}
              />
              <FormErrorWatcher
                control={control}
                name={`types.${index}` as FieldPath<Vehicle>}
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => removeTypeField(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- KOMPONENT: OBSERWATOR BŁĘDÓW (STRUKTURY ZAGNIEŻDŻONE) ---
interface FormErrorWatcherProps {
  control: Control<Vehicle>;
  name: FieldPath<Vehicle>;
}

function FormErrorWatcher({ control, name }: FormErrorWatcherProps) {
  const { errors } = useFormState({ control });

  const getNestedError = (errorObj: typeof errors, path: string) => {
    return path.split(".").reduce<Record<string, unknown> | undefined | null>(
      (acc, part) => {
        if (acc && typeof acc === "object" && part in acc) {
          return acc[part] as Record<string, unknown>;
        }
        return undefined;
      },
      errorObj as Record<string, unknown>,
    );
  };

  const error = getNestedError(errors, name);

  if (!error || !("message" in error)) return null;

  return (
    <p className="text-sm text-destructive mt-1 animate-in fade-in duration-200">
      {String(error.message)}
    </p>
  );
}
