import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import NoticeViewModel from "./Notice.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Pages/Index.vm";
import { SETTING_SCREEN_NAME } from "..";

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
