import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { useFieldArray, useForm } from "react-hook-form";
import { Vehicle } from "../../../../constants/initialData"; // Upewnij się, że ten typ to oryginalny Vehicle { id, name, category, types: string[] }
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputDebouncer } from "@/components/ui/inputDebouncer";
import { z } from "zod";

export const vehicleFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nazwa marki jest wymagana"),
  category: z.string(),
  types: z.array(
    z.object({
      value: z.string().min(1, "Typ musi mieć przynajmniej 1 znak"),
    })
  ).min(1, "Dodaj przynajmniej jeden typ pojazdu"),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

interface addDialog {
  open: boolean;
  setOpen: () => void;
}

export function AddVehicleDialog({ open, setOpen }: addDialog) {
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
    // Tłumaczymy strukturę formularza na strukturę bazy danych (Zustand)
    const cleanedData: Vehicle = {
      id: data.id,
      name: data.name,
      category: data.category,
      // Mapujemy tablicę obiektów [{value: "X"}] na tablicę stringów ["X"]
      types: data.types
        .map((t) => t.value.trim())
        .filter((val) => val !== ""),
    };

    addVehicle(cleanedData);
    form.reset(); // Czyścimy formularz po pomyślnym dodaniu
    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie Pojazdu - refaktoryzacja</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            {/** Nazwa pojazdu */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa marki pojazdu</FormLabel>
                  <FormControl>
                    <Input placeholder="np. Mercedes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamiczna lista typów modeli */}
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`types.${index}.value`} // Poprawna nazwa pola jako prop JSX
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>typ pojazdu {index + 1}</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <InputDebouncer
                          placeholder="wprowadź nowy typ pojazdu"
                          defaultValue={formField.value}
                          debounceDelay={500}
                          onDebounceChange={(newValue) => {
                            form.setValue(`types.${index}.value`, newValue, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          onBlur={formField.onBlur}
                          ref={formField.ref}
                        />
                      </FormControl>
                      
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        usuń
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Przycisk dodawania kolejnego pola tekstowego */}
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