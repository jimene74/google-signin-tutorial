//web 1043378659060-qjnf8p93q2ohgvo2leflg996ktn38om1.apps.googleusercontent.com
//ios 1043378659060-ss2eeso5e296hj87jrkeantkv7tm69cl.apps.googleusercontent.com
//android 1043378659060-lghlp4mbdm5qf2g061tkvqtm12qu28vh.apps.googleusercontent.com

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

WebBroswer.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1043378659060-lghlp4mbdm5qf2g061tkvqtm12qu28vh.apps.googleusercontent.com",
    iosClientId:
      "1043378659060-ss2eeso5e296hj87jrkeantkv7tm69cl.apps.googleusercontent.com",
    webClientId:
      "1043378659060-qjnf8p93q2ohgvo2leflg996ktn38om1.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo, null ,2)}</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="sign in w google" onPress={() => promptAsync()}></Button>
      <Button title="delete local storage" onPress={() => AsyncStorage.removeItem("@user")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
