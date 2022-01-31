import PostModel from "domain/model/PostModel";
import React from "react";
import { ListRenderItem, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Image from "~presentation/components/Shared/Image";
import Avatar from "~presentation/components/Shared/Avatar";
import { WithLocalSvg } from "react-native-svg";
import Typography from "~presentation/components/Shared/Typography";
import { dateFormatter } from "helper/Formatter/DateFormatter";
import FlexBox from "~presentation/components/Shared/FlexBox";
import Layout from "constants/Layout";

type Props = {
  item: PostModel;
  setIsFront: (data: boolean) => void;
};

const PhotoCard = ({ item, setIsFront }: Props) => {
  const { window } = Layout;

  console.log(`TCL ~ [index.tsx] ~ line ~ 20 ~ window`, window);

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
      <PhotoFrame>
        <PhotoContent>
          <TouchableWithoutFeedback onPress={() => setIsFront(false)}>
            <MainImage source={{ uri: item.images[0].filePath }} />
          </TouchableWithoutFeedback>
          <PhotoDate>
            <Typography textType="Number" textColor="#777">
              {dateFormatter(item.createdAt)}
            </Typography>
          </PhotoDate>
        </PhotoContent>
      </PhotoFrame>
    </Wrapper>
  );
};

export default PhotoCard;

// TODO : 디바이스 별 사이즈 비율에 맞춰서 간격 구성 필요함.
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

// TODO : width를 비율로 변경해야 함.
const PhotoFrame = styled.View`
  background-color: #fff;
  padding: 30px 16px 16px 16px;
`;

// TODO : width를 비율로 변경해야 함.
const PhotoContent = styled.View`
  margin: 0 auto 106px auto;
  width: 319px;
  height: 390px;
`;

const MainImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const PhotoDate = styled.View`
  margin-left: auto;
  margin-top: 73px;
`;
