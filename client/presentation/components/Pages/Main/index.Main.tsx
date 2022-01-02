import * as React from "react";
import { FlatList } from "react-native";
import { useEffect } from "react";
import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import NoData from "~presentation/components/Molecules/NoData";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../Index.vm";
import MainViewModel from "./Main.vm";
import { observer } from "mobx-react";
import PostModel from "domain/model/PostModel/model";
import SamplePost from "~presentation/components/Organisms/SamplePost";
import Nav from "~presentation/components/Organisms/Nav";
import Carousel from "~presentation/components/Organisms/Carousel";
import { MAIN_SCREEN_NAME } from ".";

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);

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
    <ContentLayout>
      <View>
        <Nav />
        <Carousel />
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

export default observer(MainScreen);
