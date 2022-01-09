import PostModel from "domain/model/PostModel";
import React from "react";
import { ListRenderItem } from "react-native";
import styled from "styled-components/native";
import Typography from "~presentation/components/Shared/Typography";

const SamplePost: ListRenderItem<PostModel> = ({ item }) => {
  return (
    <Wrapper>
      <Typography>{item.id}</Typography>
      <ImageComponent
        source={{ uri: item.images[0].filePath }}
      ></ImageComponent>
      <Typography>{item.title}</Typography>
      <Typography>{item.description}</Typography>
    </Wrapper>
  );
};

export default SamplePost;

const Wrapper = styled.View``;

const ImageComponent = styled.Image`
  width: 100%;
  height: 200;
`;
