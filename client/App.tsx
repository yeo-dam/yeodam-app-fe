import React from "react";
import { StatusBar, Platform, View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export const IsAndroid = Platform.OS === "android";
export const STATUS_BAR_HEIGHT = IsAndroid
  ? StatusBar.currentHeight
  : getStatusBarHeight();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <Nav />
      </SafeAreaProvider>
    );
  }
}

const Nav = styled.View`
  height: ${STATUS_BAR_HEIGHT + "px"};
`;
