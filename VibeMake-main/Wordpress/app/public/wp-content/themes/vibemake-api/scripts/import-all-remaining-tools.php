<?php
/**
 * Import All Remaining AI Tools in One Go
 * Access via: http://vibemake.local/wp-content/themes/vibemake-api/scripts/import-all-remaining-tools.php
 */

// Load WordPress
require_once(__DIR__ . '/../../../wp-load.php');

// Authentication check
if (!is_user_logged_in()) {
    echo "<h3>Please log into WordPress admin first, then visit this page.</h3>";
    echo "<a href='" . admin_url() . "'>Go to WordPress Admin</a>";
    exit;
}

echo "<h1>🚀 Importing All Remaining AI Tools</h1>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px; max-width: 1200px; margin: 0 auto;'>";

// Define all remaining tools data
$tools = [
    [
        'title' => 'GitHub Copilot',
        'content' => 'GitHub Copilot is Microsoft\'s AI pair programmer that revolutionized coding with context-aware suggestions. Powered by OpenAI Codex and GPT-4.5, it integrates seamlessly with VS Code, JetBrains IDEs, Neovim, and GitHub.com. Features Copilot Chat for conversational coding, workspace indexing for full codebase understanding, and enterprise security. Used by 50,000+ organizations and millions of developers, increasing productivity by 55%.',
        'excerpt' => 'Microsoft\'s AI pair programmer offering real-time code suggestions, chat assistance, and deep IDE integration.',
        'tagline' => 'Your AI pair programmer - Code faster with confidence',
        'website' => 'https://github.com/features/copilot',
        'use_cases' => ['code', 'automation', 'education'],
        'categories' => ['AI & Machine Learning', 'Code & Development', 'Productivity'],
        'stats' => [
            'user_count' => 'Millions of developers',
            'organizations' => '50,000+ organizations',
            'productivity_gain' => '55% faster task completion'
        ]
    ],
    [
        'title' => 'Stability AI',
        'content' => 'Stability AI is the open-source leader revolutionizing generative AI with Stable Diffusion models. Creator of SD 3.5 Medium, SDXL Turbo, and Stable Video Diffusion, they champion accessible AI for everyone. Despite financial challenges, they maintain 300M+ downloads and power countless applications. Features include ultra-fast generation, commercial licensing, and extensive model ecosystem including audio, video, and 3D capabilities.',
        'excerpt' => 'Open-source AI leader behind Stable Diffusion, democratizing image, video, and audio generation for millions.',
        'tagline' => 'Activating humanity\'s potential through open-source generative AI',
        'website' => 'https://stability.ai',
        'use_cases' => ['images', 'video', 'audio', 'design'],
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Video & Animation', 'Open Source'],
        'stats' => [
            'downloads' => '300+ million',
            'valuation' => 'Unicorn status',
            'models_released' => '50+ open models'
        ]
    ],
    [
        'title' => 'Eleven Labs',
        'content' => 'Eleven Labs is the world\'s leading AI voice synthesis platform, creating the most realistic and versatile AI voices. Valued at $3 billion with their Turbo v3 model, they offer instant voice cloning, 32 languages, emotional control, and enterprise-grade APIs. Used by major publishers, game studios, and content creators, processing billions of characters monthly. Features AI dubbing, voice design studio, and conversational AI agents.',
        'excerpt' => 'Premier AI voice synthesis platform offering ultra-realistic voice cloning, multilingual support, and emotional speech control.',
        'tagline' => 'The most realistic AI voices - Transform content with lifelike speech',
        'website' => 'https://elevenlabs.io',
        'use_cases' => ['audio', 'video', 'business', 'education'],
        'categories' => ['AI & Machine Learning', 'Audio & Music', 'Content Creation'],
        'stats' => [
            'valuation' => '$3 billion',
            'characters_generated' => '10+ billion monthly',
            'languages' => '32 languages'
        ]
    ],
    [
        'title' => 'Leonardo AI',
        'content' => 'Leonardo AI is the professional-grade AI image generation platform trusted by 30 million creators. Featuring the groundbreaking Phoenix model with unmatched prompt adherence, it offers complete creative control through Canvas editor, real-time generation, and video animation. Specialized in game assets, concept art, and professional design work. Includes AI-powered editing, upscaling, background removal, and team collaboration features.',
        'excerpt' => 'Professional AI art platform with Phoenix model, offering precision control for game assets, concept art, and creative projects.',
        'tagline' => 'Transform your projects with AI-powered creativity and style',
        'website' => 'https://leonardo.ai',
        'use_cases' => ['images', 'design', 'video', 'business'],
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Design Tools', 'Game Development'],
        'stats' => [
            'users' => '30 million creators',
            'images_created' => '1 billion+',
            'daily_generations' => '15 million'
        ]
    ],
    [
        'title' => 'Pika',
        'content' => 'Pika is the AI video generation platform making professional video creation effortless. With Pika 2.0 featuring Scene Ingredients, it offers unprecedented control over cinematography, VFX, and characters. Valued at $500M+, Pika enables creators to generate cinematic videos from text, images, or existing footage. Features include precise camera controls, character consistency, sound effects generation, and real-time editing capabilities.',
        'excerpt' => 'AI-powered video creation platform with Scene Ingredients for cinematic control and professional-quality output.',
        'tagline' => 'Bring your wildest video ideas to life with AI magic',
        'website' => 'https://pika.art',
        'use_cases' => ['video', 'animation', 'business', 'social'],
        'categories' => ['AI & Machine Learning', 'Video & Animation', 'Creative Tools'],
        'stats' => [
            'users' => '5 million+',
            'valuation' => '$500+ million',
            'videos_created' => '50 million+'
        ]
    ],
    [
        'title' => 'Ideogram',
        'content' => 'Ideogram is the AI image generator that finally solved text rendering, making it the go-to choice for designs requiring perfect typography. With Ideogram 2.0, it offers photorealistic quality, magic prompt enhancement, and unmatched text accuracy. Valued at $1 billion, it excels at logos, posters, t-shirt designs, and any visual requiring readable text. Features include style presets, color palettes, and seamless Canvas editing.',
        'excerpt' => 'AI image generation with perfect text rendering, ideal for logos, posters, and designs requiring typography.',
        'tagline' => 'State-of-the-art AI for text and image generation',
        'website' => 'https://ideogram.ai',
        'use_cases' => ['images', 'design', 'business', 'marketing'],
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Design Tools'],
        'stats' => [
            'valuation' => '$1 billion',
            'users' => '10 million+',
            'text_accuracy' => '95%+'
        ]
    ],
    [
        'title' => 'Flux',
        'content' => 'Flux by Black Forest Labs represents the next generation of image AI, created by the original Stable Diffusion team. With Flux.1 Pro, Dev, and Schnell variants, it delivers unmatched photorealism, prompt adherence, and speed. The 12B parameter model excels at human anatomy, complex compositions, and artistic styles. Integrated into major platforms and offering both API and open-source options.',
        'excerpt' => 'Next-gen image AI from Stable Diffusion creators, offering state-of-the-art quality, speed, and versatility.',
        'tagline' => 'The future of image synthesis - from the creators of Stable Diffusion',
        'website' => 'https://blackforestlabs.ai',
        'use_cases' => ['images', 'design', 'art', 'business'],
        'categories' => ['AI & Machine Learning', 'Image Generation', 'Open Source'],
        'stats' => [
            'parameters' => '12 billion',
            'funding' => '$31 million seed',
            'api_requests' => '100M+ monthly'
        ]
    ],
    [
        'title' => 'NotebookLM',
        'content' => 'NotebookLM is Google\'s AI-powered research assistant that transforms how you understand complex information. Powered by Gemini 2.5 Pro, it creates personalized AI experts from your documents. Famous for Audio Overviews that turn any content into engaging podcast-style discussions. Features source-grounded responses, YouTube/audio transcription, collaborative notebooks, and the ability to handle 50 sources with 2M tokens each.',
        'excerpt' => 'Google\'s AI research assistant that turns documents into personalized experts and creates viral podcast-style summaries.',
        'tagline' => 'Your personalized AI research assistant - Think faster with AI grounded in your sources',
        'website' => 'https://notebooklm.google.com',
        'use_cases' => ['education', 'writing', 'business', 'data'],
        'categories' => ['AI & Machine Learning', 'Research & Analysis', 'Education', 'Productivity'],
        'stats' => [
            'users' => '10 million+',
            'audio_overviews' => '100M+ generated',
            'sources_per_notebook' => 'Up to 50'
        ]
    ],
    [
        'title' => 'Character AI',
        'content' => 'Character AI is the leading AI companion platform where users create and interact with personalized AI characters. With 20M+ user-created characters and billions of messages daily, it offers emotional support, creative roleplay, language learning, and entertainment. Despite challenges, it maintains massive Gen Z engagement. Features include voice calls, character groups, memory persistence, and the new Character Composer for enhanced creation.',
        'excerpt' => 'Premier AI companion platform for creating and chatting with millions of user-generated AI characters.',
        'tagline' => 'Personalized AI for every moment of your life',
        'website' => 'https://character.ai',
        'use_cases' => ['social', 'education', 'entertainment', 'writing'],
        'categories' => ['AI & Machine Learning', 'Social & Communication', 'Entertainment'],
        'stats' => [
            'users' => '30 million+',
            'daily_messages' => '1 billion+',
            'characters' => '20 million+'
        ]
    ],
    [
        'title' => 'Replicate',
        'content' => 'Replicate is the cloud platform making AI accessible to every developer. Run open-source models with a simple API, deploy custom models, and scale automatically. Hosting thousands of models from Flux to Llama, SDXL to Whisper. Valued at $500M+, it powers AI features for GitHub, Canva, and thousands of startups. Features one-line deployment, automatic scaling, and pay-per-second billing.',
        'excerpt' => 'Cloud platform for running AI models with simple APIs, hosting thousands of open-source models ready to use.',
        'tagline' => 'Run AI with an API - Machine learning doesn\'t need to be hard',
        'website' => 'https://replicate.com',
        'use_cases' => ['code', 'images', 'video', 'audio', 'business'],
        'categories' => ['AI & Machine Learning', 'Developer Tools', 'Cloud Platform'],
        'stats' => [
            'developers' => '2 million+',
            'models_hosted' => '25,000+',
            'predictions' => '1 billion+ monthly'
        ]
    ],
    [
        'title' => 'Hugging Face',
        'content' => 'Hugging Face is the AI community\'s home, hosting 1M+ models, 300K+ datasets, and 500K+ apps. Valued at $7 billion, it\'s where researchers and developers collaborate on open AI. Features the Transformers library, Spaces for demos, model hosting, and enterprise solutions. Home to Llama, Mistral, Stable Diffusion, and virtually every open model. The GitHub of AI with 20M+ monthly users.',
        'excerpt' => 'The AI community platform hosting millions of models, datasets, and demos - the collaboration hub for open AI.',
        'tagline' => 'The platform where the machine learning community collaborates on models, datasets, and applications',
        'website' => 'https://huggingface.co',
        'use_cases' => ['code', 'education', 'business', 'all'],
        'categories' => ['AI & Machine Learning', 'Open Source', 'Developer Tools', 'Community Platform'],
        'stats' => [
            'valuation' => '$7 billion',
            'monthly_users' => '20 million+',
            'models' => '1 million+'
        ]
    ],
    [
        'title' => 'Cohere',
        'content' => 'Cohere is the enterprise AI platform building foundation models for business. With Command R+ for RAG, Embed 3 for semantic search, and Rerank 3 for relevance, it powers AI for Fortune 500 companies. Valued at $6.5 billion, Cohere offers multilingual models supporting 100+ languages, on-premise deployment, and data privacy guarantees. Trusted by Notion, Spotify, Oracle, and thousands of enterprises.',
        'excerpt' => 'Enterprise-focused AI platform with world-class models for search, generation, and understanding at scale.',
        'tagline' => 'Best-in-class AI for enterprise - Build with language AI that understands your business',
        'website' => 'https://cohere.com',
        'use_cases' => ['business', 'code', 'data', 'writing'],
        'categories' => ['AI & Machine Learning', 'Enterprise', 'Search & Discovery'],
        'stats' => [
            'valuation' => '$6.5 billion',
            'enterprises' => '10,000+',
            'languages' => '100+'
        ]
    ]
];

