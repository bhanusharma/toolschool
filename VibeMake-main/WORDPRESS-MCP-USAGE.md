# WordPress MCP Usage Guide

## Important: Use MCP, NOT curl or GraphQL

The WordPress MCP is connected to Claude and provides tools to interact with WordPress content. 

## Available MCP Functions in Claude

1. **ListMcpResourcesTool** - Lists available MCP resources
   - Usage: `ListMcpResourcesTool(server="wordpress-mcp")`

2. **ReadMcpResourceTool** - Reads MCP resources
   - Usage: `ReadMcpResourceTool(server="wordpress-mcp", uri="WordPress://[resource]")`

## Known WordPress MCP Resources

From the wordpress-mcp server:
- `WordPress://site-info` - General site information
- `WordPress://plugin-info` - Plugin information
- `WordPress://theme-info` - Theme information
- `WordPress://user-info` - User information
- `WordPress://site-settings` - Site settings

## Fetching WordPress Content

The WordPress MCP should provide tools for fetching posts and custom post types. Based on the codebase, these tools exist:
- `wp_cpt_search` - Search custom post types
- `wp_posts_search` - Search posts
- `wp_get_cpt` - Get specific custom post type item

## IMPORTANT REMINDERS

1. **ALWAYS use MCP tools** - Never use curl, wget, or direct API calls
2. **WordPress content is accessed through MCP** - This includes:
   - Tools (custom post type: 'tool')
   - Makers (custom post type: 'maker')
   - News/Posts
   - Community Projects

3. **If MCP tools aren't visible** - The tools might be accessed differently through the MCP protocol

## Configuration

The WordPress MCP is configured with:
- WP_API_URL: http://vibemake.local
- Authentication via JWT token
- MCP server: wordpress-mcp