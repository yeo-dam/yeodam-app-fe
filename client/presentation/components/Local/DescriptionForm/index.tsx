import React, { FC } from "react";
import styled from "styled-components/native";
import { InputAccessoryView, Pressable } from "react-native";
import Input from "~presentation/components/Shared/Input";
import theme from "themes";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import FlexBox from "~presentation/components/Shared/FlexBox";
import PlaceTypeSelector from "../PlaceTypeSelector";
import Interval from "~presentation/components/Shared/Interval";
import Divider from "~presentation/components/Shared/Divider";
import Tags from "~presentation/components/Shared/Tags";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import { RootTabScreenProps } from "types";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { useFormContext } from "react-hook-form";
import Typography from "~presentation/components/Shared/Typography";
import { observer } from "mobx-react";
import CreatePostViewModel from "~presentation/components/Screens/Create/Post/CreatePost.vm";

type NavigationType = Pick<
  RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>,
  "navigation"
>;

type Props = {
  vm: CreatePostViewModel;
  onSubmit: (data: CreatePostDto) => void;
} & NavigationType;

const Component: FC<Props> = ({ vm, navigation, onSubmit }: Props) => {
  const { watch, formState } = useFormContext();

  // 여기서 직접 값을 set 해주는 UI 필요함
  return (
    <DescriptionInnerBox>
      <Input name="place.placeId" hidden />
      <Input name="place.placeName" hidden />
      {/* 장소 이름 */}
      <Pressable onPress={() => navigation.navigate("Search")}>
        <GreyTypo variant="subhead-medium">
          {vm.selectedPlace
            ? vm.selectedPlace.placeName
            : "장소이름을 입력하세요"}
        </GreyTypo>
      </Pressable>
      <FlexBox>
        {/* 장소 선택 */}
        <PlaceTypeSelector />
        <Interval width="4px" />
        <Divider orientation="Vertical" />
        <Interval width="4px" />
        {/* 장소 주소 */}
        <Pressable onPress={() => navigation.navigate("Search")}>
          <GreyTypo variant="caption-light">
            {vm.selectedPlace ? vm.selectedPlace.address : "위치를 입력하세요"}
          </GreyTypo>
          <Input name="place.address" hidden />
        </Pressable>
      </FlexBox>
      <Interval height="14px" />
      <ContentInputBox>
        <Input
          name="description"
          placeholder="내용을 입력하세요"
          color={theme.colors.background.paper}
          numberOfLines={10}
          fontSize="14px"
          placeholderTextColor={theme.colors.grey[99]}
          inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
        />
      </ContentInputBox>
      <Interval height="3px" />
      <TagInputBox>
        <Tags />
      </TagInputBox>
      <InputAccessoryView nativeID={CREATE_SCREEN_NAME.POST}>
        <SubmitButton
          color={
            formState.isValid ? theme.colors.primary.main : theme.colors.grey.AA
          }
          label={formState.isValid ? "전송" : "다음"}
          onSubmit={onSubmit}
        />
      </InputAccessoryView>
    </DescriptionInnerBox>
  );
};

export default observer(Component);

const DescriptionInnerBox = styled.View`
  padding: 0px 12px 16px 12px;
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

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;
