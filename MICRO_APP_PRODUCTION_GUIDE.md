# Production-Ready Micro-App Viewer Documentation

## Overview

The updated `micro-app.tsx` is now a **production-ready, generic SuperApp micro-application viewer** that's significantly more robust and feature-complete than the previous simple version.

## Key Production Features

### 🏗️ **Architecture & Design**
- **Generic Design**: Works with any micro-application, not just government payslips
- **Type Safety**: Proper TypeScript interfaces and type checking
- **Modular Structure**: Clean separation of concerns with focused functions
- **Performance Optimized**: Efficient state management and rendering

### 🔒 **Security & Authentication**
- **Token Management**: Secure authentication token handling with queue system
- **Sandboxed Storage**: App-specific local storage with namespacing
- **CORS Support**: Proper origin whitelisting for WebView security
- **Input Validation**: Robust message parsing with error handling

### 🌉 **Native Bridge Communication**
```typescript
// Comprehensive bridge topics supported:
- TOKEN: Authentication token exchange
- QR_REQUEST: QR code scanning integration
- SAVE_LOCAL_DATA / GET_LOCAL_DATA: Secure local storage
- ALERT / CONFIRM_ALERT: Native alert dialogs
- GOOGLE_LOGIN: Google authentication (extensible)
- TOTP: Time-based OTP support
- DOWNLOAD_FILE / UPLOAD_FILE: File operations
```

### 📱 **User Experience**
- **Dark/Light Mode**: Automatic theme adaptation
- **Loading States**: Proper loading indicators and feedback
- **Error Handling**: Comprehensive error recovery with retry mechanisms
- **Accessibility**: ARIA labels, role assignments, and screen reader support
- **Responsive Design**: Optimized for various screen sizes

### 🛠️ **Developer Experience**
- **Developer Mode**: Special handling for development apps with URL input
- **Debug Support**: WebView debugging enabled in development
- **Hot Reload**: Seamless development workflow
- **Comprehensive Logging**: Detailed error logging and debugging info

## Configuration System

### App Configuration
```typescript
interface AppConfig {
  isDeveloper: boolean;      // Enables dev features
  isTotp: boolean;          // TOTP-specific functionality
  requiresAuth: boolean;    // Authentication requirement
  allowsFileAccess: boolean; // File system permissions
}
```

### Auto-Detection
The component automatically detects app type based on `appId`:
- `developer` → Development mode with URL input
- `totp` → TOTP authentication features
- `public` → No authentication required
- `file` → File access permissions enabled

## Usage Examples

### 1. Government Service App
```typescript
// Navigate to government payslip service
router.push({
  pathname: "/micro-app",
  params: {
    appId: "government_payslip",
    appName: "Employee Payslip",
    webViewUri: "https://payslip.gov.lk",
    clientId: "gov_client_123",
    exchangedToken: "auth_token_xyz"
  }
});
```

### 2. Developer Testing App
```typescript
// Open developer mode for testing
router.push({
  pathname: "/micro-app",
  params: {
    appId: "developer_test",
    appName: "Development App",
    webViewUri: "http://localhost:3000"
  }
});
```

### 3. Public Service (No Auth)
```typescript
// Public information service
router.push({
  pathname: "/micro-app",
  params: {
    appId: "public_info",
    appName: "Public Information",
    webViewUri: "https://info.gov.lk"
  }
});
```

## Bridge API for Web Applications

Web applications loaded in the micro-app can use this JavaScript API:

```javascript
// Request authentication token
window.nativebridge.requestToken();

// Show native alert
window.nativebridge.requestAlert(
  "Success",
  "Operation completed successfully",
  "OK"
);

// Request confirmation
window.nativebridge.requestConfirmAlert(
  "Confirm Action",
  "Are you sure you want to proceed?",
  "Yes",
  "Cancel"
);

// Save data locally
window.nativebridge.requestSaveLocalData("user_preference", "dark_mode");

// Get saved data
window.nativebridge.requestGetLocalData("user_preference");

// Request QR code scan
window.nativebridge.requestQr();

// Listen for responses
window.nativebridge.resolveToken = function(token) {
  console.log("Received token:", token);
};

window.nativebridge.resolveQrCode = function(qrData) {
  console.log("QR Code scanned:", qrData);
};
```

## Error Handling & Recovery

### Network Errors
- Automatic retry mechanism for failed loads
- User-friendly error messages
- Developer-specific error details

### Authentication Errors
- Token refresh handling
- Graceful fallback for auth failures
- Clear error communication

### WebView Errors
- Crash recovery with reload option
- Fallback content for failed loads
- Debug information in development

## Extensibility

### Adding New Bridge Functions
```typescript
// In handleMessage function
case "NEW_FEATURE":
  await handleNewFeature(message.data);
  break;

// Implement handler
const handleNewFeature = async (data: any) => {
  // Implementation
  sendResponseToWeb("resolveNewFeature", result);
};
```

### Custom App Configurations
```typescript
// Extend AppConfig interface
interface ExtendedAppConfig extends AppConfig {
  customFeature: boolean;
  apiEndpoint: string;
}
```

## Performance Considerations

### Memory Management
- Proper WebView cleanup on unmount
- Efficient message queue handling
- Minimal state retention

### Loading Optimization
- Progressive loading with feedback
- Cached resources where appropriate
- Optimized bundle sizes

### Battery Efficiency
- Background process management
- Efficient event handling
- Minimal polling/timers

## Testing Strategy

### Unit Tests
- Bridge message handling
- Authentication flow
- Error scenarios

### Integration Tests
- WebView communication
- Native feature integration
- Cross-platform compatibility

### E2E Tests
- Complete user workflows
- Error recovery scenarios
- Performance benchmarks

## Security Considerations

### Data Protection
- Sandboxed app storage
- Secure token transmission
- Input sanitization

### Permission Management
- Granular feature access
- Runtime permission checks
- Audit logging

### Network Security
- HTTPS enforcement
- Certificate validation
- Content Security Policy

## Migration from Simple Version

The new version is **backward compatible** but offers these improvements:

### Old vs New
| Feature | Old Version | New Version |
|---------|-------------|-------------|
| Bridge Communication | Basic alerts | Full API suite |
| Error Handling | Minimal | Comprehensive |
| Authentication | None | Token management |
| Storage | None | Secure local storage |
| Developer Tools | None | Debug mode |
| Theming | Fixed | Dynamic themes |
| Accessibility | Basic | Full support |
| File Operations | None | Download/upload |
| QR Scanning | None | Native integration |

### Breaking Changes
- None - the component maintains the same interface
- Enhanced parameter handling with better type safety
- Improved error states with better UX

## Future Enhancements

### Planned Features
- Biometric authentication integration
- Offline mode support
- Push notification handling
- Advanced file management
- Multi-language support
- Analytics integration

### Performance Optimizations
- WebView pooling for faster loading
- Intelligent caching strategies
- Background preloading
- Resource optimization

This production-ready micro-app viewer provides a solid foundation for building enterprise-grade SuperApp experiences with government services, developer tools, and extensible micro-application architecture.
