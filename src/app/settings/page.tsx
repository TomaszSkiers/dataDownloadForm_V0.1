import LeftFormButtons from "@/components/settingsForm_1/leftButtons";
import SettingsContextContainer from "@/components/settingsForm_1/settingsContextContainer";
// import TopFormsButtons from "@/components/settingsForm_1/topFormButtons";

/**
 * * /settings
 *
 * KOMPONENT GENERUJE STRONĘ USTAWIENIA NA GÓRZE PASEK PRZYCISKÓW NAWIGUJĄCYCH DO ODPOWIEDNICH
 * STRON FORMULARZY PONIŹEJ Z LEWEJ STRONY PRZYCISKI A Z PRAWEJ FORMULARZE SŁUŻĄCE DO USTAWIENIA
 * APLIKACJI
 */

export default function Settings() {
  return (
    <main className="flex flex-1 flex-col gap-5 ">
      {/* <TopFormsButtons className="mb-5 " /> */}
      
        <LeftFormButtons className="flex gap-2 sm:gap-5 " />
        <SettingsContextContainer className="rounded-xl flex-1 relative " />
      
    </main>
  );
}
