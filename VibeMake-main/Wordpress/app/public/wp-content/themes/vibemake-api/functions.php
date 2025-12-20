<?php
/**
 * VibeMake API Theme Functions
 * 
 * This file contains all the custom functionality for the headless WordPress theme.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add CORS headers for GraphQL
 */
add_action('graphql_init', function() {
    // Only add CORS headers in local development
    if (defined('WP_DEBUG') && WP_DEBUG) {
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

/**
 * Theme Setup
 */
add_action('after_setup_theme', 'vibemake_theme_setup');
function vibemake_theme_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    
    // Remove unnecessary WordPress features for headless setup
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_resource_hints', 2);
    
    // Disable XML-RPC
    add_filter('xmlrpc_enabled', '__return_false');
    
    // Enable SVG uploads
    add_filter('wp_check_filetype_and_ext', 'vibemake_allow_svg_upload', 10, 4);
    add_filter('upload_mimes', 'vibemake_add_svg_mime_type');
    
    // Register navigation menus (for API access)
    register_nav_menus([
        'primary' => __('Primary Menu', 'vibemake-api'),
        'footer' => __('Footer Menu', 'vibemake-api'),
    ]);
}

/**
 * Include Headless WordPress Configuration
 */
require_once get_template_directory() . '/functions-headless.php';

/**
 * Include Custom Post Types and Taxonomies
 */
require_once get_template_directory() . '/functions-cpt.php';

/**
 * Include ACF Field Groups
 */
require_once get_template_directory() . '/functions-acf.php';

/**
 * Include Seeders for Initial Data
 */
if (file_exists(get_template_directory() . '/includes/seeders/creation-types-seeder.php')) {
    require_once get_template_directory() . '/includes/seeders/creation-types-seeder.php';
}

if (file_exists(get_template_directory() . '/includes/seeders/user-situations-seeder.php')) {
    require_once get_template_directory() . '/includes/seeders/user-situations-seeder.php';
}

if (file_exists(get_template_directory() . '/includes/seeders/example-difficulty-seeder.php')) {
    require_once get_template_directory() . '/includes/seeders/example-difficulty-seeder.php';
}

/**
 * Include AI Tools Import functionality
 */
if (file_exists(get_template_directory() . '/functions-import-tools.php')) {
    require_once get_template_directory() . '/functions-import-tools.php';
}

/**
 * CORS Headers for API
 * Note: CORS for GraphQL is handled in functions-headless.php
 */
// Commented out to avoid conflicts with headless configuration
// add_action('rest_api_init', 'vibemake_add_cors_headers');
// function vibemake_add_cors_headers() {
//     remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
//     add_filter('rest_pre_serve_request', function($value) {
//         $origin = get_http_origin();
//         $allowed_origins = [
//             'http://localhost:3000',
//             'http://localhost:8080',
//             // Add production domains here
//         ];
        
//         if (in_array($origin, $allowed_origins)) {
//             header('Access-Control-Allow-Origin: ' . $origin);
//         }
        
//         header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//         header('Access-Control-Allow-Credentials: true');
//         header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        
//         if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//             status_header(200);
//             exit();
//         }
        
//         return $value;
//     });
// }

/**
 * Custom Post Types Registration
 * Note: Moved to functions-cpt.php for better organization
 */
// Include the CPT registration file
if (file_exists(get_template_directory() . '/functions-cpt.php')) {
    require_once get_template_directory() . '/functions-cpt.php';
}

// Legacy function kept for compatibility but disabled to avoid conflicts
if (false) { // Disabled
add_action('init', 'vibemake_register_post_types');
function vibemake_register_post_types() {
    // Register AI Projects Post Type
    register_post_type('ai_project', [
        'labels' => [
            'name' => __('AI Projects', 'vibemake-api'),
            'singular_name' => __('AI Project', 'vibemake-api'),
            'add_new' => __('Add New Project', 'vibemake-api'),
            'add_new_item' => __('Add New AI Project', 'vibemake-api'),
            'edit_item' => __('Edit AI Project', 'vibemake-api'),
            'new_item' => __('New AI Project', 'vibemake-api'),
            'view_item' => __('View AI Project', 'vibemake-api'),
            'search_items' => __('Search AI Projects', 'vibemake-api'),
            'not_found' => __('No AI projects found', 'vibemake-api'),
            'not_found_in_trash' => __('No AI projects found in trash', 'vibemake-api'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'aiProject',
        'graphql_plural_name' => 'aiProjects',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'author'],
        'menu_icon' => 'dashicons-lightbulb',
        'rewrite' => ['slug' => 'ai-projects'],
    ]);

    // Register Makers Post Type
    register_post_type('maker', [
        'labels' => [
            'name' => __('Makers', 'vibemake-api'),
            'singular_name' => __('Maker', 'vibemake-api'),
            'add_new' => __('Add New Maker', 'vibemake-api'),
            'add_new_item' => __('Add New Maker', 'vibemake-api'),
            'edit_item' => __('Edit Maker', 'vibemake-api'),
            'new_item' => __('New Maker', 'vibemake-api'),
            'view_item' => __('View Maker', 'vibemake-api'),
            'search_items' => __('Search Makers', 'vibemake-api'),
            'not_found' => __('No makers found', 'vibemake-api'),
            'not_found_in_trash' => __('No makers found in trash', 'vibemake-api'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'maker',
        'graphql_plural_name' => 'makers',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-admin-users',
        'rewrite' => ['slug' => 'makers'],
    ]);

    // Register Community Projects Post Type
    register_post_type('community_project', [
        'labels' => [
            'name' => __('Community Projects', 'vibemake-api'),
            'singular_name' => __('Community Project', 'vibemake-api'),
            'add_new' => __('Add New Project', 'vibemake-api'),
            'add_new_item' => __('Add New Community Project', 'vibemake-api'),
            'edit_item' => __('Edit Community Project', 'vibemake-api'),
            'new_item' => __('New Community Project', 'vibemake-api'),
            'view_item' => __('View Community Project', 'vibemake-api'),
            'search_items' => __('Search Community Projects', 'vibemake-api'),
            'not_found' => __('No community projects found', 'vibemake-api'),
            'not_found_in_trash' => __('No community projects found in trash', 'vibemake-api'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'communityProject',
        'graphql_plural_name' => 'communityProjects',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'author'],
        'menu_icon' => 'dashicons-groups',
        'rewrite' => ['slug' => 'community-projects'],
    ]);

    // Keep existing Vibe Post Type for legacy content
    register_post_type('vibe', [
        'labels' => [
            'name' => __('Vibes', 'vibemake-api'),
            'singular_name' => __('Vibe', 'vibemake-api'),
            'add_new' => __('Add New Vibe', 'vibemake-api'),
            'add_new_item' => __('Add New Vibe', 'vibemake-api'),
            'edit_item' => __('Edit Vibe', 'vibemake-api'),
            'new_item' => __('New Vibe', 'vibemake-api'),
            'view_item' => __('View Vibe', 'vibemake-api'),
            'search_items' => __('Search Vibes', 'vibemake-api'),
            'not_found' => __('No vibes found', 'vibemake-api'),
            'not_found_in_trash' => __('No vibes found in trash', 'vibemake-api'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'vibe',
        'graphql_plural_name' => 'vibes',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'author'],
        'menu_icon' => 'dashicons-format-audio',
        'rewrite' => ['slug' => 'vibes'],
    ]);
}
} // End of disabled function

/**
 * Custom Taxonomies Registration
 * Note: Moved to functions-cpt.php for better organization
 */
// Legacy function kept for compatibility but disabled to avoid conflicts
if (false) { // Disabled
add_action('init', 'vibemake_register_taxonomies');
function vibemake_register_taxonomies() {
    // Register Project Category Taxonomy (for AI Projects)
    register_taxonomy('project_category', ['ai_project'], [
        'labels' => [
            'name' => __('Project Categories', 'vibemake-api'),
            'singular_name' => __('Project Category', 'vibemake-api'),
            'search_items' => __('Search Categories', 'vibemake-api'),
            'all_items' => __('All Categories', 'vibemake-api'),
            'edit_item' => __('Edit Category', 'vibemake-api'),
            'update_item' => __('Update Category', 'vibemake-api'),
            'add_new_item' => __('Add New Category', 'vibemake-api'),
            'new_item_name' => __('New Category Name', 'vibemake-api'),
            'menu_name' => __('Categories', 'vibemake-api'),
        ],
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'projectCategory',
        'graphql_plural_name' => 'projectCategories',
        'rewrite' => ['slug' => 'project-category'],
    ]);

    // Register Maker Specialty Taxonomy
    register_taxonomy('maker_specialty', ['maker'], [
        'labels' => [
            'name' => __('Specialties', 'vibemake-api'),
            'singular_name' => __('Specialty', 'vibemake-api'),
            'search_items' => __('Search Specialties', 'vibemake-api'),
            'all_items' => __('All Specialties', 'vibemake-api'),
            'edit_item' => __('Edit Specialty', 'vibemake-api'),
            'update_item' => __('Update Specialty', 'vibemake-api'),
            'add_new_item' => __('Add New Specialty', 'vibemake-api'),
            'new_item_name' => __('New Specialty Name', 'vibemake-api'),
            'menu_name' => __('Specialties', 'vibemake-api'),
        ],
        'hierarchical' => false,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'makerSpecialty',
        'graphql_plural_name' => 'makerSpecialties',
        'rewrite' => ['slug' => 'specialty'],
    ]);

    // Register Community Project Type Taxonomy
    register_taxonomy('community_type', ['community_project'], [
        'labels' => [
            'name' => __('Community Types', 'vibemake-api'),
            'singular_name' => __('Community Type', 'vibemake-api'),
            'search_items' => __('Search Types', 'vibemake-api'),
            'all_items' => __('All Types', 'vibemake-api'),
            'edit_item' => __('Edit Type', 'vibemake-api'),
            'update_item' => __('Update Type', 'vibemake-api'),
            'add_new_item' => __('Add New Type', 'vibemake-api'),
            'new_item_name' => __('New Type Name', 'vibemake-api'),
            'menu_name' => __('Types', 'vibemake-api'),
        ],
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'communityType',
        'graphql_plural_name' => 'communityTypes',
        'rewrite' => ['slug' => 'community-type'],
    ]);

    // Register News Category (for posts)
    register_taxonomy('news_category', ['post'], [
        'labels' => [
            'name' => __('News Categories', 'vibemake-api'),
            'singular_name' => __('News Category', 'vibemake-api'),
            'search_items' => __('Search Categories', 'vibemake-api'),
            'all_items' => __('All Categories', 'vibemake-api'),
            'edit_item' => __('Edit Category', 'vibemake-api'),
            'update_item' => __('Update Category', 'vibemake-api'),
            'add_new_item' => __('Add New Category', 'vibemake-api'),
            'new_item_name' => __('New Category Name', 'vibemake-api'),
            'menu_name' => __('News Categories', 'vibemake-api'),
        ],
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'newsCategory',
        'graphql_plural_name' => 'newsCategories',
        'rewrite' => ['slug' => 'news-category'],
    ]);

    // Keep existing taxonomies for legacy content
    // Register Vibe Category Taxonomy
    register_taxonomy('vibe_category', ['vibe'], [
        'labels' => [
            'name' => __('Vibe Categories', 'vibemake-api'),
            'singular_name' => __('Vibe Category', 'vibemake-api'),
            'search_items' => __('Search Categories', 'vibemake-api'),
            'all_items' => __('All Categories', 'vibemake-api'),
            'edit_item' => __('Edit Category', 'vibemake-api'),
            'update_item' => __('Update Category', 'vibemake-api'),
            'add_new_item' => __('Add New Category', 'vibemake-api'),
            'new_item_name' => __('New Category Name', 'vibemake-api'),
            'menu_name' => __('Categories', 'vibemake-api'),
        ],
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'vibeCategory',
        'graphql_plural_name' => 'vibeCategories',
        'rewrite' => ['slug' => 'vibe-category'],
    ]);
    
    // Register Mood Taxonomy
    register_taxonomy('mood', ['vibe'], [
        'labels' => [
            'name' => __('Moods', 'vibemake-api'),
            'singular_name' => __('Mood', 'vibemake-api'),
            'search_items' => __('Search Moods', 'vibemake-api'),
            'all_items' => __('All Moods', 'vibemake-api'),
            'edit_item' => __('Edit Mood', 'vibemake-api'),
            'update_item' => __('Update Mood', 'vibemake-api'),
            'add_new_item' => __('Add New Mood', 'vibemake-api'),
            'new_item_name' => __('New Mood Name', 'vibemake-api'),
            'menu_name' => __('Moods', 'vibemake-api'),
        ],
        'hierarchical' => false,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'mood',
        'graphql_plural_name' => 'moods',
        'rewrite' => ['slug' => 'mood'],
    ]);
}
} // End of disabled function

/**
 * SVG Upload Support Functions
 */
function vibemake_allow_svg_upload($data, $file, $filename, $mimes) {
    $filetype = wp_check_filetype($filename, $mimes);
    return [
        'ext' => $filetype['ext'],
        'type' => $filetype['type'],
        'proper_filename' => $data['proper_filename']
    ];
}

function vibemake_add_svg_mime_type($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

/**
 * Extend REST API
 */
add_action('rest_api_init', 'vibemake_extend_rest_api');
function vibemake_extend_rest_api() {
    // Add custom fields to REST API responses
    register_rest_field('vibe', 'featured_image_url', [
        'get_callback' => function($post) {
            return get_the_post_thumbnail_url($post['id'], 'full');
        },
        'schema' => [
            'type' => 'string',
            'description' => 'Featured image URL',
        ],
    ]);
}

/**
 * Admin Customizations
 */
add_action('admin_menu', 'vibemake_admin_menu');
function vibemake_admin_menu() {
    // Add custom admin pages if needed
}

/**
 * Security Enhancements
 */
add_filter('rest_authentication_errors', 'vibemake_rest_authentication');
function vibemake_rest_authentication($result) {
    // Custom authentication logic can be added here
    return $result;
}

/**
 * Performance Optimizations
 */
add_action('init', 'vibemake_performance_optimizations');
function vibemake_performance_optimizations() {
    // Disable WordPress frontend queries for better performance
    if (!is_admin() && !defined('WP_CLI')) {
        // Disable feed generation
        remove_action('wp_head', 'feed_links_extra', 3);
        remove_action('wp_head', 'feed_links', 2);
        
        // Disable comments feed
        add_filter('feed_links_show_comments_feed', '__return_false');
    }
}

/**
 * Include ACF configuration if available
 */
if (file_exists(get_template_directory() . '/functions-acf.php')) {
    require_once get_template_directory() . '/functions-acf.php';
}

// Handle featured project in hero banner - ensure only one can be featured
add_action('acf/save_post', 'vibemake_handle_featured_projects', 20);
function vibemake_handle_featured_projects($post_id) {
    // Check if we're saving a community project (unified projects post type)
    if (get_post_type($post_id) !== 'community_project') {
        return;
    }
    
    // Handle Hero Banner featured flag
    $is_featured_hero = get_field('featured_in_hero', $post_id);
    if ($is_featured_hero) {
        // Unfeature all other projects from hero automatically
        $args = array(
            'post_type' => 'community_project',
            'posts_per_page' => -1,
            'post__not_in' => array($post_id),
            'meta_query' => array(
                array(
                    'key' => 'featured_in_hero',
                    'value' => '1',
                    'compare' => '='
                )
            )
        );
        
        $featured_projects = get_posts($args);
        foreach ($featured_projects as $project) {
            update_field('featured_in_hero', false, $project->ID);
        }
    }
    
    // Handle Showcase featured flag
    $is_featured_showcase = get_field('featured_in_showcase', $post_id);
    if ($is_featured_showcase) {
        // Unfeature all other projects from showcase automatically
        $args = array(
            'post_type' => 'community_project',
            'posts_per_page' => -1,
            'post__not_in' => array($post_id),
            'meta_query' => array(
                array(
                    'key' => 'featured_in_showcase',
                    'value' => '1',
                    'compare' => '='
                )
            )
        );
        
        $featured_projects = get_posts($args);
        foreach ($featured_projects as $project) {
            update_field('featured_in_showcase', false, $project->ID);
        }
    }
}

// Handle featured makers in homepage slider - ensure positions are unique
add_action('acf/save_post', 'vibemake_handle_featured_makers', 20);
function vibemake_handle_featured_makers($post_id) {
    // Check if we're saving a maker
    if (get_post_type($post_id) !== 'maker') {
        return;
    }
    
    $is_featured = get_field('featured_maker', $post_id);
    $new_position = get_field('featured_position', $post_id);
    
    if ($is_featured && $new_position) {
        // Check if another maker already has this position
        $args = array(
            'post_type' => 'maker',
            'posts_per_page' => -1,
            'post__not_in' => array($post_id),
            'meta_query' => array(
                'relation' => 'AND',
                array(
                    'key' => 'featured_maker',
                    'value' => '1',
                    'compare' => '='
                ),
                array(
                    'key' => 'featured_position',
                    'value' => $new_position,
                    'compare' => '='
                )
            )
        );
        
        $conflicting_makers = get_posts($args);
        
        if (!empty($conflicting_makers)) {
            // Find the next available position
            $all_featured_args = array(
                'post_type' => 'maker',
                'posts_per_page' => -1,
                'post__not_in' => array($post_id),
                'meta_query' => array(
                    array(
                        'key' => 'featured_maker',
                        'value' => '1',
                        'compare' => '='
                    )
                )
            );
            
            $all_featured_makers = get_posts($all_featured_args);
            $used_positions = array();
            
            foreach ($all_featured_makers as $maker) {
                $pos = get_field('featured_position', $maker->ID);
                if ($pos) {
                    $used_positions[] = (int)$pos;
                }
            }
            
            // Add the new position to used positions
            $used_positions[] = (int)$new_position;
            $used_positions = array_unique($used_positions);
            sort($used_positions);
            
            // Find next available position for conflicting makers
            $next_available = 1;
            for ($i = 1; $i <= 10; $i++) {
                if (!in_array($i, $used_positions)) {
                    $next_available = $i;
                    break;
                }
            }
            
            // Move conflicting makers to available positions
            foreach ($conflicting_makers as $conflicting_maker) {
                // Find next available position
                while (in_array($next_available, $used_positions)) {
                    $next_available++;
                    if ($next_available > 10) {
                        // If we exceed 10, unfeature the conflicting maker
                        update_field('featured_maker', false, $conflicting_maker->ID);
                        update_field('featured_position', '', $conflicting_maker->ID);
                        continue 2;
                    }
                }
                
                update_field('featured_position', $next_available, $conflicting_maker->ID);
                $used_positions[] = $next_available;
                $next_available++;
            }
        }
    } elseif (!$is_featured) {
        // If not featured, clear the position
        update_field('featured_position', '', $post_id);
    }
}

/**
 * Include sample data (temporary - remove after initial population)
 */
// Temporarily disabled - needs ACF to be installed first
// if (file_exists(get_template_directory() . '/includes/sample-data/tools-data.php')) {
//     require_once get_template_directory() . '/includes/sample-data/tools-data.php';
// }

/**
 * Custom Fields Registration (ACF Support) - Legacy, moved to functions-acf.php
 */
// Disabled to avoid conflicts with functions-acf.php
if (false) {
add_action('acf/init', 'vibemake_register_acf_fields_legacy');
function vibemake_register_acf_fields_legacy() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    // AI Project Fields
    acf_add_local_field_group([
        'key' => 'group_ai_project_fields',
        'title' => 'AI Project Details',
        'fields' => [
            [
                'key' => 'field_project_year',
                'label' => 'Project Year',
                'name' => 'project_year',
                'type' => 'number',
                'default_value' => date('Y'),
            ],
            [
                'key' => 'field_project_author',
                'label' => 'Project Author',
                'name' => 'project_author',
                'type' => 'text',
            ],
            [
                'key' => 'field_tools_used',
                'label' => 'Tools Used',
                'name' => 'tools_used',
                'type' => 'repeater',
                'sub_fields' => [
                    [
                        'key' => 'field_tool_name',
                        'label' => 'Tool Name',
                        'name' => 'tool_name',
                        'type' => 'text',
                    ],
                    [
                        'key' => 'field_tool_icon',
                        'label' => 'Tool Icon',
                        'name' => 'tool_icon',
                        'type' => 'image',
                    ],
                ],
            ],
            [
                'key' => 'field_project_url',
                'label' => 'Project URL',
                'name' => 'project_url',
                'type' => 'url',
            ],
            [
                'key' => 'field_hero_background',
                'label' => 'Hero Background Image',
                'name' => 'hero_background',
                'type' => 'image',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'ai_project',
                ],
            ],
        ],
    ]);

    // Maker Fields
    acf_add_local_field_group([
        'key' => 'group_maker_fields',
        'title' => 'Maker Details',
        'fields' => [
            [
                'key' => 'field_maker_location',
                'label' => 'Location',
                'name' => 'maker_location',
                'type' => 'text',
            ],
            [
                'key' => 'field_maker_bio',
                'label' => 'Biography',
                'name' => 'maker_bio',
                'type' => 'textarea',
            ],
            [
                'key' => 'field_profile_image',
                'label' => 'Profile Image',
                'name' => 'profile_image',
                'type' => 'image',
            ],
            [
                'key' => 'field_background_image',
                'label' => 'Background Image',
                'name' => 'background_image',
                'type' => 'image',
            ],
            [
                'key' => 'field_social_links',
                'label' => 'Social Links',
                'name' => 'social_links',
                'type' => 'repeater',
                'sub_fields' => [
                    [
                        'key' => 'field_social_platform',
                        'label' => 'Platform',
                        'name' => 'social_platform',
                        'type' => 'text',
                    ],
                    [
                        'key' => 'field_social_url',
                        'label' => 'URL',
                        'name' => 'social_url',
                        'type' => 'url',
                    ],
                ],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'maker',
                ],
            ],
        ],
    ]);

    // Community Project Fields
    acf_add_local_field_group([
        'key' => 'group_community_project_fields',
        'title' => 'Community Project Details',
        'fields' => [
            [
                'key' => 'field_project_views',
                'label' => 'View Count',
                'name' => 'project_views',
                'type' => 'number',
                'default_value' => 0,
            ],
            [
                'key' => 'field_project_tools',
                'label' => 'Tools/Platform Used',
                'name' => 'project_tools',
                'type' => 'text',
            ],
            [
                'key' => 'field_project_media',
                'label' => 'Additional Media',
                'name' => 'project_media',
                'type' => 'gallery',
            ],
            [
                'key' => 'field_audio_file',
                'label' => 'Audio File',
                'name' => 'audio_file',
                'type' => 'file',
                'mime_types' => 'mp3,wav,ogg',
            ],
            [
                'key' => 'field_video_file',
                'label' => 'Video File',
                'name' => 'video_file',
                'type' => 'file',
                'mime_types' => 'mp4,webm,mov',
            ],
            [
                'key' => 'field_duration',
                'label' => 'Duration (for audio/video)',
                'name' => 'duration',
                'type' => 'text',
                'placeholder' => '2:39',
            ],
            [
                'key' => 'field_genre',
                'label' => 'Genre/Category',
                'name' => 'genre',
                'type' => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'community_project',
                ],
            ],
        ],
    ]);

    // News Article Fields (for posts)
    acf_add_local_field_group([
        'key' => 'group_news_fields',
        'title' => 'News Article Details',
        'fields' => [
            [
                'key' => 'field_article_category_badge',
                'label' => 'Category Badge',
                'name' => 'article_category_badge',
                'type' => 'text',
                'placeholder' => 'TRENDING, NEW RELEASE, etc.',
            ],
            [
                'key' => 'field_publication_date_override',
                'label' => 'Publication Date Override',
                'name' => 'publication_date_override',
                'type' => 'date_picker',
                'display_format' => 'j M, Y',
                'return_format' => 'j M, Y',
            ],
            [
                'key' => 'field_featured_priority',
                'label' => 'Featured Priority',
                'name' => 'featured_priority',
                'type' => 'number',
                'instructions' => 'Higher numbers appear first in featured sections',
                'default_value' => 0,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                ],
            ],
        ],
    ]);
}
} // End disabled function

/**
 * GraphQL Customizations
 */
add_action('graphql_register_types', 'vibemake_graphql_register_fields');
function vibemake_graphql_register_fields() {
    // Register custom GraphQL fields for Projects (unified from AI Projects and Community Projects)
    register_graphql_fields('CommunityProject', [
        // Fields from AI Projects
        'projectYear' => [
            'type' => 'String',
            'description' => 'The year the project was created',
            'resolve' => function($post) {
                return get_field('project_year', $post->ID);
            }
        ],
        'projectAuthor' => [
            'type' => 'String',
            'description' => 'The author of the project',
            'resolve' => function($post) {
                return get_field('project_author', $post->ID);
            }
        ],
        'projectWorkflow' => [
            'type' => 'String',
            'description' => 'The workflow used to create the project',
            'resolve' => function($post) {
                return get_field('project_workflow', $post->ID);
            }
        ],
        'projectDifficulty' => [
            'type' => 'String',
            'description' => 'The difficulty level of the project',
            'resolve' => function($post) {
                return get_field('project_difficulty', $post->ID);
            }
        ],
        'projectTimeSpent' => [
            'type' => 'String',
            'description' => 'Time spent on the project',
            'resolve' => function($post) {
                return get_field('project_time_spent', $post->ID);
            }
        ],
        'toolsUsed' => [
            'type' => ['list_of' => 'ToolUsed'],
            'description' => 'Tools used in the project',
            'resolve' => function($post) {
                return get_field('tools_used', $post->ID) ?: [];
            }
        ],
        'projectUrl' => [
            'type' => 'String',
            'description' => 'URL to the live project',
            'resolve' => function($post) {
                return get_field('project_url', $post->ID);
            }
        ],
        'heroBackground' => [
            'type' => 'MediaItem',
            'description' => 'Hero background image',
            'resolve' => function($post) {
                $image_id = get_field('hero_background', $post->ID);
                return $image_id ? \WPGraphQL\Data\DataSource::resolve_post_object($image_id, 'attachment') : null;
            }
        ],
        'featuredInHero' => [
            'type' => 'Boolean',
            'description' => 'Whether this project is featured in the homepage hero banner',
            'resolve' => function($post) {
                return (bool) get_field('featured_in_hero', $post->ID);
            }
        ],
        'featuredInShowcase' => [
            'type' => 'Boolean',
            'description' => 'Whether this project is featured in the showcase section',
            'resolve' => function($post) {
                return (bool) get_field('featured_in_showcase', $post->ID);
            }
        ],
        // Fields from Community Projects
        'projectViews' => [
            'type' => 'Int',
            'description' => 'Number of views',
            'resolve' => function($post) {
                return (int) get_field('project_views', $post->ID);
            }
        ],
        'projectTools' => [
            'type' => 'String',
            'description' => 'Tools or platform used (simple text)',
            'resolve' => function($post) {
                return get_field('project_tools', $post->ID);
            }
        ],
        'projectDemoUrl' => [
            'type' => 'String',
            'description' => 'Demo URL',
            'resolve' => function($post) {
                return get_field('project_demo_url', $post->ID);
            }
        ],
        'projectGithubUrl' => [
            'type' => 'String',
            'description' => 'GitHub repository URL',
            'resolve' => function($post) {
                return get_field('project_github_url', $post->ID);
            }
        ],
        'duration' => [
            'type' => 'String',
            'description' => 'Duration for audio/video content',
            'resolve' => function($post) {
                return get_field('duration', $post->ID);
            }
        ],
        'genre' => [
            'type' => 'String',
            'description' => 'Genre or category',
            'resolve' => function($post) {
                return get_field('genre', $post->ID);
            }
        ],
        'audioFile' => [
            'type' => 'MediaItem',
            'description' => 'Audio file',
            'resolve' => function($post) {
                $file_id = get_field('audio_file', $post->ID);
                return $file_id ? \WPGraphQL\Data\DataSource::resolve_post_object($file_id, 'attachment') : null;
            }
        ],
        'videoFile' => [
            'type' => 'MediaItem',
            'description' => 'Video file',
            'resolve' => function($post) {
                $file_id = get_field('video_file', $post->ID);
                return $file_id ? \WPGraphQL\Data\DataSource::resolve_post_object($file_id, 'attachment') : null;
            }
        ],
        'projectMedia' => [
            'type' => ['list_of' => 'MediaItem'],
            'description' => 'Additional media gallery',
            'resolve' => function($post) {
                $media_ids = get_field('project_media', $post->ID);
                if (!$media_ids || !is_array($media_ids)) {
                    return [];
                }
                $media_items = [];
                foreach ($media_ids as $media_id) {
                    $item = \WPGraphQL\Data\DataSource::resolve_post_object($media_id, 'attachment');
                    if ($item) {
                        $media_items[] = $item;
                    }
                }
                return $media_items;
            }
        ],
        'projectSocialLinks' => [
            'type' => ['list_of' => 'SocialLink'],
            'description' => 'Project social media links',
            'resolve' => function($post) {
                return get_field('project_social_links', $post->ID) ?: [];
            }
        ],
    ]);

    // Register custom GraphQL fields for Makers
    register_graphql_fields('Maker', [
        'makerLocation' => [
            'type' => 'String',
            'description' => 'Maker location',
            'resolve' => function($post) {
                return get_field('maker_location', $post->ID);
            }
        ],
        'makerBio' => [
            'type' => 'String',
            'description' => 'Maker biography',
            'resolve' => function($post) {
                return get_field('maker_bio', $post->ID);
            }
        ],
        'profileImage' => [
            'type' => 'MediaItem',
            'description' => 'Profile image',
            'resolve' => function($post) {
                $image_id = get_field('profile_image', $post->ID);
                return $image_id ? \WPGraphQL\Data\DataSource::resolve_post_object($image_id, 'attachment') : null;
            }
        ],
        'backgroundImage' => [
            'type' => 'MediaItem',
            'description' => 'Background image',
            'resolve' => function($post) {
                $image_id = get_field('background_image', $post->ID);
                return $image_id ? \WPGraphQL\Data\DataSource::resolve_post_object($image_id, 'attachment') : null;
            }
        ],
        'socialLinks' => [
            'type' => ['list_of' => 'SocialLink'],
            'description' => 'Social media links',
            'resolve' => function($post) {
                return get_field('social_links', $post->ID) ?: [];
            }
        ],
    ]);

    // Register custom GraphQL types
    register_graphql_object_type('ToolUsed', [
        'description' => 'A tool used in a project',
        'fields' => [
            'toolName' => ['type' => 'String'],
            'toolIcon' => ['type' => 'MediaItem'],
        ],
    ]);

    register_graphql_object_type('SocialLink', [
        'description' => 'A social media link',
        'fields' => [
            'socialPlatform' => ['type' => 'String'],
            'socialUrl' => ['type' => 'String'],
        ],
    ]);
}

/**
 * Add custom GraphQL filtering for taxonomies
 */
add_action('graphql_register_types', 'vibemake_register_taxonomy_filters');
function vibemake_register_taxonomy_filters() {
    // Add communityTypeSlug field to CommunityProject where args
    register_graphql_field('RootQueryToCommunityProjectConnectionWhereArgs', 'communityTypeSlug', [
        'type' => ['list_of' => 'String'],
        'description' => __('Filter community projects by community type slug', 'vibemake-api'),
    ]);
    
    // Add toolCategorySlug field to Tool where args
    register_graphql_field('RootQueryToToolConnectionWhereArgs', 'toolCategorySlug', [
        'type' => ['list_of' => 'String'],
        'description' => __('Filter tools by category slug', 'vibemake-api'),
    ]);
}

// Apply the filtering logic for taxonomies
add_filter('graphql_post_object_connection_query_args', 'vibemake_apply_taxonomy_filters', 10, 5);
function vibemake_apply_taxonomy_filters($query_args, $source, $args, $context, $info) {
    // Handle Community Projects filtering by community type
    if (isset($args['where']['communityTypeSlug']) && $info->fieldName === 'communityProjects') {
        $query_args['tax_query'] = [
            [
                'taxonomy' => 'community_type',
                'field' => 'slug',
                'terms' => $args['where']['communityTypeSlug'],
                'operator' => 'IN'
            ]
        ];
    }
    
    // Handle Tools filtering by category
    if (isset($args['where']['toolCategorySlug']) && $info->fieldName === 'tools') {
        $query_args['tax_query'] = [
            [
                'taxonomy' => 'tool_category',
                'field' => 'slug',
                'terms' => $args['where']['toolCategorySlug'],
                'operator' => 'IN'
            ]
        ];
    }
    
    return $query_args;
}

// Enable REST API for Tools custom post type
add_filter('register_post_type_args', function($args, $post_type) {
    if ($post_type === 'tool') {
        $args['show_in_rest'] = true;
        $args['rest_base'] = 'tools';
        $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
    }
    return $args;
}, 10, 2);
