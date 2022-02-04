import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Button, { Props as ButtonProps } from "../Button";
import { useFormContext } from "react-hook-form";

type Props = {
  onSubmit: (data: any) => void;
} & ButtonProps;

const Component: FC<Props> = ({ label, onSubmit }) => {
  const { handleSubmit } = useFormContext();
  return <Button label={label} onPressEvent={handleSubmit(onSubmit)} />;
};

export default Component;
