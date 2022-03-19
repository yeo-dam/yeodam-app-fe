import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = ({ navigation }: any) => {
  return (
    <Button
      title="Login"
      onPress={() => {
        navigation.navigate(MAIN_SCREEN_NAME.HOME);
      }}
    />
  );
};

export default GoogleLogin;
