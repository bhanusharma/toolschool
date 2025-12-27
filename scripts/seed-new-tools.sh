#!/bin/bash
# Seed New Tools SQL Statements
# Run with: bash scripts/seed-new-tools.sh
#
# Category IDs:
# writing: 2, building: 4, video: 5, audio: 6, 3d: 8
# image: 9, automation: 10, chatbots: 11, marketing: 12, data: 13

echo "🌱 Seeding new tools to production database..."

# =====================================================
# DATA CATEGORY (ID: 13) - Currently 0 tools
# =====================================================
echo ""
echo "📊 Adding Data tools..."

# Julius AI - Data analysis
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Julius AI', 'julius-ai', 'AI-powered data analysis and visualization', 'Analyze data, create visualizations, and get insights using natural language. No coding required.', 'https://julius.ai', 'freemium', 'Free / \$20/month', 'beginner', 0, 13, datetime(\"now\"), datetime(\"now\"));"

# Equals - Spreadsheet AI
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Equals', 'equals', 'Next-generation spreadsheet with built-in AI', 'Modern spreadsheet that combines the familiarity of Excel with AI-powered analysis and automation.', 'https://equals.com', 'paid', '\$49/month', 'intermediate', 0, 13, datetime(\"now\"), datetime(\"now\"));"

# Obviously AI - ML without code
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Obviously AI', 'obviously-ai', 'Build ML models without writing code', 'Turn your data into predictions in minutes. No data science experience needed.', 'https://obviously.ai', 'freemium', 'Free / \$75/month', 'beginner', 0, 13, datetime(\"now\"), datetime(\"now\"));"

# Akkio - Predictive AI
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Akkio', 'akkio', 'No-code AI for business predictions', 'Build and deploy predictive AI models to forecast sales, prevent churn, and optimize operations.', 'https://akkio.com', 'freemium', 'Free / \$50/month', 'beginner', 0, 13, datetime(\"now\"), datetime(\"now\"));"

# Hex - Collaborative analytics
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Hex', 'hex', 'Collaborative analytics workspace with AI', 'Write queries, build models, and create dashboards in a single collaborative workspace.', 'https://hex.tech', 'freemium', 'Free / \$28/month', 'intermediate', 0, 13, datetime(\"now\"), datetime(\"now\"));"

# =====================================================
# AUTOMATION CATEGORY (ID: 10) - Currently 1 tool
# =====================================================
echo ""
echo "⚡ Adding Automation tools..."

# Make (Integromat)
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Make', 'make', 'Visual automation platform for workflows', 'Design, build, and automate workflows visually. Connect apps and services without code.', 'https://make.com', 'freemium', 'Free / \$9/month', 'intermediate', 0, 10, datetime(\"now\"), datetime(\"now\"));"

