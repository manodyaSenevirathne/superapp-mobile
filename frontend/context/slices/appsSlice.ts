/**
 * Government SuperApp - Apps State Management
 * 
 * This slice manages the state of micro-applications:
 * - List of available government services/apps
 * - Downloaded app status
 * - User favorites and preferences
 * 
 * Uses dummy data for demonstration purposes
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Type definition for a micro-app
 */
export interface MicroApp {
  appId: string;
  name: string;
  description: string;
  iconUrl: string;
  version: string;
  downloadUrl: string;
  isDownloaded: boolean;
  isFavorite: boolean;
  mandatory: boolean;
}

/**
 * Apps slice state structure
 */
interface AppsState {
  // List of all available micro-apps
  availableApps: MicroApp[];
  
  // List of downloaded app IDs
  downloadedApps: string[];
  
  // List of favorite app IDs
  favoriteApps: string[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

/**
 * Dummy government micro-apps data
 * In a real app, this would come from the backend API
 */
const dummyApps: MicroApp[] = [
  {
    appId: "payslip-viewer",
    name: "Payslip Viewer",
    description: "View and download your monthly payslips securely",
    iconUrl: "/static/icons/payslip.png",
    version: "1.0.0",
    downloadUrl: "/static/payslip-viewer.zip",
    isDownloaded: false,
    isFavorite: false,
    mandatory: false,
  },
  {
    appId: "leave-management",
    name: "Leave Management", 
    description: "Apply for and track your leave requests",
    iconUrl: "/static/icons/leave.png",
    version: "1.0.0",
    downloadUrl: "/static/leave-management.zip",
    isDownloaded: false,
    isFavorite: false,
    mandatory: false,
  },
  {
    appId: "employee-directory",
    name: "Employee Directory",
    description: "Find contact information for government employees",
    iconUrl: "/static/icons/directory.png", 
    version: "1.0.0",
    downloadUrl: "/static/employee-directory.zip",
    isDownloaded: false,
    isFavorite: false,
    mandatory: true,
  },
];

/**
 * Initial state with dummy data
 */
const initialState: AppsState = {
  availableApps: dummyApps,
  downloadedApps: [],
  favoriteApps: [],
  isLoading: false,
  error: null,
};

/**
 * Apps slice with actions and reducers
 */
const appsSlice = createSlice({
  name: "apps",
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

    // Update available apps list
    setAvailableApps: (state, action: PayloadAction<MicroApp[]>) => {
      state.availableApps = action.payload;
    },

    // Mark an app as downloaded
    markAppAsDownloaded: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      
      // Add to downloaded list if not already there
      if (!state.downloadedApps.includes(appId)) {
        state.downloadedApps.push(appId);
      }
      
      // Update the app's downloaded status
      const app = state.availableApps.find(app => app.appId === appId);
      if (app) {
        app.isDownloaded = true;
      }
    },

    // Remove app from downloaded list
    removeDownloadedApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      
      // Remove from downloaded list
      state.downloadedApps = state.downloadedApps.filter(id => id !== appId);
      
      // Update the app's downloaded status
      const app = state.availableApps.find(app => app.appId === appId);
      if (app) {
        app.isDownloaded = false;
      }
    },

    // Toggle app favorite status
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      
      if (state.favoriteApps.includes(appId)) {
        // Remove from favorites
        state.favoriteApps = state.favoriteApps.filter(id => id !== appId);
      } else {
        // Add to favorites
        state.favoriteApps.push(appId);
      }
      
      // Update the app's favorite status
      const app = state.availableApps.find(app => app.appId === appId);
      if (app) {
        app.isFavorite = !app.isFavorite;
      }
    },

    // Reset apps state
    resetApps: (state) => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setAvailableApps,
  markAppAsDownloaded,
  removeDownloadedApp,
  toggleFavorite,
  resetApps,
} = appsSlice.actions;

// Export reducer
export default appsSlice.reducer;

// Selectors for easy state access
export const selectAllApps = (state: { apps: AppsState }) => state.apps.availableApps;
export const selectDownloadedApps = (state: { apps: AppsState }) => 
  state.apps.availableApps.filter(app => app.isDownloaded);
export const selectFavoriteApps = (state: { apps: AppsState }) => 
  state.apps.availableApps.filter(app => app.isFavorite);
export const selectMandatoryApps = (state: { apps: AppsState }) => 
  state.apps.availableApps.filter(app => app.mandatory);
export const selectAppsLoading = (state: { apps: AppsState }) => state.apps.isLoading;
export const selectAppsError = (state: { apps: AppsState }) => state.apps.error;
