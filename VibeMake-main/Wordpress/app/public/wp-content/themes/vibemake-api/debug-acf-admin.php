<?php
/**
 * ACF Debug Admin Page
 * Add this as a temporary admin page to debug ACF field groups
 */

// Add admin menu item
add_action('admin_menu', function() {
    add_menu_page(
        'ACF Debug',
        'ACF Debug',
        'manage_options',
        'acf-debug',
        'acf_debug_page',
        'dashicons-admin-tools',
        99
    );
});

function acf_debug_page() {
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized');
    }
    
    echo '<div class="wrap">';
    echo '<h1>ACF Field Groups Debug</h1>';
    
    // Check database field groups
    global $wpdb;
    $db_groups = $wpdb->get_results("
        SELECT post_title, post_name, post_content, post_status, ID
        FROM {$wpdb->posts} 
        WHERE post_type = 'acf-field-group'
        ORDER BY post_title
    ");
    
    echo '<h2>Database Field Groups (' . count($db_groups) . ')</h2>';
    echo '<table class="widefat"><thead><tr><th>Title</th><th>Key</th><th>Status</th><th>For Tools?</th><th>Action</th></tr></thead><tbody>';
    
    foreach ($db_groups as $group) {
        $content = maybe_unserialize($group->post_content);
        $location = isset($content['location']) ? $content['location'] : [];
        
        // Check if it's for tools
        $is_for_tools = false;
        foreach ($location as $rules) {
            foreach ($rules as $rule) {
                if (isset($rule['param']) && $rule['param'] === 'post_type' && 
                    isset($rule['value']) && $rule['value'] === 'tool') {
                    $is_for_tools = true;
                    break 2;
                }
            }
        }
        
        echo '<tr>';
        echo '<td>' . esc_html($group->post_title) . '</td>';
        echo '<td>' . esc_html($group->post_name) . '</td>';
        echo '<td>' . esc_html($group->post_status) . '</td>';
        echo '<td>' . ($is_for_tools ? '<strong style="color:red;">YES</strong>' : 'No') . '</td>';
        echo '<td>';
        if ($is_for_tools) {
            $delete_url = wp_nonce_url(
                admin_url('tools.php?page=acf-debug&delete_group=' . $group->ID),
                'delete_acf_group_' . $group->ID
            );
            echo '<a href="' . $delete_url . '" onclick="return confirm(\'Delete this field group?\')" class="button button-small">Delete</a>';
        }
        echo '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';
    
    // Check local field groups
    echo '<h2>Local Field Groups (Code-based)</h2>';
    if (function_exists('acf_get_local_field_groups')) {
        $local_groups = acf_get_local_field_groups();
        echo '<p>Found ' . count($local_groups) . ' local field groups:</p>';
        
        echo '<table class="widefat"><thead><tr><th>Title</th><th>Key</th><th>For Tools?</th></tr></thead><tbody>';
        foreach ($local_groups as $group) {
            $is_for_tools = false;
            foreach ($group['location'] as $rules) {
                foreach ($rules as $rule) {
                    if (isset($rule['param']) && $rule['param'] === 'post_type' && 
                        isset($rule['value']) && $rule['value'] === 'tool') {
                        $is_for_tools = true;
                        break 2;
                    }
                }
            }
            
            echo '<tr>';
            echo '<td>' . esc_html($group['title']) . '</td>';
            echo '<td>' . esc_html($group['key']) . '</td>';
            echo '<td>' . ($is_for_tools ? '<strong style="color:green;">YES</strong>' : 'No') . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    } else {
        echo '<p>ACF not available or acf_get_local_field_groups() not found</p>';
    }
    
    // Check which field groups are active for tool post type
    echo '<h2>Active Field Groups for "tool" Post Type</h2>';
    if (function_exists('acf_get_field_groups')) {
        $tool_groups = acf_get_field_groups(['post_type' => 'tool']);
        echo '<p>Found ' . count($tool_groups) . ' active field groups for tools:</p>';
        
        echo '<table class="widefat"><thead><tr><th>Title</th><th>Key</th><th>Active</th><th>Local</th></tr></thead><tbody>';
        foreach ($tool_groups as $group) {
            echo '<tr>';
            echo '<td>' . esc_html($group['title']) . '</td>';
            echo '<td>' . esc_html($group['key']) . '</td>';
            echo '<td>' . ($group['active'] ? 'Yes' : 'No') . '</td>';
            echo '<td>' . ($group['local'] ? 'Yes' : 'No') . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    } else {
        echo '<p>ACF functions not available</p>';
    }
    
    echo '</div>';
}

// Handle deletion
add_action('admin_init', function() {
    if (isset($_GET['delete_group']) && isset($_GET['_wpnonce'])) {
        $group_id = intval($_GET['delete_group']);
        if (wp_verify_nonce($_GET['_wpnonce'], 'delete_acf_group_' . $group_id)) {
            wp_delete_post($group_id, true);
            
            // Also delete associated fields
            global $wpdb;
            $wpdb->delete($wpdb->posts, ['post_parent' => $group_id]);
            
            wp_redirect(admin_url('tools.php?page=acf-debug&deleted=1'));
            exit;
        }
    }
    
    if (isset($_GET['deleted'])) {
        add_action('admin_notices', function() {
            echo '<div class="notice notice-success"><p>Field group deleted successfully!</p></div>';
        });
    }
});
?>