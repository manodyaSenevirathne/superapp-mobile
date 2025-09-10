/**
 * Government SuperApp - User State Management
 * 
 * This slice manages user profile and preferences:
 * - User profile information (name, email, department)
 * - App preferences (theme, language, notifications)
 * - User settings and configurations
 * 
 * Uses dummy data for demonstration purposes
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * User profile information
 */
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  department: string;
  employeeId: string;
  jobTitle: string;
  avatar?: string;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: "en" | "si" | "ta";
  notifications: {
    enabled: boolean;
    payslip: boolean;
    leave: boolean;
    announcements: boolean;
  };
  dashboard: {
    layout: "grid" | "list";
    showFavorites: boolean;
    showMandatory: boolean;
  };
}

/**
 * User slice state structure
 */
interface UserState {
  // User profile data
  profile: UserProfile | null;
  
  // User preferences
  preferences: UserPreferences;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

/**
 * Default user preferences
 */
const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  notifications: {
    enabled: true,
    payslip: true,
    leave: true,
    announcements: true,
  },
  dashboard: {
    layout: "grid",
    showFavorites: true,
    showMandatory: true,
  },
};

/**
 * Initial state
 */
const initialState: UserState = {
  profile: null,
  preferences: defaultPreferences,
  isLoading: false,
  error: null,
};

/**
 * User slice with actions and reducers
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Set user profile (typically after login)
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },

    // Update user profile partially
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },

    // Set user preferences
    setUserPreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
    },

    // Update specific preference
    updatePreference: <K extends keyof UserPreferences>(
      state: UserState,
      action: PayloadAction<{ key: K; value: UserPreferences[K] }>
    ) => {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    },

    // Update theme preference
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.preferences.theme = action.payload;
    },

    // Update language preference
    setLanguage: (state, action: PayloadAction<"en" | "si" | "ta">) => {
      state.preferences.language = action.payload;
    },

    // Toggle notification setting
    toggleNotification: (
      state,
      action: PayloadAction<keyof UserPreferences["notifications"]>
    ) => {
      const setting = action.payload;
      state.preferences.notifications[setting] = !state.preferences.notifications[setting];
    },

    // Update dashboard layout
    setDashboardLayout: (state, action: PayloadAction<"grid" | "list">) => {
      state.preferences.dashboard.layout = action.payload;
    },

    // Clear user data (on logout)
    clearUser: (state) => {
      state.profile = null;
      state.preferences = defaultPreferences;
      state.error = null;
    },

    // Load dummy user data (for demo purposes)
    loadDummyUser: (state) => {
      state.profile = {
        id: "gov-user-001",
        username: "john.doe",
        email: "john.doe@government.lk",
        fullName: "John Doe",
        department: "Ministry of Technology",
        employeeId: "EMP-2024-001",
        jobTitle: "Senior Software Engineer",
        avatar: "/static/avatars/john-doe.png",
      };
      state.error = null;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setUserProfile,
  updateUserProfile,
  setUserPreferences,
  updatePreference,
  setTheme,
  setLanguage,
  toggleNotification,
  setDashboardLayout,
  clearUser,
  loadDummyUser,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;

// Selectors for easy state access
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;
export const selectUserPreferences = (state: { user: UserState }) => state.user.preferences;
export const selectUserTheme = (state: { user: UserState }) => state.user.preferences.theme;
export const selectUserLanguage = (state: { user: UserState }) => state.user.preferences.language;
export const selectNotificationSettings = (state: { user: UserState }) => state.user.preferences.notifications;
export const selectDashboardSettings = (state: { user: UserState }) => state.user.preferences.dashboard;
export const selectUserLoading = (state: { user: UserState }) => state.user.isLoading;
export const selectUserError = (state: { user: UserState }) => state.user.error;
