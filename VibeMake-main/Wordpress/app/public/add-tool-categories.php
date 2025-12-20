<?php
/**
 * Script to add specific tool categories to WordPress
 * Run this file in the WordPress root directory
 */

// Load WordPress
require_once('wp-load.php');

// Define the categories we need to add
$categories = [
    [
        'name' => 'Image Generation',
        'slug' => 'image-generation',
        'description' => 'AI tools for creating and generating images'
    ],
    [
        'name' => 'Music / Audio',
        'slug' => 'music-audio',
        'description' => 'AI tools for music creation and audio processing'
    ],
    [
        'name' => 'Website / App',
        'slug' => 'website-app',
        'description' => 'AI tools for website and app development'
    ],
    [
        'name' => 'Graphic Design',
        'slug' => 'graphic-design',
        'description' => 'AI tools for graphic design and visual creation'
    ],
    [
        'name' => 'Text / Copywriting',
        'slug' => 'text-copywriting',
        'description' => 'AI tools for writing and copywriting'
    ],
    [
        'name' => '3D',
        'slug' => '3d',
        'description' => 'AI tools for 3D modeling and rendering'
    ],
    [
        'name' => 'Video / Film',
        'slug' => 'video-film',
        'description' => 'AI tools for video creation and editing'
    ],
    [
        'name' => 'Presentation',
        'slug' => 'presentation',
        'description' => 'AI tools for creating presentations'
    ],
    [
        'name' => 'Animation',
        'slug' => 'animation',
        'description' => 'AI tools for animation and motion graphics'
    ],
    [
        'name' => 'Coding',
        'slug' => 'coding',
        'description' => 'AI tools for coding and development'
    ]
];

echo "Adding tool categories...\n\n";

foreach ($categories as $cat) {
    // Check if the category already exists
    $existing = get_term_by('slug', $cat['slug'], 'tool_category');
    
    if ($existing) {
        echo "✓ Category '{$cat['name']}' already exists\n";
    } else {
        // Add the category
        $result = wp_insert_term(
            $cat['name'],
            'tool_category',
            [
                'slug' => $cat['slug'],
                'description' => $cat['description']
            ]
        );
        
        if (is_wp_error($result)) {
            echo "✗ Error adding '{$cat['name']}': " . $result->get_error_message() . "\n";
        } else {
            echo "✓ Added category '{$cat['name']}' successfully\n";
        }
    }
}

echo "\nDone! All categories have been processed.\n";

// Also update existing tools to use appropriate categories
echo "\nUpdating tool categorizations...\n";

// Map existing tools to new categories based on their current categories
$category_mappings = [
    'Building' => ['coding', 'website-app'],
    'Creating' => ['image-generation', 'graphic-design', '3d', 'animation'],
    'Writing' => ['text-copywriting'],
    'Curating' => ['presentation']
];

// Get all tools
$tools = get_posts([
    'post_type' => 'tool',
    'numberposts' => -1,
    'post_status' => 'publish'
]);

foreach ($tools as $tool) {
    $current_categories = wp_get_post_terms($tool->ID, 'tool_category', ['fields' => 'names']);
    
    if (!empty($current_categories)) {
        $new_category_slugs = [];
        
        // Map old categories to new ones
        foreach ($current_categories as $current_cat) {
            if (isset($category_mappings[$current_cat])) {
                // For now, just use the first mapping
                $new_category_slugs[] = $category_mappings[$current_cat][0];
            }
        }
        
        if (!empty($new_category_slugs)) {
            // Get term IDs for the new categories
            $term_ids = [];
            foreach ($new_category_slugs as $slug) {
                $term = get_term_by('slug', $slug, 'tool_category');
                if ($term) {
                    $term_ids[] = $term->term_id;
                }
            }
            
            if (!empty($term_ids)) {
                wp_set_post_terms($tool->ID, $term_ids, 'tool_category', false);
                echo "Updated '{$tool->post_title}' with new categories\n";
            }
        }
    }
}

echo "\nAll done! Tool categories have been updated.\n";