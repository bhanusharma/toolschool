<?php
/**
 * Character AI Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Character AI tool entry with latest features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-character-ai-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🤖 Creating Character AI Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Character AI tool post
$post_data = [
    'post_title'    => 'Character AI',
    'post_content'  => 'Character AI is the leading AI companion platform where users create and interact with personalized AI characters. With 20M+ user-created characters and billions of messages daily, it offers emotional support, creative roleplay, language learning, and entertainment. Despite challenges, it maintains massive Gen Z engagement. Features include voice calls, character groups, memory persistence, and the new Character Composer for enhanced creation.',
    'post_excerpt'  => 'Premier AI companion platform for creating and chatting with millions of user-generated AI characters.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Character AI tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Personalized AI for every moment of your life', $post_id);
$result2 = update_field('tool_website', 'https://character.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Personalized AI for every moment of your life'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://character.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['social', 'education', 'entertainment', 'writing'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [social, education, entertainment, writing]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '👥',
        'feature_title' => '20M+ Characters',
        'feature_description' => 'Millions of user-created AI personalities from celebrities to original creations'
    ],
    [
        'feature_icon' => '📞',
        'feature_title' => 'Voice Calls',
        'feature_description' => 'Have real-time voice conversations with AI characters'
    ],
    [
        'feature_icon' => '🎭',
        'feature_title' => 'Character Groups',
        'feature_description' => 'Create group chats with multiple AI characters interacting together'
    ],
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Persistent Memory',
        'feature_description' => 'Characters remember your conversations and build relationships over time'
    ],
    [
        'feature_icon' => '✨',
        'feature_title' => 'Character Composer',
        'feature_description' => 'Advanced tools for creating complex, nuanced AI personalities'
    ],
    [
        'feature_icon' => '🌍',
        'feature_title' => 'Language Learning',
        'feature_description' => 'Practice conversations in any language with native-speaking AI characters'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free with limits, Character+ $14.99/month for priority access and features', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '30 million+ users',
    'company_founded' => '2022',
    'funding_raised' => '$200+ million',
    'valuation' => '$1 billion (adjusting)',
    'daily_messages' => '1 billion+',
    'characters_created' => '20 million+',
    'average_session' => '2+ hours',
    'gen_z_percentage' => '60%+ users under 25'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Social & Communication', 'Entertainment'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['social-community', 'entertainment', 'education-learning'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'student-learner',
    'content-creator-influencer',
    'casual-hobbyist',
    'gamer-enthusiast'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Character AI tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux', 'NotebookLM', 'Character AI'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Replicate (AI Model Deployment Platform)</p>";

echo "<h4>🤖 Character AI Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>30M+ users, 60%+ Gen Z audience</li>";
echo "<li>1B+ messages daily across platform</li>";
echo "<li>20M+ user-created characters</li>";
echo "<li>2+ hour average session time</li>";
echo "<li>Voice calls and group chats launched</li>";
echo "<li>Navigating content moderation challenges</li>";
echo "</ul>";
?>