import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { WORKSHOP, WORKSHOP_SCHEMA } from "../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkshopStore } from "@/store/useWorkshopsStorage";
import { toast } from "sonner"; // Pamiętaj o tym imporcie!
import { memo, useMemo, useState } from "react";


interface Props {
  closeDialog: () => void;
  editingWorkshop?: WORKSHOP; 
}

export default function AddEditForm({ closeDialog, editingWorkshop }: Props) {
  const [fuse, setFuse] = useState(false);

  const isEditMode = !!editingWorkshop;

  const defaultValues = useMemo(
    () => ({
      id: uuidv4(),
      name: "",
      address: "",
    }),
    [],
  );

  const form = useForm<WORKSHOP>({
    resolver: zodResolver(WORKSHOP_SCHEMA),
    defaultValues: editingWorkshop || defaultValues,
  });

  const addWorkshop = useWorkshopStore((store) => store.addWorkshop);
  const editWorkshop = useWorkshopStore((store) => store.editWorkshop);

  const onSubmit = (data: WORKSHOP) => {
    if (fuse) return;

    try {
      if (!isEditMode) {
        setFuse(true);
        addWorkshop(data);
        toast.success("Warsztat dodany!", {
          description: `Pomyślnie utworzono: ${data.name}`,
          duration: 3000,
        });
      } else {
        setFuse(true);
        editWorkshop(data);
        toast.success("Edycja udana");
      }
      closeDialog();
    } catch {
      toast.error("Wystąpił problem z zapisem");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa warsztatu</FormLabel>
              <FormControl>
                <Input placeholder="Tacho serwis" maxLength={50} {...field} />
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
              <FormLabel>Adres warsztatu</FormLabel>
              <FormControl>
                <Input placeholder="Wprowadź adres" maxLength={50} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Buttons onClose={closeDialog} />
      </form>
    </Form>
  );
}

interface ButtonsProps {
  onClose: () => void;
}
const Buttons = memo(({ onClose }: ButtonsProps) => {
  return (
    <div className="flex justify-between">
      <Button type="submit">Zapisz</Button>
      <Button type="button" variant="secondary" onClick={onClose}>
        Anuluj
      </Button>
    </div>
  );
});
Buttons.displayName = "Buttons";
