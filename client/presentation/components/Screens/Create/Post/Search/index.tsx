import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../../Index.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { InputAccessoryView, View } from "react-native";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import CreatePostViewModel from "../CreatePost.vm";
import Form from "~presentation/components/Shared/Form";
import Input from "~presentation/components/Shared/Input";
import SearchDto from "~domain/dto/SearchDto";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import styled from "styled-components/native";
import theme from "themes";
import Button from "~presentation/components/Shared/Button";
import FlexBox from "~presentation/components/Shared/FlexBox";
import Divider from "~presentation/components/Shared/Divider";
import Interval from "~presentation/components/Shared/Interval";
import { runInAction } from "mobx";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.SEARCH>) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const handlePress = (placeId: number) => {
    console.log(`TCL ~ [index.tsx] ~ line ~ 34 ~ placeId`, placeId);
    runInAction(() => vm.selectPlace(placeId));
    navigation.navigate("CreatePost");
  };

  // const onSubmit = (data: any) =>
  // console.log("검색어 쿼리를 전송합니다..", data);
  // TODO : 해당 화면에선 BottomBar를 숨겨줘야 합니다.

  console.log(
    `TCL ~ [index.tsx] ~ line ~ 39 ~ vm.selectedPlace`,
    vm.selectedPlace
  );

  return (
    <Wrapper title="Tab Three" justifyContent="flex-end">
      <ContentBox>
        {vm.searchedList &&
          vm.searchedList.map((item) => {
            return (
              <Content
                key={item.placeId}
                onPress={() => handlePress(item.placeId)}
              >
                <Interval height="16px" />
                <Title variant="subhead-regular">{item.placeName}</Title>
                <Interval height="1px" />
                <Description variant="caption-regular">
                  {item.address}
                </Description>
                <Interval height="16px" />
                <Divider orientation="Horizontal" />
              </Content>
            );
          })}

        {/* <Content onPress={() => handlePress("12")}>
         <Content onPress={() => handlePress(item.id)}>
          <Interval height="16px" />
          <Title variant="subhead-regular">검색페이지</Title>
          <Interval height="1px" />
          <Description variant="caption-regular">검색페이지</Description>
          <Interval height="16px" />
          <Divider orientation="Horizontal" />
        </Content> */}
      </ContentBox>
      <ButtonBox>
        {vm.searchedWord && (
          <StyledButton
            label={`${`"${vm.searchedWord}" 등록하기`}`}
            color={theme.colors.primary.main}
            // onPress={onSubmit}
          />
        )}
      </ButtonBox>
    </Wrapper>
  );
};

export default observer(MyPageScreen);

const Wrapper = styled(ContentLayout)`
  padding: 16px 24px 0px 24px;
`;

const Content = styled.Pressable``;

const ContentBox = styled.ScrollView`
  flex: 1;
`;

const Title = styled(Typography)`
  color: #121212;
`;

const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const StyledInputAccessoryView = styled(InputAccessoryView)`
  flex: 1;
`;

const ButtonBox = styled(FlexBox)`
  align-items: flex-end;
`;

const StyledButton = styled(Button)`
  border-radius: 6px;
`;
