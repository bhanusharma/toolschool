<?php
/**
 * Replicate Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Replicate tool entry with latest platform features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-replicate-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🔄 Creating Replicate Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Replicate tool post
$post_data = [
    'post_title'    => 'Replicate',
    'post_content'  => 'Replicate is the cloud platform making AI accessible to every developer. Run open-source models with a simple API, deploy custom models, and scale automatically. Hosting thousands of models from Flux to Llama, SDXL to Whisper. Valued at $500M+, it powers AI features for GitHub, Canva, and thousands of startups. Features one-line deployment, automatic scaling, and pay-per-second billing.',
    'post_excerpt'  => 'Cloud platform for running AI models with simple APIs, hosting thousands of open-source models ready to use.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Replicate tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Run AI with an API - Machine learning doesn\'t need to be hard', $post_id);
$result2 = update_field('tool_website', 'https://replicate.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Run AI with an API - Machine learning doesn\'t need to be hard'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://replicate.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['code', 'images', 'video', 'audio', 'business'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [code, images, video, audio, business]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🚀',
        'feature_title' => 'One-Line Deployment',
        'feature_description' => 'Deploy any model with a single command using Cog containers'
    ],
    [
        'feature_icon' => '📚',
        'feature_title' => 'Thousands of Models',
        'feature_description' => 'Pre-deployed models from Flux, SDXL, Llama, Whisper, and more'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'Automatic Scaling',
        'feature_description' => 'Scales to zero when idle, handles traffic spikes automatically'
    ],
    [
        'feature_icon' => '💰',
        'feature_title' => 'Pay-Per-Second',
        'feature_description' => 'Only pay for compute time used, no idle charges'
    ],
    [
        'feature_icon' => '🔧',
        'feature_title' => 'Fine-Tuning Platform',
        'feature_description' => 'Train custom versions of SDXL, Llama, and other models easily'
    ],
    [
        'feature_icon' => '🌐',
        'feature_title' => 'Universal API',
        'feature_description' => 'Consistent API across all models with SDKs for Python, Node, and more'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'usage_based', $post_id);
$result8 = update_field('tool_pricing_summary', 'Pay-per-second from $0.00025/sec, volume discounts available', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: usage_based<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '2 million+ developers',
    'company_founded' => '2020',
    'funding_raised' => '$112.5 million',
    'valuation' => '$500+ million',
    'models_hosted' => '25,000+ models',
    'predictions_run' => '1 billion+ monthly',
    'enterprise_customers' => 'GitHub, Canva, Midjourney',
    'api_latency' => '<2 second cold starts'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Developer Tools', 'Cloud Platform'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['code-development', 'images-art', 'video-film', 'audio-music'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'developer-tech',
    'entrepreneur-founder',
    'business-professional',
    'content-creator-influencer'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Replicate tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux', 'NotebookLM', 'Character AI', 'Replicate'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Hugging Face (Open Source AI Community)</p>";

echo "<h4>🔄 Replicate Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>2M+ developers using the platform</li>";
echo "<li>25,000+ models hosted and ready</li>";
echo "<li>1B+ predictions run monthly</li>";
echo "<li>Powers GitHub, Canva, and major platforms</li>";
echo "<li>$500M+ valuation with a16z backing</li>";
echo "<li>Pay only for compute time used</li>";
echo "</ul>";
?>