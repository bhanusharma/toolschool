<?php
/**
 * Creation Types Seeder
 * 
 * Seeds the database with initial creation types for the AI Discovery Engine
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function seed_creation_types() {
    // Check if creation types already exist
    $existing_terms = get_terms([
        'taxonomy' => 'creation_type',
        'hide_empty' => false,
        'count' => true,
    ]);
    
    if (is_array($existing_terms) && count($existing_terms) > 0) {
        return; // Already seeded
    }
    
    $creation_types = [
        [
            'name' => 'Writing & Text',
            'slug' => 'writing-text',
            'description' => 'Create compelling written content with AI-powered writing tools',
            'meta' => [
                'creation_type_icon' => '✍️',
                'creation_type_color' => '#3b82f6',
                'creation_type_gradient' => '#1d4ed8',
                'creation_type_tagline' => 'Bring your words to life',
                'creation_type_description' => 'From blog posts to novels, marketing copy to technical documentation - AI writing tools help you create compelling content faster than ever. Whether you need help with ideation, drafting, editing, or polishing, these tools understand context and style to produce human-quality text.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Write a blog post about sustainable living', 'example_featured' => true],
                    ['example_prompt' => 'Create marketing copy for my product launch', 'example_featured' => true],
                    ['example_prompt' => 'Help me write a professional email', 'example_featured' => false],
                    ['example_prompt' => 'Generate social media captions', 'example_featured' => false],
                    ['example_prompt' => 'Write a creative story', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '25+ tools',
                    'stat_difficulty' => 'beginner',
                    'stat_popularity' => 9,
                ]
            ]
        ],
        [
            'name' => 'Images & Art',
            'slug' => 'images-art',
            'description' => 'Generate stunning visuals and artwork with AI image creation tools',
            'meta' => [
                'creation_type_icon' => '🎨',
                'creation_type_color' => '#ec4899',
                'creation_type_gradient' => '#be185d',
                'creation_type_tagline' => 'Turn imagination into visuals',
                'creation_type_description' => 'Create breathtaking images, artwork, logos, and designs without needing artistic skills. AI image generators can produce photorealistic images, abstract art, product mockups, and everything in between from simple text descriptions.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Create a logo for my startup', 'example_featured' => true],
                    ['example_prompt' => 'Generate product mockups', 'example_featured' => true],
                    ['example_prompt' => 'Design a poster for my event', 'example_featured' => false],
                    ['example_prompt' => 'Create artwork for my room', 'example_featured' => false],
                    ['example_prompt' => 'Generate social media graphics', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '30+ tools',
                    'stat_difficulty' => 'beginner',
                    'stat_popularity' => 10,
                ]
            ]
        ],
        [
            'name' => 'Video & Film',
            'slug' => 'video-film',
            'description' => 'Produce engaging videos and films with AI video generation tools',
            'meta' => [
                'creation_type_icon' => '🎬',
                'creation_type_color' => '#8b5cf6',
                'creation_type_gradient' => '#7c3aed',
                'creation_type_tagline' => 'Movies made simple',
                'creation_type_description' => 'Create professional-quality videos from scripts, images, or simple prompts. AI video tools can generate animations, edit footage, create talking avatars, and even produce entire films with minimal input.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Create an explainer video for my business', 'example_featured' => true],
                    ['example_prompt' => 'Generate a marketing video', 'example_featured' => true],
                    ['example_prompt' => 'Make a social media video', 'example_featured' => false],
                    ['example_prompt' => 'Create an animated presentation', 'example_featured' => false],
                    ['example_prompt' => 'Edit my video footage', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '15+ tools',
                    'stat_difficulty' => 'intermediate',
                    'stat_popularity' => 8,
                ]
            ]
        ],
        [
            'name' => 'Audio & Music',
            'slug' => 'audio-music',
            'description' => 'Compose music and create audio content with AI-powered tools',
            'meta' => [
                'creation_type_icon' => '🎵',
                'creation_type_color' => '#f59e0b',
                'creation_type_gradient' => '#d97706',
                'creation_type_tagline' => 'Compose like a maestro',
                'creation_type_description' => 'Generate original music, create podcasts, design sound effects, and produce audio content. AI audio tools can compose in any style, generate realistic voices, and create professional-quality soundtracks.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Create background music for my video', 'example_featured' => true],
                    ['example_prompt' => 'Generate a podcast intro', 'example_featured' => true],
                    ['example_prompt' => 'Compose a jingle for my brand', 'example_featured' => false],
                    ['example_prompt' => 'Create ambient music for relaxation', 'example_featured' => false],
                    ['example_prompt' => 'Generate sound effects', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '12+ tools',
                    'stat_difficulty' => 'beginner',
                    'stat_popularity' => 7,
                ]
            ]
        ],
        [
            'name' => 'Code & Development',
            'slug' => 'code-development',
            'description' => 'Build applications and write code with AI development assistants',
            'meta' => [
                'creation_type_icon' => '💻',
                'creation_type_color' => '#10b981',
                'creation_type_gradient' => '#059669',
                'creation_type_tagline' => 'Code at the speed of thought',
                'creation_type_description' => 'Accelerate software development with AI coding assistants. Generate code, debug issues, explain complex functions, and build entire applications faster with intelligent code completion and generation.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Build a simple web app', 'example_featured' => true],
                    ['example_prompt' => 'Debug my code', 'example_featured' => true],
                    ['example_prompt' => 'Create a mobile app prototype', 'example_featured' => false],
                    ['example_prompt' => 'Generate API documentation', 'example_featured' => false],
                    ['example_prompt' => 'Optimize my database queries', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '20+ tools',
                    'stat_difficulty' => 'intermediate',
                    'stat_popularity' => 9,
                ]
            ]
        ],
        [
            'name' => 'Business & Marketing',
            'slug' => 'business-marketing',
            'description' => 'Scale your business with AI-powered marketing and business tools',
            'meta' => [
                'creation_type_icon' => '💼',
                'creation_type_color' => '#ef4444',
                'creation_type_gradient' => '#dc2626',
                'creation_type_tagline' => 'Grow smarter, not harder',
                'creation_type_description' => 'Streamline business operations, create marketing campaigns, analyze data, and automate workflows. AI business tools help entrepreneurs and companies scale efficiently and make data-driven decisions.',
                'creation_type_examples' => [
                    ['example_prompt' => 'Create a marketing strategy', 'example_featured' => true],
                    ['example_prompt' => 'Analyze my sales data', 'example_featured' => true],
                    ['example_prompt' => 'Generate a business plan', 'example_featured' => false],
                    ['example_prompt' => 'Create customer personas', 'example_featured' => false],
                    ['example_prompt' => 'Automate my email campaigns', 'example_featured' => false],
                ],
                'creation_type_stats' => [
                    'stat_tools_count' => '18+ tools',
                    'stat_difficulty' => 'beginner',
                    'stat_popularity' => 8,
                ]
            ]
        ]
    ];
    
    foreach ($creation_types as $type_data) {
        // Create the term
        $term = wp_insert_term(
            $type_data['name'],
            'creation_type',
            [
                'description' => $type_data['description'],
                'slug' => $type_data['slug']
            ]
        );
        
        if (!is_wp_error($term)) {
            $term_id = $term['term_id'];
            
            // Add ACF meta fields
            foreach ($type_data['meta'] as $key => $value) {
                update_field($key, $value, 'creation_type_' . $term_id);
            }
        }
    }
}

// Hook to run seeder
add_action('init', function() {
    // Only run on admin and if ACF is available
    if (is_admin() && function_exists('update_field')) {
        seed_creation_types();
    }
}, 999); // Run late to ensure ACF is loaded
?>