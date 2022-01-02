import * as React from "react";
import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { CREATE_SCREEN_NAME } from "../";

const CreateStory = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.STORY>) => {
  return (
    <ContentLayout>
      <Typography>스토리생성 페이지 (앞면)</Typography>
    </ContentLayout>
  );
};
export default observer(CreateStory);

const BasicSection = styled.View`
  flex: 1;
`;

const FeedSection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid red;
`;

const StorySection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid blue;
`;
