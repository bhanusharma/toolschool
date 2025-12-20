/**
 * Seed script for ToolSchool News/Posts
 * Run with: npx tsx scripts/seed-news.ts
 *
 * This script creates sample news articles about AI tools and industry trends.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Sample news articles - modeled after VibeMake content
const sampleNews = [
  {
    title: 'OpenAI Launches GPT-5: A New Era of AI Intelligence',
    slug: 'openai-launches-gpt-5-new-era-ai-intelligence',
    excerpt: 'OpenAI has unveiled GPT-5, their most advanced language model yet, featuring unprecedented reasoning capabilities and multimodal understanding.',
    categoryBadge: 'breaking',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'OpenAI has officially released GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model demonstrates remarkable improvements in reasoning, creativity, and understanding complex instructions.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Key improvements include a 10x increase in context window, native multimodal capabilities, and significantly reduced hallucinations. Early testers report the model can now handle complex multi-step tasks with unprecedented accuracy.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'What\'s New in GPT-5' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The model introduces several groundbreaking features that set it apart from its predecessors:' }]
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              { children: [{ text: 'Native vision, audio, and video understanding in a single model' }] },
              { children: [{ text: 'Advanced reasoning with chain-of-thought by default' }] },
              { children: [{ text: 'Real-time web access and tool use' }] },
              { children: [{ text: 'Significantly improved coding and mathematical abilities' }] },
            ]
          },
          {
            type: 'paragraph',
            children: [{ text: 'OpenAI CEO Sam Altman stated that GPT-5 represents "the beginning of truly useful AI assistants that can help with complex real-world tasks."' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Midjourney V7 Introduces Revolutionary 3D Generation',
    slug: 'midjourney-v7-introduces-revolutionary-3d-generation',
    excerpt: 'The latest Midjourney update brings native 3D model generation, allowing creators to turn prompts directly into usable 3D assets.',
    categoryBadge: 'new-release',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Midjourney has announced version 7 of their AI image generator, now featuring groundbreaking 3D model generation capabilities. This update transforms the platform from a 2D image generator into a comprehensive creative tool.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Creators can now generate fully textured 3D models directly from text prompts, export them in standard formats like OBJ and FBX, and use them in professional 3D software like Blender and Unity.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Game-Changing Features' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The 3D generation feature maintains Midjourney\'s signature artistic quality while adding entirely new dimensions to creative workflows. Early users report exceptional detail in organic shapes and architectural elements.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Suno AI Hits 50 Million Users as Music Generation Goes Mainstream',
    slug: 'suno-ai-hits-50-million-users-music-generation-mainstream',
    excerpt: 'The AI music platform celebrates a major milestone as professional musicians increasingly adopt AI-assisted composition tools.',
    categoryBadge: 'trending',
    newsCategory: 'industry-news',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Suno AI has reached 50 million users, marking a pivotal moment for AI-generated music. The platform, which allows anyone to create full songs from text prompts, has gained acceptance from both amateur creators and professional musicians.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Major record labels are now exploring partnerships with Suno to use AI for demo creation and songwriting assistance. This shift represents a dramatic change from the initial skepticism the industry showed toward AI music.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'The Democratization of Music' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'CEO Mikey Shulman emphasized that Suno\'s mission is to democratize music creation: "Everyone has music inside them. We\'re just giving them the tools to express it."' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Anthropic\'s Claude 4 Achieves New Benchmarks in Coding and Research',
    slug: 'anthropic-claude-4-achieves-new-benchmarks-coding-research',
    excerpt: 'Claude 4 sets new records on academic benchmarks while introducing revolutionary agent capabilities for autonomous task completion.',
    categoryBadge: 'breaking',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Anthropic has released Claude 4, their most capable AI model to date, achieving state-of-the-art results on coding, mathematics, and scientific reasoning benchmarks. The model introduces new agent capabilities that allow it to autonomously complete complex multi-step tasks.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Key highlights include a 2 million token context window, native computer use capabilities, and significant improvements in following nuanced instructions. The model demonstrates near-human performance on professional-level exams.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Safety First Approach' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'True to Anthropic\'s mission, Claude 4 includes enhanced safety measures including Constitutional AI 2.0, better refusal of harmful requests, and improved truthfulness. The company continues to lead in responsible AI development.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Runway Gen-4 Revolutionizes Video Production with Real-Time AI',
    slug: 'runway-gen-4-revolutionizes-video-production-real-time-ai',
    excerpt: 'The new Runway model enables professional-quality video generation at unprecedented speeds, transforming filmmaking workflows.',
    categoryBadge: 'new-release',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Runway has unveiled Gen-4, their most advanced video generation model, capable of producing cinema-quality footage in near real-time. The update represents a major leap in AI video capabilities, making previously impossible shots achievable for independent creators.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The model introduces precise camera control, consistent character generation, and 8K output resolution. Hollywood studios are already integrating Gen-4 into their visual effects pipelines.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Democratizing Cinema' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Independent filmmakers report that Gen-4 enables them to achieve visual quality that previously required million-dollar budgets. The barrier between imagination and creation continues to dissolve.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'How AI Art Tools Are Reshaping the Creative Industry in 2025',
    slug: 'how-ai-art-tools-reshaping-creative-industry-2025',
    excerpt: 'A deep dive into how professional artists, designers, and studios are integrating AI tools into their creative workflows.',
    categoryBadge: 'analysis',
    newsCategory: 'industry-news',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'The creative industry has undergone a fundamental transformation in 2025, with AI tools becoming integral to professional workflows across art, design, music, and film. Rather than replacing human creativity, these tools are amplifying it in unexpected ways.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Studios report significant productivity gains, with concept artists using AI to explore more ideas faster, musicians collaborating with AI co-composers, and filmmakers achieving previously impossible visual effects.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'The New Creative Process' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Creative professionals describe a new paradigm where AI handles technical execution while humans focus on vision, curation, and emotional resonance. The most successful creators have learned to use AI as a creative partner rather than a replacement.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Stable Diffusion 4 Brings Local AI Image Generation to New Heights',
    slug: 'stable-diffusion-4-brings-local-ai-image-generation-new-heights',
    excerpt: 'The open-source image model now rivals closed alternatives while running on consumer hardware, empowering privacy-conscious creators.',
    categoryBadge: 'new-release',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Stability AI has released Stable Diffusion 4, their most advanced open-source image generation model. Running locally on consumer GPUs, it now matches or exceeds the quality of cloud-based alternatives while preserving user privacy.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The model introduces native video generation, 3D understanding, and unprecedented prompt following. The open-source community has already begun building innovative applications on top of the new architecture.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Open Source Momentum' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The release demonstrates that open-source AI development continues to advance rapidly. Enterprises are increasingly adopting local AI solutions for sensitive workflows where cloud processing poses privacy concerns.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'ElevenLabs Introduces Perfect Voice Cloning with Just 30 Seconds of Audio',
    slug: 'elevenlabs-introduces-perfect-voice-cloning-30-seconds-audio',
    excerpt: 'The voice AI company pushes the boundaries of what\'s possible with minimal training data while implementing robust consent systems.',
    categoryBadge: 'trending',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'ElevenLabs has announced a breakthrough in voice cloning technology, achieving near-perfect voice replication with just 30 seconds of audio input. The advancement has significant implications for audiobook production, dubbing, and accessibility applications.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The company has simultaneously introduced comprehensive consent and verification systems to prevent misuse. All cloned voices require verified consent from the voice owner, addressing industry concerns about deepfakes.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Accessibility Impact' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Advocates for people with speech disabilities have praised the technology, which allows individuals who have lost their voice to disease to preserve and use synthetic versions of their natural voice.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'The Rise of AI Code Assistants: Cursor, Copilot, and the Future of Programming',
    slug: 'rise-ai-code-assistants-cursor-copilot-future-programming',
    excerpt: 'Examining how AI coding tools are transforming software development and what it means for the future of the programming profession.',
    categoryBadge: 'analysis',
    newsCategory: 'industry-news',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'AI code assistants have become indispensable tools for software developers. Cursor, GitHub Copilot, and similar tools are now used by millions of developers daily, fundamentally changing how code is written.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Studies show developers using AI assistants complete tasks 40-60% faster while maintaining code quality. Rather than replacing programmers, these tools are elevating what individual developers can accomplish.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'The New Developer Experience' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Junior developers report learning faster with AI assistance, while senior developers appreciate off-loading boilerplate code to focus on architecture and complex problem-solving. The skill of prompt engineering has become as important as traditional coding skills.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Google Introduces Gemini Ultra 2: Native Multimodal Reasoning at Scale',
    slug: 'google-introduces-gemini-ultra-2-native-multimodal-reasoning',
    excerpt: 'Google\'s latest AI model sets new standards for understanding and generating across text, images, video, and audio simultaneously.',
    categoryBadge: 'breaking',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Google has unveiled Gemini Ultra 2, a next-generation AI model with seamless multimodal capabilities. The model can reason across text, images, audio, and video in a single unified architecture, enabling new categories of AI applications.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Early demonstrations show the model analyzing complex documents with embedded images, understanding video content in real-time, and generating coordinated multimodal outputs. Integration with Google\'s ecosystem brings these capabilities to billions of users.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Enterprise Applications' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Enterprise customers gain access to advanced document understanding, meeting summarization with visual context, and creative tools that combine multiple modalities. The model represents Google\'s most significant AI release since the original Gemini launch.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Adobe Firefly 3 Seamlessly Integrates AI into Professional Creative Suite',
    slug: 'adobe-firefly-3-seamlessly-integrates-ai-professional-creative-suite',
    excerpt: 'The latest Firefly update embeds powerful generative AI throughout Photoshop, Illustrator, and Premiere Pro for non-destructive creation.',
    categoryBadge: 'new-release',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Adobe has released Firefly 3, deeply integrating AI generation throughout their Creative Cloud applications. The update brings context-aware generation to Photoshop, vector AI to Illustrator, and intelligent editing to Premiere Pro.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Key features include non-destructive AI edits that can be refined or removed, style matching that learns from existing brand assets, and collaborative AI that adapts to team preferences over time.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Commercial Safety' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Adobe emphasizes Firefly\'s commercially safe training data, addressing enterprise concerns about copyright. All generated content comes with IP indemnification, making it suitable for commercial projects at any scale.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'AI Ethics: Industry Leaders Agree on New Standards for Responsible Development',
    slug: 'ai-ethics-industry-leaders-agree-new-standards-responsible-development',
    excerpt: 'Major AI companies commit to shared safety protocols and transparency measures in a landmark industry agreement.',
    categoryBadge: 'policy',
    newsCategory: 'industry-news',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Leading AI companies including OpenAI, Anthropic, Google, and Meta have signed a comprehensive agreement establishing shared standards for responsible AI development. The framework addresses safety testing, transparency, and societal impact assessment.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Key commitments include pre-deployment safety evaluations, watermarking of AI-generated content, and sharing of safety research. The agreement marks the first time major competitors have aligned on concrete ethical standards.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Industry Self-Regulation' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Observers note this proactive approach may influence upcoming government regulations. By establishing their own standards, AI companies demonstrate a commitment to responsible development ahead of legislative requirements.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Tutorial: Building Your First AI Art Portfolio in 2025',
    slug: 'tutorial-building-first-ai-art-portfolio-2025',
    excerpt: 'A step-by-step guide to curating, presenting, and monetizing AI-generated artwork as a professional creator.',
    categoryBadge: 'tutorial',
    newsCategory: 'tutorial',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Creating a professional AI art portfolio requires more than just generating images. This guide covers the complete journey from developing your unique style to presenting work that attracts clients and opportunities.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Step 1: Find Your Voice' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The most successful AI artists develop a recognizable style. Experiment with different tools—Midjourney for artistic imagery, DALL-E for conceptual work, Stable Diffusion for fine control—until you find your unique aesthetic.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Step 2: Curate Ruthlessly' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Quality over quantity. Select only your best work that demonstrates consistency and vision. A focused portfolio of 20 excellent pieces outperforms 200 mediocre ones.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Step 3: Present Professionally' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Create a clean, focused website. Include process documentation showing your creative decisions. Transparency about AI use builds trust with potential clients.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'Pika Labs 2.0 Brings Hollywood-Quality Video Generation to Everyone',
    slug: 'pika-labs-2-0-hollywood-quality-video-generation-everyone',
    excerpt: 'The startup\'s new model produces cinematic quality video with advanced camera controls and seamless scene transitions.',
    categoryBadge: 'new-release',
    newsCategory: 'product-launch',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Pika Labs has released version 2.0 of their AI video platform, introducing capabilities that rival professional production tools. The update features advanced camera movements, consistent character generation, and intelligent scene transitions.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The new model can generate up to 2 minutes of continuous, coherent video—a significant leap from previous 10-second limitations. Users praise the natural motion and cinematic quality of the output.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Creator Economy Impact' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Content creators on YouTube and TikTok are rapidly adopting Pika for B-roll, visual effects, and animated content. The democratization of professional video production continues to accelerate.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'The Complete Guide to Prompt Engineering in 2025',
    slug: 'complete-guide-prompt-engineering-2025',
    excerpt: 'Master the art and science of writing effective prompts for AI image generators, language models, and creative tools.',
    categoryBadge: 'tutorial',
    newsCategory: 'tutorial',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Prompt engineering has evolved from a curiosity to a critical skill for AI creators. This comprehensive guide covers techniques for extracting the best results from today\'s leading AI tools.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Understanding Model Behavior' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Different AI models respond to different prompting strategies. Midjourney favors artistic and emotional language, while DALL-E excels with literal descriptions. Understanding these preferences is key to consistent results.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Structure Your Prompts' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Effective prompts typically include: subject, style, mood, technical specifications, and negative prompts. Order matters—put your most important elements first.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Iterate and Refine' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'The best prompts emerge through iteration. Start broad, identify what works, and progressively refine. Keep a prompt library of successful formulations for future reference.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
  {
    title: 'How Udio Is Changing the Music Industry Forever',
    slug: 'how-udio-is-changing-music-industry-forever',
    excerpt: 'Udio\'s AI music platform has sparked a revolution in how music is created, distributed, and consumed worldwide.',
    categoryBadge: 'analysis',
    newsCategory: 'industry-news',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Udio has emerged as a transformative force in the music industry, enabling anyone to create professional-quality songs from text descriptions. The platform\'s impact extends far beyond hobbyist creation—it\'s reshaping the entire music value chain.' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Independent artists use Udio for rapid prototyping, commercial producers for demo creation, and brands for custom audio content. The barrier between musical imagination and realization has effectively dissolved.' }]
          },
          {
            type: 'heading',
            tag: 2,
            children: [{ text: 'Industry Adaptation' }]
          },
          {
            type: 'paragraph',
            children: [{ text: 'Major labels are adapting rather than resisting. Partnerships between Udio and established music companies suggest a future where AI and human creativity complement each other in new ways.' }]
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
  },
]

async function seedNews() {
  console.log('📰 Starting news seed process...\n')

  const payload = await getPayload({ config })

  // First ensure news categories exist
  console.log('📁 Ensuring news categories exist...')
  const categoryMap: Record<string, string> = {}
  const categories = [
    { title: 'Product Launch', slug: 'product-launch', color: '#e7131a' },
    { title: 'Industry News', slug: 'industry-news', color: '#1a73e8' },
    { title: 'Tutorial', slug: 'tutorial', color: '#34a853' },
    { title: 'Opinion', slug: 'opinion', color: '#9c27b0' },
    { title: 'Research', slug: 'research', color: '#ff5722' },
  ]

  for (const cat of categories) {
    try {
      const existing = await payload.find({
        collection: 'news-categories',
        where: { slug: { equals: cat.slug } },
      })
      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'news-categories',
          data: cat,
        })
        categoryMap[cat.slug] = created.id
        console.log(`  ✅ Created category: ${cat.title}`)
      } else {
        categoryMap[cat.slug] = existing.docs[0].id
        console.log(`  ⏭️  Category exists: ${cat.title}`)
      }
    } catch (error) {
      console.log(`  ❌ Error with category ${cat.title}:`, error)
    }
  }

  // Create news posts
  console.log('\n📝 Creating news posts...')
  let created = 0
  let skipped = 0

  for (const post of sampleNews) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'posts',
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            categoryBadge: post.categoryBadge,
            newsCategory: categoryMap[post.newsCategory] || null,
            content: post.content,
          },
        })
        console.log(`  ✅ Created: ${post.title.substring(0, 50)}...`)
        created++
      } else {
        console.log(`  ⏭️  Exists: ${post.title.substring(0, 50)}...`)
        skipped++
      }
    } catch (error) {
      console.log(`  ❌ Error creating "${post.title.substring(0, 30)}...":`, error)
    }
  }

  console.log(`\n✨ News seed complete!`)
  console.log(`   Created: ${created} posts`)
  console.log(`   Skipped: ${skipped} posts`)
  process.exit(0)
}

seedNews().catch((error) => {
  console.error('News seed failed:', error)
  process.exit(1)
})
