import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import { View } from "react-native";
import Input from "~presentation/components/Shared/Input";
import FormLayout from "~presentation/components/Layout/FormLayout";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import Form from "~presentation/components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import ImageUpload from "~presentation/components/Shared/ImageUpload";

type Props = {};

const Component: FC<Props> = () => {
  const [isFront, setIsFront] = React.useState<boolean>(true);
  const onSubmit = (data: any) => console.log(data);

  const renderForm = () => {
    if (isFront) {
      return (
        <ImageUploadSection>
          <ImageUpload name="Image">
            <WithLocalSvg
              asset={require("~asset/images/No_image.svg")}
            ></WithLocalSvg>
            <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
          </ImageUpload>
        </ImageUploadSection>
      );
    } else {
      return (
        <>
          <Input name="title" />
          <Input name="description" />
          <SubmitButton label="전송" onSubmit={onSubmit} />
        </>
      );
    }
  };

  return (
    <Form<CreatePostDto>
      schema={CreatePostDto}
      defaultValues={{
        title: "title",
        description: "description",
      }}
    >
      {renderForm()}
    </Form>
  );
};

export default Component;

const StyledText = styled.Text`
  width: 100%;
`;

const ImageUploadSection = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;
