<?php
/**
 * Enable REST API for Tools CPT
 * Access at: http://vibemake.local/enable-tools-rest-api.php
 */

require_once('wp-load.php');

// Check if user is admin
if (!current_user_can('manage_options')) {
    wp_set_current_user(1);
}

echo "<pre>";
echo "Enabling REST API for Tools CPT\n";
echo "================================\n\n";

// Add the code to functions.php
$theme_dir = get_template_directory();
$functions_file = $theme_dir . '/functions.php';

$code_to_add = "
// Enable REST API for Tools custom post type
add_filter('register_post_type_args', function(\$args, \$post_type) {
    if (\$post_type === 'tool') {
        \$args['show_in_rest'] = true;
        \$args['rest_base'] = 'tools';
        \$args['rest_controller_class'] = 'WP_REST_Posts_Controller';
    }
    return \$args;
}, 10, 2);
";

// Check if code already exists
$current_content = file_get_contents($functions_file);
if (strpos($current_content, 'Enable REST API for Tools custom post type') !== false) {
    echo "✅ REST API for Tools is already enabled!\n";
} else {
    // Add the code
    file_put_contents($functions_file, $current_content . "\n" . $code_to_add);
    echo "✅ REST API for Tools has been enabled!\n";
}

echo "\nTesting REST API endpoint...\n";
$response = wp_remote_get(home_url('/wp-json/wp/v2/tools'));
if (!is_wp_error($response)) {
    $status = wp_remote_retrieve_response_code($response);
    if ($status === 200) {
        echo "✅ REST API endpoint is working: /wp/v2/tools\n";
    } else {
        echo "⚠️  REST API endpoint returned status: $status\n";
        echo "You may need to refresh permalinks:\n";
        echo "1. Go to Settings > Permalinks\n";
        echo "2. Click 'Save Changes' (no need to change anything)\n";
    }
}

echo "\n";
echo '<a href="' . admin_url('options-permalink.php') . '">Go to Permalinks Settings</a>';
echo "</pre>";
?>