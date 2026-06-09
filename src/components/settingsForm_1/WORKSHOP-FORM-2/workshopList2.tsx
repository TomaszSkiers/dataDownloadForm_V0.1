// komponent wyświetla listę warsztatów oraz ich adresy
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
// import { generateRandomWorkshop } from "@/lib/generateMockWorkshop";

import { useWorkshopStore2 } from "@/store/useWorkshopStore2";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useForm } from "react-hook-form";
import { WORKSHOP, WORKSHOP_SCHEMA } from "../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddWorkshopDialog2 from "./addWorkshopDialog2";

export default function WorkshopList2() {
  const workshopList = useWorkshopStore2((s) => s.workshopList);
  // const addWorkshop = useWorkshopStore2((s) => s.addWorkshop);
  const [open, setOpen] = useState(false);
  return (
    <Card className="flex-1 rounded-none border-b-0 sm:border-b">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Lista punktów serwisowych</CardTitle>
        {/* <Button
          onClick={() => {
            addWorkshop(generateRandomWorkshop());
          }}
        >
          <Plus color="green" /> <span>dodaj losowy adres</span>
        </Button> */}
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus color="blue" />
          <span>dodaj warsztat</span>
        </Button>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col gap-3 overflow-auto ">
          {workshopList.length === 0 ? (
            <div className="mx-auto text-2xl font-extrabold text-center">
              brak danych o warsztacie <br />{" "}
              <span className="text-sm">kliknij dodaj warsztat</span>
            </div>
          ) : (
            workshopList.map((workshop) => (
              <Card
                key={workshop.id}
                className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background"
              >
                <div className=" flex-1 flex flex-col justify-center">
                  <CardHeader className="flex">
                    <span className="text-muted-foreground">nazwa: </span>
                    <span className="font-extrabold">{workshop.name}</span>
                  </CardHeader>
                  <CardContent>
                    <span className="text-muted-foreground">adres: </span>
                    <span>{workshop.address}</span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      id: {workshop.id}
                    </span>
                  </CardContent>
                </div>

                <div className="flex flex-col justify-center gap-5 p-4 md:flex-row">
                  <EditServiceDialog object={workshop}>
                    <Button size="sm">edytuj</Button>
                  </EditServiceDialog>
                  <DeleteServiceDialog id={workshop.id}>
                    <Button size={"sm"} variant={"destructive"}>
                      Usuń
                    </Button>
                  </DeleteServiceDialog>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>
      
      {open && <AddWorkshopDialog2 open={open} setOpen={setOpen} />}
    </Card>
  );
}

//================= edit service dialog =====================================================================

interface EditWorkshopDialogProps {
  children: React.ReactNode;
  object: WORKSHOP;
}

function EditServiceDialog({ children, object }: EditWorkshopDialogProps) {
  const save = useWorkshopStore2((state) => state.editWorkshop);
  const [open, setOpen] = useState(false);

  const form = useForm<WORKSHOP>({
    resolver: zodResolver(WORKSHOP_SCHEMA),
    defaultValues: {
      id: object.id,
      name: object.name,
      address: object.address,
    },
  });

  const onSubmit = (data: WORKSHOP) => {
    save(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edycja danych technika</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NazwaWarsztatu</FormLabel>
                  <FormControl>
                    <Input maxLength={100} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres warsztatu</FormLabel>
                  <FormControl>
                    <Input maxLength={100} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Zapisz</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
//--------------------------------------------------------------------------------------------------------------

//============= delete service dialog =========================================================================

interface DeleteAlertDialogProps {
  children: React.ReactNode;
  id: string;
}
function DeleteServiceDialog({ children, id }: DeleteAlertDialogProps) {
  const deleteWorkshop = useWorkshopStore2((state) => state.deleteWorkshop);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Usuwnaie warsztatu</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              deleteWorkshop(id);
            }}
          >
            Potwierdź
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
//------------------------------------------------------------------------------------------------------------
