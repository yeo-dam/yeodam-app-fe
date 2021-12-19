import React, { FC } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { View } from "../Themed";

type Props = {
  title: string;
};

const ContentLayout: FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <Text>{title}</Text>
      <View>{children}</View>
    </Wrapper>
  );
};

export default ContentLayout;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
