import React, { FC } from "react";
import styled from "styled-components/native";
import { InputAccessoryView, Pressable, View } from "react-native";
import Input from "~presentation/components/Shared/Input";
import theme from "themes";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { useNavigation } from "@react-navigation/native";
import FlexBox from "~presentation/components/Shared/FlexBox";
import PlaceTypeSelector from "../PlaceTypeSelector";
import Interval from "~presentation/components/Shared/Interval";
import Divider from "~presentation/components/Shared/Divider";
import Tags from "~presentation/components/Shared/Tags";
import SubmitButton from "~presentation/components/Shared/SubmitButton";
import { RootTabScreenProps } from "types";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { useFormContext } from "react-hook-form";

type NavigationType = Pick<
  RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>,
  "navigation"
>;

type Props = {
  onSubmit: (data: CreatePostDto) => void;
} & NavigationType;

const Component: FC<Props> = ({ navigation, onSubmit }: Props) => {
  const { formState } = useFormContext();

  console.log(`TCL ~ [index.tsx] ~ line ~ 30 ~ formState`, formState.isValid);

  return (
    <DescriptionInnerBox>
      <Input
        name="place.name"
        placeholder="장소이름을 입력하세요"
        color={theme.colors.background.paper}
        placeholderTextColor={theme.colors.grey[99]}
        inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
        fontSize="18px"
      />
      <FlexBox>
        <PlaceTypeSelector />
        <Interval width="4px" />
        <Divider orientation="Vertical" />
        <Interval width="4px" />
        <Pressable onPress={() => navigation.navigate("Search")}>
          <Input
            name="place.formattedAddress"
            placeholder="위치를 입력하세요"
            fontSize="12px"
            color={theme.colors.grey.AA}
            placeholderTextColor={theme.colors.grey[99]}
            inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
          />
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
          color={theme.colors.grey.AA}
          label={formState.isValid ? "전송" : "다음"}
          onSubmit={onSubmit}
        />
      </InputAccessoryView>
    </DescriptionInnerBox>
  );
};

export default Component;

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
