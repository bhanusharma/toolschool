<?php
/**
 * VibeMake API Theme
 * 
 * This is a headless WordPress theme that redirects all frontend requests
 * to the API or admin panel.
 */

// Redirect all frontend requests to the admin panel
if (!is_admin() && !defined('WP_CLI')) {
    wp_redirect(admin_url());
    exit;
}