import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: (name: string, wateringFrequencyDays: number) => void;
  removePlant: (plantId: PlantType["id"]) => void;
  waterPlant: (plantId: PlantType["id"]) => void;
};

export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlant: (name: string, wateringFrequencyDays: number) =>
        set(
          produce((draft: PlantsState) => {
            draft.plants.unshift({
              id: String(draft.nextId),
              name,
              wateringFrequencyDays,
            });
            draft.nextId++;
          }),
        ),
      removePlant: (plantId: PlantType["id"]) =>
        set(
          produce((draft: { plants: PlantType[] }) => {
            draft.plants = draft.plants.filter((plant) => plant.id !== plantId);
          }),
        ),
      waterPlant: (plantId: PlantType["id"]) =>
        set(
          produce((draft: { plants: PlantType[] }) => {
            const plant = draft.plants.find((p) => p.id === plantId);
            if (plant) {
              plant.lastWateredAtTimestamp = Date.now();
            }
          }),
        ),
    }),
    {
      name: "plantly-plants-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
