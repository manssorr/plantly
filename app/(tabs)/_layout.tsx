import { Entypo, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { theme } from "@/theme";
import { Text } from "react-native";
import { Redirect } from "expo-router";

const hasFinishedOnboarding = false;

export default function RootLayout() {
  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  console.log("RootLayout");
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorGreen,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={size} color={color} />
          ),
          tabBarLabel,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel,
        }}
      />
    </Tabs>
  );
}

const tabBarLabel = ({
  focused,
  color,
  children,
}: {
  focused: boolean;
  color: string;
  children: string;
}) => {
  return focused ? (
    <Text
      style={{
        color,
        fontSize: 12,
        fontWeight: "bold",
      }}
    >
      {children}
    </Text>
  ) : null;
};
