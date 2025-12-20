<?php
/**
 * Gemini Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Gemini tool entry with latest 2.5 models and features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-gemini-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>💎 Creating Gemini Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Gemini tool post
$post_data = [
    'post_title'    => 'Gemini',
    'post_content'  => 'Gemini is Google\'s flagship AI assistant powered by the revolutionary Gemini 2.5 family of thinking models. With enhanced reasoning capabilities, multimodal input/output, and deep integration with Google\'s ecosystem, Gemini 2.5 Pro tops the LMArena leaderboard and excels in coding, creative tasks, and agentic workflows. Features 1M token context, native audio output, and Project Mariner computer use capabilities.',
    'post_excerpt'  => 'Google\'s advanced AI assistant with thinking models, multimodal capabilities, and deep Google ecosystem integration.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Gemini tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Google\'s thinking AI that reasons before responding', $post_id);
$result2 = update_field('tool_website', 'https://gemini.google.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Google\'s thinking AI that reasons before responding'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://gemini.google.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['writing', 'code', 'business', 'education', 'images'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [writing, code, business, education, images]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Thinking Models',
        'feature_description' => 'Gemini 2.5 reasons through thoughts before responding with enhanced accuracy'
    ],
    [
        'feature_icon' => '🏆',
        'feature_title' => 'LMArena Leader',
        'feature_description' => 'Gemini 2.5 Pro tops LMArena leaderboard by significant margin in July 2025'
    ],
    [
        'feature_icon' => '💻',
        'feature_title' => 'Best-in-Class Coding',
        'feature_description' => 'Developers\' favorite model for coding with 84.0% on MMMU benchmark'
    ],
    [
        'feature_icon' => '🎭',
        'feature_title' => 'Multimodal Excellence',
        'feature_description' => 'Text, image, audio, video processing with Veo 3 video generation'
    ],
    [
        'feature_icon' => '📚',
        'feature_title' => '1M Token Context',
        'feature_description' => 'Massive context window for analyzing entire documents and codebases'
    ],
    [
        'feature_icon' => '🌐',
        'feature_title' => 'Google Integration',
        'feature_description' => 'Native access to Google Search, Workspace, and entire Google ecosystem'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier available, Gemini Advanced $20/month, most cost-effective API pricing', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => 'Hundreds of millions',
    'company_founded' => '1998 (Google)',
    'funding_raised' => 'Google subsidiary',
    'monthly_active_users' => '500M+',
    'model_versions' => '2.5 Pro, 2.5 Flash, 2.5 Flash-Lite',
    'benchmark_leader' => 'LMArena #1 July 2025'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Text & Writing', 'Code & Development'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['writing-text', 'code-development', 'images-art'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Gemini serves all types with Google integration focus
$user_result = wp_set_post_terms($post_id, [
    'business-professional', 
    'developer-tech',
    'student-learner',
    'content-creator-influencer',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Gemini tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Perplexity (AI Search Leader)</p>";

echo "<h4>🔥 July 2025 Key Insights:</h4>";
echo "<ul>";
echo "<li>Gemini 2.5 Pro now leads LMArena leaderboard</li>";
echo "<li>Thinking models are the new standard</li>";
echo "<li>Users combining multiple AI tools vs single solution</li>";
echo "<li>Coding AI tools seeing massive adoption</li>";
echo "</ul>";
?>