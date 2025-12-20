<?php
/**
 * Debug script to create Midjourney tool entry
 * Access this via: http://vibemake.local/wp-content/themes/vibemake-api/debug-create-midjourney.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Check if we're in admin or have proper permissions
if (!current_user_can('edit_posts')) {
    wp_die('You do not have sufficient permissions to access this page.');
}

echo "<h1>Creating Midjourney Tool Entry</h1>";
echo "<pre>";

// Create the Midjourney tool post
$post_data = [
    'post_title'    => 'Midjourney',
    'post_content'  => 'Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species. It\'s one of the most popular AI image generators, creating stunning visual content from text prompts with unparalleled artistic quality and style diversity.',
    'post_excerpt'  => 'AI-powered image generator that creates stunning visual content from text prompts with artistic flair and professional quality.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "\n";
    exit;
}

echo "✅ Created Midjourney tool post with ID: $post_id\n\n";

// Populate ACF fields
echo "📝 Setting ACF fields...\n";

// Basic Information - using correct field names from functions-acf.php
update_field('tool_tagline', 'Create stunning AI art from your imagination', $post_id);
update_field('tool_website', 'https://www.midjourney.com', $post_id);
update_field('tool_featured', true, $post_id);

echo "✓ Basic information fields set\n";

// Use Cases - using correct field names from ACF
update_field('tool_use_cases', ['images', 'design', 'business'], $post_id);
update_field('tool_difficulty', 'intermediate', $post_id);

echo "✓ Classification fields set\n";

// Key Features with correct field structure
$key_features = [
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Text-to-Image Generation',
        'feature_description' => 'Create stunning images from detailed text prompts with artistic flair'
    ],
    [
        'feature_icon' => '✨',
        'feature_title' => 'Multiple Art Styles',
        'feature_description' => 'Support for realism, impressionism, abstract, fantasy, and custom artistic styles'
    ],
    [
        'feature_icon' => '🚀',
        'feature_title' => 'High Resolution Output', 
        'feature_description' => 'Generate images up to 1,792 x 1,024 pixels with upscaling capabilities'
    ],
    [
        'feature_icon' => '🎯',
        'feature_title' => 'Style & Character References',
        'feature_description' => 'Apply artistic styles from reference images and maintain character consistency'
    ]
];

update_field('tool_key_features', $key_features, $post_id);

echo "✓ Features fields set\n";

// Pricing
update_field('tool_pricing_model', 'paid', $post_id);
update_field('tool_pricing_summary', 'Basic $10/month, Standard $30/month, Pro $60/month', $post_id);

echo "✓ Pricing fields set\n";

// Stats (using group structure)
$tool_stats = [
    'user_count' => '20+ million users',
    'company_founded' => '2021',
    'funding_raised' => 'Self-funded',
    'monthly_active_users' => '20M+',
];

update_field('tool_stats', $tool_stats, $post_id);

echo "✓ Stats fields set\n";

// Set taxonomies
echo "\n🏷️ Setting taxonomies...\n";

// Tool categories
$category_terms = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Design & Creative', 'Image & Video'], 'tool_category');
echo "✓ Tool categories: " . print_r($category_terms, true) . "\n";

// Creation types
$creation_terms = wp_set_post_terms($post_id, ['images-art'], 'creation_type');
echo "✓ Creation types: " . print_r($creation_terms, true) . "\n";

// User situations  
$user_terms = wp_set_post_terms($post_id, ['content-creator-influencer', 'business-professional'], 'user_situation');
echo "✓ User situations: " . print_r($user_terms, true) . "\n";

echo "\n🎉 SUCCESS! Comprehensive Midjourney tool entry created!\n";
echo "📍 Post ID: $post_id\n";
echo "🔗 Edit in admin: " . admin_url("post.php?post=$post_id&action=edit") . "\n";
echo "🔗 View on frontend: " . get_permalink($post_id) . "\n";

echo "</pre>";
?>