import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateMain from "./CreateMain";
import CreatePost from "./Post";
import ImageUpload from "./Post/ImageUpload";

export const CREATE_SCREEN_NAME: {
  MAIN: "CreateMain";
  POST: "CreatePost";
  STORY: "CreateStory";
  UPLOAD: "ImageUpload";
} = {
  MAIN: "CreateMain",
  POST: "CreatePost",
  STORY: "CreateStory",
  UPLOAD: "ImageUpload",
};

export type BnbCreateNavigator = {
  [CREATE_SCREEN_NAME.MAIN]: undefined;
  [CREATE_SCREEN_NAME.POST]: undefined;
  [CREATE_SCREEN_NAME.STORY]: undefined;
  [CREATE_SCREEN_NAME.UPLOAD]: undefined;
};

const CreateScreen = () => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();

  return (
    <Stack.Navigator initialRouteName={CREATE_SCREEN_NAME.MAIN}>
      <Stack.Screen name={CREATE_SCREEN_NAME.MAIN} component={CreateMain} />
      <Stack.Screen name={CREATE_SCREEN_NAME.POST} component={CreatePost} />
      <Stack.Screen name={CREATE_SCREEN_NAME.UPLOAD} component={ImageUpload} />
    </Stack.Navigator>
  );
};

export default CreateScreen;
