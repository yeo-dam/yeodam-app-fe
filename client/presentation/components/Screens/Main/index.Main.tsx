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
import Image from "~presentation/components/Shared/Image";

import { MAIN_SCREEN_NAME } from ".";
import MainItemCard from "~presentation/components/Local/MainItemCard";
import DoubleTap from "~presentation/components/Shared/DoubleTap";
import styled from "styled-components/native";

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);
  const w = Dimensions.get("window");

  // TODO : 여기서 에러가 발생하고 있는 듯..
  // useEffect(() => {
  //   async function loadPosts() {
  //     await vm.load();
  //   }
  //   loadPosts();
  //   return () => console.log("cleanup");
  // }, []);

  // if (vm.isLoading) {
  //   return <Loadable />;
  // }

  // if (vm.isError) {
  //   return <ErrorMsg />;
  // }

  // if (vm.posts && vm.posts.length === 0) {
  //   return <NoData />;
  // }
  const handleLoadMore = () => {
    console.log("더 불러옵니다.");
  };
  const handleRefresh = () => {
    console.log("이 지점에서부터 refresh 합니다.");
  };

  let animatedValue = new Animated.Value(0);

  const renderOverlay = () => {
    return (
      <OverlayBox>
        <Animated.Image
          source={require("./images/heart.png")}
          style={{
            width: 100,
            height: 100,
            tintColor: "#fff",
            opacity: animatedValue,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.5],
                }),
              },
            ],
          }}
        />
      </OverlayBox>
    );
  };

  // TODO : 해당 요소에 대한 모델이 추가되어야 할 것임.
  return (
    <ContentLayout>
      <View>
        {/* <DoubleTap delay={300} animatedValue={animatedValue}>
          <View>
            <Image
              source={{
                uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${w.width}`,
              }}
              style={{ width: w.width, height: w.width }}
              resizeMode="cover"
            />
            {renderOverlay()}
          </View>
        </DoubleTap> */}
        <FlatList<PostModel>
          data={vm.posts}
          ListHeaderComponent={
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
          // onEndReached={handleLoadMore}
          // onRefresh={handleRefresh}
        ></FlatList>
      </View>
    </ContentLayout>
  );
};

export default observer(MainScreen);

const OverlayBox = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
