# WordPress MCP Documentation for Claude Code

## I am Claude Code - NOT Claude Desktop!

## WordPress MCP Registered Tools

### Posts Tools

1. **wp_posts_search**
   - Type: read
   - Description: Search and filter WordPress posts
   - Can be used with ANY post type including custom post types like 'tool', 'maker', etc.
   - Parameters: search terms, filters, pagination

2. **wp_get_post**
   - Type: read  
   - Description: Get a specific post by ID
   - Works with any post type

3. **wp_add_post**
   - Type: create
   - Description: Create a new post

4. **wp_update_post**
   - Type: update
   - Description: Update an existing post

5. **wp_delete_post**
   - Type: delete
   - Description: Delete a post by ID

### Users Tools

- `wp_search_users`
- `wp_get_user`
- `wp_add_user`
- `wp_update_user`
- `wp_delete_user`

### Site Information

- `wp_get_site_info` - Retrieves site metadata

## How to Use These Tools

The WordPress MCP tools are accessed through the MCP protocol. Since I am Claude Code, these tools should be available to me through the MCP interface.

## For VibeMake Project

Custom Post Types:
- `tool` - AI tools directory
- `maker` - Maker profiles
- `community_project` - Community projects
- `ai_project` - AI projects

To get all tools, I should use `wp_posts_search` with post_type parameter set to 'tool'.

## Important Notes

1. These are MCP TOOLS, not resources
2. They work with WordPress REST API under the hood
3. They support custom post types
4. I need to figure out how to call these tools through the MCP interface available to me