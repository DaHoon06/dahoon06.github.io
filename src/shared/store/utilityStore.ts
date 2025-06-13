import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type InitialState = {
  isScrolled: boolean;
  isVisible: boolean;
  currentStep: string;
  scrollTo: any,
};

type SetState = {
  setIsScrolled: (payload: boolean) => void;
  setIsVisible: (payload: boolean) => void;
  setScrollTo: (index: number) => void;
};

const initialState: InitialState = {
  isVisible: false,
  isScrolled: false,
  currentStep: "about",
  scrollTo: null,
};

const useUtilityStore = create(
  devtools(
    combine<InitialState, SetState>(initialState, (set) => ({
      setIsScrolled: (payload: boolean) => set(() => ({ isScrolled: payload })),
      setIsVisible: (payload: boolean) => set(() => ({ isVisible: payload })),
      setScrollTo: (payload: number) => set(() => ({ scrollTo: payload }))
    }))
  )
);

export default useUtilityStore;
