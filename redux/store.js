import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import playlistReducer from "./playlistSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    playlists: playlistReducer,
  },
});
