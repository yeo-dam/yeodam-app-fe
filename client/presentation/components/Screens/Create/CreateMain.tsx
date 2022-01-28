import * as React from "react";
import { TouchableOpacity } from "react-native";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../types";
import Typography from "~presentation/components/Shared/Typography";
import styled from "styled-components/native";
import { CREATE_SCREEN_NAME } from "./index";

const CreateScreen = ({ navigation }: RootTabScreenProps<"CreateMain">) => {
  return (
    <ContentLayout>
      <FeedSection>
        <TouchableOpacity
          onPress={() => navigation.navigate(CREATE_SCREEN_NAME.POST)}
        >
          <Typography>작성페이지 (앞)</Typography>
        </TouchableOpacity>
      </FeedSection>
    </ContentLayout>
  );
};
export default CreateScreen;

const BasicSection = styled.View`
  flex: 1;
`;

const FeedSection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid red;
`;
