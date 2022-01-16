import React from "react";
import ViewModelProvider, {
  InitialData,
} from "~presentation/components/Screens/Index.vm";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { auth }: InitialData = {};

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider auth={auth} >
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
