<?php
/**
 * Stability AI Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Stability AI tool entry with Stable Diffusion 3.5 and latest updates
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-stability-ai-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🎨 Creating Stability AI Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Stability AI tool post
$post_data = [
    'post_title'    => 'Stability AI',
    'post_content'  => 'Stability AI is the open-source leader revolutionizing generative AI with Stable Diffusion models. Creator of SD 3.5 Medium, SDXL Turbo, and Stable Video Diffusion, they champion accessible AI for everyone. Despite financial challenges, they maintain 300M+ downloads and power countless applications. Features include ultra-fast generation, commercial licensing, and extensive model ecosystem including audio, video, and 3D capabilities.',
    'post_excerpt'  => 'Open-source AI leader behind Stable Diffusion, democratizing image, video, and audio generation for millions.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Stability AI tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Activating humanity\'s potential through open-source generative AI', $post_id);
$result2 = update_field('tool_website', 'https://stability.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Activating humanity\'s potential through open-source generative AI'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://stability.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['images', 'video', 'audio', 'design'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [images, video, audio, design]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🖼️',
        'feature_title' => 'Stable Diffusion 3.5',
        'feature_description' => 'Latest model with 8B parameters, superior prompt adherence and quality'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'SDXL Turbo',
        'feature_description' => 'Real-time image generation in a single step with exceptional quality'
    ],
    [
        'feature_icon' => '🎬',
        'feature_title' => 'Stable Video Diffusion',
        'feature_description' => 'Transform images into compelling videos with temporal consistency'
    ],
    [
        'feature_icon' => '🌐',
        'feature_title' => 'Open Source Leadership',
        'feature_description' => '300M+ downloads, powering thousands of apps and services globally'
    ],
    [
        'feature_icon' => '🎵',
        'feature_title' => 'Stable Audio',
        'feature_description' => 'Generate music and sound effects with commercial usage rights'
    ],
    [
        'feature_icon' => '🏢',
        'feature_title' => 'Commercial Licensing',
        'feature_description' => 'Flexible licensing from free personal use to enterprise deployment'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free for personal use, Commercial licenses from $20/month, Enterprise custom', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '300+ million downloads',
    'company_founded' => '2020',
    'funding_raised' => '$200+ million',
    'valuation' => 'Unicorn status (challenged)',
    'models_released' => '50+ open models',
    'community_size' => '1M+ Discord members',
    'github_stars' => '100K+ across repos',
    'api_requests' => '10B+ monthly'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Image Generation', 'Video & Animation', 'Open Source'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['images-art', 'video-film', 'audio-music'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'content-creator-influencer',
    'developer-tech',
    'designer-creative',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Stability AI tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Eleven Labs (AI Voice Synthesis)</p>";

echo "<h4>🎨 Stability AI Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>300M+ downloads of Stable Diffusion models</li>";
echo "<li>SD 3.5 Medium - latest flagship model</li>";
echo "<li>SDXL Turbo - real-time generation</li>";
echo "<li>Despite financial challenges, remains open-source leader</li>";
echo "<li>Powers ComfyUI, Automatic1111, and thousands of apps</li>";
echo "<li>1M+ Discord community members</li>";
echo "</ul>";
?>