import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import PolicyViewModel from "./Policy.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { SETTING_SCREEN_NAME } from "..";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";

const PolicyScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.POLICY>) => {
  const vm = getRootViewModel<PolicyViewModel>(
    (viewModel) => viewModel.tab.Policy
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
        <Typography>공지사항 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(PolicyScreen);
