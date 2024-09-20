import { useEffect } from "react";
import { Platform } from "react-native";

import * as QuickActions from "expo-quick-actions";
import { SplashScreen, Stack } from "expo-router";
import { useQuickActionRouting } from "expo-quick-actions/router";

SplashScreen.preventAutoHideAsync();

const WAIT_TIME_SECONDS = 2;

export default function RootLayout() {
  useQuickActionRouting();
  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Add a plant",
        icon: Platform.OS === "ios" ? "symbol:leaf" : "leaf",
        id: "0",
        params: { href: "/new" },
      },
    ]);

    const hideSplashScreen = setTimeout(() => {
      SplashScreen.hideAsync();
    }, WAIT_TIME_SECONDS * 1000);

    return () => {
      clearTimeout(hideSplashScreen);
    };
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "New plant",
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
