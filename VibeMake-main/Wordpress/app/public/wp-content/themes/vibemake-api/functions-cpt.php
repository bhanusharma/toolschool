<?php
/**
 * Custom Post Types and Taxonomies
 * 
 * This file registers all custom post types and taxonomies for VibeMake
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include additional post types
require_once get_template_directory() . '/includes/post-types/tools.php';
require_once get_template_directory() . '/includes/post-types/examples.php';

// Register all custom post types
add_action('init', 'vibemake_register_post_types', 0);
function vibemake_register_post_types() {
    
    // AI Projects Post Type - DEPRECATED (Merged into Projects)
    /* Commented out - AI Projects have been merged into the unified Projects post type
    $ai_project_labels = [
        'name'                  => _x('AI Projects', 'Post Type General Name', 'vibemake-api'),
        'singular_name'         => _x('AI Project', 'Post Type Singular Name', 'vibemake-api'),
        'menu_name'             => __('AI Projects', 'vibemake-api'),
        'name_admin_bar'        => __('AI Project', 'vibemake-api'),
        'archives'              => __('AI Project Archives', 'vibemake-api'),
        'attributes'            => __('AI Project Attributes', 'vibemake-api'),
        'parent_item_colon'     => __('Parent AI Project:', 'vibemake-api'),
        'all_items'             => __('All AI Projects', 'vibemake-api'),
        'add_new_item'          => __('Add New AI Project', 'vibemake-api'),
        'add_new'               => __('Add New', 'vibemake-api'),
        'new_item'              => __('New AI Project', 'vibemake-api'),
        'edit_item'             => __('Edit AI Project', 'vibemake-api'),
        'update_item'           => __('Update AI Project', 'vibemake-api'),
        'view_item'             => __('View AI Project', 'vibemake-api'),
        'view_items'            => __('View AI Projects', 'vibemake-api'),
        'search_items'          => __('Search AI Project', 'vibemake-api'),
        'not_found'             => __('Not found', 'vibemake-api'),
        'not_found_in_trash'    => __('Not found in Trash', 'vibemake-api'),
        'featured_image'        => __('Featured Image', 'vibemake-api'),
        'set_featured_image'    => __('Set featured image', 'vibemake-api'),
        'remove_featured_image' => __('Remove featured image', 'vibemake-api'),
        'use_featured_image'    => __('Use as featured image', 'vibemake-api'),
        'insert_into_item'      => __('Insert into AI project', 'vibemake-api'),
        'uploaded_to_this_item' => __('Uploaded to this AI project', 'vibemake-api'),
        'items_list'            => __('AI Projects list', 'vibemake-api'),
        'items_list_navigation' => __('AI Projects list navigation', 'vibemake-api'),
        'filter_items_list'     => __('Filter AI projects list', 'vibemake-api'),
    ];
    
    $ai_project_args = [
        'label'                 => __('AI Project', 'vibemake-api'),
        'description'           => __('AI-powered creative projects', 'vibemake-api'),
        'labels'                => $ai_project_labels,
        'supports'              => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'author', 'revisions'],
        'taxonomies'            => ['project_category'],
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-lightbulb',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'ai-projects',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'aiProject',
        'graphql_plural_name'   => 'aiProjects',
    ];
    
    register_post_type('ai_project', $ai_project_args);
    */
    
    // Makers Post Type
    $maker_labels = [
        'name'                  => _x('Makers', 'Post Type General Name', 'vibemake-api'),
        'singular_name'         => _x('Maker', 'Post Type Singular Name', 'vibemake-api'),
        'menu_name'             => __('Makers', 'vibemake-api'),
        'name_admin_bar'        => __('Maker', 'vibemake-api'),
        'archives'              => __('Maker Archives', 'vibemake-api'),
        'attributes'            => __('Maker Attributes', 'vibemake-api'),
        'parent_item_colon'     => __('Parent Maker:', 'vibemake-api'),
        'all_items'             => __('All Makers', 'vibemake-api'),
        'add_new_item'          => __('Add New Maker', 'vibemake-api'),
        'add_new'               => __('Add New', 'vibemake-api'),
        'new_item'              => __('New Maker', 'vibemake-api'),
        'edit_item'             => __('Edit Maker', 'vibemake-api'),
        'update_item'           => __('Update Maker', 'vibemake-api'),
        'view_item'             => __('View Maker', 'vibemake-api'),
        'view_items'            => __('View Makers', 'vibemake-api'),
        'search_items'          => __('Search Maker', 'vibemake-api'),
        'not_found'             => __('Not found', 'vibemake-api'),
        'not_found_in_trash'    => __('Not found in Trash', 'vibemake-api'),
    ];
    
    $maker_args = [
        'label'                 => __('Maker', 'vibemake-api'),
        'description'           => __('AI Makers and Creators', 'vibemake-api'),
        'labels'                => $maker_labels,
        'supports'              => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
        'taxonomies'            => ['maker_specialty'],
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 6,
        'menu_icon'             => 'dashicons-admin-users',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'makers',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'maker',
        'graphql_plural_name'   => 'makers',
    ];
    
    register_post_type('maker', $maker_args);
    
    // Projects Post Type (formerly Community Projects)
    $community_project_labels = [
        'name'                  => _x('Projects', 'Post Type General Name', 'vibemake-api'),
        'singular_name'         => _x('Project', 'Post Type Singular Name', 'vibemake-api'),
        'menu_name'             => __('Projects', 'vibemake-api'),
        'name_admin_bar'        => __('Project', 'vibemake-api'),
        'archives'              => __('Project Archives', 'vibemake-api'),
        'all_items'             => __('All Projects', 'vibemake-api'),
        'add_new_item'          => __('Add New Project', 'vibemake-api'),
        'add_new'               => __('Add New', 'vibemake-api'),
        'new_item'              => __('New Project', 'vibemake-api'),
        'edit_item'             => __('Edit Project', 'vibemake-api'),
        'update_item'           => __('Update Project', 'vibemake-api'),
        'view_item'             => __('View Project', 'vibemake-api'),
        'view_items'            => __('View Projects', 'vibemake-api'),
        'search_items'          => __('Search Project', 'vibemake-api'),
        'not_found'             => __('Not found', 'vibemake-api'),
        'not_found_in_trash'    => __('Not found in Trash', 'vibemake-api'),
    ];
    
    $community_project_args = [
        'label'                 => __('Project', 'vibemake-api'),
        'description'           => __('AI-powered creative projects showcase', 'vibemake-api'),
        'labels'                => $community_project_labels,
        'supports'              => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'author', 'revisions'],
        'taxonomies'            => ['community_type'],
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 7,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'community-projects',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'communityProject',
        'graphql_plural_name'   => 'communityProjects',
    ];
    
    register_post_type('community_project', $community_project_args);
}

