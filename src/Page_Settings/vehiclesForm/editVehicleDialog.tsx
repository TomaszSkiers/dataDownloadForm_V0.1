import { CirclePlus, Save, Trash2 } from "lucide-react";
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
} from "../../../constants/initialData";
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
  useFieldArray,
  FieldArrayWithId,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import React from "react";
import { useVehiclesStorage2 } from "@/store/useVehicleStorage2";
import { toast } from "sonner";

const brandMaxLength = INPUT_CHARS_LIMITER.editVehicleDialog.brand;
const typeMaxLength = INPUT_CHARS_LIMITER.editVehicleDialog.type;

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
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja pojazdu.</DialogTitle>
          <DialogDescription>
            Edycja pojazdu{" "}
            <span className="text-chart-5 font-bold">
              {vehicleToEdit?.name}
            </span>
            .
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>

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
  vehicleTypes: z.array(
    z.object({
      value: z.string().min(1, "* wymagany min 1 znak").max(typeMaxLength),
    }),
  ),
  vehicleKind: z.string().min(1, "* rodzaj pojazdu jest wymagany"),
});
type EditVehicleTypes = z.infer<typeof EditSchema>;

function EditVehicleForm({ vehicle }: EditVehicleProps) {
  const save = useVehiclesStorage2((s) => s.updateVehicle);
  const onSuccess = useVehicleUiStore((s) => s.closeEditDialogNull);
  const form = useForm<EditVehicleTypes>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      vehicleBrand: vehicle.name,
      vehicleTypes: vehicle.types.map((type) => ({ value: type })),
      vehicleKind: vehicle.category,
    },
  });

  const onSubmit = (data: EditVehicleTypes) => {
    if (form.formState.isSubmitSuccessful) return;

    const finalData: Vehicle = {
      id: vehicle.id,
      name: data.vehicleBrand,
      types: data.vehicleTypes.map((type) => type.value),
      category: data.vehicleKind,
    };

    save(vehicle.id, finalData);

    toast.success(
      <span>
        Pojazd{" "}
        <span className="font-semibold text-chart-3">{data.vehicleBrand}</span>{" "}
        został zaktualizowany
      </span>,
    );

    onSuccess();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <VehicleBrandInput />
        <Separator className="bg-chart-10" />
        <VehicleTypesWrapper />
        <Separator className="bg-chart-10" />
        <VehicleKindSelect />
        <Separator className="bg-chart-10" />
        <Button
          type="submit"
          variant={"outline"}
          disabled={form.formState.isSubmitSuccessful}
        >
          <Save className="text-chart-2" />
          <span>zapisz</span>
        </Button>
      </form>
    </FormProvider>
  );
}
// =================================================================
// vehicle types wrapper
// =================================================================
function VehicleTypesWrapper() {
  const { control } = useFormContext<EditVehicleTypes>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicleTypes",
  });

  return (
    <fieldset className="">
      <div className="flex justify-between mb-2">
        <legend className="flex items-center gap-2 text-sm leading-none font-medium select-none">
          Typy pojazdu:
        </legend>
        <Button
          type="button"
          size={"sm"}
          variant={"outline"}
          onClick={() => append({ value: "" })}
        >
          <CirclePlus aria-hidden="true" className="text-chart-2" />
          <span>Dodaj typ</span>
        </Button>
      </div>
      <TypesMapLoop fields={fields} onRemove={remove} />
    </fieldset>
  );
}
// =================================================================
// Types.Map() - loop
// =================================================================

interface TypesLoopProps {
  fields: FieldArrayWithId<EditVehicleTypes, "vehicleTypes", "id">[];
  onRemove: (index: number) => void;
}

function TypesMapLoop({ fields, onRemove }: TypesLoopProps) {
  return (
    <ul className="flex flex-col gap-2">
      {fields.map((item, index) => (
        <li key={item.id} className="flex flex-col gap-1">
          <Separator />
          <VehicleRow
            index={index}
            fieldsLength={fields.length}
            onRemove={onRemove}
          />
        </li>
      ))}
    </ul>
  );
}
// =================================================================
// vehicleBrand field
// =================================================================
interface VehicleRowProps {
  index: number;
  onRemove: (index: number) => void;
  fieldsLength: number;
}
function VehicleRow({ index, onRemove, fieldsLength }: VehicleRowProps) {
  const { control } = useFormContext<EditVehicleTypes>();

  return (
    <Controller
      control={control}
      name={`vehicleTypes.${index}.value`}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1 p-2">
          <FieldLabel className="text-xs flex justify-between">
            <span>Typ pojazdu {index + 1}</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{typeMaxLength}
            </span>
          </FieldLabel>
          <div className="flex gap-1">
            <Input
              {...field}
              placeholder="np: FH16"
              aria-invalid={fieldState.invalid}
              maxLength={typeMaxLength}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Usuń typ pojazdu ${index + 1}`}
              className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onRemove(index)}
              disabled={fieldsLength === 1}
            >
              <Trash2 aria-hidden="true" className="h-4 w-4 text-chart-5" />
            </Button>
          </div>

          <FieldError className="text-xs" errors={[fieldState.error]} />
        </Field>
      )}
    />
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
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel
            htmlFor={field.name}
            className="flex items-center justify-between"
          >
            <span>Marka pojazdu</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{brandMaxLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: Volvo"
            maxLength={brandMaxLength}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
// =================================================================
// select vehicle kind - this field set kind of vehicle
// =================================================================
function VehicleKindSelect() {
  const { control } = useFormContext<EditVehicleTypes>();
  return (
    <Controller
      control={control}
      name={"vehicleKind"}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name}>
            Wybierz kategorię pojazdu
          </FieldLabel>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder="np: ciężarówka" />
            </SelectTrigger>
            <SelectContent position={"popper"}>
              {bodyType.map((kind) => (
                <SelectItem key={kind.id} value={kind.bodyName}>
                  {kind.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
