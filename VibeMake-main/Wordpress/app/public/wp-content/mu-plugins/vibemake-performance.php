<?php
/**
 * VibeMake Performance Optimizations
 *
 * This mu-plugin provides performance optimizations for VibeMake,
 * including GraphQL caching, query optimization, and Redis integration.
 *
 * @package VibeMake
 * @version 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * GraphQL Performance Optimizations
 */
add_action( 'graphql_init', function() {
    
    // Enable GraphQL caching
    add_filter( 'graphql_cache_enabled', '__return_true' );
    
    // Set cache TTL for GraphQL requests
    add_filter( 'graphql_cache_ttl', function( $ttl ) {
        return defined( 'GRAPHQL_REQUEST_CACHE_TTL' ) ? GRAPHQL_REQUEST_CACHE_TTL : 900;
    });
    
    // Cache GraphQL schema
    add_filter( 'graphql_schema_cache_enabled', '__return_true' );
    
    // Optimize GraphQL queries
    add_filter( 'graphql_request_max_query_amount', function() {
        return 100; // Increase from default 10
    });
    
    // Enable query batching
    add_filter( 'graphql_batch_queries_enabled', '__return_true' );
    
    // Add cache headers to GraphQL responses
    add_action( 'graphql_response_headers', function() {
        if ( ! is_admin() ) {
            header( 'Cache-Control: public, max-age=900, s-maxage=900' );
            header( 'X-Cache-Enabled: true' );
        }
    });
});

/**
 * WPGraphQL Smart Cache Integration
 */
add_action( 'init', function() {
    
    // Enable smart caching for all post types
    add_filter( 'wpgraphql_smart_cache_enabled_post_types', function( $post_types ) {
        return array_merge( $post_types, array(
            'tool',
            'maker',
            'community_project',
            'post',
            'page'
        ));
    });
    
    // Set cache TTL based on content type
    add_filter( 'wpgraphql_smart_cache_ttl', function( $ttl, $post_type ) {
        switch ( $post_type ) {
            case 'tool':
                return HOUR_IN_SECONDS * 6; // 6 hours for tools
            case 'maker':
                return HOUR_IN_SECONDS * 12; // 12 hours for makers
            case 'community_project':
                return HOUR_IN_SECONDS * 3; // 3 hours for projects
            case 'post':
                return HOUR_IN_SECONDS; // 1 hour for news
            default:
                return $ttl;
        }
    }, 10, 2 );
    
    // Purge cache on content updates
    add_action( 'save_post', function( $post_id ) {
        if ( function_exists( 'wpgraphql_smart_cache_purge' ) ) {
            wpgraphql_smart_cache_purge( $post_id );
        }
    });
});

/**
 * Database Query Optimizations
 */
add_action( 'init', function() {
    
    // Optimize post queries
    add_filter( 'posts_request', function( $request, $query ) {
        // Skip admin queries
        if ( is_admin() ) {
            return $request;
        }
        
        // Add SQL_CALC_FOUND_ROWS only when necessary
        if ( ! $query->is_singular() && false !== strpos( $request, 'SQL_CALC_FOUND_ROWS' ) ) {
            if ( ! $query->get( 'no_found_rows' ) ) {
                $query->set( 'no_found_rows', true );
            }
        }
        
        return $request;
    }, 10, 2 );
    
    // Disable unnecessary queries
    add_action( 'pre_get_posts', function( $query ) {
        if ( ! is_admin() && $query->is_main_query() ) {
            // Disable sticky posts on archive pages
            if ( $query->is_archive() || $query->is_search() ) {
                $query->set( 'ignore_sticky_posts', true );
            }
            
            // Limit fields for performance
            if ( ! $query->is_singular() ) {
                $query->set( 'fields', 'ids' );
            }
        }
    });
});

/**
 * Object Cache Optimizations
 */
