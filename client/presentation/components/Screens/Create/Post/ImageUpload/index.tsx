import * as React from "react";
import Image from "~presentation/components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";
import FormLayout from "~presentation/components/Layout/FormLayout";
import * as ImageManipulator from "expo-image-manipulator";

const Component = ({ navigation }: RootTabScreenProps<"ImageUpload">) => {
  const _getHeaderLoader = () => {
    return <ActivityIndicator size="small" color={"#0580FF"} />;
  };

  const _processImageAsync = (uri: string) => {
    return ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
  };

  const ImagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: () => _getHeaderLoader(),
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        console.log(`TCL ~ [index.tsx] ~ line ~ 41 ~ cPhotos`, cPhotos);
        navigation.navigate("CreatePost", { photos: cPhotos });
      })
      .catch((e) => console.log(e));
  };

  const _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  return (
    <FormLayout>
      <View>
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
