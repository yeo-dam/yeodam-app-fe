import React, { FC, useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";

type Props = {
  delay: number;
  setIsFront: (data: boolean) => void;
  animatedValue: Animated.Value | Animated.ValueXY;
};

const Component: FC<Props> = ({
  delay = 1000,
  setIsFront,
  animatedValue,
  children,
}) => {
  const [like, setLike] = useState<boolean>(false);
  const renderedTime = Date.now();
  console.log(`TCL ~ [index.tsx] ~ line ~ 19 ~ like`, like);
  const handleToggleLike = () => {
    Animated.sequence([
      Animated.spring(animatedValue, { toValue: 1, useNativeDriver: true }),
      Animated.spring(animatedValue, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  let lastTapTime: any = null;

  const handleDoubleTap = () => {
    const tappedTime = Date.now();
    console.log(`TCL ~ [index.tsx] ~ line ~ 36 ~ delay`, delay);
    if (lastTapTime && tappedTime - lastTapTime < delay) {
      console.log(
        `TCL ~ [index.tsx] ~ line ~ 33 ~ tappedTime - lastTapTime`,
        tappedTime - lastTapTime
      );
      handleToggleLike();
    } else {
      lastTapTime = Date.now();
      console.log(`TCL ~ [index.tsx] ~ line ~ 36 ~ tappedTime`, tappedTime);
      console.log(`TCL ~ [index.tsx] ~ line ~ 36 ~ lastTapTime`, lastTapTime);
      if (tappedTime - renderedTime > delay) {
        console.log(
          `TCL ~ [index.tsx] ~ line ~ 43 ~ tappedTime - renderedTime`,
          tappedTime - renderedTime
        );
        setIsFront(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default Component;

const IconWrapper = styled.View``;

const HeartImage = styled.Image`
  width: 20,
  height: 20
`;
