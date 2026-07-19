import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { vehicleSchema, Vehicle } from "../../../../constants/initialData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

// =================================================================
// główny formularz - komponent 2
// =================================================================

const formSchema = z.object({
  name: z.string().min(1, "wymagany min 1 znak"),
  types: z
    .array(
      z.object({
        value: z.string().min(1, "wymagany min 1 znak"),
      }),
    )
    .min(1, "wymagany minimum 1 typ"),
});

type typeFormSchema = z.infer<typeof formSchema>;

interface AddVehicleFormProps {
  onClose: () => void;
}
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2 } from "lucide-react";
import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OptimizedFormLabel } from "@/components/ui/labenNoRender";
import { Input } from "@/components/ui/input";

function AddVehicleForm({ onClose }: AddVehicleFormProps) {
  const form = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "Volvo",
      // category: "truck",
      types: [
        { value: "FH" },
        { value: "FH16" },
        { value: "FM" },
        { value: "FMX" },
      ],
    },
  });

  const onSubmit = () => {
    console.log("zamykam formę v.3");
    //? brakuje konwersji na typ danych używanych w bazie danych
    //? brakuje zapisu do bazy danych
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <BrandName />
        <DynamicTypesSection />
        <Button type={"submit"}>zapisz pojazd</Button>
      </form>
    </FormProvider>
  );
}

// =================================================================
// komponent dodawania typu pojazdu - przycisk i etykieta - komponent 3
// =================================================================
interface VehicleTypeSectionProps {
  onAddType: () => void;
}

function VehicleTypeSectionHeader({ onAddType }: VehicleTypeSectionProps) {
  return (
    <div className="border flex items-center justify-between">
      <label className="text-sm font-medium ">typ pojazdu</label>
      <Button type="button" variant={"outline"} onClick={onAddType}>
        <Plus />
        <p className="text-sm font-medium">dodaj typ</p>
      </Button>
    </div>
  );
}

// =================================================================
// komponent generowania wierszy typu pojazdu - komponent 4
// =================================================================

//todo nowość jakiej się nauczyłem to clearErrors

function DynamicTypesSection() {
  const { control, clearErrors } = useFormContext<typeFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "types",
  });
  return (
    <div>
      <VehicleTypeSectionHeader
        onAddType={() => {
          append({ value: "" });
          clearErrors("types");
        }}
      />
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex ">
            <TypeInputRow index={index} className="flex-1" />
            <RemoveVehicleTypeButton
              onRemove={() => {
                remove(index);
              }}
            />
          </div>
        ))}
      </div>
      {/** ten komponent nie potrzebnie renderuje mnósto innych */}
      <ArrayErrorDisplay />
    </div>
  );
}

// =================================================================
// wyświetlanie błędu o braku typów - komponent 8
// =================================================================
//! przeanalizować dlaczego przy próbie dostępu do błędów mam tyle nie potrzebnych renderowań
//todo  nie rozumiem jeszcze jak dotrzeć do błędów i je wyskubać z obiekut rhf
//todo  nowość dla mnie to hook useFormState - muszę się go nauczyć
//* obserwacje - ten komponent wprowadził dodatkowe nie potrzebne renderowanie i wymaga
//* dokładniejszych obserwacji
//* moim zdaniem lepsze będzie wprowadzenie własnego monitorowania czy dodano typ pojazdu
//* niech zod dba o walidację formularza ale informację o błędach pozyskam sobie sprawdzając długość tablicy typów

import { useFormState } from "react-hook-form";

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
  const arrayError = typesError?.root?.message || typesError?.message;

  if (!arrayError) return null;

  return (
    <p className="text-sm font-medium text-destructive animate-in fade-in-50 duration-200 mt-2">
      {String(arrayError)}
    </p>
  );
}

// =================================================================
// przycisk usuwania typu pojazdu - komponent 7
// =================================================================

interface RemoveVehicleTypeButtonPorps {
  onRemove: () => void;
}

function RemoveVehicleTypeButton({ onRemove }: RemoveVehicleTypeButtonPorps) {
  return (
    <Button
      type="button"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      onClick={onRemove}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

// =================================================================
// wiersz typu pojazdu- komponent 5
// =================================================================

interface TypeInputRowProps {
  index: number;
  className?: string;
}

function TypeInputRow({ index, className }: TypeInputRowProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={`types.${index}.value`}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormControl>
            <Input {...field} placeholder="wpisz typ pojazdu" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// =================================================================
// marka pojazdu - komponent 6
// =================================================================

function BrandName() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <FormItem>
          <OptimizedFormLabel>Marka pojazdu</OptimizedFormLabel>
          <FormControl>
            <Input placeholder="np. Toyota Prius" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
