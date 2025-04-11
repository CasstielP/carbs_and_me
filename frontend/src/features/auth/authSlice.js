import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  signupAPI,
  logoutAPI,
  refreshTokenAPI,
  fetchUserProfileAPI,
} from "./authAPI";

//initial state

const initialState = {
  user: null,
  isAuthenticated: false,
  isRehydrating: true,
  isLoading: false,
  error: false,
  csrf: {
    access: null,
    refresh: null,
  },
};

//thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      return rejectWithValue(message);
    }
  }
);



export const rehydrateSession = createAsyncThunk(
  "auth/rehydrateSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const csrfToken = localStorage.getItem("csrf_refresh_token");

      if (!csrfToken) {
        return rejectWithValue("No CSRF token");
      }

      const refreshData = await refreshTokenAPI();

      dispatch(refreshToken.fulfilled(refreshData));

      const user = await fetchUserProfileAPI();

      return user;
    } catch (err) {
      return rejectWithValue("Session could not be restored");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await signupAPI(userInfo);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
      return true;
    } catch (err) {
      const message = err.response?.data?.error || "Logout failed";
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (csrfRefreshToken, { rejectWithValue }) => {
    try {
      const data = await refreshTokenAPI();
      return data;
    } catch (err) {
      const message = err.response?.data.error || "Refresh failed";
      return rejectWithValue(message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfileAPI();
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Fetch user profile failed";
      return rejectWithValue(message);
    }
  }
);

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        const { csrf_access_token, csrf_refresh_token } = action.payload;

        state.csrf = {
          access: csrf_access_token,
          refresh: csrf_refresh_token,
        };
        state.isAuthenticated = true;
        localStorage.setItem("csrf_access_token", csrf_access_token);
        localStorage.setItem("csrf_refresh_token", csrf_refresh_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.csrf = { access: null, refresh: null };
        state.error = null;
      })

      // Refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { csrf_access_token } = action.payload;
        state.csrf.access = csrf_access_token;

        localStorage.setItem("csrf_access_token", csrf_access_token);
      })

      //rehydrate session
      .addCase(rehydrateSession.pending, (state) => {
        state.isRehydrating = true;
        state.isLoading = true;
      })
      .addCase(rehydrateSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isRehydrating = false;
        state.isLoading = false;

      })
      .addCase(rehydrateSession.rejected, (state) => {
        state.isRehydrating = false;
        state.isLoading = false;

      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
