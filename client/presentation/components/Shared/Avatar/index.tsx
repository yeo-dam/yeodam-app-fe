import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Image from "~presentation/components/Shared/Image";
import Typography from "../Typography";

type Props = {
  name?: string;
  imageSource?: string;
};

const Component: FC<Props> = ({ name, imageSource }) => {
  console.log(`TCL ~ [index.tsx] ~ line ~ 14 ~ imageSource`, imageSource);

  return (
    <Wrapper>
      <StyledImage source={{ uri: imageSource }} />
      <Typography>{name}</Typography>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  flex-direction: row;
`;

const StyledImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
