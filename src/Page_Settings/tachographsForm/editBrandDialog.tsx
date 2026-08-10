import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import z from "zod"

import { Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useTachographBrandsStorage } from "@/store/useTachographBrandStorage"
import { INPUT_CHARS_LIMITER } from "../../../constants/initialData"
import { TachographBrand } from "../../../constants/tachographBrands"

const maxName = INPUT_CHARS_LIMITER.editBrandDialog.name

const FormSchema = z.object({
  name: z.string().min(1, "* nazwa jest wymagana").max(maxName),
})

type FormTypes = z.infer<typeof FormSchema>

export default function EditBrandDialog() {
  const brandToEdit = useTachographBrandsStorage((s) => s.brandToEdit)
  const setBrandToEdit = useTachographBrandsStorage((s) => s.setBrandToEdit)

  return (
    <Dialog
      open={Boolean(brandToEdit)}
      onOpenChange={(open) => !open && setBrandToEdit(null)}
    >
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Edycja producenta tachografu.</DialogTitle>
          <DialogDescription>
            Edytujesz producenta{" "}
            <span className="text-chart-5 font-bold">{brandToEdit?.name}</span>.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        {brandToEdit && <EditBrandForm brandObj={brandToEdit} />}
      </DialogContent>
    </Dialog>
  )
}

function EditBrandForm({ brandObj }: { brandObj: TachographBrand }) {
  const editBrand = useTachographBrandsStorage((s) => s.editBrand)
  const setBrandToEdit = useTachographBrandsStorage((s) => s.setBrandToEdit)

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: brandObj.name },
  })

  const onSubmit = (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return
    const finalData: TachographBrand = {
      id: brandObj.id,
      name: data.name,
    }
    editBrand(finalData)
    toast.success(
      <span>
        Producent{" "}
        <span className="font-semibold text-chart-3">{data.name}</span>{" "}
        został zaktualizowany.
      </span>
    )
    setBrandToEdit(null)
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <NameField />
        <Separator className="bg-chart-10" />
        <Button type="submit" variant="outline" size="sm" disabled={form.formState.isSubmitSuccessful}>
          <Save className="text-chart-2" />
          <span>Zapisz</span>
        </Button>
      </form>
    </FormProvider>
  )
}

function NameField() {
  const { control } = useFormContext<FormTypes>()
  return (
    <Controller control={control} name="name"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel htmlFor={field.name} className="flex justify-between">
            <span>Nazwa producenta</span>
            <span className="text-muted-foreground text-xs">{(field.value ?? "").length}/{maxName}</span>
          </FieldLabel>
          <Input {...field} id={field.name} placeholder="np: Continental Automotive GmbH" maxLength={maxName} aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}