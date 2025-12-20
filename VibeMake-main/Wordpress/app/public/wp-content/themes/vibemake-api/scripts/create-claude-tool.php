<?php
/**
 * Claude Tool Creation Script
 * Creates comprehensive Claude tool entry with all ACF fields
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-claude-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🧠 Creating Claude Tool Entry</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Claude tool post
$post_data = [
    'post_title'    => 'Claude',
    'post_content'  => 'Claude is Anthropic\'s flagship AI assistant, renowned for producing thoughtful, nuanced writing and advanced reasoning. Powered by Claude Sonnet 4 and Opus 4, it offers extended thinking capabilities, computer use functionality, and industry-leading coding performance while maintaining strong safety and helpfulness principles.',
    'post_excerpt'  => 'Anthropic\'s thoughtful AI assistant with extended reasoning, computer use capabilities, and industry-leading coding performance.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Claude tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'The AI assistant that thinks before it speaks', $post_id);
$result2 = update_field('tool_website', 'https://claude.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'The AI assistant that thinks before it speaks'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://claude.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['writing', 'code', 'business', 'education', 'data'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [writing, code, business, education, data]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Extended Thinking',
        'feature_description' => 'Deep reasoning mode for complex problems with step-by-step analysis'
    ],
    [
        'feature_icon' => '🖱️',
        'feature_title' => 'Computer Use',
        'feature_description' => 'First AI to control computers - click, type, navigate screens autonomously'
    ],
    [
        'feature_icon' => '💻',
        'feature_title' => 'World-Class Coding',
        'feature_description' => 'Leading performance on SWE-bench (72.5%) and coding benchmarks'
    ],
    [
        'feature_icon' => '📊',
        'feature_title' => 'Vision & Analysis',
        'feature_description' => 'Advanced chart interpretation, image analysis, and text transcription'
    ],
    [
        'feature_icon' => '📚',
        'feature_title' => 'Large Context Window',
        'feature_description' => '200K token context for analyzing entire documents and codebases'
    ],
    [
        'feature_icon' => '✨',
        'feature_title' => 'Artifacts',
        'feature_description' => 'Interactive code, documents, and visualizations you can edit and iterate'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free tier available, Pro $20/month, Team & Enterprise plans', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => 'Millions of users',
    'company_founded' => '2021',
    'funding_raised' => '$7.3 billion',
    'monthly_active_users' => '10M+',
    'model_versions' => 'Sonnet 4, Opus 4, Haiku 3.5',
    'api_availability' => 'Anthropic, AWS Bedrock, Google Cloud'
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
$creation_result = wp_set_post_terms($post_id, ['writing-text', 'code-development'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Claude serves business professionals, developers, content creators primarily
$user_result = wp_set_post_terms($post_id, [
    'business-professional', 
    'developer-tech',
    'content-creator-influencer',
    'entrepreneur-founder',
    'student-learner'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Claude tool entry created successfully!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Gemini (Google)</p>";
?>