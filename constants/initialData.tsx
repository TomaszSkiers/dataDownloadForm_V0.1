/**
 * @fileoverview
 * ZMIENNE DO KONFIGURACJI APLIKACJI
 */
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// =============================================================================
// OBIEKT KONFIGURACJI PODSTAWOWYCH DANYCH O POJAZDACH
// =============================================================================

// 1. Schemat dla pojedynczego pojazdu
export const vehicleSchema = z.object({
  id: z.string().uuid({ message: "Niepoprawny format ID" }),

  name: z.string().min(1, { message: "Nazwa marki jest wymagana" }),

  types: z
    .array(
      z.string().min(1, { message: "typ musi mieć przynajmniej jeden znak" }),
    )
    .min(1, { message: "Musisz podać przynajmniej jeden model" }),

  category: z.string().min(1, { message: "Musisz podać typ pojazdu" }),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

export const INITIAL_VEHICLES: Vehicle[] = [
  // ==================== CIĘŻARÓWKI (>3.5t) ====================
  {
    id: uuidv4(),
    name: "Mercedes-Benz",
    category: "truck",
    types: ["Actros", "Arocs", "Axor", "Atego"],
  },
  {
    id: uuidv4(),
    name: "Volvo",
    category: "truck",
    types: ["FH", "FH16", "FM", "FMX"],
  },
  {
    id: uuidv4(),
    name: "Scania",
    category: "truck",
    types: ["R-Series", "S-Series", "G-Series", "P-Series"],
  },
  {
    id: uuidv4(),
    name: "MAN",
    category: "truck",
    types: ["TGX", "TGS", "TGM", "TGL"],
  },
  {
    id: uuidv4(),
    name: "DAF",
    category: "truck",
    types: ["XF", "XG", "XG+", "CF", "XD"],
  },
  {
    id: uuidv4(),
    name: "Iveco",
    category: "truck",
    types: ["S-Way", "Stralis", "Trakker", "EuroCargo"],
  },
  {
    id: uuidv4(),
    name: "Renault Trucks",
    category: "truck",
    types: ["T", "T High", "C", "K", "D"],
  },
  {
    id: uuidv4(),
    name: "Ford Trucks",
    category: "truck",
    types: ["F-Max", "Cargo"],
  },
  // --- pozostałe ciężarówki ---
  {
    id: uuidv4(),
    name: "Kamaz",
    category: "truck",
    types: ["K5", "5490", "6520", "65117"],
  },
  {
    id: uuidv4(),
    name: "MAZ",
    category: "truck",
    types: ["5440", "6430", "5516"],
  },
  {
    id: uuidv4(),
    name: "Hino",
    category: "truck",
    types: ["300", "500", "700"],
  },
  {
    id: uuidv4(),
    name: "Isuzu",
    category: "truck",
    types: ["N-Series", "F-Series", "Giga"],
  },
  {
    id: uuidv4(),
    name: "Fuso",
    category: "truck",
    types: ["Canter", "Fighter", "Super Great"],
  },
  {
    id: uuidv4(),
    name: "BMC",
    category: "truck",
    types: ["Tugra", "Professional"],
  },
  { id: uuidv4(), name: "Otokar", category: "truck", types: ["Atlas"] },
  {
    id: uuidv4(),
    name: "Tatra",
    category: "truck",
    types: ["Phoenix", "T815", "T163"],
  },
  { id: uuidv4(), name: "Sisu", category: "truck", types: ["Polar", "Rock"] },
  {
    id: uuidv4(),
    name: "Unimog",
    category: "truck",
    types: ["U 219", "U 323", "U 535"],
  },
  {
    id: uuidv4(),
    name: "Star",
    category: "truck",
    types: ["266", "744", "1466"],
  },

  // ==================== AUTOBUSY ====================
  {
    id: uuidv4(),
    name: "Solaris",
    category: "bus",
    types: ["Urbino", "InterUrbino", "Vacanza"],
  },
  {
    id: uuidv4(),
    name: "Mercedes-Benz",
    category: "bus",
    types: [
      "Citaro",
      "Tourismo",
      "Intouro",
      "Conecto",
      "Sprinter City",
      "Sprinter Transfer",
    ],
  },
  {
    id: uuidv4(),
    name: "MAN",
    category: "bus",
    types: ["Lion's City", "Lion's Coach", "Lion's Intercity"],
  },
  {
    id: uuidv4(),
    name: "Volvo",
    category: "bus",
    types: ["7900", "8900", "9700", "9900"],
  },
  {
    id: uuidv4(),
    name: "Scania",
    category: "bus",
    types: ["Citywide", "Interlink", "Touring"],
  },
  {
    id: uuidv4(),
    name: "Iveco Bus",
    category: "bus",
    types: ["Urbanway", "Crossway", "Evadys"],
  },
  {
    id: uuidv4(),
    name: "Setra",
    category: "bus",
    types: ["MultiClass", "ComfortClass", "TopClass"],
  },
  { id: uuidv4(), name: "VDL", category: "bus", types: ["Citea", "Futura"] },
  {
    id: uuidv4(),
    name: "Temsa",
    category: "bus",
    types: ["MD9", "HD12", "Maraton"],
  },
  { id: uuidv4(), name: "Iveco", category: "bus", types: ["Daily"] },
  { id: uuidv4(), name: "Volkswagen", category: "bus", types: ["Crafter"] },
  { id: uuidv4(), name: "Ford", category: "bus", types: ["Transit"] },
  {
    id: uuidv4(),
    name: "Autosan",
    category: "bus",
    types: ["Eurolider", "Sancity"],
  },
  {
    id: uuidv4(),
    name: "Kapena",
    category: "bus",
    types: ["Thesi", "Urbino 8,9 LE"],
  },
  {
    id: uuidv4(),
    name: "Jelcz",
    category: "bus",
    types: ["120M", "M121", "M125"],
  },
  {
    id: uuidv4(),
    name: "Neoplan",
    category: "bus",
    types: ["Cityliner", "Skyliner", "Tourliner"],
  },
  {
    id: uuidv4(),
    name: "Van Hool",
    category: "bus",
    types: ["EX", "TX", "TDX"],
  },
  { id: uuidv4(), name: "Irizar", category: "bus", types: ["i4", "i6", "i8"] },
  {
    id: uuidv4(),
    name: "Otokar",
    category: "bus",
    types: ["Vectio", "Navigo", "Territo"],
  },
  {
    id: uuidv4(),
    name: "Isuzu",
    category: "bus",
    types: ["Novo", "Grand Toro"],
  },
  {
    id: uuidv4(),
    name: "Yutong",
    category: "bus",
    types: ["E12", "U12", "T12"],
  },
  { id: uuidv4(), name: "BYD", category: "bus", types: ["K9", "B12", "B18"] },

  // ==================== LEKKIE DOSTAWCZE (VANY ≤3.5t) ====================
  {
    id: uuidv4(),
    name: "Ford",
    category: "van",
    types: ["Transit", "Transit Custom", "Transit Connect", "Transit Courier"],
  },
  {
    id: uuidv4(),
    name: "Mercedes-Benz",
    category: "van",
    types: ["Sprinter", "Vito", "Citan", "EQV"],
  },
  {
    id: uuidv4(),
    name: "Volkswagen",
    category: "van",
    types: ["Crafter", "Transporter", "Caddy", "ID. Buzz Cargo"],
  },
  {
    id: uuidv4(),
    name: "Renault",
    category: "van",
    types: ["Master", "Trafic", "Kangoo", "Express"],
  },
  {
    id: uuidv4(),
    name: "Fiat",
    category: "van",
    types: ["Ducato", "Talento", "Doblo", "Fiorino"],
  },
  {
    id: uuidv4(),
    name: "Peugeot",
    category: "van",
    types: ["Boxer", "Expert", "Partner"],
  },
  {
    id: uuidv4(),
    name: "Citroën",
    category: "van",
    types: ["Jumper", "Jumpy", "Berlingo"],
  },
  {
    id: uuidv4(),
    name: "Opel",
    category: "van",
    types: ["Movano", "Vivaro", "Combo", "Zafira Life"],
  },
  { id: uuidv4(), name: "Iveco", category: "van", types: ["Daily"] },
  {
    id: uuidv4(),
    name: "Toyota",
    category: "van",
    types: ["ProAce", "ProAce City", "ProAce Max"],
  },
  {
    id: uuidv4(),
    name: "Nissan",
    category: "van",
    types: ["NV250", "NV300", "NV400", "Townstar"],
  },
  {
    id: uuidv4(),
    name: "Maxus",
    category: "van",
    types: ["eDeliver 9", "Deliver 9", "eDeliver 7"],
  },
  { id: uuidv4(), name: "DFSK", category: "van", types: ["C-Series"] },
  { id: uuidv4(), name: "LDV", category: "van", types: ["Maxus"] },

  // ==================== PICKUPY (≤3.5t) ====================
  {
    id: uuidv4(),
    name: "Ford",
    category: "pickup",
    types: ["Ranger", "F-150 Lightning"],
  },
  { id: uuidv4(), name: "Toyota", category: "pickup", types: ["Hilux"] },
  { id: uuidv4(), name: "Volkswagen", category: "pickup", types: ["Amarok"] },
  { id: uuidv4(), name: "Mitsubishi", category: "pickup", types: ["L200"] },
  { id: uuidv4(), name: "Nissan", category: "pickup", types: ["Navara"] },
  { id: uuidv4(), name: "Isuzu", category: "pickup", types: ["D-Max"] },
  {
    id: uuidv4(),
    name: "SsangYong",
    category: "pickup",
    types: ["Musso", "Rexton Sports"],
  },
  { id: uuidv4(), name: "Renault", category: "pickup", types: ["Alaskan"] },
  { id: uuidv4(), name: "Fiat", category: "pickup", types: ["Fullback"] },
  { id: uuidv4(), name: "RAM", category: "pickup", types: ["1500"] },
  { id: uuidv4(), name: "Chevrolet", category: "pickup", types: ["Silverado"] },
  {
    id: uuidv4(),
    name: "Great Wall",
    category: "pickup",
    types: ["Steed", "Poer"],
  },
  { id: uuidv4(), name: "Maxus", category: "pickup", types: ["T90"] },
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
    icon: <Users className="text-chart-9" />,
  },
  {
    id: "warsztaty",
    header: "Lista punktów",
    description: "Adresy i nazwy punktów warsztatowych",
    icon: <Wrench className="text-chart-8" />,
  },
  {
    id: "pojazdy",
    header: "Lista pojazdów",
    description: "Nazwy i typy pojazdów",
    icon: <Truck className="text-chart-7" />,
  },
  {
    id: "powody",
    header: "Powody pobrania",
    description: "Lista powodów dla, których dane zostały pobrane",
    icon: <MessageCircleQuestionMark className="text-chart-6" />,
  },
  {
    id: "power",
    header: "wyłącz",
    description: "",
    icon: <Power className="text-chart-10" />,
  },
];

// przyciski w menu górnym
export const FORMS_BUTTONS_TOP: SettingsButtons[] = [
  {
    id: "formularzPobrania",
    header: "Formularz pobrania danych",
    description:
      "Formularz pobrania danych z tachografu cyfrowego, generuje wniosek i pokwitowanie pobrania danch",
    icon: <ClipboardType className="text-chart-1" />,
  },
  {
    id: "formularzBrakuMożliwości",
    header: "Formularz braku możliwości pobrania danych",
    description:
      "Formularz braku możlowości pobrania danych, generuje wniosek i pokwitowanie o braku możliwości pobrania danch",
    icon: <ClipboardType className="text-chart-2" />,
  },
  {
    id: "formularzUsunięcia",
    header: "Formularz usunięcia danych",
    description:
      "Formularz generuje protokół usuniecia danych pobranych przez warsztat",
    icon: <ClipboardType className="text-chart-3" />,
  },
];

// =============================================================
// TESTOWY OBIEKT DLA LISTY TECHNIKOW
// =============================================================

// Definicja schematu dla pojedynczego technika
export const TechnicianSchema = z.object({
  id: z.string().uuid(),
  fullName: z
    .string()
    .min(3, "Imię i nazwisko jest wymagane")
    .max(30, "max 30 znaków"),
  cardNumber: z
    .string()
    .regex(/^[A-Z0-9]+$/, "Nieprawidłowy format numeru karty"),
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

// ===============================================================
// SCHEMAT OBIEKTU WARSZTAT / OBJECT WORKSHOP SCHEMA
// ===============================================================

export const WORKSHOP_SCHEMA = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Nazwa warsztatu jest wymagana, min 3 znaki")
    .max(100, "maksymalnie można wpisać 50 znaków"),
  address: z
    .string()
    .min(3, "Adres jest wymagany, min 3 znaki")
    .max(100, "maksymalnie można wpisać 50 znaków"),
});

export type WORKSHOP = z.infer<typeof WORKSHOP_SCHEMA>;

// ===============================================================
// OBIEKT RODZAJU POJAZDU DLA SELECTÓW / BODY TYPE
// ===============================================================

export const BODYTYPE_SCHEMA = z.object({
  id: z.string().uuid(),
  bodyName: z.string().min(1, "wymagany minimum 1 znak"),
  description: z.string().min(1, "wymagany minimum 1 znak"),
});

export type BODY_TYPE = z.infer<typeof BODYTYPE_SCHEMA>;

export const bodyType: BODY_TYPE[] = [
  { id: uuidv4(), bodyName: "truck", description: "ciężarówka" },
  { id: uuidv4(), bodyName: "bus", description: "autobus" },
  { id: uuidv4(), bodyName: "van", description: "dostawczy" },
  { id: uuidv4(), bodyName: "pickup", description: "półciężarówka" },
];

// ===============================================================
// OGRANICZENIA ILOŚCI ZNAKÓW DLA INPUTÓW
// ===============================================================

export const INPUT_CHARS_LIMITER = {
  editVehicleDialog: {
    brand: 50,
    type: 20,
    category: 20,
  },
  addVehicleDialog: {
    brand: 50,
    type: 20,
    category: 20,
  },
  addTechnicianDialog: {
    technicianName: 30,
    technicianCard: 16,
  },
  editTechnicianDialog: {
    technicianName: 30,
    technicianCard: 16,
  },
  addWorkshopDialog: {
    workshopName: 50,
    workshopAddress: 100,
  },
  editWorkshopDialog: {
    workshopName: 50,
    workshopAddress: 100,
  },
  addReasonDialog: {
    reason: 200,
    legal_basis: 300,
  },
  editReasonDialog: {
    reason: 200,
    legal_basis: 300,
  },
  addKindDialog: {
    title: 80,
    description: 120,
  },
  editKindDialog: {
    title: 80,
    description: 120,
  },
} as const;