add_action( 'init', function() {
    
    // Add custom cache groups
    if ( function_exists( 'wp_cache_add_global_groups' ) ) {
        wp_cache_add_global_groups( array(
            'vibemake_tools',
            'vibemake_makers',
            'vibemake_projects',
            'vibemake_graphql'
        ));
    }
    
    // Add non-persistent groups
    if ( function_exists( 'wp_cache_add_non_persistent_groups' ) ) {
        wp_cache_add_non_persistent_groups( array(
            'vibemake_temp',
            'vibemake_transient'
        ));
    }
});

/**
 * Transient API Optimizations
 */
add_filter( 'pre_set_transient', function( $value, $transient, $expiration ) {
    // Use object cache for transients when available
    if ( wp_using_ext_object_cache() ) {
        wp_cache_set( $transient, $value, 'transient', $expiration );
        return false;
    }
    return $value;
}, 10, 3 );

/**
 * REST API Optimizations
 */
add_action( 'rest_api_init', function() {
    
    // Add caching headers to REST responses
    add_filter( 'rest_post_dispatch', function( $response, $server, $request ) {
        $route = $request->get_route();
        
        // Cache specific endpoints
        if ( strpos( $route, '/wp/v2/tools' ) !== false ) {
            $response->header( 'Cache-Control', 'public, max-age=3600' );
        } elseif ( strpos( $route, '/wp/v2/makers' ) !== false ) {
            $response->header( 'Cache-Control', 'public, max-age=7200' );
        } elseif ( strpos( $route, '/wp/v2/community_projects' ) !== false ) {
            $response->header( 'Cache-Control', 'public, max-age=1800' );
        }
        
        return $response;
    }, 10, 3 );
});

/**
 * Advanced Custom Fields Optimizations
 */
add_action( 'acf/init', function() {
    
    // Enable ACF field caching
    add_filter( 'acf/settings/cache', '__return_true' );
    
    // Cache ACF field groups
    add_filter( 'acf/load_field_groups', function( $field_groups ) {
        $cache_key = 'vibemake_acf_field_groups';
        $cached = wp_cache_get( $cache_key, 'vibemake_graphql' );
        
        if ( false !== $cached ) {
            return $cached;
        }
        
        wp_cache_set( $cache_key, $field_groups, 'vibemake_graphql', HOUR_IN_SECONDS );
        return $field_groups;
    });
});

/**
 * Image Optimization
 */
add_filter( 'wp_get_attachment_image_attributes', function( $attr, $attachment, $size ) {
    // Add loading lazy by default
    if ( ! isset( $attr['loading'] ) ) {
        $attr['loading'] = 'lazy';
    }
    
    // Add decoding async
    if ( ! isset( $attr['decoding'] ) ) {
        $attr['decoding'] = 'async';
    }
    
    return $attr;
}, 10, 3 );

/**
 * Script and Style Optimizations
 */
add_action( 'wp_enqueue_scripts', function() {
    // Remove unnecessary scripts
    wp_dequeue_script( 'wp-embed' );
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'classic-theme-styles' );
}, 100 );

/**
 * Heartbeat API Optimization
 */
add_filter( 'heartbeat_settings', function( $settings ) {
    $settings['interval'] = 60; // 60 seconds instead of 15
    return $settings;
});

/**
 * Admin Performance Optimizations
 */
if ( is_admin() ) {
    // Limit post revisions display
    add_filter( 'wp_revisions_to_keep', function( $num, $post ) {
        return 3;
    }, 10, 2 );
    
    // Disable admin email check
    add_filter( 'admin_email_check_interval', '__return_false' );
}

/**
 * WPEngine Specific Optimizations
 */
