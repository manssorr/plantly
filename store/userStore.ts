import { create } from "zustand";

type UserState = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  hasFinishedOnboarding: false,
  toggleHasOnboarded: () => {
    set((state) => {
      return {
        ...state,
        hasFinishedOnboarding: !state.hasFinishedOnboarding,
      };
    });
  },
}));
