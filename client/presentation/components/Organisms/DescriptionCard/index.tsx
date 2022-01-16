import React, { FC } from "react";
import styled from "styled-components/native";
import { ListRenderItem, View } from "react-native";
import PostModel from "~domain/model/PostModel";
import Typography from "~presentation/components/Shared/Typography";

type Props = {};

const Component: ListRenderItem<PostModel> = ({ item }) => {
  return (
    <Wrapper>
      <PhotoFrame>
        <PhotoBox>
          <WhiteTypo>{item.title}</WhiteTypo>
          <WhiteTypo>{item.place.type}</WhiteTypo>
          <WhiteTypo>{item.description}</WhiteTypo>
        </PhotoBox>
      </PhotoFrame>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  border: 3px solid orange;
  background-color: #f1f1f1;
  padding: 32px 12px 32px 12px;
`;

const PhotoFrame = styled.View`
  background-color: #fff;
  padding: 30px 16px 16px 16px;
`;

const PhotoBox = styled.View<{ isFront?: boolean }>`
  width: 100%;
  height: 390px;
  background-color: #000;
`;

const WhiteTypo = styled(Typography)`
  color: #fff;
`;

export default Component;
