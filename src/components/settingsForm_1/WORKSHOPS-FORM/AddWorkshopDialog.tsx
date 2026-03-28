import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEditForm from "./AddEditForm";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AddWorkshopDialog({ children }: Props) {
  
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie nowego warsztatu</DialogTitle>
        </DialogHeader>
        <AddEditForm closeDialog={()=>{setOpen(false)}}/>
      </DialogContent>
    </Dialog>
  );
}
