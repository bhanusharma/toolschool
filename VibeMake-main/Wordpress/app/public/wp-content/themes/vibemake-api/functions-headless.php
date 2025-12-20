<?php
/**
 * Headless WordPress Configuration
 * 
 * This file contains all the configurations needed to run WordPress
 * as a headless CMS with GraphQL API only.
 */

// Disable WordPress frontend access
add_action('template_redirect', 'redirect_to_api_endpoint');
function redirect_to_api_endpoint() {
    // Allow access to GraphQL endpoint
    if (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST) {
        return;
    }
    
    // Allow access to admin area
    if (is_admin()) {
        return;
    }
    
    // Allow access to admin-ajax.php
    if (strpos($_SERVER['REQUEST_URI'], 'admin-ajax.php') !== false) {
        return;
    }
    
    // Allow access to wp-json REST API if needed
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        return;
    }
    
    // Allow access to GraphQL endpoint by URI
    if (strpos($_SERVER['REQUEST_URI'], '/graphql') !== false) {
        return;
    }
    
    // Redirect all other frontend requests to the admin
    wp_redirect(admin_url(), 301);
    exit;
}

// Disable unnecessary WordPress features
function disable_wordpress_features() {
    // Disable pingbacks and trackbacks
    add_filter('xmlrpc_enabled', '__return_false');
    add_filter('wp_headers', 'disable_x_pingback');
    add_filter('pings_open', '__return_false', 20, 2);
    
    // Remove WordPress version
    remove_action('wp_head', 'wp_generator');
    add_filter('the_generator', '__return_empty_string');
    
    // Disable emojis
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
    
    // Disable embeds
    add_action('init', function() {
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_oembed_add_host_js');
    }, PHP_INT_MAX - 1);
    
    // Disable RSS feeds
    add_action('do_feed', 'disable_feed', 1);
    add_action('do_feed_rdf', 'disable_feed', 1);
    add_action('do_feed_rss', 'disable_feed', 1);
    add_action('do_feed_rss2', 'disable_feed', 1);
    add_action('do_feed_atom', 'disable_feed', 1);
    
    // Remove feed links from head
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'feed_links', 2);
}
add_action('init', 'disable_wordpress_features');

function disable_x_pingback($headers) {
    unset($headers['X-Pingback']);
    return $headers;
}

function disable_feed() {
    wp_die(__('No feed available. This is a headless WordPress installation.'));
}

// Disable comments completely
function disable_comments_post_types_support() {
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
}
add_action('admin_init', 'disable_comments_post_types_support');

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});

// Configure CORS for GraphQL endpoint
add_action('graphql_init', function() {
    // Skip if headers already sent
    if (headers_sent()) {
        return;
    }
    
    // Get the frontend URL from environment or default to localhost
    $allowed_origin = defined('FRONTEND_URL') ? FRONTEND_URL : 'http://localhost:3000';
    
    header('Access-Control-Allow-Origin: ' . $allowed_origin);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    
    // Handle preflight requests
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
});

// Add JWT authentication support for GraphQL
add_filter('graphql_jwt_auth_secret_key', function() {
    return defined('GRAPHQL_JWT_AUTH_SECRET_KEY') ? GRAPHQL_JWT_AUTH_SECRET_KEY : 'your-secret-key';
});

// Customize GraphQL schema
add_action('graphql_register_types', function() {
    // Add custom fields to User type for authentication
    register_graphql_field('User', 'isActive', [
        'type' => 'Boolean',
        'description' => 'Whether the user account is active',
        'resolve' => function($user) {
            return get_user_meta($user->ID, 'is_active', true) !== 'false';
        }
    ]);
    
    // Add custom fields for makers
    register_graphql_field('Maker', 'profileCompleteness', [
        'type' => 'Int',
        'description' => 'Profile completeness percentage',
        'resolve' => function($maker) {
            $fields = ['makerBio', 'makerLocation', 'profileImage', 'makerSpecialties'];
            $completed = 0;
            
            foreach ($fields as $field) {
                if (!empty(get_field($field, $maker->ID))) {
                    $completed++;
                }
            }
            
            return round(($completed / count($fields)) * 100);
        }
    ]);
});

// Disable REST API for non-authenticated users (keep GraphQL only)
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    
    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'You are not currently logged in.', array('status' => 401));
    }
    
    return $result;
});

// Add security headers
add_action('send_headers', function() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: no-referrer-when-downgrade');
});

// Hide WordPress version from various places
add_filter('style_loader_src', 'remove_version_from_assets', 9999);
add_filter('script_loader_src', 'remove_version_from_assets', 9999);

function remove_version_from_assets($src) {
    if (strpos($src, 'ver=' . get_bloginfo('version'))) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

// Add GraphQL query logging for development
if (defined('WP_DEBUG') && WP_DEBUG) {
    add_action('graphql_execute', function($response, $schema, $operation, $query, $variables) {
        if (!empty($operation)) {
            error_log('GraphQL Operation: ' . $operation);
        }
        if (!empty($variables)) {
            error_log('Variables: ' . json_encode($variables));
        }
    }, 10, 5);
}

// Media handling for headless setup
add_filter('wp_get_attachment_image_src', function($image, $attachment_id, $size, $icon) {
    // Ensure full URLs for images in GraphQL responses
    if ($image && isset($image[0])) {
        $image[0] = str_replace('/backend', '', $image[0]);
    }
    return $image;
}, 10, 4);

// Add custom image sizes for responsive images
add_action('after_setup_theme', function() {
    add_image_size('thumbnail-mobile', 400, 300, true);
    add_image_size('thumbnail-tablet', 800, 600, true);
    add_image_size('thumbnail-desktop', 1200, 900, true);
    add_image_size('hero-mobile', 768, 400, true);
    add_image_size('hero-tablet', 1024, 600, true);
    add_image_size('hero-desktop', 1920, 1080, true);
});