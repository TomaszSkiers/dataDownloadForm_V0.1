/**
 * store do obsługi widoków
 */

import { create } from "zustand";

interface ViewState {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const useViewStore = create<ViewState>()(

  (set) => ({
    activeView: "power",
    // techniciansList: [],

    setActiveView: (view) => set({ activeView: view }),
  }),
);
