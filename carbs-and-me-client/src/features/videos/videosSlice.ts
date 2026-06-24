import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Video, VideosState } from "./videoTypes";

const initialState: VideosState = {
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,
};

export const fetchAllVideos = createAsyncThunk<Video[]>(
  "videos/fetchAllVideos",
  async () => {
    const response = await fetch("/api/videos/");

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data as Video[];
    }

    return [];
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch videos";
      });
  },
});

export default videosSlice.reducer;