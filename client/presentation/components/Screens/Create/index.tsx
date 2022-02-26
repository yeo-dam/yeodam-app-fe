import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "./Post";
import ImageUpload from "./Post/ImageUpload";
import { TouchableWithoutFeedback } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";

export type BnbCreateNavigator = {
  [CREATE_SCREEN_NAME.POST]: undefined;
  [CREATE_SCREEN_NAME.STORY]: undefined;
  [CREATE_SCREEN_NAME.UPLOAD]: undefined;
};

const CreateScreen = () => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();

  return (
    <Stack.Navigator initialRouteName={CREATE_SCREEN_NAME.POST}>
      <Stack.Screen
        name={CREATE_SCREEN_NAME.POST}
        component={CreatePost}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => console.log("clicked")}>
              <WithLocalSvg
                asset={require("~asset/Icons/Close.svg")}
              ></WithLocalSvg>
            </TouchableWithoutFeedback>
          ),
          // headerRight: ,
          headerTitle: "",
        }}
      />
      <Stack.Screen name={CREATE_SCREEN_NAME.UPLOAD} component={ImageUpload} />
    </Stack.Navigator>
  );
};

export default CreateScreen;
