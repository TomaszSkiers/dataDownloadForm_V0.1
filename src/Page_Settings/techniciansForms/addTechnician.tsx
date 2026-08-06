import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTechniciansStore } from "@/store/useTechnicianStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";
import {
  INPUT_CHARS_LIMITER,
  Technician,
} from "../../../constants/initialData";
import { Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const techNameMaxLength =
  INPUT_CHARS_LIMITER.addTechnicianDialog.technicianName;
const techCardMaxLength =
  INPUT_CHARS_LIMITER.addTechnicianDialog.technicianCard;

export default function AddTechnicianDialog() {
  const open = useTechniciansStore((s) => s.openAddDialog);
  const onOpenChange = useTechniciansStore((s) => s.addDialogOnOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Dodaj technika.</DialogTitle>
          <DialogDescription>
            Dodawanie nowego technika do bazy danych.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        <TechnicianForm />
      </DialogContent>
    </Dialog>
  );
}
// =====================================================
// Form
// =====================================================
const AddTechnicianFormSchema = z.object({
  technicianName: z
    .string()
    .min(1, "* imię i nazwisko jest wymagane")
    .max(techNameMaxLength),
  technicianCardNumber: z
    .string()
    .min(1, "* numer karty jest wymagany")
    .max(techCardMaxLength),
});

type TechnicianType = z.infer<typeof AddTechnicianFormSchema>;

function TechnicianForm() {
  const addTechnician = useTechniciansStore((s) => s.addTechnician);
  const onSuccess = useTechniciansStore((s) => s.closeAddTechnicianDialog);
 

  const form = useForm<TechnicianType>({
    resolver: zodResolver(AddTechnicianFormSchema),
    defaultValues: {
      technicianName: "",
      technicianCardNumber: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: TechnicianType) => {
    const finalData: Technician = {
      id: uuidv4(),
      fullName: data.technicianName,
      cardNumber: data.technicianCardNumber,
    };
    addTechnician(finalData);
    form.reset()
    toast.success(
      <>
        Technik{" "}
        <span className="font-semibold text-chart-3">
          {data.technicianName}
        </span>{" "}
        został dodany do bazy danych.
      </>,
    );
    onSuccess();
  };



  return (
    <FormProvider {...form}>
      <form
        className="flex-1 flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <NameField />
        <CardNumberField />
        <Separator className="bg-chart-10" />
        <Button
          type="submit"
          variant={"outline"}
          size={"sm"}
          disabled={isSubmitting}
        >
          <Save className="text-chart-2" />
          <span>Dodaj technika</span>
        </Button>
      </form>
    </FormProvider>
  );
}
// =====================================================
// name field
// =====================================================
function NameField() {
  const { control } = useFormContext<TechnicianType>();

  return (
    <Controller
      control={control}
      name="technicianName"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Imię i nazwisko</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{techNameMaxLength}
            </span>
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="np: Jan Kowalski"
            maxLength={techNameMaxLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
// =====================================================
// card field
// =====================================================
function CardNumberField() {
  const { control } = useFormContext<TechnicianType>();

  return (
    <Controller
      control={control}
      name="technicianCardNumber"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Nr karty warsztatowej</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{techCardMaxLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: PL00000000001234"
            maxLength={techCardMaxLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
