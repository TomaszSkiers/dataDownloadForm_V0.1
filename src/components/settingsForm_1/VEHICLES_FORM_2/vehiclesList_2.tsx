"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  bodyType,
  Vehicle,
  vehicleSchema,
} from "../../../../constants/initialData";
import { useFilteredVehicles } from "@/customHooks/useFilteredVehicles";
import { RemoveVehicleDialog } from "./removeVehicleDialog";
// import { AddVehicleDialog } from "./addVehicleDialog/addVehicleDialog";
// import AddVehicleDialog_2 from "./addVehicleDialog2";
import AddVehicleDialog_3 from "./addVehicleDialog_3";

//!   --- mikrozadania -------------------------------------------------------

//todo refaktoryzacja kodu:

//todo ==> 1. przeanalizować komponent edycji pojazdu 'automatyczne generowanie kolejnych inputów'
//todo ==> 2. aktualizacja o taki mechanizm komponentu 'dodaj pojazd'

//* poprawić wyświetlanie typów w widoku mobile
//* zrobić paginację

//! ==========================================================================

export default function VehiclesList2() {
  // const vehiclesList = [
  //   ...useVehicalStorage2((state) => state.vehicleList),
  // ].sort((a, b) => {
  //   return a.name.localeCompare(b.name, "pl");
  // });

  // const rodzajPojazdu = useVehicalStorage2((s) => s.activeSort)
  // const vehiclesList = useVehicalStorage2(s => s.vehicleList).filter((vehicle => vehicle.category === rodzajPojazdu)).sort((a,b) => (a.name.localeCompare(b.name, 'pl'))) //todo memoizacja czy potrzebna jak jest stan
  // const ustawRodzajPojazdu = useVehicalStorage2((s)=>s.setActiveSort)

  // //* === wyodrębnić do customHooka ==========================================
  const kindOfVehicle = useVehicalStorage2((s) => s.activeSort);
  // const rawVehicleList = useVehicalStorage2((s) => s.vehicleList);
  const setKindOfVehicle = useVehicalStorage2((s) => s.setActiveSort);

  // const vehiclesList = useMemo(()=> {
  //   return rawVehicleList
  //     .filter((vehicle) => vehicle.category === kindOfVehicle)
  //     .sort((a,b) => a.name.localeCompare(b.name, 'pl'))
  // }, [rawVehicleList, kindOfVehicle])
  // //* ------------------------------------------------------------------------

  const vehiclesList = useFilteredVehicles();

  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [openEditVehicleDialog, setOpenEditVehicleDialog] =
    useState<Vehicle | null>(null);

  return (
    <Card className="flex-1 rounded-none border-b-0 sm:border-b ">
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col gap-3 ">
          <CardTitle>Lista pojazdów: {vehiclesList.length}</CardTitle>
          <Select value={kindOfVehicle} onValueChange={setKindOfVehicle}>
            {" "}
            {/**tu odczyt ze stanu */}
            <SelectTrigger className="border border-destructive w-full">
              <SelectValue placeholder="wybierz kategorię" />
            </SelectTrigger>
            <SelectContent position={"popper"}>
              {/* <SelectItem value={bodyType[0].bodyName}>{bodyType[0].description}</SelectItem> */}
              {bodyType.map((type) => (
                <SelectItem key={type.id} value={type.bodyName}>
                  {" "}
                  {type.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => {
            setOpenAddVehicleDialog(true);
          }}
        >
          <PlusCircle className="text-chart-1"></PlusCircle>
          <span>dodaj pojazd</span>
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 relative">
        <div className=" absolute inset-0 flex flex-col gap-3 overflow-auto">
          {vehiclesList.length === 0 ? (
            <div className="mx-auto text-2xl font-extrabold text-center">
              brak danych o pojazdach <br />
              <span className="text-sm">kliknij dodaj pojazd</span>
            </div>
          ) : (
            vehiclesList.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background"
              >
                <div className=" flex-1 flex flex-col justify-center">
                  <CardHeader className="flex">
                    <span className="text-muted-foreground">
                      marka pojazdu:{" "}
                    </span>
                    <span className="font-extrabold">{vehicle.name}</span>
                  </CardHeader>
                  <CardContent className="">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        typ pojazdu:{" "}
                      </span>
                      {vehicle.types.map((type, index) => (
                        <span key={index} className=" ">
                          {type}
                        </span>
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      kategoria pojazdu:{" "}
                    </span>
                    <span>{vehicle.category}</span>

                    <br />
                    <span className="text-xs text-muted-foreground">
                      id: {vehicle.id}
                    </span>
                  </CardContent>
                </div>
                <div className="flex flex-col justify-center gap-5 p-4 md:flex-row">
                  <Button
                    size="sm"
                    onClick={() => {
                      setOpenEditVehicleDialog(vehicle);
                    }}
                  >
                    edytuj
                  </Button>
                  <RemoveVehicleDialog id={vehicle.id}>
                    <Button size={"sm"} variant={"destructive"}>
                      Usuń
                    </Button>
                  </RemoveVehicleDialog>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      {/** add vehicle dialog */}
      {openAddVehicleDialog && (
        <AddVehicleDialog_3
          open={openAddVehicleDialog}
          onOpenChange={setOpenAddVehicleDialog}
        />
      )}

      {/** edit vehicle dialg */}
      {openEditVehicleDialog && (
        <EditVehicleDialog
          vehicleObj={openEditVehicleDialog}
          open={!!openEditVehicleDialog}
          setOpen={() => {
            setOpenEditVehicleDialog(null);
          }}
        />
      )}
    </Card>
  );
}

// ================= edit vehicle dialog ====================================
interface editVehicle {
  open: boolean;
  setOpen: () => void;
  vehicleObj: Vehicle;
}

function EditVehicleDialog({ open, setOpen, vehicleObj }: editVehicle) {
  const updateVehicle = useVehicalStorage2((state) => state.updateVehicle);
  const form = useForm<Vehicle>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: vehicleObj.id,
      name: vehicleObj.name,
      types: vehicleObj.types,
      category: vehicleObj.category,
    },
  });

  const currentTypes =
    useWatch({
      control: form.control,
      name: "types",
    }) || [];

  const onSubmit = (data: Vehicle) => {
    console.log(data);
    updateVehicle(vehicleObj.id, data);
    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edycja pojazdu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nazwa pojazdu</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {currentTypes.map((type, index) => (
              <FormField
                // Poprawka 1: Bezpieczniejszy klucz dla Reacta
                key={`vehicle-type-${index}`}
                control={form.control}
                // Poprawka 2: Asercja typu 'as const', żeby TypeScript nie zgłaszał błędu 'never'
                name={`types.${index}` as const}
                render={({ field }) => {
                  return (
                    <FormItem className="my-2">
                      {/* Etykieta pola zostaje nad inputem */}
                      <FormLabel>typ pojazdu {index + 1}</FormLabel>

                      {/* Kontener układający Input i Button obok siebie */}
                      <div className="flex items-center gap-2">
                        <FormControl>
                          {/* flex-1 rozciąga input na całą dostępną szerokość */}
                          <Input {...field} className="flex-1" />
                        </FormControl>

                        {/* Przycisk usuwania po prawej stronie */}
                        <Button
                          type="button" // Ważne: zapobiega wysłaniu formularza
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            // 2. Filtrujemy ją, wyrzucając element o bieżącym indeksie
                            const updatedTypes = currentTypes.filter(
                              (_, i) => i !== index,
                            );
                            // 3. Aktualizujemy stan w React Hook Form
                            form.setValue("types", updatedTypes);
                          }}
                        >
                          usuń
                        </Button>
                      </div>

                      {/* Komunikat błędu pod inputem i przyciskiem */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
            {form.formState.errors.types?.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.types.root.message}
              </p>
            )}
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.setValue("types", [...currentTypes, ""]);
              }}
            >
              dodaj nowy model pojazdu
            </Button>

            <FormField
              control={form.control}
              name="category" //brand category
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria pojazdu</FormLabel>

                  {/* Ważne: przekazujemy metody z 'field' do komponentu Select */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        {/* Wyświetli wybrany element lub placeholder jeśli pusto */}
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent position="popper">
                      {/* Wartości 'value' muszą odpowiadać temu, co akceptuje Twój stan/Zod */}
                      {bodyType.map((type) => (
                        <SelectItem key={type.id} value={type.bodyName}>
                          {type.description}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value="truck">Ciężarówka (truck)</SelectItem>
                      <SelectItem value="bus">Autobus (bus)</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem> */}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">zapisz</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

//? =========================================================================

// ================= add vehicle dialog ======================================

interface addDialog {
  open: boolean;
  setOpen: () => void;
}

const VehicleFormValuesSchema = z.object({
  id: z.string().uuid({ message: "Niepoprawny format ID" }),
  name: z.string().min(1, { message: "Nazwa marki jest wymagana" }),
  types: z
    .string()
    .min(1, { message: "Musisz podać przynajmniej jeden model" }),
  category: z.string().min(1, { message: "Musisz podać typ pojazdu" }),
});
type VehicleForm = z.infer<typeof VehicleFormValuesSchema>;

function AddVehicle({ open, setOpen }: addDialog) {
  const addVehicle = useVehicalStorage2((state) => state.addVehicle);
  const form = useForm<VehicleForm>({
    resolver: zodResolver(VehicleFormValuesSchema),
    defaultValues: {
      id: uuidv4(),
      name: "",
      types: "",
      category: undefined,
    },
  });

  const onSubmit = (data: VehicleForm) => {
    console.log(data);
    const obj = {
      id: data.id,
      name: data.name,
      types: [data.types],
      category: data.category,
    };
    addVehicle(obj);
    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie pojazdu</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name" //brand name
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nazwa pojazdu</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="types" //brand type
              render={({ field }) => (
                <FormItem>
                  <FormLabel>typ pojazdu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category" //brand category
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria pojazdu</FormLabel>

                  {/* Ważne: przekazujemy metody z 'field' do komponentu Select */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        {/* Wyświetli wybrany element lub placeholder jeśli pusto */}
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent position="popper">
                      {/* Wartości 'value' muszą odpowiadać temu, co akceptuje Twój stan/Zod */}
                      {bodyType.map((type) => (
                        <SelectItem key={type.id} value={type.bodyName}>
                          {type.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Zapisz</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

//? ==========================================================================
