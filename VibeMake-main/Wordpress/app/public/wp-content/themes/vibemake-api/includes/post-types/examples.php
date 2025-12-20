<?php
/**
 * Examples/Templates Custom Post Type
 * 
 * Real-world examples of what users have created with AI tools to inspire others
 */

namespace VibeMake\PostTypes;

// Register Examples Post Type
add_action('init', function() {
    $labels = array(
        'name'                  => _x('Examples', 'Post Type General Name', 'vibemake'),
        'singular_name'         => _x('Example', 'Post Type Singular Name', 'vibemake'),
        'menu_name'             => __('Examples', 'vibemake'),
        'name_admin_bar'        => __('Example', 'vibemake'),
        'archives'              => __('Example Archives', 'vibemake'),
        'attributes'            => __('Example Attributes', 'vibemake'),
        'parent_item_colon'     => __('Parent Example:', 'vibemake'),
        'all_items'             => __('All Examples', 'vibemake'),
        'add_new_item'          => __('Add New Example', 'vibemake'),
        'add_new'               => __('Add New', 'vibemake'),
        'new_item'              => __('New Example', 'vibemake'),
        'edit_item'             => __('Edit Example', 'vibemake'),
        'update_item'           => __('Update Example', 'vibemake'),
        'view_item'             => __('View Example', 'vibemake'),
        'view_items'            => __('View Examples', 'vibemake'),
        'search_items'          => __('Search Example', 'vibemake'),
        'not_found'             => __('Not found', 'vibemake'),
        'not_found_in_trash'    => __('Not found in Trash', 'vibemake'),
        'featured_image'        => __('Example Preview', 'vibemake'),
        'set_featured_image'    => __('Set example preview', 'vibemake'),
        'remove_featured_image' => __('Remove example preview', 'vibemake'),
        'use_featured_image'    => __('Use as example preview', 'vibemake'),
        'insert_into_item'      => __('Insert into example', 'vibemake'),
        'uploaded_to_this_item' => __('Uploaded to this example', 'vibemake'),
        'items_list'            => __('Examples list', 'vibemake'),
        'items_list_navigation' => __('Examples list navigation', 'vibemake'),
        'filter_items_list'     => __('Filter examples list', 'vibemake'),
    );
    
    $args = array(
        'label'                 => __('Example', 'vibemake'),
        'description'           => __('Real-world examples and templates created with AI tools', 'vibemake'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies'            => array('creation_type', 'user_situation', 'example_difficulty'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 7,
        'menu_icon'             => 'dashicons-lightbulb',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'example',
        'graphql_plural_name'   => 'examples',
    );
    
    register_post_type('example', $args);
});

// Register Example Difficulty Taxonomy
add_action('init', function() {
    $labels = array(
        'name'                       => _x('Difficulty Levels', 'Taxonomy General Name', 'vibemake'),
        'singular_name'              => _x('Difficulty Level', 'Taxonomy Singular Name', 'vibemake'),
        'menu_name'                  => __('Difficulty Levels', 'vibemake'),
        'all_items'                  => __('All Difficulty Levels', 'vibemake'),
        'parent_item'                => __('Parent Difficulty', 'vibemake'),
        'parent_item_colon'          => __('Parent Difficulty:', 'vibemake'),
        'new_item_name'              => __('New Difficulty Level Name', 'vibemake'),
        'add_new_item'               => __('Add New Difficulty Level', 'vibemake'),
        'edit_item'                  => __('Edit Difficulty Level', 'vibemake'),
        'update_item'                => __('Update Difficulty Level', 'vibemake'),
        'view_item'                  => __('View Difficulty Level', 'vibemake'),
        'separate_items_with_commas' => __('Separate difficulty levels with commas', 'vibemake'),
        'add_or_remove_items'        => __('Add or remove difficulty levels', 'vibemake'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake'),
        'popular_items'              => __('Popular Difficulty Levels', 'vibemake'),
        'search_items'               => __('Search Difficulty Levels', 'vibemake'),
        'not_found'                  => __('Not Found', 'vibemake'),
        'no_terms'                   => __('No difficulty levels', 'vibemake'),
        'items_list'                 => __('Difficulty Levels list', 'vibemake'),
        'items_list_navigation'      => __('Difficulty Levels list navigation', 'vibemake'),
    );
    
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'exampleDifficulty',
        'graphql_plural_name'        => 'exampleDifficulties',
        'meta_box_cb'                => false, // Hide default metabox since we'll use ACF
    );
    
    register_taxonomy('example_difficulty', array('example'), $args);
});