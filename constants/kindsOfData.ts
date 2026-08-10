export interface IKindOfData {
  id: string
  title: string
  description: string
}

export const KIND_OF_DATA: IKindOfData[] = [
  {
    id: "76483569-b5cd-4f51-b8ae-ca1d4970425a",
    title: "Dane ogólne i identyfikacyjne",
    description: "Informacje o urządzeniu oraz pojeździe",
  },
  {
    id: "92f39007-aa27-4a0b-8d5c-3571ea4d3d8d",
    title: "Aktywności kierowców",
    description: "Rejestr czynności i czasu pracy",
  },
  {
    id: "e305f884-3c8c-48c2-a4f6-8c83a15dcbc8",
    title: "Dane o prędkości i dystansie",
    description: "Przebieg, historia i dane szczegółowe",
  },
  {
    id: "4020c228-569d-472d-bb4c-68f7f502df6a",
    title: "Dane GNSS / Lokalizacja",
    description: "Automatyczna rejestracja pozycji (Załącznik 1C)",
  },
  {
    id: "83ae1f77-2e11-477c-a7c1-84e1b8bbfb2f",
    title: "Zdarzenia i usterki",
    description: "Próby manipulacji i błędy techniczne",
  },
  {
    id: "1d8b3753-485a-4b95-a228-64c8dbe4cfb8",
    title: "Dane kalibracyjne i warsztatowe",
    description: "Historia kalibracji i parametry techniczne",
  },
  {
    id: "0d635c91-9e8c-4a31-b75d-3574c3e80ae4",
    title: "Blokady przedsiębiorstwa",
    description: "Poufność danych firmowych",
  },
  {
    id: "e43b1716-e56a-493e-8a21-99233633d9f9",
    title: "Działania kontrolne",
    description: "Rejestr kontroli inspekcyjnych",
  },
]