import React from "react";
import styled from "styled-components/native";
import { ListRenderItem } from "react-native";
import PostModel from "~domain/model/PostModel";
import Typography from "~presentation/components/Shared/Typography";
import { FollowerNum } from "helper/Formatter/FollowerNumFormatter";
import PlaceTypeFormatter from "helper/Formatter/PlaceTypeFormatter";
import FlexBox from "~presentation/components/Shared/FlexBox";
import Divider from "~presentation/components/Shared/Divider";

const Component: ListRenderItem<PostModel> = ({ item }) => {
  const renderComments = (userName?: string, content?: string) => {
    if (!userName || !content) {
      return "";
    }
    return `${userName} ${content}`;
  };

  return (
    <Wrapper>
      <PhotoFrame>
        <PhotoBox>
          <ContentBox>
            <WhiteTypo>{item.title}</WhiteTypo>
            <FlexBox>
              <GreyBlackTypo>
                {PlaceTypeFormatter(item.place.type)}
              </GreyBlackTypo>
            </FlexBox>
            <WhiteTypo>{item.description}</WhiteTypo>
            <TagBox>
              {item.tags &&
                item.tags.map((tag) => <TagTypo>{tag.title}</TagTypo>)}
            </TagBox>
          </ContentBox>
          <Divider />
          {/* TODO : 값 Counting은 서버에서 줘야 할 것 같음 */}
          <CommentBox>
            <GreyTypo>{FollowerNum()} 명</GreyTypo>
            <GreyTypo>
              {item.comments &&
                renderComments(
                  item.comments[0].user.name,
                  item.comments[0].content
                )}
            </GreyTypo>
          </CommentBox>
        </PhotoBox>
      </PhotoFrame>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  background-color: #f1f1f1;
  padding: 32px 12px 32px 12px;
`;

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

const TagBox = styled(FlexBox)``;

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

export default Component;
