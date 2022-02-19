import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import Typography from "../Typography";

export type Props = {
  name: string;
  hidden?: boolean;
  errMsg?: string;
} & TextInputProps;

const Component: FC<Props> = ({ name, errMsg, hidden = false, ...rest }) => {
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
    <InputWrapper hidden={hidden}>
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
    </InputWrapper>
  );
};

export default Component;

const InputWrapper = styled.View<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
`;

const StyledTextInput = styled.TextInput`
  width: 100px;
  height: 50px;
`;

const ErrMsg = styled(Typography)``;
