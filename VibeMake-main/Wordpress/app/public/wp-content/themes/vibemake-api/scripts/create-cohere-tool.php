<?php
/**
 * Cohere Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Cohere tool entry with latest Command R and enterprise features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-cohere-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🌐 Creating Cohere Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Cohere tool post
$post_data = [
    'post_title'    => 'Cohere',
    'post_content'  => 'Cohere is the enterprise AI platform building foundation models for business. With Command R+ for RAG, Embed 3 for semantic search, and Rerank 3 for relevance, it powers AI for Fortune 500 companies. Valued at $6.5 billion, Cohere offers multilingual models supporting 100+ languages, on-premise deployment, and data privacy guarantees. Trusted by Notion, Spotify, Oracle, and thousands of enterprises.',
    'post_excerpt'  => 'Enterprise-focused AI platform with world-class models for search, generation, and understanding at scale.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Cohere tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Best-in-class AI for enterprise - Build with language AI that understands your business', $post_id);
$result2 = update_field('tool_website', 'https://cohere.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Best-in-class AI for enterprise - Build with language AI...'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://cohere.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['business', 'code', 'data', 'writing'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [business, code, data, writing]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎯',
        'feature_title' => 'Command R+',
        'feature_description' => 'State-of-the-art 104B parameter model optimized for RAG and tool use'
    ],
    [
        'feature_icon' => '🔍',
        'feature_title' => 'Embed 3',
        'feature_description' => 'Best-in-class embeddings for semantic search in 100+ languages'
    ],
    [
        'feature_icon' => '📊',
        'feature_title' => 'Rerank 3',
        'feature_description' => 'Boost search relevance by 50% with advanced reranking models'
    ],
    [
        'feature_icon' => '🌍',
        'feature_title' => 'Multilingual Excellence',
        'feature_description' => 'Native support for 100+ languages with superior non-English performance'
    ],
    [
        'feature_icon' => '🔒',
        'feature_title' => 'Enterprise Security',
        'feature_description' => 'SOC 2 Type II, HIPAA compliant, on-premise deployment options'
    ],
    [
        'feature_icon' => '🏢',
        'feature_title' => 'Private Cloud Options',
        'feature_description' => 'Deploy on AWS, Azure, OCI, or your own infrastructure'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'usage_based', $post_id);
$result8 = update_field('tool_pricing_summary', 'Pay-as-you-go API pricing, Enterprise contracts with SLAs available', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: usage_based<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '10,000+ enterprises',
    'company_founded' => '2019',
    'funding_raised' => '$1 billion+',
    'valuation' => '$6.5 billion',
    'languages_supported' => '100+ languages',
    'api_calls' => '10 billion+ monthly',
    'enterprise_clients' => 'Notion, Spotify, Oracle',
    'team_size' => '400+ employees'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Enterprise', 'Search & Discovery'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['business-marketing', 'code-development', 'data-analysis'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'business-professional',
    'developer-tech',
    'entrepreneur-founder',
    'enterprise-team'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Cohere tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux', 'NotebookLM', 'Character AI', 'Replicate', 'Hugging Face', 'Cohere'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> ALL 20 TOOLS!</p>";

echo "<h4>🌐 Cohere Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$6.5B valuation - enterprise AI leader</li>";
echo "<li>10,000+ enterprise customers</li>";
echo "<li>Command R+ with 104B parameters</li>";
echo "<li>100+ languages supported natively</li>";
echo "<li>10B+ API calls monthly</li>";
echo "<li>Trusted by Notion, Spotify, Oracle</li>";
echo "</ul>";

echo "<h2>🎊 CONGRATULATIONS! All 20 AI tools have been imported!</h2>";
?>