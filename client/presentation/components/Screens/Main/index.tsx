import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./index.Main";
import Comment from "./Comment";
import Search from "./Search";
import Map from "../MyPage/Map";
import { TouchableWithoutFeedback } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import MarginInterval from "~presentation/components/Shared/MarginInterval";
import { getRootViewModel } from "../Index.vm";
import CommentViewModel from "./Comment/Comment.vm";
import { useEffect } from "react";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";

export type BnbMainNavigator = {
  [MAIN_SCREEN_NAME.HOME]: undefined;
  [MAIN_SCREEN_NAME.COMMENT]: undefined;
  [MAIN_SCREEN_NAME.SEARCH]: undefined;
  [MAIN_SCREEN_NAME.MAP]: undefined;
};

const MainScreen = ({ navigation }: any) => {
  const Stack = createNativeStackNavigator<BnbMainNavigator>();
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  useEffect(() => {
    async function loadComments() {
      await vm.load({
        offset: 0,
        limit: 4,
      });
    }
    loadComments();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MAIN_SCREEN_NAME.HOME}
    >
      <Stack.Screen name={MAIN_SCREEN_NAME.HOME} component={Main} />
      <Stack.Screen
        name={MAIN_SCREEN_NAME.COMMENT}
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Main")}
                >
                  <WithLocalSvg
                    asset={require("~asset/Icons/Back.svg")}
                  ></WithLocalSvg>
                </TouchableWithoutFeedback>
                <MarginInterval width="12px" />
                <CommentHeaderTypo>
                  댓글 {vm.comments.length}개
                </CommentHeaderTypo>
              </>
            );
          },
          headerTitle: "",
        }}
        component={Comment}
      />
      <Stack.Screen
        name={MAIN_SCREEN_NAME.SEARCH}
        options={{ headerShown: true }}
        component={Search}
      />
      <Stack.Screen name={MAIN_SCREEN_NAME.MAP} component={Map} />
    </Stack.Navigator>
  );
};

export default MainScreen;

const CommentHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})``;
