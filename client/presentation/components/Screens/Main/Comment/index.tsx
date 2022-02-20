import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Layout/ContentLayout";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../../Index.vm";
import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~presentation/components/Shared/Typography";
import { MAIN_SCREEN_NAME } from "../index";
import { RootTabScreenProps } from "types";
import { View, Text } from "react-native";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  useEffect(() => {
    async function loadComments() {
      await vm.load({
        offset: 0,
        limit: 4,
      });
    }
    loadComments();
  }, []);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  console.log(`TCL ~ [index.tsx] ~ line ~ 40 ~ vm.comments`, vm.comments);

  return (
    <ContentLayout>
      <View>
        <Typography>댓글상세 페이지</Typography>
      </View>
      <View>
        {vm.comments.map((item) => {
          return (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.user.name}</Text>
              <Text>{item.content}</Text>
            </View>
          );
        })}
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
