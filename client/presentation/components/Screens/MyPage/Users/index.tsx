import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../../types";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import NoData from "~presentation/components/Shared/NoData";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import UserListViewModel from "./UserList.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { View } from "react-native";

const UserListScreen = ({ navigation }: RootTabScreenProps<"MyPageUser">) => {
  const vm = getRootViewModel<UserListViewModel>(
    (viewModel) => viewModel.tab.User
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
        <Typography>유저목록 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(UserListScreen);
