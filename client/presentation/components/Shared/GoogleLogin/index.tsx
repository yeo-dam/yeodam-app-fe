import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import jwt_decode from "jwt-decode";
import {
  Button,
  Image,
  Pressable,
  Text,
  View,
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

export default function Component({
  setToken,
}: {
  setToken: (data: string) => void;
}) {
  const vm = getRootViewModel((vm) => vm.auth);
  const mainVm = getRootViewModel((vm) => vm.tab.Main);
  const navigation = useNavigation();
  const accessToken = vm?.auth?.accessToken;
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    async function sendAccessToken() {
      if (response?.type === "success") {
        const { authentication } = response;

        console.log(
          `TCL ~ [index.tsx] ~ line ~ 39 ~ authentication`,
          authentication
        );

        if (authentication?.accessToken) {
          // vm.setLoginToken(authentication?.accessToken);
          const loginToken = await vm.requestLoginToken(
            authentication.accessToken,
            ProviderType.GOOGLE
          );

          console.log(`TCL ~ [index.tsx] ~ line ~ 59 ~ loginToken`, loginToken);

          if (loginToken) {
            // 받아온 response를 accessToken으로 저장해야 함.
            await AsyncStorage.setItem("loginToken", loginToken);

            // 바로 받아온 뒤, viewModel에도 값을 저장해준다.
            const StogageToken = await AsyncStorage.getItem("loginToken");

            console.log(
              `TCL ~ [index.tsx] ~ line ~ 53 ~ StogageToken`,
              StogageToken
            );

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
        }
      }
    }
    sendAccessToken();
  }, [response]);

  // async function getUserData() {
  //   let userInfoResponse = await fetch(
  //     "https://www.googleapis.com/userinfo/v2/me",
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     }
  //   );

  //   userInfoResponse.json().then((data) => {
  //     setUserInfo(data);
  //   });
  // }

  console.log(`TCL ~ [index.tsx] ~ line ~ 42 ~ userInfo`, userInfo);

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
      <IconBox
        onPress={
          // accessToken ? getUserData : () => promptAsync({ showInRecents: true })
          () => promptAsync({ showInRecents: true })
        }
      >
        <LogoBox>
          <GoogleLogo />
        </LogoBox>
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

const LogoBox = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: ${({ theme }) => theme.colors.background.paper};
`;
