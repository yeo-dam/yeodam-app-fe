import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import FlexBox from "~presentation/components/Shared/FlexBox";
import { WithLocalSvg } from "react-native-svg";
import Avatar from "~presentation/components/Shared/Avatar";
import PostModel from "~domain/model/PostModel";

type Props = {
  item: PostModel;
};

const Component: FC<Props> = ({ item, children }) => {
  return (
    <Wrapper>
      <PhotoHeader>
        <Avatar
          name={item.user.name}
          imageSource={item.user.avatar?.filePath}
        />
        <IconSection>
          <IconBox>
            <WithLocalSvg asset={require("~asset/Icons/wishlist.svg")} />
          </IconBox>
          <DropDownBox>
            <WithLocalSvg asset={require("~asset/Icons/dropdown.svg")} />
          </DropDownBox>
        </IconSection>
      </PhotoHeader>
      {children}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  background-color: #f1f1f1;
  padding: 32px 12px 32px 12px;
`;

const PhotoHeader = styled(FlexBox)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

const IconSection = styled(FlexBox)``;

const IconBox = styled.View`
  margin-right: 14px;
`;

const DropDownBox = styled.View`
  margin-right: 12px;
`;
