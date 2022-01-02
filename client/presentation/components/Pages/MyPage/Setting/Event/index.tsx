import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import Loadable from "~presentation/components/Molecules/Loadable";
import EventViewModel from "./Event.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { SETTING_SCREEN_NAME } from "..";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Pages/Index.vm";

const EventScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.EVENT>) => {
  const vm = getRootViewModel<EventViewModel>(
    (viewModel) => viewModel.tab.Event
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
        <Typography>이벤트 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(EventScreen);
