import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/Google";
import { Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "853457680431-22eq2t45ga7ns93i4m9osm0hif7hh8sn.apps.googleusercontent.com",
    iosClientId:
      "853457680431-pp335gqs1pslrnqic4osgfjcam7lo1mn.apps.googleusercontent.com",
    webClientId:
      "853457680431-0hflsgm2jvcrrchbqu880kh76mvu0nkm.apps.googleusercontent.com",
  });

  const asyncAuthRequest = async () => {
    if (response?.type === "success") {
      const { authentication } = response;

      console.log(
        `TCL ~ [index.tsx] ~ line ~ 25 ~ authentication`,
        authentication
      );

      await AsyncStorage.setItem("accessTocken", "hihi");

      // 메인 페이지로 이동됩니다.
      navigation.navigate("Root");
    }
  };

  useEffect(() => {
    asyncAuthRequest();
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default GoogleLogin;
