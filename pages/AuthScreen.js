import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Typography } from "../styles";
import SpotifyButton from "../components/spotifyButton/SpotifyButton";
import { StatusBar } from "expo-status-bar";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={require("../assets/images/dallelogotrans.png")}
        />
        <Text style={styles.text}>Listify</Text>
      </View>

      <View style={styles.buttonBox}>
        <SpotifyButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#060813",
  },
  text: {
    ...Typography.title,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  buttonBox: {
    flex: 2,
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default AuthScreen;
