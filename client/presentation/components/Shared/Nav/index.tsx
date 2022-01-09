import React, { FC } from "react";
import styled from "styled-components/native";
import Typography from "~presentation/components/Shared/Typography";
import { WithLocalSvg } from "react-native-svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <Typography>Logo</Typography>
      <InnerWrapper>
        <SearchBox>
          <Typography>검색</Typography>
          <WithLocalSvg asset={require("~asset/Icons/Navigation/Search.svg")} />
        </SearchBox>
        <NotiBox>
          <Typography>알림</Typography>
          <WithLocalSvg
            asset={require("~asset/Icons/Navigation/Notification.svg")}
          />
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
`;

const SearchBox = styled(Flex)`
  justify-content: space-between;
  border: 1px solid blue;
`;

const NotiBox = styled(Flex)`
  border: 1px solid blue;
`;
