<?php
/**
 * Direct AI Tools Import Page
 * Access directly at: http://vibemake.local/wp-content/themes/vibemake-api/import-tools-direct.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Check if user is logged in
if (!is_user_logged_in() || !current_user_can('manage_options')) {
    wp_redirect(admin_url());
    exit;
}

// Get current user
$current_user = wp_get_current_user();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import AI Tools - VibeMake</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f0f0f0;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #0073aa;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            border: none;
            font-size: 16px;
            cursor: pointer;
            margin: 10px 0;
        }
        .button:hover { background: #005a87; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .warning { color: orange; font-weight: bold; }
        .tool-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }
        .tool-item {
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .progress {
            margin: 20px 0;
            padding: 20px;
            background: #f0f7ff;
            border-radius: 4px;
            border: 1px solid #b3d9ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Import AI Tools</h1>
        <p>Welcome, <?php echo esc_html($current_user->display_name); ?>!</p>
        
        <?php if (!isset($_GET['run'])): ?>
            <h2>Tools to Import</h2>
            <div class="tool-list">
                <div class="tool-item">✅ GitHub Copilot</div>
                <div class="tool-item">✅ Stability AI</div>
                <div class="tool-item">✅ Eleven Labs</div>
                <div class="tool-item">✅ Leonardo AI</div>
                <div class="tool-item">✅ Pika</div>
                <div class="tool-item">✅ Ideogram</div>
                <div class="tool-item">✅ Flux</div>
                <div class="tool-item">✅ NotebookLM</div>
                <div class="tool-item">✅ Character AI</div>
                <div class="tool-item">✅ Replicate</div>
                <div class="tool-item">✅ Hugging Face</div>
                <div class="tool-item">✅ Cohere</div>
            </div>
            
            <p>Click the button below to import all 12 remaining AI tools.</p>
            <a href="?run=1" class="button">🎯 Start Import</a>
            <a href="<?php echo admin_url('edit.php?post_type=tool'); ?>" class="button" style="background: #666;">📋 View Current Tools</a>
            
        <?php else: ?>
            <h2>Import Progress</h2>
            <div class="progress">
            <?php
            // Run the import
            $scripts = [
                'create-github-copilot-tool.php' => 'GitHub Copilot',
                'create-stability-ai-tool.php' => 'Stability AI',
                'create-elevenlabs-tool.php' => 'Eleven Labs',
                'create-leonardo-ai-tool.php' => 'Leonardo AI',
                'create-pika-tool.php' => 'Pika',
                'create-ideogram-tool.php' => 'Ideogram',
                'create-flux-tool.php' => 'Flux',
                'create-notebooklm-tool.php' => 'NotebookLM',
                'create-character-ai-tool.php' => 'Character AI',
                'create-replicate-tool.php' => 'Replicate',
                'create-huggingface-tool.php' => 'Hugging Face',
                'create-cohere-tool.php' => 'Cohere'
            ];
            
            $success = 0;
            $skipped = 0;
            $failed = 0;
            
            foreach ($scripts as $script => $tool_name) {
                echo "<p>📥 Importing <strong>$tool_name</strong>...</p>";
                
                // Check if already exists
                $existing = get_page_by_title($tool_name, OBJECT, 'tool');
                if ($existing) {
                    echo "<p class='warning'>⚠️ $tool_name already exists (ID: {$existing->ID}). Skipping.</p>";
                    $skipped++;
                    continue;
                }
                
                $script_path = __DIR__ . '/scripts/' . $script;
                
                if (file_exists($script_path)) {
                    ob_start();
                    include $script_path;
                    $output = ob_get_clean();
                    
                    if (strpos($output, 'SUCCESS') !== false || strpos($output, 'Post ID:') !== false) {
                        // Extract post ID
                        preg_match('/Post ID:.*?(\d+)/', $output, $matches);
                        $post_id = isset($matches[1]) ? $matches[1] : 'unknown';
                        echo "<p class='success'>✅ Successfully imported $tool_name (ID: $post_id)</p>";
                        $success++;
                    } else {
                        echo "<p class='error'>❌ Failed to import $tool_name</p>";
                        echo "<details><summary>View details</summary><pre>" . htmlspecialchars($output) . "</pre></details>";
                        $failed++;
                    }
                } else {
                    echo "<p class='error'>❌ Script not found for $tool_name</p>";
                    $failed++;
                }
                
                echo "<hr style='margin: 10px 0; border: none; border-top: 1px solid #eee;'>";
                flush();
                ob_flush();
            }
            ?>
            </div>
            
            <h2>Import Summary</h2>
            <p class="success">✅ Successfully imported: <?php echo $success; ?> tools</p>
            <?php if ($skipped > 0): ?>
                <p class="warning">⚠️ Skipped (already exist): <?php echo $skipped; ?> tools</p>
            <?php endif; ?>
            <?php if ($failed > 0): ?>
                <p class="error">❌ Failed: <?php echo $failed; ?> tools</p>
            <?php endif; ?>
            
            <p style="margin-top: 30px;">
                <a href="<?php echo admin_url('edit.php?post_type=tool'); ?>" class="button">📋 View All Tools</a>
                <a href="?" class="button" style="background: #666;">🔄 Back to Import Page</a>
            </p>
        <?php endif; ?>
    </div>
</body>
</html>