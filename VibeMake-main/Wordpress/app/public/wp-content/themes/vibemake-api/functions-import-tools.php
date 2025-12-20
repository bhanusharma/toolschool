<?php
/**
 * Add AI Tools Import functionality to WordPress Admin
 */

// Add admin menu item
add_action('admin_menu', 'add_ai_tools_import_menu');

function add_ai_tools_import_menu() {
    add_submenu_page(
        'edit.php?post_type=tool',
        'Import AI Tools',
        'Import AI Tools',
        'manage_options',
        'import-ai-tools',
        'render_ai_tools_import_page'
    );
}

// Render the import page
function render_ai_tools_import_page() {
    // Handle form submission
    if (isset($_POST['import_tools']) && wp_verify_nonce($_POST['import_nonce'], 'import_ai_tools')) {
        import_remaining_ai_tools();
        return;
    }
    
    ?>
    <div class="wrap">
        <h1>Import AI Tools</h1>
        <p>Click the button below to import all remaining AI tools.</p>
        
        <form method="post">
            <?php wp_nonce_field('import_ai_tools', 'import_nonce'); ?>
            <p class="submit">
                <input type="submit" name="import_tools" class="button button-primary" value="Import All Remaining Tools">
            </p>
        </form>
        
        <div class="notice notice-info">
            <p><strong>Tools to be imported:</strong></p>
            <ul style="list-style: disc; margin-left: 20px;">
                <li>GitHub Copilot</li>
                <li>Stability AI</li>
                <li>Eleven Labs</li>
                <li>Leonardo AI</li>
                <li>Pika</li>
                <li>Ideogram</li>
                <li>Flux</li>
                <li>NotebookLM</li>
                <li>Character AI</li>
                <li>Replicate</li>
                <li>Hugging Face</li>
                <li>Cohere</li>
            </ul>
        </div>
    </div>
    <?php
}

// Import function
function import_remaining_ai_tools() {
    echo '<div class="wrap">';
    echo '<h1>Importing AI Tools...</h1>';
    
    // List of scripts to execute
    $scripts = [
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
    
    $success = 0;
    $failed = 0;
    
    foreach ($scripts as $script) {
        $tool_name = str_replace(['create-', '-tool.php'], ['', ''], $script);
        $tool_name = str_replace('-', ' ', $tool_name);
        $tool_name = ucwords($tool_name);
        
        echo "<h3>Importing $tool_name...</h3>";
        
        $script_path = get_template_directory() . '/scripts/' . $script;
        
        if (file_exists($script_path)) {
            ob_start();
            
            // Include the script directly
            include $script_path;
            
            $output = ob_get_clean();
            
            if (strpos($output, 'SUCCESS') !== false || strpos($output, 'Post ID:') !== false) {
                echo '<div class="notice notice-success"><p>✅ Successfully imported ' . $tool_name . '</p></div>';
                $success++;
            } else {
                echo '<div class="notice notice-warning"><p>⚠️ Import completed for ' . $tool_name . ' but status unclear</p></div>';
                // Show output for debugging
                echo '<details><summary>View output</summary><pre>' . wp_kses_post($output) . '</pre></details>';
            }
        } else {
            echo '<div class="notice notice-error"><p>❌ Script not found for ' . $tool_name . '</p></div>';
            $failed++;
        }
        
        flush();
    }
    
    echo '<h2>Import Complete!</h2>';
    echo '<div class="notice notice-success"><p>✅ Successfully imported: ' . $success . ' tools</p></div>';
    if ($failed > 0) {
        echo '<div class="notice notice-error"><p>❌ Failed: ' . $failed . ' tools</p></div>';
    }
    
    echo '<p><a href="' . admin_url('edit.php?post_type=tool') . '" class="button button-primary">View All Tools</a></p>';
    echo '</div>';
}
?>