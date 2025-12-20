<?php
/**
 * Script to create a comprehensive Midjourney tool entry
 * Run this from WordPress admin or via WP-CLI
 */

// Prevent direct access if not in WordPress context
if (!defined('ABSPATH')) {
    // For direct execution, include WordPress
    require_once(__DIR__ . '/../../../../wp-load.php');
}

function create_midjourney_tool() {
    // Create the Midjourney tool post
    $post_data = [
        'post_title'    => 'Midjourney',
        'post_content'  => 'Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species. It\'s one of the most popular AI image generators, creating stunning visual content from text prompts with unparalleled artistic quality and style diversity.',
        'post_excerpt'  => 'AI-powered image generator that creates stunning visual content from text prompts with artistic flair and professional quality.',
        'post_status'   => 'publish',
        'post_type'     => 'tool',
        'meta_input'    => []
    ];
    
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        echo "Error creating post: " . $post_id->get_error_message() . "\n";
        return false;
    }
    
    echo "Created Midjourney tool post with ID: $post_id\n";
    
    // Set the featured image (you'll need to upload a Midjourney logo first)
    // For now, we'll skip this and add it manually later
    
    // Populate all ACF fields
    $acf_fields = [
        // ✨ BASIC INFORMATION TAB
        'tool_tagline' => 'Create stunning AI art from your imagination',
        'tool_website_url' => 'https://www.midjourney.com',
        'tool_featured' => true,
        
        // 🎯 CLASSIFICATION TAB  
        'tool_primary_function' => 'image-generation',
        'tool_use_cases' => [
            'concept-art',
            'marketing-materials', 
            'social-media-content',
            'product-design',
            'artistic-creation',
            'branding-logos'
        ],
        'tool_target_users' => [
            'designers',
            'artists', 
            'marketers',
            'content-creators',
            'game-developers'
        ],
        'tool_experience_level' => 'intermediate',
        'tool_learning_curve' => 'moderate',
        
        // 💰 PRICING TAB
        'tool_pricing_model' => 'subscription',
        'tool_free_tier_available' => false,
        'tool_pricing_tiers' => [
            [
                'tier_name' => 'Basic Plan',
                'tier_price' => '$10',
                'tier_billing' => 'monthly',
                'tier_description' => '3.3 Fast Hours per month (~200 generations)',
                'tier_features' => [
                    'General commercial terms',
                    'Access to Midjourney member galleries', 
                    'Optional credit top ups',
                    '3.3 fast GPU hours',
                    'Unlimited relaxed generations'
                ]
            ],
            [
                'tier_name' => 'Standard Plan', 
                'tier_price' => '$30',
                'tier_billing' => 'monthly',
                'tier_description' => '15 Fast Hours per month + unlimited relaxed',
                'tier_features' => [
                    'Everything in Basic',
                    '15 fast GPU hours',
                    'Unlimited relaxed generations',
                    'Optional credit top ups'
                ]
            ],
            [
                'tier_name' => 'Pro Plan',
                'tier_price' => '$60', 
                'tier_billing' => 'monthly',
                'tier_description' => '30 Fast Hours + stealth mode + maximum features',
                'tier_features' => [
                    'Everything in Standard',
                    '30 fast GPU hours',
                    'Stealth mode (private generations)',
                    '12 concurrent fast jobs',
                    'Unlimited video generations with relax mode'
                ]
            ],
            [
                'tier_name' => 'Mega Plan',
                'tier_price' => '$120',
                'tier_billing' => 'monthly', 
                'tier_description' => '60 Fast Hours + maximum concurrent jobs',
                'tier_features' => [
                    'Everything in Pro',
                    '60 fast GPU hours',
                    '12 concurrent fast jobs',
                    '12 concurrent relax jobs'
                ]
            ]
        ],
        'tool_annual_discount' => '20% discount on annual plans',
        
        // ⚡ FEATURES TAB
        'tool_key_features' => [
            [
                'feature_name' => 'Text-to-Image Generation',
                'feature_description' => 'Create stunning images from detailed text prompts with artistic flair'
            ],
            [
                'feature_name' => 'Multiple Art Styles',
                'feature_description' => 'Support for realism, impressionism, abstract, fantasy, and custom artistic styles'
            ],
            [
                'feature_name' => 'High Resolution Output',
                'feature_description' => 'Generate images up to 1,792 x 1,024 pixels with upscaling capabilities'
            ],
            [
                'feature_name' => 'Style & Character References',
                'feature_description' => 'Apply artistic styles from reference images and maintain character consistency'
            ],
            [
                'feature_name' => 'Advanced Parameters',
                'feature_description' => 'Control stylization, chaos, aspect ratios, and image variations'
            ],
            [
                'feature_name' => 'Fast & Relax Modes',
                'feature_description' => 'Choose between immediate fast generation or queue-based relaxed generation'
            ],
            [
                'feature_name' => 'Image Variations',
                'feature_description' => 'Generate variations of selected images and modify specific regions'
            ],
            [
                'feature_name' => 'Stealth Mode',
                'feature_description' => 'Keep your generations private with Pro/Mega plans'
            ]
        ],
        
        // 📊 PERFORMANCE TAB
        'tool_generation_speed' => 'fast',
        'tool_output_quality' => 'excellent',
        'tool_ease_of_use' => 'good',
        'tool_customer_support' => 'good',
        'tool_platform_access' => ['web-app', 'discord'],
        'tool_api_available' => false,
        'tool_offline_capability' => false,
        'tool_mobile_optimized' => true,
        
        // 🎨 CAPABILITIES TAB
        'tool_input_types' => ['text-prompts', 'image-references'],
        'tool_output_formats' => ['png', 'jpg'],
        'tool_customization_level' => 'high',
        'tool_batch_processing' => true,
        'tool_collaboration_features' => true,
        'tool_integration_options' => ['discord', 'web-interface'],
        
        // 🏢 COMPANY TAB
        'tool_company_name' => 'Midjourney, Inc.',
        'tool_company_founded' => '2021',
        'tool_company_location' => 'San Francisco, CA, USA',
        'tool_company_size' => 'startup',
        'tool_funding_status' => 'private',
        'tool_company_description' => 'Independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
        
        // 📈 ANALYTICS TAB
        'tool_user_base_size' => 'Over 20 million active users',
        'tool_market_position' => 'leading',
        'tool_growth_trend' => 'growing',
        'tool_community_size' => 'large',
        'tool_social_media_presence' => [
            ['platform' => 'Discord', 'followers' => '20M+ members'],
            ['platform' => 'Twitter', 'followers' => '1M+ followers'],
            ['platform' => 'Instagram', 'followers' => '500K+ followers']
        ],
        
        // 🔗 RESOURCES TAB
        'tool_documentation_quality' => 'excellent',
        'tool_tutorial_availability' => 'extensive', 
        'tool_community_resources' => 'excellent',
        'tool_helpful_links' => [
            [
                'link_title' => 'Official Documentation',
                'link_url' => 'https://docs.midjourney.com',
                'link_description' => 'Comprehensive user guide and documentation'
            ],
            [
                'link_title' => 'Discord Community',
                'link_url' => 'https://discord.gg/midjourney',
                'link_description' => 'Join the official Midjourney Discord server'
            ],
            [
                'link_title' => 'Prompt Guide',
                'link_url' => 'https://docs.midjourney.com/docs/prompts',
                'link_description' => 'Learn how to write effective prompts'
            ],
            [
                'link_title' => 'Style Reference Guide',
                'link_url' => 'https://docs.midjourney.com/docs/style-tuning',
                'link_description' => 'Master style references and character consistency'
            ]
        ],
        
        // 🔍 METADATA TAB
        'tool_last_updated' => date('Y-m-d'),
        'tool_review_score' => 4.5,
        'tool_pros_cons' => [
            'pros' => [
                'Exceptional artistic quality and style diversity',
                'Intuitive prompt-based interface',
                'Strong community and resources',
                'Regular updates and improvements',
                'Multiple generation modes for different needs'
            ],
            'cons' => [
                'No free tier available',
                'Limited control over specific details',
                'Requires Discord or web access',
                'Can be expensive for heavy users',
                'Learning curve for advanced prompting'
            ]
        ],
        'tool_alternatives' => [
            'DALL-E 3',
            'Stable Diffusion', 
            'Adobe Firefly',
            'Leonardo AI',
            'Runway ML'
        ],
        'tool_tags' => [
            'AI Art',
            'Image Generation', 
            'Creative Tools',
            'Design',
            'Marketing',
            'Concept Art'
        ]
    ];
    
    // Set all ACF fields
    foreach ($acf_fields as $field_key => $field_value) {
        $result = update_field($field_key, $field_value, $post_id);
        if ($result) {
            echo "✓ Set field: $field_key\n";
        } else {
            echo "✗ Failed to set field: $field_key\n";
        }
    }
    
    // Assign to taxonomies
    
    // Tool categories
    wp_set_post_terms($post_id, ['AI & Machine Learning', 'Design & Creative', 'Image & Video'], 'tool_category');
    
    // Creation types - this should match our seeded creation types
    wp_set_post_terms($post_id, ['images-art'], 'creation_type');
    
    // User situations - assign relevant user types
    wp_set_post_terms($post_id, ['content-creator-influencer', 'business-professional', 'entrepreneur-founder'], 'user_situation');
    
    echo "\n🎉 Successfully created comprehensive Midjourney tool entry!\n";
    echo "Post ID: $post_id\n";
    echo "View in admin: " . admin_url("post.php?post=$post_id&action=edit") . "\n";
    
    return $post_id;
}

// Run the function
if (function_exists('wp_insert_post')) {
    create_midjourney_tool();
} else {
    echo "WordPress not loaded. Please run this script from WordPress admin or WP-CLI.\n";
}
?>