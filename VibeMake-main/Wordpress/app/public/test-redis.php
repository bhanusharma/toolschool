<?php
/**
 * Test Redis Connection
 * 
 * Access this file at: http://vibemake.local/test-redis.php
 */

// Load WordPress
require_once( dirname(__FILE__) . '/wp-load.php' );

// Check if user is admin
if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( 'You must be logged in as an administrator to view this page.' );
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Redis Cache Test - VibeMake</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 800px;
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
    </style>
</head>
<body>
    <div class="container">
        <h1>Redis Cache Test</h1>
        
        <?php
        // Test 1: Check if object cache is loaded
        echo '<h2>1. Object Cache Status</h2>';
        if ( wp_using_ext_object_cache() ) {
            echo '<div class="status success">✓ External object cache is active</div>';
        } else {
            echo '<div class="status error">✗ External object cache is NOT active</div>';
        }
        
        // Test 2: Check Redis configuration
        echo '<h2>2. Redis Configuration</h2>';
        echo '<table>';
        $configs = array(
            'WP_REDIS_HOST' => defined('WP_REDIS_HOST') ? WP_REDIS_HOST : 'Not defined',
            'WP_REDIS_PORT' => defined('WP_REDIS_PORT') ? WP_REDIS_PORT : 'Not defined',
            'WP_REDIS_DATABASE' => defined('WP_REDIS_DATABASE') ? WP_REDIS_DATABASE : 'Not defined',
            'WP_REDIS_PREFIX' => defined('WP_REDIS_PREFIX') ? WP_REDIS_PREFIX : 'Not defined',
            'WP_REDIS_MAXTTL' => defined('WP_REDIS_MAXTTL') ? WP_REDIS_MAXTTL . ' seconds' : 'Not defined',
            'WP_CACHE' => defined('WP_CACHE') ? (WP_CACHE ? 'Enabled' : 'Disabled') : 'Not defined',
        );
        foreach ( $configs as $key => $value ) {
            echo "<tr><th>$key</th><td><code>$value</code></td></tr>";
        }
        echo '</table>';
        
        // Test 3: Redis connection test
        echo '<h2>3. Redis Connection Test</h2>';
        try {
            $redis = new Redis();
            $host = defined('WP_REDIS_HOST') ? WP_REDIS_HOST : '127.0.0.1';
            $port = defined('WP_REDIS_PORT') ? WP_REDIS_PORT : 6379;
            
            if ( $redis->connect($host, $port, 1) ) {
                echo '<div class="status success">✓ Successfully connected to Redis at ' . $host . ':' . $port . '</div>';
                
                // Get Redis info
                $info = $redis->info('server');
                if ( isset($info['redis_version']) ) {
                    echo '<div class="status info">Redis Version: ' . $info['redis_version'] . '</div>';
                }
                
                $redis->close();
            } else {
                echo '<div class="status error">✗ Failed to connect to Redis</div>';
            }
        } catch ( Exception $e ) {
            echo '<div class="status error">✗ Redis extension not available: ' . $e->getMessage() . '</div>';
        }
        
        // Test 4: Cache operations test
        echo '<h2>4. Cache Operations Test</h2>';
        
        // Set a test value
        $test_key = 'vibemake_redis_test_' . time();
        $test_value = array( 'test' => true, 'time' => current_time('mysql') );
        
        if ( wp_cache_set( $test_key, $test_value, 'vibemake_test', 300 ) ) {
            echo '<div class="status success">✓ Cache SET operation successful</div>';
            
            // Get the value back
            $retrieved = wp_cache_get( $test_key, 'vibemake_test' );
            if ( $retrieved && $retrieved['test'] === true ) {
                echo '<div class="status success">✓ Cache GET operation successful</div>';
                
                // Delete the value
                if ( wp_cache_delete( $test_key, 'vibemake_test' ) ) {
                    echo '<div class="status success">✓ Cache DELETE operation successful</div>';
                } else {
                    echo '<div class="status error">✗ Cache DELETE operation failed</div>';
                }
            } else {
                echo '<div class="status error">✗ Cache GET operation failed</div>';
            }
        } else {
            echo '<div class="status error">✗ Cache SET operation failed</div>';
        }
        
        // Test 5: Performance stats
        echo '<h2>5. Cache Performance Stats</h2>';
        global $wp_object_cache;
        if ( isset($wp_object_cache) && method_exists($wp_object_cache, 'stats') ) {
            $stats = $wp_object_cache->stats();
            echo '<table>';
            echo '<tr><th>Cache Hits</th><td>' . $stats['hits'] . '</td></tr>';
            echo '<tr><th>Cache Misses</th><td>' . $stats['misses'] . '</td></tr>';
            echo '<tr><th>Hit Rate</th><td>' . $stats['ratio'] . '%</td></tr>';
            echo '</table>';
        } else {
            echo '<div class="status info">Cache statistics not available</div>';
        }
        
        // Test 6: GraphQL caching
        echo '<h2>6. GraphQL Caching Status</h2>';
        if ( defined('GRAPHQL_CACHE_ENABLED') && GRAPHQL_CACHE_ENABLED ) {
            echo '<div class="status success">✓ GraphQL caching is enabled</div>';
            echo '<div class="status info">TTL: ' . (defined('GRAPHQL_REQUEST_CACHE_TTL') ? GRAPHQL_REQUEST_CACHE_TTL . ' seconds' : 'Default') . '</div>';
        } else {
            echo '<div class="status error">✗ GraphQL caching is not configured</div>';
        }
        ?>
        
        <h2>Next Steps</h2>
        <div class="info" style="padding: 20px; margin-top: 20px;">
            <h3>For Local Development:</h3>
            <ol>
                <li>Install Redis locally: <code>brew install redis</code></li>
                <li>Start Redis: <code>brew services start redis</code></li>
                <li>Install PHP Redis extension: <code>pecl install redis</code></li>
                <li>Restart your local PHP/Apache server</li>
            </ol>
            
            <h3>For WPEngine Production:</h3>
            <ol>
                <li>Redis is automatically available on WPEngine</li>
                <li>The object-cache.php file will be automatically detected</li>
                <li>WPEngine will handle Redis configuration</li>
                <li>Monitor performance in WPEngine dashboard</li>
            </ol>
        </div>
    </div>
</body>
</html>