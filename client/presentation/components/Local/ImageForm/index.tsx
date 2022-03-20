import React, { FC } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";
import CreatePostViewModel from "~presentation/components/Screens/Create/Post/CreatePost.vm";
import { RootTabScreenProps } from "types";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { WithLocalSvg } from "react-native-svg";
import Interval from "~presentation/components/Shared/Interval";
import Image from "~presentation/components/Shared/Image";
import Typography from "~presentation/components/Shared/Typography";
import { observer } from "mobx-react";

type Props = {
  vm: CreatePostViewModel;
} & Pick<RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>, "navigation">;

const Component: FC<Props> = ({ vm, navigation }) => {
  console.log(
    `TCL ~ [index.tsx] ~ line ~ 19 ~ vm.uploadedImages`,
    vm.uploadedImages
  );

  const renderForm = () => {
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
      return (
        // 여러개 이미지 올렸을 때, 확인 가능하도록 변경해줘야 함
        <Image
          source={{ uri: vm.uploadedImages[0].url }}
          width={319}
          height={390}
        />
      );
    }
  };
  return <View>{renderForm()}</View>;
};

export default observer(Component);

const ImageUploadWrapper = styled.View``;

const ImageUploadSection = styled(View)`
  justify-content: center;
  align-items: center;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;
