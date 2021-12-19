import PostModel from "domain/model/PostModel";
import React, { FC } from "react";
import { ListRenderItem, View, Text, Image } from "react-native";

const SamplePost: ListRenderItem<PostModel> = ({ item }) => {
  return (
    <View>
      <Text>{item.id}</Text>
      {/* TODO : 이미지 관련 처리가 추후 필요할 것임 */}
      {/* <Image source={item.images[0].filePath}></Image> */}
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

export default SamplePost;
