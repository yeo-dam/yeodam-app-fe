import React, { FC, useRef, useState } from "react";
import styled from "styled-components/native";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "../Input";
import theme from "themes";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import Button from "../Button";
import FlexBox from "../FlexBox";

type Props = {};

const Component: FC<Props> = () => {
  const { setValue } = useFormContext();
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState("");
  // our number of inputs, we can add the length or decrease
  const [numberInputs, setNumberInputs] = useState(0);
  // all our input fields are tracked with this array
  const refInputs = useRef<string[]>([textValue]);

  // is to set the input fields value
  const setInputValue = (index: number, value: string) => {
    // we are storing input value to refInputs array to track them
    const inputs = refInputs.current;
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    setTextValue(value);
  };

  const handleSubmit = () => {
    setValue(`tags.${numberInputs}`, textValue);
    addInput();
  };

  const handleKeyPress = (key: string) => {
    if (numberInputs !== 0 && key === "Backspace") {
      removeInput();
    }
  };

  // add a new input when the add input button is pressed
  const addInput = () => {
    // add a new element in our refInputs array
    refInputs.current.push("");
    // increase the number of inputs
    setNumberInputs((value) => value + 1);
  };

  const removeInput = () => {
    // remove from the array by index value
    refInputs.current.pop();
    // 삭제할 때, 폼에서도 제거해줘야 함
    setValue("tags", refInputs.current);
    // decrease the number of inputs
    setNumberInputs((value) => value - 1);
  };

  const renderInputs = () => {
    const inputs: JSX.Element[] = [];
    for (let idx = 0; idx < numberInputs + 1; idx++) {
      inputs.push(
        <InputBox key={idx}>
          <Input
            name={`tags.${idx}`}
            fontSize="14px"
            color={theme.colors.background.paper}
            inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key)}
            onChangeText={(value) => setInputValue(idx, value)}
            value={refInputs.current[idx]}
            onSubmitEditing={handleSubmit}
            placeholder="placeholder"
          />
        </InputBox>
      );
    }

    return inputs;
  };

  return <StyledFlexBox>{renderInputs()}</StyledFlexBox>;
};

export default Component;

const StyledFlexBox = styled(FlexBox)`
  height: 100%;
`;

const InputBox = styled(View)`
  margin-right: 4px;
`;
