import { useEffect } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Colors } from "../../styles";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useDispatch } from "react-redux";
import { setCode } from "../../redux/authSlice";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

//Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const SpotifyButton = () => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://mixify.onrender.com/api/spotify/credentials"
        );
        const { clientId, clientSecret } = data;
        setClientId(clientId);
        setClientSecret(clientSecret);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      dispatch(setCode(code));
    }
  }, [response]);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret,
      scopes: [
        "user-read-email",
        "playlist-read-private",
        "playlist-modify-private",
        "playlist-modify-public",
        "user-library-read",
        "user-follow-read",
        "user-top-read",
        "user-read-recently-played",
      ],
      usePKCE: false, // This is false if you are using @react-native-community/masked-view
      redirectUri: makeRedirectUri({
        native: "listify://",
      }),
    },
    discovery
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? "rgba(255, 255, 255, 0.2)"
              : Colors.spotifyColor,
          },
          styles.buttonContent,
        ]}
        android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }} // Changed alpha value to 0.3
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          if (clientId && clientSecret) {
            promptAsync();
          }
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/spotify-logo-7839B39C1B-seeklogo.com.png")}
        />
        <Text style={styles.text}>Login to Spotify to start</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.whiteText,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  container: {
    alignItems: "center",
    marginTop: 20,
    overflow: "hidden", // Ensures the ripple effect is contained within the border radius
    borderRadius: 50,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.spotifyColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "auto",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
});

export default SpotifyButton;
