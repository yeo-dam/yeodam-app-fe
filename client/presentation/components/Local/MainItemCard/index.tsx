import React, { FC, useState } from "react";
import styled from "styled-components/native";
import PhotoCard from "~presentation/components/Local/PhotoCard";
import DescriptionCard from "~presentation/components/Local/DescriptionCard";
import PostModel from "~domain/model/PostModel";
import PhotoContainer from "~presentation/components/Local/PhotoContainer";

type Props = {
  item: PostModel;
  navigation: any;
};

const Component: FC<Props> = ({ item, navigation }) => {
  const [isFront, setIsFront] = useState<boolean>(true);

  const renderCard = (postItem: PostModel, router: any) => {
    if (isFront) {
      return (
        <PhotoContainer item={item}>
          <PhotoCard item={postItem} setIsFront={setIsFront} />
        </PhotoContainer>
      );
    } else {
      return (
        <PhotoContainer item={item}>
          <DescriptionCard
            item={postItem}
            navigation={router}
            setIsFront={setIsFront}
          />
        </PhotoContainer>
      );
    }
  };

  return <>{renderCard(item, navigation)}</>;
};

export default Component;

const StyledText = styled.Text`
  width: 100%;
`;
