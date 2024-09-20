import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const WAIT_TIME_SECONDS = 2;

export default function RootLayout() {
  useEffect(() => {
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
