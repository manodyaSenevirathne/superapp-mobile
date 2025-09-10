// Government SuperApp Configuration
// This file contains all the configuration for the government SuperApp

export interface AppConfig {
  // Organization Branding
  organizationName: string;
  appName: string;
  brandColor: string;
  logoLight: any;
  logoDark: any;
  splashAnimationLight: any;
  splashAnimationDark: any;
  
  // Tab Configuration
  tabs: TabConfig[];
  
  // Features
  features: {
    googleIntegration: boolean;
    libraryEnabled: boolean;
    eventsEnabled: boolean;
    newsEnabled: boolean;
    cameraScanner: boolean;
    appMarketplace: boolean;
  };
  
  // URLs & Endpoints
  apiEndpoints: {
    baseUrl: string;
    authUrl: string;
    libraryUrl?: string;
    eventsUrl?: string;
    newsUrl?: string;
  };
  
  // Authentication
  auth: {
    clientId: string;
    redirectUri: string;
    scopes: string[];
    logoutUrl: string;
  };
  
  // Content URLs
  contentUrls: {
    termsOfService?: string;
    privacyPolicy?: string;
    supportUrl?: string;
    websiteUrl: string;
  };
}

export interface TabConfig {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
  enabled: boolean;
  headerShown: boolean;
}

// Government SuperApp Configuration
export const GOVERNMENT_APP_CONFIG: AppConfig = {
  organizationName: "Government Services",
  appName: "Government SuperApp",
  brandColor: "#2563EB", // Government blue
  logoLight: require("../assets/images/adaptive-icon.png"),
  logoDark: require("../assets/images/adaptive-icon.png"),
  splashAnimationLight: require("../assets/animation/animation-light.json"),
  splashAnimationDark: require("../assets/animation/animation-dark.json"),
  
  tabs: [
    {
      name: "index",
      title: "Home",
      icon: "home-outline",
      iconFocused: "home",
      enabled: true,
      headerShown: true,
    },
    {
      name: "apps",
      title: "Services",
      icon: "apps-outline",
      iconFocused: "apps",
      enabled: true,
      headerShown: false,
    },
    {
      name: "profile",
      title: "Profile",
      icon: "person-circle-outline",
      iconFocused: "person-circle",
      enabled: true,
      headerShown: true,
    },
  ],
  
  features: {
    googleIntegration: false,    // Disabled for government use
    libraryEnabled: false,       // Disabled for now
    eventsEnabled: true,         // Government announcements
    newsEnabled: true,           // Government news
    cameraScanner: true,         // For document scanning
    appMarketplace: true,        // Government services
  },
  
  apiEndpoints: {
    baseUrl: process.env.EXPO_PUBLIC_BACKEND_BASE_URL ?? "http://localhost:9090",
    authUrl: process.env.EXPO_PUBLIC_TOKEN_URL ?? "",
    eventsUrl: process.env.EXPO_PUBLIC_EVENTS_URL ?? "",
    newsUrl: process.env.EXPO_PUBLIC_NEWS_URL ?? "",
  },
  
  auth: {
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI ?? "",
    scopes: ["openid", "profile", "email"],
    logoutUrl: process.env.EXPO_PUBLIC_LOGOUT_URL ?? "",
  },
  
  contentUrls: {
    websiteUrl: "https://government.gov/",
    supportUrl: "https://support.government.gov/",
    termsOfService: "https://government.gov/terms",
    privacyPolicy: "https://government.gov/privacy",
  },
};

// Function to get current app configuration
export const getAppConfig = (): AppConfig => {
  return GOVERNMENT_APP_CONFIG;
};
