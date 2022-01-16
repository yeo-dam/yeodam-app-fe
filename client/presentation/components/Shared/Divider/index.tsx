import React, { FC } from "react";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = () => {
  return <Divider></Divider>;
};

export default Component;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background: #555555;
`;
