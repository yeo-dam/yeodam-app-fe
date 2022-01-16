import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import ImageUpload from "~presentation/components/Shared/ImageUpload";
import { useForm } from "react-hook-form";
import Form from "~presentation/components/Shared/Form";
import classValidatorResolver from "helper/classValidator";
import PostModel from "~domain/model/PostModel/model";
import Input from "~presentation/components/Shared/Input";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  const [isFront, setIsFront] = React.useState(false);
  return (
    <ContentLayout>
      <Form<PostModel> schema={PostModel}>
        <Wrapper isFront={isFront}>
          {isFront ? (
            <ImageUpload name="Image">
              <ImageUploadSection>
                <WithLocalSvg
                  asset={require("~asset/images/No_image.svg")}
                ></WithLocalSvg>
                <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
              </ImageUploadSection>
            </ImageUpload>
          ) : (
            <View>
              <Input
                name="user"
                placeholder="user"
                placeholderTextColor="#fff"
              />
              <Input
                name="place"
                placeholder="place"
                placeholderTextColor="#fff"
              />
              <Input
                name="title"
                placeholder="title"
                placeholderTextColor="#fff"
              />
              <Input
                name="description"
                placeholder="description"
                placeholderTextColor="#fff"
              />
              <Input
                name="createdAt"
                placeholder="createdAt"
                placeholderTextColor="#fff"
              />
              <Input
                name="updatedAt"
                placeholder="updatedAt"
                placeholderTextColor="#fff"
              />
              <Input
                name="images"
                placeholder="images"
                placeholderTextColor="#fff"
              />
              <Input
                name="comments"
                placeholder="comments"
                placeholderTextColor="#fff"
              />
            </View>
          )}
        </Wrapper>
      </Form>
    </ContentLayout>
  );
};

export default observer(CreatePost);

const Wrapper = styled.View<{ isFront?: boolean }>`
  margin: 0 auto;
  background-color: ${({ isFront }) => (isFront ? "#fff" : "#121212")};
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
