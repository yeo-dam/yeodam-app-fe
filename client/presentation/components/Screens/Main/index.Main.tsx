import * as React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useEffect } from "react";
import ContentLayout from "~presentation/components/Layout/ContentLayout";
import { RootTabScreenProps } from "../../../../types";
import NoData from "~presentation/components/Shared/NoData";
import ErrorMsg from "~presentation/components/Shared/ErrorMsg";
import Loadable from "~presentation/components/Shared/Loadable";
import { getRootViewModel } from "../Index.vm";
import MainViewModel from "./Main.vm";
import { observer } from "mobx-react";
import PostModel from "domain/model/PostModel/model";
import Carousel from "~presentation/components/Shared/Carousel";
import Image from "~presentation/components/Shared/Image";
import MainItemCard from "~presentation/components/Local/MainItemCard";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Modal from "~presentation/components/Shared/DropDownContainer";
import Fetcher from "helper/fetcher";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Nav from "~presentation/components/Shared/Nav";

const SafeAreaHeightForIos = getStatusBarHeight();

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);

  async function loadPosts(limit?: number, offset?: number) {
    await vm.load({
      limit: limit || 4,
      offset: offset || 0,
    });
  }

  // async function testFucn() {
  //   const res = await Fetcher("/");
  //   console.log(`TCL ~ [index.Main.tsx] ~ line ~ 35 ~ res`, res);
  // }

  useEffect(() => {
    // loadPosts();
    // testFucn();
    return () => console.log("cleanup");
  }, []);

  // TODO : 초기 페이지 렌더링 시, 로더블은 필요해보임.
  // if (vm.isLoading) {
  //   return <Loadable />;
  // }

  // if (vm.isError) {
  //   return <ErrorMsg />;
  // }

  const renderList = () => {
    // if (vm.posts && vm.posts.length === 0) {
    //   return <NoData />;
    // } else {
    return (
      <FlatList<PostModel>
        data={vm.posts}
        ListHeaderComponent={
          <>
            <NavSection>
              <Nav />
            </NavSection>
            {/* TODO : MainImage 및 Text 반영되도록 변경 필요 */}
            <Carousel
              aspectRatio={375 / 346}
              pages={[
                { id: "1", url: "https://picsum.photos/375/346" },
                { id: "2", url: "https://picsum.photos/375/346" },
              ]}
              isTextImg={false}
            />
          </>
        }
        renderItem={({ item }) => (
          <MainItemCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        // onRefresh={handleRefresh}
      ></FlatList>
    );
    // }
  };

  const handleLoadMore = () => {
    const limitNum = vm.pager.limit;
    const pagerNum = vm.pager.offset + vm.pager.limit;
    loadPosts(limitNum, pagerNum);
  };

  const handleRefresh = () => {
    console.log("이 지점에서부터 refresh 합니다.");
  };

  return (
    <ContentLayout>
      <View>{renderList()}</View>
    </ContentLayout>
  );
};

export default observer(MainScreen);

const NavSection = styled.View`
  position: absolute;
  top: ${SafeAreaHeightForIos + "px"};
  right: 0;
  z-index: 1;
`;
