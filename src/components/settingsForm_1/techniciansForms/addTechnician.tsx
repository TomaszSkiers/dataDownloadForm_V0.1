/**
* KOMPONENT SŁUŻY DO DODAWANIA LUB EDYTOWANIA DANYCH TECHNIKA
*/

import { cn } from "@/lib/utils"

interface Props {
  className?: string;
}

export default function AddTechnician ({className}: Props) {
  return (
    <div className={cn('',className)}>Add technician form</div>
  )
}