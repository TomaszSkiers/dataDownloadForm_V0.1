import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import z from "zod";
import { INPUT_CHARS_LIMITER, WORKSHOP } from "../../../constants/initialData";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const nameMaxLength = INPUT_CHARS_LIMITER.addWorkshopDialog.workshopName;
const addressMaxLength = INPUT_CHARS_LIMITER.addWorkshopDialog.workshopAddress;

export default function AddWorkshopDialog() {
  const open = useWorkshopStore((s) => s.isAddWorkshopDialogOpen);
  const onOpenChange = useWorkshopStore((s) => s.setIsAddWorkshopDialogOpen);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-0.5">
          <DialogTitle>Dodaj punkt.</DialogTitle>
          <DialogDescription>
            Dodawanie nowego punktu warsztatowego do bazy danych
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>

        <AddWorkshopForm />
      </DialogContent>
    </Dialog>
  );
}
// =================================================================
// main form - schema - rhf - onSubmit
// =================================================================

const addWorkshopFormSchema = z.object({
  workshopName: z.string().min(1, "* nazwa jest wymagana").max(nameMaxLength),
  workshopAddress: z
    .string()
    .min(1, "* adres jest wymagany")
    .max(addressMaxLength),
});
type AddWorkshopFormValues = z.infer<typeof addWorkshopFormSchema>;

function AddWorkshopForm() {
  const addWorkshopToStore = useWorkshopStore((s) => s.addWorkshop);
  const onSuccess = useWorkshopStore((s) => s.setIsAddWorkshopDialogOpen);
  const form = useForm<AddWorkshopFormValues>({
    resolver: zodResolver(addWorkshopFormSchema),
    defaultValues: {
      workshopName: "",
      workshopAddress: "",
    },
  });

  const onSubmit = (data: AddWorkshopFormValues) => {
    if (form.formState.isSubmitSuccessful) return;

    const finalData: WORKSHOP = {
      id: uuidv4(),
      name: data.workshopName,
      address: data.workshopAddress,
    };

    addWorkshopToStore(finalData);

    toast.success(
      <>
        <span>Warsztat </span>
        <span className="font-semibold text-chart-3">{data.workshopName}</span>
        <span> został dodany do bazy danych.</span>
      </>,
    );
    onSuccess(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <WorkshopNameField />
        <Separator />
        <WorkshopAddressField />
        <Separator className="bg-chart-10" />
        <Button
          type="submit"
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
// workshop address field
// =================================================================
function WorkshopAddressField() {
  const { control } = useFormContext<AddWorkshopFormValues>();

  return (
    <FormField
      control={control}
      name="workshopAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between">
            <span>Adres warsztatu</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{addressMaxLength}
            </span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="np. ul. Przykładowa 12, 00-000 Warszawa"
              maxLength={addressMaxLength}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
// =================================================================
// workshop name field
// =================================================================
function WorkshopNameField() {
  const { control } = useFormContext<AddWorkshopFormValues>();

  return (
    <FormField
      control={control}
      name="workshopName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between">
            <span>Nazwa warsztatu</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{nameMaxLength}
            </span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="np. TACHO-SERVICE Jan Kowalski"
              maxLength={nameMaxLength}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
