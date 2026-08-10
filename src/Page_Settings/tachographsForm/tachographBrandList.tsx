import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTachographBrandsStorage } from "@/store/useTachographBrandStorage";
import { PenLine, PlusCircle, Trash2 } from "lucide-react";
import React from "react";
import { TachographBrand } from "../../../constants/tachographBrands";
import AddBrandDialog from "./addBrandDialog";
import EditBrandDialog from "./editBrandDialog";
import RemoveBrandDialog from "./removeBrandDialog";

export default function TachographBrandList() {
  const brandsList = useTachographBrandsStorage((s) => s.brandsList);

  return (
    <>
      <Card className="flex-1 rounded-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h2>Lista producentów tachografów</h2>
          </CardTitle>
          <AddBrandButton />
        </CardHeader>
        <Separator />
        <CardContent className="relative flex-1">
          <BrandsListMain brandsList={brandsList} />
        </CardContent>
      </Card>
      <AddBrandDialog />
      <EditBrandDialog />
      <RemoveBrandDialog />
    </>
  );
}

interface BrandsListProps {
  brandsList: TachographBrand[];
}

function BrandsListMain({ brandsList }: BrandsListProps) {
  if (brandsList.length === 0)
    return (
      <div className="absolute inset-0 flex flex-col gap-3 overflow-auto">
        <div className="mx-auto my-auto text-2xl font-extrabold text-center">
          Brak producentów tachografów
          <br />
          <span className="text-sm font-normal text-muted-foreground">
            Kliknij „Dodaj producenta&quot;, aby utworzyć nowy wpis.
          </span>
        </div>
      </div>
    );

  return <BrandsMapLoop brandsList={brandsList} />;
}

function BrandsMapLoop({ brandsList }: BrandsListProps) {
  return (
    <ul className="absolute inset-0 overflow-auto flex flex-col gap-3 p-0 m-0 list-none">
      {brandsList.map((brand) => (
        <li key={brand.id}>
          <BrandSingleRow brand={brand} />
        </li>
      ))}
    </ul>
  );
}

interface BrandSingleRowProps {
  brand: TachographBrand;
}

const BrandSingleRow = React.memo(function BrandSingleRow({
  brand,
}: BrandSingleRowProps) {
  const setBrandToDelete = useTachographBrandsStorage(
    (s) => s.setBrandToDelete,
  );
  const setBrandToEdit = useTachographBrandsStorage((s) => s.setBrandToEdit);

  return (
    <article>
      <Card className="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mx-5 bg-background">
        <div className="flex-1 flex flex-col justify-center">
          <CardContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">Producent:</dt>
              <dd>
                <h3 className="inline font-extrabold underline decoration-muted-foreground/40 underline-offset-4">
                  {brand.name}
                </h3>
              </dd>

              <dt className="text-xs text-muted-foreground">ID:</dt>
              <dd className="text-xs text-muted-foreground font-mono">
                {brand.id}
              </dd>
            </dl>
          </CardContent>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 md:flex-row md:items-center">
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-background"
            onClick={() => setBrandToEdit(brand)}
          >
            <PenLine className="text-chart-2" />
            Edytuj
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setBrandToDelete(brand)}
            className="dark:bg-background"
          >
            <Trash2 className="text-chart-5" />
            <span>Usuń</span>
          </Button>
        </div>
      </Card>
    </article>
  );
});

function AddBrandButton() {
  const onOpenChange = useTachographBrandsStorage(
    (s) => s.setIsAddBrandDialogOpen,
  );
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onOpenChange(true)}
      className="bg-background dark:bg-background"
    >
      <PlusCircle className="text-chart-2" />
      <span>Dodaj producenta</span>
    </Button>
  );
}
