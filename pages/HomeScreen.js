import React, { useEffect } from "react";
import TextTicker from "react-native-text-ticker";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Colors } from "../styles";
import ImageButton from "../components/ImageButton";
import { logout, refreshAccessToken } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylists,
  selectPlaylists,
  fetchNextPlaylists,
} from "../redux/playlistSlice";
import LinearGradient from "react-native-linear-gradient";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { items, loading, error, limit, next, previous, total, offset } =
    useSelector(selectPlaylists);

  console.log({
    //items,
    loading,
    error,
    limit,
    next,
    previous,
    total,
    offset,
  });

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  //image, name, playlists

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View
          style={{
            width: "100%",
            maxWidth: 500,
            height: "95%",
            ...Colors.lowTone,
            opacity: 0.9,
            borderRadius: 20,
            padding: 10,
            elevation: 10,
          }}
        >
          <View>
            <View
              style={{
                width: "65%",
                backgroundColor: Colors.midColor,
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratAlternates_500Medium",
                  fontSize: 15,
                  color: Colors.highText,
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Top artists
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "65%",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderRadius: 25,
                  backgroundColor: "red",
                  width: "auto",
                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratAlternates_500Medium",
                    fontSize: 14,
                    color: Colors.highText,
                  }}
                >
                  Followers: 10
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderRadius: 25,
                  backgroundColor: Colors.midColor,
                  width: "auto",
                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratAlternates_500Medium",
                    fontSize: 14,
                    color: Colors.highText,
                  }}
                >
                  Playlists: 187
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.PlaylistContainer}>
        <Text style={styles.text}>Your Playlists</Text>
        <LinearGradient
          colors={[Colors.backgroundColor, "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 55,
            height: 8,
            zIndex: 1,
          }}
        />
        <FlatList
          onEndReached={() => {
            if (next) {
              dispatch(fetchNextPlaylists(next));
            }
          }}
          onEndReachedThreshold={0.75}
          numColumns={3}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  margin: 6,
                  marginBottom: 30,
                }}
              >
                <Pressable>
                  <Image
                    source={
                      { uri: item.images[0].url } ||
                      require("../assets/images/logogpt.png")
                    }
                    style={{
                      width: Dimensions.get("window").width * 0.28,
                      height: Dimensions.get("window").width * 0.28,
                      // marginRight: 10,
                    }}
                  />

                  <TextTicker
                    style={{
                      color: Colors.highText,
                      fontSize: 15,
                      fontWeight: "bold",
                      letterSpacing: 1.1,
                      width: Dimensions.get("window").width * 0.25,
                      marginTop: 5,
                    }}
                    duration={300 * (item.name.length / 2)}
                    loop
                    bounce={false}
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    shouldAnimateTreshold={5}
                  >
                    {item.name}
                  </TextTicker>
                </Pressable>
              </View>
            );
          }}
        />
        <LinearGradient
          colors={["transparent", Colors.backgroundColor]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 15,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ImageButton
          action={() => {
            dispatch(refreshAccessToken());
            //dispatch(logout());
            //getClientId();
          }}
          longAction={() => {
            dispatch(logout());
          }}
          imageKey="logo1"
          text="Create new Playlist"
          full={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Colors.background,
  },
  text: {
    color: Colors.highText,
    fontSize: 20,
    fontWeight: "light",
    letterSpacing: 1.1,
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "MontserratAlternates_500Medium",
    marginBottom: 10,
    marginTop: 20,
  },
  PlaylistContainer: {
    height: Dimensions.get("window").height * 0.7,
    alignItems: "center",

    justifyContent: "center",
    ...Colors.background,

    width: "100%",
  },
  buttonContainer: {
    height: Dimensions.get("window").height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    ...Colors.background,
    width: "95%",
    maxWidth: 500,
  },
  headContainer: {
    height: Dimensions.get("window").height * 0.2,
    width: "95%",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
