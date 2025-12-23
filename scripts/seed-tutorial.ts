import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedTutorial() {
  const payload = await getPayload({ config })

  console.log('Seeding AI Second Brain tutorial...')

  // Check if tutorial already exists
  const existing = await payload.find({
    collection: 'tutorials',
    where: { slug: { equals: 'ai-second-brain' } },
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
  title: 'Build Your AI Second Brain in 45 Minutes',
  subtitle: 'Create a system that captures your ideas, processes them with AI, and organizes everything automatically.',
  slug: 'ai-second-brain',
  status: 'published',
  featured: true,
  difficulty: 'beginner',
  estimatedTime: 45,
  category: 'workflow-automation',
  excerpt: 'Learn to build a personal knowledge system that uses AI to automatically summarize, tag, and organize your notes. Works with Notion or Airtable, Claude or ChatGPT, and Zapier or Make.',
  toolStack: [
    {
      role: 'Knowledge Base',
      primaryTool: 'Notion',
      alternativeTool: 'Airtable',
    },
    {
      role: 'AI Reasoning',
      primaryTool: 'Claude',
      alternativeTool: 'ChatGPT',
    },
    {
      role: 'Automation',
      primaryTool: 'Zapier',
      alternativeTool: 'Make',
    },
  ],
  prerequisites: [
    { item: 'Free Notion account (or Airtable)' },
    { item: 'Free Zapier account (or Make)' },
    { item: 'Anthropic Console account with API credits (or OpenAI account)' },
    { item: 'About 45 minutes of focused time' },
  ],
  introduction: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Ever had a brilliant idea in the shower, only to forget it 10 minutes later? Or saved a bunch of articles you'll \"read later\" but never do? You're not alone." }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "In this tutorial, you'll build a " },
            { type: 'text', text: 'personal AI second brain', bold: true },
            { type: 'text', text: " — a system that captures your ideas, processes them with AI, and organizes them automatically so nothing falls through the cracks." }
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
            { type: 'text', text: 'By the end of this tutorial, you\'ll have a working automation that:' }
          ]
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            { type: 'listitem', children: [{ type: 'text', text: 'Watches your knowledge base for new entries' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Sends each entry to AI for processing' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Automatically generates a summary, relevant tags, and action items' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Updates your knowledge base with the AI output' }] },
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'The result: You add a messy note → AI turns it into an organized, actionable entry. No manual work required.' }
          ]
        },
      ]
    }
  },
  steps: [
    {
      stepNumber: 1,
      title: 'Set Up Your Knowledge Base',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'First, we need a place to store your notes. We\'ll use Notion, but the same principles apply to Airtable or any database tool.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Create Your Database' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Open Notion and create a new page' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add a full-page database (type /database and select "Database - Full page")' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Name it "Second Brain" or "Knowledge Base"' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add These Fields' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Your database needs these properties:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Content', bold: true }, { type: 'text', text: ' (Text) — Your raw thought or note' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Source', bold: true }, { type: 'text', text: ' (Select) — Where it came from: "Manual", "Email", "Voice", "Article"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Summary', bold: true }, { type: 'text', text: ' (Text) — AI will fill this in' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Tags', bold: true }, { type: 'text', text: ' (Multi-select) — AI will add relevant tags' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Action Items', bold: true }, { type: 'text', text: ' (Text) — AI will extract any tasks' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Processed', bold: true }, { type: 'text', text: ' (Checkbox) — Tracks if AI has processed it' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Test It' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Add one sample entry to test later. In the Content field, paste something like:' }
              ]
            },
            {
              type: 'code',
              children: [
                { type: 'text', text: 'Had a meeting with the design team about the new landing page. They want to use more illustrations. I need to find a freelance illustrator and get quotes by Friday. Also should update the brand guidelines document.' }
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Leave the Summary, Tags, Action Items, and Processed fields empty — AI will fill those in.' }
              ]
            },
          ]
        }
      },
      tip: 'Create a "Quick Add" template in Notion with Source pre-filled as "Manual" so you can capture ideas faster.',
      alternativeLabel: 'Using Airtable Instead',
      alternativeContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If you prefer Airtable:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Create a new base called "Second Brain"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add a table with the same fields as above' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Use "Single line text" for Content, Summary, and Action Items' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Use "Single select" for Source and "Multiple select" for Tags' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Use "Checkbox" for Processed' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'The Zapier setup in the next steps works identically with Airtable.' }
              ]
            },
          ]
        }
      }
    },
    {
      stepNumber: 2,
      title: 'Connect Your Automation Tool',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Now we\'ll set up Zapier to watch your Notion database and trigger the AI processing.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Create Your Zap' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to zapier.com and log in (or create a free account)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Create Zap" or "Make a Zap"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Search for "Notion" as your trigger app' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select "New Data Source Item" as the trigger event' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Connect Notion' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Sign in to Notion"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'In the popup, select your workspace' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'IMPORTANT: Click "Select pages" and choose your Second Brain database' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Allow access"' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Configure the Trigger' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Select your "Second Brain" database' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Test trigger"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'You should see your test entry from Step 1' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If the test succeeds, you\'re ready to add the AI step!' }
              ]
            },
          ]
        }
      },
      warning: 'Make sure you grant Zapier access specifically to your Second Brain database. If you skip this, the trigger won\'t find your data.',
      alternativeLabel: 'Using Make Instead',
      alternativeContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If you prefer Make (formerly Integromat):' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Create a new scenario' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add Notion module: "Watch Database Items"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Connect your Notion account and select your database' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Set it to watch for new items' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Make\'s visual builder works similarly to Zapier, just with a drag-and-drop interface.' }
              ]
            },
          ]
        }
      }
    },
    {
      stepNumber: 3,
      title: 'Add AI Processing',
      estimatedMinutes: 15,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'This is where the magic happens. We\'ll connect Claude to analyze your notes and generate structured output.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Set Up Your Anthropic Account' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Before connecting to Zapier, you need API access:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Go to console.anthropic.com and sign in (or create an account)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'New accounts start on the "Evaluation" plan — go to Settings → Plans and select "Build"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add credits ($5 minimum). Tip: You may be eligible for $5 free credits by verifying your phone number' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click the key icon in the left navigation to access API Keys' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "+ Create Key", name it "Zapier Second Brain", and copy the key immediately (you won\'t see it again!)' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add Claude to Your Zap' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'In Zapier, click the + to add an action' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Search for "Anthropic (Claude)"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Send Message" as the action' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Click "Sign in to Anthropic" and paste your API key' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Configure the Prompt' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'In the "User Message" field, enter this prompt (and insert your Notion content field):' }
              ]
            },
            {
              type: 'code',
              children: [
                { type: 'text', text: `Analyze this note and provide structured output:

NOTE:
{{Content from Notion}}

Respond in EXACTLY this format (no other text):

SUMMARY: [1-2 sentence summary of the main point]

TAGS: [3-5 relevant single-word tags, comma-separated]

ACTION ITEMS: [Any tasks or to-dos mentioned, semicolon-separated. If none, write "None"]` }
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Click the + button in the prompt field to insert your Notion "Content" field where it says {{Content from Notion}}.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Set Advanced Options' }]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Model:', bold: true }, { type: 'text', text: ' claude-haiku-4-5 (fast and affordable)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Max Tokens:', bold: true }, { type: 'text', text: ' 500 (keeps responses concise)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Temperature:', bold: true }, { type: 'text', text: ' 0.3 (more consistent output)' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Click "Test action" to see Claude process your sample note.' }
              ]
            },
          ]
        }
      },
      tip: 'Claude Haiku 4.5 is extremely affordable at $1 per million input tokens. Processing 1,000 short notes costs just a few cents.',
      alternativeLabel: 'Using ChatGPT Instead',
      alternativeContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'If you prefer ChatGPT/OpenAI:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Get an API key from platform.openai.com' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add $5+ in credits to enable API access' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'In Zapier, search for "ChatGPT" or "OpenAI"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Conversation" as the action (this is the recommended option)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Use the same prompt as above' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select a model from the dropdown (gpt-4o-mini offers good price/performance)' }] },
              ]
            },
          ]
        }
      }
    },
    {
      stepNumber: 4,
      title: 'Update Your Knowledge Base',
      estimatedMinutes: 10,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Now we need to take Claude\'s response and write it back to Notion. This requires a bit of text parsing.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add a Formatter Step (Optional but Recommended)' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Before updating Notion, let\'s parse Claude\'s response into separate fields:' }
              ]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Add a new action: "Formatter by Zapier"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select "Text" → "Split Text"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Input: Claude\'s response' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Separator: Use [:newline:][:newline:] for double line breaks (Zapier requires this special syntax for whitespace)' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'This gives you separate outputs for Summary, Tags, and Action Items.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Add the Notion Update Action' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Add action: "Notion" → "Update Data Source Item"' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Select your Second Brain database' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Database Item: Select the item from your trigger' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Map the Fields' }]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Summary:', bold: true }, { type: 'text', text: ' Map the parsed SUMMARY section (or full Claude response if not parsing)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Tags:', bold: true }, { type: 'text', text: ' Map the TAGS section' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Action Items:', bold: true }, { type: 'text', text: ' Map the ACTION ITEMS section' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Processed:', bold: true }, { type: 'text', text: ' Set to "True" or checked' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Click "Test action" to verify the update works.' }
              ]
            },
          ]
        }
      },
      tip: 'If you skip the Formatter step, you can paste Claude\'s full response into the Summary field. It\'s less clean but works.',
      warning: 'IMPORTANT: Notion multi-select fields require options to exist before Zapier can add them. Either pre-create common tags (productivity, ideas, tasks, etc.) in your database, OR use a regular text field for Tags instead of multi-select. This is a common gotcha that breaks automations!',
    },
    {
      stepNumber: 5,
      title: 'Test End-to-End',
      estimatedMinutes: 5,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Time to see your AI Second Brain in action!' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Turn On Your Zap' }]
            },
            {
              type: 'list',
              listType: 'number',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'In Zapier, click "Publish" or toggle your Zap on' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Go to your Notion Second Brain database' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Add a new entry with some raw content' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Try this sample note:' }
              ]
            },
            {
              type: 'code',
              children: [
                { type: 'text', text: 'Just finished reading "Atomic Habits" by James Clear. Key insight: focus on systems not goals. I should set up a morning routine that includes 10 min of reading and 5 min of journaling. Need to buy a physical journal this weekend.' }
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Wait and Watch' }]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Zapier checks for new items every 1-15 minutes (depending on your plan)' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Within a few minutes, your entry should update automatically' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Check that Summary, Tags, and Action Items are filled in' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'The Processed checkbox should be checked' }] },
              ]
            },
            {
              type: 'heading',
              tag: 'h4',
              children: [{ type: 'text', text: 'Expected Output' }]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'For the sample above, you should see something like:' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                { type: 'listitem', children: [{ type: 'text', text: 'Summary:', bold: true }, { type: 'text', text: ' Reflections on "Atomic Habits" book emphasizing systems over goals, with plans to implement a morning routine.' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Tags:', bold: true }, { type: 'text', text: ' books, habits, productivity, morning-routine, self-improvement' }] },
                { type: 'listitem', children: [{ type: 'text', text: 'Action Items:', bold: true }, { type: 'text', text: ' Set up morning routine with reading and journaling; Buy a physical journal this weekend' }] },
              ]
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '🎉 Congratulations — you\'ve built your AI Second Brain!' }
              ]
            },
          ]
        }
      },
    },
  ],
  whatYouBuilt: 'You now have a personal knowledge system that automatically processes every note you add. AI summarizes your thoughts, tags them for searchability, and extracts action items so nothing falls through the cracks. Add ideas freely — your second brain handles the organization.',
  nextSteps: [
    {
      title: 'Add More Input Sources',
      description: 'Connect email forwarding, voice memos via transcription, or saved articles to automatically feed your second brain.',
    },
    {
      title: 'Create Views in Notion',
      description: 'Set up filtered views: "Unprocessed" items, "Action Items to Review", items by tag, or a weekly digest view.',
    },
    {
      title: 'Add a Weekly Review Automation',
      description: 'Create a scheduled Zap that sends you a weekly summary of everything you captured.',
    },
    {
      title: 'Expand to Other Workflows',
      description: 'Use the same pattern for meeting notes, customer feedback, or research — any text that needs organizing.',
    },
  ],
}

seedTutorial().catch(console.error)
