import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OptimizedFormLabel } from "@/components/ui/labenNoRender";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
//todo =============================================================
// poprawiłem renderowanie warunkowe, nie ma utraty efektu zaniku formy po zamknięciu - jeszcze potestować
//
// 
//todo =============================================================
// =================================================================
// main dialog AddVehicleDialog - 1
// =================================================================
interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function AddVehicleDialog_4({
  open,
  onOpenChange,
}: AddVehicleDialogProps) {
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>dodawanie pojazdu v.4</DialogTitle>
        </DialogHeader>
        <Separator />
        <AddVehicleForm onSuccess={() => onOpenChange(false)}/>
      </DialogContent>
    </Dialog>
  );
}

// =================================================================
// main form - schema - rhf - onSubmit
// =================================================================
interface AddVehicleFormProps {
  onSuccess: () => void;
}

const formSchema = z.object({
  vehicleBrand: z.string().min(1, "* wymagany min 1 znak"),
});
type typeFormSchema = z.infer<typeof formSchema>;

function AddVehicleForm({ onSuccess }: AddVehicleFormProps) {
  const form = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleBrand: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: typeFormSchema) => {
    console.log("dane z formularza :", data);
    form.reset()
    onSuccess();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <BrandNameField />
        <Button type={"submit"} disabled={isSubmitting}>
          {isSubmitting ? "Zapisywanie..." : "Zapisz"}
        </Button>
      </form>
    </FormProvider>
  );
}

// =================================================================
// brand name field
// =================================================================
function BrandNameField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="vehicleBrand"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Marka pojazdu</FormLabel>
          <FormControl>
            <Input {...field} placeholder="np: Volvo" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
