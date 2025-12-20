<?php
/**
 * Leonardo AI Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Leonardo AI tool entry with latest Phoenix model and features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-leonardo-ai-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🎨 Creating Leonardo AI Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Leonardo AI tool post
$post_data = [
    'post_title'    => 'Leonardo AI',
    'post_content'  => 'Leonardo AI is the professional-grade AI image generation platform trusted by 30 million creators. Featuring the groundbreaking Phoenix model with unmatched prompt adherence, it offers complete creative control through Canvas editor, real-time generation, and video animation. Specialized in game assets, concept art, and professional design work. Includes AI-powered editing, upscaling, background removal, and team collaboration features.',
    'post_excerpt'  => 'Professional AI art platform with Phoenix model, offering precision control for game assets, concept art, and creative projects.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Leonardo AI tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Transform your projects with AI-powered creativity and style', $post_id);
$result2 = update_field('tool_website', 'https://leonardo.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Transform your projects with AI-powered creativity and style'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://leonardo.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['images', 'design', 'video', 'business'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [images, design, video, business]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🔥',
        'feature_title' => 'Phoenix Model',
        'feature_description' => 'Revolutionary model with unparalleled prompt adherence and quality'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Canvas Editor',
        'feature_description' => 'Complete creative control with layers, masking, and AI-powered editing'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'Real-Time Generation',
        'feature_description' => 'Watch your ideas come to life instantly as you type'
    ],
    [
        'feature_icon' => '🎮',
        'feature_title' => 'Game Asset Specialization',
        'feature_description' => 'Industry-leading tools for game developers and concept artists'
    ],
    [
        'feature_icon' => '🎬',
        'feature_title' => 'Motion Video',
        'feature_description' => 'Transform static images into captivating 4-second video clips'
    ],
    [
        'feature_icon' => '🏢',
        'feature_title' => 'Team Collaboration',
        'feature_description' => 'Workspaces, asset management, and API for enterprise workflows'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free 150 tokens daily, Apprentice $10/month, Artisan $24/month, Maestro $48/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '30 million creators',
    'company_founded' => '2022',
    'funding_raised' => '$75 million',
    'images_created' => '1 billion+',
    'daily_generations' => '15 million',
    'models_available' => '20+ fine-tuned models',
    'community_models' => '10,000+ custom models',
    'upscale_capability' => 'Up to 8K resolution'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Image Generation', 'Design Tools', 'Game Development'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['images-art', 'design-graphics', 'video-film'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'designer-creative',
    'content-creator-influencer',
    'developer-tech',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Leonardo AI tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Pika (AI Video Generation)</p>";

echo "<h4>🎨 Leonardo AI Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>30M creators - fastest growing AI art platform</li>";
echo "<li>Phoenix model - best prompt adherence in industry</li>";
echo "<li>1B+ images created, 15M daily generations</li>";
echo "<li>Canvas editor with full creative control</li>";
echo "<li>Specialized for game assets and concept art</li>";
echo "<li>Real-time generation and video animation</li>";
echo "</ul>";
?>