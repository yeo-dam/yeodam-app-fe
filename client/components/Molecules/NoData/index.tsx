import React, { FC } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <Text>No Data</Text>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
