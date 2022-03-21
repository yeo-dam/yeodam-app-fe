declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "*.png";
declare module "expo-image-picker-multiple";
declare module "react-native-svg" {
  export function WithLocalSvg(props: { asset: any });
}
