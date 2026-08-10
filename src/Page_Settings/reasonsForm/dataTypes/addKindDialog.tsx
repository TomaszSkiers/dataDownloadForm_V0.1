import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useKindOfDataStorage } from "@/store/useKindOfDataStorage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import z from "zod"
import { INPUT_CHARS_LIMITER } from "../../../../constants/initialData"
import { Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { IKindOfData } from "../../../../constants/kindsOfData"

const maxTitle = INPUT_CHARS_LIMITER.addKindDialog.title
const maxDescription = INPUT_CHARS_LIMITER.addKindDialog.description

const FormSchema = z.object({
  title: z.string().min(1, "* tytuł jest wymagany").max(maxTitle),
  description: z.string().min(1, "* opis jest wymagany").max(maxDescription),
})

type FormTypes = z.infer<typeof FormSchema>

export default function AddKindDialog() {
  const open = useKindOfDataStorage((s) => s.isAddKindDialogOpen)
  const onOpenChange = useKindOfDataStorage((s) => s.setIsAddKindDialogOpen)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Dodaj rodzaj danych.</DialogTitle>
          <DialogDescription>
            Dodawanie nowej kategorii danych tachografu.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        <AddKindForm />
      </DialogContent>
    </Dialog>
  )
}

function AddKindForm() {
  const addKind = useKindOfDataStorage((s) => s.addKind)
  const closeDialog = useKindOfDataStorage((s) => s.setIsAddKindDialogOpen)

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", description: "" },
  })

  const onSubmit = (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return
    const finalData: IKindOfData = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
    }
    addKind(finalData)
    toast.success(
      <>
        Rodzaj danych{" "}
        <span className="font-semibold text-chart-3">{data.title}</span>{" "}
        został dodany.
      </>
    )
    closeDialog(false)
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <TitleField />
        <DescriptionField />
        <Separator className="bg-chart-10" />
        <Button type="submit" variant="outline" size="sm" disabled={form.formState.isSubmitSuccessful}>
          <Save className="text-chart-2" />
          <span>Dodaj rodzaj</span>
        </Button>
      </form>
    </FormProvider>
  )
}

function TitleField() {
  const { control } = useFormContext<FormTypes>()
  return (
    <Controller control={control} name="title"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Tytuł kategorii</span>
            <span className="text-muted-foreground text-xs">{(field.value ?? "").length}/{maxTitle}</span>
          </FieldLabel>
          <Input {...field} id={field.name} placeholder="np: Dane kalibracyjne" maxLength={maxTitle} aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

function DescriptionField() {
  const { control } = useFormContext<FormTypes>()
  return (
    <Controller control={control} name="description"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Opis kategorii</span>
            <span className="text-muted-foreground text-xs">{(field.value ?? "").length}/{maxDescription}</span>
          </FieldLabel>
          <Input {...field} id={field.name} placeholder="np: Historia kalibracji i parametry techniczne" maxLength={maxDescription} aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}