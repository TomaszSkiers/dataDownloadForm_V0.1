import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useReasonStorage } from "@/store/useReasonsStorage"
import { IReasonDownload } from "../../../../constants/downloadReasons"
import { INPUT_CHARS_LIMITER } from "../../../../constants/initialData"
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const maxReasonLength = INPUT_CHARS_LIMITER.editReasonDialog.reason
const maxLegalBasisLength = INPUT_CHARS_LIMITER.editReasonDialog.legal_basis

// =================================================================
// Dialog
// =================================================================
export default function EditReasonDialog() {
  const reasonToEdit = useReasonStorage((s) => s.reasonToEdit)
  const setReasonToEdit = useReasonStorage((s) => s.setReasonToEdit)

  return (
    <Dialog
      open={Boolean(reasonToEdit)}
      onOpenChange={(open) => !open && setReasonToEdit(null)}
    >
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja powodu pobierania danych.</DialogTitle>
          <DialogDescription>
            Edytujesz powód:{" "}
            <span className="text-chart-5 font-bold">
              {reasonToEdit?.reason}
            </span>
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        {reasonToEdit && <EditReasonForm reasonObj={reasonToEdit} />}
      </DialogContent>
    </Dialog>
  )
}

// =================================================================
// Schema
// =================================================================
const FormSchema = z.object({
  reason: z
    .string()
    .min(1, "* powód jest wymagany")
    .max(maxReasonLength, `* maksymalnie ${maxReasonLength} znaków`),
  legal_basis: z
    .string()
    .min(1, "* podstawa prawna jest wymagana")
    .max(maxLegalBasisLength, `* maksymalnie ${maxLegalBasisLength} znaków`),
})

type FormTypes = z.infer<typeof FormSchema>

// =================================================================
// Form
// =================================================================
function EditReasonForm({ reasonObj }: { reasonObj: IReasonDownload }) {
  const editReason = useReasonStorage((s) => s.editReason)
  const setReasonToEdit = useReasonStorage((s) => s.setReasonToEdit)

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: reasonObj.reason,
      legal_basis: reasonObj.legal_basis,
    },
  })

  const onSubmit = (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return

    const finalData: IReasonDownload = {
      id: reasonObj.id,
      reason: data.reason,
      legal_basis: data.legal_basis,
    }

    editReason(finalData)
    toast.success(
      <span>
        Powód{" "}
        <span className="font-semibold text-chart-3">{data.reason}</span>{" "}
        został zaktualizowany.
      </span>
    )
    setReasonToEdit(null)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <ReasonField />
        <LegalBasisField />
        <Separator className="bg-chart-10" />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={form.formState.isSubmitSuccessful}
        >
          <Save className="text-chart-2" />
          <span>Zapisz</span>
        </Button>
      </form>
    </FormProvider>
  )
}

// =================================================================
// Field — reason
// =================================================================
function ReasonField() {
  const { control } = useFormContext<FormTypes>()

  return (
    <Controller
      control={control}
      name="reason"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex items-center justify-between">
            <span>Powód pobierania danych</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{maxReasonLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: Upływ 90 dni od ostatniego pobrania"
            maxLength={maxReasonLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

// =================================================================
// Field — legal_basis
// =================================================================
function LegalBasisField() {
  const { control } = useFormContext<FormTypes>()

  return (
    <Controller
      control={control}
      name="legal_basis"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex items-center justify-between">
            <span>Podstawa prawna</span>
            <span className="text-muted-foreground text-xs">
              {(field.value ?? "").length}/{maxLegalBasisLength}
            </span>
          </FieldLabel>
          <Input
            id={field.name}
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder="np: Art. 1 pkt 3 lit. a Rozp. (UE) nr 581/2010"
            maxLength={maxLegalBasisLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}