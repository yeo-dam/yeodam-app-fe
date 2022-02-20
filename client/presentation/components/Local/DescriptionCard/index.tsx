import React, { useEffect } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";
import PostModel from "~domain/model/PostModel";
import Typography from "~presentation/components/Shared/Typography";
import { FollowerNum } from "helper/Formatter/FollowerNumFormatter";
import PlaceTypeFormatter from "helper/Formatter/PlaceTypeFormatter";
import FlexBox from "~presentation/components/Shared/FlexBox";
import Divider from "~presentation/components/Shared/Divider";
import { MAIN_SCREEN_NAME } from "~presentation/components/Screens/Main";
import GeoDataToAddress from "helper/Formatter/GeoInfoFormatter";
import { Props as PhotoCardProps } from "../PhotoCard";

export type Props = {
  navigation: any;
} & PhotoCardProps;

const Component = ({ item, setIsFront, navigation }: Props) => {
  const renderComments = (userName?: string, content?: string) => {
    if (!userName || !content) {
      return "";
    }
    return `${userName} ${content.substring(0, 25)}`;
  };

  GeoDataToAddress({
    latitude: item.place.latitude,
    longitude: item.place.longitude,
  });

  return (
    <TouchableWithoutFeedback onPress={() => setIsFront(true)}>
      <PhotoFrame>
        <PhotoBox>
          <ContentBox>
            {/* <TouchableWithoutFeedback
                onPress={() => navigation.push(MAIN_SCREEN_NAME.MAP)}
              > */}
            <View>
              <WhiteTitleTypo>{item.title}</WhiteTitleTypo>
              <GreyFlexBox>
                <GreyBlackTypo>
                  {PlaceTypeFormatter(item.place.type)}
                </GreyBlackTypo>
                <Divider orientation="Vertical" />
                {/* TODO : Address Formatting 관련 서버 쪽과 이야기 해봐야 할 것 */}
                <GreyBlackTypo>{item.place.latitude}</GreyBlackTypo>
                {/* TODO : 아이콘 추가 필요 */}
                {/* <BiChevronRight color="#AAAAAA" size={12} /> */}
              </GreyFlexBox>
            </View>
            {/* </TouchableWithoutFeedback> */}
            <WhiteTypo>{item.description}</WhiteTypo>
            <TagFlexBox>
              {item.tags &&
                item.tags.map((tag, idx) => (
                  <TagTypo key={idx}>{`#${tag.title} `}</TagTypo>
                ))}
            </TagFlexBox>
          </ContentBox>
          <Divider />
          {/* TODO : 값 Counting은 서버에서 줘야 할 것 같음 */}
          <CommentBox>
            <GreyTypo>{FollowerNum()} 명</GreyTypo>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(MAIN_SCREEN_NAME.COMMENT)}
            >
              {/* FIXME : Comment 갯수를 세어 줄 것 */}
              <GreyTypo>
                {item.comments &&
                  renderComments(
                    item.comments[0].user.name,
                    item.comments[0].content
                  )}
              </GreyTypo>
            </TouchableWithoutFeedback>
          </CommentBox>
        </PhotoBox>
      </PhotoFrame>
    </TouchableWithoutFeedback>
  );
};

const PhotoFrame = styled.View`
  background-color: #fff;
  padding: 30px 16px 16px 16px;
`;

const PhotoBox = styled.View<{ isFront?: boolean }>`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 390px;
  background-color: #000;
`;

const GreyFlexBox = styled(FlexBox)`
  border: 1px solid white;
`;

const TagFlexBox = styled(FlexBox)``;

const ContentBox = styled.View`
  padding: 16px;
`;

const CommentBox = styled.View`
  padding: 16px;
`;

const TagTypo = styled(Typography)`
  color: #4cb2be;
`;

const GreyBlackTypo = styled(Typography)`
  color: #aaa;
`;

const GreyTypo = styled(Typography)`
  color: #eee;
`;

const WhiteTypo = styled(Typography)`
  color: #fff;
`;

const WhiteTitleTypo = styled(WhiteTypo)`
  font-size: 18px;
  font-weight: bold;
`;

export default Component;
