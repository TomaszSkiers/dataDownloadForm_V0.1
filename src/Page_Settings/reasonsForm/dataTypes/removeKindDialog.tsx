import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { useKindOfDataStorage } from "@/store/useKindOfDataStorage"
import { Check, X } from "lucide-react"
import { toast } from "sonner"

export default function RemoveKindDialog() {
  const kindToDelete = useKindOfDataStorage((s) => s.kindToDelete)
  const setKindToDelete = useKindOfDataStorage((s) => s.setKindToDelete)
  const removeKind = useKindOfDataStorage((s) => s.removeKind)

  const handleDelete = () => {
    if (!kindToDelete) return
    removeKind(kindToDelete.id)
    toast.success(
      <>
        Rodzaj danych{" "}
        <span className="font-semibold text-chart-3">{kindToDelete.title}</span>{" "}
        został usunięty.
      </>
    )
    setKindToDelete(null)
  }

  return (
    <AlertDialog
      open={Boolean(kindToDelete)}
      onOpenChange={(open) => !open && setKindToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć ten rodzaj danych?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Rodzaj danych{" "}
            <span className="text-chart-5 font-bold">{kindToDelete?.title}</span>{" "}
            zostanie usunięty z bazy danych.
          </AlertDialogDescription>
          <Separator className="bg-chart-10 mt-2" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel autoFocus>
            <X className="text-chart-2" />
            <span>Anuluj</span>
          </AlertDialogCancel>
          <AlertDialogAction variant="outline" onClick={handleDelete}>
            <Check className="text-chart-5" />
            <span>Potwierdź</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}