import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedChatbotTutorial() {
  const payload = await getPayload({ config })

  console.log('Seeding AI Chatbot tutorial...')

  // Check if tutorial already exists
  const existing = await payload.find({
    collection: 'tutorials',
    where: { slug: { equals: 'ai-chatbot-website' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Tutorial already exists, updating...')
    await payload.update({
      collection: 'tutorials',
      id: existing.docs[0].id,
      data: tutorialData,
    })
    console.log('Tutorial updated!')
  } else {
    await payload.create({
      collection: 'tutorials',
      data: tutorialData,
    })
    console.log('Tutorial created!')
  }

  process.exit(0)
}

const tutorialData = {
  title: 'Build a Custom AI Chatbot for Your Website',
  subtitle: 'Create an intelligent chatbot trained on your content that answers customer questions 24/7.',
  slug: 'ai-chatbot-website',
  status: 'published',
  featured: true,
  difficulty: 'beginner',
  estimatedTime: 40,
  category: 'ai-agents',
  excerpt: 'Learn to build and deploy a custom AI chatbot for your website. Train it on your documentation, FAQ, or knowledge base. No coding required — embed with a single line of code.',
  toolStack: [
    {
      role: 'Chatbot Platform',
      primaryTool: 'Chatbase',
      alternativeTool: 'Voiceflow',
    },
    {
      role: 'AI Model',
      primaryTool: 'GPT-4',
      alternativeTool: 'Claude 3.5',
    },
    {
      role: 'Data Source',
      primaryTool: 'Website URL',
      alternativeTool: 'PDF/Documents',
    },
  ],
  prerequisites: [
    { item: 'A website where you want to add the chatbot' },
    { item: 'Content to train the bot on (website, docs, FAQ, or PDFs)' },
    { item: 'About 40 minutes of focused time' },
    { item: 'Basic understanding of HTML (just for embedding)' },
  ],
  introduction: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Your customers have questions. You're tired of answering the same ones repeatedly. And hiring 24/7 support isn't in the budget. Sound familiar?" }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "In this tutorial, you'll build a " },
            { type: 'text', text: 'custom AI chatbot', bold: true },
            { type: 'text', text: " trained on YOUR content — your website, documentation, or knowledge base. It answers questions accurately, sounds like your brand, and works while you sleep." }
          ]
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'What You\'ll Build' }]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'By the end of this tutorial, you\'ll have:' }
          ]
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            { type: 'listitem', children: [{ type: 'text', text: 'A working AI chatbot trained on your content' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Custom branding and personality matching your brand voice' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'An embed code ready for your website' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Understanding of how to improve accuracy over time' }] },
          ]
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Chatbot Platform Comparison (2025)' }]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Here are the top no-code chatbot builders:' }
          ]
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            { type: 'listitem', children: [{ type: 'text', text: 'Chatbase:', bold: true }, { type: 'text', text: ' Easiest to use. Free tier with 100 messages/month. Best for small websites and MVPs. $19/mo Hobby plan.' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Voiceflow:', bold: true }, { type: 'text', text: ' More powerful with visual flow builder. Free tier with 100 credits. $60/mo Pro. Best for complex conversation flows.' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Botpress:', bold: true }, { type: 'text', text: ' Developer-friendly with advanced features. Free tier with $5 credit. Best for teams wanting more control.' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'CustomGPT:', bold: true }, { type: 'text', text: ' Enterprise-focused with SOC-2 compliance. $99/mo minimum. Best for security-conscious businesses.' }] },
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'We\'ll use Chatbase in this tutorial because it has the fastest time-to-value and a generous free tier.' }
          ]
        },
      ]
    }
  },
  steps: [
    {
      stepNumber: 1,
      title: 'Create Your Chatbase Account',
      estimatedMinutes: 5,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Let\'s set up Chatbase and understand what you\'re getting.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Sign Up for Chatbase' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to chatbase.co and click "Get Started Free"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Sign up with Google or email' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You\'ll land on the dashboard with "Create New Chatbot"' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Understand the Free Tier' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Chatbase\'s free plan includes:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: '100 message credits per month' }] },
                { type: 'listitem', children: [{ type: 'text', text: '1 chatbot (called an "agent")' }] },
                { type: 'listitem', children: [{ type: 'text', text: '400,000 characters of training data' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Basic customization' }] },
                { type: 'listitem', children: [{ type: 'text', text: '"Powered by Chatbase" branding' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'About Message Credits' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Each AI response uses credits based on the model:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'GPT-4, Claude 3 Opus:', bold: true }, { type: 'text', text: ' 20 credits per response' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'GPT-4 mini:', bold: true }, { type: 'text', text: ' 10 credits per response' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Claude 3.5 Sonnet, Gemini:', bold: true }, { type: 'text', text: ' 1 credit per response' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Pro tip: Claude 3.5 Sonnet offers excellent quality at just 1 credit per response — ideal for high-volume use.' }
              ]
            },
          ]
        }
      },
      tip: 'Start with Claude 3.5 Sonnet as your model. It gives you 100 conversations on the free tier versus just 5 with GPT-4.',
      alternativeLabel: 'Using Voiceflow Instead',
      alternativeContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If you prefer Voiceflow:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to voiceflow.com and sign up' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Create a new "Web Chat" project' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Voiceflow uses a visual flow builder for more complex conversations' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Free tier includes 100 credits and 2 agents' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Voiceflow is better if you need multi-step conversation flows, branching logic, or integration with external systems.' }
              ]
            },
          ]
        }
      }
    },
    {
      stepNumber: 2,
      title: 'Train Your Chatbot on Your Content',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'This is where the magic happens. You\'ll feed your chatbot your content so it can answer questions accurately.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Create Your First Chatbot' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'From the Chatbase dashboard, click "Create New Chatbot"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You\'ll see data source options: Website, Files, Text, Q&A, Notion' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'We\'ll start with Website — the easiest option' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Option A: Train from Website' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Website" as your data source' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Enter your website URL (e.g., https://yoursite.com)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Crawl" — Chatbase will scrape your pages' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Review the discovered pages and deselect any you don\'t want' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Create Chatbot"' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Option B: Train from Documents' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If you have documentation, manuals, or FAQ documents:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Files" as your data source' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Upload PDFs, DOCX, or TXT files' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You can upload multiple files (up to 400K characters on free tier)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Create Chatbot"' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Option C: Add Q&A Pairs' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'For precise control over specific questions:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Q&A" as your data source' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add question-answer pairs manually' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'These get highest priority when matching user questions' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Pro tip: You can combine all three — website + files + Q&A for comprehensive coverage.' }
              ]
            },
          ]
        }
      },
      warning: 'Make sure your training content is accurate and up-to-date. The chatbot will confidently repeat any incorrect information in your source material.',
    },
    {
      stepNumber: 3,
      title: 'Customize Your Chatbot\'s Personality',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'A good chatbot doesn\'t just answer questions — it represents your brand. Let\'s customize its personality and appearance.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Set the Base Prompt (System Instructions)' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Navigate to Settings → AI Model and find "Base Prompt." This controls how your bot behaves. Here\'s a template:' }
              ]
            },
            {
              type: 'code',
              children: [
                { type: 'text', text: `You are a friendly customer support assistant for [Company Name]. Your goal is to help users find information about our products and services.

Guidelines:
- Be helpful, concise, and friendly
- If you don't know something, say so — don't make up information
- Direct users to contact support@company.com for complex issues
- Never discuss competitors or off-topic subjects
- Always offer to help with anything else at the end of your response

Tone: Professional but approachable. Use simple language. Avoid jargon unless the user uses it first.` }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Choose Your AI Model' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'In the same settings panel, select your model:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Claude 3.5 Sonnet:', bold: true }, { type: 'text', text: ' Best value (1 credit). Great for most use cases.' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'GPT-4o mini:', bold: true }, { type: 'text', text: ' Good balance of quality and cost (10 credits).' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'GPT-4:', bold: true }, { type: 'text', text: ' Highest quality but expensive (20 credits). Use for complex topics.' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Customize the Chat Widget' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Go to Settings → Chat Interface to customize appearance:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Theme color:', bold: true }, { type: 'text', text: ' Match your brand colors' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Chat bubble icon:', bold: true }, { type: 'text', text: ' Upload your logo or use default' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Welcome message:', bold: true }, { type: 'text', text: ' First thing users see (e.g., "Hi! How can I help you today?")' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Suggested messages:', bold: true }, { type: 'text', text: ' Pre-written questions users can click' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Position:', bold: true }, { type: 'text', text: ' Bottom-right (default) or bottom-left' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add Suggested Questions' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Add 3-4 starter questions based on your most common queries:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: '"What are your pricing plans?"' }] },
                { type: 'listitem', children: [{ type: 'text', text: '"How do I get started?"' }] },
                { type: 'listitem', children: [{ type: 'text', text: '"What features are included?"' }] },
                { type: 'listitem', children: [{ type: 'text', text: '"How do I contact support?"' }] },
              ]
            },
          ]
        }
      },
      tip: 'Test your chatbot extensively before going live. Ask edge-case questions and questions you DON\'T want it to answer to see how it handles them.',
    },
    {
      stepNumber: 4,
      title: 'Test Your Chatbot',
      estimatedMinutes: 5,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Before embedding on your site, let\'s make sure your chatbot works as expected.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Use the Playground' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Playground" in the left sidebar' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You\'ll see a live chat interface' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Test messages DON\'T count against your credit limit' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Test These Scenarios' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Ask a question your content clearly answers:', bold: true }, { type: 'text', text: ' Verify accuracy' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Ask something NOT in your content:', bold: true }, { type: 'text', text: ' Should admit it doesn\'t know' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Ask something off-topic:', bold: true }, { type: 'text', text: ' Should politely redirect' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Try to get it to say something inappropriate:', bold: true }, { type: 'text', text: ' Should refuse' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Ask the same question in different ways:', bold: true }, { type: 'text', text: ' Should give consistent answers' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Check Response Quality' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Good responses should:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Be accurate based on your source material' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Match the tone you set in the base prompt' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Be concise (not rambling)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Include helpful follow-ups when appropriate' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Refine If Needed' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If responses aren\'t right:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Wrong answers?', bold: true }, { type: 'text', text: ' Add Q&A pairs for those specific questions' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Wrong tone?', bold: true }, { type: 'text', text: ' Adjust your base prompt with more specific guidance' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Missing info?', bold: true }, { type: 'text', text: ' Add more source content or documents' }] },
              ]
            },
          ]
        }
      },
    },
    {
      stepNumber: 5,
      title: 'Embed on Your Website',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Time to go live! Chatbase gives you a simple embed code that works on any website.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Get Your Embed Code' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to Settings → Embed on Website' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You\'ll see a code snippet that looks like this:' }] },
              ]
            },
            {
              type: 'code',
              children: [
                { type: 'text', text: '<script>\n  window.chatbaseConfig = {\n    chatbotId: "your-chatbot-id"\n  }\n</script>\n<script src="https://www.chatbase.co/embed.min.js" defer></script>' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add to Your Website' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Where to paste depends on your platform:' }
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'WordPress:', bold: true }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to Appearance → Theme File Editor' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Open footer.php' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Paste the code before </body>' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Webflow:', bold: true }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to Site Settings → Custom Code' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Paste in the "Footer Code" section' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Publish your site' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Framer:', bold: true }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to Site Settings → General → Custom Code' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add to "End of <body> tag"' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Shopify:', bold: true }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to Online Store → Themes → Edit Code' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Open theme.liquid' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Paste before </body>' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Verify It Works' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Visit your website' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Look for the chat bubble in the bottom corner' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click it and send a test message' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Check the Chatbase dashboard to see the conversation logged' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Congratulations — your AI chatbot is live!' }
              ]
            },
          ]
        }
      },
      warning: 'The embed code will appear on ALL pages where you add it. If you only want the chatbot on specific pages, use conditional logic in your CMS or platform settings.',
    },
  ],
  whatYouBuilt: 'You now have a custom AI chatbot trained on your content, ready to help website visitors 24/7. It answers questions based on your documentation, maintains your brand voice, and frees you from answering the same questions repeatedly. Monitor conversations in the dashboard to identify gaps and improve over time.',
  nextSteps: [
    {
      title: 'Connect Integrations',
      description: 'Chatbase integrates with Slack, Zapier, and webhooks. Get notified when someone asks a question the bot can\'t answer, or log conversations to a CRM.',
    },
    {
      title: 'Add Lead Capture',
      description: 'Configure the chatbot to collect email addresses before answering questions. Great for building your mailing list from curious visitors.',
    },
    {
      title: 'Review Conversation Logs',
      description: 'Check the dashboard regularly to see what people are asking. Add Q&A pairs for commonly missed questions.',
    },
    {
      title: 'Set Up Human Handoff',
      description: 'Configure escalation paths for complex questions. Route to email, live chat, or schedule a call when the bot can\'t help.',
    },
  ],
}

seedChatbotTutorial().catch(console.error)
