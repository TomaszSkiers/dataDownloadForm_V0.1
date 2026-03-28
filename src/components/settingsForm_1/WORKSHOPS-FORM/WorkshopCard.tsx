import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { LucideWrench } from "lucide-react";
import { WORKSHOP } from "../../../../constants/initialData";
import { Button } from "@/components/ui/button";
import { useWorkshopStore } from "@/store/useWorkshopsStorage";

import WorkshopConfirmDelete from "./WorkshopConfirmDelete";
import { toast } from "sonner";
import EditWorkshopDialog from "./EditWorkshopDialog";

interface WorkshopCardProps {
  workshop: WORKSHOP;
}

export const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const removeWorkshop = useWorkshopStore((store) => store.removeWorkshop);

  const onSuccess = () => {
    try {
      removeWorkshop(workshop.id);
      toast.success("Usunięto warsztat", {
        description: `Pomyslnie usunięto warsztat ${workshop.name}`,
        duration: 3000,
      });
    } catch {
      toast.error("Wystąpił problem z usunięciam danych");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 ">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <LucideWrench className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold truncate">
          {workshop.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground italic ">
          {workshop.address}
        </p>
        <div className="mt-3 pt-2 border-t border-border flex justify-between items-center">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
            Ref: {workshop.id.slice(0, 8)}...
          </span>
        </div>
      </CardContent>
      <CardAction className="space-x-4 px-6">
        <WorkshopConfirmDelete
          title="Usuwanie warsztatu"
          description="Usuniecie warsztatu jest operacją nieodwracalną"
          onSuccess={onSuccess}
        >
          <Button>Usuń</Button>
        </WorkshopConfirmDelete>
        
        <EditWorkshopDialog workshop={workshop}>
          <Button>Edytuj</Button>
        </EditWorkshopDialog>
      </CardAction>
    </Card>
  );
};
