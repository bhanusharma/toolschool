<?php
/**
 * Script to update tool content with more substantial information
 * Run with: wp eval-file wp-content/themes/vibemake-api/scripts/update-tool-content.php
 */

// Tool content updates
$tool_updates = [
    'runway-ml' => [
        'content' => '<h2>About Runway ML</h2>
<p>Runway ML is a revolutionary creative toolkit that brings the power of machine learning to artists, designers, and creators. With an intuitive interface and powerful AI models, Runway ML democratizes access to cutting-edge AI technology, making it possible for anyone to create stunning visuals, videos, and interactive experiences.</p>

<h3>Key Capabilities</h3>
<p>Runway ML offers an extensive suite of AI-powered tools:</p>
<ul>
<li><strong>Gen-2 Video Generation</strong> - Create videos from text prompts or images</li>
<li><strong>Image Generation</strong> - Text-to-image with multiple style options</li>
<li><strong>Inpainting & Outpainting</strong> - Seamlessly edit and extend images</li>
<li><strong>Motion Tracking</strong> - Advanced object detection and tracking</li>
<li><strong>Green Screen Removal</strong> - Professional-quality background removal</li>
<li><strong>Style Transfer</strong> - Apply artistic styles to images and videos</li>
<li><strong>3D Texture Generation</strong> - Create textures for 3D models</li>
</ul>

<h3>Professional Features</h3>
<p>Designed for professional workflows, Runway ML includes:</p>
<ul>
<li>Cloud-based processing for resource-intensive tasks</li>
<li>API access for custom integrations</li>
<li>Team collaboration features</li>
<li>Version control and project management</li>
<li>Export to industry-standard formats</li>
<li>Plugin support for popular creative software</li>
</ul>

<h3>Use Cases</h3>
<p>Creators use Runway ML for:</p>
<ul>
<li>Film and video production</li>
<li>Digital art and illustration</li>
<li>Advertising and marketing content</li>
<li>Game development assets</li>
<li>Fashion and product design</li>
<li>Architectural visualization</li>
</ul>',
        'fields' => [
            'tool_stats' => [
                'stat_users' => '10M+',
                'stat_rating' => '4.8',
                'stat_projects' => '50M+',
                'stat_support' => '24/7'
            ]
        ]
    ],
    'midjourney' => [
        'content' => '<h2>About Midjourney</h2>
<p>Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species. Their AI art generator has become one of the most popular tools for creating stunning, dreamlike images from text descriptions.</p>

<h3>The Midjourney Difference</h3>
<p>What sets Midjourney apart is its distinctive artistic style and community-driven approach:</p>
<ul>
<li><strong>Artistic Excellence</strong> - Known for creating highly aesthetic, painterly images</li>
<li><strong>Community First</strong> - Built within Discord for real-time collaboration</li>
<li><strong>Continuous Evolution</strong> - Regular model updates based on user feedback</li>
<li><strong>Prompt Crafting</strong> - Sophisticated prompt syntax for precise control</li>
<li><strong>Style Consistency</strong> - Ability to maintain artistic coherence across generations</li>
</ul>

<h3>Technical Capabilities</h3>
<p>Midjourney excels in various artistic domains:</p>
<ul>
<li>Photorealistic imagery</li>
<li>Fantasy and sci-fi illustrations</li>
<li>Abstract and surreal art</li>
<li>Character design and portraits</li>
<li>Architectural concepts</li>
<li>Logo and brand design</li>
<li>Editorial illustrations</li>
</ul>

<h3>Advanced Features</h3>
<p>Power users leverage these advanced capabilities:</p>
<ul>
<li><strong>Image Prompting</strong> - Use images as part of your prompt</li>
<li><strong>Variation Generation</strong> - Create subtle variations of favorite outputs</li>
<li><strong>Upscaling Options</strong> - Multiple algorithms for image enhancement</li>
<li><strong>Aspect Ratios</strong> - Custom dimensions for any use case</li>
<li><strong>Quality Settings</strong> - Balance between speed and output quality</li>
<li><strong>Style Parameters</strong> - Fine-tune artistic direction</li>
</ul>',
        'fields' => [
            'tool_stats' => [
                'stat_users' => '16M+',
                'stat_rating' => '4.9',
                'stat_projects' => '100M+',
                'stat_support' => 'Community'
            ]
        ]
    ],
    'stable-diffusion' => [
        'content' => '<h2>About Stable Diffusion</h2>
<p>Stable Diffusion is an open-source deep learning model that has revolutionized AI image generation. Developed by Stability AI in collaboration with academic researchers, it represents a breakthrough in making powerful AI art generation accessible to everyone.</p>

<h3>Open Source Revolution</h3>
<p>Unlike proprietary alternatives, Stable Diffusion offers:</p>
<ul>
<li><strong>Complete Freedom</strong> - Run locally on your own hardware</li>
<li><strong>No Censorship</strong> - Full control over content generation</li>
<li><strong>Customization</strong> - Train your own models and styles</li>
<li><strong>Privacy</strong> - All processing happens on your machine</li>
<li><strong>Cost Effective</strong> - No subscription fees or usage limits</li>
</ul>

<h3>Technical Specifications</h3>
<p>Built on cutting-edge diffusion technology:</p>
<ul>
<li>Latent diffusion model architecture</li>
<li>CLIP text encoder for prompt understanding</li>
<li>U-Net for denoising process</li>
<li>VAE for image encoding/decoding</li>
<li>Supports multiple model checkpoints</li>
<li>Compatible with LoRA and other fine-tuning methods</li>
</ul>

<h3>Ecosystem & Tools</h3>
<p>A thriving ecosystem has emerged around Stable Diffusion:</p>
<ul>
<li><strong>AUTOMATIC1111 Web UI</strong> - Feature-rich browser interface</li>
<li><strong>ComfyUI</strong> - Node-based workflow editor</li>
<li><strong>ControlNet</strong> - Precise control over generation</li>
<li><strong>DreamBooth</strong> - Custom model training</li>
<li><strong>Thousands of Models</strong> - Community-trained styles</li>
<li><strong>Extensions</strong> - Endless functionality additions</li>
</ul>',
        'fields' => [
            'tool_stats' => [
                'stat_users' => '10M+',
                'stat_rating' => '4.7',
                'stat_projects' => '200M+',
                'stat_support' => 'Community'
            ]
        ]
    ]
];

// Update each tool
foreach ($tool_updates as $slug => $data) {
    $post = get_page_by_path($slug, OBJECT, 'tool');
    
    if ($post) {
        // Update post content
        $post_data = [
            'ID' => $post->ID,
            'post_content' => $data['content']
        ];
        
        $result = wp_update_post($post_data);
        
        if ($result) {
            echo "Updated content for: {$post->post_title}\n";
            
            // Update ACF fields
            if (isset($data['fields'])) {
                foreach ($data['fields'] as $field => $value) {
                    update_field($field, $value, $post->ID);
                }
                echo "Updated fields for: {$post->post_title}\n";
            }
        }
    } else {
        echo "Tool not found: {$slug}\n";
    }
}

echo "\nTool content update complete!\n";