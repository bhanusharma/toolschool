<?php
/**
 * Example Difficulty Seeder
 * 
 * Seeds the database with initial difficulty levels for AI examples
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function seed_example_difficulties() {
    // Check if difficulty levels already exist
    $existing_terms = get_terms([
        'taxonomy' => 'example_difficulty',
        'hide_empty' => false,
        'count' => true,
    ]);
    
    if (is_array($existing_terms) && count($existing_terms) > 0) {
        return; // Already seeded
    }
    
    $difficulties = [
        [
            'name' => 'Beginner',
            'slug' => 'beginner',
            'description' => 'Perfect for first-time users with no AI experience. These examples require no technical knowledge and can be completed by anyone.',
            'meta' => [
                'difficulty_icon' => '🟢',
                'difficulty_color' => '#22c55e',
                'difficulty_description' => 'Perfect for first-time users with no AI experience. Simple prompts, clear instructions, and immediate results.',
                'difficulty_time_estimate' => '5-30 minutes',
                'difficulty_prerequisites' => 'None! Just curiosity and willingness to try something new.',
            ]
        ],
        [
            'name' => 'Intermediate',
            'slug' => 'intermediate',
            'description' => 'For users with some AI tool experience. Requires basic understanding of prompts and AI capabilities.',
            'meta' => [
                'difficulty_icon' => '🟡',
                'difficulty_color' => '#eab308',
                'difficulty_description' => 'For users with some AI tool experience. Involves more complex prompts, multiple steps, and fine-tuning results.',
                'difficulty_time_estimate' => '30 minutes - 2 hours',
                'difficulty_prerequisites' => 'Basic familiarity with AI chat interfaces, understanding of prompt structure, some experience with AI tools.',
            ]
        ],
        [
            'name' => 'Advanced',
            'slug' => 'advanced',
            'description' => 'For experienced AI users. Requires deep understanding of AI capabilities, advanced prompting techniques, and workflow optimization.',
            'meta' => [
                'difficulty_icon' => '🔴',
                'difficulty_color' => '#ef4444',
                'difficulty_description' => 'For experienced AI users. Complex workflows, advanced prompting techniques, integration of multiple tools, and optimization strategies.',
                'difficulty_time_estimate' => '2+ hours',
                'difficulty_prerequisites' => 'Extensive AI tool experience, understanding of prompt engineering, knowledge of AI model capabilities and limitations.',
            ]
        ],
    ];
    
    foreach ($difficulties as $difficulty_data) {
        // Create the term
        $term = wp_insert_term(
            $difficulty_data['name'],
            'example_difficulty',
            [
                'description' => $difficulty_data['description'],
                'slug' => $difficulty_data['slug']
            ]
        );
        
        if (!is_wp_error($term)) {
            $term_id = $term['term_id'];
            
            // Add ACF meta fields
            foreach ($difficulty_data['meta'] as $key => $value) {
                update_field($key, $value, 'example_difficulty_' . $term_id);
            }
        }
    }
}

// Hook to run seeder
add_action('init', function() {
    // Only run on admin and if ACF is available
    if (is_admin() && function_exists('update_field')) {
        seed_example_difficulties();
    }
}, 999); // Run late to ensure ACF is loaded
?>