import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import ImageUpload from "~presentation/components/Shared/ImageUpload";
import { useForm } from "react-hook-form";
import Form from "~presentation/components/Shared/Form";
import classValidatorResolver from "~domain/helper/classValidator";
import PostModel from "~domain/model/PostModel/model";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  return (
    <ContentLayout>
      <Wrapper>
        <Form<PostModel> schema={PostModel}>
          <ImageUpload name="Image">
            <ImageUploadSection>
              <WithLocalSvg
                asset={require("~asset/images/No_image.svg")}
              ></WithLocalSvg>
              <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
            </ImageUploadSection>
          </ImageUpload>
        </Form>
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
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px;
  width: 319px;
  height: 390px;
  background-color: #ededed;
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;

const NoImageComponent = styled(Image)``;
