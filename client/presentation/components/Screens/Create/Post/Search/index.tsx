import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../../Index.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { Button, InputAccessoryView, View } from "react-native";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import CreatePostViewModel from "../CreatePost.vm";
import Form from "~presentation/components/Shared/Form";
import Input from "~presentation/components/Shared/Input";
import SearchDto from "~domain/dto/SearchDto";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import styled from "styled-components/native";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.SEARCH>) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const onSubmit = (data: any) =>
    console.log("검색어 쿼리를 전송합니다..", data);

  // TODO : 해당 화면에선 BottomBar를 숨겨줘야 합니다.

  return (
    <ContentLayout title="Tab Three">
      <Form schema={SearchDto}>
        <View>
          <Typography>검색페이지</Typography>
          <Input name="placeName" inputAccessoryViewID={CREATE_SCREEN_NAME.SEARCH} />
        </View>
        <InputAccessoryView nativeID={CREATE_SCREEN_NAME.SEARCH}>
          <SubmitButton label="검색" onSubmit={onSubmit} />
        </InputAccessoryView>
      </Form>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);

const StyledInputAccessoryView = styled(InputAccessoryView)`
  flex: 1;
  border: 1px solid blue;
`;
