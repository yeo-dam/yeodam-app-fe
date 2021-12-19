import * as React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { Text, View } from "~presentation/components/Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../Index.vm";
import TabThreeViewModel from "./TabThree.vm";
import { observer } from "mobx-react";
import PostModel from "domain/model/PostModel";
import SamplePost from "~presentation/components/Organisms/SamplePost";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabThree">) => {
  const vm = getRootViewModel<TabThreeViewModel>(
    (viewModel) => viewModel.tab.tabThree
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
        {vm.posts && vm.posts.length > 0 ? (
          <FlatList<PostModel>
            data={vm.posts}
            renderItem={SamplePost}
            keyExtractor={(item) => item.id}
          ></FlatList>
        ) : (
          <NoData />
        )}
      </View>
    </ContentLayout>
  );
};

export default observer(TabOneScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
