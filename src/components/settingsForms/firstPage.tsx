"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";


export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="border flex flex-col gap-4 items-center w-full p-8 rounded-md">
        <h1 className="text-2xl font-bold">Ustawienia</h1>
        <SettingsNavigation />
      </div>
      <SettingsContent />
    </div>
  );
}

// ------------- store ---------------

import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

// Ten obiekt to "tłumacz" między Zustandem a bazą danych
const indexedDBStorage: StateStorage = {
  // Pobieranie danych: Zustand pyta "Co masz pod kluczem X?"
  getItem: async (name: string): Promise<string | null> => {
    console.log("Pobieram z IndexedDB:", name);
    const value = await get(name);
    return value || null;
  },
  
  // Zapisywanie danych: Zustand mówi "Zapisz to pod kluczem X"
  setItem: async (name: string, value: string): Promise<void> => {
    console.log("Zapisuję do IndexedDB:", name);
    await set(name, value);
  },
  
  // Usuwanie: Na wypadek czyszczenia stora
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

// Dodajmy typ dla pojedynczego warsztatu
interface Workshop {
  id: string;
  name: string;
  createdAt: number;
}

interface Settings {
  activeTab: string;
  buttons: string[];
  workshopDraft: { name: string };
  workshops: Workshop[]; // <--- Tutaj trafiają zapisane dane
  setActiveTab: (tab: string) => void;
  setWorkshopDraft: (draft: { name: string }) => void;
  addWorkshop: (name: string) => void; // <--- Funkcja zapisu
}

export const useSettingsStore = create<Settings>()(
  persist(
    (set) => ({
      activeTab: "warsztat",
      buttons: ["warsztat", "technicy", "pojazdy", "powody"],
      workshopDraft: { name: "" },
      workshops: [],

      setActiveTab: (tab) => set({ activeTab: tab }),
      setWorkshopDraft: (draft) => set({ workshopDraft: draft }),

      addWorkshop: (name) => set((state) => ({
        workshops: [
          ...state.workshops,
          { id: crypto.randomUUID(), name, createdAt: Date.now() }
        ],
        workshopDraft: { name: "" } // Czyścimy szkic po udanym zapisie!
      })),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => indexedDBStorage),
      // Pamiętaj o dodaniu 'workshops' do partialize!
      partialize: (state) => ({ 
        activeTab: state.activeTab, 
        workshopDraft: state.workshopDraft,
        workshops: state.workshops 
      }),
    }
  )
);

// ---------- Settings navigation --------------

function SettingsNavigation() {
  const { activeTab, buttons, setActiveTab } = useSettingsStore();
  return (
    <ButtonGroup >
      {buttons.map((button: string) => (
        <Button
          key={button}
          size="lg"
          variant={activeTab === button ? "default" : "outline"}
          onClick={() => setActiveTab(button)}
        >
          {button}
        </Button>
      ))}
    </ButtonGroup>
  );
}

// ----------- SettingsContent --------------------

const SETTINGS_FORMS: Record<string, React.ReactNode> = {
  warsztat: <Workshop />,
  technicy: <Technicians />,
  pojazdy: <Vehicles />,
  powody: <Reasons />,
};

function SettingsContent() {
  const { activeTab } = useSettingsStore();

  return (
    <div className="border p-8 rounded-md">{SETTINGS_FORMS[activeTab]}</div>
  );
}

// ----------- warsztat ---------------------------

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const workshopSchema = z.object({
  name: z
    .string()
    .min(2, "nazwa musi mieć co najmniej 2 znaki")
    .max(50, "nazwa jest za długa"),
});
type WorkshopFormValues = z.infer<typeof workshopSchema>;

function Workshop() {
  const { addWorkshop, workshops } = useSettingsStore();
  const form = useForm<WorkshopFormValues>({
    resolver: zodResolver(workshopSchema),
    defaultValues: { name: "" },
  });

 function onSubmit(data: WorkshopFormValues) {
    // 1. Wywołujemy akcję ze stora (zapis do IndexedDB dzieje się automatycznie)
    addWorkshop(data.name);
    
    // 2. Czyścimy formularz po sukcesie
    form.reset({ name: "" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold">witaj w formularzu Warsztat</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa Warsztatu</FormLabel>
              <FormControl>
                <Input placeholder="TACHO-SERWIS KACZMAREK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">zapisz warsztat</Button>
      </form>
    </Form>
  );
}

// ----------- technicy ---------------------------
function Technicians() {
  return <h1 className="text-2xl font-bold">witaj w formularzu technicy</h1>;
}
// ----------- pojazdy ----------------------------
function Vehicles() {
  return <h1 className="text-2xl font-bold">witaj w formularzu pojady</h1>;
}
// ----------- powody -----------------------------
function Reasons() {
  return (
    <h1 className="text-2xl font-bold">
      witaj w formularzu powody pobrania danych
    </h1>
  );
}
