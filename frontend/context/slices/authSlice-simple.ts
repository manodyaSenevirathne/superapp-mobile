/**
 * Government SuperApp - Authentication State Management
 * 
 * This slice manages user authentication:
 * - Login/logout state
 * - JWT tokens for API access
 * - Authentication persistence across app restarts
 * 
 * Simplified with dummy authentication for demonstration
 */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

/**
 * Authentication state structure
 */
interface AuthState {
  // JWT tokens
  accessToken: string | null;
  refreshToken: string | null;
  
  // Authentication status
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User information from token
  userInfo: {
    username: string;
    email: string;
    groups: string[];
  } | null;
  
  // Error handling
  error: string | null;
}

/**
 * Initial authentication state
 */
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  userInfo: null,
  error: null,
};

/**
 * Login credentials interface
 */
interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Login response interface
 */
interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  user_info: {
    username: string;
    email: string;
    groups: string[];
    department: string;
  };
}

/**
 * Async thunk for user login
 * In a real app, this would call the backend API
 * For demo purposes, it returns dummy data for any credentials
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo: accept any credentials as valid
      if (!credentials.username || !credentials.password) {
        throw new Error("Username and password are required");
      }
      
      // Return dummy login response
      const response: LoginResponse = {
        access_token: `dummy_jwt_token_${credentials.username}_${Date.now()}`,
        refresh_token: `dummy_refresh_token_${credentials.username}_${Date.now()}`,
        token_type: "Bearer",
        expires_in: 3600,
        user_info: {
          username: credentials.username,
          email: `${credentials.username}@government.lk`,
          groups: ["government_employees"],
          department: "Ministry of Technology",
        },
      };
      
      return response;
      
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
  }
);

/**
 * Async thunk for token refresh
 * In a real app, this would use the refresh token to get new access token
 */
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { refreshToken } = state.auth;
      
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return new dummy tokens
      return {
        access_token: `refreshed_token_${Date.now()}`,
        expires_in: 3600,
      };
      
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Token refresh failed");
    }
  }
);

/**
 * Async thunk for logout
 * Clears tokens and user data
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, you might call backend to invalidate tokens
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return true;
      
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Logout failed");
    }
  }
);

/**
 * Authentication slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Set access token manually (for testing)
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    // Load dummy user for demo
    loadDummyAuth: (state) => {
      state.accessToken = "dummy_demo_token";
      state.refreshToken = "dummy_demo_refresh";
      state.isAuthenticated = true;
      state.userInfo = {
        username: "demo.user",
        email: "demo.user@government.lk",
        groups: ["government_employees"],
      };
      state.error = null;
    },

    // Reset auth state
    resetAuth: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token || null;
        state.userInfo = {
          username: action.payload.user_info.username,
          email: action.payload.user_info.email,
          groups: action.payload.user_info.groups,
        };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.userInfo = null;
        state.error = action.payload as string;
      });

    // Refresh token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access_token;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.userInfo = null;
        state.error = action.payload as string;
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearError,
  setAccessToken,
  loadDummyAuth,
  resetAuth,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors for easy state access
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectUserInfo = (state: { auth: AuthState }) => state.auth.userInfo;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
