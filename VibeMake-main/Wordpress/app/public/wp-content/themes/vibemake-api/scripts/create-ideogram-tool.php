<?php
/**
 * Ideogram Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Ideogram tool entry with text rendering excellence
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-ideogram-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>✍️ Creating Ideogram Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Ideogram tool post
$post_data = [
    'post_title'    => 'Ideogram',
    'post_content'  => 'Ideogram is the AI image generator that finally solved text rendering, making it the go-to choice for designs requiring perfect typography. With Ideogram 2.0, it offers photorealistic quality, magic prompt enhancement, and unmatched text accuracy. Valued at $1 billion, it excels at logos, posters, t-shirt designs, and any visual requiring readable text. Features include style presets, color palettes, and seamless Canvas editing.',
    'post_excerpt'  => 'AI image generation with perfect text rendering, ideal for logos, posters, and designs requiring typography.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Ideogram tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'State-of-the-art AI for text and image generation', $post_id);
$result2 = update_field('tool_website', 'https://ideogram.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'State-of-the-art AI for text and image generation'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://ideogram.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['images', 'design', 'business', 'marketing'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [images, design, business, marketing]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '✨',
        'feature_title' => 'Perfect Text Rendering',
        'feature_description' => 'Industry-leading text accuracy for logos, posters, and typography'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Ideogram 2.0',
        'feature_description' => 'Photorealistic quality with 5x improved text rendering and coherence'
    ],
    [
        'feature_icon' => '🪄',
        'feature_title' => 'Magic Prompt',
        'feature_description' => 'AI enhances your prompts for professional results every time'
    ],
    [
        'feature_icon' => '🖼️',
        'feature_title' => 'Canvas Editor',
        'feature_description' => 'Extend, remix, and perfect your creations with intuitive tools'
    ],
    [
        'feature_icon' => '🎭',
        'feature_title' => 'Style Presets',
        'feature_description' => 'One-click styles from anime to photorealistic to design-specific'
    ],
    [
        'feature_icon' => '🏷️',
        'feature_title' => 'Design Templates',
        'feature_description' => 'Pre-configured for logos, t-shirts, posters, and social media'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free 25 images/month, Basic $7/month, Plus $16/month, Pro $48/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '10 million+ users',
    'company_founded' => '2023',
    'funding_raised' => '$115 million',
    'valuation' => '$1 billion',
    'images_created' => '500 million+',
    'text_accuracy' => '95%+ readable text',
    'model_version' => 'Ideogram 2.0',
    'api_availability' => 'Public API launched'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Image Generation', 'Design Tools'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['images-art', 'design-graphics', 'business-marketing'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'designer-creative',
    'marketer-growth',
    'entrepreneur-founder',
    'content-creator-influencer'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Ideogram tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Flux (Black Forest Labs)</p>";

echo "<h4>✍️ Ideogram Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$1B valuation - unicorn status achieved</li>";
echo "<li>10M+ users, 500M+ images created</li>";
echo "<li>95%+ text accuracy - industry leading</li>";
echo "<li>Ideogram 2.0 - 5x better text rendering</li>";
echo "<li>Founded by ex-Google Brain researchers</li>";
echo "<li>A16Z-backed with top-tier investors</li>";
echo "</ul>";
?>