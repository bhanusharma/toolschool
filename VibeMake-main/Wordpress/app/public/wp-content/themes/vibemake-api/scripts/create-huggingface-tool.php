<?php
/**
 * Hugging Face Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Hugging Face tool entry with latest platform features
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-huggingface-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🤗 Creating Hugging Face Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Hugging Face tool post
$post_data = [
    'post_title'    => 'Hugging Face',
    'post_content'  => 'Hugging Face is the AI community\'s home, hosting 1M+ models, 300K+ datasets, and 500K+ apps. Valued at $7 billion, it\'s where researchers and developers collaborate on open AI. Features the Transformers library, Spaces for demos, model hosting, and enterprise solutions. Home to Llama, Mistral, Stable Diffusion, and virtually every open model. The GitHub of AI with 20M+ monthly users.',
    'post_excerpt'  => 'The AI community platform hosting millions of models, datasets, and demos - the collaboration hub for open AI.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Hugging Face tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'The platform where the machine learning community collaborates on models, datasets, and applications', $post_id);
$result2 = update_field('tool_website', 'https://huggingface.co', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'The platform where the machine learning community collaborates...'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://huggingface.co'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['code', 'education', 'business', 'all'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [code, education, business, all]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🏛️',
        'feature_title' => 'Model Hub',
        'feature_description' => '1M+ pre-trained models ready to use across all AI domains'
    ],
    [
        'feature_icon' => '🚀',
        'feature_title' => 'Spaces',
        'feature_description' => 'Deploy ML apps and demos with Gradio, Streamlit, or custom interfaces'
    ],
    [
        'feature_icon' => '📊',
        'feature_title' => 'Datasets Library',
        'feature_description' => '300K+ datasets for training and evaluation across all modalities'
    ],
    [
        'feature_icon' => '🤖',
        'feature_title' => 'Transformers Library',
        'feature_description' => 'State-of-the-art NLP, vision, and audio models with unified API'
    ],
    [
        'feature_icon' => '☁️',
        'feature_title' => 'Inference Endpoints',
        'feature_description' => 'Deploy models to production with autoscaling and enterprise security'
    ],
    [
        'feature_icon' => '👥',
        'feature_title' => 'Community Collaboration',
        'feature_description' => 'Git-based version control, discussions, and pull requests for AI'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free community tier, Pro $9/month, Enterprise custom pricing', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '20 million+ monthly users',
    'company_founded' => '2016',
    'funding_raised' => '$470 million',
    'valuation' => '$7 billion',
    'models_hosted' => '1 million+',
    'datasets_available' => '300,000+',
    'spaces_deployed' => '500,000+',
    'github_stars' => '150K+ (Transformers)'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Open Source', 'Developer Tools', 'Community Platform'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['code-development', 'education-learning', 'all-types'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'developer-tech',
    'student-learner',
    'educator-teacher',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Hugging Face tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux', 'NotebookLM', 'Character AI', 'Replicate', 'Hugging Face'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Cohere (Enterprise AI Platform)</p>";

echo "<h4>🤗 Hugging Face Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>$7B valuation - open AI leader</li>";
echo "<li>20M+ monthly active users</li>";
echo "<li>1M+ models, 300K+ datasets hosted</li>";
echo "<li>Home to Llama, Mistral, Stable Diffusion</li>";
echo "<li>150K+ GitHub stars for Transformers</li>";
echo "<li>The 'GitHub of AI' for collaboration</li>";
echo "</ul>";
?>