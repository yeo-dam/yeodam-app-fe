import * as React from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";
import { variantStyles } from "./style";
import { Variant } from "./types";

type Props = React.PropsWithChildren<
  {
    variant?: Variant;
  } & TextProps
>;

const Component = ({ children, variant = "body1", ...rest }: Props) => {
  return (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
};

const Typography = styled.Text<{ variant: Variant }>`
  font-family: "Spoqa-Han-Sans-Neo";
  ${({ variant }) => variantStyles[variant]};
`;

export default Component;
