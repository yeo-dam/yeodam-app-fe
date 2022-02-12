import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { WithLocalSvg } from "react-native-svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <DropDownBox>
      <WithLocalSvg asset={require("~asset/Icons/dropdown.svg")} />
    </DropDownBox>
  );
};

export default Component;

const DropDownBox = styled.View`
  margin-right: 12px;
`;
