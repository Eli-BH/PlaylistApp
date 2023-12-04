import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Colors } from "../styles";
import * as Haptics from "expo-haptics";

import LinearGradient from "react-native-linear-gradient";

const ImageButton = ({ imageKey, text, action, full, longAction }) => {
  const windowWidth = Dimensions.get("window").width;

  const logo1 = require("../assets/images/silllogo.png");

  const images = {
    logo1: logo1,
  };

  return (
    <LinearGradient
      colors={["#1e238a", "#3b5998", "#1488cc"]}
      style={{
        borderRadius: 50,
        overflow: "hidden",
        width: full ? "100%" : "auto",
      }}
    >
      <Pressable
        style={styles.buttonContent}
        android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }} // Changed alpha value to 0.3
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          action();
        }}
        onLongPress={
          longAction
            ? () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                longAction();
              }
            : null
        }
      >
        <Image style={styles.logo} source={images[imageKey]} />
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    overflow: "hidden", // Ensures the ripple effect is contained within the border radius
    borderRadius: 50,
  },
  text: {
    color: Colors.highText,
    fontSize: 20,
    fontWeight: "semibold",
    letterSpacing: 1.1,
    fontFamily: "MontserratAlternates_500Medium",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 50,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    width: "100%",
  },
});

export default ImageButton;

// <View style={styles.container}>
// <Pressable
//   style={({ pressed }) => [
//     {
//       backgroundColor: pressed
//         ? "rgba(255, 255, 255, 0.2)"
//         : Colors.midColor,
//     },
//     styles.buttonContent,
//   ]}
//   android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }} // Changed alpha value to 0.3
//   onPress={() => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     action();
//   }}
//   onLongPress={
//     longAction
//       ? () => {
//           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//           longAction();
//         }
//       : null
//   }
// >
//   <Image style={styles.logo} source={images[imageKey]} />
//   <Text style={styles.text}>{text}</Text>
// </Pressable>

// </View>
