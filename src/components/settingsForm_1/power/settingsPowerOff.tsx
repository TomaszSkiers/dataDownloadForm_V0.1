import { PenOff, ArrowBigUp, Power } from "lucide-react";

export default function PowerOff() {
  return (
    <div className="flex flex-col absolute inset-0 items-center justify-center text-center tracking-wider border rounded-xl">
      <Power size={150} className="mb-10 text-chart-10" />
      <span>edycja ustaień wyłączona</span>
      <div className="flex gap-5">
        <ArrowBigUp className="text-chart-5"/>
        <span>kliknij w przycisk na górze aby włączyć</span>
      </div>
      <span>interesujące cię ustawienia</span>
    </div>
  );
}
