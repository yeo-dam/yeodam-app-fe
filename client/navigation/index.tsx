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
import { useState } from "react";
import SignInScreen from "~presentation/components/Screens/SignInScreen";
import WelcomeScreen from "~presentation/components/Screens/WelcomeScreen";
import { BNB_SCREEN_NAME } from "constants/SCREEN_NAME";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  // TODO : Auth VM으로 변경해야 함
  const [user, setUser] = useState<boolean>(false);

  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "screen", headerShown: false }}
    >
      <React.Fragment>
        {!user && (
          <React.Fragment>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
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
          tabBarLabel: () => <BottomBarTypo>피드</BottomBarTypo>,
          tabBarIcon: () => (
            <WithLocalSvg
              asset={require("~asset/Icons/Navigation/Feed/Feed.svg")}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.CREATE}
        component={CreateScreen}
        options={{
          tabBarLabel: () => <BottomBarTypo>입력</BottomBarTypo>,
          tabBarIcon: () => (
            <CreateBtnBox>
              <WithLocalSvg
                asset={require("~asset/Icons/Navigation/Create/Create.svg")}
              />
            </CreateBtnBox>
          ),
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.MYPAGE}
        component={MyPageScreen}
        options={{
          tabBarLabel: () => <BottomBarTypo>마이</BottomBarTypo>,
          tabBarIcon: () => (
            <WithLocalSvg
              asset={require("~asset/Icons/Navigation/Setting/Setting.svg")}
            />
          ),
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

const CreateBtnBox = styled.View`
  padding-top: 8px;
`;

const BottomBarTypo = styled(Typography).attrs({
  textSize: "10px",
})`
  color: ${({ theme }) => theme.colors.grey.AA};
`;
