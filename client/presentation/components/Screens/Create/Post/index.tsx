import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { WithLocalSvg } from "react-native-svg";
import { TouchableWithoutFeedback, Text, Pressable, View } from "react-native";
import Input from "~presentation/components/Shared/Input";
import FormLayout from "~presentation/components/Layout/FormLayout";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import Form from "~presentation/components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { getRootViewModel } from "../../Index.vm";
import CreatePostViewModel from "./CreatePost.vm";
import MarginInterval from "~presentation/components/Shared/MarginInterval";
import Flex from "~presentation/components/Shared/FlexBox";
import DropDownContainer from "~presentation/components/Shared/DropDownContainer";
import Divider from "~presentation/components/Shared/Divider";

const CreatePost = ({ navigation }: RootTabScreenProps<"CreatePost">) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const onSubmit = (data: any) => console.log("이건가??", data);

  const onSelect = (data: string) => {
    console.log("data", data);
  };

  const renderForm = () => {
    if (vm.isFront) {
      if (!vm.uploadedImages) {
        return (
          <ImageUploadWrapper>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("ImageUpload")}
            >
              <ImageUploadSection>
                <WithLocalSvg
                  asset={require("~asset/images/No_image.svg")}
                ></WithLocalSvg>
                <MarginInterval height="10px" />
                <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
              </ImageUploadSection>
            </TouchableWithoutFeedback>
          </ImageUploadWrapper>
        );
      } else {
        return (
          <Image
            width={300}
            height={300}
            source={{ uri: vm.uploadedImages[0].uri }}
          />
        );
      }
    } else {
      return (
        <DescriptionBox>
          <DescriptionInnerBox>
            <Input name="imageIds" hidden />
            <Input name="description" hidden />
            <Input
              name="title"
              placeholder="장소이름을 입력하세요"
              placeholderTextColor="#999999"
              placeholderSize="18px"
            />
            <Flex>
              <DropDownContainer
                content={
                  <View>
                    {/* // FIXME : 장소타입 내용들은 변경될 예정임 */}
                    <TitleBox>
                      <Typography variant="subhead-regular">
                        장소종류를 선택하세요
                      </Typography>
                    </TitleBox>
                    <Divider orientation="Horizontal" />
                    <MarginInterval height="45px" />
                    <PlaceTypeBox>
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                      <Divider orientation="Vertical" />
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                    </PlaceTypeBox>
                    <MarginInterval height="31px" />
                    <PlaceTypeBox>
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                      <Divider orientation="Vertical" />
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                    </PlaceTypeBox>
                    <MarginInterval height="31px" />
                    <PlaceTypeBox>
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                      <Divider orientation="Vertical" />
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                    </PlaceTypeBox>
                    <MarginInterval height="31px" />
                    <PlaceTypeBox>
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                      <Divider orientation="Vertical" />
                      <Pressable onPress={() => onSelect("레스토랑")}>
                        <DropDownTypo>레스토랑</DropDownTypo>
                      </Pressable>
                    </PlaceTypeBox>
                    <MarginInterval height="31px" />
                  </View>
                }
              >
                <GreyTypo>장소</GreyTypo>
              </DropDownContainer>
              <MarginInterval width="4px" />
              <Divider orientation="Vertical" />
              <MarginInterval width="4px" />
              <Pressable onPress={() => navigation.navigate("Search")}>
                <GreyTypo>위치를 입력하세요</GreyTypo>
              </Pressable>
            </Flex>
            <MarginInterval height="14px" />
            <Input
              name="content"
              placeholder="내용을 입력하세요"
              numberOfLines={10}
              placeholderTextColor="#999999"
            />
            {/* FIXME : 전송버튼 추가될 필요 있음 */}
            {/* <SubmitButton label="전송" onSubmit={onSubmit} /> */}
          </DescriptionInnerBox>
        </DescriptionBox>
      );
    }
  };

  return (
    <FormLayout>
      <Form schema={CreatePostDto}>
        <Wrapper>
          <InnerWrapper>
            {renderForm()}
            <DateFlexBox>
              <DateInput name="date" placeholder="날짜를 선택해주세요" keyboardType="number-pad" />
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

const ImageUploadSection = styled.View`
  justify-content: center;
  align-items: center;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const DescriptionBox = styled.View`
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
