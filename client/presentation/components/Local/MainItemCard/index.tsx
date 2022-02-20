import React, { FC, useState } from "react";
import styled from "styled-components/native";
import PhotoCard from "~presentation/components/Local/PhotoCard";
import DescriptionCard from "~presentation/components/Local/DescriptionCard";
import PostModel from "~domain/model/PostModel";
import PhotoContainer from "~presentation/components/Local/PhotoContainer";
import { Animated } from "react-native";
import DoubleTap from "~presentation/components/Shared/DoubleTap";

type Props = {
  item: PostModel;
  navigation: any;
};

const Component: FC<Props> = ({ item, navigation }) => {
  const [isFront, setIsFront] = useState<boolean>(true);

  let animatedValue = new Animated.Value(0);

  const renderOverlay = () => {
    return (
      <OverlayBox>
        <Animated.Image
          source={require("~asset/images/heart.png")}
          style={{
            width: 100,
            height: 100,
            tintColor: "#fff",
            opacity: animatedValue,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.5],
                }),
              },
            ],
          }}
        />
      </OverlayBox>
    );
  };

  const renderCard = (postItem: PostModel, router: any) => {
    if (isFront) {
      return (
        <PhotoContainer item={item}>
          <DoubleTap
            delay={1500}
            animatedValue={animatedValue}
            setIsFront={setIsFront}
          >
            <PhotoCard item={postItem} setIsFront={setIsFront} />
            {renderOverlay()}
          </DoubleTap>
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

const OverlayBox = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
