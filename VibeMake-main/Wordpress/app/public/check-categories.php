<?php
require_once('wp-load.php');

header('Content-Type: application/json');

// Get all tool categories
$categories = get_terms([
    'taxonomy' => 'tool_category',
    'hide_empty' => false
]);

// Get all tools
$tools = get_posts([
    'post_type' => 'tool',
    'numberposts' => -1,
    'post_status' => 'any'
]);

$tools_data = [];
foreach ($tools as $tool) {
    $tool_cats = wp_get_post_terms($tool->ID, 'tool_category');
    $tools_data[] = [
        'id' => $tool->ID,
        'title' => $tool->post_title,
        'slug' => $tool->post_name,
        'categories' => array_map(function($cat) {
            return [
                'id' => $cat->term_id,
                'name' => $cat->name,
                'slug' => $cat->slug
            ];
        }, $tool_cats)
    ];
}

$response = [
    'categories' => array_map(function($cat) {
        return [
            'id' => $cat->term_id,
            'name' => $cat->name,
            'slug' => $cat->slug,
            'count' => $cat->count
        ];
    }, $categories),
    'tools' => $tools_data,
    'summary' => [
        'total_categories' => count($categories),
        'total_tools' => count($tools)
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);