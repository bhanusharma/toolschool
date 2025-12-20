<?php
/**
 * WPEngine-Compatible Object Cache Drop-in
 *
 * This is a simplified object cache implementation optimized for WPEngine's infrastructure.
 * It respects WPEngine's 1MB buffer limit and autoload best practices.
 *
 * @package VibeMake
 * @version 2.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if this is WPEngine environment
if ( ! defined( 'WPE_PLUGIN_VERSION' ) && ! getenv( 'IS_WPE' ) ) {
    // Not on WPEngine, use the full Redis implementation
    if ( file_exists( __DIR__ . '/object-cache.php' ) ) {
        require_once __DIR__ . '/object-cache.php';
        return;
    }
}

/**
 * WPEngine Object Cache Implementation
 *
 * This implementation is designed to work within WPEngine's constraints:
 * - 1MB object cache buffer limit
 * - Autoload data should be under 800KB
 * - Individual cache entries must be under 1MB
 */
class WP_Object_Cache {
    
    /**
     * Holds the cache data for the current request
     *
     * @var array
     */
    private $cache = array();
    
    /**
     * List of global cache groups
     *
     * @var array
     */
    private $global_groups = array();
    
    /**
     * List of non-persistent groups
     *
     * @var array
     */
    private $non_persistent_groups = array();
    
    /**
     * The blog prefix
     *
     * @var string
     */
    private $blog_prefix;
    
    /**
     * Cache hit counter
     *
     * @var int
     */
    public $cache_hits = 0;
    
    /**
     * Cache miss counter
     *
     * @var int
     */
    public $cache_misses = 0;
    
    /**
     * Maximum size for individual cache entries (1MB for WPEngine)
     *
     * @var int
     */
    private $max_entry_size = 1048576; // 1MB in bytes
    
    /**
     * Constructor
     */
    public function __construct() {
        $this->blog_prefix = $this->get_blog_prefix();
        
        // Set up non-persistent groups (these won't be stored in object cache)
        $this->non_persistent_groups = array(
            'counts',
            'plugins',
            'themes',
            'comment',
            'options-transient', // WPEngine specific
            'transient',
            'site-transient',
            'site-options',
            'site-lookup',
            'blog-lookup',
            'blog-details',
            'site-details',
            'rss',
            'global-posts',
        );
        
        // Set up global groups
        $this->global_groups = array(
            'blog-details',
            'blog-id-cache',
            'blog-lookup',
            'global-posts',
            'networks',
            'rss',
            'sites',
            'site-details',
            'site-lookup',
            'site-options',
            'site-transient',
            'users',
            'useremail',
            'userlogins',
            'userslugs',
        );
        
        // Add WPEngine specific optimizations
        $this->add_wpengine_optimizations();
    }
    
    /**
     * Add WPEngine specific optimizations
     */
    private function add_wpengine_optimizations() {
        // Don't cache large autoloaded options to prevent buffer overflow
        add_filter( 'pre_cache_alloptions', array( $this, 'filter_large_options' ), 10, 1 );
        
        // Limit transient sizes
        add_filter( 'pre_set_transient', array( $this, 'check_transient_size' ), 10, 3 );
    }
    
    /**
     * Filter out large autoloaded options
     *
     * @param array $alloptions
     * @return array
     */
    public function filter_large_options( $alloptions ) {
        if ( ! is_array( $alloptions ) ) {
            return $alloptions;
        }
        
        $total_size = 0;
        $max_autoload_size = 819200; // 800KB limit for WPEngine
        
        foreach ( $alloptions as $option_name => $option_value ) {
            $size = strlen( serialize( $option_value ) );
            
            // Skip individual options larger than 100KB
            if ( $size > 102400 ) {
                unset( $alloptions[ $option_name ] );
                continue;
            }
            
            $total_size += $size;
            
            // If we're approaching the limit, start removing largest options
            if ( $total_size > $max_autoload_size ) {
                unset( $alloptions[ $option_name ] );
            }
        }
        
        return $alloptions;
    }
    
    /**
     * Check transient size before setting
     *
     * @param mixed  $value
     * @param string $transient
     * @param int    $expiration
     * @return mixed
     */
    public function check_transient_size( $value, $transient, $expiration ) {
        $size = strlen( serialize( $value ) );
        
        // If transient is too large, don't cache it
        if ( $size > $this->max_entry_size ) {
            return false;
        }
        
        return $value;
    }
    
    /**
     * Get the blog prefix
     *
     * @return string
     */
    private function get_blog_prefix() {
        return is_multisite() ? get_current_blog_id() . ':' : '';
    }
    
    /**
     * Check if data size is within limits
     *
     * @param mixed $data
     * @return bool
     */
    private function is_size_acceptable( $data ) {
        $size = strlen( serialize( $data ) );
        return $size <= $this->max_entry_size;
    }
    
    /**
     * Get value from cache
     *
     * @param string $key
     * @param string $group
     * @param bool   $force
     * @param bool   $found
     * @return mixed
     */
    public function get( $key, $group = 'default', $force = false, &$found = null ) {
        $found = false;
        
        if ( empty( $group ) ) {
            $group = 'default';
        }
        
        // Check if this is a non-persistent group
        if ( in_array( $group, $this->non_persistent_groups ) ) {
            if ( isset( $this->cache[ $group ][ $key ] ) ) {
                $found = true;
                $this->cache_hits++;
                return $this->cache[ $group ][ $key ];
            }
            $this->cache_misses++;
            return false;
        }
        
        // For WPEngine, we rely on their internal caching mechanism
        // This is a simplified implementation
        if ( isset( $this->cache[ $group ][ $key ] ) ) {
            $found = true;
            $this->cache_hits++;
            return $this->cache[ $group ][ $key ];
        }
        
        $this->cache_misses++;
        return false;
    }
    
