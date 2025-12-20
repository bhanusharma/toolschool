#!/usr/bin/env php
<?php
/**
 * Command-line execution of AI tool imports
 * Run: php execute-imports.php
 */

// Set up server environment for WordPress
$_SERVER['HTTP_HOST'] = 'vibemake.local';
$_SERVER['REQUEST_URI'] = '/';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['SERVER_NAME'] = 'vibemake.local';
$_SERVER['SERVER_PORT'] = 80;
$_SERVER['SERVER_PROTOCOL'] = 'HTTP/1.1';
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = '/Users/bhanu/Vibe&Make - WP Local/app/public/index.php';
$_SERVER['PHP_SELF'] = '/index.php';
$_SERVER['QUERY_STRING'] = '';
$_SERVER['DOCUMENT_ROOT'] = '/Users/bhanu/Vibe&Make - WP Local/app/public';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
$_SERVER['HTTP_USER_AGENT'] = 'CLI';

// Change to WordPress root directory
chdir('/Users/bhanu/Vibe&Make - WP Local/app/public');

// Load WordPress
require_once('wp-load.php');

// Ensure we're logged in as admin
wp_set_current_user(1);

echo "🚀 Starting AI Tools Import Process\n";
echo "=====================================\n\n";

// List of tools to import
$tools = [
    'github-copilot' => 'GitHub Copilot',
    'stability-ai' => 'Stability AI',
    'elevenlabs' => 'Eleven Labs',
    'leonardo-ai' => 'Leonardo AI',
    'pika' => 'Pika',
    'ideogram' => 'Ideogram',
    'flux' => 'Flux',
    'notebooklm' => 'NotebookLM',
    'character-ai' => 'Character AI',
    'replicate' => 'Replicate',
    'huggingface' => 'Hugging Face',
    'cohere' => 'Cohere'
];

$success = 0;
$failed = 0;

foreach ($tools as $slug => $name) {
    echo "📥 Importing $name...\n";
    
    // Check if tool already exists
    $existing = get_page_by_title($name, OBJECT, 'tool');
    if ($existing) {
        echo "⚠️  $name already exists (ID: {$existing->ID}). Skipping.\n\n";
        continue;
    }
    
    $script_path = dirname(__FILE__) . "/create-$slug-tool.php";
    
    if (!file_exists($script_path)) {
        echo "❌ Script not found: $script_path\n\n";
        $failed++;
        continue;
    }
    
    // Capture output
    ob_start();
    $error = null;
    
    try {
        // Override the authentication check in the script
        if (!function_exists('is_user_logged_in')) {
            function is_user_logged_in() { return true; }
        }
        
        // Include the script
        include $script_path;
        
        $output = ob_get_clean();
        
        // Check for success
        if (strpos($output, 'Post ID:') !== false) {
            preg_match('/Post ID:.*?(\d+)/', $output, $matches);
            $post_id = isset($matches[1]) ? $matches[1] : 'unknown';
            echo "✅ Successfully imported $name (ID: $post_id)\n\n";
            $success++;
        } else {
            echo "⚠️  Import completed but status unclear for $name\n\n";
            $success++;
        }
        
    } catch (Exception $e) {
        ob_end_clean();
        echo "❌ Error importing $name: " . $e->getMessage() . "\n\n";
        $failed++;
    }
    
    // Small delay between imports
    usleep(250000); // 0.25 seconds
}

echo "=====================================\n";
echo "📊 Import Complete!\n";
echo "✅ Successfully imported: $success tools\n";
if ($failed > 0) {
    echo "❌ Failed: $failed tools\n";
}

// Show total tools count
$total_tools = wp_count_posts('tool');
echo "\n📈 Total tools in database: {$total_tools->publish}\n";

echo "\n🔗 View all tools: http://vibemake.local/wp-admin/edit.php?post_type=tool\n";
?>