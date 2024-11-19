import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  index: undefined;
  signup: undefined;
  instructorDashboard: undefined;
  studentDashboard: undefined;
  studentStatistics: undefined;
  statistics: undefined;
  levelSelect: {
    category_id?: number;
  };
  nameThatThing: {
    category_id?: number;
    level_id?: number;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="instructorDashboard"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="statistics" options={{ headerShown: false }} />
        <Stack.Screen
          name="studentDashboard"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="studentStatistics"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="levelSelect" options={{ headerShown: false }} />
        <Stack.Screen name="nameThatThing" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
