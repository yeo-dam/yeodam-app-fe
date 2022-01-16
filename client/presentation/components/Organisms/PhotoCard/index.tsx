import PostModel from "domain/model/PostModel";
import React from "react";
import { ListRenderItem } from "react-native";
import styled from "styled-components/native";
import Image from "~presentation/components/Shared/Image";
import Avatar from "~presentation/components/Shared/Avatar";

const SamplePost: ListRenderItem<PostModel> = ({ item }) => {
  return (
    <Wrapper>
      <PhotoFrame>
        <Avatar />
        <PhotoBox>
          <MainImage source={{ uri: item.images[0].filePath }} />
        </PhotoBox>
      </PhotoFrame>
    </Wrapper>
  );
};

export default SamplePost;

// TODO : 디바이스 별 사이즈 비율에 맞춰서 간격 구성 필요함.
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
  width: 319px;
  height: 390px;
`;

const MainImage = styled(Image)`
  width: 100%;
  height: 390px;
`;
