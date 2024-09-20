import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  type TextInputProps,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/theme";
import { useState } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantlyButton } from "@/components/PlantlyButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePlantStore } from "@/store/plantsStore";
import Input from "@/components/PlantlyInput";
import { useRouter } from "expo-router";
import { pickImage, takeImage } from "@/utils/media";

export default function NewScreen() {
  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`,
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number",
      );
    }

    addPlant({ name, wateringFrequencyDays: Number(days), imageUri });
    router.navigate("/");
  };
  const handleChooseImage = async () => {
    const result = await pickImage({});

    if (result) {
      setImageUri(result);
    }
  };

  const handleTakeImage = async () => {
    const result = await takeImage({});
    if (result) {
      setImageUri(result);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        onPress={handleChooseImage}
        activeOpacity={0.8}
      >
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centered}
        onPress={handleTakeImage}
        activeOpacity={0.8}
      >
        <Text>Take a photo</Text>
      </TouchableOpacity>
      <Input
        label="Name"
        placeholder="E.g. 1"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Water frequency (every x days)"
        placeholder="E.g. 1"
        value={days.toString()}
        onChangeText={setDays}
        keyboardType="numeric"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
