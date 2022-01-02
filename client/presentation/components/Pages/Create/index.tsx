import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateMain from "./CreateMain";
import CreatePost from "./Post";
import CreateStory from "./Story";

export const CREATE_SCREEN_NAME: {
  MAIN: "CreateMain";
  POST: "CreatePost";
  STORY: "CreateStory";
} = {
  MAIN: "CreateMain",
  POST: "CreatePost",
  STORY: "CreateStory",
};

export type BnbCreateNavigator = {
  [CREATE_SCREEN_NAME.MAIN]: undefined;
  [CREATE_SCREEN_NAME.POST]: undefined;
  [CREATE_SCREEN_NAME.STORY]: undefined;
};

const CreateScreen = () => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();

  return (
    <Stack.Navigator initialRouteName={CREATE_SCREEN_NAME.MAIN}>
      <Stack.Screen name={CREATE_SCREEN_NAME.MAIN} component={CreateMain} />
      <Stack.Screen name={CREATE_SCREEN_NAME.POST} component={CreatePost} />
      <Stack.Screen name={CREATE_SCREEN_NAME.STORY} component={CreateStory} />
    </Stack.Navigator>
  );
};

export default CreateScreen;
