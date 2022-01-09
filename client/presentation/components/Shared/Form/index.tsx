import { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form``;

export type Props<TValues> = {
  form: UseFormReturn<TValues>;
  onSubmit: (e: any) => void | Promise<void>;
};

function Component<TValues>({
  children,
  form,
  onSubmit,
}: PropsWithChildren<Props<TValues>>) {
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>{children}</Form>
    </FormProvider>
  );
}

export default Component;
