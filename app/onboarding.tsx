import { View, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { PlantlyButton } from "@/components/PlantlyButton";

export default function OnboardingScreen() {
  const router = useRouter();

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handleOnboarding = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <PlantlyButton title="Let me in" onPress={handleOnboarding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
});
