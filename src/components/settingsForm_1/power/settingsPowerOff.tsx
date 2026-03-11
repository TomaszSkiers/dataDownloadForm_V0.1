import { PenOff, ArrowLeft } from "lucide-react";

export default function PowerOff() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center tracking-wider">
      <PenOff size={150} className="mb-10 text-chart-10" />
      <span>edycja ustaień wyłączona</span>
      <div className="flex gap-5">
        <ArrowLeft className="text-chart-5"/>
        <span>kliknij w przyciski z lewej strony żeby włączyć</span>
      </div>
      <span>interesujące cię ustawienia</span>
    </div>
  );
}
