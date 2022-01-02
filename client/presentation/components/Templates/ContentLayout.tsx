import React, { FC } from "react";
import styled from "styled-components/native";

import { View } from "../Themed";

type Props = {
  title?: string;
};

const ContentLayout: FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
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
