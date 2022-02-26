import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import SearchViewModel from "./Search.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { View } from "react-native";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.SEARCH>) => {
  const vm = getRootViewModel<SearchViewModel>(
    (viewModel) => viewModel.tab.Search
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
    <ContentLayout title="Tab Three">
      <View>
        <Typography>검색페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
