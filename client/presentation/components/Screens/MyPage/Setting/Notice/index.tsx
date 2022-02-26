import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import NoData from "~presentation/components/Shared/NoData";
import Loadable from "~presentation/components/Shared/Loadable";
import NoticeViewModel from "./Notice.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";
import { View } from "react-native";
import { SETTING_SCREEN_NAME } from "constants/SCREEN_NAME";

const NoticeScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.NOTICE>) => {
  const vm = getRootViewModel<NoticeViewModel>(
    (viewModel) => viewModel.tab.Notice
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
        <Typography>마이페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(NoticeScreen);
