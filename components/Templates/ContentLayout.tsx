import * as WebBrowser from "expo-web-browser";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import Colors from "../../constants/Colors";
import { MonoText } from "../Atoms/StyledText";
import { Text, View } from "../Themed";

type Props = {
  path: string;
};

const ContentLayout: FC<Props> = ({ path, children }) => {
  return (
    <Wrapper>
      <View>{children}</View>
    </Wrapper>
  );
};

export default ContentLayout;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
