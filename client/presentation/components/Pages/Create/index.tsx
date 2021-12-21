import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useEffect } from "react";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";
import { getRootViewModel } from "../Index.vm";
import CreateViewModel from "./Create.vm";
import { observer } from "mobx-react";
import PostModel from "domain/model/PostModel";
import SamplePost from "~presentation/components/Organisms/SamplePost";
import Typography from "~presentation/components/Atoms/Typography";

const CreateScreen = ({ navigation }: RootTabScreenProps<"Create">) => {
  const vm = getRootViewModel<CreateViewModel>(
    (viewModel) => viewModel.tab.Create
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
    <ContentLayout title="Tab Two">
      <Typography>생성화면</Typography>
    </ContentLayout>
  );
};

export default observer(CreateScreen);

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
