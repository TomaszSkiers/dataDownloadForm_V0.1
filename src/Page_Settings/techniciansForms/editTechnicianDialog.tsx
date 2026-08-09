import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTechniciansStore } from "@/store/useTechnicianStorage";
import z from "zod";
import {
  INPUT_CHARS_LIMITER,
  Technician,
} from "../../../constants/initialData";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const maxNameLength = INPUT_CHARS_LIMITER.editTechnicianDialog.technicianName;
const maxCardName = INPUT_CHARS_LIMITER.editTechnicianDialog.technicianCard;

// =================================================================
// main dialog EditTechnician
// =================================================================
export default function EditTechnicianDialog() {
  const technicianToEdit = useTechniciansStore((s) => s.technicianToEdit);
  const closeEditTechnicianDialog = useTechniciansStore(
    (s) => s.closeEditTechnicianDialog,
  );

  return (
    <Dialog
      open={Boolean(technicianToEdit)}
      onOpenChange={(open) => !open && closeEditTechnicianDialog()}
    >
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja technika.</DialogTitle>
          <DialogDescription>
            Edytujesz dane technika{" "}
            <span className="text-chart-5 font-bold">
              {technicianToEdit?.fullName}
            </span>
            .
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        {technicianToEdit && (
          <EditTechnicianForm technicianObj={technicianToEdit} />
        )}
      </DialogContent>
    </Dialog>
  );
}
// =================================================================
// form
// =================================================================
const FormSchema = z.object({
  technicianName: z
    .string()
    .min(1, "* imię i nazwiko jest obowiązkowe")
    .max(maxNameLength),
  technicianCard: z
    .string()
    .min(1, "* nr karty jest obowiązkowy")
    .max(maxCardName),
});
type FormTypes = z.infer<typeof FormSchema>;

function EditTechnicianForm({ technicianObj }: { technicianObj: Technician }) {
  const updateTechnician = useTechniciansStore((s) => s.updateTechnician);
  const closeEditDialog = useTechniciansStore(
    (s) => s.closeEditTechnicianDialog,
  );

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      technicianName: technicianObj.fullName,
      technicianCard: technicianObj.cardNumber,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return;
    const finalData: Technician = {
      id: technicianObj.id,
      fullName: data.technicianName,
      cardNumber: data.technicianCard,
    };
    updateTechnician(finalData);

    toast.success(
      <span>
        Technik{" "}
        <span className="font-semibold text-chart-3">
          {data.technicianName}
        </span>{" "}
        został zaktualizowany
      </span>,
    );
    closeEditDialog();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FieldTechnicianName />
        <FieldTechnicianCardNumber />
        <Button
          type={"submit"}
          variant="outline"
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
// field technician name
// =================================================================
function FieldTechnicianName() {
  const { control } = useFormContext<FormTypes>();

  return (
    <Controller
      control={control}
      name={"technicianName"}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel
            htmlFor={field.name}
            className="flex items-center justify-between"
          >
            <span>Imię i nazwisko technika</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{maxNameLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: Jan Kowalski"
            maxLength={maxNameLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    ></Controller>
  );
}
// =================================================================
// field technician card number
// =================================================================
function FieldTechnicianCardNumber() {
  const { control } = useFormContext<FormTypes>();

  return (
    <Controller
      control={control}
      name={"technicianCard"}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel
            htmlFor={field.name}
            className="flex items-center justify-between"
          >
            <span>Nr karty warsztatowej</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{maxCardName}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: PL0000000001234"
            maxLength={maxCardName}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    ></Controller>
  );
}
