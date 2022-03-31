import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import FlexBox from "~presentation/components/Shared/FlexBox";
import Typography from "../Typography";
import { WithLocalSvg } from "react-native-svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <View>
      <FlexBox>
        <WithLocalSvg
          asset={require("~asset/Icons/Popup/Share.svg")}
        ></WithLocalSvg>
        <Typography>공유</Typography>
      </FlexBox>
      <FlexBox>
        <WithLocalSvg
          asset={require("~asset/Icons/Popup/Download.svg")}
        ></WithLocalSvg>
        <Typography>이미지 저장</Typography>
      </FlexBox>
      <FlexBox>
        <WithLocalSvg
          asset={require("~asset/Icons/Popup/Report.svg")}
        ></WithLocalSvg>
        <Typography>신고</Typography>
      </FlexBox>
    </View>
  );
};

export default Component;
