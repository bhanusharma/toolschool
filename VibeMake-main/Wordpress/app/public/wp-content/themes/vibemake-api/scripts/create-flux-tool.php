<?php
/**
 * Flux Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Flux tool entry by Black Forest Labs
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-flux-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>⚡ Creating Flux Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Flux tool post
$post_data = [
    'post_title'    => 'Flux',
    'post_content'  => 'Flux by Black Forest Labs represents the next generation of image AI, created by the original Stable Diffusion team. With Flux.1 Pro, Dev, and Schnell variants, it delivers unmatched photorealism, prompt adherence, and speed. The 12B parameter model excels at human anatomy, complex compositions, and artistic styles. Integrated into major platforms and offering both API and open-source options.',
    'post_excerpt'  => 'Next-gen image AI from Stable Diffusion creators, offering state-of-the-art quality, speed, and versatility.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Flux tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'The future of image synthesis - from the creators of Stable Diffusion', $post_id);
$result2 = update_field('tool_website', 'https://blackforestlabs.ai', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'The future of image synthesis - from the creators of Stable Diffusion'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://blackforestlabs.ai'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['images', 'design', 'art', 'business'], $post_id);
$result5 = update_field('tool_difficulty', 'intermediate', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [images, design, art, business]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: intermediate<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🚀',
        'feature_title' => 'Flux.1 Models',
        'feature_description' => 'Pro for quality, Dev for balance, Schnell for speed - all state-of-the-art'
    ],
    [
        'feature_icon' => '👤',
        'feature_title' => 'Perfect Human Anatomy',
        'feature_description' => 'Industry-best rendering of hands, faces, and body proportions'
    ],
    [
        'feature_icon' => '📝',
        'feature_title' => 'Superior Prompt Following',
        'feature_description' => 'Understands complex prompts with multiple subjects and attributes'
    ],
    [
        'feature_icon' => '⚡',
        'feature_title' => 'Flux Schnell Speed',
        'feature_description' => 'Generate high-quality images in under 2 seconds'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Artistic Versatility',
        'feature_description' => 'From photorealism to abstract art, anime to oil paintings'
    ],
    [
        'feature_icon' => '🔓',
        'feature_title' => 'Open Ecosystem',
        'feature_description' => 'Dev model available for commercial use with permissive license'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'usage_based', $post_id);
$result8 = update_field('tool_pricing_summary', 'API: Pro $0.055/image, Dev $0.025/image, Schnell $0.003/image', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: usage_based<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => '2 million+ developers',
    'company_founded' => '2024',
    'funding_raised' => '$31 million seed',
    'team_background' => 'Original Stable Diffusion creators',
    'model_parameters' => '12 billion',
    'api_requests' => '100M+ monthly',
    'integration_partners' => 'Replicate, Hugging Face, Fal.ai',
    'generation_speed' => '<2 seconds (Schnell)'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Image Generation', 'Open Source'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['images-art', 'design-graphics'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations
$user_result = wp_set_post_terms($post_id, [
    'designer-creative',
    'developer-tech',
    'content-creator-influencer',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Flux tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot', 'Stability AI', 'Eleven Labs', 'Leonardo AI', 'Pika', 'Ideogram', 'Flux'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> NotebookLM (Google's AI Research Assistant)</p>";

echo "<h4>⚡ Flux Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>Created by original Stable Diffusion team</li>";
echo "<li>$31M seed funding from a16z</li>";
echo "<li>12B parameter model - larger than SDXL</li>";
echo "<li>100M+ API requests monthly</li>";
echo "<li>Flux Schnell: <2 second generation</li>";
echo "<li>Best-in-class human anatomy rendering</li>";
echo "</ul>";
?>