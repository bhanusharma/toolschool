<?php
/**
 * Web-accessible script to fix tool categories
 * Access this file through your browser at: http://localhost:8080/fix-categories.php
 */

// Load WordPress
require_once('wp-load.php');

// Only allow this to run if explicitly requested
if (!isset($_GET['confirm']) || $_GET['confirm'] !== 'yes') {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Fix Tool Categories</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; }
            .button { background: #007cba; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 20px; }
            .button:hover { background: #005a87; }
        </style>
    </head>
    <body>
        <h1>Fix Tool Categories</h1>
        <div class="warning">
            <strong>Warning:</strong> This script will:
            <ul>
                <li>Delete the old categories: Building, Creating, Curating, Writing</li>
                <li>Create 10 new categories for tools</li>
                <li>Re-categorize all existing tools</li>
            </ul>
        </div>
        <p>Are you sure you want to proceed?</p>
        <a href="?confirm=yes" class="button">Yes, Fix Categories</a>
    </body>
    </html>
    <?php
    exit;
}

// Run the fix
?>
<!DOCTYPE html>
<html>
<head>
    <title>Fixing Tool Categories</title>
    <style>
        body { font-family: monospace; max-width: 1000px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
        .section { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h2 { color: #333; }
        pre { white-space: pre-wrap; }
    </style>
</head>
<body>
    <h1>Fixing Tool Categories</h1>
    <div class="section">
        <pre><?php

// Step 1: Delete old categories
echo "<h2>Step 1: Deleting old categories...</h2>\n";
$old_categories = ['Building', 'Creating', 'Curating', 'Writing'];

foreach ($old_categories as $cat_name) {
    $term = get_term_by('name', $cat_name, 'tool_category');
    if ($term) {
        $result = wp_delete_term($term->term_id, 'tool_category');
        if (!is_wp_error($result)) {
            echo "<span class='success'>✓ Deleted category '{$cat_name}'</span>\n";
        } else {
            echo "<span class='error'>✗ Error deleting '{$cat_name}': " . $result->get_error_message() . "</span>\n";
        }
    } else {
        echo "<span class='warning'>- Category '{$cat_name}' not found</span>\n";
    }
}

echo "\n";

// Step 2: Add new categories
echo "<h2>Step 2: Adding new categories...</h2>\n";
$categories = [
    [
        'name' => 'Image Generation',
        'slug' => 'image-generation',
        'description' => 'AI tools for creating images, art, and visual content'
    ],
    [
        'name' => 'Music / Audio',
        'slug' => 'music-audio',
        'description' => 'Tools for music production, audio generation, and sound design'
    ],
    [
        'name' => 'Website / App',
        'slug' => 'website-app',
        'description' => 'Website builders, app creators, and no-code platforms'
    ],
    [
        'name' => 'Graphic Design',
        'slug' => 'graphic-design',
        'description' => 'Design tools for graphics, logos, and visual assets'
    ],
    [
        'name' => 'Text / Copywriting',
        'slug' => 'text-copywriting',
        'description' => 'AI writing assistants, content generators, and copywriting tools'
    ],
    [
        'name' => '3D',
        'slug' => '3d',
        'description' => '3D modeling, rendering, and animation tools'
    ],
    [
        'name' => 'Video / Film',
        'slug' => 'video-film',
        'description' => 'Video editing, generation, and film production tools'
    ],
    [
        'name' => 'Presentation',
        'slug' => 'presentation',
        'description' => 'Tools for creating presentations and slides'
    ],
    [
        'name' => 'Animation',
        'slug' => 'animation',
        'description' => 'Animation creation and motion graphics tools'
    ],
    [
        'name' => 'Coding',
        'slug' => 'coding',
        'description' => 'Code assistants, IDEs, and development tools'
    ]
];

foreach ($categories as $cat) {
    $existing = get_term_by('slug', $cat['slug'], 'tool_category');
    
    if ($existing) {
        echo "<span class='warning'>✓ Category '{$cat['name']}' already exists</span>\n";
    } else {
        $result = wp_insert_term(
            $cat['name'],
            'tool_category',
            [
                'slug' => $cat['slug'],
                'description' => $cat['description']
            ]
        );
        
        if (is_wp_error($result)) {
            echo "<span class='error'>✗ Error adding '{$cat['name']}': " . $result->get_error_message() . "</span>\n";
        } else {
            echo "<span class='success'>✓ Added category '{$cat['name']}' successfully</span>\n";
        }
    }
}

echo "\n";

// Step 3: Categorize tools properly
echo "<h2>Step 3: Categorizing tools...</h2>\n";

// Tool to category mappings
$tool_categories = [
    'cursor' => ['coding'],
    'runway-ml' => ['video-film', 'image-generation'],
    'runway' => ['video-film', 'image-generation'],
    'perplexity' => ['text-copywriting'],
    'notion-ai' => ['text-copywriting'],
    'notion' => ['text-copywriting'],
    'github-copilot' => ['coding'],
    'copilot' => ['coding'],
    'claude' => ['text-copywriting'],
    'v0' => ['website-app'],
    'midjourney' => ['image-generation'],
    'suno' => ['music-audio'],
    'elevenlabs' => ['music-audio'],
    'eleven-labs' => ['music-audio']
];

// Get all tools
$tools = get_posts([
    'post_type' => 'tool',
    'numberposts' => -1,
    'post_status' => 'any'
]);

if (empty($tools)) {
    echo "<span class='warning'>No tools found.</span>\n";
} else {
    foreach ($tools as $tool) {
        $tool_slug = $tool->post_name;
        $tool_title_lower = strtolower($tool->post_title);
        $categories_to_assign = [];
        
        // Check by slug first
        if (isset($tool_categories[$tool_slug])) {
            $categories_to_assign = $tool_categories[$tool_slug];
        } else {
            // Check by title
            foreach ($tool_categories as $key => $cats) {
                if (strpos($tool_title_lower, str_replace('-', ' ', $key)) !== false ||
                    strpos($tool_title_lower, $key) !== false) {
                    $categories_to_assign = $cats;
                    break;
                }
            }
        }
        
        if (!empty($categories_to_assign)) {
            $term_ids = [];
            foreach ($categories_to_assign as $cat_slug) {
                $term = get_term_by('slug', $cat_slug, 'tool_category');
                if ($term) {
                    $term_ids[] = $term->term_id;
                }
            }
            
            if (!empty($term_ids)) {
                wp_set_post_terms($tool->ID, $term_ids, 'tool_category', false);
                echo "<span class='success'>✓ Updated '{$tool->post_title}' with categories: " . implode(', ', $categories_to_assign) . "</span>\n";
            }
        } else {
            echo "<span class='warning'>⚠ No category mapping found for '{$tool->post_title}' (slug: {$tool_slug})</span>\n";
        }
    }
}

echo "\n<h2>Summary</h2>\n";
$all_categories = get_terms(['taxonomy' => 'tool_category', 'hide_empty' => false]);
echo "Total categories: " . count($all_categories) . "\n\n";

foreach ($all_categories as $cat) {
    $count = $cat->count;
    echo "- {$cat->name} ({$cat->slug}): {$count} tools\n";
}

echo "\n<span class='success'><strong>Done! Categories have been fixed and tools have been properly categorized.</strong></span>\n";
?>
        </pre>
    </div>
    
    <div class="section">
        <h2>Next Steps:</h2>
        <ol>
            <li><a href="/test-categories" target="_blank">Check the test page</a> to verify categories</li>
            <li><a href="/tools" target="_blank">Visit the tools page</a> to test filtering</li>
            <li><a href="/wp-admin/edit-tags.php?taxonomy=tool_category&post_type=tool" target="_blank">View in WordPress Admin</a></li>
        </ol>
    </div>
</body>
</html>