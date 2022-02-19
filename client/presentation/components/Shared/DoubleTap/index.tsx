import React, { FC, useRef, useState } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";

type Props = {
  delay: number;
  animatedValue: Animated.Value | Animated.ValueXY;
};

const Component: FC<Props> = ({ delay = 300, animatedValue, children }) => {
  const [like, setLike] = useState<boolean>(false);

  const handleToggleLike = () => {
    setLike(!like);
    // FIXME : Animation 값이 변경 안되고 있음
    if (like) {
      Animated.sequence([
        Animated.spring(animatedValue, { toValue: 1, useNativeDriver: true }),
        Animated.spring(animatedValue, { toValue: 0, useNativeDriver: true }),
      ]).start();
    }
  };

  let lastTap: any = null;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < delay) {
      handleToggleLike();
    } else {
      lastTap = now;
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View>{children}</View>
      </TouchableWithoutFeedback>
      {/* <IconWrapper>
        <TouchableOpacity onPress={handleDoubleTap}>
          <HeartImage
            source={
              like
                ? require("./images/heart.png")
                : require("./images/heart-outline.png")
            }
            resizeMode="cover"
          />
        </TouchableOpacity>
      </IconWrapper> */}
    </>
  );
};

export default Component;

const IconWrapper = styled.View``;

const HeartImage = styled.Image`
  width: 20,
  height: 20
`;
