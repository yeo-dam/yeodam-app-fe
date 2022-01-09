import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

export type Props = {
  name: string;
} & TextInputProps;

const Component: FC<Props> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          onChange={() => console.log("onChange")}
          value={"value"}
        />
      )}
    />
  );
};

export default Component;
