import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authenticate = createAsyncThunk<User | null>(
  "auth/authenticate",
  async () => {
    const response = await fetch("/api/auth/");

    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }

    const data = await response.json();

    if (data.errors) {
      return null;
    }

    return data as User;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? "Authentication failed";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;