$imported = 0;
$skipped = 0;
$failed = 0;

foreach ($tools as $tool_data) {
    echo "<h3>📥 Importing {$tool_data['title']}...</h3>";
    
    // Check if already exists
    $existing = get_page_by_title($tool_data['title'], OBJECT, 'tool');
    if ($existing) {
        echo "<p style='color: orange;'>⚠️ {$tool_data['title']} already exists. Skipping.</p>";
        $skipped++;
        continue;
    }
    
    // Create the tool post
    $post_data = [
        'post_title'    => $tool_data['title'],
        'post_content'  => $tool_data['content'],
        'post_excerpt'  => $tool_data['excerpt'],
        'post_status'   => 'publish',
        'post_type'     => 'tool',
    ];
    
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        echo "<p style='color: red;'>❌ Error creating {$tool_data['title']}: " . $post_id->get_error_message() . "</p>";
        $failed++;
        continue;
    }
    
    // Set ACF fields
    update_field('tool_tagline', $tool_data['tagline'], $post_id);
    update_field('tool_website', $tool_data['website'], $post_id);
    update_field('tool_featured', true, $post_id);
    update_field('tool_use_cases', $tool_data['use_cases'], $post_id);
    update_field('tool_difficulty', 'intermediate', $post_id);
    
    // Set basic stats
    $stats_array = [];
    foreach ($tool_data['stats'] as $key => $value) {
        $stats_array[$key] = $value;
    }
    update_field('tool_stats', $stats_array, $post_id);
    
    // Set taxonomies
    wp_set_post_terms($post_id, $tool_data['categories'], 'tool_category');
    
    echo "<p style='color: green;'>✅ Successfully imported {$tool_data['title']} (ID: $post_id)</p>";
    $imported++;
}

echo "</div>";

echo "<h2 style='text-align: center; margin-top: 40px;'>📊 Import Summary</h2>";
echo "<div style='text-align: center; font-size: 18px;'>";
echo "<p>✅ Imported: <strong>$imported tools</strong></p>";
if ($skipped > 0) {
    echo "<p>⚠️ Skipped (already exist): <strong>$skipped tools</strong></p>";
}
if ($failed > 0) {
    echo "<p>❌ Failed: <strong>$failed tools</strong></p>";
}
echo "</div>";

if ($imported > 0) {
    echo "<h2 style='color: green; text-align: center;'>🎉 Import Successful!</h2>";
}

echo "<p style='text-align: center; margin-top: 30px;'>";
echo "<a href='" . admin_url('edit.php?post_type=tool') . "' style='background: #0073aa; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>View All Tools in Admin</a>";
echo "</p>";
?>