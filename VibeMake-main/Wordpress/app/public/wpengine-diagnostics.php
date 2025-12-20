<?php
/**
 * WPEngine Diagnostics for VibeMake
 * 
 * Access this file at: http://vibemake.local/wpengine-diagnostics.php
 * 
 * This script checks for WPEngine-specific performance issues.
 */

// Load WordPress
require_once( dirname(__FILE__) . '/wp-load.php' );

// Check if user is logged in and is admin
if ( ! is_user_logged_in() ) {
    // User is not logged in
    $login_url = wp_login_url( $_SERVER['REQUEST_URI'] );
    wp_die( 
        '<div style="text-align: center; padding: 50px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;">
            <h1>Authentication Required</h1>
            <p>You must be logged in as an administrator to view this page.</p>
            <p><a href="' . esc_url( $login_url ) . '" style="display: inline-block; padding: 10px 20px; background: #0073aa; color: white; text-decoration: none; border-radius: 4px;">Log In</a></p>
        </div>',
        'WPEngine Diagnostics - Login Required',
        array( 'response' => 403 )
    );
} elseif ( ! current_user_can( 'manage_options' ) ) {
    // User is logged in but not admin
    wp_die( 
        '<div style="text-align: center; padding: 50px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;">
            <h1>Access Denied</h1>
            <p>You must be an administrator to view this page.</p>
            <p>Current user: ' . wp_get_current_user()->user_login . '</p>
            <p><a href="' . esc_url( admin_url() ) . '" style="display: inline-block; padding: 10px 20px; background: #0073aa; color: white; text-decoration: none; border-radius: 4px;">Go to Admin</a></p>
        </div>',
        'WPEngine Diagnostics - Access Denied',
        array( 'response' => 403 )
    );
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>WPEngine Diagnostics - VibeMake</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 1000px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .status { 
            padding: 10px 15px; 
            margin: 10px 0; 
            border-radius: 4px;
        }
        .success { 
            background: #d4edda; 
            color: #155724; 
            border: 1px solid #c3e6cb;
        }
        .error { 
            background: #f8d7da; 
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .warning { 
            background: #fff3cd; 
            color: #856404;
            border: 1px solid #ffeeba;
        }
        .info { 
            background: #d1ecf1; 
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
        code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: Monaco, Consolas, monospace;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: bold;
        }
        .large-option {
            background: #ffebee;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background: #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            height: 100%;
            background: #4caf50;
            transition: width 0.3s ease;
        }
        .progress-fill.warning {
            background: #ff9800;
        }
        .progress-fill.danger {
            background: #f44336;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WPEngine Diagnostics for VibeMake</h1>
        
        <?php
        global $wpdb;
        
        // Test 1: Check if running on WPEngine
        echo '<h2>1. WPEngine Environment</h2>';
        if ( defined( 'WPE_CLUSTER_ID' ) || getenv( 'IS_WPE' ) || defined( 'WPE_PLUGIN_VERSION' ) ) {
            echo '<div class="status success">✓ Running on WPEngine environment</div>';
            if ( defined( 'WPE_CLUSTER_ID' ) ) {
                echo '<div class="status info">Cluster ID: ' . WPE_CLUSTER_ID . '</div>';
            }
        } else {
            echo '<div class="status info">ℹ Not running on WPEngine (local development)</div>';
        }
        
        // Test 2: Autoload Data Size (Critical for WPEngine)
        echo '<h2>2. Autoload Data Size Check</h2>';
        
        $autoload_size = $wpdb->get_var( "
            SELECT SUM(LENGTH(option_value)) 
            FROM {$wpdb->options} 
            WHERE autoload = 'yes'
        " );
        
        $autoload_size_kb = $autoload_size / 1024;
        $autoload_percentage = ( $autoload_size_kb / 800 ) * 100;
        
        echo '<p>Total autoload data: <strong>' . size_format( $autoload_size ) . '</strong></p>';
        
        echo '<div class="progress-bar">';
        $progress_class = '';
        if ( $autoload_percentage > 90 ) {
            $progress_class = 'danger';
        } elseif ( $autoload_percentage > 75 ) {
            $progress_class = 'warning';
        }
        echo '<div class="progress-fill ' . $progress_class . '" style="width: ' . min( $autoload_percentage, 100 ) . '%"></div>';
        echo '</div>';
        
        if ( $autoload_size_kb > 800 ) {
            echo '<div class="status error">✗ Autoload data exceeds WPEngine\'s 800KB limit! This will cause 502 errors with object caching enabled.</div>';
        } elseif ( $autoload_size_kb > 600 ) {
            echo '<div class="status warning">⚠ Autoload data is approaching the 800KB limit (' . round( $autoload_percentage ) . '% used)</div>';
        } else {
            echo '<div class="status success">✓ Autoload data is within safe limits (' . round( $autoload_percentage ) . '% of 800KB used)</div>';
        }
        
        // Test 3: Large Autoloaded Options
        echo '<h2>3. Large Autoloaded Options</h2>';
        
        $large_options = $wpdb->get_results( "
            SELECT option_name, LENGTH(option_value) as size 
            FROM {$wpdb->options} 
            WHERE autoload = 'yes' 
            AND LENGTH(option_value) > 10240
            ORDER BY size DESC
            LIMIT 20
        " );
        
        if ( ! empty( $large_options ) ) {
            echo '<table>';
            echo '<tr><th>Option Name</th><th>Size</th><th>Recommendation</th></tr>';
            foreach ( $large_options as $option ) {
                $class = $option->size > 102400 ? 'large-option' : '';
                echo '<tr class="' . $class . '">';
                echo '<td><code>' . esc_html( $option->option_name ) . '</code></td>';
                echo '<td>' . size_format( $option->size ) . '</td>';
                echo '<td>';
                if ( $option->size > 102400 ) {
                    echo '<span class="status error">Should not autoload</span>';
                } elseif ( strpos( $option->option_name, '_transient' ) !== false ) {
                    echo '<span class="status warning">Consider non-autoload</span>';
                } else {
                    echo '<span class="status info">Monitor size</span>';
                }
                echo '</td>';
                echo '</tr>';
            }
            echo '</table>';
        } else {
            echo '<div class="status success">✓ No large autoloaded options found</div>';
        }
        
        // Test 4: Transients Check
        echo '<h2>4. Transients Analysis</h2>';
        
        $total_transients = $wpdb->get_var( "
            SELECT COUNT(*) 
            FROM {$wpdb->options} 
            WHERE option_name LIKE '_transient_%'
        " );
        
        $autoload_transients = $wpdb->get_var( "
            SELECT COUNT(*) 
            FROM {$wpdb->options} 
            WHERE option_name LIKE '_transient_%' 
            AND autoload = 'yes'
        " );
        
        $large_transients = $wpdb->get_var( "
            SELECT COUNT(*) 
            FROM {$wpdb->options} 
            WHERE option_name LIKE '_transient_%' 
            AND LENGTH(option_value) > 10240
        " );
        
        echo '<table>';
        echo '<tr><th>Metric</th><th>Count</th><th>Status</th></tr>';
        echo '<tr>';
        echo '<td>Total Transients</td>';
        echo '<td>' . $total_transients . '</td>';
        echo '<td>' . ( $total_transients > 100 ? '<span class="status warning">Consider cleanup</span>' : '<span class="status success">OK</span>' ) . '</td>';
        echo '</tr>';
        echo '<tr>';
        echo '<td>Autoloaded Transients</td>';
        echo '<td>' . $autoload_transients . '</td>';
        echo '<td>' . ( $autoload_transients > 20 ? '<span class="status error">Too many!</span>' : '<span class="status success">OK</span>' ) . '</td>';
        echo '</tr>';
        echo '<tr>';
        echo '<td>Large Transients (>10KB)</td>';
        echo '<td>' . $large_transients . '</td>';
        echo '<td>' . ( $large_transients > 10 ? '<span class="status warning">Review needed</span>' : '<span class="status success">OK</span>' ) . '</td>';
        echo '</tr>';
        echo '</table>';
        
        // Test 5: Object Cache Buffer Usage
        echo '<h2>5. Object Cache Buffer Estimation</h2>';
        
        $cache_usage_estimate = $autoload_size + ( $autoload_transients * 5000 ); // Rough estimate
        $buffer_percentage = ( $cache_usage_estimate / 1048576 ) * 100; // 1MB buffer
        
        echo '<p>Estimated cache buffer usage: <strong>' . size_format( $cache_usage_estimate ) . '</strong> of 1MB</p>';
        
        echo '<div class="progress-bar">';
        $progress_class = '';
        if ( $buffer_percentage > 90 ) {
            $progress_class = 'danger';
        } elseif ( $buffer_percentage > 75 ) {
            $progress_class = 'warning';
        }
        echo '<div class="progress-fill ' . $progress_class . '" style="width: ' . min( $buffer_percentage, 100 ) . '%"></div>';
        echo '</div>';
        
        if ( $buffer_percentage > 100 ) {
            echo '<div class="status error">✗ Buffer usage exceeds 1MB limit! Object caching will cause issues.</div>';
        } elseif ( $buffer_percentage > 75 ) {
            echo '<div class="status warning">⚠ Buffer usage is high (' . round( $buffer_percentage ) . '% used)</div>';
        } else {
            echo '<div class="status success">✓ Buffer usage is within limits (' . round( $buffer_percentage ) . '% used)</div>';
        }
        
        // Test 6: GraphQL Caching
        echo '<h2>6. GraphQL Performance Settings</h2>';
        echo '<table>';
        echo '<tr><th>Setting</th><th>Value</th><th>Status</th></tr>';
        
        $graphql_settings = array(
            'GRAPHQL_CACHE_ENABLED' => array(
                'value' => defined('GRAPHQL_CACHE_ENABLED') ? (GRAPHQL_CACHE_ENABLED ? 'Enabled' : 'Disabled') : 'Not set',
                'good' => defined('GRAPHQL_CACHE_ENABLED') && GRAPHQL_CACHE_ENABLED
            ),
            'GRAPHQL_REQUEST_CACHE_TTL' => array(
                'value' => defined('GRAPHQL_REQUEST_CACHE_TTL') ? GRAPHQL_REQUEST_CACHE_TTL . ' seconds' : 'Not set',
                'good' => defined('GRAPHQL_REQUEST_CACHE_TTL')
            ),
            'WP_MEMORY_LIMIT' => array(
                'value' => WP_MEMORY_LIMIT,
                'good' => wp_convert_hr_to_bytes(WP_MEMORY_LIMIT) >= 268435456 // 256MB
            ),
            'WP_MAX_MEMORY_LIMIT' => array(
                'value' => WP_MAX_MEMORY_LIMIT,
                'good' => wp_convert_hr_to_bytes(WP_MAX_MEMORY_LIMIT) >= 536870912 // 512MB
            )
        );
        
        foreach ( $graphql_settings as $setting => $info ) {
            echo '<tr>';
            echo '<td><code>' . $setting . '</code></td>';
            echo '<td>' . $info['value'] . '</td>';
            echo '<td>' . ( $info['good'] ? '<span class="status success">✓</span>' : '<span class="status warning">Could be optimized</span>' ) . '</td>';
            echo '</tr>';
        }
        echo '</table>';
        
        // Recommendations
        echo '<h2>Recommendations</h2>';
        echo '<div class="info" style="padding: 20px; margin-top: 20px;">';
        
        if ( $autoload_size_kb > 600 || $autoload_transients > 20 || $large_transients > 10 ) {
            echo '<h3>⚠ Action Required:</h3>';
            echo '<ol>';
            
            if ( $autoload_size_kb > 600 ) {
                echo '<li>Reduce autoload data by setting large options to autoload=\'no\'</li>';
            }
            
            if ( $autoload_transients > 20 ) {
                echo '<li>Clean up autoloaded transients: <code>DELETE FROM ' . $wpdb->options . ' WHERE option_name LIKE \'_transient_%\' AND autoload = \'yes\';</code></li>';
            }
            
            if ( $large_transients > 10 ) {
                echo '<li>Review and optimize large transients or use external caching</li>';
            }
            
            echo '</ol>';
        } else {
            echo '<h3>✓ Your site is optimized for WPEngine!</h3>';
            echo '<p>All critical metrics are within recommended limits.</p>';
        }
        
        echo '<h3>WPEngine Best Practices:</h3>';
        echo '<ul>';
        echo '<li>Keep autoload data under 800KB (currently ' . round($autoload_size_kb) . 'KB)</li>';
        echo '<li>Monitor object cache buffer usage (1MB limit)</li>';
        echo '<li>Use WPEngine\'s built-in caching features</li>';
        echo '<li>Enable object caching in WPEngine dashboard when metrics are good</li>';
        echo '<li>Set up cache exclusions for dynamic content</li>';
        echo '</ul>';
        echo '</div>';
        ?>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 4px;">
            <h3>Quick Cleanup Commands</h3>
            <p>Run these SQL queries in phpMyAdmin or WP-CLI to clean up:</p>
            <pre style="background: white; padding: 15px; border-radius: 4px; overflow-x: auto;">
-- Remove large autoloaded transients
DELETE FROM <?php echo $wpdb->options; ?> 
WHERE option_name LIKE '_transient_%' 
AND autoload = 'yes' 
AND LENGTH(option_value) > 10240;

-- Set large options to non-autoload
UPDATE <?php echo $wpdb->options; ?> 
SET autoload = 'no' 
WHERE autoload = 'yes' 
AND LENGTH(option_value) > 102400 
AND option_name NOT IN ('active_plugins', 'stylesheet', 'template');

-- Clean up expired transients
DELETE FROM <?php echo $wpdb->options; ?> 
WHERE option_name LIKE '_transient_timeout_%' 
AND option_value < UNIX_TIMESTAMP();
</pre>
        </div>
    </div>
</body>
</html>