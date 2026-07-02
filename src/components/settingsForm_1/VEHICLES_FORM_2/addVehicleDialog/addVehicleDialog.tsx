import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { useFieldArray, useForm } from "react-hook-form";
import { Vehicle } from "../../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputDebouncer } from "@/components/ui/inputDebouncer"; // Importujemy debouncer
import { vehicleFormSchema, VehicleFormValues } from "./schema";
import { VehicleTypeRow } from "./VehicleTypeRow";

interface AddDialogProps {
  open: boolean;
  setOpen: () => void;
}

export function AddVehicleDialog({ open, setOpen }: AddDialogProps) {
  const addVehicle = useVehicalStorage2((s) => s.addVehicle);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      id: uuidv4(),
      name: "",
      category: "truck",
      types: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "types",
  });

  const onSubmit = (data: VehicleFormValues) => {
    const cleanedData: Vehicle = {
      id: data.id,
      name: data.name,
      category: data.category,
      types: data.types
        .map((t) => t.value.trim())
        .filter((val) => val !== ""),
    };

    addVehicle(cleanedData);
    form.reset();
    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie Pojazdu - Pełny Debouncing</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            {/** Pole marki z debouncerem */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa marki pojazdu</FormLabel>
                  <FormControl>
                    <InputDebouncer
                      placeholder="np. Mercedes"
                      defaultValue={field.value}
                      debounceDelay={500}
                      onDebounceChange={(newValue) => {
                        // Aktualizujemy markę dopiero po zakończeniu pisania (500ms)
                        form.setValue("name", newValue, {
                          shouldDirty: true,
                          shouldValidate: true, // Walidacja odpali się z opóźnieniem, nie przy każdej literze!
                        });
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Dynamiczna lista odizolowanych wierszy */}
            {fields.map((field, index) => (
              <VehicleTypeRow
                key={field.id}
                index={index}
                form={form}
                onRemove={remove}
              />
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ value: "" })}
            >
              dodaj nowy model pojazdu
            </Button>

            {form.formState.errors.types?.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.types.root.message}
              </p>
            )}

            <Button type="submit">dodaj pojazd</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}