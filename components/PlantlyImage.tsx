import { useWindowDimensions } from "react-native";
import { Image, ImageStyle } from "expo-image";

type PlantlyImageProps = {
  size?: number;
  imageUri?: string;
  style?: ImageStyle;
};

export function PlantlyImage({ size, imageUri, style }: PlantlyImageProps) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      source={imageUri ? { uri: imageUri } : require("@/assets/plantly.png")}
      style={[
        {
          width: imageSize,
          height: imageSize,
          borderRadius: 10,
        },
        style,
      ]}
    />
  );
}
