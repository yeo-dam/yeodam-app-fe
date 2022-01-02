import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import Loadable from "~presentation/components/Molecules/Loadable";
import ProfileEditViewModel from "./ProfileEdit.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "~presentation/components/Pages/Index.vm";
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
