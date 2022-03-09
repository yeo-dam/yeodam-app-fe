import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "./Post";
import ImageUpload from "./Post/ImageUpload";
import { Pressable, TouchableWithoutFeedback, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { CREATE_SCREEN_NAME, MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Typography from "~presentation/components/Shared/Typography";
import { getRootViewModel } from "../Index.vm";
import CreatePostViewModel from "./Post/CreatePost.vm";
import styled from "styled-components/native";
import MarginInterval from "~presentation/components/Shared/MarginInterval";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import Flex from "~presentation/components/Shared/FlexBox";
import Search from "./Post/Search";
import Input from "~presentation/components/Shared/Input";
import Form from "~presentation/components/Shared/Form";
import FindPostDto from "~domain/dto/FindPostDto";

export type BnbCreateNavigator = {
  [CREATE_SCREEN_NAME.POST]: undefined;
  [CREATE_SCREEN_NAME.STORY]: undefined;
  [CREATE_SCREEN_NAME.UPLOAD]: undefined;
  [CREATE_SCREEN_NAME.SEARCH]: undefined;
};

const CreateScreen = ({ navigation }: any) => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  console.log(`TCL ~ [index.tsx] ~ line ~ 30 ~ vm.isFront`, vm.isFront);

  return (
    <Stack.Navigator initialRouteName={CREATE_SCREEN_NAME.POST}>
      <Stack.Screen
        name={CREATE_SCREEN_NAME.POST}
        component={CreatePost}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(MAIN_SCREEN_NAME.HOME)}
            >
              <WithLocalSvg
                asset={require("~asset/Icons/Close.svg")}
              ></WithLocalSvg>
            </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <HeaderView>
              <Pressable onPress={() => runInAction(() => vm.setFront(true))}>
                <CreateHeaderTypo isFront={vm.isFront}>앞면</CreateHeaderTypo>
              </Pressable>
              <MarginInterval width="7px" />
              <Pressable onPress={() => runInAction(() => vm.setFront(false))}>
                <CreateHeaderTypo isFront={!vm.isFront}>뒷면</CreateHeaderTypo>
              </Pressable>
            </HeaderView>
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen name={CREATE_SCREEN_NAME.UPLOAD} component={ImageUpload} />
      <Stack.Screen
        name={CREATE_SCREEN_NAME.SEARCH}
        component={Search}
        options={{
          headerTitle: "",
          headerLeft: () => {
            return (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate(CREATE_SCREEN_NAME.POST)}
                >
                  <WithLocalSvg
                    asset={require("~asset/Icons/Back.svg")}
                  ></WithLocalSvg>
                </TouchableWithoutFeedback>
                <MarginInterval width="10px" />
                <Form schema={FindPostDto}>
                  <SearchBox>
                    <View>
                      <WithLocalSvg
                        asset={require("~asset/Icons/Search.svg")}
                      />
                      <MarginInterval width="8px" />
                      <Input
                        name="placeName"
                        placeholderTextColor="#999999"
                        placeholder="지번, 도로명, 건물명으로 위치 검색"
                      />
                    </View>
                  </SearchBox>
                </Form>
              </>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(CreateScreen);

const CreateHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})<{ isFront: boolean }>`
  color: ${({ isFront, theme }) =>
    isFront ? theme.colors.grey.black : theme.colors.grey[99]};
`;

const HeaderView = styled(Flex)``;

const SearchBox = styled(Flex)`
  flex: 1;
  margin-right: 42.5px;
  border: 1px solid blue;
`;
