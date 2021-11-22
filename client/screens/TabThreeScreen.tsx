import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";

import ContentLayout from "../components/Templates/ContentLayout";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { GetPostsAPI } from "../Api";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const [isPostLoading, setIsPostsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [posts, setPosts] = useState<
    { id: number; title: string; description: string }[] | undefined
  >();

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

  return (
    <ContentLayout path="/screens/TabOneScreen.tsx">
      <Text>Tab Three</Text>
      <View>
        {isPostLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          posts &&
          posts.length > 0 &&
          posts.map((item) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          ))
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
