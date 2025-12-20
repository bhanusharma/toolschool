<?php
/**
 * Check WordPress MCP Settings
 * Access at: http://vibemake.local/check-mcp-settings.php
 */

require_once('wp-load.php');

// Set admin user
wp_set_current_user(1);

echo "<pre>";
echo "WordPress MCP Settings Check\n";
echo "============================\n\n";

// Check if MCP is active
if (!is_plugin_active('wordpress-mcp/wordpress-mcp.php')) {
    die("❌ WordPress MCP plugin is not active!");
}

echo "✅ WordPress MCP is active\n\n";

// Get MCP settings
$settings = get_option('wordpress_mcp_settings', []);

echo "Current Settings:\n";
echo "----------------\n";

// Check important settings
$settings_to_check = [
    'mcp_enabled' => 'MCP Enabled',
    'enable_create_tools' => 'Create Tools Enabled',
    'enable_update_tools' => 'Update Tools Enabled', 
    'enable_delete_tools' => 'Delete Tools Enabled',
    'enable_rest_api_crud' => 'REST API CRUD Tools Enabled',
    'enabled_tools' => 'Enabled Tools List'
];

foreach ($settings_to_check as $key => $label) {
    $value = isset($settings[$key]) ? $settings[$key] : 'not set';
    if (is_array($value)) {
        echo "$label: " . json_encode($value) . "\n";
    } else {
        echo "$label: " . ($value ? '✅ Yes' : '❌ No') . "\n";
    }
}

// Check for tool registration
echo "\n\nRegistered MCP Tools:\n";
echo "--------------------\n";

// Get the MCP instance
if (function_exists('WPMCP')) {
    $mcp = WPMCP();
    $tools = $mcp->get_tools();
    
    if (!empty($tools)) {
        foreach ($tools as $tool_name => $tool_data) {
            $type = isset($tool_data['type']) ? $tool_data['type'] : 'unknown';
            echo "- $tool_name (Type: $type)\n";
        }
    } else {
        echo "No tools registered.\n";
    }
} else {
    echo "WPMCP function not available.\n";
}

// Check if all required files are loaded
echo "\n\nMCP Components Status:\n";
echo "---------------------\n";

$components = [
    'Automattic\WordpressMcp\Tools\McpPostsTools' => 'Posts Tools',
    'Automattic\WordpressMcp\Tools\McpPagesTools' => 'Pages Tools',
    'Automattic\WordpressMcp\Tools\McpMediaTools' => 'Media Tools',
    'Automattic\WordpressMcp\Tools\McpCustomPostTypesTools' => 'Custom Post Types Tools',
    'Automattic\WordpressMcp\Tools\McpRestApiCrud' => 'REST API CRUD Tools'
];

foreach ($components as $class => $name) {
    echo "$name: " . (class_exists($class) ? '✅ Loaded' : '❌ Not loaded') . "\n";
}

echo "\n";
echo '<a href="' . admin_url('options-general.php?page=wordpress-mcp') . '">Go to WordPress MCP Settings</a>';
echo "</pre>";
?>