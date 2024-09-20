import { Alert, Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface MediaUtils {
  pickImage: (options: {
    type?: ImagePicker.MediaTypeOptions;
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  }) => Promise<string | undefined>;
  takeImage: (options: {
    type?: ImagePicker.MediaTypeOptions;
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  }) => Promise<string | undefined>;
}

export const pickImage: MediaUtils["pickImage"] = async ({
  type = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = true,
  aspect = [1, 1],
  quality = 1,
}) => {
  if (Platform.OS === "web") {
    alert("Image picking not supported on web");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: type,
    allowsEditing,
    aspect,
    quality,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export const takeImage: MediaUtils["takeImage"] = async ({
  type = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = true,
  aspect = [1, 1],
  quality = 1,
}) => {
  if (Platform.OS === "web") {
    alert("Camera not supported on web");
    return;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: type,
      allowsEditing,
      aspect,
      quality,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  };

  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Camera Permission Required",
      "This app needs access to your camera to take photos. Please grant permission.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Try Again",
          onPress: async () => {
            Linking.openSettings();
          },
        },
      ],
    );
    return;
  }

  return openCamera();
};
