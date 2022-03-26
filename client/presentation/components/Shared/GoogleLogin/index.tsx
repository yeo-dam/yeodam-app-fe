import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import jwt_decode from "jwt-decode";
import {
  Button,
  Image,
  Pressable,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import GoogleLogo from "~asset/Icons/Login/Google.svg";
import { WithLocalSvg } from "react-native-svg";
import { useEffect, useState } from "react";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";
import ProviderType from "~domain/enum/ProviderType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DecodedIdTokenModel from "~domain/model/DecodedIdTokenModel";
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const vm = getRootViewModel((vm) => vm.auth);
  const navigation = useNavigation();
  const accessToken = vm?.auth?.accessToken;

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    async function sendAccessToken() {
      if (response?.type === "success") {
        const { authentication } = response;
        if (authentication?.accessToken) {
          const loginToken = await vm.requestLoginToken(
            authentication.accessToken,
            ProviderType.GOOGLE
          );

          if (loginToken) {
            // 받아온 response를 accessToken으로 저장해야 함.
            await AsyncStorage.setItem("loginToken", loginToken);

            // 바로 받아온 뒤, viewModel에도 값을 저장해준다.
            const StogageToken = await AsyncStorage.getItem("loginToken");

            if (StogageToken) {
              // 혹시 모르니 viewModel에도 decoded된 토큰 값을 저장해준다.
              vm.setLoginToken(StogageToken);
              const decodedToken: any = jwt_decode(StogageToken);

              console.log(
                `TCL ~ [index.tsx] ~ line ~ 52 ~ decodedToken`,
                decodedToken
              );

              const issuedDate = new Date(0);
              const expiredDate = new Date(0);

              if (decodedToken.iat && decodedToken.exp) {
                issuedDate.setUTCSeconds(decodedToken.iat);
                expiredDate.setUTCSeconds(decodedToken.exp);
              }

              // iat, exp를 Date 형식으로 변환해준다
              const newDecodedToken: DecodedIdTokenModel = {
                ...decodedToken,
                iat: issuedDate,
                exp: expiredDate,
              };

              vm.setUserInfo(newDecodedToken);
            }

            // 메인화면으로 이동한다.
            navigation.navigate("Root");
          }

          // 확인해본다.
          console.log(`vm.auth.accessToken >>> `, vm.auth?.accessToken);
        }
      }
    }
    sendAccessToken();
  }, [response]);

  function showUserInfo() {
    if (vm.user) {
      return (
        <UserBox>
          <Text>Welcome {vm.user.username}</Text>
          <Text>Email {vm.user.email}</Text>
        </UserBox>
      );
    }
  }

  return (
    <Wrapper>
      {showUserInfo()}
      <IconBox onPress={() => promptAsync({ showInRecents: true })}>
        <Text>{accessToken ? "유저 정보 불러오기" : "Google Login"}</Text>
      </IconBox>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

const IconBox = styled.TouchableWithoutFeedback`
  width: 100%;
  flex: 1;
`;

const UserProfile = styled.Image`
  flex: 1;
`;

const UserBox = styled.View``;
