import { FlattenInterpolation } from "styled-components";
import { css, ThemeProps } from "styled-components/native";

import { Variant } from "./types";

export const variantStyles: {
  [key in Variant]: FlattenInterpolation<ThemeProps<any>>;
} = {
  heading2: css`
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.025px;
  `,
  heading3: css`
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    letter-spacing: -0.5px;
  `,
  heading4: css`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
  `,
  heading5: css`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.4px;
  `,
  subtitle1: css`
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.35px;
  `,
  subtitle2: css`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.35px;
  `,
  body1: css`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 25px;
    letter-spacing: -0.37px;
  `,
  body2: css`
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: -0.35px;
  `,
  caption1: css`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  `,
  caption2: css`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  `,
  button1: css`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.4px;
  `,
};
