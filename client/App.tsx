import React from "react";
import ViewModelProvider, {
  InitialData,
} from "~presentation/components/Screens/Index.vm";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ThemeProvider } from "styled-components";
import theme from "themes";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const accessTocken = AsyncStorage.getItem("accessTocken");
  const { auth }: InitialData = { accessTocken };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider auth={auth}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            {/* <StyledSafeAreaView> */}
            <Navigation colorScheme={colorScheme} />
            {/* </StyledSafeAreaView> */}
          </SafeAreaProvider>
        </ThemeProvider>
      </ViewModelProvider>
    );
  }
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
