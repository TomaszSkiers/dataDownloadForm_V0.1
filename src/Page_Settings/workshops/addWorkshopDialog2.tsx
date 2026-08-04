//=================== add service dialog =======================================================================
"use client";

import { useWorkshopStore2 } from "@/store/useWorkshopStore2";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { WORKSHOP, WORKSHOP_SCHEMA } from "../../../constants/initialData";
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

interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddWorkshopDialog({ open, setOpen }: DialogProps) {
  const addWorkshop = useWorkshopStore2((store) => store.addWorkshop);
  const fuse = useRef(false);

  const form = useForm<WORKSHOP>({
    resolver: zodResolver(WORKSHOP_SCHEMA),
    defaultValues: {
      id: uuidv4(),
      name: "",
      address: "",
    },
  });

  const handleSubmit = (data: WORKSHOP) => {
    if (fuse.current === true) return;

    fuse.current = true;
    addWorkshop(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie adresu</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              form.handleSubmit(handleSubmit)(e);
            }}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa warsztatu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nazwa serwisu"
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input placeholder="adres" maxLength={30} {...field} />
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

//-------------------------------------------------------------------------------------------------------------
