import LoginDto from "domain/dto/LoginDto";
import classValidatorResolver from "~domain/helper/classValidator";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import Button from "~presentation/components/Atoms/Button";
import Input from "~presentation/components/Atoms/Input";
import Form from "~presentation/components/Molecules/Form";

type Props = {};

const Component: FC<Props> = () => {
  const resolver = classValidatorResolver(LoginDto);
  const form = useForm({
    resolver,
  });
  const handleSubmitHandler = () => {
    console.log("this is a form");
  };
  return (
    <Form onSubmit={handleSubmitHandler} form={form}>
      <Input name="id" />
      <Input name="password" />
      <Button label="전송하기" />
    </Form>
  );
};

export default Component;
