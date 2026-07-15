import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { vehicleSchema, Vehicle } from "../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

// =================================================================
// modal dialog - komponent 1
// =================================================================

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddVehicleDialog_3({
  open,
  onOpenChange,
}: AddVehicleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie pojazdu v.3</DialogTitle>
        </DialogHeader>
        <AddVehicleForm
          onClose={() => {
            onOpenChange(false);
          }} //todo tu nie działa mi ta funkcja nie zamyka jak nacisnę wyślij
          //* nie poszło bo zadziałała walidacja formularza
          //* puść commita przed robotą 
        />
      </DialogContent>
    </Dialog>
  );
}

// =================================================================
// główny formularz - komponent 2
// =================================================================

interface AddVehicleFormProps {
  onClose: () => void;
}
import { v4 as uuidv4 } from "uuid";

function AddVehicleForm({ onClose }: AddVehicleFormProps) {
  const form = useForm<Vehicle>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: uuidv4(),
      name: "Volvo",
      category: "truck",
      types: ["FH", "FH16", "FM", "FMX"],
    },
  });

  const onSubmit = () => {
    console.log("zamykam formę v.3");
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>tu będą elementy formularza</div>
        <Button type={"submit"}>zapisz pojazd</Button>
      </form>
    </FormProvider>
  );
}
