import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import { TouchableWithoutFeedback, View } from "react-native";
import Input from "~presentation/components/Shared/Input";
import FormLayout from "~presentation/components/Layout/FormLayout";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import Form from "~presentation/components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import Button from "~presentation/components/Shared/Button";
import { useEffect } from "react";
import { getRootViewModel } from "../../Index.vm";
import CreatePostViewModel from "./CreatePost.vm";
import { useFormContext } from "react-hook-form";

const CreatePost = ({
  navigation,
  route,
}: RootTabScreenProps<"CreatePost">) => {
  const [isFront, setIsFront] = React.useState(true);
  const [Photo, setPhoto] = React.useState();
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  useEffect(() => {
    const { params } = route;
    console.log(`TCL ~ [index.tsx] ~ line ~ 34 ~ route`, route, route.params);
    if (params) {
      const { photos } = params;
      console.log(`TCL ~ [index.tsx] ~ line ~ 33 ~ photos`, photos);
      if (photos) setPhoto(photos);
      delete (params as any).photos;
    }
  }, []);

  console.log(
    `TCL ~ [index.tsx] ~ line ~ 50 ~ vm.uploadedImages`,
    vm.uploadedImages
  );

  const onSubmit = (data: any) => console.log("이건가??", data);

  const renderForm = () => {
    if (isFront) {
      if (!vm.uploadedImages) {
        return (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("ImageUpload")}
          >
            <ImageUploadSection>
              <WithLocalSvg
                asset={require("~asset/images/No_image.svg")}
              ></WithLocalSvg>
              <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
            </ImageUploadSection>
          </TouchableWithoutFeedback>
        );
      } else {
        return <Image source={vm.uploadedImages[0].uri} />;
      }
    } else {
      return (
        <>
          <Input name="images" />
          <Input name="title" />
          <Input name="description" />
          <SubmitButton label="전송" onSubmit={onSubmit} />
        </>
      );
    }
  };

  return (
    <FormLayout>
      <View>
        <Form
          schema={CreatePostDto}
          defaultValues={{
            title: "Joonho",
            description: "Lee",
          }}
        >
          <>{renderForm()}</>
          <Button
            onPress={() => setIsFront(!isFront)}
            label="앞/뒤 전환 버튼"
          />
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

const InnerWrapper = styled.TouchableWithoutFeedback`
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;
