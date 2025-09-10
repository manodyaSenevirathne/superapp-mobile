/**
 * Government SuperApp - Simple App Layout
 * 
 * Minimal root layout with basic navigation only
 * No complex state management to avoid errors
 */

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

/**
 * Simple loading component
 */
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading Government SuperApp...</Text>
    </View>
  );
}

/**
 * Root app component
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Lock orientation to portrait for consistency
    lockAsync(OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    // Hide splash screen once fonts are loaded
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show loading until fonts are ready
  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main app screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Micro-app screen for WebView apps */}
        <Stack.Screen 
          name="micro-app" 
          options={{ 
            headerShown: false,
            presentation: "modal" 
          }} 
        />
        
        {/* 404 Not Found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
      
      {/* Status bar styling */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
