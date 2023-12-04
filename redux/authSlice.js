import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { makeRedirectUri } from "expo-auth-session";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

//action creator export
export const { setAuth, setTokens } = authSlice.actions;

//selector export
export const selectAuth = (state) => state.auth.isAuthenticated;

//reducer export
export default authSlice.reducer;

// auth thunk
export function setCode(code) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://mixify.onrender.com/api/spotify/token",
        {
          code,
          redirectUri: "listify://",
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = data;

      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      dispatch(setAuth(true));
    } catch (e) {
      console.log(e);
    }
  };
}

//refresh token thunk
export function refreshAccessToken() {
  return async (dispatch) => {
    try {
      const oldRefreshToken = await AsyncStorage.getItem("refreshToken");

      console.log({ oldRefreshToken });
      const { data } = await axios.post(
        "https://mixify.onrender.com/api/spotify/refresh",
        {
          refreshToken: oldRefreshToken,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      await AsyncStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken)
        await AsyncStorage.setItem("refreshToken", data.refreshToken);
    } catch (e) {
      console.log(e);
    }
  };
}

// check if code exists in async storage
export function checkCode() {
  return async (dispatch) => {
    try {
      const code = await AsyncStorage.getItem("accessToken");
      if (code !== null) {
        dispatch(setAuth(true));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("code");
      dispatch(setAuth(false));
    } catch (e) {
      console.log(e);
    }
  };
}
