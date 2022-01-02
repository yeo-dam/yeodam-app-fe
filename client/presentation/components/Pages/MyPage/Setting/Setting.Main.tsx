import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../../Index.vm";
import SettingViewModel from "./Setting.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { SETTING_SCREEN_NAME } from ".";

const SettingScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<SettingViewModel>(
    (viewModel) => viewModel.tab.Setting
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
        <Typography>설정 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(SettingScreen);
