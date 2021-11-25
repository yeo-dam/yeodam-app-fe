import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image, Pressable } from "react-native";
import styled from "styled-components/native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../presentation/components/Pages/TabOne";
import TabThreeScreen from "../presentation/components/Pages/TabThree";
import TabTwoScreen from "../presentation/components/Pages/TabTwo";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

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
      initialRouteName="TabOne"
      backBehavior="order"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitleStyle: { display: "none" },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          tabBarLabel: "포트폴리오",
          tabBarIcon: () => (
            <Image source={require("../assets/Icons/Navigation/Main.png")} />
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon
                source={require("../assets/Icons/Navigation/Back.png")}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log("X button Clicked")}>
              <CloseIcon
                source={require("../assets/Icons/Navigation/Close.png")}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          tabBarLabel: "계좌",
          tabBarIcon: () => (
            <Image source={require("../assets/Icons/Navigation/Account.png")} />
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon
                source={require("../assets/Icons/Navigation/Back.png")}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log("X button Clicked")}>
              <CloseIcon
                source={require("../assets/Icons/Navigation/Close.png")}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={({ navigation }: RootTabScreenProps<"TabThree">) => ({
          tabBarLabel: "설정",
          tabBarIcon: () => (
            <Image source={require("../assets/Icons/Navigation/Setting.png")} />
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon
                source={require("../assets/Icons/Navigation/Back.png")}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log("X button Clicked")}>
              <CloseIcon
                source={require("../assets/Icons/Navigation/Close.png")}
              />
            </Pressable>
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
