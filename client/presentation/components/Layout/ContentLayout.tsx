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
  console.log(
    `TCL ~ [ContentLayout.tsx] ~ line ~ 20 ~ justifyContent`,
    justifyContent
  );

  return (
    <Wrapper alignItems={alignItems} {...rest}>
      <View>{children}</View>
    </Wrapper>
  );
};

export default ContentLayout;

const Wrapper = styled.View<Props>`
  flex: 1;
  /* align-items: center; */
  align-items: ${({ alignItems }) => alignItems};
  /* justify-content: flex-start; */
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
`;
