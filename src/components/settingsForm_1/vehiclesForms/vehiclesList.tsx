"use client";
/**
 * KOMPONENT WYŚWIETLA LISTĘ POJAZDÓW
 */

import { Button } from "@/components/ui/button";
import { INITIAL_VEHICLES} from "../../../../constants/initialData";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useVehiclesStorage } from "@/store/useVehiclesStorage";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function VehiclesList() {
  const addVehicles = useVehiclesStorage((state) => state.addVehicles);
  const vehicles = useVehiclesStorage((state) => state.vehiclesList);
  
  const deleteVehicle = useVehiclesStorage((state) => state.deleteVehicle);
  const [open, setOpen] = useState(false);

  return (
    <div className="border p-2 flex flex-col w-full">
      <div className="flex items-center justify-between">
        <h2 className=" text-2xl font-bold tracking-wide">Pojazdy</h2>
        <Button
          onClick={() => {
            addVehicles(INITIAL_VEHICLES);
          }}
        >
          dodaj pojazdy do bazy danych
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            addVehicles([]);
          }}
        >
          wyzeruj bazę
        </Button>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          dodaj pojazd
        </Button>
      </div>

      <div className="flex-1 flex flex-col  relative">
        <div className="absolute inset-0 flex flex-col gap-3 overflow-auto mt-2">
          {vehicles.map((vehicle) => (
            <Card className="" key={vehicle.id}>
              <CardHeader className="text-xl font-bold">
                <div className="flex justify-between">
                  {vehicle.name}
                  <Button size="xs" variant="secondary">
                    dodaj typ pojazdu
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    usuń
                  </Button>
                </div>
              </CardHeader>
              <Separator></Separator>
              <CardContent className="flex gap-2 ">
                {vehicle.types.map((type, index) => (
                  <div className="" key={index}>
                    <Button>{type}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/** add vehicle dialog */}

      {open && <AddVehicle open={open} setOpen={setOpen} />}
    </div>
  );
}

// ====== add vehicle dialog ===============================================

interface AddVehicleProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormSchema = z.object({
  brand: z
    .string()
    .min(2, "nazwa marki jest wymagana")
    .max(20, "marka może mieć maksymalnie 20 znaków"),
  type: z
    .string()
    .min(2, "typ jest wymagany")
    .max(20, "typ może mieć maksymalnie 20 znaków"),
});

type Form = z.infer<typeof FormSchema>;

function AddVehicle({ open, setOpen }: AddVehicleProps) { 

  const addVehicle = useVehiclesStorage((state) => state.addVehicle);

  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      brand: "",
    },
  });


  //! id musi być unikatowe !!! bo mogą być dwie identyczne marki pojazdów i będzie kaszanka 
  const handleSubmit = (data: Form) => {
    const vehicleObj = {
      id: data.brand,
      name: data.brand,
      types: [data.type],
      category: ''
    }
    console.log(vehicleObj)
    addVehicle(vehicleObj)
    
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie pojazdu</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField 
              control={form.control}
              name='brand'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Marka pojazdu</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='nowa marka pojazdu'
                      maxLength={20}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='type'
              render={({field}) => (
                <FormItem>
                  <FormLabel>typ pojazdu</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="nowy typ pojazdu"
                      maxLength={20}
                      {...field}
                    />
                  </FormControl>
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
