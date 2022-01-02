import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../Index.vm";
import CreateViewModel from "./Create.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import styled from "styled-components/native";
import { CREATE_SCREEN_NAME } from "./index";

const CreateScreen = ({ navigation }: RootTabScreenProps<"CreateMain">) => {
  const vm = getRootViewModel<CreateViewModel>(
    (viewModel) => viewModel.tab.Create
  );

  useEffect(() => {
    async function loadPosts() {
      await vm.load();
    }
    loadPosts();
  }, []);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  return (
    <ContentLayout title="Tab Two">
      <FeedSection>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Root", {
              screen: CREATE_SCREEN_NAME.POST,
            })
          }
        >
          <Typography>피드 만들기</Typography>
        </TouchableOpacity>
      </FeedSection>
      <StorySection>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Root", { screen: CREATE_SCREEN_NAME.STORY })
          }
        >
          <Typography>스토리 만들기</Typography>
        </TouchableOpacity>
      </StorySection>
    </ContentLayout>
  );
};
export default observer(CreateScreen);

const BasicSection = styled.View`
  flex: 1;
`;

const FeedSection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid red;
`;

const StorySection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid blue;
`;
