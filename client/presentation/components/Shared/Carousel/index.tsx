/**
 * @copyright Copyright 2020 Corretto, Inc. All rights reserved.
 */

import React, { useState, useRef } from "react";
import { Dimensions, Platform } from "react-native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";

import Item from "./item";

export type Props = {
  pages: { id: string; url: string }[] | { url: string }[];
  isTextImg: boolean;
  noImage?: boolean;
};

const Atom = ({ pages, isTextImg, noImage = false }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef(null);
  const windowWidth = Dimensions.get("window").width - 30;

  const onPressHandler = (_url: string) => {
    console.log("carousel clicked", _url);
  };

  const renderItemForIos = ({ item }: any) => {
    return <Item key={item.id} onPressHandler={onPressHandler} item={item} />;
  };

  if (noImage) {
    return (
      <Container>
        <NoImageView>
          <WithLocalSvg asset={require("~asset/images/No_image.svg")} />
        </NoImageView>
      </Container>
    );
  }

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        data={pages}
        renderItem={renderItemForIos}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        autoplay
        autoplayDelay={3000}
        loop
        loopClonesPerSide={pages.length}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        onSnapToItem={(index) => setCurrentSlide(index)}
      />

      <IndicatorWrapper isTextImg={isTextImg}>
        <PageText isTextImg={isTextImg}>
          <NowText isTextImg={isTextImg}>{currentSlide + 1}</NowText> /{" "}
          {pages.length}
        </PageText>
      </IndicatorWrapper>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid red;
`;

const NoImageView = styled.View`
  border-radius: 4px;
`;

const IndicatorWrapper = styled.View<{ isTextImg: boolean }>`
  position: absolute;
  width: 48px;
  height: 22px;
  bottom: 12px;
  right: 12px;
  border-radius: 12px;
  background-color: ${({ isTextImg }) =>
    isTextImg ? "transparent" : "rgba(33, 37, 41, 0.5)"};
  justify-content: center;
  align-items: center;
`;

const PageText = styled.Text<{ isTextImg: boolean }>`
  font-size: 12px;
  font-weight: 400;
`;

const NowText = styled.Text<{ isTextImg: boolean }>`
  font-size: 12px;
  ${({ isTextImg, theme }) =>
    isTextImg
      ? `
           font-weight: 500;
         `
      : `
   font-weight: 400;
   `};
`;

export default Atom;
