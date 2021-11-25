import * as React from "react";
import { StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { GetPostsAPI } from "../../../../Api";

import ContentLayout from "~presentation/components/Templates/ContentLayout";
import { Text, View } from "../../Themed";
import { RootTabScreenProps } from "../../../../types";
import ErrorMsg from "~presentation/components/Molecules/ErrorMsg";
import NoData from "~presentation/components/Molecules/NoData";
import Loadable from "~presentation/components/Molecules/Loadable";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [isPostLoading, setIsPostsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [posts, setPosts] = useState<
    { id: number; title: string; description: string }[] | undefined
  >();

  // TODO: 아래 코드가 vm 파일로 이동해야 할 것
  const GetPosts = useCallback(async () => {
    const [isApiLoading, isApiError, data] = await GetPostsAPI();

    if (isApiLoading) {
      setIsPostsLoading(true);
    }

    if (isApiError) {
      setisError(true);
    }

    if (data) {
      setPosts(data);
    }
  }, []);

  useEffect(() => {
    GetPosts();
  }, []);

  if (isPostLoading) {
    return <Loadable />;
  }

  if (isError) {
    return <ErrorMsg />;
  }

  return (
    <ContentLayout path="/screens/TabTwoScreen.tsx">
      <Text>Tab Two</Text>
      <View>
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          ))
        ) : (
          <NoData />
        )}
      </View>
    </ContentLayout>
  );
}

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
