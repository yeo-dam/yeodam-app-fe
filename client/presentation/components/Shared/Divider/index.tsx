import React, { FC } from "react";
import styled, { css } from "styled-components/native";

type Props = {
  orientation?: "Horizontal" | "Vertical";
};

const Component: FC<Props> = ({ orientation = "Horizontal" }) => {
  return <Divider orientation={orientation}></Divider>;
};

export default Component;

const Divider = styled.View<{ orientation?: string }>`
  ${({ orientation }) =>
    orientation === "Horizontal"
      ? css`
          width: 100%;
          height: 1px;
        `
      : css`
          width: 1px;
          height: 100%;
        `}

  background: #555555;
`;
