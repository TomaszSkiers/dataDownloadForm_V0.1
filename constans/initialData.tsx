/**
 * @fileoverview
 * ZMIENNE DO KONFIGURACJI APLIKACJI
 */

// =============================================================================
// OBIEKT KONFIGURACJI PODSTAWOWYCH DANYCH O POJAZDACH
// =============================================================================

export interface Vehicle {
  id: string;
  name: string;
  types: string[];
}

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    types: ["Actros", "Arocs", "Axor", "Atego"],
  },
  { id: "volvo", name: "Volvo", types: ["FH", "FH16", "FM", "FMX"] },
  {
    id: "scania",
    name: "Scania",
    types: ["R-Series", "S-Series", "G-Series", "P-Series"],
  },
  { id: "man", name: "MAN", types: ["TGX", "TGS", "TGM", "TGL"] },
  { id: "daf", name: "DAF", types: ["XF", "XG", "XG+", "CF", "XD"] },
  {
    id: "iveco",
    name: "Iveco",
    types: ["S-Way", "Stralis", "Trakker", "EuroCargo"],
  },
  {
    id: "renault",
    name: "Renault Trucks",
    types: ["T", "T High", "C", "K", "D", "Magnum", "Premium"],
  },
  { id: "ford", name: "Ford Trucks", types: ["F-Max", "Cargo"] },
];

// =============================================================================
// OBIEKT KONFIGURACJI PRZYCISKÓW NA STRONIE USTAWIEŃ
// =============================================================================

import {
  Truck,
  Users,
  Wrench,
  MessageCircleQuestionMark,
  ClipboardType,
  Power,
} from "lucide-react";



interface SettingsButtons {
  id: string;
  header: string;
  description: string;
  icon?: React.ReactNode;
}

// przyciski w menu bocznym
export const SETTINGS_BUTTONS_LEFT: SettingsButtons[] = [
  {
    id: "technicy",
    header: "Technicy",
    description: "Dane techników - Imię, nazwisko i nr karty",
    icon: <Users className="text-chart-9"/>,
  },
  {
    id: "warsztaty",
    header: "Lista punktów warsztowych",
    description: "Adresy i nazwy punktów warsztatowych",
    icon: <Wrench className="text-chart-8"/>,
  },
  {
    id: "pojazdy",
    header: "Lista pojazdów",
    description: "Nazwy i typy pojazdów",
    icon: <Truck className="text-chart-7"/>,
  },
  {
    id: "powody",
    header: "Powody pobrania danych",
    description: "Lista powodów dla, których dane zostały pobrane",
    icon: <MessageCircleQuestionMark className="text-chart-6" />,
  },
  {
    id: 'power',
    header:'wyłącz',
    description:'',
    icon: <Power className="text-chart-10" />
  }
];

// przyciski w menu górnym
export const FORMS_BUTTONS_TOP: SettingsButtons[] = [
  {
    id: "formularzPobrania",
    header: "Formularz pobrania danych",
    description:
      "Formularz pobrania danych z tachografu cyfrowego, generuje wniosek i pokwitowanie pobrania danch",
    icon: <ClipboardType className="text-chart-1"/>,
  },
  {
    id: "formularzBrakuMożliwości",
    header: "Formularz braku możliwości pobrania danych",
    description:
      "Formularz braku możlowości pobrania danych, generuje wniosek i pokwitowanie o braku możliwości pobrania danch",
    icon: <ClipboardType className="text-chart-2"/>,
  },
  {
    id: "formularzUsunięcia",
    header: "Formularz usunięcia danych",
    description:
      "Formularz generuje protokół usuniecia danych pobranych przez warsztat",
    icon: <ClipboardType className="text-chart-3"/>,
  },
];

// =============================================================
// TESTOWY OBIEKT DLA LISTY TECHNIKOW
// =============================================================
import { z } from "zod";

// Definicja schematu dla pojedynczego technika
export const TechnicianSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(3, "Imię i nazwisko jest wymagane"),
  cardNumber: z.string().regex(/^[A-Z0-9]+$/, "Nieprawidłowy format numeru karty"),
});

// Wyciągnięcie typu TypeScript ze schematu Zod
export type Technician = z.infer<typeof TechnicianSchema>;

export const techniciansMock: Technician[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    fullName: "Jan Kowalski",
    cardNumber: "PLW00000012345",
  },
  {
    id: "678e8400-e29b-41d4-a716-446655440001",
    fullName: "Marek Nowak",
    cardNumber: "PLW00000098765",
  },
  {
    id: "789e8400-e29b-41d4-a716-446655440002",
    fullName: "Andrzej Zieliński",
    cardNumber: "PLW00000055443",
  },
  {
    id: "890e8400-e29b-41d4-a716-446655440003",
    fullName: "Piotr Wiśniewski",
    cardNumber: "PLW00000022110",
  },
  {
    id: "901e8400-e29b-41d4-a716-446655440004",
    fullName: "Tomasz Mazur",
    cardNumber: "PLW00000033445",
  },
  
];