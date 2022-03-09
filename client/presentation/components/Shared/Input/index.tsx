import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import Typography from "../Typography";

export type Props = {
  name: string;
  hidden?: boolean;
  errMsg?: string;
  placeholderSize?: string;
} & TextInputProps;

const Component: FC<Props> = ({
  name,
  errMsg,
  hidden = false,
  placeholder,
  placeholderSize = "14px",
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);

  console.log(
    `TCL ~ [index.tsx] ~ line ~ 25 ~ placeholderSize`,
    placeholderSize
  );

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
            <StyledTextInput
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              placeholderSize={placeholderSize}
              {...rest}
            />
            {Boolean(error) && <ErrMsg>{renderErrMsg(errMsg)}</ErrMsg>}
          </>
        )}
      />
    </InputWrapper>
  );
};

export default Component;

const InputWrapper = styled.View<{ hidden: boolean }>`
  /* FIXME : Input Color가 변경되지 않고 있음. */
  color: white;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  /* border: 1px solid blue; */
`;

// FIXME : placeholderSize를 지정해줘야 함. 근데 잘 지정이 안됨.
const StyledTextInput = styled.TextInput<Props>`
  &::placeholder {
    font-size: 14px;
    /* font-size: ${({ placeholderSize }) => placeholderSize}; */
  }
`;

const ErrMsg = styled(Typography)``;
