import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

type Props = {
  onPressHandler: (url: string) => void;
  item: any;
};
const TouchableView = styled.TouchableWithoutFeedback``;

const imageW = Dimensions.get("screen").width - 30;

const PageItem = styled.View`
  width: ${imageW}px;
  height: ${imageW * 0.54}px;
`;

const ImageItem = styled.Image`
  resize-mode: contain;
`;

const Item = ({ onPressHandler, item }: Props) => {
  return (
    <TouchableView onPress={() => onPressHandler(item.url)}>
      <PageItem>
        <ImageItem
          source={{ uri: item.url }}
          style={{ aspectRatio: 375 / 195 }}
        />
      </PageItem>
    </TouchableView>
  );
};

export default Item;
