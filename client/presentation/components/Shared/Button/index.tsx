import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  label: string;
} & TouchableOpacityProps;

const Component: FC<Props> = ({ label }) => {
  const onPress = (data: any) => console.log(data);
  return <TouchableOpacity onPress={onPress}>{label}</TouchableOpacity>;
};

export default Component;
