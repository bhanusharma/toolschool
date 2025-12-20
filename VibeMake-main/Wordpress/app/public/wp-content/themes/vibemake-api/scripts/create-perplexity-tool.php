<?php
/**
 * Perplexity Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Perplexity tool entry with latest funding, features, and capabilities
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-perplexity-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🔍 Creating Perplexity Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Perplexity tool post
$post_data = [
    'post_title'    => 'Perplexity',
    'post_content'  => 'Perplexity is the AI-powered search engine revolutionizing how we find and understand information. Valued at $18 billion with 780 million monthly queries, it combines real-time search with advanced AI models like GPT-4 Omni and Claude 3. Features include Deep Research for comprehensive analysis, Perplexity Assistant for cross-app functionality, and the upcoming Comet browser. Processing 30 million daily queries with transparent source citations.',
    'post_excerpt'  => 'AI-powered search engine that provides real-time, intelligent answers with source citations and comprehensive research capabilities.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Perplexity tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Where knowledge begins - AI-powered search that actually understands', $post_id);
$result2 = update_field('tool_website', 'https://www.perplexity.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Where knowledge begins - AI-powered search that actually understands'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://www.perplexity.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['education', 'business', 'writing', 'data'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [education, business, writing, data]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🔍',
        'feature_title' => 'Real-Time AI Search',
        'feature_description' => 'Intelligent search with live web access and transparent source citations'
    ],
    [
        'feature_icon' => '📊',
        'feature_title' => 'Deep Research',
        'feature_description' => 'Autonomous comprehensive research conducting dozens of searches across hundreds of sources'
    ],
    [
        'feature_icon' => '🤖',
        'feature_title' => 'Perplexity Assistant',
        'feature_description' => 'Cross-app AI assistant for mobile that maintains context across actions'
    ],
    [
        'feature_icon' => '🧠',
        'feature_title' => 'Multiple AI Models',
        'feature_description' => 'Choose from GPT-4 Omni, Claude 3.7 Sonnet, DeepSeek R1, and specialized Sonar models'
    ],
    [
        'feature_icon' => '📁',
        'feature_title' => 'File Analysis',
        'feature_description' => 'Upload and analyze PDFs, CSVs, images with Pro plan'
    ],
    [
        'feature_icon' => '🌐',
        'feature_title' => 'Sonar API',
        'feature_description' => 'Generative search API with 0.858 F-score factuality benchmark'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free with limitations, Pro $20/month ($200/year) for unlimited access', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '780 million monthly queries',
    'company_founded' => '2022',
    'funding_raised' => '$915.3 million total',
    'valuation' => '$18 billion (March 2025)',
    'daily_queries' => '30 million',
    'annual_revenue' => '$100 million ARR (2025)',
    'employees' => '700 worldwide',
    'market_share' => '6.2% AI search market'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Search & Discovery', 'Research & Analysis'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['writing-text', 'business-marketing'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Perplexity serves researchers, students, professionals
$user_result = wp_set_post_terms($post_id, [
    'student-learner', 
    'business-professional',
    'content-creator-influencer',
    'entrepreneur-founder',
    'marketer-growth'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Perplexity tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Cursor (AI-Powered IDE)</p>";

echo "<h4>🔥 Perplexity Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$18B valuation with $915M total funding</li>";
echo "<li>780M monthly queries (30M daily)</li>";
echo "<li>$100M ARR - 400% YoY growth</li>";
echo "<li>700 employees, 6.2% AI search market share</li>";
echo "<li>Launching Comet browser soon</li>";
echo "</ul>";
?>