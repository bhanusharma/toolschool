<?php
/**
 * ChatGPT Tool Creation Script
 * Creates comprehensive ChatGPT tool entry with all ACF fields
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-chatgpt-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🤖 Creating ChatGPT Tool Entry</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the ChatGPT tool post
$post_data = [
    'post_title'    => 'ChatGPT',
    'post_content'  => 'ChatGPT is OpenAI\'s revolutionary conversational AI that democratized access to artificial intelligence. Powered by GPT-4.1 and GPT-4.5, it offers human-like conversations, advanced reasoning, multimodal capabilities, and has become the most widely-used AI assistant globally with over 200 million weekly users.',
    'post_excerpt'  => 'OpenAI\'s conversational AI that provides human-like responses, advanced reasoning, and multimodal capabilities for millions of users worldwide.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created ChatGPT tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'The AI assistant that started it all', $post_id);
$result2 = update_field('tool_website', 'https://chat.openai.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'The AI assistant that started it all'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://chat.openai.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['writing', 'code', 'education', 'business', 'data'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [writing, code, education, business, data]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '💬',
        'feature_title' => 'Conversational AI',
        'feature_description' => 'Natural, human-like conversations with advanced reasoning capabilities'
    ],
    [
        'feature_icon' => '🧠',
        'feature_title' => 'GPT-4.5 & GPT-4.1',
        'feature_description' => 'Latest models with 1M token context and June 2024 knowledge cutoff'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Multimodal Capabilities',
        'feature_description' => 'Text, image, audio processing with DALL-E 3 integration'
    ],
    [
        'feature_icon' => '🚀',
        'feature_title' => 'Advanced Voice Mode',
        'feature_description' => 'Real-time voice conversations with human-like response times'
    ],
    [
        'feature_icon' => '💻',
        'feature_title' => 'Code Interpreter',
        'feature_description' => 'Execute code, analyze data, create charts and visualizations'
    ],
    [
        'feature_icon' => '🔧',
        'feature_title' => 'Custom GPTs',
        'feature_description' => 'Create specialized AI assistants for specific tasks and workflows'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier available, Plus $20/month, Pro $200/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '200+ million weekly users',
    'company_founded' => '2015',
    'funding_raised' => '$13+ billion',
    'monthly_active_users' => '200M+',
    'market_share' => '82.5%',
    'api_requests' => 'Billions daily'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Text & Writing'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['writing-text'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - ChatGPT serves ALL user types
$user_result = wp_set_post_terms($post_id, [
    'student-learner', 
    'business-professional', 
    'content-creator-influencer',
    'entrepreneur-founder',
    'developer-tech',
    'marketer-growth',
    'freelancer-consultant'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set (all types)<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>ChatGPT tool entry created successfully!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Claude (Anthropic)</p>";
?>