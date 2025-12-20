<?php
/**
 * Tools Custom Post Type and Taxonomies
 */

namespace VibeMake\PostTypes;

// Register Tools Post Type
add_action('init', function() {
    $labels = array(
        'name'                  => _x('Tools', 'Post Type General Name', 'vibemake'),
        'singular_name'         => _x('Tool', 'Post Type Singular Name', 'vibemake'),
        'menu_name'             => __('Tools', 'vibemake'),
        'name_admin_bar'        => __('Tool', 'vibemake'),
        'archives'              => __('Tool Archives', 'vibemake'),
        'attributes'            => __('Tool Attributes', 'vibemake'),
        'parent_item_colon'     => __('Parent Tool:', 'vibemake'),
        'all_items'             => __('All Tools', 'vibemake'),
        'add_new_item'          => __('Add New Tool', 'vibemake'),
        'add_new'               => __('Add New', 'vibemake'),
        'new_item'              => __('New Tool', 'vibemake'),
        'edit_item'             => __('Edit Tool', 'vibemake'),
        'update_item'           => __('Update Tool', 'vibemake'),
        'view_item'             => __('View Tool', 'vibemake'),
        'view_items'            => __('View Tools', 'vibemake'),
        'search_items'          => __('Search Tool', 'vibemake'),
        'not_found'             => __('Not found', 'vibemake'),
        'not_found_in_trash'    => __('Not found in Trash', 'vibemake'),
        'featured_image'        => __('Tool Logo', 'vibemake'),
        'set_featured_image'    => __('Set tool logo', 'vibemake'),
        'remove_featured_image' => __('Remove tool logo', 'vibemake'),
        'use_featured_image'    => __('Use as tool logo', 'vibemake'),
        'insert_into_item'      => __('Insert into tool', 'vibemake'),
        'uploaded_to_this_item' => __('Uploaded to this tool', 'vibemake'),
        'items_list'            => __('Tools list', 'vibemake'),
        'items_list_navigation' => __('Tools list navigation', 'vibemake'),
        'filter_items_list'     => __('Filter tools list', 'vibemake'),
    );
    
    $args = array(
        'label'                 => __('Tool', 'vibemake'),
        'description'           => __('AI Tools Directory', 'vibemake'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies'            => array('tool_category'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 6,
        'menu_icon'             => 'dashicons-hammer',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'tool',
        'graphql_plural_name'   => 'tools',
    );
    
    register_post_type('tool', $args);
});

// Register Tool Category Taxonomy
add_action('init', function() {
    $labels = array(
        'name'                       => _x('Tool Categories', 'Taxonomy General Name', 'vibemake'),
        'singular_name'              => _x('Tool Category', 'Taxonomy Singular Name', 'vibemake'),
        'menu_name'                  => __('Tool Categories', 'vibemake'),
        'all_items'                  => __('All Categories', 'vibemake'),
        'parent_item'                => __('Parent Category', 'vibemake'),
        'parent_item_colon'          => __('Parent Category:', 'vibemake'),
        'new_item_name'              => __('New Category Name', 'vibemake'),
        'add_new_item'               => __('Add New Category', 'vibemake'),
        'edit_item'                  => __('Edit Category', 'vibemake'),
        'update_item'                => __('Update Category', 'vibemake'),
        'view_item'                  => __('View Category', 'vibemake'),
        'separate_items_with_commas' => __('Separate categories with commas', 'vibemake'),
        'add_or_remove_items'        => __('Add or remove categories', 'vibemake'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake'),
        'popular_items'              => __('Popular Categories', 'vibemake'),
        'search_items'               => __('Search Categories', 'vibemake'),
        'not_found'                  => __('Not Found', 'vibemake'),
        'no_terms'                   => __('No categories', 'vibemake'),
        'items_list'                 => __('Categories list', 'vibemake'),
        'items_list_navigation'      => __('Categories list navigation', 'vibemake'),
    );
    
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'toolCategory',
        'graphql_plural_name'        => 'toolCategories',
    );
    
    register_taxonomy('tool_category', array('tool'), $args);
});

// Register Creation Types Taxonomy for AI Discovery
add_action('init', function() {
    $labels = array(
        'name'                       => _x('Creation Types', 'Taxonomy General Name', 'vibemake'),
        'singular_name'              => _x('Creation Type', 'Taxonomy Singular Name', 'vibemake'),
        'menu_name'                  => __('Creation Types', 'vibemake'),
        'all_items'                  => __('All Creation Types', 'vibemake'),
        'parent_item'                => __('Parent Creation Type', 'vibemake'),
        'parent_item_colon'          => __('Parent Creation Type:', 'vibemake'),
        'new_item_name'              => __('New Creation Type Name', 'vibemake'),
        'add_new_item'               => __('Add New Creation Type', 'vibemake'),
        'edit_item'                  => __('Edit Creation Type', 'vibemake'),
        'update_item'                => __('Update Creation Type', 'vibemake'),
        'view_item'                  => __('View Creation Type', 'vibemake'),
        'separate_items_with_commas' => __('Separate creation types with commas', 'vibemake'),
        'add_or_remove_items'        => __('Add or remove creation types', 'vibemake'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake'),
        'popular_items'              => __('Popular Creation Types', 'vibemake'),
        'search_items'               => __('Search Creation Types', 'vibemake'),
        'not_found'                  => __('Not Found', 'vibemake'),
        'no_terms'                   => __('No creation types', 'vibemake'),
        'items_list'                 => __('Creation Types list', 'vibemake'),
        'items_list_navigation'      => __('Creation Types list navigation', 'vibemake'),
    );
    
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'creationType',
        'graphql_plural_name'        => 'creationTypes',
        'meta_box_cb'                => false, // Hide default metabox since we'll use ACF
    );
    
    register_taxonomy('creation_type', array('tool'), $args);
});

// Register User Situations Taxonomy for AI Discovery
add_action('init', function() {
    $labels = array(
        'name'                       => _x('User Situations', 'Taxonomy General Name', 'vibemake'),
        'singular_name'              => _x('User Situation', 'Taxonomy Singular Name', 'vibemake'),
        'menu_name'                  => __('User Situations', 'vibemake'),
        'all_items'                  => __('All User Situations', 'vibemake'),
        'parent_item'                => __('Parent Situation', 'vibemake'),
        'parent_item_colon'          => __('Parent Situation:', 'vibemake'),
        'new_item_name'              => __('New User Situation Name', 'vibemake'),
        'add_new_item'               => __('Add New User Situation', 'vibemake'),
        'edit_item'                  => __('Edit User Situation', 'vibemake'),
        'update_item'                => __('Update User Situation', 'vibemake'),
        'view_item'                  => __('View User Situation', 'vibemake'),
        'separate_items_with_commas' => __('Separate user situations with commas', 'vibemake'),
        'add_or_remove_items'        => __('Add or remove user situations', 'vibemake'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake'),
        'popular_items'              => __('Popular User Situations', 'vibemake'),
        'search_items'               => __('Search User Situations', 'vibemake'),
        'not_found'                  => __('Not Found', 'vibemake'),
        'no_terms'                   => __('No user situations', 'vibemake'),
        'items_list'                 => __('User Situations list', 'vibemake'),
        'items_list_navigation'      => __('User Situations list navigation', 'vibemake'),
    );
    
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false, // Non-hierarchical for user roles/situations
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'userSituation',
        'graphql_plural_name'        => 'userSituations',
        'meta_box_cb'                => false, // Hide default metabox since we'll use ACF
    );
    
    register_taxonomy('user_situation', array('tool'), $args);
});

// ACF Fields for Tools are now registered in functions-acf.php with enhanced tabbed UI