<?php
/**
 * Add Maker AI Tool
 * Access at: http://vibemake.local/add-maker-tool.php
 */

require_once('wp-load.php');
wp_set_current_user(1);

echo "<pre>";
echo "Adding Maker AI Tool...\n\n";

// Check if already exists
$existing = get_page_by_title('Maker', OBJECT, 'tool');
if ($existing) {
    echo "Maker already exists with ID: {$existing->ID}\n";
    exit;
}

// Create the tool
$post_id = wp_insert_post([
    'post_title'    => 'Maker',
    'post_content'  => 'Maker is an AI-powered photo and video generation platform specifically designed for e-commerce brands. It revolutionizes product photography by allowing businesses to create studio-quality images and videos at just 1% of the traditional cost. With just a single product image, Maker generates endless variations with different models, locations, and scenes in minutes instead of weeks. Perfect for everything from jewelry to furniture, luxury fashion to streetwear, Maker eliminates the need for expensive photoshoots while maintaining professional quality.',
    'post_excerpt'  => 'AI photo & video generation for e-commerce - create studio-quality product shots instantly at 1% of traditional cost.',
    'post_status'   => 'publish',
    'post_type'     => 'tool',
]);

if (!is_wp_error($post_id)) {
    // Set ACF fields
    update_field('tool_tagline', 'Turn your SKUs into stunning photos & videos in minutes with AI', $post_id);
    update_field('tool_website', 'https://www.maker.ai', $post_id);
    update_field('tool_featured', true, $post_id);
    update_field('tool_use_cases', ['images', 'video', 'business', 'marketing'], $post_id);
    update_field('tool_difficulty', 'beginner', $post_id);
    update_field('tool_pricing_model', 'subscription', $post_id);
    update_field('tool_pricing_summary', 'Cost-effective alternative to traditional photoshoots - 1% of traditional costs', $post_id);
    
    // Set key features
    $features = [
        'One image creates endless product photos',
        'Custom models and locations on demand',
        'Minutes instead of weeks turnaround',
        '1% of traditional photoshoot costs',
        'Works for any product type',
        'Studio-quality output'
    ];
    update_field('tool_key_features', $features, $post_id);
    
    // Set categories
    wp_set_post_terms($post_id, ['AI & Machine Learning', 'Image Generation', 'E-commerce', 'Marketing Tools'], 'tool_category');
    
    echo "SUCCESS! Maker created with ID: $post_id\n\n";
    echo "Tool Details:\n";
    echo "- Title: Maker\n";
    echo "- Website: https://www.maker.ai\n";
    echo "- Categories: AI & Machine Learning, Image Generation, E-commerce, Marketing Tools\n";
    echo "- Use Cases: Images, Video, Business, Marketing\n";
} else {
    echo "ERROR: " . $post_id->get_error_message() . "\n";
}

$total = wp_count_posts('tool');
echo "\nTotal tools in database: {$total->publish}\n";
echo "</pre>";

echo '<p><a href="' . admin_url('post.php?post=' . $post_id . '&action=edit') . '">Edit this tool</a> | ';
echo '<a href="' . admin_url('edit.php?post_type=tool') . '">View all tools</a></p>';
?>