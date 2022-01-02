import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./index.Main";
import Comment from "./Comment";
import Search from "./Search";

export const MAIN_SCREEN_NAME: {
  HOME: "Main";
  COMMENT: "Comment";
  SEARCH: "Search";
} = {
  HOME: "Main",
  COMMENT: "Comment",
  SEARCH: "Search",
};

export type BnbMainNavigator = {
  [MAIN_SCREEN_NAME.HOME]: undefined;
  [MAIN_SCREEN_NAME.COMMENT]: undefined;
  [MAIN_SCREEN_NAME.SEARCH]: undefined;
};

const MainScreen = () => {
  const Stack = createNativeStackNavigator<BnbMainNavigator>();

  return (
    <Stack.Navigator initialRouteName={MAIN_SCREEN_NAME.HOME}>
      <Stack.Screen name={MAIN_SCREEN_NAME.HOME} component={Main} />
      <Stack.Screen name={MAIN_SCREEN_NAME.COMMENT} component={Comment} />
      <Stack.Screen name={MAIN_SCREEN_NAME.SEARCH} component={Search} />
    </Stack.Navigator>
  );
};

export default MainScreen;
