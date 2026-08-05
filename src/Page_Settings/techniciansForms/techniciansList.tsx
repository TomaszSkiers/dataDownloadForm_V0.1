


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

//todo ===============================================================
//* zrobic merge do main i odpalić nową gałąź z technicianForms
//* zrobić od nowa ten komponent
//* wywalić useWorkshopStorage zostawic tylko useWorkshopStore2 i poprawić jego nazwę
//todo ===============================================================

// =====================================================
// Main
// =====================================================
export default function TechniciansList() {
  

  return <>
    <Card className="flex-1 rounded-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h2>Lista techników</h2>
        </CardTitle>
        <AddTechnicianButton />
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  </>;
}

// =====================================================
// Add technician Button - header
// =====================================================
function AddTechnicianButton() {

  return(
    <Button
      type="button"
      variant={'outline'}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2"/>
      <span>dodaj technika</span>
    </Button>
  )
}