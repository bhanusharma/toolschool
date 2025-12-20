<?php
/**
 * Cursor Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Cursor tool entry with latest $9.9B valuation and features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-cursor-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>⚡ Creating Cursor Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Cursor tool post
$post_data = [
    'post_title'    => 'Cursor',
    'post_content'  => 'Cursor by Anysphere is the revolutionary AI-powered IDE that\'s transformed software development. Valued at $9.9 billion with $500M ARR, it\'s the fastest-growing software startup of all time. Built on VS Code with autonomous AI agents, it supports Claude Sonnet 4, GPT-4.1, and frontier coding models. Used by 50% of Fortune 500 companies and 1M+ daily developers, featuring background agents, web app management, and Slack integration.',
    'post_excerpt'  => 'AI-powered IDE revolutionizing software development with autonomous coding agents and frontier AI model integration.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Cursor tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'The AI IDE that codes alongside you', $post_id);
$result2 = update_field('tool_website', 'https://www.cursor.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'The AI IDE that codes alongside you'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://www.cursor.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['code', 'automation'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [code, automation]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🤖',
        'feature_title' => 'Background AI Agents',
        'feature_description' => 'Autonomous AI agents that solve coding tasks without supervision'
    ],
    [
        'feature_icon' => '🌐',
        'feature_title' => 'Web App Management',
        'feature_description' => 'Browser-based interface to assign tasks and manage AI coding agents'
    ],
    [
        'feature_icon' => '💬',
        'feature_title' => 'Slack Integration',
        'feature_description' => 'Assign coding tasks to agents directly from Slack with @Cursor'
    ],
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Frontier AI Models',
        'feature_description' => 'Claude Sonnet 4, GPT-4.1, Gemini 2.5 Pro, and all leading coding models'
    ],
    [
        'feature_icon' => '📁',
        'feature_title' => 'Repo-Wide Understanding',
        'feature_description' => 'AI understands entire codebase context for intelligent suggestions'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'Multi-File Editing',
        'feature_description' => 'Edit multiple files simultaneously with AI-powered coordination'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier, Pro $20/month, Ultra $200/month, Enterprise custom', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '1+ million daily active users',
    'company_founded' => '2022',
    'funding_raised' => '$900 million (June 2025)',
    'valuation' => '$9.9 billion',
    'annual_revenue' => '$500 million ARR',
    'growth_rate' => '9,900% YoY ARR growth',
    'enterprise_adoption' => '50% of Fortune 500',
    'fastest_growth' => 'Fastest-growing software startup ever'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Code & Development', 'Productivity'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['code-development'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Cursor serves developers primarily
$user_result = wp_set_post_terms($post_id, [
    'developer-tech',
    'entrepreneur-founder',
    'business-professional'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Cursor tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Runway (AI Video Generation Leader)</p>";

echo "<h4>🚀 Cursor Incredible Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$9.9B valuation - fastest-growing software startup EVER</li>";
echo "<li>$500M ARR with 9,900% YoY growth</li>";
echo "<li>1M+ daily active users</li>";
echo "<li>50% of Fortune 500 companies using it</li>";
echo "<li>$900M funding round led by Thrive Capital</li>";
echo "<li>Autonomous AI agents launched in May 2025</li>";
echo "</ul>";
?>