// Register all custom taxonomies
add_action('init', 'vibemake_register_taxonomies', 0);
function vibemake_register_taxonomies() {
    
    // Project Category Taxonomy (for AI Projects) - DEPRECATED
    /* Commented out - AI Projects have been merged into unified Projects
    $project_category_labels = [
        'name'                       => _x('Project Categories', 'Taxonomy General Name', 'vibemake-api'),
        'singular_name'              => _x('Project Category', 'Taxonomy Singular Name', 'vibemake-api'),
        'menu_name'                  => __('Categories', 'vibemake-api'),
        'all_items'                  => __('All Categories', 'vibemake-api'),
        'parent_item'                => __('Parent Category', 'vibemake-api'),
        'parent_item_colon'          => __('Parent Category:', 'vibemake-api'),
        'new_item_name'              => __('New Category Name', 'vibemake-api'),
        'add_new_item'               => __('Add New Category', 'vibemake-api'),
        'edit_item'                  => __('Edit Category', 'vibemake-api'),
        'update_item'                => __('Update Category', 'vibemake-api'),
        'view_item'                  => __('View Category', 'vibemake-api'),
        'separate_items_with_commas' => __('Separate categories with commas', 'vibemake-api'),
        'add_or_remove_items'        => __('Add or remove categories', 'vibemake-api'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake-api'),
        'popular_items'              => __('Popular Categories', 'vibemake-api'),
        'search_items'               => __('Search Categories', 'vibemake-api'),
        'not_found'                  => __('Not Found', 'vibemake-api'),
        'no_terms'                   => __('No categories', 'vibemake-api'),
        'items_list'                 => __('Categories list', 'vibemake-api'),
        'items_list_navigation'      => __('Categories list navigation', 'vibemake-api'),
    ];
    
    $project_category_args = [
        'labels'                     => $project_category_labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'rest_base'                  => 'project-categories',
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'projectCategory',
        'graphql_plural_name'        => 'projectCategories',
    ];
    
    register_taxonomy('project_category', ['ai_project'], $project_category_args);
    */
    
    // Maker Specialty Taxonomy
    $maker_specialty_labels = [
        'name'                       => _x('Specialties', 'Taxonomy General Name', 'vibemake-api'),
        'singular_name'              => _x('Specialty', 'Taxonomy Singular Name', 'vibemake-api'),
        'menu_name'                  => __('Specialties', 'vibemake-api'),
        'all_items'                  => __('All Specialties', 'vibemake-api'),
        'parent_item'                => __('Parent Specialty', 'vibemake-api'),
        'parent_item_colon'          => __('Parent Specialty:', 'vibemake-api'),
        'new_item_name'              => __('New Specialty Name', 'vibemake-api'),
        'add_new_item'               => __('Add New Specialty', 'vibemake-api'),
        'edit_item'                  => __('Edit Specialty', 'vibemake-api'),
        'update_item'                => __('Update Specialty', 'vibemake-api'),
        'view_item'                  => __('View Specialty', 'vibemake-api'),
        'separate_items_with_commas' => __('Separate specialties with commas', 'vibemake-api'),
        'add_or_remove_items'        => __('Add or remove specialties', 'vibemake-api'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake-api'),
        'popular_items'              => __('Popular Specialties', 'vibemake-api'),
        'search_items'               => __('Search Specialties', 'vibemake-api'),
        'not_found'                  => __('Not Found', 'vibemake-api'),
        'no_terms'                   => __('No specialties', 'vibemake-api'),
        'items_list'                 => __('Specialties list', 'vibemake-api'),
        'items_list_navigation'      => __('Specialties list navigation', 'vibemake-api'),
    ];
    
    $maker_specialty_args = [
        'labels'                     => $maker_specialty_labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'rest_base'                  => 'maker-specialties',
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'makerSpecialty',
        'graphql_plural_name'        => 'makerSpecialties',
    ];
    
    register_taxonomy('maker_specialty', ['maker'], $maker_specialty_args);
    
    // Project Categories Taxonomy (formerly Community Type)
    $community_type_labels = [
        'name'                       => _x('Project Categories', 'Taxonomy General Name', 'vibemake-api'),
        'singular_name'              => _x('Project Category', 'Taxonomy Singular Name', 'vibemake-api'),
        'menu_name'                  => __('Categories', 'vibemake-api'),
        'all_items'                  => __('All Categories', 'vibemake-api'),
        'parent_item'                => __('Parent Category', 'vibemake-api'),
        'parent_item_colon'          => __('Parent Category:', 'vibemake-api'),
        'new_item_name'              => __('New Category Name', 'vibemake-api'),
        'add_new_item'               => __('Add New Category', 'vibemake-api'),
        'edit_item'                  => __('Edit Category', 'vibemake-api'),
        'update_item'                => __('Update Category', 'vibemake-api'),
        'view_item'                  => __('View Category', 'vibemake-api'),
        'separate_items_with_commas' => __('Separate categories with commas', 'vibemake-api'),
        'add_or_remove_items'        => __('Add or remove categories', 'vibemake-api'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake-api'),
        'popular_items'              => __('Popular Categories', 'vibemake-api'),
        'search_items'               => __('Search Categories', 'vibemake-api'),
        'not_found'                  => __('Not Found', 'vibemake-api'),
        'no_terms'                   => __('No categories', 'vibemake-api'),
        'items_list'                 => __('Categories list', 'vibemake-api'),
        'items_list_navigation'      => __('Categories list navigation', 'vibemake-api'),
    ];
    
    $community_type_args = [
        'labels'                     => $community_type_labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'rest_base'                  => 'community-types',
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'communityType',
        'graphql_plural_name'        => 'communityTypes',
    ];
    
    register_taxonomy('community_type', ['community_project'], $community_type_args);
    
    // News Category Taxonomy (for posts)
    $news_category_labels = [
        'name'                       => _x('News Categories', 'Taxonomy General Name', 'vibemake-api'),
        'singular_name'              => _x('News Category', 'Taxonomy Singular Name', 'vibemake-api'),
        'menu_name'                  => __('News Categories', 'vibemake-api'),
        'all_items'                  => __('All News Categories', 'vibemake-api'),
        'parent_item'                => __('Parent News Category', 'vibemake-api'),
        'parent_item_colon'          => __('Parent News Category:', 'vibemake-api'),
        'new_item_name'              => __('New News Category Name', 'vibemake-api'),
        'add_new_item'               => __('Add New News Category', 'vibemake-api'),
        'edit_item'                  => __('Edit News Category', 'vibemake-api'),
        'update_item'                => __('Update News Category', 'vibemake-api'),
        'view_item'                  => __('View News Category', 'vibemake-api'),
        'separate_items_with_commas' => __('Separate news categories with commas', 'vibemake-api'),
        'add_or_remove_items'        => __('Add or remove news categories', 'vibemake-api'),
        'choose_from_most_used'      => __('Choose from the most used', 'vibemake-api'),
        'popular_items'              => __('Popular News Categories', 'vibemake-api'),
        'search_items'               => __('Search News Categories', 'vibemake-api'),
        'not_found'                  => __('Not Found', 'vibemake-api'),
        'no_terms'                   => __('No news categories', 'vibemake-api'),
        'items_list'                 => __('News Categories list', 'vibemake-api'),
        'items_list_navigation'      => __('News Categories list navigation', 'vibemake-api'),
    ];
    
    $news_category_args = [
        'labels'                     => $news_category_labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'rest_base'                  => 'news-categories',
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'newsCategory',
        'graphql_plural_name'        => 'newsCategories',
    ];
    
    register_taxonomy('news_category', ['post'], $news_category_args);
}

// Add custom columns to admin for better management
add_filter('manage_ai_project_posts_columns', 'vibemake_ai_project_columns');
function vibemake_ai_project_columns($columns) {
    $new_columns = [];
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['project_author'] = __('Project Author', 'vibemake-api');
    $new_columns['project_year'] = __('Year', 'vibemake-api');
    $new_columns['categories'] = __('Categories', 'vibemake-api');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}

add_action('manage_ai_project_posts_custom_column', 'vibemake_ai_project_column_content', 10, 2);
function vibemake_ai_project_column_content($column, $post_id) {
    switch ($column) {
        case 'project_author':
            echo esc_html(get_field('project_author', $post_id) ?: '—');
            break;
        case 'project_year':
            echo esc_html(get_field('project_year', $post_id) ?: '—');
            break;
    }
}

// Add custom columns for Makers
add_filter('manage_maker_posts_columns', 'vibemake_maker_columns');
function vibemake_maker_columns($columns) {
    $new_columns = [];
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['location'] = __('Location', 'vibemake-api');
    $new_columns['availability'] = __('Availability', 'vibemake-api');
    $new_columns['specialties'] = __('Specialties', 'vibemake-api');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}

add_action('manage_maker_posts_custom_column', 'vibemake_maker_column_content', 10, 2);
function vibemake_maker_column_content($column, $post_id) {
    switch ($column) {
        case 'location':
            echo esc_html(get_field('maker_location', $post_id) ?: '—');
            break;
        case 'availability':
            $availability = get_field('maker_availability', $post_id);
            $status_colors = [
                'available' => 'green',
                'selective' => 'orange',
                'unavailable' => 'red',
                'open-source-only' => 'blue',
            ];
            $color = $status_colors[$availability] ?? 'gray';
            echo '<span style="color: ' . $color . ';">●</span> ' . esc_html($availability ?: '—');
            break;
    }
}