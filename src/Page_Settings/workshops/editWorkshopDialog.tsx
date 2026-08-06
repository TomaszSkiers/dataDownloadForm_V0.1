import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useWorkshopStore} from "@/store/useWorkshopStore";
import z from "zod";
import { INPUT_CHARS_LIMITER, WORKSHOP } from "../../../constants/initialData";
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

const nameMaxLength = INPUT_CHARS_LIMITER.editWorkshopDialog.workshopName;
const addressMaxLength = INPUT_CHARS_LIMITER.editWorkshopDialog.workshopAddress;

export default function EditWorkshopDialog() {
  const workshopToEdit = useWorkshopStore((s) => s.workshopToEdit);
  const closeDialog = useWorkshopStore((s) => s.closeWorkshopEditDialog);

  return (
    <Dialog
      open={Boolean(workshopToEdit)}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja punktu.</DialogTitle>
          <DialogDescription>
            Edytujesz dane warsztatu
            <span className="text-chart-5 font-bold">
              {" "}
              {workshopToEdit?.name}
            </span>
            .
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        {workshopToEdit && <EditWorkshopForm workshopObj={workshopToEdit} />}
      </DialogContent>
    </Dialog>
  );
}
// =================================================================
// form
// =================================================================
interface EditFormProps {
  workshopObj: WORKSHOP;
}

const EditSchema = z.object({
  workshopName: z
    .string()
    .min(1, "* Nazwa jest obowiazkowa")
    .max(nameMaxLength),
  workshopAddress: z
    .string()
    .min(1, "* Adres jest obowiązkowy")
    .max(addressMaxLength),
});

type EditWorkshopTypes = z.infer<typeof EditSchema>;

function EditWorkshopForm({ workshopObj }: EditFormProps) {
  const save = useWorkshopStore((s) => s.editWorkshop);
  const onSuccess = useWorkshopStore((s) => s.closeWorkshopEditDialog);

  const form = useForm<EditWorkshopTypes>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      workshopName: workshopObj.name,
      workshopAddress: workshopObj.address,
    },
  });

  const onSubmit = (data: EditWorkshopTypes) => {
    const finalData: WORKSHOP = {
      id: workshopObj.id,
      name: data.workshopName,
      address: data.workshopAddress,
    };
    save(finalData);
    form.reset();
    toast.success(
      <>
        Punkt serwisowy{" "}
        <span className="font-semibold text-chart-3">{data.workshopName}</span>{" "}
        został zaktualizowany.
      </>,
    );
    onSuccess();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FieldName />
        <FieldAddress />
        <Separator className="bg-chart-10" />
        <Button type="submit" variant={"outline"}>
          <Save className="text-chart-2" />
          <span>zapisz</span>
        </Button>
      </form>
    </FormProvider>
  );
}
// =================================================================
// field name - intput name
// =================================================================
function FieldName() {
  const { control } = useFormContext<EditWorkshopTypes>();
  return (
    <Controller
      control={control}
      name={"workshopName"}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel
            htmlFor={field.name}
            className="flex items-center justify-between"
          >
            <span>Nazwa warsztatu</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{nameMaxLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: TACHO-SERWIS"
            maxLength={nameMaxLength}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
// =================================================================
// field address - intput address
// =================================================================
function FieldAddress() {
  const { control } = useFormContext<EditWorkshopTypes>();
  return (
    <Controller
      control={control}
      name={"workshopAddress"}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel
            htmlFor={field.name}
            className="flex items-center justify-between"
          >
            <span>Adres warsztatu</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{addressMaxLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: 01-849 Warszawa, ul. Wiejska 1"
            maxLength={addressMaxLength}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