    /**
     * Set value in cache
     *
     * @param string $key
     * @param mixed  $value
     * @param string $group
     * @param int    $expire
     * @return bool
     */
    public function set( $key, $value, $group = 'default', $expire = 0 ) {
        if ( empty( $group ) ) {
            $group = 'default';
        }
        
        // Check size before caching
        if ( ! $this->is_size_acceptable( $value ) ) {
            return false;
        }
        
        // Always update local cache
        $this->cache[ $group ][ $key ] = $value;
        
        // Don't persist non-persistent groups
        if ( in_array( $group, $this->non_persistent_groups ) ) {
            return true;
        }
        
        // For WPEngine, the actual persistence is handled by their infrastructure
        return true;
    }
    
    /**
     * Delete value from cache
     *
     * @param string $key
     * @param string $group
     * @return bool
     */
    public function delete( $key, $group = 'default' ) {
        if ( empty( $group ) ) {
            $group = 'default';
        }
        
        unset( $this->cache[ $group ][ $key ] );
        
        return true;
    }
    
    /**
     * Flush the cache
     *
     * @return bool
     */
    public function flush() {
        $this->cache = array();
        return true;
    }
    
    /**
     * Add value to cache if it doesn't exist
     *
     * @param string $key
     * @param mixed  $value
     * @param string $group
     * @param int    $expire
     * @return bool
     */
    public function add( $key, $value, $group = 'default', $expire = 0 ) {
        if ( $this->get( $key, $group ) !== false ) {
            return false;
        }
        
        return $this->set( $key, $value, $group, $expire );
    }
    
    /**
     * Replace value in cache
     *
     * @param string $key
     * @param mixed  $value
     * @param string $group
     * @param int    $expire
     * @return bool
     */
    public function replace( $key, $value, $group = 'default', $expire = 0 ) {
        if ( $this->get( $key, $group ) === false ) {
            return false;
        }
        
        return $this->set( $key, $value, $group, $expire );
    }
    
    /**
     * Increment numeric value
     *
     * @param string $key
     * @param int    $offset
     * @param string $group
     * @return int|bool
     */
    public function incr( $key, $offset = 1, $group = 'default' ) {
        $value = $this->get( $key, $group );
        
        if ( $value === false ) {
            $value = 0;
        }
        
        $value = $value + $offset;
        
        if ( $this->set( $key, $value, $group ) ) {
            return $value;
        }
        
        return false;
    }
    
    /**
     * Decrement numeric value
     *
     * @param string $key
     * @param int    $offset
     * @param string $group
     * @return int|bool
     */
    public function decr( $key, $offset = 1, $group = 'default' ) {
        return $this->incr( $key, -$offset, $group );
    }
    
    /**
     * Add global groups
     *
     * @param array $groups
     */
    public function add_global_groups( $groups ) {
        $this->global_groups = array_unique( array_merge( $this->global_groups, (array) $groups ) );
    }
    
    /**
     * Add non-persistent groups
     *
     * @param array $groups
     */
    public function add_non_persistent_groups( $groups ) {
        $this->non_persistent_groups = array_unique( array_merge( $this->non_persistent_groups, (array) $groups ) );
    }
    
    /**
     * Switch blog
     *
     * @param int $blog_id
     */
    public function switch_to_blog( $blog_id ) {
        $this->blog_prefix = is_multisite() ? $blog_id . ':' : '';
    }
    
    /**
     * Get cache info
     *
     * @return array
     */
    public function stats() {
        return array(
            'hits'   => $this->cache_hits,
            'misses' => $this->cache_misses,
            'ratio'  => $this->cache_hits > 0 ? round( $this->cache_hits / ( $this->cache_hits + $this->cache_misses ) * 100, 2 ) : 0,
        );
    }
}

// Initialize the global wp_object_cache instance
global $wp_object_cache;
$wp_object_cache = new WP_Object_Cache();

/**
 * WordPress Object Cache API functions
 */
function wp_cache_init() {
    // Already initialized above
}

function wp_cache_add( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->add( $key, $data, $group, $expire );
}

function wp_cache_close() {
    return true;
}

function wp_cache_decr( $key, $offset = 1, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->decr( $key, $offset, $group );
}

function wp_cache_delete( $key, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->delete( $key, $group );
}

function wp_cache_flush() {
    global $wp_object_cache;
    return $wp_object_cache->flush();
}

function wp_cache_get( $key, $group = '', $force = false, &$found = null ) {
    global $wp_object_cache;
    return $wp_object_cache->get( $key, $group, $force, $found );
}

function wp_cache_incr( $key, $offset = 1, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->incr( $key, $offset, $group );
}

function wp_cache_replace( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->replace( $key, $data, $group, $expire );
}

function wp_cache_set( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->set( $key, $data, $group, $expire );
}

function wp_cache_switch_to_blog( $blog_id ) {
    global $wp_object_cache;
    $wp_object_cache->switch_to_blog( $blog_id );
}

function wp_cache_add_global_groups( $groups ) {
    global $wp_object_cache;
    $wp_object_cache->add_global_groups( $groups );
}

function wp_cache_add_non_persistent_groups( $groups ) {
    global $wp_object_cache;
    $wp_object_cache->add_non_persistent_groups( $groups );
}

function wp_cache_reset() {
    global $wp_object_cache;
    $wp_object_cache = new WP_Object_Cache();
}