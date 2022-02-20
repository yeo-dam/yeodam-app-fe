import * as React from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";
import { variantStyles } from "./style";
import { Variant } from "./types";

type TextType = "English" | "Korean" | "Number" | "Digital";
type Props = React.PropsWithChildren<
  {
    variant?: Variant;
    textType?: TextType;
    textColor?: string;
    textSize?: string;
  } & TextProps
>;

const Component = ({
  children,
  textColor,
  textType = "Korean",
  variant = "body1",
  textSize = "14px",
  ...rest
}: Props) => {
  return (
    <Typography
      variant={variant}
      textType={textType}
      textColor={textColor}
      textSize={textSize}
      {...rest}
    >
      {children}
    </Typography>
  );
};

const Typography = styled.Text<Props>`
  font-family: ${({ textType }) =>
    textType === "Korean" || textType === "Number"
      ? "Spoqa-Han-Sans-Neo"
      : "Montserrat"};
  ${({ variant }) => variantStyles[variant]};
  font-size: ${({ textSize }) => textSize};
  color: ${({ textColor }) => (textColor ? textColor : "#121212")};
`;

export default Component;
