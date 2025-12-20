<?php
/**
 * Sample Tools Data
 * Run this script to populate tools and categories
 */

// Create Tool Categories
function create_tool_categories() {
    $categories = [
        [
            'name' => 'Creating',
            'description' => 'Generate art, images, and creative content with AI tools',
            'slug' => 'creating',
            'meta' => [
                'category_description' => 'Generate art, images, and creative content with AI tools',
                'category_color' => '#e7131a'
            ]
        ],
        [
            'name' => 'Writing',
            'description' => 'Enhance your writing with AI-powered text generation and editing',
            'slug' => 'writing',
            'meta' => [
                'category_description' => 'Enhance your writing with AI-powered text generation and editing',
                'category_color' => '#1a73e8'
            ]
        ],
        [
            'name' => 'Curating',
            'description' => 'Discover, organize, and manage AI-generated content',
            'slug' => 'curating',
            'meta' => [
                'category_description' => 'Discover, organize, and manage AI-generated content',
                'category_color' => '#34a853'
            ]
        ],
        [
            'name' => 'Building',
            'description' => 'Develop and deploy AI-powered applications and services',
            'slug' => 'building',
            'meta' => [
                'category_description' => 'Develop and deploy AI-powered applications and services',
                'category_color' => '#fbbc04'
            ]
        ]
    ];
    
    foreach ($categories as $category) {
        $term = wp_insert_term($category['name'], 'tool_category', [
            'description' => $category['description'],
            'slug' => $category['slug']
        ]);
        
        if (!is_wp_error($term) && isset($category['meta'])) {
            foreach ($category['meta'] as $key => $value) {
                update_field($key, $value, 'tool_category_' . $term['term_id']);
            }
        }
    }
}