# n8n - Open source automation
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('n8n', 'n8n', 'Fair-code workflow automation platform', 'Build complex automations 10x faster with AI assistance. Self-hosted or cloud.', 'https://n8n.io', 'freemium', 'Free / \$20/month', 'intermediate', 0, 10, datetime(\"now\"), datetime(\"now\"));"

# Bardeen - Browser automation
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Bardeen', 'bardeen', 'AI automation for browser tasks', 'Automate repetitive browser tasks with AI. No code required, works in any web app.', 'https://bardeen.ai', 'freemium', 'Free / \$10/month', 'beginner', 0, 10, datetime(\"now\"), datetime(\"now\"));"

# Relay - AI-first automation
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Relay', 'relay', 'AI-first workflow automation', 'Human-in-the-loop automation that combines AI decisions with human oversight.', 'https://relay.app', 'freemium', 'Free / \$15/month', 'beginner', 0, 10, datetime(\"now\"), datetime(\"now\"));"

# Activepieces - Open source alternative
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Activepieces', 'activepieces', 'Open source no-code business automation', 'Build automated workflows with a simple drag-and-drop interface. Self-hosted option available.', 'https://activepieces.com', 'freemium', 'Free / \$10/month', 'beginner', 0, 10, datetime(\"now\"), datetime(\"now\"));"

# =====================================================
# MARKETING CATEGORY (ID: 12) - Currently 3 tools
# =====================================================
echo ""
echo "📈 Adding Marketing tools..."

# Jasper - AI content platform
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Jasper', 'jasper', 'AI copilot for enterprise marketing teams', 'Create on-brand content faster with AI trained on your brand voice and style guide.', 'https://jasper.ai', 'paid', '\$39/month', 'beginner', 0, 12, datetime(\"now\"), datetime(\"now\"));"

# Copy.ai - Marketing copy
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Copy.ai', 'copy-ai', 'AI-powered copywriting for marketing', 'Generate high-converting marketing copy, emails, and social posts in seconds.', 'https://copy.ai', 'freemium', 'Free / \$36/month', 'beginner', 0, 12, datetime(\"now\"), datetime(\"now\"));"

# Surfer SEO - Content optimization
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Surfer SEO', 'surfer-seo', 'AI-powered SEO content optimization', 'Write and optimize content that ranks. Get real-time SEO suggestions as you write.', 'https://surferseo.com', 'paid', '\$69/month', 'intermediate', 0, 12, datetime(\"now\"), datetime(\"now\"));"

# Clearscope - Content intelligence
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Clearscope', 'clearscope', 'AI content optimization for SEO', 'Create content that drives organic traffic with AI-powered keyword recommendations.', 'https://clearscope.io', 'paid', '\$170/month', 'intermediate', 0, 12, datetime(\"now\"), datetime(\"now\"));"

# Writesonic - AI writer
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Writesonic', 'writesonic', 'AI writer for marketing and SEO content', 'Create SEO-optimized blog posts, ads, and marketing content with AI.', 'https://writesonic.com', 'freemium', 'Free / \$16/month', 'beginner', 0, 12, datetime(\"now\"), datetime(\"now\"));"

# =====================================================
# 3D CATEGORY (ID: 8) - Currently 2 tools
# =====================================================
echo ""
echo "🎨 Adding 3D tools..."

# Luma AI - 3D capture
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Luma AI', 'luma-ai', 'Capture 3D scenes with your phone', 'Create photorealistic 3D models and environments from video using neural radiance fields.', 'https://lumalabs.ai', 'freemium', 'Free / \$30/month', 'beginner', 0, 8, datetime(\"now\"), datetime(\"now\"));"

# Kaedim - Image to 3D
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Kaedim', 'kaedim', 'Turn 2D images into 3D models', 'Generate production-ready 3D models from images. Perfect for games and e-commerce.', 'https://kaedim3d.com', 'paid', '\$149/month', 'intermediate', 0, 8, datetime(\"now\"), datetime(\"now\"));"

# CSM AI - 3D from images
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('CSM AI', 'csm-ai', 'Generate 3D assets from single images', 'Create game-ready 3D models from photos or AI-generated images in minutes.', 'https://csm.ai', 'freemium', 'Free / \$20/month', 'intermediate', 0, 8, datetime(\"now\"), datetime(\"now\"));"

# Tripo AI - Fast 3D generation
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Tripo AI', 'tripo-ai', 'Fast AI 3D model generation', 'Generate detailed 3D models from text or images in seconds. Export to popular formats.', 'https://tripo3d.ai', 'freemium', 'Free / \$15/month', 'beginner', 0, 8, datetime(\"now\"), datetime(\"now\"));"

# =====================================================
# WRITING CATEGORY (ID: 2) - Currently 4 tools
# =====================================================
echo ""
echo "✍️ Adding Writing tools..."

# Grammarly
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Grammarly', 'grammarly', 'AI writing assistant for better communication', 'Improve your writing with AI-powered grammar checking, tone detection, and clarity suggestions.', 'https://grammarly.com', 'freemium', 'Free / \$12/month', 'beginner', 0, 2, datetime(\"now\"), datetime(\"now\"));"

# Sudowrite - Fiction writing
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Sudowrite', 'sudowrite', 'AI writing partner for fiction authors', 'Write novels and stories faster with AI that understands narrative, characters, and pacing.', 'https://sudowrite.com', 'paid', '\$10/month', 'intermediate', 0, 2, datetime(\"now\"), datetime(\"now\"));"

# Wordtune - Rewrite assistant
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Wordtune', 'wordtune', 'AI rewriting and editing assistant', 'Rewrite sentences to be clearer, more engaging, or match a specific tone.', 'https://wordtune.com', 'freemium', 'Free / \$10/month', 'beginner', 0, 2, datetime(\"now\"), datetime(\"now\"));"

# =====================================================
# CHATBOTS CATEGORY (ID: 11) - Currently 7 tools
# =====================================================
echo ""
echo "🤖 Adding Chatbot tools..."

# Pi - Personal AI
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Pi', 'pi', 'Personal AI assistant by Inflection', 'A supportive and curious AI companion for conversation, advice, and learning.', 'https://pi.ai', 'free', 'Free', 'beginner', 0, 11, datetime(\"now\"), datetime(\"now\"));"

# Poe - AI chat aggregator
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Poe', 'poe', 'Access multiple AI chatbots in one place', 'Chat with GPT-4, Claude, Gemini, and more from a single app. Create custom bots.', 'https://poe.com', 'freemium', 'Free / \$20/month', 'beginner', 0, 11, datetime(\"now\"), datetime(\"now\"));"

# Grok - xAI chatbot
npx wrangler d1 execute toolschool-db --remote --command "INSERT INTO tools (title, slug, tagline, excerpt, website, pricing_model, pricing_summary, difficulty, featured, tool_category_id, created_at, updated_at) VALUES ('Grok', 'grok', 'AI chatbot by xAI with real-time knowledge', 'Access real-time information and witty conversation from xAIs advanced language model.', 'https://x.ai', 'paid', 'X Premium \$8/month', 'beginner', 0, 11, datetime(\"now\"), datetime(\"now\"));"

echo ""
echo "✅ Seed complete! Run 'curl https://toolschool.com/api/tools' to verify."
