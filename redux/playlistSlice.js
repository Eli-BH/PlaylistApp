import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import { refreshAccessToken } from "./authSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
  limit: 20,
  next: null,
  previous: null,
  offset: 0,
  total: 0,
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.items = [...action.payload.items];
      state.loading = false;
      state.error = null;
      state.limit = action.payload.limit;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.offset = action.payload.offset;
      state.total = action.payload.total;
    },
    setPlaylistNext: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.loading = false;
      state.error = null;
      state.limit = action.payload.limit;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.offset = action.payload.offset;
      state.total = action.payload.total;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.playlists = [];
      state.error = action.payload;
    },
    resetPlaylists: (state) => {
      state.playlists = [];
      state.loading = false;
      state.error = null;
    },
  },
});

//action creator export
export const {
  setPlaylists,
  setLoading,
  setError,
  resetPlaylists,
  setPlaylistNext,
} = playlistSlice.actions;

//selector export
export const selectPlaylists = (state) => state.playlists;

//reducer export
export default playlistSlice.reducer;

// playlist thunk
export function fetchPlaylists() {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const token = await AsyncStorage.getItem("accessToken");
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/playlists?limit=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.error?.status === 401) {
        //refresh token

        dispatch(refreshAccessToken());
        fetchPlaylists();
      }

      dispatch(setPlaylists(data));
      //dispatch(setPlaylists(data.items));
    } catch (e) {
      console.log(e);

      return dispatch(setError("error"));
    }
  };
}

export function fetchNextPlaylists(next) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const token = await AsyncStorage.getItem("accessToken");
      const { data } = await axios.get(next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.error?.status === 401) {
        //refresh token

        dispatch(refreshAccessToken());
        fetchPlaylists();
      }

      //console.log({ data });
      dispatch(setPlaylistNext(data));
      //dispatch(setPlaylists(data.items));
    } catch (e) {
      console.log(e);

      // return dispatch(setError("error"));
    }
  };
}
