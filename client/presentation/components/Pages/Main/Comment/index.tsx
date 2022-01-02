import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "~presentation/components/Themed";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../../Index.vm";
import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Atoms/Typography";
import { MAIN_SCREEN_NAME } from "../index";
import { RootTabScreenProps } from "types";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
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
        <Typography>댓글상세 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
