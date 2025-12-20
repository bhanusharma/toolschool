<?php
/**
 * Plugin Name: VibeMake Core
 * Plugin URI: https://vibemake.com
 * Description: Core functionality for VibeMake website including sample content and data management.
 * Version: 1.0.0
 * Author: VibeMake Team
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('VIBEMAKE_CORE_VERSION', '1.0.0');
define('VIBEMAKE_CORE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('VIBEMAKE_CORE_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main VibeMake Core Class
 */
class VibeMakeCore {
    
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('wp_ajax_vibemake_create_sample_content', [$this, 'create_sample_content']);
        add_action('wp_ajax_vibemake_import_media', [$this, 'import_sample_media']);
    }

    public function init() {
        // Initialize sample content creation if needed
        if (get_option('vibemake_sample_content_created') !== '1') {
            // Show admin notice
            add_action('admin_notices', [$this, 'show_setup_notice']);
        }
    }

    public function add_admin_menu() {
        add_submenu_page(
            'tools.php',
            'VibeMake Setup',
            'VibeMake Setup',
            'manage_options',
            'vibemake-setup',
            [$this, 'admin_page']
        );
    }

    public function show_setup_notice() {
        echo '<div class="notice notice-info">
            <p><strong>VibeMake Setup:</strong> 
            <a href="' . admin_url('tools.php?page=vibemake-setup') . '">Create sample content</a> to get started with your VibeMake site.
            </p>
        </div>';
    }

    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>VibeMake Setup</h1>
            <div id="vibemake-setup-container">
                <h2>Sample Content Creation</h2>
                <p>This will create sample content for your VibeMake site including:</p>
                <ul>
                    <li>AI Projects (Hero content)</li>
                    <li>Makers profiles</li>
                    <li>News articles</li>
                    <li>Community projects</li>
                    <li>Taxonomy terms</li>
                </ul>
                
                <button id="create-sample-content" class="button button-primary">Create Sample Content</button>
                <button id="import-media" class="button">Import Sample Media</button>
                
                <div id="setup-progress" style="display:none;">
                    <h3>Setup Progress:</h3>
                    <div id="progress-log"></div>
                </div>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('#create-sample-content').click(function() {
                var button = $(this);
                button.prop('disabled', true).text('Creating...');
                $('#setup-progress').show();
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'vibemake_create_sample_content',
                        nonce: '<?php echo wp_create_nonce('vibemake_setup'); ?>'
                    },
                    success: function(response) {
                        $('#progress-log').html('<p style="color: green;">✓ Sample content created successfully!</p>');
                        button.text('Sample Content Created');
                    },
                    error: function() {
                        $('#progress-log').html('<p style="color: red;">✗ Error creating sample content</p>');
                        button.prop('disabled', false).text('Create Sample Content');
                    }
                });
            });

            $('#import-media').click(function() {
                var button = $(this);
                button.prop('disabled', true).text('Importing...');
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'vibemake_import_media',
                        nonce: '<?php echo wp_create_nonce('vibemake_setup'); ?>'
                    },
                    success: function(response) {
                        $('#progress-log').append('<p style="color: green;">✓ Sample media imported!</p>');
                        button.text('Media Imported');
                    },
                    error: function() {
                        $('#progress-log').append('<p style="color: red;">✗ Error importing media</p>');
                        button.prop('disabled', false).text('Import Sample Media');
                    }
                });
            });
        });
        </script>
        <?php
    }

    public function create_sample_content() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'vibemake_setup')) {
            wp_die('Security check failed');
        }

        // Create taxonomy terms first
        $this->create_taxonomy_terms();
        
        // Create AI Projects
        $this->create_ai_projects();
        
        // Create Makers
        $this->create_makers();
        
        // Create News Articles
        $this->create_news_articles();
        
        // Create Community Projects
        $this->create_community_projects();
        
        // Mark as completed
        update_option('vibemake_sample_content_created', '1');
        
        wp_send_json_success('Sample content created successfully!');
    }

    private function create_taxonomy_terms() {
        // Project Categories
        $project_categories = ['AI Art', 'Machine Learning', 'Generative AI', 'Interactive Design'];
        foreach ($project_categories as $cat) {
            wp_insert_term($cat, 'project_category');
        }

        // Maker Specialties
        $specialties = ['MUSIC', 'GENERATIVE ART', 'FASHION', 'IMAGE GENERATION', 'BOTANICAL'];
        foreach ($specialties as $specialty) {
            wp_insert_term($specialty, 'maker_specialty');
        }

        // Community Types
        $community_types = ['websites', 'images', 'videos', 'music'];
        foreach ($community_types as $type) {
            wp_insert_term($type, 'community_type');
        }

        // News Categories
        $news_categories = ['TRENDING', 'NEW RELEASE', 'IMAGE GENERATION', 'ANIMATION'];
        foreach ($news_categories as $cat) {
            wp_insert_term($cat, 'news_category');
        }
    }

    private function create_ai_projects() {
        // Hero Project
        $hero_project = wp_insert_post([
            'post_title' => 'The Impossible Garden',
            'post_content' => 'An immersive AI-generated art installation that explores the intersection of nature and technology through machine learning algorithms.',
            'post_status' => 'publish',
            'post_type' => 'ai_project',
            'meta_input' => [
                'project_year' => '2024',
                'project_author' => 'Hanna Inaiáh',
                'project_url' => 'https://impossible-garden.com',
                '_is_hero_project' => true
            ]
        ]);

        // Set project category
        wp_set_object_terms($hero_project, 'AI Art', 'project_category');
    }

    private function create_makers() {
        $makers_data = [
            [
                'name' => 'Holly Herndon',
                'location' => 'Berlin, Germany',
                'bio' => 'Blending massive datasets, sensory design, and neural networks, she crafts immersive paintings that transform memory, nature and architecture.',
                'specialties' => ['MUSIC', 'GENERATIVE ART']
            ],
            [
                'name' => 'Hanna Inaiáh',
                'location' => 'Rio de janeiro, BRAZIL',
                'bio' => 'Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture.',
                'specialties' => ['FASHION', 'IMAGE GENERATION']
            ],
            [
                'name' => 'Anna Ridler',
                'location' => 'London, United Kingdom',
                'bio' => 'Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture.',
                'specialties' => ['IMAGE GENERATION']
            ],
            [
                'name' => 'Refik Anadol',
                'location' => 'Istambul, turkey',
                'bio' => 'Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture.',
                'specialties' => ['GENERATIVE ART']
            ],
            [
                'name' => 'Sofia Crespo',
                'location' => 'LISBON, PORTUGAL',
                'bio' => 'Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture.',
                'specialties' => ['BOTANICAL', 'IMAGE GENERATION']
            ]
        ];

        foreach ($makers_data as $maker) {
            $maker_id = wp_insert_post([
                'post_title' => $maker['name'],
                'post_content' => $maker['bio'],
                'post_status' => 'publish',
                'post_type' => 'maker',
                'meta_input' => [
                    'maker_location' => $maker['location'],
                    'maker_bio' => $maker['bio']
                ]
            ]);

            // Set specialties
            wp_set_object_terms($maker_id, $maker['specialties'], 'maker_specialty');
        }
    }

    private function create_news_articles() {
        $articles_data = [
            [
                'title' => 'Sudowrite 3.0: AI-Driven Plot Twists',
                'category' => 'TRENDING',
                'date' => '13 MAY, 2025',
                'content' => 'The latest version of Sudowrite introduces revolutionary AI-powered storytelling capabilities that help writers craft compelling narratives.'
            ],
            [
                'title' => 'An Immersive Introduction to Flow TV',
                'category' => 'NEW RELEASE',
                'date' => '13 MAY, 2025',
                'content' => 'Flow TV launches with an innovative approach to streaming content using AI-generated personalized experiences.'
            ],
            [
                'title' => 'Midjourney v6: Photorealism at Your Fingertips',
                'category' => 'IMAGE GENERATION',
                'date' => '13 MAY, 2025',
                'content' => 'The newest version of Midjourney achieves unprecedented levels of photorealistic image generation.'
            ],
            [
                'title' => 'Runway Gen-4: Video Magic Unleashed',
                'category' => 'TRENDING',
                'date' => '13 MAY, 2025',
                'content' => 'Runway\'s fourth generation video AI model brings Hollywood-quality effects to everyone.'
            ],
            [
                'title' => 'Toonify Pro: Cartoon-Style Animation from Photos',
                'category' => 'ANIMATION',
                'date' => '13 MAY, 2025',
                'content' => 'Transform any photo into professional cartoon-style animations with this new AI tool.'
            ]
        ];

        foreach ($articles_data as $article) {
            $post_id = wp_insert_post([
                'post_title' => $article['title'],
                'post_content' => $article['content'],
                'post_status' => 'publish',
                'post_type' => 'post',
                'meta_input' => [
                    'article_category_badge' => $article['category'],
                    'publication_date_override' => $article['date'],
                    'featured_priority' => rand(1, 10)
                ]
            ]);

            // Set news category
            wp_set_object_terms($post_id, $article['category'], 'news_category');
        }
    }

    private function create_community_projects() {
        $projects_data = [
            // Websites
            ['name' => 'POPPI', 'type' => 'websites', 'category' => 'FOOD & DRINK'],
            ['name' => 'OFF LIMITS', 'type' => 'websites', 'category' => 'FOOD & DRINK'],
            ['name' => 'SHAZ & KIKS', 'type' => 'websites', 'category' => 'SKINCARE'],
            ['name' => 'UPWEST', 'type' => 'websites', 'category' => 'FASHION'],
            ['name' => 'WILD DOSE', 'type' => 'websites', 'category' => 'HEALTH'],
            
            // Music
            [
                'name' => 'BOURBON SERENADE FOR VANISHED AFFECTION',
                'type' => 'music',
                'duration' => '2:39',
                'genre' => 'Rock',
                'tool' => 'KLINGAI.COM',
                'views' => 2466
            ],
            [
                'name' => 'BEAT OF REBELLION BY MRDJ',
                'type' => 'music',
                'duration' => '2:11',
                'genre' => 'Celtic',
                'tool' => 'AIVA',
                'views' => 1996
            ],
            [
                'name' => 'THE JOURNEY OF ENLIGHTENMENT BY TIMOTHE',
                'type' => 'music',
                'duration' => '2:11',
                'genre' => 'Samba',
                'tool' => 'BOOMY',
                'views' => 1996
            ]
        ];

        foreach ($projects_data as $project) {
            $project_id = wp_insert_post([
                'post_title' => $project['name'],
                'post_content' => 'A creative project showcasing AI-generated content.',
                'post_status' => 'publish',
                'post_type' => 'community_project',
                'meta_input' => [
                    'project_views' => $project['views'] ?? rand(100, 3000),
                    'duration' => $project['duration'] ?? '',
                    'genre' => $project['genre'] ?? $project['category'] ?? '',
                    'project_tools' => $project['tool'] ?? 'Various AI Tools'
                ]
            ]);

            // Set community type
            wp_set_object_terms($project_id, $project['type'], 'community_type');
        }
    }

    public function import_sample_media() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'vibemake_setup')) {
            wp_die('Security check failed');
        }

        // Create placeholder images for now
        // In a real implementation, you would download actual images
        $this->create_placeholder_media();
        
        wp_send_json_success('Sample media imported successfully!');
    }

    private function create_placeholder_media() {
        // Create placeholder image entries in media library
        $placeholder_images = [
            'hero-background.jpg' => 'Hero Background Image',
            'maker-profile-1.jpg' => 'Holly Herndon Profile',
            'maker-background-1.jpg' => 'Holly Herndon Background',
            'news-featured-1.jpg' => 'Featured News Image 1',
            'community-project-1.jpg' => 'Community Project Image 1'
        ];

        foreach ($placeholder_images as $filename => $title) {
            // This would typically download and import actual images
            // For now, we're just creating the structure
            wp_insert_post([
                'post_title' => $title,
                'post_type' => 'attachment',
                'post_mime_type' => 'image/jpeg',
                'post_status' => 'inherit'
            ]);
        }
    }
}

// Initialize the plugin
new VibeMakeCore();

/**
 * Activation Hook
 */
register_activation_hook(__FILE__, function() {
    // Set up any necessary database tables or options
    add_option('vibemake_sample_content_created', '0');
});

/**
 * Deactivation Hook
 */
register_deactivation_hook(__FILE__, function() {
    // Clean up if necessary
});