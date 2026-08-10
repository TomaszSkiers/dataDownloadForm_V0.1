import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useReasonStorage } from "@/store/useReasonsStorage"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import z from "zod"
import { INPUT_CHARS_LIMITER } from "../../../../constants/initialData"
import { IReasonDownload } from "../../../../constants/downloadReasons"
import { Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"

const reasonMaxLength = INPUT_CHARS_LIMITER.addReasonDialog.reason
const legalBasisMaxLength = INPUT_CHARS_LIMITER.addReasonDialog.legal_basis

// =====================================================
// Dialog
// =====================================================
export default function AddReasonDialog() {
  const open = useReasonStorage((s) => s.isAddReasonDialogOpen)
  const onOpenChange = useReasonStorage((s) => s.setIsAddReasonDialogOpen)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Dodaj powód pobierania danych.</DialogTitle>
          <DialogDescription>
            Dodawanie nowego powodu do bazy danych.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        <ReasonForm />
      </DialogContent>
    </Dialog>
  )
}

// =====================================================
// Schema
// =====================================================
const AddReasonFormSchema = z.object({
  reason: z
    .string()
    .min(1, "* powód jest wymagany")
    .max(reasonMaxLength, `* maksymalnie ${reasonMaxLength} znaków`),
  legal_basis: z
    .string()
    .min(1, "* podstawa prawna jest wymagana")
    .max(legalBasisMaxLength, `* maksymalnie ${legalBasisMaxLength} znaków`),
})

type ReasonFormType = z.infer<typeof AddReasonFormSchema>

// =====================================================
// Form
// =====================================================
function ReasonForm() {
  const addReason = useReasonStorage((s) => s.addReason)
  const closeDialog = useReasonStorage((s) => s.setIsAddReasonDialogOpen)

  const form = useForm<ReasonFormType>({
    resolver: zodResolver(AddReasonFormSchema),
    defaultValues: {
      reason: "",
      legal_basis: "",
    },
  })

  const onSubmit = (data: ReasonFormType) => {
    if (form.formState.isSubmitSuccessful) return

    const finalData: IReasonDownload = {
      id: uuidv4(),
      reason: data.reason,
      legal_basis: data.legal_basis,
    }

    addReason(finalData)
    toast.success(
      <>
        Powód{" "}
        <span className="font-semibold text-chart-3">{data.reason}</span>{" "}
        został dodany do bazy danych.
      </>
    )
    closeDialog(false)
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex-1 flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
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
          <span>Dodaj powód</span>
        </Button>
      </form>
    </FormProvider>
  )
}

// =====================================================
// reason field
// =====================================================
function ReasonField() {
  const { control } = useFormContext<ReasonFormType>()

  return (
    <Controller
      control={control}
      name="reason"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Powód pobierania danych</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{reasonMaxLength}
            </span>
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="np: Upływ 90 dni od ostatniego pobrania"
            maxLength={reasonMaxLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

// =====================================================
// legal_basis field
// =====================================================
function LegalBasisField() {
  const { control } = useFormContext<ReasonFormType>()

  return (
    <Controller
      control={control}
      name="legal_basis"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Podstawa prawna</span>
            <span className="text-muted-foreground text-xs">
              {field.value?.length ?? 0}/{legalBasisMaxLength}
            </span>
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="np: Art. 1 pkt 3 lit. a Rozp. (UE) nr 581/2010"
            maxLength={legalBasisMaxLength}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}