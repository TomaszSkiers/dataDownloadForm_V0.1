import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Save, Trash2 } from "lucide-react";
import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldArrayWithId,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bodyType, Vehicle } from "../../../../constants/initialData";
import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { toast } from "sonner";
import { useVehicleUiStore } from "@/store/useVehicleUiStore";
import { INPUT_CHARS_LIMITER } from "../../../../constants/initialData";

const brandMaxLength = INPUT_CHARS_LIMITER.addVehicleDialog.brand;
const typeMaxLength = INPUT_CHARS_LIMITER.addVehicleDialog.type;

// =================================================================
// main dialog AddVehicleDialog
// =================================================================

export default function AddVehicleDialog_5() {
  const open = useVehicleUiStore((state) => state.isAddDialogOpen);
  const onOpenChange = useVehicleUiStore((state) => state.setOpenAddDialog);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent >
        <div className="flex flex-col gap-0.5">
          <DialogHeader>
            <DialogTitle>Dodaj pojazd v.5</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Dodawanie nowego pojazdu do bazy danych.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </div>
        <AddVehicleForm />
      </DialogContent>
    </Dialog>
  );
}
// =================================================================
// main form - schema - rhf - onSubmit
// =================================================================
const addVehicleFormSchema = z.object({
  vehicleBrand: z.string().min(1, "* wymagany min 1 znak").max(brandMaxLength),
  vehicleTypes: z
    .array(
      z.object({
        value: z.string().min(1, "* wymagany min 1 znak").max(typeMaxLength),
      }),
    )
    .min(1, "* brak typu pojazdu"),
  category: z.string().min(1, "* kategoria jest wymagana"),
});
type AddVehicleFormValues = z.infer<typeof addVehicleFormSchema>;

function AddVehicleForm() {
  const addVehiceToStore = useVehicalStorage2((s) => s.addVehicle);
  const onSuccess = useVehicleUiStore((s) => s.closeAddDialog);
  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleFormSchema),
    defaultValues: {
      vehicleBrand: "",
      vehicleTypes: [{ value: "" }],
      category: "",
    },
  });

  const onSubmit = (data: AddVehicleFormValues) => {
    console.log("dane z formularza :", data);
    const finalData: Vehicle = {
      name: data.vehicleBrand,
      types: data.vehicleTypes.map((t) => t.value),
      category: data.category,
      id: uuidv4(),
    };
    addVehiceToStore(finalData);
    form.reset();
    toast.success(
      <span>
        <span>Pojazd </span>
        <span className="font-semibold text-chart-3">{data.vehicleBrand}</span>
        <span> został dodany do bazy danych.</span>
      </span>,
    );
    onSuccess();
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <BrandNameField />
        <Separator className="bg-chart-10" />
        <VehicleTypesWrapper />
        <Separator className="bg-chart-10" />
        <VehicleKindSelect />
        <Button
          type="submit"
          variant="outline"
          disabled={form.formState.isSubmitting}
        >
          <Save color="green" />
          <span>zapisz</span>
        </Button>
      </form>
    </FormProvider>
  );
}
// =================================================================
// wrapper dla komponentów ogarniających typ pojazdu
// =================================================================
function VehicleTypesWrapper() {
  const { control } = useFormContext<AddVehicleFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicleTypes",
  });

  return (
    <fieldset>
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
          <CirclePlus aria-hidden="true" color="green" />
          <span>Dodaj typ</span>
        </Button>
      </div>
      <TypesMapLoop fields={fields} onRemove={remove} />
      <ArrayErrorDisplay />
    </fieldset>
  );
}

// =================================================================
// SELECT - ustawia rodzaj pojazdu - ciężarówka - autobus itp
// =================================================================
function VehicleKindSelect() {
  const { control } = useFormContext<AddVehicleFormValues>();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Kategoria pojazdu</FormLabel>

          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={cn(
                  "w-full sm:w-1/2",
                  fieldState.error && "border-destructive",
                )}
              >
                <SelectValue placeholder="np: ciężarówka" />
              </SelectTrigger>

              <SelectContent position="popper">
                {bodyType.map((type) => (
                  <SelectItem key={type.id} value={type.bodyName}>
                    {type.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
// =================================================================
// wyświetlanie błędu o braku typów - komponent 8
// =================================================================
function ArrayErrorDisplay() {
  const { control } = useFormContext<AddVehicleFormValues>();

  const { errors } = useFormState({
    control,
    name: "vehicleTypes",
  });

  const typesError = errors.vehicleTypes;

  const arrayError = typesError?.root?.message || typesError?.message;

  if (!arrayError) return null;

  return (
    <p role="alert" className="text-destructive text-sm">
      {arrayError}
    </p>
  );
}

// =================================================================
// Types.Map() - loop
// =================================================================
interface TypesLoopProps {
  fields: FieldArrayWithId<AddVehicleFormValues, "vehicleTypes", "id">[];
  onRemove: (index: number) => void;
}
function TypesMapLoop({ fields, onRemove }: TypesLoopProps) {
  const { control } = useFormContext<AddVehicleFormValues>();

  return (
    <>
      {fields.map((item, index) => {
        return (
          <FormField
            key={item.id}
            control={control}
            name={`vehicleTypes.${index}.value`}
            render={({ field }) => {
              return (
                <FormItem className="p-2 border-t ">
                  <FormLabel className="text-xs flex justify-between">
                    <span>Typ pojazdu {index + 1}</span>
                    <span className="text-muted-foreground text-xs">
                      {field.value?.length ?? 0}/{typeMaxLength}
                    </span>
                  </FormLabel>
                  <div className="flex gap-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="np: FH 16"
                        maxLength={typeMaxLength}
                      />
                    </FormControl>
                    <RemoveVehicleTypeButton
                      onRemove={onRemove}
                      index={index}
                      fields={fields.length}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );
      })}
    </>
  );
}
// =================================================================
// przycisk usuwania typu pojazdu - komponent 7
// =================================================================
interface RemoveVehicleTypeButtonProps {
  index: number;
  onRemove: (index: number) => void;
  fields: number;
}

const RemoveVehicleTypeButton = React.memo(function RemoveVehicleTypeButton({
  index,
  onRemove,
  fields,
}: RemoveVehicleTypeButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Usuń typ pojazdu ${index + 1}`}
      className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      onClick={() => onRemove(index)}
      disabled={fields === 1}
    >
      <Trash2 aria-hidden="true" className="h-4 w-4" />
    </Button>
  );
});

// =================================================================
// brand name field
// =================================================================
function BrandNameField() {
  const { control } = useFormContext<AddVehicleFormValues>();

  return (
    <FormField
      control={control}
      name="vehicleBrand"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between">
            <span>Marka pojazdu</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{brandMaxLength}
            </span>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="np: Volvo"
              maxLength={brandMaxLength}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
