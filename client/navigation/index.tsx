import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";
import { ColorSchemeName, Image } from "react-native";
import styled from "styled-components/native";

import ModalScreen from "~presentation/components/Screens/ModalScreen";
import NotFoundScreen from "~presentation/components/Screens/NotFoundScreen";
import MainScreen from "~presentation/components/Screens/Main";
import MyPageScreen from "~presentation/components/Screens/MyPage";
import CreateScreen from "~presentation/components/Screens/Create";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { WithLocalSvg } from "react-native-svg";
import Typography from "~presentation/components/Shared/Typography";
import { useEffect, useState } from "react";
import SignInScreen from "~presentation/components/Screens/SignInScreen";
import WelcomeScreen from "~presentation/components/Screens/WelcomeScreen";
import { BNB_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";

import FeedLogo from "~asset/Icons/Navigation/Feed/Feed.svg";
import ClickedFeedLogo from "~asset/Icons/Navigation/Feed/Feed_clicked.svg";
import ClickedCreateLogo from "~asset/Icons/Navigation/Create/Create_clicked.svg";
import CreateLogo from "~asset/Icons/Navigation/Create/Create.svg";
import ClickedSettingLogo from "~asset/Icons/Navigation/Setting/Setting_clicked.svg";
import SettingLogo from "~asset/Icons/Navigation/Setting/Setting.svg";
import theme from "themes";

export default function Navigation({
  colorScheme,
  setToken,
}: {
  colorScheme: ColorSchemeName;
  setToken: (data: string) => void;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator setToken={setToken} />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({ setToken }: { setToken: (data: string) => void }) {
  const vm = getRootViewModel((vm) => vm.auth);

  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "screen", headerShown: false }}
    >
      <React.Fragment>
        {!vm.auth?.accessToken && (
          <React.Fragment>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          </React.Fragment>
        )}
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Not Found!" }}
        />
      </React.Fragment>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export type BnbMainNavigator = {
  [BNB_SCREEN_NAME.MAIN]: undefined;
  [BNB_SCREEN_NAME.CREATE]: undefined;
  [BNB_SCREEN_NAME.MYPAGE]: undefined;
};

// BottomTabParamList란 Type들을 리스팅해주면 좋을 듯
const BottomTab = createBottomTabNavigator<BnbMainNavigator>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={BNB_SCREEN_NAME.MAIN}
      backBehavior="order"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.MAIN}
        component={MainScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>피드</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <ClickedFeedLogo /> : <FeedLogo />,
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.CREATE}
        component={CreateScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>입력</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ClickedCreateLogo />
            ) : (
              <CreateBtnBox>
                <CreateLogo />
              </CreateBtnBox>
            ),
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.MYPAGE}
        component={MyPageScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>마이</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <ClickedSettingLogo /> : <SettingLogo />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const BackIcon = styled(Image)`
  margin-left: 32px;
`;

const CloseIcon = styled(Image)`
  margin-right: 32px;
`;

const CustomImage = styled(Image)<{ isFocused: boolean }>`
  tint-color: ${({ isFocused }) => (isFocused ? "red" : "black")};
`;

const CreateBtnBox = styled.View`
  padding-top: 8px;
`;

const BottomBarTypo = styled(Typography).attrs({
  textSize: "10px",
})<{
  isClicked: boolean;
}>`
  color: ${({ theme, isClicked }) =>
    isClicked ? theme.colors.primary.sub : theme.colors.grey.AA};
`;
