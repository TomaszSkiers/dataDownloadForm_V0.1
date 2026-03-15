"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { useViewStore } from "@/store/useViewStore";
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
import { Technician, TechnicianSchema } from "../../../../constans/initialData";

interface TechnicianFormProps {
  initialData?: Technician | null; // Dane do edycji
  onSuccess?: () => void; // Akcja po zapisie
}

export const TechnicianForm = ({
  initialData,
  onSuccess,
}: TechnicianFormProps) => {
  const { addTechnician, updateTechnician } = useViewStore();

  // Tryb edycji aktywuje się, gdy mamy initialData
  const isEditMode = !!initialData;

  const form = useForm<Technician>({
    resolver: zodResolver(TechnicianSchema),
    defaultValues: initialData || {
      id: uuidv4(),
      fullName: "",
      cardNumber: "",
    },
  });

  const onSubmit = (data: Technician) => {
    if (isEditMode) {
      updateTechnician(data);
    } else {
      addTechnician(data);
    }

    // Jeśli przekazano funkcję sukcesu (np. zamknij modal), wywołaj ją
    if (onSuccess) {
      onSuccess();
    }

    // Jeśli to był nowy wpis, zresetuj formularz dla kolejnego technika
    if (!isEditMode) {
      form.reset({
        id: uuidv4(),
        fullName: "",
        cardNumber: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-sm text-muted-foreground">
          {isEditMode ? "Edytujesz dane technika" : "Dodajesz nowego technika"}
        </h2>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię i Nazwisko</FormLabel>
              <FormControl>
                <Input
                  placeholder="np. Jan Kowalski"
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
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer Karty</FormLabel>
              <FormControl>
                <Input placeholder="PLW..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">
            {isEditMode ? "Zapisz zmiany" : "Dodaj technika"}
          </Button>
          
          {onSuccess && (
            <Button type="button" variant="outline" onClick={onSuccess}>
              Anuluj
            </Button>
          )}
        </div> */}
        <FormButtons
          isEditMode={isEditMode}
          onSuccess={onSuccess}
        ></FormButtons>
      </form>
    </Form>
  );
};

import { memo } from "react";

// Teraz opakowujemy w memo
const FormButtons = memo(
  ({
    isEditMode,
    onSuccess,
  }: {
    isEditMode: boolean;
    onSuccess?: () => void;
  }) => {
    return (
      <div className="flex gap-2 pt-2">
        <Button type="submit">
          {isEditMode ? "Zapisz zmiany" : "Dodaj technika"}
        </Button>

        {onSuccess && (
          <Button type="button" variant="outline" onClick={onSuccess}>
            Anuluj
          </Button>
        )}
      </div>
    );
  },
);

// Dodajemy displayName dla lepszego debugowania
FormButtons.displayName = "FormButtons";
