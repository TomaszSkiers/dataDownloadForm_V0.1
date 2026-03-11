import {create} from 'zustand'



interface ViewState {
  activeView: string;

  setActiveView: (view: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  activeView: 'power',
  setActiveView: (view) => set({activeView: view})
}))