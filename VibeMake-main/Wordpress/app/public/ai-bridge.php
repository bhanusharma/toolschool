<?php
/**
 * AI Bridge - WordPress API for AI Agents
 * 
 * Place this file in WordPress root: /Users/bhanu/Vibe&Make - WP Local/app/public/ai-bridge.php
 * Access via: http://vibemake.local/ai-bridge.php
 * 
 * Security: Uses a secret key for authentication
 * Returns: JSON responses for all operations
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Security check
$key = $_REQUEST['key'] ?? '';
if ($key !== 'vibemake-ai-2025-secret') {
    http_response_code(403);
    die(json_encode(['success' => false, 'error' => 'Invalid key']));
}

// Load WordPress
require_once('wp-load.php');

// Set current user as admin
wp_set_current_user(1);

// Get action and data
$action = $_REQUEST['action'] ?? '';
$data = json_decode($_REQUEST['data'] ?? '{}', true);

// Helper function to set ACF fields
function set_acf_fields($post_id, $fields) {
    if (!function_exists('update_field')) {
        return false;
    }
    
    foreach ($fields as $field_key => $value) {
        update_field($field_key, $value, $post_id);
    }
    return true;
}

// Helper function to set taxonomies
function set_taxonomies($post_id, $taxonomies) {
    foreach ($taxonomies as $taxonomy => $terms) {
        wp_set_post_terms($post_id, $terms, $taxonomy);
    }
}

// Process actions
switch ($action) {
    case 'create_tool':
        $post_data = [
            'post_title' => $data['title'] ?? '',
            'post_content' => $data['content'] ?? '',
            'post_excerpt' => $data['excerpt'] ?? '',
            'post_type' => 'tool',
            'post_status' => $data['status'] ?? 'publish'
        ];
        
        $post_id = wp_insert_post($post_data);
        
        if (!is_wp_error($post_id)) {
            // Set ACF fields if provided
            if (isset($data['fields'])) {
                set_acf_fields($post_id, $data['fields']);
            }
            
            // Set taxonomies if provided
            if (isset($data['taxonomies'])) {
                set_taxonomies($post_id, $data['taxonomies']);
            }
            
            echo json_encode([
                'success' => true,
                'post_id' => $post_id,
                'message' => 'Tool created successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => $post_id->get_error_message()
            ]);
        }
        break;
        
    case 'update_tool':
        $post_id = $data['post_id'] ?? 0;
        
        if (!$post_id) {
            // Try to find by title
            $existing = get_page_by_title($data['title'] ?? '', OBJECT, 'tool');
            if ($existing) {
                $post_id = $existing->ID;
            }
        }
        
        if ($post_id) {
            // Update post data
            $update_data = ['ID' => $post_id];
            if (isset($data['title'])) $update_data['post_title'] = $data['title'];
            if (isset($data['content'])) $update_data['post_content'] = $data['content'];
            if (isset($data['excerpt'])) $update_data['post_excerpt'] = $data['excerpt'];
            
            $result = wp_update_post($update_data);
            
            if (!is_wp_error($result)) {
                // Update ACF fields
                if (isset($data['fields'])) {
                    set_acf_fields($post_id, $data['fields']);
                }
                
                // Update taxonomies
                if (isset($data['taxonomies'])) {
                    set_taxonomies($post_id, $data['taxonomies']);
                }
                
                echo json_encode([
                    'success' => true,
                    'post_id' => $post_id,
                    'message' => 'Tool updated successfully'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'error' => $result->get_error_message()
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Tool not found'
            ]);
        }
        break;
        
    case 'get_tool':
        $post_id = $data['post_id'] ?? 0;
        $title = $data['title'] ?? '';
        
        if (!$post_id && $title) {
            $post = get_page_by_title($title, OBJECT, 'tool');
        } else {
            $post = get_post($post_id);
        }
        
        if ($post) {
            $fields = get_fields($post->ID);
            $categories = wp_get_post_terms($post->ID, 'tool_category', ['fields' => 'names']);
            
            echo json_encode([
                'success' => true,
                'tool' => [
                    'id' => $post->ID,
                    'title' => $post->post_title,
                    'content' => $post->post_content,
                    'excerpt' => $post->post_excerpt,
                    'fields' => $fields,
                    'categories' => $categories
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Tool not found'
            ]);
        }
        break;
        
    case 'list_tools':
        $args = [
            'post_type' => 'tool',
            'posts_per_page' => $data['limit'] ?? -1,
            'orderby' => $data['orderby'] ?? 'title',
            'order' => $data['order'] ?? 'ASC'
        ];
        
        if (isset($data['category'])) {
            $args['tax_query'] = [[
                'taxonomy' => 'tool_category',
                'field' => 'slug',
                'terms' => $data['category']
            ]];
        }
        
        $tools = get_posts($args);
        $result = [];
        
        foreach ($tools as $tool) {
            $result[] = [
                'id' => $tool->ID,
                'title' => $tool->post_title,
                'excerpt' => $tool->post_excerpt,
                'website' => get_field('tool_website', $tool->ID),
                'featured' => get_field('tool_featured', $tool->ID)
            ];
        }
        
        echo json_encode([
            'success' => true,
            'count' => count($result),
            'tools' => $result
        ]);
        break;
        
    case 'batch_import':
        $tools = $data['tools'] ?? [];
        $results = [];
        
        foreach ($tools as $tool_data) {
            $existing = get_page_by_title($tool_data['title'], OBJECT, 'tool');
            
            if ($existing) {
                $results[] = [
                    'title' => $tool_data['title'],
                    'status' => 'skipped',
                    'message' => 'Already exists',
                    'id' => $existing->ID
                ];
                continue;
            }
            
            $post_id = wp_insert_post([
                'post_title' => $tool_data['title'],
                'post_content' => $tool_data['content'] ?? '',
                'post_excerpt' => $tool_data['excerpt'] ?? '',
                'post_type' => 'tool',
                'post_status' => 'publish'
            ]);
            
            if (!is_wp_error($post_id)) {
                // Set fields
                if (isset($tool_data['fields'])) {
                    set_acf_fields($post_id, $tool_data['fields']);
                }
                
                // Set taxonomies
                if (isset($tool_data['taxonomies'])) {
                    set_taxonomies($post_id, $tool_data['taxonomies']);
                }
                
                $results[] = [
                    'title' => $tool_data['title'],
                    'status' => 'created',
                    'id' => $post_id
                ];
            } else {
                $results[] = [
                    'title' => $tool_data['title'],
                    'status' => 'error',
                    'error' => $post_id->get_error_message()
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'results' => $results
        ]);
        break;
        
    case 'delete_tool':
        $post_id = $data['post_id'] ?? 0;
        
        if (!$post_id && isset($data['title'])) {
            $existing = get_page_by_title($data['title'], OBJECT, 'tool');
            if ($existing) {
                $post_id = $existing->ID;
            }
        }
        
        if ($post_id) {
            $result = wp_delete_post($post_id, true);
            echo json_encode([
                'success' => (bool)$result,
                'message' => $result ? 'Tool deleted' : 'Failed to delete'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Tool not found'
            ]);
        }
        break;
        
    case 'get_categories':
        $categories = get_terms([
            'taxonomy' => 'tool_category',
            'hide_empty' => false
        ]);
        
        $result = [];
        foreach ($categories as $cat) {
            $result[] = [
                'id' => $cat->term_id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'count' => $cat->count
            ];
        }
        
        echo json_encode([
            'success' => true,
            'categories' => $result
        ]);
        break;
        
    case 'status':
        $tool_count = wp_count_posts('tool');
        echo json_encode([
            'success' => true,
            'status' => 'active',
            'tools' => [
                'published' => $tool_count->publish,
                'draft' => $tool_count->draft,
                'total' => $tool_count->publish + $tool_count->draft
            ],
            'wordpress_version' => get_bloginfo('version'),
            'php_version' => phpversion()
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Unknown action',
            'available_actions' => [
                'create_tool',
                'update_tool',
                'get_tool',
                'list_tools',
                'batch_import',
                'delete_tool',
                'get_categories',
                'status'
            ]
        ]);
}
?>