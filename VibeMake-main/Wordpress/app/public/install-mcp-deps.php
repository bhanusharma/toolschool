<?php
/**
 * Install WordPress MCP Dependencies
 * Access at: http://vibemake.local/install-mcp-deps.php
 */

echo "<pre>";
echo "WordPress MCP Dependency Installation\n";
echo "=====================================\n\n";

$plugin_dir = WP_CONTENT_DIR . '/plugins/wordpress-mcp';
$composer_json = $plugin_dir . '/composer.json';
$vendor_dir = $plugin_dir . '/vendor';

// Check if composer.json exists
if (!file_exists($composer_json)) {
    die("❌ composer.json not found at: $composer_json");
}

// Check if vendor directory already exists
if (file_exists($vendor_dir . '/autoload.php')) {
    echo "✅ Dependencies already installed!\n";
    echo "Vendor directory exists at: $vendor_dir\n\n";
    echo '<a href="/activate-mcp.php">Activate the plugin</a>';
    exit;
}

// Download composer if needed
$composer_phar = $plugin_dir . '/composer.phar';
if (!file_exists($composer_phar)) {
    echo "📥 Downloading Composer...\n";
    $composer_installer = file_get_contents('https://getcomposer.org/installer');
    file_put_contents($plugin_dir . '/composer-setup.php', $composer_installer);
    
    // Run installer
    $old_dir = getcwd();
    chdir($plugin_dir);
    exec('php composer-setup.php --quiet', $output, $return_var);
    unlink('composer-setup.php');
    chdir($old_dir);
    
    if ($return_var !== 0) {
        die("❌ Failed to install Composer");
    }
    echo "✅ Composer downloaded\n\n";
}

// Run composer install
echo "📦 Installing dependencies...\n";
$old_dir = getcwd();
chdir($plugin_dir);
exec('php composer.phar install --no-dev --optimize-autoloader 2>&1', $output, $return_var);
chdir($old_dir);

if ($return_var === 0) {
    echo "✅ Dependencies installed successfully!\n\n";
    echo "Output:\n";
    echo implode("\n", array_slice($output, 0, 10)) . "\n";
    echo "\n";
    echo '<a href="/activate-mcp.php">Now activate the plugin</a>';
} else {
    echo "❌ Installation failed\n\n";
    echo "Error output:\n";
    echo implode("\n", $output);
}

echo "</pre>";
?>