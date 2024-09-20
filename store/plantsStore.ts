import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import * as FileSystem from "expo-file-system";

export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

type AddPlantParams = Pick<
  PlantType,
  "name" | "wateringFrequencyDays" | "imageUri"
>;

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: ({
    name,
    wateringFrequencyDays,
    imageUri,
  }: AddPlantParams) => Promise<void>;
  removePlant: (plantId: PlantType["id"]) => void;
  waterPlant: (plantId: PlantType["id"]) => void;
};

export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlant: async ({
        name,
        wateringFrequencyDays,
        imageUri,
      }: AddPlantParams) => {
        const savedImageUri =
          FileSystem.documentDirectory +
          `${new Date().getTime()}-${imageUri?.split("/").slice(-1)[0]}`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        set(
          produce((draft: PlantsState) => {
            draft.plants.unshift({
              id: String(draft.nextId),
              name,
              wateringFrequencyDays,
              imageUri: imageUri ? savedImageUri : undefined,
            });
            draft.nextId++;
          }),
        );
      },
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
