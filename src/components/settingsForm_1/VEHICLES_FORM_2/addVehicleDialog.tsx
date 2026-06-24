import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { useForm, useWatch } from "react-hook-form";
import { Vehicle, vehicleSchema } from "../../../../constants/initialData";
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

// === =================================================

export const vehicleFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nazwa marki jest wymagana"),
  category: z.string(),
  
  // Zamiast z.array(z.string()), robimy tablicę obiektów:
  types: z.array(
    z.object({
      value: z.string().min(1, "Typ musi mieć przynajmniej 1 znak"),
    })
  ).min(1, "Dodaj przynajmniej jeden typ pojazdu"),
});

// Typ dedykowany wyłącznie dla struktury formularza
export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

// ============================================================

interface addDialog {
  open: boolean;
  setOpen: () => void;
}

export function AddVehicleDialog({ open, setOpen }: addDialog) {
  const addVehicle = useVehicalStorage2((s) => s.addVehicle);

  const form = useForm<Vehicle>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: uuidv4(),
      name: "",
      types: [""], //* to tablica przy inicjalizacji zawiera 1 pusty element, dzieki temu wygenerujemy 1 pusty input,
      category: "truck", //todo bez tego nie idzie submit
    },
  });

  const currentTypes =
    useWatch({
      control: form.control,
      name: "types",
    }) || [];

  const onSubmit = (data: Vehicle) => {
    console.log(data);
    const cleanedData = {
      ...data,
      types: data.types.filter((t) => t.trim() !== ""),
    };
    addVehicle(cleanedData);

    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie Pojazdu - refaktoryzacja</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/** nazwa pojazdu */}
            <FormField
              control={form.control}
              name={"name"}
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
            {/* <InputNoRender {...form.register('name')}></InputNoRender> */}
            {/*todo ============> to jeszcze raz żeby dobrze zrozumieć <================================ */}

            {/** dynamiczna lista typów modeli */}
            {currentTypes.map(
              (
                type,
                index, //* tu pętla leci po elementach z tablicy 'types'
              ) => (
                <FormField
                  key={`veh-type-${index}`}
                  control={form.control}
                  name={`types.${index}` as const} //* podłączamy pole do konkretnego elementu w tablicy 'types'
                  render={({ field }) => (
                    //! === MIKROZADANIA =======
                    //* przeanalizować działanie debouncera
                    <FormItem>
                      <FormLabel>typ pojazdu {index + 1}</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <InputDebouncer
                            placeholder="wprowadź nowy typ pojazdu"
                            defaultValue={field.value}
                            debounceDelay={500}
                            onDebounceChange={(newValue) => {
                              const currentTypes =
                                form.getValues("types") || [];
                              const updatedTypes = [...currentTypes];
                              updatedTypes[index] = newValue;
                              form.setValue("types", updatedTypes, {
                                shouldDirty: true,
                              });
                            }}
                            onBlur={field.onBlur} // RHF nadal wie, kiedy użytkownik opuścił pole
                            ref={field.ref}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const updatedTypes = currentTypes.filter(
                              (_, i) => i !== index,
                            );
                            form.setValue("types", updatedTypes, {
                              shouldDirty: true,
                              shouldValidate: true, // TA FLAGA JEST KLUCZOWA! Instrukcja dla RHF: "Sprawdź błędy teraz!"
                            });
                          }}
                        >
                          usuń
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ),
            )}
            {/** ======================================================================================== */}

            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.setValue("types", [...currentTypes, ""]);
              }}
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
