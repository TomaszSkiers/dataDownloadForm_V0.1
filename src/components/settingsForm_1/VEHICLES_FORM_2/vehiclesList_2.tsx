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
import { Vehicle, vehicleSchema } from "../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";

export default function VehiclesList2() {
  const vehiclesList = useVehicalStorage2((state) => state.vehicleList);
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);

  return (
    <Card className="flex-1 rounded-none border-b-0 sm:border-b ">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Lista pojazdów</CardTitle>
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

                    <br />
                    <span className="text-xs text-muted-foreground">
                      id: {vehicle.id}
                    </span>
                  </CardContent>
                </div>
                <div className="flex flex-col justify-center gap-5 p-4 md:flex-row">
                  <Button size="sm">edytuj</Button>
                  <Button size={"sm"} variant={"destructive"}>
                    Usuń
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      {/** add vehicle dialog */}
      {openAddVehicleDialog && (
        <AddVehicle
          open={openAddVehicleDialog}
          setOpen={() => {
            setOpenAddVehicleDialog(false);
          }}
        />
      )}
    </Card>
  );
}

// ================= add vehicle dialog =====================================

//todo zrobić kolejne pola -> typ pojazdu i rodzaj pojazdu
//* pozmieniać i initialData kategorie pojazdów na polskie
//* zrobić listę wyboru kategorii w dodawaniu pojazdu


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
  const form = useForm<VehicleForm>({
    resolver: zodResolver(VehicleFormValuesSchema),
    defaultValues: {
      id: uuidv4(),
      name: "",
      types: '', 
      category: "nowy", //todo bez jednego znaki nie przechodzi walidacji
    },
  });

  const onSubmit = (data: VehicleForm) => {
    console.log(data)
  }



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
              render={({field}) => {
                return <FormItem>
                  <FormLabel>Nazwa pojazdu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }}
            />
            <FormField 
              control={form.control}
              name="types" //brand type
              render={({field}) => (
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
              name='category' //brand category
              render={({field}) => (
                <FormItem>
                  <FormLabel>kategoria pojazdu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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

// ==========================================================================
