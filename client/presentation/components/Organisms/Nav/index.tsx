import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Typography from "~presentation/components/Atoms/Typography";
import { WithLocalSvg } from "react-native-svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <Typography>Logo</Typography>
      <SearchBox>
        <View>
          <Typography>검색</Typography>
          <WithLocalSvg asset={require("~asset/Icons/Navigation/Search.svg")} />
        </View>
        <View>
          <Typography>알림</Typography>
          <WithLocalSvg
            asset={require("~asset/Icons/Navigation/Notification.svg")}
          />
        </View>
      </SearchBox>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SearchBox = styled.View`
  display: flex;
  flex-direction: row;
`;
