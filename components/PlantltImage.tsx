import { useWindowDimensions } from "react-native";
import { Image } from "expo-image";

export function PlantlyImage() {
  const { width } = useWindowDimensions();

  const imageSize = Math.min(width / 1.5, 400);

  return (
    <Image
      source={require("@/assets/plantly.png")}
      style={{ width: imageSize, height: imageSize }}
    />
  );
}
