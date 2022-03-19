import React, { useState, useRef, PropsWithChildren } from "react";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import Nav from "~presentation/components/Shared/Nav";

import Item from "./item";
import Layout from "constants/Layout";

export type Props = {
  pages: { id: string; url: string }[] | { url: string }[];
  isTextImg: boolean;
  noImage?: boolean;
};

const Atom = ({
  pages,
  isTextImg,
  noImage = false,
  children,
}: PropsWithChildren<Props>) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef(null);
  const { window } = Layout;
  const windowWidth = window.width;
  const windowHeight = window.height;

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
      <NavSection>
        <Nav />
      </NavSection>
      <Carousel
        ref={carouselRef}
        data={pages}
        renderItem={renderItemForIos}
        sliderWidth={windowWidth}
        sliderHeight={windowHeight}
        itemWidth={windowWidth}
        autoplay
        autoplayDelay={4000}
        loop
        loopClonesPerSide={pages.length}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        onSnapToItem={(index) => setCurrentSlide(index)}
      />

      <IndicatorWrapper isTextImg={isTextImg}>
        <PageText isTextImg={isTextImg}>
          <NowText isTextImg={isTextImg}>{currentSlide + 1}</NowText> /
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
`;

const NoImageView = styled.View`
  border-radius: 4px;
`;

const NavSection = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

const IndicatorWrapper = styled.View<{ isTextImg: boolean }>`
  position: absolute;
  width: 48px;
  height: 22px;
  bottom: 12px;
  left: 12px;
  border-radius: 12px;
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
