import React, { useState, useRef, PropsWithChildren } from "react";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";

import Item, { CarouselItem } from "./item";
import Layout from "constants/Layout";
import FlexBox from "../FlexBox";

export type Props = {
  pages: { id: string; url: string }[] | { url: string }[];
  isTextImg: boolean;
  noImage?: boolean;
  slideWidth?: number;
  slideHeight?: number;
} & Pick<CarouselItem, "aspectRatio">;

const Component = ({
  pages,
  isTextImg,
  noImage = false,
  aspectRatio,
  slideWidth,
  slideHeight,
  children,
}: PropsWithChildren<Props>) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const {
    window: { width: windowWidth, height: windowHeight },
  } = Layout;

  const onPressHandler = (_url: string) => {
    console.log("carousel clicked", _url);
  };

  const renderItemForIos = ({ item }: any) => {
    return (
      <Item
        key={item.id}
        aspectRatio={aspectRatio}
        onPressHandler={onPressHandler}
        item={item}
      />
    );
  };

  // TODO : Carousel NoImage 나중에 볼 것.
  // if (pages.length === 0) {
  //   return (
  //     <Container>
  //       <NoImageView>
  //         <WithLocalSvg asset={require("~asset/images/No_image.svg")} />
  //       </NoImageView>
  //     </Container>
  //   );
  // }

  const renderIndicator = () => {
    return (
      <>
        {pages.map((item, idx) => {
          return (
            <CircleBox key={idx}>
              <CirCle
                style={{
                  backgroundColor: `${idx === currentSlide ? "white" : "grey"}`,
                }}
              />
            </CircleBox>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        data={pages}
        renderItem={renderItemForIos}
        sliderWidth={slideWidth ? slideWidth : windowWidth}
        sliderHeight={slideHeight ? slideHeight : windowHeight}
        itemWidth={slideWidth ? slideWidth : windowWidth}
        autoplay
        autoplayDelay={5000}
        loop
        loopClonesPerSide={pages.length}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        onSnapToItem={(index) => setCurrentSlide(index)}
      />
      <IndicatorWrapper isTextImg={isTextImg}>
        {renderIndicator()}
      </IndicatorWrapper>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;

const NoImageView = styled.View`
  border-radius: 4px;
`;

const IndicatorWrapper = styled(FlexBox)<{ isTextImg: boolean }>`
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

const CirCle = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 15px;
`;

const CircleBox = styled.View`
  margin-right: 6px;
`;
