import * as React from "react";
import { StyleSheet } from "react-native";

import ContentLayout from "../components/Templates/ContentLayout";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <ContentLayout path="/screens/TabTwoScreen.tsx">
      <Text>Tab Two</Text>
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
