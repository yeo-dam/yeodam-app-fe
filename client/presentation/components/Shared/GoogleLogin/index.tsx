import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, Text } from "react-native";
import styled from "styled-components/native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "853457680431-22eq2t45ga7ns93i4m9osm0hif7hh8sn.apps.googleusercontent.com",
    iosClientId:
      "853457680431-pp335gqs1pslrnqic4osgfjcam7lo1mn.apps.googleusercontent.com",
    webClientId:
      "853457680431-0hflsgm2jvcrrchbqu880kh76mvu0nkm.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <Wrapper>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Text>aaa</Text>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  border: 1px solid red;
  margin-top: 30px;
  flex: 1;
`;
