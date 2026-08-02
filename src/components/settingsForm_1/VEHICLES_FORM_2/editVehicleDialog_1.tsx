import { Settings, User, LogOut, MoreHorizontal } from "lucide-react";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bodyType,
  INPUT_CHARS_LIMITER,
  Vehicle,
} from "../../../../constants/initialData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import z from "zod";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const brandMaxLength = INPUT_CHARS_LIMITER.editVehicleDialog.brand;

//todo ==========================================================
// utworzyć pole vehicle brand nowy komponenty Fiel w shadui
//todo ==========================================================

// =================================================================
// main dialog EditVehicle
// =================================================================
export default function EditVehicleDialog() {
  const vehicleToEdit = useVehicleUiStore((s) => s.vehicleToEdit);
  const closeEditDiolog = useVehicleUiStore((s) => s.closeEditDialogNull);

  return (
    <Dialog
      open={Boolean(vehicleToEdit)}
      onOpenChange={(open) => !open && closeEditDiolog()}
    >
      <DialogContent>
        <div className="flex flex-col gap-0.5">
          <DialogHeader>
            <DialogTitle>Edycja pojazdu v.1</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Edycja pojazdu{" "}
            <span className="text-chart-5 font-bold">
              {vehicleToEdit?.name}
            </span>
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </div>
        {vehicleToEdit && <EditVehicleForm vehicle={vehicleToEdit} />}
      </DialogContent>
    </Dialog>
  );
}
// =================================================================
// form
// =================================================================
interface EditVehicleProps {
  vehicle: Vehicle;
}
const EditSchema = z.object({
  vehicleBrand: z.string().min(1, "* wymagany min 1 znak").max(brandMaxLength),
});
type EditVehicleTypes = z.infer<typeof EditSchema>;

function EditVehicleForm({ vehicle }: EditVehicleProps) {
  const form = useForm<EditVehicleTypes>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      vehicleBrand: vehicle.name,
    },
  });

  const onSubmit = (data: EditVehicleTypes) => {
    console.log("edit Form: ", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <VehicleBrandInput />
        <Button variant={"outline"}>Zapisz</Button>
      </form>
    </FormProvider>
  );
}

// =================================================================
// vehicleBrand field
// =================================================================
function VehicleBrandInput() {
  const { control } = useFormContext<EditVehicleTypes>();

  return (
    <Controller
      control={control}
      name="vehicleBrand"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Marka pojazdu</FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: Volvo"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
        </Field>
      )}
    />
  );
}
