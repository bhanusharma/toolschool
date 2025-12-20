# Redis Cache Setup for VibeMake (WPEngine Optimized)

## Overview
Redis object caching has been configured for VibeMake WordPress to dramatically improve performance, especially for GraphQL queries. This implementation is specifically optimized for WPEngine's infrastructure and constraints.

## What Was Configured

### 1. WordPress Configuration (`wp-config.php`)
Added comprehensive Redis settings including:
- Redis connection parameters (host, port, timeout)
- Cache key prefixes to avoid collisions
- TTL settings for cache expiration
- GraphQL-specific cache settings
- Memory limits and performance optimizations
- Security headers and compression settings

### 2. Object Cache Drop-in (`wp-content/object-cache.php`)
Created a custom Redis object cache implementation that:
- Connects to Redis server
- Implements WordPress object cache API
- Handles cache groups and non-persistent data
- Provides performance statistics
- Supports multisite installations

### 3. Performance Optimizations (`wp-content/mu-plugins/vibemake-performance.php`)
Added a must-use plugin that provides:
- GraphQL query caching and optimization
- WPGraphQL Smart Cache integration
- Database query optimizations
- REST API caching headers
- ACF field caching
- Image lazy loading
- Script/style optimizations
- WPEngine-specific optimizations

### 4. Test Script (`test-redis.php`)
Created a diagnostic tool to verify Redis is working correctly.

## Local Development Setup

### Install Redis on Mac:
```bash
# Install Redis
brew install redis

# Start Redis service
brew services start redis

# Install PHP Redis extension
pecl install redis

# Restart your local server (e.g., Local by Flywheel)
```

### Verify Installation:
1. Visit http://vibemake.local/test-redis.php
2. Log in as admin
3. Check all tests pass

## Production Deployment (WPEngine)

### Steps to Deploy:
1. **Copy Files to Production:**
   - `wp-config.php` (merge the Redis settings)
   - `wp-content/object-cache.php`
   - `wp-content/mu-plugins/vibemake-performance.php`

2. **WPEngine Specific:**
   - Redis is pre-installed on WPEngine
   - Object cache will be automatically detected
   - No additional configuration needed

3. **Verify on Production:**
   - Check WPEngine dashboard for Redis status
   - Monitor cache hit rates
   - Test GraphQL query performance

## Performance Benefits

### Expected Improvements:
- **GraphQL Queries**: 50-80% faster response times
- **Page Load**: 30-50% reduction in server response time
- **Database Load**: 60-70% reduction in queries
- **API Responses**: Cached for 15-120 minutes depending on content type

### Cache TTL Settings:
- Tools: 6 hours
- Makers: 12 hours  
- Projects: 3 hours
- News/Posts: 1 hour
- GraphQL Schema: 15 minutes

## Monitoring

### Key Metrics to Watch:
- Cache hit rate (should be >80%)
- Redis memory usage
- GraphQL query response times
- Database query count

### Debug Commands:
```bash
# Check Redis is running
redis-cli ping

# Monitor Redis in real-time
redis-cli monitor

# Check Redis info
redis-cli info stats

# Flush Redis cache
redis-cli flushall
```

## Troubleshooting

### Common Issues:

1. **Redis Connection Failed**
   - Check Redis is running: `brew services list`
   - Verify port 6379 is open: `lsof -i :6379`
   - Check PHP Redis extension: `php -m | grep redis`

2. **Cache Not Working**
   - Verify object-cache.php exists in wp-content
   - Check WP_CACHE is defined as true
   - Look for errors in debug.log

3. **Performance Not Improved**
   - Check cache hit rate in test script
   - Verify GraphQL caching is enabled
   - Monitor slow queries in Query Monitor plugin

## Next Steps

1. Test locally with the test script
2. Monitor performance improvements
3. Deploy to WPEngine when ready
4. Enable additional WPEngine features:
   - Page Cache
   - CDN
   - Browser Caching

## WPEngine-Specific Considerations

### Critical Limits
1. **Object Cache Buffer**: 1MB total
2. **Autoload Data**: Must stay under 800KB
3. **Individual Cache Entries**: Maximum 1MB each

### Our Implementation Handles:
- Automatic monitoring of autoload data size
- Prevents large transients from autoloading
- Filters out options larger than 100KB from autoload
- Daily cleanup of oversized transients
- Respects WPEngine's buffer limitations

### WPEngine Object Cache Behavior
- WPEngine may use their own object cache implementation
- Our drop-in (`object-cache.php`) works alongside WPEngine's system
- The `object-cache-wpengine.php` is a fallback optimized for their constraints
- Object cache is enabled per environment in WPEngine dashboard

## Important Notes

- The object cache is automatically used by WordPress core and plugins
- GraphQL queries are cached for 15 minutes by default
- Cache is automatically purged when content is updated
- WPEngine's object cache buffer is limited to 1MB (very important!)
- Monitor autoload data size regularly to prevent 502 errors
- Large transients are automatically set to non-autoload