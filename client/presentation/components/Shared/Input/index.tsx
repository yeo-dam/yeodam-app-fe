import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import Typography from "../Typography";

export type Props = {
  name: string;
  errMsg?: string;
} & TextInputProps;

const Component: FC<Props> = ({ name, errMsg, ...rest }) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);

  const renderErrMsg = (msg?: string) => {
    // 에러메세지가 없으면, error 객체의 message를 발송해준다.
    if (!msg) {
      return error.message;
    }
    return msg;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <StyledTextInput onChangeText={onChange} value={value} />
          {Boolean(error) && <ErrMsg>{renderErrMsg(errMsg)}</ErrMsg>}
        </>
      )}
    />
  );
};

export default Component;

const StyledTextInput = styled.TextInput`
  width: 100px;
  height: 50px;
`;

const ErrMsg = styled(Typography)``;
