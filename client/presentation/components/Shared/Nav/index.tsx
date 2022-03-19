import React, { FC } from "react";
import styled from "styled-components/native";
import Typography from "~presentation/components/Shared/Typography";
import { WithLocalSvg } from "react-native-svg";
import TouchableIcon from "~presentation/components/Shared/TouchableIcon";
import FlexBox from "../FlexBox";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        {/* TODO : 메인화면에서 삭제 필요해보임. */}
        {/* <SearchBox>
          <TouchableIcon onPress={() => console.log("Touched")}>
            <WithLocalSvg asset={require("~asset/Icons/Search.svg")} />
          </TouchableIcon>
        </SearchBox> */}
        <NotiBox>
          <TouchableIcon onPress={() => console.log("Touched")}>
            <WithLocalSvg asset={require("~asset/Icons/Notification.svg")} />
          </TouchableIcon>
        </NotiBox>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled(FlexBox)``;

const InnerWrapper = styled.View`
  flex-direction: row;
  margin-top: 14px;
`;

const SearchBox = styled(FlexBox)`
  justify-content: space-between;
  margin-right: 16px;
`;

const NotiBox = styled(FlexBox)`
  margin-right: 24px;
`;
