import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../../Index.vm";
import MapViewModel from "./Map.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { MYPAGE_SCREEN_NAME } from "..";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAP>) => {
  const vm = getRootViewModel<MapViewModel>((viewModel) => viewModel.tab.Map);

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
        <Typography>지도페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
