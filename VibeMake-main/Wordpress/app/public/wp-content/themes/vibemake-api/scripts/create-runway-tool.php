<?php
/**
 * Runway Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Runway tool entry with latest Gen-4 and $3B valuation
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-runway-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🎬 Creating Runway Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Runway tool post
$post_data = [
    'post_title'    => 'Runway',
    'post_content'  => 'Runway is the industry-leading AI video generation platform revolutionizing content creation. Valued at $3 billion with $545M total funding, it powers Gen-4 models offering film-quality consistency and world simulation. Used by Hollywood studios like Lionsgate, Runway provides text-to-video, image-to-video, and advanced camera controls. Features consistent character generation, precise motion control, and real-time collaboration for creators and enterprises.',
    'post_excerpt'  => 'Industry-leading AI video generation platform with Gen-4 models, Hollywood partnerships, and film-quality output.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Runway tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Tools for human imagination - AI video generation at its finest', $post_id);
$result2 = update_field('tool_website', 'https://runwayml.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Tools for human imagination - AI video generation at its finest'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://runwayml.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['video', 'business', 'design'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [video, business, design]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎬',
        'feature_title' => 'Gen-4 Video Models',
        'feature_description' => 'Latest generation AI with film-quality consistency and world simulation'
    ],
    [
        'feature_icon' => '🎭',
        'feature_title' => 'Consistent Characters',
        'feature_description' => 'Generate and maintain consistent characters, locations, and objects across scenes'
    ],
    [
        'feature_icon' => '📹',
        'feature_title' => 'Advanced Camera Controls',
        'feature_description' => 'Professional camera movements, angles, and cinematic techniques'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'Turbo Generation',
        'feature_description' => 'Gen-4 Turbo: 7x faster and 50% cheaper than previous generation'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Motion Brush & Director Mode',
        'feature_description' => 'Precise motion control and advanced direction capabilities'
    ],
    [
        'feature_icon' => '🤝',
        'feature_title' => 'Real-Time Collaboration',
        'feature_description' => 'Team features for creative projects and enterprise workflows'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier, Standard $12/month, Pro $28/month, Unlimited $76/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => 'Millions of creators',
    'company_founded' => '2018',
    'funding_raised' => '$545 million total',
    'valuation' => '$3 billion (April 2025)',
    'annual_revenue' => '$300 million target 2025',
    'hollywood_partnerships' => 'Lionsgate deal signed',
    'model_generation' => 'Gen-4 with Turbo variants',
    'video_length' => 'Up to 10 seconds per generation'
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
$creation_result = wp_set_post_terms($post_id, ['video-film'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Runway serves content creators, business professionals, filmmakers
$user_result = wp_set_post_terms($post_id, [
    'content-creator-influencer',
    'business-professional',
    'entrepreneur-founder',
    'marketer-growth'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Runway tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Suno (AI Music Generation)</p>";

echo "<h4>🎬 Runway Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$3B valuation with $545M total funding</li>";
echo "<li>Gen-4 models with film-quality consistency</li>";
echo "<li>Hollywood partnership with Lionsgate studios</li>";
echo "<li>Targeting $300M annual revenue in 2025</li>";
echo "<li>Gen-4 Turbo: 7x faster, 50% cheaper</li>";
echo "<li>Up to 10-second video generation</li>";
echo "</ul>";
?>