import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "./Post";
import ImageUpload from "./Post/ImageUpload";
import {
  InputAccessoryView,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { CREATE_SCREEN_NAME, MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Typography from "~presentation/components/Shared/Typography";
import { getRootViewModel } from "../Index.vm";
import CreatePostViewModel from "./Post/CreatePost.vm";
import styled from "styled-components/native";
import Interval from "~presentation/components/Shared/Interval";
import { observer } from "mobx-react";
import Flex from "~presentation/components/Shared/FlexBox";
import Search from "./Post/Search";
import Input from "~presentation/components/Shared/Input";
import Form from "~presentation/components/Shared/Form";
import FindPostDto from "~domain/dto/FindPostDto";
import { useCallback, useState } from "react";
import { runInAction } from "mobx";
import theme from "themes";
import Button from "~presentation/components/Shared/Button";
import PlaceSearchDto from "~domain/dto/PlaceSearchDto";

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
  const [inputTextValue, setInputTextValue] = useState("");

  const handleClick = useCallback(
    (bool: boolean) => {
      runInAction(() => vm.setFront(bool));
    },
    [vm.isFront]
  );

  const handleChange = (e: any) => {
    setInputTextValue(e);
  };

  const onSubmit = async () => {
    const findDto: PlaceSearchDto = {
      keyword: inputTextValue,
    };

    runInAction(() => vm.setSearchWord(inputTextValue));

    await vm.findPlaces({
      query: findDto,
    });
  };

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
              <Pressable onPress={() => handleClick(true)}>
                <CreateHeaderTypo isFront={vm.isFront}>앞면</CreateHeaderTypo>
              </Pressable>
              <Interval width="7px" />
              <Pressable onPress={() => handleClick(false)}>
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
                <Interval width="10px" />
                <Form schema={FindPostDto}>
                  <SearchBox>
                    <View>
                      <Input
                        name="placeName"
                        placeholderTextColor="#999999"
                        value={inputTextValue}
                        onChangeText={handleChange}
                        placeholder="장소 이름 검색"
                        inputAccessoryViewID={CREATE_SCREEN_NAME.SEARCH}
                      />
                    </View>
                  </SearchBox>
                  <InputAccessoryView nativeID={CREATE_SCREEN_NAME.SEARCH}>
                    <Button
                      label="검색하기"
                      onPress={onSubmit}
                      color={theme.colors.grey.AA}
                    />
                  </InputAccessoryView>
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
  height: 40px;
  margin-right: 42.5px;
  align-items: center;
`;
