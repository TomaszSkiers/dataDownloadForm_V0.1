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
import { toast } from "sonner"
import { IKindOfData } from "../../../../constants/kindsOfData"

const maxTitle = INPUT_CHARS_LIMITER.editKindDialog.title
const maxDescription = INPUT_CHARS_LIMITER.editKindDialog.description

const FormSchema = z.object({
  title: z.string().min(1, "* tytuł jest wymagany").max(maxTitle),
  description: z.string().min(1, "* opis jest wymagany").max(maxDescription),
})

type FormTypes = z.infer<typeof FormSchema>

export default function EditKindDialog() {
  const kindToEdit = useKindOfDataStorage((s) => s.kindToEdit)
  const setKindToEdit = useKindOfDataStorage((s) => s.setKindToEdit)

  return (
    <Dialog
      open={Boolean(kindToEdit)}
      onOpenChange={(open) => !open && setKindToEdit(null)}
    >
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja rodzaju danych.</DialogTitle>
          <DialogDescription>
            Edytujesz kategorię{" "}
            <span className="text-chart-5 font-bold">{kindToEdit?.title}</span>.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        {kindToEdit && <EditKindForm kindObj={kindToEdit} />}
      </DialogContent>
    </Dialog>
  )
}

function EditKindForm({ kindObj }: { kindObj: IKindOfData }) {
  const editKind = useKindOfDataStorage((s) => s.editKind)
  const setKindToEdit = useKindOfDataStorage((s) => s.setKindToEdit)

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: kindObj.title,
      description: kindObj.description,
    },
  })

  const onSubmit = (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return
    const finalData: IKindOfData = {
      id: kindObj.id,
      title: data.title,
      description: data.description,
    }
    editKind(finalData)
    toast.success(
      <span>
        Rodzaj danych{" "}
        <span className="font-semibold text-chart-3">{data.title}</span>{" "}
        został zaktualizowany.
      </span>
    )
    setKindToEdit(null)
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <TitleField />
        <DescriptionField />
        <Separator className="bg-chart-10" />
        <Button type="submit" variant="outline" size="sm" disabled={form.formState.isSubmitSuccessful}>
          <Save className="text-chart-2" />
          <span>Zapisz</span>
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