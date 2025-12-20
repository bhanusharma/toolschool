<?php
/**
 * User Situations Seeder
 * 
 * Seeds the database with initial user situations for the AI Discovery Engine
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function seed_user_situations() {
    // Check if user situations already exist
    $existing_terms = get_terms([
        'taxonomy' => 'user_situation',
        'hide_empty' => false,
        'count' => true,
    ]);
    
    if (is_array($existing_terms) && count($existing_terms) > 0) {
        return; // Already seeded
    }
    
    $user_situations = [
        [
            'name' => 'Student & Learner',
            'slug' => 'student-learner',
            'description' => 'Students and lifelong learners using AI to accelerate their education and personal growth',
            'meta' => [
                'user_situation_icon' => '🎓',
                'user_situation_color' => '#3b82f6',
                'user_situation_accent' => '#1d4ed8',
                'user_situation_tagline' => 'Learn faster with AI',
                'user_situation_description' => 'Whether you\'re in school, college, or pursuing personal learning goals, AI can be your study companion. From research assistance to creating study materials, AI tools help you understand complex topics, write better papers, and learn more efficiently.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Information overload when researching', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Writer\'s block on assignments', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Creating engaging presentations', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Understanding complex concepts', 'pain_point_severity' => 'high'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Research topics quickly and thoroughly', 'goal_priority' => 'high'],
                    ['goal_title' => 'Write better essays and papers', 'goal_priority' => 'high'],
                    ['goal_title' => 'Create study materials and flashcards', 'goal_priority' => 'medium'],
                    ['goal_title' => 'Understand difficult subjects', 'goal_priority' => 'high'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'beginner',
                    'persona_budget_range' => 'free',
                    'persona_time_availability' => 'moderate',
                ]
            ]
        ],
        [
            'name' => 'Business Professional',
            'slug' => 'business-professional',
            'description' => 'Working professionals using AI to enhance productivity and advance their careers',
            'meta' => [
                'user_situation_icon' => '💼',
                'user_situation_color' => '#059669',
                'user_situation_accent' => '#047857',
                'user_situation_tagline' => 'Work smarter, achieve more',
                'user_situation_description' => 'From executives to team members, AI helps professionals streamline workflows, create better presentations, analyze data, and communicate more effectively. Boost your productivity and make data-driven decisions with intelligent assistance.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Too many repetitive tasks', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Creating compelling presentations', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Analyzing large datasets', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Writing professional emails and reports', 'pain_point_severity' => 'medium'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Automate routine work tasks', 'goal_priority' => 'high'],
                    ['goal_title' => 'Create professional presentations quickly', 'goal_priority' => 'high'],
                    ['goal_title' => 'Generate insights from business data', 'goal_priority' => 'high'],
                    ['goal_title' => 'Improve written communication', 'goal_priority' => 'medium'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'intermediate',
                    'persona_budget_range' => 'medium',
                    'persona_time_availability' => 'minimal',
                ]
            ]
        ],
        [
            'name' => 'Content Creator & Influencer',
            'slug' => 'content-creator-influencer',
            'description' => 'Creators, influencers, and social media professionals using AI to scale content production',
            'meta' => [
                'user_situation_icon' => '📱',
                'user_situation_color' => '#ec4899',
                'user_situation_accent' => '#be185d',
                'user_situation_tagline' => 'Create content that captivates',
                'user_situation_description' => 'Whether you\'re a YouTuber, TikToker, blogger, or social media manager, AI can help you generate ideas, create graphics, write captions, edit videos, and maintain a consistent content calendar that engages your audience.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Constant need for fresh content ideas', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Time-consuming video editing', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Creating eye-catching thumbnails and graphics', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Writing engaging captions and descriptions', 'pain_point_severity' => 'medium'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Generate unlimited content ideas', 'goal_priority' => 'high'],
                    ['goal_title' => 'Create professional visuals quickly', 'goal_priority' => 'high'],
                    ['goal_title' => 'Edit videos faster and better', 'goal_priority' => 'high'],
                    ['goal_title' => 'Write compelling social media copy', 'goal_priority' => 'medium'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'intermediate',
                    'persona_budget_range' => 'low',
                    'persona_time_availability' => 'minimal',
                ]
            ]
        ],
        [
            'name' => 'Entrepreneur & Founder',
            'slug' => 'entrepreneur-founder',
            'description' => 'Startup founders and entrepreneurs using AI to build and scale their businesses efficiently',
            'meta' => [
                'user_situation_icon' => '🚀',
                'user_situation_color' => '#f59e0b',
                'user_situation_accent' => '#d97706',
                'user_situation_tagline' => 'Build the future with AI',
                'user_situation_description' => 'As a founder, you wear many hats. AI can be your co-founder, helping with market research, product development, marketing strategies, code generation, and business planning. Move faster and make better decisions with AI assistance.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Limited resources for everything', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Need to validate ideas quickly', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Creating marketing materials on budget', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Building MVPs without technical team', 'pain_point_severity' => 'high'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Validate business ideas faster', 'goal_priority' => 'high'],
                    ['goal_title' => 'Create professional marketing materials', 'goal_priority' => 'high'],
                    ['goal_title' => 'Build prototypes and MVPs', 'goal_priority' => 'high'],
                    ['goal_title' => 'Analyze market trends and competition', 'goal_priority' => 'medium'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'intermediate',
                    'persona_budget_range' => 'medium',
                    'persona_time_availability' => 'minimal',
                ]
            ]
        ],
        [
            'name' => 'Developer & Tech Professional',
            'slug' => 'developer-tech',
            'description' => 'Software developers and tech professionals using AI to accelerate development and solve complex problems',
            'meta' => [
                'user_situation_icon' => '💻',
                'user_situation_color' => '#8b5cf6',
                'user_situation_accent' => '#7c3aed',
                'user_situation_tagline' => 'Code at the speed of thought',
                'user_situation_description' => 'Whether you\'re a frontend, backend, or full-stack developer, AI coding assistants can help you write better code faster, debug issues, generate documentation, and learn new technologies. Level up your development workflow.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Debugging complex issues', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Learning new frameworks quickly', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Writing documentation and tests', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Keeping up with technology changes', 'pain_point_severity' => 'high'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Write cleaner, more efficient code', 'goal_priority' => 'high'],
                    ['goal_title' => 'Debug and fix issues faster', 'goal_priority' => 'high'],
                    ['goal_title' => 'Generate comprehensive documentation', 'goal_priority' => 'medium'],
                    ['goal_title' => 'Learn new technologies quickly', 'goal_priority' => 'high'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'advanced',
                    'persona_budget_range' => 'medium',
                    'persona_time_availability' => 'moderate',
                ]
            ]
        ],
        [
            'name' => 'Marketer & Growth Professional',
            'slug' => 'marketer-growth',
            'description' => 'Marketing professionals and growth hackers using AI to optimize campaigns and drive results',
            'meta' => [
                'user_situation_icon' => '📈',
                'user_situation_color' => '#ef4444',
                'user_situation_accent' => '#dc2626',
                'user_situation_tagline' => 'Growth hacking with intelligence',
                'user_situation_description' => 'From digital marketers to growth managers, AI helps you create compelling campaigns, analyze customer data, optimize ad spend, generate content at scale, and predict market trends for better ROI.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Creating enough content for all channels', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Analyzing complex marketing data', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Personalizing campaigns at scale', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Staying ahead of marketing trends', 'pain_point_severity' => 'medium'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Create high-converting marketing copy', 'goal_priority' => 'high'],
                    ['goal_title' => 'Analyze customer behavior and trends', 'goal_priority' => 'high'],
                    ['goal_title' => 'Optimize ad campaigns automatically', 'goal_priority' => 'high'],
                    ['goal_title' => 'Generate content for multiple channels', 'goal_priority' => 'medium'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'intermediate',
                    'persona_budget_range' => 'high',
                    'persona_time_availability' => 'minimal',
                ]
            ]
        ],
        [
            'name' => 'Freelancer & Consultant',
            'slug' => 'freelancer-consultant',
            'description' => 'Independent professionals and consultants using AI to deliver better results for clients',
            'meta' => [
                'user_situation_icon' => '🎯',
                'user_situation_color' => '#06b6d4',
                'user_situation_accent' => '#0891b2',
                'user_situation_tagline' => 'Deliver excellence, scale impact',
                'user_situation_description' => 'As a freelancer or consultant, your time is money. AI helps you work more efficiently, deliver higher quality work, research faster, create better proposals, and provide more value to your clients while scaling your business.',
                'user_situation_pain_points' => [
                    ['pain_point_title' => 'Managing multiple client projects', 'pain_point_severity' => 'high'],
                    ['pain_point_title' => 'Creating compelling proposals quickly', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Researching client industries deeply', 'pain_point_severity' => 'medium'],
                    ['pain_point_title' => 'Delivering consistent quality work', 'pain_point_severity' => 'high'],
                ],
                'user_situation_goals' => [
                    ['goal_title' => 'Increase project efficiency and quality', 'goal_priority' => 'high'],
                    ['goal_title' => 'Create winning proposals faster', 'goal_priority' => 'high'],
                    ['goal_title' => 'Research client needs thoroughly', 'goal_priority' => 'medium'],
                    ['goal_title' => 'Scale business without hiring', 'goal_priority' => 'high'],
                ],
                'user_situation_personas' => [
                    'persona_experience_level' => 'intermediate',
                    'persona_budget_range' => 'low',
                    'persona_time_availability' => 'minimal',
                ]
            ]
        ]
    ];
    
    foreach ($user_situations as $situation_data) {
        // Create the term
        $term = wp_insert_term(
            $situation_data['name'],
            'user_situation',
            [
                'description' => $situation_data['description'],
                'slug' => $situation_data['slug']
            ]
        );
        
        if (!is_wp_error($term)) {
            $term_id = $term['term_id'];
            
            // Add ACF meta fields
            foreach ($situation_data['meta'] as $key => $value) {
                update_field($key, $value, 'user_situation_' . $term_id);
            }
        }
    }
}

// Hook to run seeder
add_action('init', function() {
    // Only run on admin and if ACF is available
    if (is_admin() && function_exists('update_field')) {
        seed_user_situations();
    }
}, 999); // Run late to ensure ACF is loaded
?>