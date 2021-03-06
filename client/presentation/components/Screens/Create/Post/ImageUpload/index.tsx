import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import FormLayout from "~presentation/components/Layout/FormLayout";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";
import CreatePostViewModel from "../CreatePost.vm";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import ImageBrowser from "~presentation/components/Shared/ImageBrowser";
import { Asset } from "expo-media-library";
// import ImageBrowser from "expo-image-picker-multiple";

const Component = ({ navigation }: RootTabScreenProps<"ImageUpload">) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const _getHeaderLoader = () => {
    return <ActivityIndicator size="small" color={"#0580FF"} />;
  };

  const ImagesCallback = (callback: any) => {
    navigation.setOptions({
      headerRight: () => _getHeaderLoader(),
    });

    callback
      .then(async (photos: Asset[]) => {
        for (let photo of photos) {
          let localUri = photo.uri;
          let filename = photo.filename;
          let match = localUri.match(/&ext=(\w+)$/);
          let type = match ? `image/${match[1]}` : `image`;

          const formdata: FormData = new FormData();
          const imageObj: any = {
            name: filename,
            uri: localUri,
            type,
          };

          formdata.append("images", imageObj);

          await vm.uploadImages({
            body: formdata,
          });
        }

        navigation.navigate(CREATE_SCREEN_NAME.POST);
      })
      .catch((e: any) => console.log(e));
  };

  const _renderDoneButton = (count: any, onSubmit: any) => {
    if (!count) return null;
    return (
      <TouchableOpacity onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count: number, onSubmit: any) => {
    navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  return (
    <FormLayout>
      <View>
        {/* <ImageBrowser
          max={2}
          onChange={updateHandler}
          callback={ImagesCallback}
        /> */}
        <ImageBrowser
          max={2}
          onChange={updateHandler}
          callback={ImagesCallback}
        />
      </View>
    </FormLayout>
  );
};

export default observer(Component);

const Wrapper = styled.View<{ isFront?: boolean }>`
  margin: 0 auto;
  background-color: ${({ isFront }) => (isFront ? "#fff" : "#121212")};
  width: 351px;
  height: 526px;
`;

const ImageUploadSection = styled(View)`
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

const NoImageComponent = styled(Image)``;

const InnerWrapper = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;
