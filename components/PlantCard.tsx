import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { theme } from "@/theme";
import { PlantType } from "@/store/plantsStore";
import { PlantlyImage } from "@/components/PlantlyImage";
import { useRouter } from "expo-router";

export function PlantCard({ plant }: { plant: PlantType }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/plants/${plant.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.plantCard}>
      <PlantlyImage imageUri={plant.imageUri} size={100} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.subtitle}>
          Water every {plant.wateringFrequencyDays} days
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    flexDirection: "row",
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorWhite,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  details: {
    padding: 14,
    justifyContent: "center",
  },
  plantName: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colorGrey,
  },
});
