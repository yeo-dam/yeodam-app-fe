import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Image from "~presentation/components/Shared/Image";
import Typography from "../Typography";

type Props = {};

// TODO : User Profile 로 변경해줘야 함.
const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <StyledImage source={require("~asset/images/avatar.png")} />
      <Typography>user name</Typography>
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
