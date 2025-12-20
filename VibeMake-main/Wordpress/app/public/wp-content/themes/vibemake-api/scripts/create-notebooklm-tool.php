<?php
/**
 * NotebookLM Tool Creation Script - July 2025 Current Data
 * Creates comprehensive NotebookLM tool entry with Audio Overview and latest features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-notebooklm-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>📚 Creating NotebookLM Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the NotebookLM tool post
$post_data = [
    'post_title'    => 'NotebookLM',
    'post_content'  => 'NotebookLM is Google\'s AI-powered research assistant that transforms how you understand complex information. Powered by Gemini 2.5 Pro, it creates personalized AI experts from your documents. Famous for Audio Overviews that turn any content into engaging podcast-style discussions. Features source-grounded responses, YouTube/audio transcription, collaborative notebooks, and the ability to handle 50 sources with 2M tokens each.',
    'post_excerpt'  => 'Google\'s AI research assistant that turns documents into personalized experts and creates viral podcast-style summaries.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created NotebookLM tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Your personalized AI research assistant - Think faster with AI grounded in your sources', $post_id);
$result2 = update_field('tool_website', 'https://notebooklm.google.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Your personalized AI research assistant - Think faster with AI grounded in your sources'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://notebooklm.google.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['education', 'writing', 'business', 'data'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [education, writing, business, data]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎙️',
        'feature_title' => 'Audio Overviews',
        'feature_description' => 'Transform any content into engaging podcast-style discussions between AI hosts'
    ],
    [
        'feature_icon' => '📖',
        'feature_title' => 'Source-Grounded AI',
        'feature_description' => 'Responses cite your uploaded sources with inline citations for verification'
    ],
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Gemini 2.5 Pro',
        'feature_description' => '2M token context window per source, handling up to 50 sources simultaneously'
    ],
    [
        'feature_icon' => '🎬',
        'feature_title' => 'Multimodal Input',
        'feature_description' => 'Upload PDFs, Google Docs, websites, YouTube videos, and audio files'
    ],
    [
        'feature_icon' => '📝',
        'feature_title' => 'Interactive Notebooks',
        'feature_description' => 'Create notes, save responses, and build comprehensive study guides'
    ],
    [
        'feature_icon' => '👥',
        'feature_title' => 'Collaboration Ready',
        'feature_description' => 'Share notebooks with teams for collective research and learning'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free for all users, NotebookLM Plus with advanced features coming soon', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '10 million+ users',
    'company_founded' => '2023 (Google Labs)',
    'parent_company' => 'Google',
    'sources_per_notebook' => 'Up to 50',
    'tokens_per_source' => '2 million (500K words)',
    'audio_overviews' => '100M+ generated',
    'languages_supported' => '108 languages',
    'availability' => '200+ countries'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Research & Analysis', 'Education', 'Productivity'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['writing-text', 'education-learning', 'business-marketing'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'student-learner',
    'educator-teacher',
    'business-professional',
    'content-creator-influencer'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>NotebookLM tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux', 'NotebookLM'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Character AI (AI Companion Platform)</p>";

echo "<h4>📚 NotebookLM Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>10M+ users globally in 200+ countries</li>";
echo "<li>Audio Overviews went viral - 100M+ generated</li>";
echo "<li>Powered by Gemini 2.5 Pro with 2M tokens</li>";
echo "<li>Handles 50 sources per notebook</li>";
echo "<li>108 languages supported</li>";
echo "<li>Free for all users (Plus tier coming)</li>";
echo "</ul>";
?>