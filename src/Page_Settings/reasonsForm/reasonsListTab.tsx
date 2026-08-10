import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReasonList from "./reasons/reasonsList";
import KindOfDataList from "./dataTypes/KindOfDataList";


export default function ReasonsListTab() {
  return (
    <Tabs defaultValue="reasons" className="flex-1 mt-2">
      <TabsList className="w-full dark:bg-background gap-2">
        <TabsTrigger
          className="border border-accent 
              dark:data-[state=active]:border-chart-2 min-h-10"
          value="reasons"
        >
          Powody pobrania danych
        </TabsTrigger>
        <TabsTrigger
          className="border border-accent 
              dark:data-[state=active]:border-chart-2 min-h-10"
          value="dataType"
        >
          Rodzaje danych
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reasons" className="flex-1 flex">
        <ReasonList />
      </TabsContent>
      <TabsContent value="dataType" className="flex-1 flex">
        <KindOfDataList />
      </TabsContent>
    </Tabs>
  );
}
