import PostModel from "domain/model/PostModel";
import React, { FC } from "react";
import { ListRenderItem, View, Text } from "react-native";
import styled from "styled-components/native";
import Typography from "~presentation/components/Atoms/Typography";

const SamplePost: ListRenderItem<PostModel> = ({ item }) => {
  return (
    <View>
      <Typography>{item.id}</Typography>
      <SampleImage source={{ uri: item.images[0].filePath }}></SampleImage>
      <Typography>{item.title}</Typography>
      <Typography>{item.description}</Typography>
    </View>
  );
};

export default SamplePost;

const SampleImage = styled.Image`
  width: 100%;
  height: 100%;
`;
