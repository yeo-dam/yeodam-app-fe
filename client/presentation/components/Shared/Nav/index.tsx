import React, { FC } from "react";
import styled from "styled-components/native";
import Typography from "~presentation/components/Shared/Typography";
import { WithLocalSvg } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <SearchBox>
          <TouchableWithoutFeedback>
            <WithLocalSvg
              asset={require("~asset/Icons/Navigation/Search.svg")}
            />
          </TouchableWithoutFeedback>
        </SearchBox>
        <NotiBox>
          <TouchableWithoutFeedback>
            <WithLocalSvg
              asset={require("~asset/Icons/Navigation/Notification.svg")}
            />
          </TouchableWithoutFeedback>
        </NotiBox>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Component;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled(Flex)`
  border: 1px solid orange;
`;

const InnerWrapper = styled.View`
  width: 90%;
  flex-direction: row;
`;

const SearchBox = styled(Flex)`
  justify-content: space-between;
  background-color: black;
`;

const NotiBox = styled(Flex)`
  background-color: black;
`;
