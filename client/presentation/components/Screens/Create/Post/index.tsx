import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { View } from "react-native";
import Input from "~presentation/components/Shared/Input";
import FormLayout from "~presentation/components/Layout/FormLayout";
import Form from "~presentation/components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { getRootViewModel } from "../../Index.vm";
import CreatePostViewModel from "./CreatePost.vm";
import Interval from "~presentation/components/Shared/Interval";
import Flex from "~presentation/components/Shared/FlexBox";
import PlaceType from "~domain/enum/PlaceType";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import DescriptionForm from "~presentation/components/Local/DescriptionForm";
import ImageForm from "~presentation/components/Local/ImageForm";
import Layout from "constants/Layout";

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

const CreatePost = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const onSubmit = async (data: CreatePostDto) => {
    const dateTime = data.inputDateTime;
    const year = dateTime.slice(0, 4);
    const month = dateTime.slice(4, 6);
    const day = dateTime.slice(6, 8);
    const transformed = `${year}.${month}.${day}`;
    const ImageIds = vm.uploadedImages.map((item) => item.id);
    const newTags = data.tags.map((item) => (item ? item : ""));
    const formmatedDto: CreatePostDto = {
      ...data,
      place: { ...vm.selectedPlace, type: data.place.type },
      tags: newTags as string[],
      date: transformed,
      images: ImageIds,
    };

    console.log(`formmatedDto >>> `, formmatedDto);

    try {
      await vm.createPost({ body: formmatedDto });
      navigation.push("Root");
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => {
    if (vm.isFront) {
      return <ImageForm vm={vm} navigation={navigation} />;
    } else {
      return (
        <DescriptionBox>
          <DescriptionForm
            vm={vm}
            navigation={navigation}
            onSubmit={onSubmit}
          />
        </DescriptionBox>
      );
    }
  };

  return (
    <FormLayout>
      <Form<CreatePostDto>
        schema={CreatePostDto}
        defaultValues={{
          place: {
            type: undefined,
          },
          description: undefined,
          tags: [],
          inputDateTime: undefined,
        }}
      >
        <Wrapper>
          <InnerWrapper>
            {renderForm()}
            <DateFlexBox>
              <DateInput
                maxLength={8}
                name="inputDateTime"
                placeholder="??????(YYYY-MM-DD)??? ??????????????????"
                keyboardType="number-pad"
                inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
              />
            </DateFlexBox>
          </InnerWrapper>
        </Wrapper>
      </Form>
    </FormLayout>
  );
};

export default observer(CreatePost);

const Wrapper = styled.View`
  margin: 0 auto;
  width: 351px;
  height: 526px;
  background-color: white;
`;

const InnerWrapper = styled.View`
  padding: 32px 16px 104px 16px;
`;

const DateFlexBox = styled(Flex)`
  justify-content: flex-end;
  padding-top: 73px;
`;

const DateInput = styled(Input)``;

const TitleBox = styled(Flex)`
  justify-content: center;
  width: 100%;
  padding: 0px 0px 16px 0px;
`;

const ImageUploadWrapper = styled.View``;

const ImageUploadSection = styled(View)`
  justify-content: center;
  align-items: center;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const DescriptionBox = styled(View)`
  justify-content: center;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.black};
`;

const DescriptionInnerBox = styled.View`
  padding: 0px 12px 16px 12px;
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;

const NoImageComponent = styled(Image)``;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-medium" })``;

const PlaceTypeBox = styled(Flex)`
  justify-content: space-around;
`;

const GreyTypo = styled(Typography).attrs({ variant: "caption-light" })`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const ContentInputBox = styled.View`
  width: 100%;
  height: 117px;
  background-color: #2f2f2f;
`;

const TagInputBox = styled.View`
  width: 100%;
  height: 19px;
  background-color: #2f2f2f;
`;
