import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image, Pressable, View } from "react-native";
import styled from "styled-components/native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
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
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      backBehavior="order"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitleStyle: { display: "none" },
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          tabBarLabel: "홈",
          tabBarIcon: () => (
            <WithLocalSvg asset={require("~asset/Icons/Navigation/Add.svg")} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Create"
        component={CreateScreen}
        options={({ navigation }: RootTabScreenProps<"Create">) => ({
          tabBarLabel: "생성",
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
          tabBarLabel: "설정",
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
