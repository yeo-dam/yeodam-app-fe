import * as React from "react";
import { Animated, Dimensions, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import NoData from "~presentation/components/Shared/NoData";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../Index.vm";
import MainViewModel from "./Main.vm";
import { observer } from "mobx-react";
import PostModel from "domain/model/PostModel/model";
import Carousel from "~presentation/components/Shared/Carousel";

import { MAIN_SCREEN_NAME } from ".";
import MainItemCard from "~presentation/components/Local/MainItemCard";

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);
  const w = Dimensions.get("window");

  async function loadPosts(limit?: number, offset?: number) {
    await vm.load({
      limit: limit || 4,
      offset: offset || 0,
    });
  }

  useEffect(() => {
    loadPosts();
    return () => console.log("cleanup");
  }, []);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  if (vm.posts && vm.posts.length === 0) {
    return <NoData />;
  }

  const handleLoadMore = () => {
    const pagerNum = vm.pager.offset + vm.pager.limit;
    const limitNum = vm.pager.limit;
    loadPosts(limitNum, pagerNum);
  };

  const handleRefresh = () => {
    console.log("이 지점에서부터 refresh 합니다.");
  };

  return (
    <ContentLayout>
      <View>
        <FlatList<PostModel>
          data={vm.posts}
          ListHeaderComponent={
            // FIXME : 샘플 이미지에서 새로운 이미지로 변경 필요함
            <Carousel
              pages={[
                { id: "1", url: "https://picsum.photos/2400/1240" },
                { id: "2", url: "https://picsum.photos/2400/1240" },
              ]}
              isTextImg={false}
            />
          }
          renderItem={({ item }) => (
            <MainItemCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          // onRefresh={handleRefresh}
        ></FlatList>
      </View>
    </ContentLayout>
  );
};

export default observer(MainScreen);
