// Simple Government SuperApp Backend Service
// This service provides dummy data for the government super app
// No database required - uses static data for demonstration

import ballerina/http;
import ballerina/log;

// Configuration for the service
configurable int PORT = 9090;

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
        
        // Safe extraction of username and password
        string username = "demo_user";
        string password = "demo_pass";
        
        if loginData is map<json> {
            json usernameJson = loginData["username"];
            json passwordJson = loginData["password"];
            
            if usernameJson is string {
                username = usernameJson;
            }
            
            if passwordJson is string {
                password = passwordJson;
            }
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
        string|http:HeaderNotFoundError authHeader = request.getHeader("Authorization");
        
        if authHeader is http:HeaderNotFoundError {
            return http:UNAUTHORIZED;
        }
        
        string authValue = <string>authHeader;
        if !authValue.startsWith("Bearer ") {
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
            }
        ];
    }

    // Serve static files (micro-app ZIP files, images, etc.)
    resource function get static/[string fileName]() returns http:Response|http:NotFound {
        http:Response response = new;
        
        // Handle index.html - serve the actual payslip viewer
        if fileName == "index.html" {
            response.setHeader("Content-Type", "text/html");
            
            // Read and serve the actual payslip HTML file
            string payslipHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Government Payslip Viewer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #2563EB 0%, #1e40af 100%);
            min-height: 100vh;
            padding: 10px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .header {
            background: #2563EB;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .content { padding: 20px; }
        
        .employee-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .info-item {
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #2563EB;
        }
        
        .salary-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .total-row {
            font-weight: bold;
            background: #eff6ff;
            padding: 15px;
            margin-top: 10px;
            border-radius: 8px;
        }
        
        .button {
            background: #2563EB;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            margin: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .button:hover { background: #1d4ed8; }
        .button.secondary { background: #64748b; }
        
        @media (max-width: 600px) {
            .employee-info { grid-template-columns: 1fr; }
            body { padding: 5px; }
            .content { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ Government Payslip</h1>
            <p>Ministry of Technology</p>
        </div>
        
        <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 15px;">January 2025 Payslip</h2>
            
            <div class="employee-info">
                <div class="info-item">
                    <strong>Employee:</strong><br>John Doe
                </div>
                <div class="info-item">
                    <strong>ID:</strong><br>EMP-2024-001
                </div>
                <div class="info-item">
                    <strong>Department:</strong><br>Ministry of Technology
                </div>
                <div class="info-item">
                    <strong>Position:</strong><br>Senior Engineer
                </div>
            </div>
            
            <div class="salary-breakdown">
                <h3 style="color: #1e293b; margin-bottom: 10px;">Salary Details</h3>
                
                <div class="salary-row">
                    <span>Basic Salary:</span>
                    <span>LKR 150,000</span>
                </div>
                <div class="salary-row">
                    <span>Allowances:</span>
                    <span>LKR 25,000</span>
                </div>
                <div class="salary-row">
                    <span>Overtime:</span>
                    <span>LKR 8,500</span>
                </div>
                <div class="salary-row">
                    <span><strong>Gross:</strong></span>
                    <span><strong>LKR 183,500</strong></span>
                </div>
                
                <h4 style="color: #dc2626; margin: 15px 0 10px;">Deductions</h4>
                <div class="salary-row">
                    <span>Income Tax:</span>
                    <span style="color: #dc2626;">LKR 18,350</span>
                </div>
                <div class="salary-row">
                    <span>EPF (8%):</span>
                    <span style="color: #dc2626;">LKR 12,000</span>
                </div>
                <div class="salary-row">
                    <span>ETF (3%):</span>
                    <span style="color: #dc2626;">LKR 4,500</span>
                </div>
                
                <div class="total-row salary-row">
                    <span><strong>Net Salary:</strong></span>
                    <span><strong style="color: #059669;">LKR 148,650</strong></span>
                </div>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <button class="button" onclick="downloadPayslip()">
                    📄 Download PDF
                </button>
                <button class="button secondary" onclick="emailPayslip()">
                    📧 Email Copy
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
                🔒 Secure Government Document | Generated: ` + "2025-09-09" + `
            </div>
        </div>
    </div>
    
    <script>
        function downloadPayslip() {
            if (window.nativebridge) {
                window.nativebridge.requestAlert(
                    'Download',
                    'Payslip downloaded successfully!',
                    'OK'
                );
            } else {
                alert('Payslip downloaded successfully!');
            }
        }
        
        function emailPayslip() {
            if (window.nativebridge) {
                window.nativebridge.requestAlert(
                    'Email Sent', 
                    'Payslip sent to john.doe@government.lk',
                    'OK'
                );
            } else {
                alert('Payslip sent to john.doe@government.lk');
            }
        }
    </script>
</body>
</html>`;
            
            response.setTextPayload(payslipHtml);
            log:printInfo("Serving payslip HTML file");
            return response;
        }
        
        // Set appropriate content type based on file extension
        if fileName.endsWith(".zip") {
            response.setHeader("Content-Type", "application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        } else if fileName.endsWith(".png") {
            response.setHeader("Content-Type", "image/png");
        }

        // For demo, return success response
        response.statusCode = 200;
        response.setTextPayload("Demo file: " + fileName);
        
        log:printInfo("Serving static file: " + fileName);
        return response;
    }
}

// Service startup log
public function main() {
    log:printInfo("🏛️ Government SuperApp Backend started on port " + PORT.toString());
    log:printInfo("📋 Available endpoints:");
    log:printInfo("  GET  /health - Health check");
    log:printInfo("  POST /auth/token - Authentication");
    log:printInfo("  GET  /micro-apps - List micro-apps");
    log:printInfo("  GET  /static/{file} - Serve static files");
}
