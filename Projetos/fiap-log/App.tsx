import "./global.css"
import React from 'react';
import { View } from "react-native";

import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter";

import {
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold
} from "@expo-google-fonts/red-hat-display"
import { ActivityIndicator } from "react-native";
import Dashboard from "./src/Dashboard";

export default function App() {
  const [isFontLoaded, isFontError] = useFonts({
    primary_regular: Inter_400Regular,
    primary_medium: Inter_500Medium,
    primary_semiBold: Inter_600SemiBold,
    primary_bold: Inter_700Bold,
    secondary_regular: RedHatDisplay_400Regular,
    secondary_medium: RedHatDisplay_500Medium,
    secondary_semiBold: RedHatDisplay_600SemiBold,
    secondary_bold: RedHatDisplay_700Bold
  });

  if (!isFontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#040404" }} >
        <ActivityIndicator size="large" color="#ED145B" />
      </View>
    )
  }

  return (
    <Dashboard />
  );
}

