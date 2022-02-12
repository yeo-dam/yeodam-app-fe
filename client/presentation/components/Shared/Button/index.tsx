import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import styled from "styled-components/native";

export type Props = {
  label: string;
  onPress?: () => void;
} & TouchableOpacityProps;

const Component: FC<Props> = ({ label, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <Text>{label}</Text>
    </StyledButton>
  );
};

export default Component;

const StyledButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #4cb2be;
`;
