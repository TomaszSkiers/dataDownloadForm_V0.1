import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
//todo =============================================================
//* dodać SELECTA z kategorią pojazdu
//* poprawić funkcję onSubmit
//* przepisać kod jeszcze raz
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
        <AddVehicleForm onSuccess={() => onOpenChange(false)} />
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
  types: z
    .array(z.object({ value: z.string().min(1, "* wymagany min 1 znak") }))
    .min(1, "* wymagany min 1 typ pojazdu"),
});
type typeFormSchema = z.infer<typeof formSchema>;

function AddVehicleForm({ onSuccess }: AddVehicleFormProps) {
  const form = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleBrand: "",
      types: [{ value: "" }],
    },
  });

  const { isSubmitting } = form.formState;

  // //todo === debugger ============
  // const {errors} = form.formState
  // console.log(errors)
  // //todo =========================

  const onSubmit = async (data: typeFormSchema) => {
    console.log("dane z formularza :", data);
    form.reset();
    onSuccess();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <BrandNameField />
        <Separator />
        <VehicleTypesWrapper />
        <Separator />
        <Button type={"submit"} disabled={isSubmitting}>
          {isSubmitting ? "Zapisywanie..." : "Zapisz"}
        </Button>
      </form>
    </FormProvider>
  );
}

// =================================================================
// wrapper dla komponentów ogarniających typ pojazdu
// =================================================================
//* potrzebuję tu przycisk dodawania nowego typu, label, pętlę, przycisk usuwania typu
function VehicleTypesWrapper() {
  const { control } = useFormContext<typeFormSchema>();
  const { fields, append, remove } = useFieldArray({ control, name: "types" });
  return (
    <>
      <TypesHeader addType={append} />
      <TypesMapLoop fields={fields} onRemove={remove} />
      <ArrayErrorDisplay />
    </>
  );
}
// =================================================================
// Types.Map() - loop
// =================================================================
interface TypesLoopProps {
  fields: FieldArrayWithId<typeFormSchema, "types", "id">[];
  onRemove: (index: number) => void;
}
function TypesMapLoop({ fields, onRemove }: TypesLoopProps) {
  const { control } = useFormContext<typeFormSchema>();

  return (
    <>
      {fields.map((item, index) => (
        <FormField
          key={item.id} // 1. Obowiązkowy klucz z ID od useFieldArray
          control={control}
          name={`types.${index}.value`} // 2. Indeks w nazwie pola działa prawidłowo
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex gap-1">
                <FormControl>
                  <Input placeholder="np. FH16" {...field} />
                </FormControl>
                <RemoveVehicleTypeButton onRemove={onRemove} index={index} />
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}

// =================================================================
// przycisk usuwania typu pojazdu - komponent 7
// =================================================================

interface RemoveVehicleTypeButtonProps {
  index: number;
  onRemove: (index: number) => void;
}

const RemoveVehicleTypeButton = React.memo(function RemoveVehicleTypeButton({
  index,
  onRemove,
}: RemoveVehicleTypeButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      onClick={() => onRemove(index)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
});

// =================================================================
// TypesHeader
// =================================================================

interface TypeHeaderProps {
  addType: (item: { value: string }) => void;
}

function TypesHeader({ addType }: TypeHeaderProps) {
  const {
    control,
    clearErrors,
    // formState: { errors },
  } = useFormContext<typeFormSchema>();

  const buttonClick = () => {
    addType({ value: "" });
    clearErrors("types");
  };

  const { errors } = useFormState({
    control,
    name: "types",
  });

  const hasError = !!errors.types;

  return (
    <div className="flex justify-between">
      <Label className={cn(hasError && "text-destructive")}>Typ pojazdu</Label>
      <Button type="button" size={"sm"} onClick={buttonClick}>
        <CirclePlus />
        <span>dodaj</span>
      </Button>
    </div>
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

// =================================================================
// wyświetlanie błędu o braku typów - komponent 8
// =================================================================
function ArrayErrorDisplay() {
  const { control } = useFormContext<typeFormSchema>();

  // 1. Używamy useFormState, aby ZAWSZE wymusić odświeżenie tego komponentu,
  // gdy zmienią się błędy w tablicy "types"
  const { errors } = useFormState({
    control,
    name: "types",
  });

  // 2. Wyłuskujemy błąd w zależności od wersji Zod/RHF
  const typesError = errors.types;
  console.log(typesError);

  // 3. To jest fajne bo pokazuje błąd od razu gdy usunę typ i przy submicie też
  const arrayError = typesError?.root?.message || typesError?.message;

  if (!arrayError) return null;

  return (
    <Label className='text-destructive'>{arrayError}</Label>
  );
}
