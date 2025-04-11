import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginAPI,
  signupAPI,
  logoutAPI,
  refreshTokenAPI,
} from './authAPI';



//initial state

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: false,
    csrf: {
        access: null,
        refresh: null
    }
}


//thunk
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const data = await loginAPI(credentials);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Login failed');
      }
    }
  );
  

  export const signup = createAsyncThunk(
    'auth/signup',
    async (userInfo, { rejectWithValue }) => {
      try {
        const data = await signupAPI(userInfo);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Signup failed');
      }
    }
  );

  export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        await logoutAPI();
        return true;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Logout failed');
      }
    }
  );


  export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (csrfRefreshToken, { rejectWithValue }) => {
      try {
        const data = await refreshTokenAPI(csrfRefreshToken);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Refresh failed');
      }
    }
  );



  // slice
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      clearError(state) {
        state.error = null;
      }
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
          state.csrf = {
            access: action.payload.csrf_access_token,
            refresh: action.payload.csrf_refresh_token
          };
          state.isAuthenticated = true;
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
          state.csrf.access = action.payload.csrf_access_token;
        })

    },
  });

  export const {clearError} = authSlice.actions
  export default authSlice.reducer