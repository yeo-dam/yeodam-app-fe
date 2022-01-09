import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Typography from "~presentation/components/Shared/Typography";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <Typography>Carousel</Typography>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  align-items: center;
`;
