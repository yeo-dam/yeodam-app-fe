import { useNavigation } from "@react-navigation/native";
import Layout from "constants/Layout";
import * as React from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import GoogleLogin from "../Shared/GoogleLogin";
import Typography from "../Shared/Typography";

const SplashImagePath = "../../../assets/images/main.png";

// TODO : 성공 시, Main으로 이동. 실패 시, 다른 동작이 필요할 것.
// TODO : JWT 토큰을 받아왔다는 가정 하에, Decode하고 해당 정보를 App 내에 저장하는 것까지 해볼 것.
// TODO : 그러려면 JWT Token에 대한 형식을 기본적으로 정의하고, Decode하는 로직을 추가해야 할 것.

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

export default function SignInScreen() {
  const navigation = useNavigation();
  // const handleLoginFunc = () => {
  //   try {
  //     console.log("실행중..");
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     navigation.navigate("Root");
  //   }
  // };

  return (
    <ImageBackground
      source={require(SplashImagePath)}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight + 10 }}
    >
      <InnerWrapper>
        <TitleSection>
          <Title>로그인 화면</Title>
        </TitleSection>
        <LoginUISection>
          <GoogleLogin />
        </LoginUISection>
      </InnerWrapper>
    </ImageBackground>
  );
}

const InnerWrapper = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TitleSection = styled.View`
  position: absolute;
  top: 23%;
`;

const LoginUISection = styled.View`
  position: absolute;
  top: 77%;
`;

const Title = styled(Typography)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.background.paper}
  font-weight: bold;
`;

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
