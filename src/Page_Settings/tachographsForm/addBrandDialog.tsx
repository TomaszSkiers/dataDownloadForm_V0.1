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
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { useTachographBrandsStorage } from "@/store/useTachographBrandStorage"
import { Save } from "lucide-react"
import { INPUT_CHARS_LIMITER } from "../../../constants/initialData"
import { TachographBrand } from "../../../constants/tachographBrands"

const maxName = INPUT_CHARS_LIMITER.addBrandDialog.name

const FormSchema = z.object({
  name: z.string().min(1, "* nazwa jest wymagana").max(maxName),
})

type FormTypes = z.infer<typeof FormSchema>

export default function AddBrandDialog() {
  const open = useTachographBrandsStorage((s) => s.isAddBrandDialogOpen)
  const onOpenChange = useTachographBrandsStorage((s) => s.setIsAddBrandDialogOpen)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Dodaj producenta tachografu.</DialogTitle>
          <DialogDescription>
            Dodawanie nowego producenta do bazy danych.
          </DialogDescription>
          <Separator className="bg-chart-10" />
        </DialogHeader>
        <AddBrandForm />
      </DialogContent>
    </Dialog>
  )
}

function AddBrandForm() {
  const addBrand = useTachographBrandsStorage((s) => s.addBrand)
  const closeDialog = useTachographBrandsStorage((s) => s.setIsAddBrandDialogOpen)

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "" },
  })

  const onSubmit = (data: FormTypes) => {
    if (form.formState.isSubmitSuccessful) return
    const finalData: TachographBrand = {
      id: uuidv4(),
      name: data.name,
    }
    addBrand(finalData)
    toast.success(
      <>
        Producent{" "}
        <span className="font-semibold text-chart-3">{data.name}</span>{" "}
        został dodany.
      </>
    )
    closeDialog(false)
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <NameField />
        <Separator className="bg-chart-10" />
        <Button type="submit" variant="outline" size="sm" disabled={form.formState.isSubmitSuccessful}>
          <Save className="text-chart-2" />
          <span>Dodaj producenta</span>
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