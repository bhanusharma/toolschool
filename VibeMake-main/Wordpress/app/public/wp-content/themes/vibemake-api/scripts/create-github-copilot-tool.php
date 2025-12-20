<?php
/**
 * GitHub Copilot Tool Creation Script - July 2025 Current Data
 * Creates comprehensive GitHub Copilot tool entry with latest features and Microsoft backing
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/create-github-copilot-tool.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🐙 Creating GitHub Copilot Tool Entry (July 2025)</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// Create the GitHub Copilot tool post
$post_data = [
    'post_title'    => 'GitHub Copilot',
    'post_content'  => 'GitHub Copilot is Microsoft\'s AI pair programmer that revolutionized coding with context-aware suggestions. Powered by OpenAI Codex and GPT-4.5, it integrates seamlessly with VS Code, JetBrains IDEs, Neovim, and GitHub.com. Features Copilot Chat for conversational coding, workspace indexing for full codebase understanding, and enterprise security. Used by 50,000+ organizations and millions of developers, increasing productivity by 55%.',
    'post_excerpt'  => 'Microsoft\'s AI pair programmer offering real-time code suggestions, chat assistance, and deep IDE integration.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
];

$post_id = wp_insert_post($post_data);

if (is_wp_error($post_id)) {
    echo "❌ Error creating post: " . $post_id->get_error_message() . "<br>";
    exit;
}

echo "✅ Created GitHub Copilot tool post with ID: <strong>$post_id</strong><br><br>";

// Set ACF fields
echo "📝 Setting ACF fields:<br>";

if (!function_exists('update_field')) {
    echo "❌ ACF not available<br>";
    exit;
}

// Basic Information
$result1 = update_field('tool_tagline', 'Your AI pair programmer - Code faster with confidence', $post_id);
$result2 = update_field('tool_website', 'https://github.com/features/copilot', $post_id);
$result3 = update_field('tool_featured', true, $post_id);

echo ($result1 ? "✅" : "❌") . " tool_tagline: 'Your AI pair programmer - Code faster with confidence'<br>";
echo ($result2 ? "✅" : "❌") . " tool_website: 'https://github.com/features/copilot'<br>";
echo ($result3 ? "✅" : "❌") . " tool_featured: true<br><br>";

// Classification
$result4 = update_field('tool_use_cases', ['code', 'automation', 'education'], $post_id);
$result5 = update_field('tool_difficulty', 'beginner', $post_id);

echo ($result4 ? "✅" : "❌") . " tool_use_cases: [code, automation, education]<br>";
echo ($result5 ? "✅" : "❌") . " tool_difficulty: beginner<br><br>";

// Key Features
$key_features = [
    [
        'feature_icon' => '💡',
        'feature_title' => 'Context-Aware Suggestions',
        'feature_description' => 'AI understands your codebase context for relevant, accurate completions'
    ],
    [
        'feature_icon' => '💬',
        'feature_title' => 'Copilot Chat',
        'feature_description' => 'Conversational AI for debugging, explaining code, and generating tests'
    ],
    [
        'feature_icon' => '🏢',
        'feature_title' => 'Workspace Integration',
        'feature_description' => 'Indexes entire repositories for comprehensive code understanding'
    ],
    [
        'feature_icon' => '🔒',
        'feature_title' => 'Enterprise Security',
        'feature_description' => 'SOC 2 compliant with IP indemnity and zero data retention options'
    ],
    [
        'feature_icon' => '📱',
        'feature_title' => 'Multi-Platform Support',
        'feature_description' => 'Works in VS Code, JetBrains, Neovim, GitHub.com, and mobile'
    ],
    [
        'feature_icon' => '📊',
        'feature_title' => 'Proven Productivity',
        'feature_description' => '55% faster coding, 88% feel more productive, 77% spend less time searching'
    ]
];

$result6 = update_field('tool_key_features', $key_features, $post_id);
echo ($result6 ? "✅" : "❌") . " tool_key_features: 6 features added<br><br>";

// Pricing
$result7 = update_field('tool_pricing_model', 'subscription', $post_id);
$result8 = update_field('tool_pricing_summary', 'Individual $10/month, Business $19/month, Enterprise $39/month', $post_id);

echo ($result7 ? "✅" : "❌") . " tool_pricing_model: subscription<br>";
echo ($result8 ? "✅" : "❌") . " tool_pricing_summary: pricing tiers<br><br>";

// Stats
$tool_stats = [
    'user_count' => 'Millions of developers',
    'company_founded' => '2021 (GitHub/Microsoft)',
    'parent_company' => 'Microsoft',
    'organizations' => '50,000+ organizations',
    'productivity_gain' => '55% faster task completion',
    'code_acceptance' => '30% acceptance rate',
    'languages_supported' => 'All major programming languages',
    'fortune_500_adoption' => '90% of Fortune 500'
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

// User situations - GitHub Copilot serves developers, students, teams
$user_result = wp_set_post_terms($post_id, [
    'developer-tech',
    'student-learner',
    'business-professional',
    'entrepreneur-founder'
], 'user_situation');
echo ($user_result && !is_wp_error($user_result)) ? "✅" : "❌";
echo " User Situations set<br><br>";

echo "<h2>🎉 SUCCESS!</h2>";
echo "<strong>GitHub Copilot tool entry created successfully with July 2025 data!</strong><br><br>";
echo "📍 <strong>Post ID:</strong> $post_id<br>";
echo "🔗 <strong>Edit in admin:</strong> <a href='" . admin_url("post.php?post=$post_id&action=edit") . "' target='_blank'>Edit Tool</a><br>";
echo "🔗 <strong>View on site:</strong> <a href='" . get_permalink($post_id) . "' target='_blank'>View Tool</a><br>";

echo "</div>";

// Log progress with current July 2025 info
$completed_tools = ['Midjourney', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Runway', 'Suno', 'GitHub Copilot'];
echo "<br><h3>📊 Progress: " . count($completed_tools) . "/20 tools completed (July 2025 data)</h3>";
echo "<p><strong>Completed:</strong> " . implode(', ', $completed_tools) . "</p>";
echo "<p><strong>Next:</strong> Stability AI (Open Source Image Generation Leader)</p>";

echo "<h4>🐙 GitHub Copilot Key Stats July 2025:</h4>";
echo "<ul>";
echo "<li>Microsoft-backed with OpenAI partnership</li>";
echo "<li>50,000+ organizations using Copilot</li>";
echo "<li>55% productivity improvement documented</li>";
echo "<li>90% of Fortune 500 companies adopted</li>";
echo "<li>Copilot Chat with GPT-4.5 integration</li>";
echo "<li>Full workspace indexing and understanding</li>";
echo "</ul>";
?>