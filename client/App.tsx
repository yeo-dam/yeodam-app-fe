import React, { useEffect, useState } from "react";
import ViewModelProvider, {
  getRootViewModel,
} from "~presentation/components/Screens/Index.vm";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ThemeProvider } from "styled-components";
import theme from "themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [localStore, setLocalStore] = useState("");

  // 1) 여기서 유저 엑세스 토큰이 발급되어 있는지 따져주고 있으면 바로 처리
  const getTocken = async () => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    if (loginToken) {
      setLocalStore(loginToken);
    }
  };

  useEffect(() => {
    getTocken();
  }, [localStore]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider accessToken={localStore}>
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
