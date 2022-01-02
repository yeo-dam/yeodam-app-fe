import * as React from "react";
import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  return (
    <ContentLayout>
      <Typography>포스트생성 페이지 (앞면)</Typography>
    </ContentLayout>
  );
};
export default observer(CreatePost);

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
