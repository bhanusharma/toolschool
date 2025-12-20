<?php
/**
 * Test script to fetch all tools from WordPress
 * Run this in the WordPress directory: php test-fetch-tools.php
 */

// Load WordPress
require_once(__DIR__ . '/Wordpress/app/public/wp-load.php');

// Get all tools
$args = array(
    'post_type' => 'tool',
    'post_status' => 'publish',
    'posts_per_page' => -1, // Get all tools
    'orderby' => 'title',
    'order' => 'ASC'
);

$tools_query = new WP_Query($args);

echo "Found " . $tools_query->found_posts . " tools\n";
echo "=====================================\n\n";

if ($tools_query->have_posts()) {
    while ($tools_query->have_posts()) {
        $tools_query->the_post();
        $post_id = get_the_ID();
        
        echo "Tool: " . get_the_title() . "\n";
        echo "ID: " . $post_id . "\n";
        echo "Slug: " . get_post_field('post_name', $post_id) . "\n";
        
        // Get ACF fields
        if (function_exists('get_fields')) {
            $fields = get_fields($post_id);
            
            if ($fields) {
                echo "ACF Fields:\n";
                
                // Get specific tool fields
                $tool_url = get_field('tool_url', $post_id);
                $tool_description = get_field('tool_description', $post_id);
                $pricing_model = get_field('pricing_model', $post_id);
                
                if ($tool_url) echo "  - URL: " . $tool_url . "\n";
                if ($tool_description) echo "  - Description: " . substr($tool_description, 0, 100) . "...\n";
                if ($pricing_model) echo "  - Pricing: " . $pricing_model . "\n";
            }
        }
        
        // Get categories
        $categories = wp_get_post_terms($post_id, 'tool_category');
        if (!empty($categories)) {
            echo "Categories: ";
            $cat_names = array();
            foreach ($categories as $cat) {
                $cat_names[] = $cat->name;
            }
            echo implode(', ', $cat_names) . "\n";
        }
        
        echo "\n---\n\n";
    }
    
    wp_reset_postdata();
} else {
    echo "No tools found.\n";
}

// Also check via REST API
echo "\n\nTesting REST API Access:\n";
echo "========================\n";

$rest_url = get_rest_url(null, 'wp/v2/tool');
echo "REST API URL: " . $rest_url . "\n";

// Make a REST API request
$response = wp_remote_get($rest_url);

if (!is_wp_error($response)) {
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    
    if ($data) {
        echo "REST API returned " . count($data) . " tools\n";
    }
} else {
    echo "REST API Error: " . $response->get_error_message() . "\n";
}