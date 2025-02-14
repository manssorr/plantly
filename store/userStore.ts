import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        set((state) => ({
          hasFinishedOnboarding: !state.hasFinishedOnboarding,
        }));
      },
    }),
    {
      name: "planty-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
