/**
 * Government SuperApp - Redux Store Configuration
 * 
 * This sets up the app's global state management using Redux Toolkit.
 * 
 * Key features:
 * - Persists auth tokens and user data to device storage
 * - Manages micro-app listings and user preferences
 * - Handles authentication state across app restarts
 * 
 * Simplified for easier understanding and maintenance
 */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// Import simplified reducers
import authReducer from "./slices/authSlice-simple";
import appsReducer from "./slices/appsSlice";
import userReducer from "./slices/userSlice";

/**
 * Configuration for persisting authentication state
 * This keeps users logged in across app restarts
 */
const authPersistConfig = {
  key: "gov-auth",
  storage: AsyncStorage,
  whitelist: ["accessToken", "refreshToken", "isAuthenticated"],
};

/**
 * Configuration for persisting app data
 * This caches downloaded micro-apps and user preferences
 */
const appsPersistConfig = {
  key: "gov-apps", 
  storage: AsyncStorage,
  whitelist: ["downloadedApps", "favoriteApps"],
};

/**
 * Configuration for persisting user profile data
 * This stores user info and settings
 */
const userPersistConfig = {
  key: "gov-user",
  storage: AsyncStorage,
  whitelist: ["profile", "preferences"],
};

/**
 * Root reducer combining all app state slices
 */
const rootReducer = combineReducers({
  // Authentication state (tokens, login status)
  auth: persistReducer(authPersistConfig, authReducer),
  
  // Apps state (available micro-apps, downloads, favorites)
  apps: persistReducer(appsPersistConfig, appsReducer),
  
  // User state (profile, preferences, settings)
  user: persistReducer(userPersistConfig, userReducer),
});

/**
 * Main app store with persistence
 * This configures the Redux store with development tools and persistence
 */
export const store = configureStore({
  reducer: rootReducer,
  
  // Middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Required for redux-persist to work with non-serializable values
      serializableCheck: {
        ignoredActions: [
          "persist/FLUSH",
          "persist/REHYDRATE", 
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
    
  // Enable Redux DevTools in development
  devTools: __DEV__,
});

/**
 * Persistor for saving/restoring state to device storage
 */
export const persistor = persistStore(store);

/**
 * TypeScript types for store
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
