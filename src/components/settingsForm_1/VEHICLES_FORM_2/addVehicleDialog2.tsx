"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Vehicle, vehicleSchema } from "../../../../constants/initialData";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { OptimizedFormLabel } from "@/components/ui/labenNoRender";

// ==========================================
// SCHEMAT DEDYKOWANY DLA FORMULARZA
// ==========================================
const formSpecificSchema = vehicleSchema.omit({ types: true }).extend({
  types: z.array(
    z.object({
      value: z.string().min(1, { message: "Typ musi mieć przynajmniej jeden znak" })
    })
  ).min(1, { message: "Musisz podać przynajmniej jeden typ pojazdu" })
});

type FormValues = z.infer<typeof formSpecificSchema>;

// ==========================================
// KOMPONENT 1: Wyizolowane pole dla Marki Pojazdu
// ==========================================
const BrandInputField = React.memo(() => {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <FormItem>
          <OptimizedFormLabel>Marka pojazdu</OptimizedFormLabel>
          <FormControl>
            <Input 
              placeholder="np. Toyota Prius" 
              {...field} 
              className={fieldState.error ? "border-destructive focus-visible:ring-destructive" : ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
BrandInputField.displayName = "BrandInputField";

// ==========================================
// KOMPONENT 2: Wyizolowane pole dla Rodzaju Pojazdu (Select)
// ==========================================
const CategorySelectField = React.memo(() => {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <OptimizedFormLabel>rodzaj pojazdu</OptimizedFormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz kategorię pojazdu" />
              </SelectTrigger>
            </FormControl>
            <SelectContent position="popper">
              <SelectItem value="passenger">Osobowy</SelectItem>
              <SelectItem value="truck">Ciężarowy</SelectItem>
              <SelectItem value="motorcycle">Motocykl</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
CategorySelectField.displayName = "CategorySelectField";

// ==========================================
// KOMPONENT 3: Wyizolowany nagłówek sekcji typów
// ==========================================
interface SectionHeaderProps {
  onAppend: () => void;
}

const SectionHeader = React.memo(({ onAppend }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        typ pojazdu
      </label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 gap-1"
        onClick={onAppend}
      >
        <Plus className="h-3.5 w-3.5" />
        Dodaj typ
      </Button>
    </div>
  );
});
SectionHeader.displayName = "SectionHeader";

// ==========================================
// KOMPONENT 4: Zoptymalizowany wiersz inputu typu
// ==========================================
interface TypeInputRowProps {
  index: number;
  onRemove: (index: number) => void;
}

const TypeInputRow = React.memo(({ index, onRemove }: TypeInputRowProps) => {
  const { control } = useFormContext<FormValues>();
  
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <FormField
          control={control}
          name={`types.${index}.value`}
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <Input
                  placeholder={`np. Hybryda, Wariant ${index + 1}`}
                  {...field}
                  className={fieldState.error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-destructive hover:bg-destructive/10 shrink-0"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});
TypeInputRow.displayName = "TypeInputRow";

// ==========================================
// KOMPONENT 5: Wyświetlanie błędu ogólnego tablicy
// ==========================================
const ArrayErrorDisplay = React.memo(() => {
  const { formState: { errors } } = useFormContext<FormValues>();
  const arrayError = errors.types?.root?.message || errors.types?.message;

  if (!arrayError) return null;

  return (
    <p className="text-xs font-medium text-destructive animate-in fade-in-50 duration-200 mt-1">
      {String(arrayError)}
    </p>
  );
});
ArrayErrorDisplay.displayName = "ArrayErrorDisplay";

// ==========================================
// KOMPONENT 6: Główna sekcja zarządzająca tablicą typów
// ==========================================
const DynamicTypesSection = React.memo(() => {
  const { control } = useFormContext<FormValues>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "types"
  });

  const handleAppend = React.useCallback(() => {
    append({ value: "" });
  }, [append]);

  const handleRemove = React.useCallback((indexToRemove: number) => {
    remove(indexToRemove);
  }, [remove]);

  return (
    <div className="space-y-2 border-t pt-4">
      <SectionHeader onAppend={handleAppend} />

      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 py-1">
        {fields.map((field, index) => (
          <TypeInputRow
            key={field.id}
            index={index}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <ArrayErrorDisplay />
    </div>
  );
});
DynamicTypesSection.displayName = "DynamicTypesSection";

// ==========================================
// KOMPONENT 7: Główny formularz (Wydajny kontener)
// ==========================================
function AddVehicleForm({ onSuccess }: { onSuccess: (data: Vehicle) => void }) {
  const [initialId] = React.useState(() => uuidv4());
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSpecificSchema),
    defaultValues: {
      id: initialId,
      name: "",
      types: [], 
      category: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    const finalData: Vehicle = { 
      ...data, 
      types: data.types.map(t => t.value),
      id: uuidv4() 
    };
    
    console.log("🚀 SUKCES!", finalData);
    onSuccess(finalData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <BrandInputField />

        <CategorySelectField />

        <DynamicTypesSection />

        <Button type="submit" className="w-full">
          Zapisz pojazd
        </Button>
      </form>
    </FormProvider>
  );
}

// ==========================================
// KOMPONENT 8: Modal Dialog
// ==========================================
export default function AddVehicleDialog_2({ ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie pojazdu</DialogTitle>
        </DialogHeader>

        <AddVehicleForm
          onSuccess={(data) => {
            if (props.onOpenChange) {
              props.onOpenChange(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}