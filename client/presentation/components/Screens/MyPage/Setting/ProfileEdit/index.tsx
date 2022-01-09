import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import ProfileEditViewModel from "./ProfileEdit.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Screens/Index.vm";
import { SETTING_SCREEN_NAME } from "..";

const ProfileEditScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.PROFILE_EDIT>) => {
  const vm = getRootViewModel<ProfileEditViewModel>(
    (viewModel) => viewModel.tab.ProfileEdit
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

export default observer(ProfileEditScreen);