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
import { useReasonStorage } from "@/store/useReasonsStorage"
import { Check, X } from "lucide-react"
import { toast } from "sonner"

export default function RemoveReasonDialog() {
  const reasonToDelete = useReasonStorage((s) => s.reasonToDelete)
  const setReasonToDelete = useReasonStorage((s) => s.setReasonToDelete)
  const removeReason = useReasonStorage((s) => s.removeReason)

  const handleDelete = () => {
    if (!reasonToDelete) return

    removeReason(reasonToDelete.id)
    toast.success(
      <>
        Powód{" "}
        <span className="font-semibold text-chart-3">
          {reasonToDelete.reason}
        </span>{" "}
        został usunięty.
      </>
    )
    setReasonToDelete(null)
  }

  return (
    <AlertDialog
      open={Boolean(reasonToDelete)}
      onOpenChange={(open) => !open && setReasonToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć ten powód?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta operacja jest nieodwracalna. Powód{" "}
            <span className="text-chart-5 font-bold">
              {reasonToDelete?.reason}
            </span>{" "}
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