import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import {
  TouchableWithoutFeedback,
  Pressable,
  View,
  Text,
  InputAccessoryView,
} from "react-native";
import Input from "~presentation/components/Shared/Input";
import FormLayout from "~presentation/components/Layout/FormLayout";
import Form from "~presentation/components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { getRootViewModel } from "../../Index.vm";
import CreatePostViewModel from "./CreatePost.vm";
import Interval from "~presentation/components/Shared/Interval";
import Flex from "~presentation/components/Shared/FlexBox";
import Divider from "~presentation/components/Shared/Divider";
import PlaceType from "~domain/enum/PlaceType";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import theme from "themes";
import Tags from "~presentation/components/Shared/Tags";
import PlaceTypeSelector from "~presentation/components/Local/PlaceTypeSelector";
import Carousel from "~presentation/components/Shared/Carousel";
import DescriptionForm from "~presentation/components/Local/DescriptionForm";

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
    const transformed = new Date(`${year}-${month}-${day}`);

    const newDto: any = {
      ...data,
      date: transformed,
    };

    console.log(`TCL ~ [index.tsx] ~ line ~ 57 ~ newDto`, newDto);

    try {
      await vm.createPost(newDto);
      // navigation.push("Root");
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (data: PlaceType) => {
    console.log("data", data);
  };

  const renderForm = () => {
    if (vm.isFront) {
      if (vm.uploadedImages.length === 0) {
        return (
          <ImageUploadWrapper>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("ImageUpload")}
            >
              <ImageUploadSection>
                <WithLocalSvg
                  asset={require("~asset/images/No_image.svg")}
                ></WithLocalSvg>
                <Interval height="10px" />
                <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
              </ImageUploadSection>
            </TouchableWithoutFeedback>
          </ImageUploadWrapper>
        );
      } else {
        return <Carousel pages={vm.uploadedImages} isTextImg={false} />;
      }
    } else {
      return (
        <DescriptionBox>
          <DescriptionForm navigation={navigation} onSubmit={onSubmit} />
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
            name: "쉑쉑버거",
            type: PlaceType.FOOD,
            formattedAddress: "서울특별시 강남구 논현동",
          },
          description: "여기 진짜 맛있어요!",
          tags: ["#맛집", "#카페"],
          inputDateTime: "20111222",
        }}
      >
        <Wrapper>
          <InnerWrapper>
            {renderForm()}
            <DateFlexBox>
              <DateInput
                maxLength={8}
                name="inputDateTime"
                placeholder="날짜(YYYY-MM-DD)를 입력해주세요"
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
