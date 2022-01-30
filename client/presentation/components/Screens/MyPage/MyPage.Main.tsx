import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../Index.vm";
import MyPageViewModel from "./MyPage.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { MYPAGE_SCREEN_NAME } from ".";
import TouchableIcon from "~presentation/components/Shared/TouchableIcon";
import { WithLocalSvg } from "react-native-svg";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<MyPageViewModel>(
    (viewModel) => viewModel.tab.MyPage
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
        <TouchableIcon onPress={() => navigation.navigate("Map")}>
          <WithLocalSvg asset={require("~asset/Icons/Map.svg")}></WithLocalSvg>
        </TouchableIcon>
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
