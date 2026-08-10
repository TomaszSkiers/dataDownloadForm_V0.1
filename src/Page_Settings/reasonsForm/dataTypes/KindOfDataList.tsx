import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PenLine, PlusCircle, Trash2 } from "lucide-react"
import React from "react"
import { useKindOfDataStorage } from "@/store/useKindOfDataStorage"
import { IKindOfData } from "../../../../constants/kindsOfData"
import AddKindDialog from "./addKindDialog"
import EditKindDialog from "./editKindOfDialog"
import RemoveKindDialog from "./removeKindDialog"

export default function KindOfDataList() {
  const kindOfDataList = useKindOfDataStorage((s) => s.kindOfDataList)

  return (
    <>
      <Card className="flex-1 rounded-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h2>Lista rodzajów danych</h2>
          </CardTitle>
          <AddKindButton />
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <KindOfDataListMain kindOfDataList={kindOfDataList} />
        </CardContent>
      </Card>
      <AddKindDialog />
      <EditKindDialog />
      <RemoveKindDialog />
    </>
  )
}

interface KindOfDataListProps {
  kindOfDataList: IKindOfData[]
}

function KindOfDataListMain({ kindOfDataList }: KindOfDataListProps) {
  if (kindOfDataList.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak rodzajów danych
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj rodzaj&quot;, aby utworzyć nowy wpis.
          </span>
        </div>
      </div>
    )

  return <KindOfDataMapLoop kindOfDataList={kindOfDataList} />
}

function KindOfDataMapLoop({ kindOfDataList }: KindOfDataListProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {kindOfDataList.map((kind) => (
        <li key={kind.id}>
          <KindOfDataSingleRow kind={kind} />
        </li>
      ))}
    </ul>
  )
}

interface KindOfDataSingleRowProps {
  kind: IKindOfData
}

const KindOfDataSingleRow = React.memo(function KindOfDataSingleRow({
  kind,
}: KindOfDataSingleRowProps) {
  const setKindToDelete = useKindOfDataStorage((s) => s.setKindToDelete)
  const setKindToEdit = useKindOfDataStorage((s) => s.setKindToEdit)

  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">Rodzaj danych:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {kind.title}
                </h3>
              </dd>

              <dt className="text-muted-foreground">Opis:</dt>
              <dd className="font-medium">{kind.description}</dd>

              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">{kind.id}</dd>
            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            onClick={() => setKindToEdit(kind)}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setKindToDelete(kind)}
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

function AddKindButton() {
  const onOpenChange = useKindOfDataStorage((s) => s.setIsAddKindDialogOpen)
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onOpenChange(true)}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj rodzaj</span>
    </Button>
  )
}