if ( defined( 'WPE_CLUSTER_ID' ) || defined( 'WPE_PLUGIN_VERSION' ) ) {
    // Monitor autoload data size
    add_action( 'init', function() {
        // Check autoload data size periodically
        if ( ! wp_next_scheduled( 'vibemake_check_autoload_size' ) ) {
            wp_schedule_event( time(), 'daily', 'vibemake_check_autoload_size' );
        }
    });
    
    // Check and log autoload data size
    add_action( 'vibemake_check_autoload_size', function() {
        global $wpdb;
        
        $autoload_size = $wpdb->get_var( "
            SELECT SUM(LENGTH(option_value)) 
            FROM {$wpdb->options} 
            WHERE autoload = 'yes'
        " );
        
        // Log if autoload is approaching limit (800KB for WPEngine)
        if ( $autoload_size > 819200 ) { // 800KB
            error_log( 'VibeMake Warning: Autoload data exceeds 800KB limit: ' . size_format( $autoload_size ) );
            
            // Clean up large transients
            $wpdb->query( "
                DELETE FROM {$wpdb->options} 
                WHERE option_name LIKE '_transient_%' 
                AND autoload = 'yes' 
                AND LENGTH(option_value) > 10240
            " );
        }
    });
    
    // Optimize transient storage
    add_filter( 'pre_set_transient', function( $value, $transient, $expiration ) {
        // Force large transients to not autoload
        if ( strlen( serialize( $value ) ) > 10240 ) { // 10KB
            add_filter( 'pre_update_option_' . '_transient_' . $transient, function( $value, $old_value ) {
                global $wpdb;
                $wpdb->query( $wpdb->prepare( 
                    "UPDATE {$wpdb->options} SET autoload = 'no' WHERE option_name = %s",
                    '_transient_' . $transient
                ));
                return $value;
            }, 10, 2 );
        }
        return $value;
    }, 10, 3 );
    
    // Enable WPEngine page caching
    add_filter( 'wpe_cache_excluded_urls', function( $excluded_urls ) {
        // Don't cache admin or login pages
        $excluded_urls[] = '/wp-admin/';
        $excluded_urls[] = '/wp-login.php';
        
        // Don't cache GraphQL endpoint
        $excluded_urls[] = '/graphql';
        
        // Don't cache API endpoints
        $excluded_urls[] = '/wp-json/';
        
        return $excluded_urls;
    });
    
    // Set cache headers for WPEngine
    add_action( 'send_headers', function() {
        if ( ! is_admin() && ! is_user_logged_in() ) {
            // Use WPEngine's recommended cache headers
            header( 'X-WPE-Cache-Type: page' );
            
            // Set different cache times based on content type
            if ( is_singular( 'tool' ) ) {
                header( 'Cache-Control: public, max-age=21600, s-maxage=21600' ); // 6 hours
            } elseif ( is_singular( 'maker' ) ) {
                header( 'Cache-Control: public, max-age=43200, s-maxage=43200' ); // 12 hours
            } elseif ( is_singular( 'community_project' ) ) {
                header( 'Cache-Control: public, max-age=10800, s-maxage=10800' ); // 3 hours
            } elseif ( is_singular( 'post' ) || is_home() || is_archive() ) {
                header( 'Cache-Control: public, max-age=3600, s-maxage=3600' ); // 1 hour
            } else {
                header( 'Cache-Control: public, max-age=600, s-maxage=600' ); // 10 minutes default
            }
        }
    });
    
    // Optimize for WPEngine's object cache buffer
    add_action( 'init', function() {
        // Limit the size of cached objects
        add_filter( 'pre_cache_alloptions', function( $alloptions ) {
            if ( ! is_array( $alloptions ) ) {
                return $alloptions;
            }
            
            // Remove large options from autoload cache
            foreach ( $alloptions as $option_name => $option_value ) {
                if ( strlen( serialize( $option_value ) ) > 102400 ) { // 100KB
                    unset( $alloptions[ $option_name ] );
                }
            }
            
            return $alloptions;
        });
    });
}

/**
 * Add performance monitoring
 */
add_action( 'shutdown', function() {
    if ( defined( 'WP_DEBUG' ) && WP_DEBUG && ! is_admin() ) {
        $stats = wp_cache_get_stats();
        if ( $stats ) {
            error_log( sprintf(
                'Cache Performance - Hits: %d, Misses: %d, Ratio: %s%%',
                $stats['hits'],
                $stats['misses'],
                $stats['ratio']
            ));
        }
    }
});