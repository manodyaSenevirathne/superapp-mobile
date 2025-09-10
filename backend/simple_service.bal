// Simple Government SuperApp Backend Service
// This service provides dummy data for the government super app
// No database required - uses static data for demonstration

import ballerina/http;
import ballerina/log;

// Configuration for the service
configurable int PORT = 9090;
configurable string HOST = "localhost";

// CORS configuration to allow frontend access
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["*"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}
service / on new http:Listener(PORT) {

    // Health check endpoint
    resource function get health() returns json {
        return {
            "status": "healthy",
            "service": "Government SuperApp Backend",
            "timestamp": "2025-09-09T10:00:00Z"
        };
    }

    // Authentication endpoint - returns dummy token for demo
    resource function post auth/token(http:Request request) returns json|http:BadRequest {
        json|error payload = request.getJsonPayload();
        
        if payload is error {
            return http:BAD_REQUEST;
        }

        // Simple dummy authentication - in real app, validate against identity provider
        json loginData = payload;
        string? username = loginData.username is string ? <string>loginData.username : ();
        string? password = loginData.password is string ? <string>loginData.password : ();

        if username is () || password is () {
            return http:BAD_REQUEST;
        }

        // For demo purposes, accept any credentials and return a dummy token
        return {
            "access_token": "dummy_jwt_token_for_" + username,
            "token_type": "Bearer",
            "expires_in": 3600,
            "scope": "government_services",
            "user_info": {
                "username": username,
                "email": username + "@government.lk",
                "groups": ["government_employees"],
                "department": "Ministry of Technology"
            }
        };
    }

    // Get available micro-apps with dummy data
    resource function get micro\-apps(http:Request request) returns json|http:Unauthorized {
        // In real app, validate JWT token here
        string? authHeader = request.getHeader("Authorization");
        
        if authHeader is () || !authHeader.startsWith("Bearer ") {
            return http:UNAUTHORIZED;
        }

        // Return dummy micro-apps data
        return [
            {
                "appId": "payslip-viewer",
                "name": "Payslip Viewer",
                "description": "View and download your monthly payslips securely",
                "promoText": "Access your salary information anytime",
                "iconUrl": "/static/icons/payslip.png",
                "bannerImageUrl": "/static/banners/payslip-banner.png",
                "mandatory": false,
                "version": "1.0.0",
                "downloadUrl": "/static/payslip-viewer.zip"
            },
            {
                "appId": "leave-management", 
                "name": "Leave Management",
                "description": "Apply for and track your leave requests",
                "promoText": "Manage your time off efficiently",
                "iconUrl": "/static/icons/leave.png",
                "bannerImageUrl": "/static/banners/leave-banner.png",
                "mandatory": false,
                "version": "1.0.0",
                "downloadUrl": "/static/leave-management.zip"
            },
            {
                "appId": "employee-directory",
                "name": "Employee Directory", 
                "description": "Find contact information for government employees",
                "promoText": "Connect with your colleagues",
                "iconUrl": "/static/icons/directory.png",
                "bannerImageUrl": "/static/banners/directory-banner.png",
                "mandatory": true,
                "version": "1.0.0",
                "downloadUrl": "/static/employee-directory.zip"
            }
        ];
    }

    // Get specific micro-app details
    resource function get micro\-apps/[string appId](http:Request request) returns json|http:Unauthorized|http:NotFound {
        // Validate authorization
        string? authHeader = request.getHeader("Authorization");
        if authHeader is () || !authHeader.startsWith("Bearer ") {
            return http:UNAUTHORIZED;
        }

        // Return specific app data based on appId
        if appId == "payslip-viewer" {
            return {
                "appId": "payslip-viewer",
                "name": "Payslip Viewer",
                "description": "View and download your monthly payslips securely. Access detailed salary breakdowns, tax deductions, and employment benefits.",
                "promoText": "Access your salary information anytime",
                "iconUrl": "/static/icons/payslip.png",
                "bannerImageUrl": "/static/banners/payslip-banner.png",
                "mandatory": false,
                "version": "1.0.0",
                "downloadUrl": "/static/payslip-viewer.zip",
                "permissions": ["camera", "storage"],
                "supportedPlatforms": ["android", "ios"]
            };
        }

        return http:NOT_FOUND;
    }

    // Serve static files (micro-app ZIP files, images, etc.)
    resource function get static/[string fileName]() returns http:Response|http:NotFound {
        string filePath = "./static/" + fileName;
        
        http:Response response = new;
        
        // Set appropriate content type based on file extension
        if fileName.endsWith(".zip") {
            response.setHeader("Content-Type", "application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        } else if fileName.endsWith(".png") {
            response.setHeader("Content-Type", "image/png");
        } else if fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") {
            response.setHeader("Content-Type", "image/jpeg");
        } else {
            response.setHeader("Content-Type", "application/octet-stream");
        }

        // In a production app, you would read the actual file
        // For now, return a success response indicating file exists
        response.statusCode = 200;
        response.setTextPayload("File: " + fileName);
        
        log:printInfo("Serving static file: " + fileName);
        return response;
    }

    // User configuration endpoint - returns dummy user preferences
    resource function get user/config(http:Request request) returns json|http:Unauthorized {
        string? authHeader = request.getHeader("Authorization");
        if authHeader is () || !authHeader.startsWith("Bearer ") {
            return http:UNAUTHORIZED;
        }

        return {
            "theme": "light",
            "language": "en",
            "notifications": {
                "enabled": true,
                "types": ["payslip", "leave_updates", "announcements"]
            },
            "dashboard": {
                "favoriteApps": ["payslip-viewer"],
                "layout": "grid"
            }
        };
    }

    // Update user configuration
    resource function post user/config(http:Request request) returns json|http:Unauthorized|http:BadRequest {
        string? authHeader = request.getHeader("Authorization");
        if authHeader is () || !authHeader.startsWith("Bearer ") {
            return http:UNAUTHORIZED;
        }

        json|error payload = request.getJsonPayload();
        if payload is error {
            return http:BAD_REQUEST;
        }

        // In real app, save to database
        log:printInfo("User config updated: " + payload.toString());
        
        return {
            "message": "Configuration updated successfully",
            "timestamp": "2025-09-09T10:00:00Z"
        };
    }
}

// Service startup log
public function main() {
    log:printInfo("Government SuperApp Backend started on " + HOST + ":" + PORT.toString());
    log:printInfo("Available endpoints:");
    log:printInfo("  GET  /health - Health check");
    log:printInfo("  POST /auth/token - Authentication");
    log:printInfo("  GET  /micro-apps - List micro-apps");
    log:printInfo("  GET  /micro-apps/{id} - Get specific micro-app");
    log:printInfo("  GET  /static/{file} - Serve static files");
    log:printInfo("  GET  /user/config - Get user configuration");
    log:printInfo("  POST /user/config - Update user configuration");
}
