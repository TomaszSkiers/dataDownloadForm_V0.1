import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PenLine, PlusCircle, Trash2 } from "lucide-react"
import React from "react"
import { IReasonDownload } from "../../../../constants/downloadReasons"
import { useReasonStorage } from "@/store/useReasonsStorage"
import AddReasonDialog from "./addReasonsDialog"
import EditReasonDialog from "./editReasonDialog"
import RemoveReasonDialog from "./removeReasonDialog"


export default function ReasonList() {
  const reasonsList = useReasonStorage((s) => s.reasonsList)

  return (
    <>
      <Card className="flex-1 rounded-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h2>Lista powodów pobierania danych</h2>
          </CardTitle>
          <AddReasonButton />
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <ReasonsListMain reasonsList={reasonsList} />
        </CardContent>
      </Card>
      {/* Dialogi podpięte tutaj — analogicznie do WorkshopList */}
      <AddReasonDialog />
      <RemoveReasonDialog />
      <EditReasonDialog />
    </>
  )
}

// =====================================================
// List wrapper - main
// =====================================================
interface ReasonsListProps {
  reasonsList: IReasonDownload[]
}

function ReasonsListMain({ reasonsList }: ReasonsListProps) {
  if (reasonsList.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak powodów pobierania danych
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj powód&quot;, aby utworzyć nowy wpis.
          </span>
        </div>
      </div>
    )

  return <ReasonsMapLoop reasonsList={reasonsList} />
}

// =====================================================
// .map() loop
// =====================================================
function ReasonsMapLoop({ reasonsList }: ReasonsListProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {reasonsList.map((reason) => (
        <li key={reason.id}>
          <ReasonSingleRow reason={reason} />
        </li>
      ))}
    </ul>
  )
}

// =====================================================
// Single card
// =====================================================
interface ReasonSingleRowProps {
  reason: IReasonDownload
}

const ReasonSingleRow = React.memo(function ReasonSingleRow({
  reason,
}: ReasonSingleRowProps) {
  const setReasonToDelete = useReasonStorage((s) => s.setReasonToDelete)
  const setReasonToEdit = useReasonStorage((s) => s.setReasonToEdit)

  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">

              <dt className="text-muted-foreground">Powód:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {reason.reason}
                </h3>
              </dd>

              <dt className="text-muted-foreground">Podstawa prawna:</dt>
              <dd className="font-medium">{reason.legal_basis}</dd>

              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">
                {reason.id}
              </dd>

            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            onClick={() => setReasonToEdit(reason)}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setReasonToDelete(reason)}
            className="dark:bg-background"
          >
            <Trash2 className="text-chart-5" />
            <span>Usuń</span>
          </Button>
        </div>
      </Card>
    </article>
  )
})

// =====================================================
// Button add reason
// =====================================================
function AddReasonButton() {
  const onOpenChange = useReasonStorage((s) => s.setIsAddReasonDialogOpen)
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onOpenChange(true)}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj powód</span>
    </Button>
  )
}