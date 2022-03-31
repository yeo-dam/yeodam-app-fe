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
import { ActivityIndicator } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [accessToken, setToken] = useState<string>("");

  // 1) 여기서 유저 엑세스 토큰이 발급되어 있는지 따져주고 있으면 바로 처리
  const getTocken = async () => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    if (loginToken) {
      // AsyncStorage.clear();
      setToken(loginToken);
    }
  };

  useEffect(() => {
    getTocken();
  }, [accessToken]);

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <ViewModelProvider accessToken={accessToken}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            {/* <StyledSafeAreaView> */}
            <Navigation colorScheme={colorScheme} setToken={setToken} />
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