// Create Sample Tools
function create_sample_tools() {
    $tools = [
        [
            'title' => 'ChatGPT',
            'content' => 'ChatGPT is an advanced conversational AI developed by OpenAI. It can assist with writing, coding, creative tasks, analysis, and general conversation. With its natural language understanding, it helps users brainstorm ideas, solve problems, and learn new concepts.',
            'excerpt' => 'Advanced conversational AI for writing, coding, and creative tasks',
            'category' => 'writing',
            'meta' => [
                'tool_website' => 'https://chat.openai.com',
                'tool_pricing' => 'Free / $20/month',
                'tool_featured' => true
            ]
        ],
        [
            'title' => 'Midjourney',
            'content' => 'Midjourney is a generative AI art tool that creates stunning visual artwork from text descriptions. It excels at creating dreamlike, artistic imagery and has become a favorite among digital artists and designers for its unique aesthetic style.',
            'excerpt' => 'AI image generation tool for creating stunning visual art',
            'category' => 'creating',
            'meta' => [
                'tool_website' => 'https://midjourney.com',
                'tool_pricing' => '$10-60/month',
                'tool_featured' => true
            ]
        ],
        [
            'title' => 'DALL-E 3',
            'content' => 'DALL-E 3 is OpenAI\'s latest image generation model that creates highly detailed and accurate images from text descriptions. It offers improved understanding of prompts and better integration with ChatGPT for refined image creation.',
            'excerpt' => 'OpenAI\'s advanced text-to-image generation model',
            'category' => 'creating',
            'meta' => [
                'tool_website' => 'https://openai.com/dall-e-3',
                'tool_pricing' => 'Via ChatGPT Plus ($20/month)',
                'tool_featured' => false
            ]
        ],
        [
            'title' => 'Claude',
            'content' => 'Claude is an AI assistant created by Anthropic, known for its helpful, harmless, and honest approach. It excels at analysis, writing, coding, and math, with a focus on safety and accuracy in its responses.',
            'excerpt' => 'Anthropic\'s helpful, harmless, and honest AI assistant',
            'category' => 'writing',
            'meta' => [
                'tool_website' => 'https://claude.ai',
                'tool_pricing' => 'Free / $20/month',
                'tool_featured' => true
            ]
        ],
        [
            'title' => 'Stable Diffusion',
            'content' => 'Stable Diffusion is an open-source image generation model that runs locally or in the cloud. It offers unprecedented control and customization options for AI art generation, with a vibrant community creating tools and models.',
            'excerpt' => 'Open-source image generation model with extensive customization',
            'category' => 'creating',
            'meta' => [
                'tool_website' => 'https://stability.ai',
                'tool_pricing' => 'Free (self-hosted) / Various cloud options',
                'tool_featured' => false
            ]
        ],
        [
            'title' => 'GitHub Copilot',
            'content' => 'GitHub Copilot is an AI pair programmer that helps you write code faster. It suggests whole lines or blocks of code as you type, trained on billions of lines of public code.',
            'excerpt' => 'AI pair programmer for faster code development',
            'category' => 'building',
            'meta' => [
                'tool_website' => 'https://github.com/features/copilot',
                'tool_pricing' => '$10/month',
                'tool_featured' => true
            ]
        ],
        [
            'title' => 'Notion AI',
            'content' => 'Notion AI enhances the popular workspace tool with AI capabilities for writing, summarizing, and organizing content. It helps with everything from meeting notes to creative writing within your existing workflow.',
            'excerpt' => 'AI-powered workspace for organizing and managing content',
            'category' => 'curating',
            'meta' => [
                'tool_website' => 'https://notion.so',
                'tool_pricing' => 'Free / $8/month',
                'tool_featured' => false
            ]
        ],
        [
            'title' => 'Perplexity',
            'content' => 'Perplexity is an AI-powered search engine that provides direct answers with sources. It combines the power of large language models with real-time web search to deliver accurate, up-to-date information.',
            'excerpt' => 'AI-powered search engine with real-time information',
            'category' => 'curating',
            'meta' => [
                'tool_website' => 'https://perplexity.ai',
                'tool_pricing' => 'Free / $20/month',
                'tool_featured' => false
            ]
        ],
        [
            'title' => 'Runway ML',
            'content' => 'Runway ML is a creative AI platform offering various tools for video editing, image generation, and more. It\'s particularly popular for its AI video generation and editing capabilities.',
            'excerpt' => 'AI platform for video and creative content generation',
            'category' => 'creating',
            'meta' => [
                'tool_website' => 'https://runwayml.com',
                'tool_pricing' => 'Free tier / $12+/month',
                'tool_featured' => false
            ]
        ],
        [
            'title' => 'Cursor',
            'content' => 'Cursor is an AI-powered code editor built for pair programming with AI. It offers deep integration with language models to help write, edit, and understand code more efficiently.',
            'excerpt' => 'AI-first code editor for enhanced programming',
            'category' => 'building',
            'meta' => [
                'tool_website' => 'https://cursor.sh',
                'tool_pricing' => 'Free / $20/month',
                'tool_featured' => false
            ]
        ]
    ];
    
    foreach ($tools as $tool) {
        // Get category term
        $category = get_term_by('slug', $tool['category'], 'tool_category');
        
        // Create tool post
        $post_id = wp_insert_post([
            'post_title' => $tool['title'],
            'post_content' => $tool['content'],
            'post_excerpt' => $tool['excerpt'],
            'post_status' => 'publish',
            'post_type' => 'tool'
        ]);
        
        if ($post_id && !is_wp_error($post_id)) {
            // Assign category
            if ($category) {
                wp_set_object_terms($post_id, $category->term_id, 'tool_category');
            }
            
            // Set custom fields
            foreach ($tool['meta'] as $key => $value) {
                update_field($key, $value, $post_id);
            }
        }
    }
}

// Run the functions to create data
add_action('init', function() {
    // Only run once - check if we already have tools
    $existing_tools = get_posts(['post_type' => 'tool', 'posts_per_page' => 1]);
    if (empty($existing_tools)) {
        create_tool_categories();
        create_sample_tools();
    }
}, 20); // Priority 20 to run after post type registration