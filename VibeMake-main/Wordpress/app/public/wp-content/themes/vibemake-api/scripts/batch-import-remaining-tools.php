<?php
/**
 * Batch Import Remaining AI Tools
 * Executes all remaining tool creation scripts automatically
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Set up WordPress environment
if (!defined('WP_ADMIN')) {
    define('WP_ADMIN', true);
}

// Mock authentication for script execution
wp_set_current_user(1); // Set as admin user

echo "<h1>🚀 Batch Importing Remaining AI Tools</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px;'>";

// List of remaining tools to import
$remaining_tools = [
    'create-github-copilot-tool.php',
    'create-stability-ai-tool.php', 
    'create-elevenlabs-tool.php',
    'create-leonardo-ai-tool.php',
    'create-pika-tool.php',
    'create-ideogram-tool.php',
    'create-flux-tool.php',
    'create-notebooklm-tool.php',
    'create-character-ai-tool.php',
    'create-replicate-tool.php',
    'create-huggingface-tool.php',
    'create-cohere-tool.php'
];

$success_count = 0;
$error_count = 0;

foreach ($remaining_tools as $script) {
    echo "<h3>📥 Importing: " . str_replace(['create-', '-tool.php'], ['', ''], $script) . "</h3>";
    
    $script_path = __DIR__ . '/' . $script;
    
    if (file_exists($script_path)) {
        // Capture output
        ob_start();
        
        try {
            // Include and execute the script
            include($script_path);
            $output = ob_get_clean();
            
            // Check if import was successful by looking for success indicators
            if (strpos($output, 'SUCCESS') !== false || strpos($output, 'Post ID:') !== false) {
                echo "<div style='color: green;'>✅ Successfully imported!</div>";
                $success_count++;
            } else {
                echo "<div style='color: orange;'>⚠️ Import completed but status unclear</div>";
                echo "<details><summary>View output</summary><pre>" . htmlspecialchars($output) . "</pre></details>";
            }
        } catch (Exception $e) {
            ob_end_clean();
            echo "<div style='color: red;'>❌ Error: " . $e->getMessage() . "</div>";
            $error_count++;
        }
    } else {
        echo "<div style='color: red;'>❌ Script not found: $script</div>";
        $error_count++;
    }
    
    echo "<hr>";
    
    // Small delay to prevent overwhelming the system
    usleep(500000); // 0.5 second delay
}

echo "</div>";

echo "<h2>📊 Import Summary</h2>";
echo "<p style='font-size: 18px;'>";
echo "✅ Successfully imported: <strong>$success_count tools</strong><br>";
if ($error_count > 0) {
    echo "❌ Errors encountered: <strong>$error_count tools</strong><br>";
}
echo "</p>";

if ($success_count === count($remaining_tools)) {
    echo "<h2 style='color: green;'>🎉 All tools imported successfully!</h2>";
    echo "<p>All 20 AI tools are now in your WordPress database.</p>";
} else {
    echo "<h2 style='color: orange;'>⚠️ Some imports may need attention</h2>";
    echo "<p>Please check the WordPress admin to verify all tools were imported correctly.</p>";
}

echo "<p><a href='" . admin_url('edit.php?post_type=tool') . "' target='_blank'>View all tools in WordPress admin →</a></p>";
?>