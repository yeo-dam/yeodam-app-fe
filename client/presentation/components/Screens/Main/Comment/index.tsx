import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { MAIN_SCREEN_NAME } from "../index";
import { RootTabScreenProps } from "types";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import Flex from "~presentation/components/Shared/FlexBox";
import Avatar from "~presentation/components/Shared/Avatar";
import DropDownMenu from "~presentation/components/Shared/DropDownMenu";
import Divider from "~presentation/components/Shared/Divider";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MarginInterval from "~presentation/components/Shared/MarginInterval";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
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

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  console.log(`TCL ~ [index.tsx] ~ line ~ 40 ~ vm.comments`, vm.comments);

  return (
    <CommentLayout
      justifyContent="flex-start"
      alignItems="flex-start"
      hasHeader
    >
      <CommentBox>
        {vm.comments.map((item) => {
          return (
            <>
              <Flex>
                <LeftContentBox>
                  {/* TODO : Avatar 이미지가 nullable인가? */}
                  <Avatar imageSource={item.user.avatar?.filePath || ""} />
                </LeftContentBox>
                <MarginInterval width="8px" />
                <RightContentBox>
                  <UserFlexBox>
                    <Flex>
                      <Text>{item.user.name}</Text>
                      <MarginInterval width="8px" />
                      {/* FIXME : Comment createDateTime 추가해야 할 것 */}
                      <Text>{new Date().toString().slice(0, 4)}</Text>
                    </Flex>
                    <View>
                      <DropDownMenu />
                    </View>
                  </UserFlexBox>
                  {/* FIXME : Comment 줄바꿈 */}
                  <CommentContentBox>
                    {/* <Comment> */}
                    <Text>{item.content}</Text>
                    {/* </Comment> */}
                  </CommentContentBox>
                  {/* TODO : 서버에서 값을 뿌려줘야 함 */}
                  <LikeContentBox>
                    <Text>좋아요 --개</Text>
                    <MarginInterval width="6px" />
                    <Divider orientation="Vertical" />
                    <MarginInterval width="6px" />
                    {/* TODO : 기능 연결 필요*/}
                    <TouchableWithoutFeedback
                      onPress={() => console.log("답글쓰기")}
                    >
                      <Text>답글쓰기</Text>
                    </TouchableWithoutFeedback>
                  </LikeContentBox>
                </RightContentBox>
              </Flex>
              <MarginInterval height="16px" />
              <Divider orientation="Horizontal" color="#F9F9F9" />
              <MarginInterval height="16px" />
            </>
          );
        })}
      </CommentBox>
      {/* TODO : 댓글 생성 UI 구성 필요 */}
    </CommentLayout>
  );
};

export default observer(MyPageScreen);

const CommentLayout = styled(ContentLayout)`
  padding: 16px 24px 0px 24px;
  background-color: white;
`;

const CommentBox = styled.ScrollView``;

const LeftContentBox = styled.View``;

const RightContentBox = styled.View``;

const UserFlexBox = styled(Flex)`
  justify-content: space-between;
`;

const CommentContentBox = styled(Flex)`
  margin: 8px 12px 8px 0px;
  border: 1px solid blue;
`;

const LikeContentBox = styled(Flex)``;

const Comment = styled(View)`
  padding-right: 36px;
`;
