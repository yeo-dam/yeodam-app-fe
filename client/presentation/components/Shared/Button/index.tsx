import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

export type Props = {
  label: string;
  onPressEvent?: () => void;
} & TouchableOpacityProps;

const Component: FC<Props> = ({ label, onPressEvent }) => {
  return (
    <TouchableOpacity onPress={onPressEvent}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Component;
