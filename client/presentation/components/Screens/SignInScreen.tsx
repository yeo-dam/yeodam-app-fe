import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GoogleLogin from "../Shared/GoogleLogin";

// TODO : 성공 시, Main으로 이동. 실패 시, 다른 동작이 필요할 것.
// TODO : JWT 토큰을 받아왔다는 가정 하에, Decode하고 해당 정보를 App 내에 저장하는 것까지 해볼 것.
// TODO : 그러려면 JWT Token에 대한 형식을 기본적으로 정의하고, Decode하는 로직을 추가해야 할 것.

export default function SignInScreen() {
  const navigation = useNavigation();

  const handleLoginFunc = () => {
    try {
      console.log("실행중..");
    } catch (error) {
      throw error;
    } finally {
      navigation.navigate("Root");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <GoogleLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
