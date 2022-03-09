import React, { FC } from "react";
import styled from "styled-components/native";
import FlexBox from "~presentation/components/Shared/FlexBox";
import { WithLocalSvg } from "react-native-svg";
import Avatar from "~presentation/components/Shared/Avatar";
import PostModel from "~domain/model/PostModel";
import DropDownMenu from "~presentation/components/Shared/DropDownMenu";
import DropDownContainer from "~presentation/components/Shared/DropDownContainer";
import Flex from "~presentation/components/Shared/FlexBox";
import MarginInterval from "~presentation/components/Shared/MarginInterval";
import Typography from "~presentation/components/Shared/Typography";
import { View } from "react-native";

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
          <DropDownContainer
            content={
              <View>
                <Flex>
                  <WithLocalSvg
                    asset={require("~asset/Icons/Popup/Share.svg")}
                  />
                  <MarginInterval width="24px" />
                  <DropDownTypo>공유</DropDownTypo>
                </Flex>
                <MarginInterval height="24px" />
                <Flex>
                  <WithLocalSvg
                    asset={require("~asset/Icons/Popup/Download.svg")}
                  />
                  <MarginInterval width="24px" />
                  <DropDownTypo>이미지 저장</DropDownTypo>
                </Flex>
                <MarginInterval height="24px" />
                <Flex>
                  <WithLocalSvg
                    asset={require("~asset/Icons/Popup/Report.svg")}
                  />
                  <MarginInterval width="24px" />
                  <DropDownTypo>신고</DropDownTypo>
                </Flex>
              </View>
            }
          >
            <DropDownMenu />
          </DropDownContainer>
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

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;
