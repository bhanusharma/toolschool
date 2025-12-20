<?php
/**
 * Debug WordPress MCP Initialization
 * Access at: http://vibemake.local/debug-mcp-init.php
 */

require_once('wp-load.php');
wp_set_current_user(1);

echo "<pre>";
echo "WordPress MCP Initialization Debug\n";
echo "==================================\n\n";

// Check if the init action was fired
echo "Checking initialization hooks...\n\n";

// Manually trigger the wordpress_mcp_init action
echo "Manually triggering wordpress_mcp_init action...\n";
do_action('wordpress_mcp_init');

// Now check if tools are registered
if (function_exists('WPMCP')) {
    $mcp = WPMCP();
    $tools = $mcp->get_tools();
    
    echo "\nRegistered tools after manual init:\n";
    echo "-----------------------------------\n";
    
    if (!empty($tools)) {
        $count = 0;
        foreach ($tools as $tool_name => $tool_data) {
            $count++;
            $type = isset($tool_data['type']) ? $tool_data['type'] : 'unknown';
            $enabled = isset($tool_data['enabled']) ? ($tool_data['enabled'] ? '✅' : '❌') : '❓';
            echo "$count. $tool_name (Type: $type) $enabled\n";
        }
        echo "\nTotal tools: $count\n";
    } else {
        echo "Still no tools registered.\n";
        
        // Check if tool classes are instantiated
        echo "\nChecking if tool classes are instantiated...\n";
        
        // Try to manually instantiate
        $tool_classes = [
            '\Automattic\WordpressMcp\Tools\McpPostsTools',
            '\Automattic\WordpressMcp\Tools\McpPagesTools',
            '\Automattic\WordpressMcp\Tools\McpMediaTools',
            '\Automattic\WordpressMcp\Tools\McpCustomPostTypesTools',
            '\Automattic\WordpressMcp\Tools\McpRestApiCrud'
        ];
        
        foreach ($tool_classes as $class) {
            if (class_exists($class)) {
                echo "Instantiating $class...\n";
                new $class();
            }
        }
        
        // Fire init again
        do_action('wordpress_mcp_init');
        
        // Check again
        $tools = $mcp->get_tools();
        echo "\nTools after manual instantiation: " . count($tools) . "\n";
    }
}

// Test the streamable endpoint directly
echo "\n\nTesting streamable endpoint response:\n";
echo "-------------------------------------\n";

$response = wp_remote_post(
    home_url('/wp-json/wp/v2/wpmcp/streamable'),
    [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json, text/event-stream',
            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdmliZW1ha2UubG9jYWwiLCJpYXQiOjE3NTEzNzc0NTEsImV4cCI6MTc1MTM4MTA1MSwidXNlcl9pZCI6MSwianRpIjoiTFRPNWtXMHoxcUNFU2k0WlhCMzJuZjZMRndVZjliSU0ifQ.OuyhfUeyx3r3ukInGSsfhNEQHknFpVhEZCugIMNiVhI'
        ],
        'body' => json_encode([
            'jsonrpc' => '2.0',
            'method' => 'tools/list',
            'id' => 1
        ])
    ]
);

if (!is_wp_error($response)) {
    $body = json_decode(wp_remote_retrieve_body($response), true);
    if (isset($body['result']['tools'])) {
        echo "Tools available via streamable endpoint: " . count($body['result']['tools']) . "\n";
        foreach ($body['result']['tools'] as $tool) {
            echo "- " . $tool['name'] . "\n";
        }
    }
}

echo "</pre>";
?>