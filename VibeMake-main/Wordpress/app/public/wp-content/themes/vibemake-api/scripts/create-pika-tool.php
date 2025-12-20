<?php
/**
 * Pika Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Pika tool entry with latest 2.0 model and features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-pika-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🎬 Creating Pika Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Pika tool post
$post_data = [
    'post_title'    => 'Pika',
    'post_content'  => 'Pika is the AI video generation platform making professional video creation effortless. With Pika 2.0 featuring Scene Ingredients, it offers unprecedented control over cinematography, VFX, and characters. Valued at $500M+, Pika enables creators to generate cinematic videos from text, images, or existing footage. Features include precise camera controls, character consistency, sound effects generation, and real-time editing capabilities.',
    'post_excerpt'  => 'AI-powered video creation platform with Scene Ingredients for cinematic control and professional-quality output.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Pika tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Bring your wildest video ideas to life with AI magic', $post_id);
$result2 = update_field('tool_website', 'https://pika.art', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Bring your wildest video ideas to life with AI magic'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://pika.art'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['video', 'animation', 'business', 'social'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [video, animation, business, social]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎬',
        'feature_title' => 'Scene Ingredients',
        'feature_description' => 'Pika 2.0\'s breakthrough feature for granular control over every element'
    ],
    [
        'feature_icon' => '📹',
        'feature_title' => 'Cinematic Camera Controls',
        'feature_description' => 'Professional camera movements including pan, zoom, rotate, and tracking'
    ],
    [
        'feature_icon' => '👥',
        'feature_title' => 'Character Consistency',
        'feature_description' => 'Maintain character appearance and identity across multiple scenes'
    ],
    [
        'feature_icon' => '✨',
        'feature_title' => 'VFX & Special Effects',
        'feature_description' => 'Add explosions, particles, lighting effects with simple prompts'
    ],
    [
        'feature_icon' => '🎵',
        'feature_title' => 'Sound Effects Generation',
        'feature_description' => 'AI-generated audio that perfectly syncs with your video content'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Pikaffects',
        'feature_description' => 'Transform videos with unique artistic styles and effects instantly'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier available, Standard $10/month, Pro $35/month, Ultra $70/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '5 million+ users',
    'company_founded' => '2023',
    'funding_raised' => '$135 million',
    'valuation' => '$500+ million',
    'videos_created' => '50 million+',
    'daily_generations' => '500,000+',
    'model_version' => 'Pika 2.0 (2025)',
    'max_video_length' => '15 seconds per generation'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Video & Animation', 'Creative Tools'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['video-film', 'animation'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'content-creator-influencer',
    'marketer-growth',
    'entrepreneur-founder',
    'designer-creative'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Pika tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Ideogram (AI Image Generation with Perfect Text)</p>";

echo "<h4>🎬 Pika Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>Pika 2.0 with Scene Ingredients technology</li>";
echo "<li>$500M+ valuation, competing with Runway</li>";
echo "<li>5M+ users creating 500K+ videos daily</li>";
echo "<li>Founded by ex-Stanford AI researchers</li>";
echo "<li>Backed by Lightspeed and other top VCs</li>";
echo "<li>15-second generation with cinematic quality</li>";
echo "</ul>";
?>