import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image } from "react-native";
import styled from "styled-components/native";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../presentation/components/Pages/Main";
import MyPageScreen from "../presentation/components/Pages/MyPage";
import CreateScreen from "../presentation/components/Pages/Create";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { WithLocalSvg } from "react-native-svg";
import Typography from "~presentation/components/Atoms/Typography";
import { useState } from "react";
import { CREATE_SCREEN_NAME } from "~presentation/components/Pages/Create";

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

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      backBehavior="order"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          tabBarLabel: () => <Typography variant="body2">피드</Typography>,
          tabBarIcon: () => (
            <WithLocalSvg asset={require("~asset/Icons/Navigation/Add.svg")} />
          ),
        })}
      />
      <BottomTab.Screen
        name="CreateMain"
        component={CreateScreen}
        options={({ navigation }: RootTabScreenProps<"CreateMain">) => ({
          tabBarLabel: () => <Typography variant="body2">입력</Typography>,
          tabBarIcon: () => (
            <CreateBtnBox>
              <WithLocalSvg
                asset={require("~asset/Icons/Navigation/createBtn.svg")}
              />
            </CreateBtnBox>
          ),
        })}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={({ navigation }: RootTabScreenProps<"MyPage">) => ({
          tabBarLabel: () => <Typography variant="body2">마이</Typography>,
          tabBarIcon: () => (
            <WithLocalSvg
              asset={require("~asset/Icons/Navigation/Setting.svg")}
            />
          ),
        })}
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
  padding-top: 8;
`;
