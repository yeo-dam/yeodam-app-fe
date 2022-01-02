import React from "react";
import ViewModelProvider from "~presentation/components/Pages/Index.vm";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider>
        <SafeAreaProvider>
          <StyledSafeAreaView>
            <Navigation colorScheme={colorScheme} />
          </StyledSafeAreaView>
        </SafeAreaProvider>
      </ViewModelProvider>
    );
  }
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
