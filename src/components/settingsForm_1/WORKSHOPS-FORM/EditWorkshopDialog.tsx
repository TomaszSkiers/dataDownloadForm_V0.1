import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddEditForm from "./AddEditForm";
import { WORKSHOP } from "../../../../constants/initialData";


interface Props {
  children: React.ReactNode;
  workshop: WORKSHOP
}

export default function EditWorkshopDialog({children, workshop}: Props) {

  const [open, setOpen] = useState(false)

  return(
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edycja warsztatu</DialogTitle>
          </DialogHeader>
          <AddEditForm closeDialog={()=>{setOpen(false)}} editingWorkshop={workshop}/>
        </DialogContent>
    </Dialog>
  )
}