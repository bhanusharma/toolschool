<?php
/**
 * Plugin Name: CORS Headers for Local Development
 * Description: Adds CORS headers to allow Next.js frontend to access GraphQL
 */

// Add CORS headers for local development
add_action('graphql_init', function() {
    $allowed_origins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3000',
    ];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Access-Control-Allow-Credentials: true");
    }
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit();
    }
});

// Also add headers earlier in the request lifecycle
add_action('init', function() {
    // Only add headers for GraphQL endpoint
    if (strpos($_SERVER['REQUEST_URI'] ?? '', '/graphql') !== false) {
        $allowed_origins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://127.0.0.1:3000',
        ];
        
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
            header("Access-Control-Allow-Credentials: true");
        }
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header("HTTP/1.1 200 OK");
            exit();
        }
    }
});

// Also add headers for REST API if needed
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowed_origins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
        ];
        
        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
            header("Access-Control-Allow-Credentials: true");
        }
        
        return $value;
    });
});