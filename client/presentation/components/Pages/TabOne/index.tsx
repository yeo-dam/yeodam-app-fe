import * as React from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { Text, View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import NoData from "~presentation/components/Molecules/NoData";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../Index.vm";
import TabOneViewModel from "./TabOne.vm";
import { observer, Observer } from "mobx-react";
import PostModel from "domain/model/PostModel/model";
import SamplePost from "~presentation/components/Organisms/SamplePost";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const vm = getRootViewModel<TabOneViewModel>(
    (viewModel) => viewModel.tab.tabOne
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
    <ContentLayout title="Tab One">
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
