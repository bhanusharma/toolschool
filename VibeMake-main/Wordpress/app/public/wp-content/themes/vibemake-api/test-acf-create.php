<?php
/**
 * Simple test to create Midjourney tool entry
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/test-acf-create.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Simple authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🤖 Creating Midjourney Tool Entry</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the tool post
$post_data = [
    'post_title'    => 'Midjourney',
    'post_content'  => 'Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species. Create stunning visual content from text prompts with unparalleled artistic quality.',
    'post_excerpt'  => 'AI-powered image generator that creates stunning visual content from text prompts with artistic flair.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Midjourney tool post with ID: <strong>$post_id</strong><br><br>";

// Set basic ACF fields
echo "📝 Setting ACF fields:<br>";

// Check if ACF functions exist
if (!function_exists('update_field')) {
    echo "❌ ACF not available - update_field() function not found<br>";
    exit;
}

// Basic fields
$result1 = update_field('tool_tagline', 'Create stunning AI art from your imagination', $post_id);
$result2 = update_field('tool_website', 'https://www.midjourney.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Create stunning AI art from your imagination'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://www.midjourney.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Use cases
$result4 = update_field('tool_use_cases', ['images', 'design', 'business'], $post_id);
echo ($result4 ? "✅" : "❌") . " tool_use_cases: [images, design, business]<br>";

// Difficulty
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Text-to-Image Generation',
        'feature_description' => 'Create stunning images from detailed text prompts'
    ],
    [
        'feature_icon' => '✨', 
        'feature_title' => 'Multiple Art Styles',
        'feature_description' => 'Support for various artistic styles and aesthetics'
    ],
    [
        'feature_icon' => '🚀',
        'feature_title' => 'High Resolution Output',
        'feature_description' => 'Generate high-quality images with upscaling'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 3 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'paid', $post_id);
$result8 = update_field('tool_pricing_summary', 'Basic $10/month, Standard $30/month, Pro $60/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: paid<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories (check if they exist first)
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['images-art'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, ['content-creator-influencer'], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Midjourney tool entry created successfully!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

echo "<br><h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>Upload a Midjourney logo image and set as featured image</li>";
echo "<li>Add more detailed statistics and information</li>";
echo "<li>Test the GraphQL queries to ensure data is available</li>";
echo "<li>Check how it appears in the frontend tool listings</li>";
echo "</ol>";
?>