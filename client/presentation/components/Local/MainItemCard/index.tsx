import React, { FC, useState } from "react";
import styled from "styled-components/native";
import PhotoCard from "~presentation/components/Local/PhotoCard";
import DescriptionCard from "~presentation/components/Local/DescriptionCard";
import PostModel from "~domain/model/PostModel";
import PhotoContainer from "~presentation/components/Local/PhotoContainer";
import { Animated, View } from "react-native";
import DoubleTap from "~presentation/components/Shared/DoubleTap";
import MainViewModel from "~presentation/components/Screens/Main/Main.vm";
import Loadable from "~presentation/components/Shared/Loadable";

type Props = {
  vm: MainViewModel;
  item: PostModel;
  navigation: any;
};

const Component: FC<Props> = ({ vm, item, navigation }) => {
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
    if (vm.isLoading) {
      return <Loadable />;
    } else {
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
    }
  };

  return <View>{renderCard(item, navigation)}</View>;
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
