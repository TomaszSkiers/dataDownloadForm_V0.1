import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Control,
  FormProvider,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  useFormContext,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

//todo =============================================================
//* trzeba się zastanowić nad ograniczeniem ilości wprowadzanych znaków do inputów
//* dobrą sprawą był by liczniczek znaków
//* później przy drukowaniu potrzebne jest ograniczenie długości tekstu

//* trzeba przepisać i przeanalizować jeszcze raz ten komponent i wyświetlanie listy
//* oraz zrobić edycję pojazdu

//* przepisać usuwanie pojazdu
//! zaczynamy od analizy i przepisania dodawania pojazdu
//todo =============================================================

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
        <Separator />
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
    .min(1, "Wymagany minimum 1 typ pojazdu"),
  category: z.string().min(1, "Wybierz kategorię pojazdu"),
});

type typeFormSchema = z.infer<typeof formSchema>;

interface AddVehicleFormProps {
  onClose: () => void;
}

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


function AddVehicleForm({ onClose }: AddVehicleFormProps) {
  const addVehiceToStore = useVehicalStorage2((s) => s.addVehicle);
  const form = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
    // mode: "onChange",
    defaultValues: {
      name: "",
      types: [
        { value: "" },
        // { value: "FH" },
        // { value: "FH16" },
        // { value: "FM" },
        // { value: "FMX" },
      ],
      category: "",
    },
  });

  const onSubmit = (data: typeFormSchema) => {
    console.log("zamykam formę v.3", data);
    const finalData: Vehicle = {
      ...data,
      types: data.types.map((t) => t.value),
      id: uuidv4(),
    };
    addVehiceToStore(finalData);
    toast.success('Dodano nowy pojazd do bazy dnych')
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <BrandName />
        <Separator />
        <DynamicTypesSection />
        <ArrayErrorDisplay />
        <Separator />
        <SelectField />
        <Separator />
        <Button type={"submit"}>zapisz pojazd</Button>
      </form>
    </FormProvider>
  );
}

// =================================================================
// select - ustawia rodzaj pojazdu - ciężarówka - autobus itp
// =================================================================
function SelectField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kategoria pojazdu</FormLabel>
          <FormControl>
            <SelectKindOfVehicle
              value={field.value}
              onValueChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// =================================================================
// select - ustawia rodzaj pojazdu - ciężarówka - autobus itp
// =================================================================
interface SelectKindOfVehicleProps {
  // Przekazujemy wartość z RHF
  value: string;
  // Funkcja RHF aktualizująca stan formularza
  onValueChange: (value: string) => void;
}

function SelectKindOfVehicle({
  value,
  onValueChange,
}: SelectKindOfVehicleProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger className="w-full sm:w-1/2">
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
  );
}

// =================================================================
// komponent dodawania typu pojazdu - przycisk i etykieta - komponent 3
// =================================================================

interface VehicleTypeSectionProps {
  onAddType: () => void;
}

interface VehicleTypeSectionProps {
  onAddType: () => void;
}

export function VehicleTypeSectionHeader({
  onAddType,
}: VehicleTypeSectionProps) {
  return (
    <div className="flex items-center justify-between">
      {/* FormLabel automatycznie reaguje na stan błędu w FormItem */}
      <FormLabel>Typ pojazdu</FormLabel>

      <Button type="button" variant="outline" onClick={onAddType}>
        <Plus className="mr-2 h-4 w-4" />
        <span className="text-sm font-medium">dodaj typ</span>
      </Button>
    </div>
  );
}

// function VehicleTypeSectionHeader({ onAddType }: VehicleTypeSectionProps) {
//   return (
//     <div className="border flex items-center justify-between">
//       <label className="text-sm font-medium ">typ pojazdu</label>
//       <Button type="button" variant={"outline"} onClick={onAddType}>
//         <Plus />
//         <p className="text-sm font-medium">dodaj typ</p>
//       </Button>
//     </div>
//   );
// }

