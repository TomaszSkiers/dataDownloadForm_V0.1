import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" rounded-md flex-1 flex flex-col">
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-wider">
            e-formularz
          </h1>
          <p className="text-xl sm:text-2xl font-bold tracking-wide text-center">
            pobranie danych z tachografu cyfrowego
          </p>
          {process.env.NODE_ENV === "production" ? (
            <p>production</p>
          ) : (
            <p>development</p>
          )}
        </section>

        <section className="flex-1 flex items-center justify-center gap-8">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/** przycisk kierujący do ustawień*/}
            <Button
              asChild
              variant="default"
              className="text-2xl px-12 py-8 bg-chart-1 text-foreground hover:bg-chart-1/70"
            >
              <Link href="/settings">Ustawienia</Link>
            </Button>

            {/** przycisk kierujący do formularzy */}
            <Button
              asChild
              variant='default'
              className="text-2xl px-12 py-8 bg-chart-5 text-foreground hover:bg-chart-5/70"
            >
              <Link href="/settings">Formulrze</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
