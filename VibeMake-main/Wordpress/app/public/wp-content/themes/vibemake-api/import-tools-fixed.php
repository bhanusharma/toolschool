<?php
/**
 * Fixed AI Tools Import - Handles path issues
 * Access at: http://vibemake.local/wp-content/themes/vibemake-api/import-tools-fixed.php
 */

// Load WordPress - we're already in WordPress context
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

// Check if user is logged in
if (!is_user_logged_in() || !current_user_can('manage_options')) {
    wp_redirect(admin_url());
    exit;
}

// Get current user
$current_user = wp_get_current_user();

// Define all tools data inline to avoid path issues
$tools_data = [
    [
        'title' => 'Stability AI',
        'content' => 'Stability AI is the open-source leader revolutionizing generative AI with Stable Diffusion models. Creator of SD 3.5 Medium, SDXL Turbo, and Stable Video Diffusion, they champion accessible AI for everyone. Despite financial challenges, they maintain 300M+ downloads and power countless applications. Features include ultra-fast generation, commercial licensing, and extensive model ecosystem including audio, video, and 3D capabilities.',
        'excerpt' => 'Open-source AI leader behind Stable Diffusion, democratizing image, video, and audio generation for millions.',
        'tagline' => 'Activating humanity\'s potential through open-source generative AI',
        'website' => 'https://stability.ai',
        'use_cases' => ['images', 'video', 'audio', 'design'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Video & Animation', 'Open Source'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free for personal use, Commercial licenses from $20/month, Enterprise custom'
    ],
    [
        'title' => 'Eleven Labs',
        'content' => 'Eleven Labs is the world\'s leading AI voice synthesis platform, creating the most realistic and versatile AI voices. Valued at $3 billion with their Turbo v3 model, they offer instant voice cloning, 32 languages, emotional control, and enterprise-grade APIs. Used by major publishers, game studios, and content creators, processing billions of characters monthly. Features AI dubbing, voice design studio, and conversational AI agents.',
        'excerpt' => 'Premier AI voice synthesis platform offering ultra-realistic voice cloning, multilingual support, and emotional speech control.',
        'tagline' => 'The most realistic AI voices - Transform content with lifelike speech',
        'website' => 'https://elevenlabs.io',
        'use_cases' => ['audio', 'video', 'business', 'education'],
        'difficulty' => 'beginner',
        'categories' => ['AI & Machine Learning', 'Audio & Music', 'Content Creation'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free 10K chars/month, Starter $5/month, Creator $22/month, Enterprise custom'
    ],
    [
        'title' => 'Leonardo AI',
        'content' => 'Leonardo AI is the professional-grade AI image generation platform trusted by 30 million creators. Featuring the groundbreaking Phoenix model with unmatched prompt adherence, it offers complete creative control through Canvas editor, real-time generation, and video animation. Specialized in game assets, concept art, and professional design work. Includes AI-powered editing, upscaling, background removal, and team collaboration features.',
        'excerpt' => 'Professional AI art platform with Phoenix model, offering precision control for game assets, concept art, and creative projects.',
        'tagline' => 'Transform your projects with AI-powered creativity and style',
        'website' => 'https://leonardo.ai',
        'use_cases' => ['images', 'design', 'video', 'business'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Design Tools', 'Game Development'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free 150 tokens daily, Apprentice $10/month, Artisan $24/month, Maestro $48/month'
    ],
    [
        'title' => 'Pika',
        'content' => 'Pika is the AI video generation platform making professional video creation effortless. With Pika 2.0 featuring Scene Ingredients, it offers unprecedented control over cinematography, VFX, and characters. Valued at $500M+, Pika enables creators to generate cinematic videos from text, images, or existing footage. Features include precise camera controls, character consistency, sound effects generation, and real-time editing capabilities.',
        'excerpt' => 'AI-powered video creation platform with Scene Ingredients for cinematic control and professional-quality output.',
        'tagline' => 'Bring your wildest video ideas to life with AI magic',
        'website' => 'https://pika.art',
        'use_cases' => ['video', 'animation', 'business', 'social'],
        'difficulty' => 'beginner',
        'categories' => ['AI & Machine Learning', 'Video & Animation', 'Creative Tools'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free tier available, Standard $10/month, Pro $35/month, Ultra $70/month'
    ],
    [
        'title' => 'Ideogram',
        'content' => 'Ideogram is the AI image generator that finally solved text rendering, making it the go-to choice for designs requiring perfect typography. With Ideogram 2.0, it offers photorealistic quality, magic prompt enhancement, and unmatched text accuracy. Valued at $1 billion, it excels at logos, posters, t-shirt designs, and any visual requiring readable text. Features include style presets, color palettes, and seamless Canvas editing.',
        'excerpt' => 'AI image generation with perfect text rendering, ideal for logos, posters, and designs requiring typography.',
        'tagline' => 'State-of-the-art AI for text and image generation',
        'website' => 'https://ideogram.ai',
        'use_cases' => ['images', 'design', 'business', 'marketing'],
        'difficulty' => 'beginner',
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Design Tools'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free 25 images/month, Basic $7/month, Plus $16/month, Pro $48/month'
    ],
    [
        'title' => 'Flux',
        'content' => 'Flux by Black Forest Labs represents the next generation of image AI, created by the original Stable Diffusion team. With Flux.1 Pro, Dev, and Schnell variants, it delivers unmatched photorealism, prompt adherence, and speed. The 12B parameter model excels at human anatomy, complex compositions, and artistic styles. Integrated into major platforms and offering both API and open-source options.',
        'excerpt' => 'Next-gen image AI from Stable Diffusion creators, offering state-of-the-art quality, speed, and versatility.',
        'tagline' => 'The future of image synthesis - from the creators of Stable Diffusion',
        'website' => 'https://blackforestlabs.ai',
        'use_cases' => ['images', 'design', 'art', 'business'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Open Source'],
        'pricing_model' => 'usage_based',
        'pricing_summary' => 'API: Pro $0.055/image, Dev $0.025/image, Schnell $0.003/image'
    ],
    [
        'title' => 'NotebookLM',
        'content' => 'NotebookLM is Google\'s AI-powered research assistant that transforms how you understand complex information. Powered by Gemini 2.5 Pro, it creates personalized AI experts from your documents. Famous for Audio Overviews that turn any content into engaging podcast-style discussions. Features source-grounded responses, YouTube/audio transcription, collaborative notebooks, and the ability to handle 50 sources with 2M tokens each.',
        'excerpt' => 'Google\'s AI research assistant that turns documents into personalized experts and creates viral podcast-style summaries.',
        'tagline' => 'Your personalized AI research assistant - Think faster with AI grounded in your sources',
        'website' => 'https://notebooklm.google.com',
        'use_cases' => ['education', 'writing', 'business', 'data'],
        'difficulty' => 'beginner',
        'categories' => ['AI & Machine Learning', 'Research & Analysis', 'Education', 'Productivity'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free for all users, NotebookLM Plus with advanced features coming soon'
    ],
    [
        'title' => 'Character AI',
        'content' => 'Character AI is the leading AI companion platform where users create and interact with personalized AI characters. With 20M+ user-created characters and billions of messages daily, it offers emotional support, creative roleplay, language learning, and entertainment. Despite challenges, it maintains massive Gen Z engagement. Features include voice calls, character groups, memory persistence, and the new Character Composer for enhanced creation.',
        'excerpt' => 'Premier AI companion platform for creating and chatting with millions of user-generated AI characters.',
        'tagline' => 'Personalized AI for every moment of your life',
        'website' => 'https://character.ai',
        'use_cases' => ['social', 'education', 'entertainment', 'writing'],
        'difficulty' => 'beginner',
        'categories' => ['AI & Machine Learning', 'Social & Communication', 'Entertainment'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free with limits, Character+ $14.99/month for priority access and features'
    ],
    [
        'title' => 'Replicate',
        'content' => 'Replicate is the cloud platform making AI accessible to every developer. Run open-source models with a simple API, deploy custom models, and scale automatically. Hosting thousands of models from Flux to Llama, SDXL to Whisper. Valued at $500M+, it powers AI features for GitHub, Canva, and thousands of startups. Features one-line deployment, automatic scaling, and pay-per-second billing.',
        'excerpt' => 'Cloud platform for running AI models with simple APIs, hosting thousands of open-source models ready to use.',
        'tagline' => 'Run AI with an API - Machine learning doesn\'t need to be hard',
        'website' => 'https://replicate.com',
        'use_cases' => ['code', 'images', 'video', 'audio', 'business'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Developer Tools', 'Cloud Platform'],
        'pricing_model' => 'usage_based',
        'pricing_summary' => 'Pay-per-second from $0.00025/sec, volume discounts available'
    ],
    [
        'title' => 'Hugging Face',
        'content' => 'Hugging Face is the AI community\'s home, hosting 1M+ models, 300K+ datasets, and 500K+ apps. Valued at $7 billion, it\'s where researchers and developers collaborate on open AI. Features the Transformers library, Spaces for demos, model hosting, and enterprise solutions. Home to Llama, Mistral, Stable Diffusion, and virtually every open model. The GitHub of AI with 20M+ monthly users.',
        'excerpt' => 'The AI community platform hosting millions of models, datasets, and demos - the collaboration hub for open AI.',
        'tagline' => 'The platform where the machine learning community collaborates on models, datasets, and applications',
        'website' => 'https://huggingface.co',
        'use_cases' => ['code', 'education', 'business', 'all'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Open Source', 'Developer Tools', 'Community Platform'],
        'pricing_model' => 'freemium',
        'pricing_summary' => 'Free community tier, Pro $9/month, Enterprise custom pricing'
    ],
    [
        'title' => 'Cohere',
        'content' => 'Cohere is the enterprise AI platform building foundation models for business. With Command R+ for RAG, Embed 3 for semantic search, and Rerank 3 for relevance, it powers AI for Fortune 500 companies. Valued at $6.5 billion, Cohere offers multilingual models supporting 100+ languages, on-premise deployment, and data privacy guarantees. Trusted by Notion, Spotify, Oracle, and thousands of enterprises.',
        'excerpt' => 'Enterprise-focused AI platform with world-class models for search, generation, and understanding at scale.',
        'tagline' => 'Best-in-class AI for enterprise - Build with language AI that understands your business',
        'website' => 'https://cohere.com',
        'use_cases' => ['business', 'code', 'data', 'writing'],
        'difficulty' => 'intermediate',
        'categories' => ['AI & Machine Learning', 'Enterprise', 'Search & Discovery'],
        'pricing_model' => 'usage_based',
        'pricing_summary' => 'Pay-as-you-go API pricing, Enterprise contracts with SLAs available'
    ]
];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import AI Tools - Fixed Version</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f0f0f0;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #0073aa;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            border: none;
            font-size: 16px;
            cursor: pointer;
            margin: 10px 0;
        }
        .button:hover { background: #005a87; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .warning { color: orange; font-weight: bold; }
        .progress {
            margin: 20px 0;
            padding: 20px;
            background: #f0f7ff;
            border-radius: 4px;
            border: 1px solid #b3d9ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Import AI Tools (Fixed Version)</h1>
        <p>Welcome, <?php echo esc_html($current_user->display_name); ?>!</p>
        
        <?php if (!isset($_GET['run'])): ?>
            <h2>Ready to Import</h2>
            <p>This will import the following tools:</p>
            <ul>
                <?php foreach ($tools_data as $tool): ?>
                    <li><?php echo esc_html($tool['title']); ?></li>
                <?php endforeach; ?>
            </ul>
            
            <a href="?run=1" class="button">🎯 Start Import</a>
            <a href="<?php echo admin_url('edit.php?post_type=tool'); ?>" class="button" style="background: #666;">📋 View Current Tools</a>
            
        <?php else: ?>
            <h2>Import Progress</h2>
            <div class="progress">
            <?php
            $success = 0;
            $skipped = 0;
            $failed = 0;
            
            foreach ($tools_data as $tool_data) {
                echo "<p>📥 Importing <strong>{$tool_data['title']}</strong>...</p>";
                
                // Check if already exists
                $existing = get_page_by_title($tool_data['title'], OBJECT, 'tool');
                if ($existing) {
                    echo "<p class='warning'>⚠️ {$tool_data['title']} already exists (ID: {$existing->ID}). Skipping.</p>";
                    $skipped++;
                    continue;
                }
                
                // Create the tool
                $post_data = [
                    'post_title'    => $tool_data['title'],
                    'post_content'  => $tool_data['content'],
                    'post_excerpt'  => $tool_data['excerpt'],
                    'post_status'   => 'publish',
                    'post_type'     => 'tool',
                ];
                
                $post_id = wp_insert_post($post_data);
                
                if (is_wp_error($post_id)) {
                    echo "<p class='error'>❌ Error creating {$tool_data['title']}: " . $post_id->get_error_message() . "</p>";
                    $failed++;
                    continue;
                }
                
                // Set ACF fields
                update_field('tool_tagline', $tool_data['tagline'], $post_id);
                update_field('tool_website', $tool_data['website'], $post_id);
                update_field('tool_featured', true, $post_id);
                update_field('tool_use_cases', $tool_data['use_cases'], $post_id);
                update_field('tool_difficulty', $tool_data['difficulty'], $post_id);
                update_field('tool_pricing_model', $tool_data['pricing_model'], $post_id);
                update_field('tool_pricing_summary', $tool_data['pricing_summary'], $post_id);
                
                // Set taxonomies
                wp_set_post_terms($post_id, $tool_data['categories'], 'tool_category');
                
                echo "<p class='success'>✅ Successfully imported {$tool_data['title']} (ID: $post_id)</p>";
                $success++;
                
                echo "<hr style='margin: 10px 0; border: none; border-top: 1px solid #eee;'>";
                flush();
            }
            ?>
            </div>
            
            <h2>Import Summary</h2>
            <p class="success">✅ Successfully imported: <?php echo $success; ?> tools</p>
            <?php if ($skipped > 0): ?>
                <p class="warning">⚠️ Skipped (already exist): <?php echo $skipped; ?> tools</p>
            <?php endif; ?>
            <?php if ($failed > 0): ?>
                <p class="error">❌ Failed: <?php echo $failed; ?> tools</p>
            <?php endif; ?>
            
            <p style="margin-top: 30px;">
                <a href="<?php echo admin_url('edit.php?post_type=tool'); ?>" class="button">📋 View All Tools</a>
                <a href="?" class="button" style="background: #666;">🔄 Back to Import Page</a>
            </p>
        <?php endif; ?>
    </div>
</body>
</html>