<?php
/**
 * Suno Tool Creation Script - July 2025 Current Data
 * Creates comprehensive Suno tool entry with latest v4.5 and partnership data
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-suno-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🎵 Creating Suno Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the Suno tool post
$post_data = [
    'post_title'    => 'Suno',
    'post_content'  => 'Suno is the revolutionary AI music generation platform democratizing music creation for everyone. Powered by v4.5, the most expressive model yet, it creates full 4-minute songs with vocals nearly indistinguishable from human recordings. Partnered with Microsoft Copilot and Amazon Alexa+, Suno offers enhanced lyrics, dynamic song structures, and genre combinations. Features Covers, Personas, and Remaster tools for creative workflows.',
    'post_excerpt'  => 'AI music generation platform that creates full songs with vocals, lyrics, and instrumentals from simple text prompts.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created Suno tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Make any song you can imagine', $post_id);
$result2 = update_field('tool_website', 'https://suno.com', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Make any song you can imagine'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://suno.com'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['audio', 'business'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [audio, business]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '🎤',
        'feature_title' => 'Human-Like Vocals',
        'feature_description' => 'AI-generated vocals nearly indistinguishable from human recordings'
    ],
    [
        'feature_icon' => '🎭',
        'feature_title' => 'Personas & Covers',
        'feature_description' => 'Capture unique styles and reimagine existing audio with custom prompts'
    ],
    [
        'feature_icon' => '🎼',
        'feature_title' => 'Full Song Creation',
        'feature_description' => 'Generate complete 4-minute songs with lyrics, vocals, and instrumentals'
    ],
    [
        'feature_icon' => '🎨',
        'feature_title' => 'Advanced Genre Mixing',
        'feature_description' => 'Combine genres like "midwest emo with neosoul" or "EDM with folk"'
    ],
    [
        'feature_icon' => '✨',
        'feature_title' => 'Remaster & ReMi',
        'feature_description' => 'Upgrade old tracks to v4.5 quality and craft sharper lyrics'
    ],
    [
        'feature_icon' => '🤝',
        'feature_title' => 'Microsoft & Amazon Integration',
        'feature_description' => 'Available in Copilot and Alexa+ for voice-commanded music creation'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'freemium', $post_id);
$result8 = update_field('tool_pricing_summary', 'Free 50 credits daily, Pro $8/month, Premium $24/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: freemium<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => 'Millions of musicians',
    'company_founded' => '2022',
    'funding_raised' => '$500+ million valuation',
    'song_length' => 'Up to 4 minutes',
    'daily_free_songs' => '10 songs (50 credits)',
    'microsoft_partnership' => 'Copilot integration',
    'amazon_partnership' => 'Alexa+ integration $19.99/month',
    'model_version' => 'v4.5 (May 2025)'
];

$result9 = update_field('tool_stats', $tool_stats, $post_id);
echo ($result9 ? "✅" : "❌") . " tool_stats: comprehensive statistics added<br><br>";

// Set taxonomies
echo "🏷️ Setting taxonomies:<br>";

// Tool categories
$categories_result = wp_set_post_terms($post_id, ['AI & Machine Learning', 'Audio & Music', 'Creative Tools'], 'tool_category');
echo ($categories_result && !is_wp_error($categories_result)) ? "✅" : "❌";
echo " Tool Categories set<br>";

// Creation types
$creation_result = wp_set_post_terms($post_id, ['audio-music'], 'creation_type');
echo ($creation_result && !is_wp_error($creation_result)) ? "✅" : "❌";
echo " Creation Types set<br>";

// User situations - Suno serves content creators, musicians, businesses
$user_result = wp_set_post_terms($post_id, [
    'content-creator-influencer',
    'business-professional',
    'entrepreneur-founder',
    'marketer-growth',
    'student-learner'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>Suno tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> GitHub Copilot (Microsoft's AI Coding Assistant)</p>";

echo "<h4>🎵 Suno Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>v4.5 model with human-like vocals</li>";
echo "<li>Microsoft Copilot & Amazon Alexa+ partnerships</li>";
echo "<li>$500M+ valuation despite copyright controversies</li>";
echo "<li>10 free songs daily, up to 4-minute tracks</li>";
echo "<li>Advanced genre mixing and Personas features</li>";
echo "<li>Available on web, mobile, and voice assistants</li>";
echo "</ul>";
?>