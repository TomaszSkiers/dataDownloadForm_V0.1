import LeftFormButtons from "@/components/settingsForm_1/leftButtons";
import SettingsContextContainer from "@/components/settingsForm_1/settingsContextContainer";
import TopFormsButtons from "@/components/settingsForm_1/topFormButtons";

/**
 * * /settings
 *
 * KOMPONENT GENERUJE STRONĘ USTAWIENIA NA GÓRZE PASEK PRZYCISKÓW NAWIGUJĄCYCH DO ODPOWIEDNICH
 * STRON FORMULARZY PONIŹEJ Z LEWEJ STRONY PRZYCISKI A Z PRAWEJ FORMULARZE SŁUŻĄCE DO USTAWIENIA
 * APLIKACJI
 */

export default function Settings() {
  return (
    <main className="flex flex-1 flex-col">
      <TopFormsButtons className="mb-5" />
      <div className="grid grid-cols-[20%_1fr] flex-1 gap-5">
        <LeftFormButtons className="" />
        <SettingsContextContainer className="border rounded-xl" />
      </div>
    </main>
  );
}
