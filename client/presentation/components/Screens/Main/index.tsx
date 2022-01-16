import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./index.Main";
import Comment from "./Comment";
import Search from "./Search";
import Map from "../MyPage/Map";

export const MAIN_SCREEN_NAME: {
  HOME: "Main";
  COMMENT: "Comment";
  SEARCH: "Search";
  MAP: "Map";
} = {
  HOME: "Main",
  COMMENT: "Comment",
  SEARCH: "Search",
  MAP: "Map",
};

export type BnbMainNavigator = {
  [MAIN_SCREEN_NAME.HOME]: undefined;
  [MAIN_SCREEN_NAME.COMMENT]: undefined;
  [MAIN_SCREEN_NAME.SEARCH]: undefined;
  [MAIN_SCREEN_NAME.MAP]: undefined;
};

const MainScreen = () => {
  const Stack = createNativeStackNavigator<BnbMainNavigator>();

  return (
    <Stack.Navigator initialRouteName={MAIN_SCREEN_NAME.HOME}>
      <Stack.Screen name={MAIN_SCREEN_NAME.HOME} component={Main} />
      <Stack.Screen name={MAIN_SCREEN_NAME.COMMENT} component={Comment} />
      <Stack.Screen name={MAIN_SCREEN_NAME.SEARCH} component={Search} />
      <Stack.Screen name={MAIN_SCREEN_NAME.MAP} component={Map} />
    </Stack.Navigator>
  );
};

export default MainScreen;
