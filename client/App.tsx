import React from "react";
import dotenv from "dotenv";
import { StatusBar, Platform } from "react-native";
import ViewModelProvider from "~presentation/components/Pages/Index.vm";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

dotenv.config();

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
      <ViewModelProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <Nav />
        </SafeAreaProvider>
      </ViewModelProvider>
    );
  }
}

const Nav = styled.View`
  height: ${STATUS_BAR_HEIGHT + "px"};
`;
