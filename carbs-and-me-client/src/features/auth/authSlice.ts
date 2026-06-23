import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, User, LoginCredentials } from "./authTypes";
import { csrfFetch } from "../../services/csrfFetch";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};


// authenticate thunk 
export const authenticate = createAsyncThunk<User | null>(
  "auth/authenticate",
  async () => {
    const response = await fetch("/api/auth/");

    if (response.status === 401 || response.status === 403) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to authenticate user: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      return null;
    }

    return data as User;
  }
);


// login thunk
export const loginUser = createAsyncThunk<User, LoginCredentials>(
  "auth/loginUser",
  async (credentials) => {
    const response = await csrfFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data?.errors?.[0] ?? `Failed to log in: ${response.status}`);
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? "Login failed";
      });
      
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;