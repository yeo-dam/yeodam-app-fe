import * as React from "react";
import { StyleSheet } from "react-native";

import ContentLayout from "../components/Templates/ContentLayout";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  return (
    <ContentLayout path="/screens/TabOneScreen.tsx">
      <Text>Tab Three</Text>
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
