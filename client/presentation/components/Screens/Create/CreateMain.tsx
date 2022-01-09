import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import NoData from "~presentation/components/Shared/NoData";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../Index.vm";
import CreateViewModel from "./Create.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
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
export default observer(CreateScreen);

const BasicSection = styled.View`
  flex: 1;
`;

const FeedSection = styled(BasicSection)`
  justify-content: center;
  border: 1px solid red;
`;
