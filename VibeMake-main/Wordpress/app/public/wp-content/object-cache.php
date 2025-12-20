<?php
/**
 * Redis Object Cache Drop-in
 *
 * This file enables Redis object caching for WordPress.
 * Place this file in wp-content/object-cache.php
 *
 * @package VibeMake
 * @version 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if Redis is disabled
if ( defined( 'WP_REDIS_DISABLED' ) && WP_REDIS_DISABLED ) {
    return false;
}

/**
 * WordPress Object Cache using Redis
 *
 * This is a simple Redis object cache implementation for WordPress.
 * It provides basic caching functionality with Redis backend.
 */
class WP_Object_Cache {
    
    /**
     * Holds the Redis client instance
     *
     * @var Redis|null
     */
    private $redis;
    
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
     * Holds the number of cache hits
     *
     * @var int
     */
    public $cache_hits = 0;
    
    /**
     * Holds the number of cache misses
     *
     * @var int
     */
    public $cache_misses = 0;
    
    /**
     * Constructor
     */
    public function __construct() {
        $this->blog_prefix = $this->get_blog_prefix();
        $this->connect_redis();
        
        // Set up non-persistent groups
        $this->non_persistent_groups = array(
            'counts',
            'plugins',
            'themes',
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
    }
    
    /**
     * Connect to Redis
     *
     * @return bool
     */
    private function connect_redis() {
        try {
            // Check if Redis extension is loaded
            if ( ! extension_loaded( 'redis' ) && ! class_exists( 'Redis' ) ) {
                return false;
            }
            
            $this->redis = new Redis();
            
            $host = defined( 'WP_REDIS_HOST' ) ? WP_REDIS_HOST : '127.0.0.1';
            $port = defined( 'WP_REDIS_PORT' ) ? WP_REDIS_PORT : 6379;
            $timeout = defined( 'WP_REDIS_TIMEOUT' ) ? WP_REDIS_TIMEOUT : 1;
            
            $connected = $this->redis->connect( $host, $port, $timeout );
            
            if ( ! $connected ) {
                $this->redis = null;
                return false;
            }
            
            // Select database
            if ( defined( 'WP_REDIS_DATABASE' ) ) {
                $this->redis->select( WP_REDIS_DATABASE );
            }
            
            // Set serializer
            if ( defined( 'WP_REDIS_SERIALIZER' ) && WP_REDIS_SERIALIZER === 'php' ) {
                $this->redis->setOption( Redis::OPT_SERIALIZER, Redis::SERIALIZER_PHP );
            }
            
            return true;
            
        } catch ( Exception $e ) {
            $this->redis = null;
            return false;
        }
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
     * Get the cache key
     *
     * @param string $key
     * @param string $group
     * @return string
     */
    private function get_cache_key( $key, $group = 'default' ) {
        if ( empty( $group ) ) {
            $group = 'default';
        }
        
        $prefix = defined( 'WP_REDIS_PREFIX' ) ? WP_REDIS_PREFIX : 'wp_';
        
        if ( ! in_array( $group, $this->global_groups ) ) {
            $prefix .= $this->blog_prefix;
        }
        
        return $prefix . $group . ':' . $key;
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
        
        // Check non-persistent cache first
        if ( isset( $this->cache[ $group ][ $key ] ) ) {
            $found = true;
            $this->cache_hits++;
            return $this->cache[ $group ][ $key ];
        }
        
        // Don't fetch from Redis for non-persistent groups
        if ( in_array( $group, $this->non_persistent_groups ) ) {
            $this->cache_misses++;
            return false;
        }
        
        // Try Redis
        if ( $this->redis ) {
            $cache_key = $this->get_cache_key( $key, $group );
            $value = $this->redis->get( $cache_key );
            
            if ( $value !== false ) {
                $found = true;
                $this->cache_hits++;
                $this->cache[ $group ][ $key ] = $value;
                return $value;
            }
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
        
        // Always update non-persistent cache
        $this->cache[ $group ][ $key ] = $value;
        
        // Don't persist non-persistent groups
        if ( in_array( $group, $this->non_persistent_groups ) ) {
            return true;
        }
        
        // Set in Redis
        if ( $this->redis ) {
            $cache_key = $this->get_cache_key( $key, $group );
            
            // Handle TTL
            if ( $expire === 0 ) {
                $expire = defined( 'WP_REDIS_MAXTTL' ) ? WP_REDIS_MAXTTL : 0;
            }
            
            if ( $expire > 0 ) {
                return $this->redis->setex( $cache_key, $expire, $value );
            } else {
                return $this->redis->set( $cache_key, $value );
            }
        }
        
        return false;
    }
    
    /**
     * Delete value from cache
     *
     * @param string $key
     * @param string $group
     * @return bool
     */
    public function delete( $key, $group = 'default' ) {
        // Remove from non-persistent cache
        unset( $this->cache[ $group ][ $key ] );
        
        // Don't delete from Redis for non-persistent groups
        if ( in_array( $group, $this->non_persistent_groups ) ) {
            return true;
        }
        
        // Delete from Redis
        if ( $this->redis ) {
            $cache_key = $this->get_cache_key( $key, $group );
            return $this->redis->del( $cache_key ) > 0;
        }
        
        return false;
    }
    
    /**
     * Flush the cache
     *
     * @return bool
     */
    public function flush() {
        $this->cache = array();
        
        if ( $this->redis ) {
            return $this->redis->flushDB();
        }
        
        return false;
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

/**
 * Instantiate the global wp_object_cache
 */
function wp_cache_init() {
    global $wp_object_cache;
    $wp_object_cache = new WP_Object_Cache();
}

/**
 * Adds data to the cache
 */
function wp_cache_add( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->add( $key, $data, $group, $expire );
}

/**
 * Closes the cache
 */
function wp_cache_close() {
    return true;
}

/**
 * Decrements numeric cache item's value
 */
function wp_cache_decr( $key, $offset = 1, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->decr( $key, $offset, $group );
}

/**
 * Removes the cache contents matching key and group
 */
function wp_cache_delete( $key, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->delete( $key, $group );
}

/**
 * Removes all cache items
 */
function wp_cache_flush() {
    global $wp_object_cache;
    return $wp_object_cache->flush();
}

/**
 * Retrieves the cache contents from the cache by key and group
 */
function wp_cache_get( $key, $group = '', $force = false, &$found = null ) {
    global $wp_object_cache;
    return $wp_object_cache->get( $key, $group, $force, $found );
}

/**
 * Increment numeric cache item's value
 */
function wp_cache_incr( $key, $offset = 1, $group = '' ) {
    global $wp_object_cache;
    return $wp_object_cache->incr( $key, $offset, $group );
}

/**
 * Replace the contents of the cache with new data
 */
function wp_cache_replace( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->replace( $key, $data, $group, $expire );
}

/**
 * Saves the data to the cache
 */
function wp_cache_set( $key, $data, $group = '', $expire = 0 ) {
    global $wp_object_cache;
    return $wp_object_cache->set( $key, $data, $group, $expire );
}

/**
 * Switches the internal blog ID
 */
function wp_cache_switch_to_blog( $blog_id ) {
    global $wp_object_cache;
    $wp_object_cache->switch_to_blog( $blog_id );
}

/**
 * Adds groups to the list of global groups
 */
function wp_cache_add_global_groups( $groups ) {
    global $wp_object_cache;
    $wp_object_cache->add_global_groups( $groups );
}

/**
 * Adds groups to the list of non-persistent groups
 */
function wp_cache_add_non_persistent_groups( $groups ) {
    global $wp_object_cache;
    $wp_object_cache->add_non_persistent_groups( $groups );
}

/**
 * Reset internal cache keys and structures
 */
function wp_cache_reset() {
    global $wp_object_cache;
    $wp_object_cache = new WP_Object_Cache();
}