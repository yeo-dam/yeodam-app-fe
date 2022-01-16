import * as React from "react";
import { FlatList } from "react-native";
import { useEffect } from "react";
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
import PhotoCard from "~presentation/components/Organisms/PhotoCard";
import DescriptionCard from "~presentation/components/Organisms/DescriptionCard";
import Carousel from "~presentation/components/Shared/Carousel";
import { MAIN_SCREEN_NAME } from ".";

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);
  const [isFront, setIsFront] = React.useState<boolean>(false);

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

  const renderCard = isFront ? PhotoCard : DescriptionCard;

  if (vm.posts && vm.posts.length === 0) {
    return <NoData />;
  }

  return (
    <ContentLayout>
      <View>
        <FlatList<PostModel>
          data={vm.posts}
          ListHeaderComponent={
            // TODO : 해당 요소에 대한 모델이 추가되어야 할 것임.
            <Carousel
              pages={[
                { id: "1", url: "https://picsum.photos/2400/1240" },
                { id: "2", url: "https://picsum.photos/2400/1240" },
              ]}
              isTextImg={false}
            />
          }
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </ContentLayout>
  );
};

export default observer(MainScreen);
