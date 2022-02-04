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
import CreatePostDto from "domain/dto/CreatePostDto";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  const [isFront, setIsFront] = React.useState(false);
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormLayout>
      <View>
        <Form<CreatePostDto>
          schema={CreatePostDto}
          defaultValues={{
            title: "title",
            description: "description",
          }}
        >
          <Input name="title" />
          <Input name="description" />
          <SubmitButton label="전송" onSubmit={onSubmit} />
        </Form>
      </View>
    </FormLayout>
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
