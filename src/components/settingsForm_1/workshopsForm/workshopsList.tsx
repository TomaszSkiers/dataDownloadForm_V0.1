/**
 * KOMPONENT WYŚWIETLA LISTĘ WARSZTATÓW ORAZ ICH ADRESY
 */

import { Button } from "@/components/ui/button";
import { useViewStore } from "@/store/useViewStore";
import { CornerRightDown } from "lucide-react";

const corupt = {
  corupt: "smieci",
  name: "smieci",
};

export default function WorkshopsList() {
  const addTechnician = useViewStore((state) => state.addTechnician);
  return (
    <div>
      <h1>Lista warsztatów</h1>
      <Button > Corrupt data</Button>
    </div>
  );
}
