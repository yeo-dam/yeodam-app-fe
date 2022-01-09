import * as React from "react";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  return (
    <ContentLayout>
      <Wrapper>
        <ImageUploadSection>
          <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
        </ImageUploadSection>
      </Wrapper>
    </ContentLayout>
  );
};
export default observer(CreatePost);

const Wrapper = styled.View`
  margin: 0 auto;
  background-color: #fff;
  width: 351px;
  height: 526px;
`;

const ImageUploadSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px;
  width: 319px;
  height: 390px;
  background-color: #ededed;
`;

const BasicSection = styled.View`
  flex: 1;
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;
