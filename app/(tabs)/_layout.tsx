import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { theme } from "@/theme";
import { Pressable, Text } from "react-native";
import { Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function RootLayout() {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding,
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

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
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20} style={{ marginRight: 18 }}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          ),
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