// =================================================================
// komponent generowania wierszy typu pojazdu wrapper
// =================================================================
function DynamicTypesSection() {
  const { control, clearErrors } = useFormContext<typeFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "types",
  });

  return (
    // Owijamy w FormField i FormItem, aby przekazać stan błędu do podkomponentów
    <FormField
      control={control}
      name="types"
      render={() => (
        <FormItem>
          <VehicleTypeSectionHeader
            onAddType={() => {
              append({ value: "" });
              clearErrors("types");
            }}
          />
          <TypesList fields={fields} control={control} remove={remove} />
          {/* Opcjonalnie: wyświetli komunikat z Zoda (np. "wymagany minimum 1 typ pojazdu") */}
          {/* <FormMessage /> */} {/* to wyłączam bo lepszy array messagae */}
        </FormItem>
      )}
    />
  );
}

// function DynamicTypesSection() {
//   const { control, clearErrors } = useFormContext<typeFormSchema>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "types",
//   });
//   return (
//     <div>
//       <VehicleTypeSectionHeader
//         onAddType={() => {
//           append({ value: "" });
//           clearErrors("types");
//         }}
//       />

//       <TypesList fields={fields} control={control} remove={remove} />
//     </div>
//   );
// }

// =================================================================
// komponent generowania wierszy typu pętla
// =================================================================

import { FieldArrayWithId } from "react-hook-form";

// 1. Interfejs propsów dla komponentu listy
interface TypesListProps {
  fields: FieldArrayWithId<typeFormSchema, "types", "id">[];
  control: Control<typeFormSchema>;
  remove: UseFieldArrayRemove;
}

// 2. Komponent renderujący pętlę wierszy (owinięty w React.memo)

//* tu memoizuję renderowanie przed pisaniem w inpucie marki pojazdu

const TypesList = React.memo(({ fields, control, remove }: TypesListProps) => {
  return (
    <>
      {fields.map((field, index) => (
        <RowWrapper
          key={field.id}
          index={index}
          control={control}
          remove={remove}
        />
      ))}
    </>
  );
});
TypesList.displayName = "TypesList";

// =================================================================
// wiersz typu pojazdu- komponent 5
// =================================================================
// wcześniej miałem memoizację ale okazała sie nadmioarowa w tym miejscu
interface TypeInputRowProps {
  index: number;
  control: Control<typeFormSchema>;
}

function TypeInputRow({ index, control }: TypeInputRowProps) {
  return (
    <FormField
      control={control}
      name={`types.${index}.value`}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <Input placeholder="np. FH16" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// =================================================================
// wiersz typu pojazdu- komponent 5
// =================================================================
// tu memoizuję renderowanie reszty wierszy przy pisaniu w jednym z nich

interface RowWrapperProps {
  index: number;
  control: Control<typeFormSchema>;
  remove: UseFieldArrayRemove;
}

const RowWrapper = React.memo(({ index, control, remove }: RowWrapperProps) => {
  const buttonClick = () => {
    remove(index);
  };
  return (
    <div className="flex gap-1">
      <TypeInputRow index={index} control={control} />
      {/* <Button type="button" onClick={buttonClick}>Usuń</Button> */}
      <RemoveVehicleTypeButton onRemove={buttonClick} />
    </div>
  );
});
RowWrapper.displayName = "RowWrapper";

// =================================================================
// wyświetlanie błędu o braku typów - komponent 8
// =================================================================

import { useFormState } from "react-hook-form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bodyType, Vehicle } from "../../../../constants/initialData";
import { Separator } from "@/components/ui/separator";
import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { toast } from "sonner";

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
      {String(arrayError)} - array
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
// marka pojazdu - komponent 6
// =================================================================

function BrandName() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <OptimizedFormLabel>Marka pojazdu</OptimizedFormLabel>
          <FormControl>
            <Input placeholder="np. Volvo" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
