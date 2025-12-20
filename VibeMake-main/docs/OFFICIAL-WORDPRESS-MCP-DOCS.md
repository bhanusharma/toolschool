# Official WordPress MCP Documentation

Source: https://github.com/Automattic/wordpress-mcp

## Overview

The WordPress Model Context Protocol (MCP) Plugin enables external AI systems to interact with WordPress sites through a standardized protocol.

## Key Features

- **Tools**: Actions AI can request from WordPress (e.g., `create_post`)
- **Resources**: Data AI can retrieve (e.g., `list_published_posts`)
- **Prompts**: Pre-defined interaction templates

## Requirements

- WordPress 6.4+
- PHP 8.0+
- Administrator access

## Registered Tools

### WordPress Posts Tools

1. **wp_posts_search**
   - Type: read
   - Description: Search and filter WordPress posts with pagination
   - REST Endpoint: `/wp/v2/posts` (GET)
   - Usage: Can search ANY post type including custom post types
   - Parameters: Standard WordPress post query parameters

2. **wp_get_post**
   - Type: read
   - Description: Get a WordPress post by ID
   - REST Endpoint: `/wp/v2/posts/(?P<id>[\d]+)` (GET)
   - Parameters: Requires post ID

3. **wp_add_post**
   - Type: create
   - Description: Add a new WordPress post
   - REST Endpoint: `/wp/v2/posts` (POST)

4. **wp_update_post**
   - Type: update
   - Description: Update a WordPress post by ID
   - REST Endpoint: `/wp/v2/posts/(?P<id>[\d]+)` (PUT)

5. **wp_delete_post**
   - Type: delete
   - Description: Delete a WordPress post by ID
   - REST Endpoint: `/wp/v2/posts/(?P<id>[\d]+)` (DELETE)

### WordPress Users Tools

- `wp_search_users` - Search users
- `wp_get_user` - Get user by ID
- `wp_add_user` - Add new user
- `wp_update_user` - Update user
- `wp_delete_user` - Delete user

### WooCommerce Tools (when WooCommerce is active)

#### Products:
- `wp_woo_search_products`
- `wp_woo_get_product`
- `wp_woo_add_product`
- `wp_woo_update_product`

#### Orders:
- `wp_woo_search_orders`
- `wp_woo_get_order`

### Site Information

- `wp_get_site_info` - Get general site information

## Security

- All MCP operations require administrator privileges by default
- Only connect trusted MCP clients to your WordPress site

## How MCP Tools Work

The MCP tools use WordPress REST API endpoints under the hood. They provide a standardized interface for AI systems to interact with WordPress content.

## For Custom Post Types

The posts tools (like `wp_posts_search`) work with ANY post type registered in WordPress, including custom post types. For VibeMake, this includes:
- `tool` - AI tools directory
- `maker` - Maker profiles
- `community_project` - Community projects
- `ai_project` - AI projects

To search for tools, you would use `wp_posts_search` with appropriate parameters to filter by post type.