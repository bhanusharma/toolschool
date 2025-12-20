<?php
/**
 * Activate WordPress MCP Plugin
 * Access at: http://vibemake.local/activate-mcp.php
 */

require_once('wp-load.php');
require_once(ABSPATH . 'wp-admin/includes/plugin.php');

// Check if user has permission
if (!current_user_can('activate_plugins')) {
    wp_set_current_user(1);
}

echo "<pre>";
echo "WordPress MCP Plugin Activation\n";
echo "================================\n\n";

$plugin_path = 'wordpress-mcp/wordpress-mcp.php';
$plugin_file = WP_PLUGIN_DIR . '/' . $plugin_path;

if (file_exists($plugin_file)) {
    echo "✓ Plugin found at: $plugin_file\n\n";
    
    // Check if already active
    if (is_plugin_active($plugin_path)) {
        echo "ℹ️  Plugin is already active!\n";
    } else {
        // Activate the plugin
        $result = activate_plugin($plugin_path);
        
        if (is_wp_error($result)) {
            echo "❌ Error activating plugin: " . $result->get_error_message() . "\n";
        } else {
            echo "✅ Plugin activated successfully!\n\n";
            echo "Next steps:\n";
            echo "1. Go to Settings > WordPress MCP in admin\n";
            echo "2. Generate a JWT token\n";
            echo "3. Configure Claude Desktop with the token\n";
        }
    }
} else {
    echo "❌ Plugin not found at expected location\n";
    echo "Expected: $plugin_file\n";
}

echo "\n";
echo '<a href="' . admin_url('options-general.php?page=wordpress-mcp') . '">Go to WordPress MCP Settings</a>';
echo "</pre>";
?>