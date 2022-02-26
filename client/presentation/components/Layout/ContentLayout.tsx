import React, { FC } from "react";
import styled from "styled-components/native";

import { View } from "../Themed";

type Props = {
  title?: string;
  justifyContent?: "flex-start" | "flex-end" | "center";
  alignItems?: "flex-start" | "flex-end" | "center";
  hasHeader?: boolean;
};

const ContentLayout: FC<Props> = ({
  title,
  alignItems = "center",
  justifyContent = "center",
  children,
  ...rest
}) => {
  return (
    <Wrapper alignItems={alignItems} justifyContent={justifyContent} {...rest}>
      <View>{children}</View>
    </Wrapper>
  );
};

export default ContentLayout;

const Wrapper = styled.View<Props>`
  flex: 1;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
