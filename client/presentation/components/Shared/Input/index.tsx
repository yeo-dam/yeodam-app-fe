import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

export type Props = {
  name: string;
} & TextInputProps;

const Component: FC<Props> = ({ name, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <StyledTextInput {...rest} onChange={onChange} value={value} />
      )}
    />
  );
};

export default Component;

const StyledTextInput = styled.TextInput`
  width: 100px;
  height: 50px;
  color: white;
`;
