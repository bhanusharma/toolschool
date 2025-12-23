-- SEO Data Batch 2: Google Gemini, Stable Diffusion, Notion AI, v0, Bolt, DeepSeek, Leonardo AI
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch2.sql

-- ========================================
-- GOOGLE GEMINI (id=36)
-- ========================================
UPDATE tools SET
  tagline = 'Google''s most capable AI model with multimodal understanding and deep Google integration',
  excerpt = 'Google Gemini is Google''s flagship AI, offering multimodal understanding across text, images, video, and audio. Deeply integrated with Google services, it powers Bard, Google Search, and Workspace features.',
  logo_url = 'https://logo.clearbit.com/google.com',
  pricing_summary = 'Free tier available. Gemini Advanced $20/mo includes 2TB Google One storage.',
  expert_verdict = 'Gemini represents Google''s serious push into AI. The integration with Google services is its killer feature - summarize Gmail threads, analyze Google Docs, get AI in your Google searches. Gemini 1.5 Pro''s 1M token context window is industry-leading. For Google Workspace users, Gemini Advanced is compelling value at $20/mo including 2TB storage. The main weakness is that Gemini still trails ChatGPT and Claude in raw reasoning benchmarks. Best for users deep in the Google ecosystem.',
  verdict_summary = 'Best for Google Workspace users. Deep integration with Google services makes it uniquely valuable.',
  meta_title = 'Google Gemini Review 2025: Advanced Pricing & Features',
  meta_description = 'Google Gemini review with 2025 pricing (free & $20/mo Advanced), features, and comparison to ChatGPT. See why Google''s AI excels for Workspace users.',
  focus_keyword = 'Google Gemini review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.5,
  ratings_features = 4.4,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 36;

UPDATE tools SET stats_users = '300M+', stats_rating = 4.4, stats_company = 'Google', stats_launch_year = 2023 WHERE id = 36;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 36;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 36, 'Free', '$0', 'free', 0, 'Try Gemini', 'https://gemini.google.com'),
(1, 36, 'Advanced', '$20/mo', 'monthly', 1, 'Try Advanced', 'https://one.google.com/about/ai-premium');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Gemini 1.0 Pro model' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Image understanding' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 2, t.id, 'Google services integration' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Gemini 1.5 Pro model' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Advanced';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, '1M token context window' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Advanced';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 2, t.id, 'Gemini in Gmail, Docs, etc.' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Advanced';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 3, t.id, '2TB Google One storage' FROM tools_pricing_tiers t WHERE t._parent_id = 36 AND t.name = 'Advanced';

DELETE FROM tools_pros WHERE _parent_id = 36;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 36, 'Deep Google Integration', 'Works seamlessly with Gmail, Docs, Sheets, Drive, and other Google services.'),
(1, 36, 'Massive Context Window', '1M tokens - can process entire books or codebases in a single conversation.'),
(2, 36, 'Multimodal Capabilities', 'Understands text, images, video, and audio natively.'),
(3, 36, 'Includes Google One Storage', 'Advanced plan includes 2TB cloud storage - great value.');

DELETE FROM tools_cons WHERE _parent_id = 36;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 36, 'Lags in Pure Reasoning', 'ChatGPT and Claude still outperform on complex reasoning benchmarks.'),
(1, 36, 'Less Third-Party Ecosystem', 'Fewer plugins and integrations compared to ChatGPT.');

DELETE FROM tools_best_for WHERE _parent_id = 36;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 36, 'Google Workspace Users', 'Seamless integration with your existing Google tools'),
(1, 36, 'Android Users', 'Built into Android devices and Google Assistant');

DELETE FROM tools_faqs WHERE _parent_id = 36;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 36, 'Is Google Gemini free?', 'Yes, basic Gemini is free. Gemini Advanced costs $20/month and includes 2TB Google One storage.'),
(1, 36, 'Is Gemini better than ChatGPT?', 'Gemini excels at Google integration and has a larger context window. ChatGPT is stronger at reasoning and has a larger ecosystem. Choose based on your needs.'),
(2, 36, 'What is Gemini''s context window?', 'Gemini 1.5 Pro supports 1 million tokens - the largest of any major AI, able to process entire books or codebases.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 36;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 36, 'Gemini vs ChatGPT'), (1, 36, 'Gemini Advanced'), (2, 36, 'Google AI');

-- ========================================
-- STABLE DIFFUSION (id=22)
-- ========================================
UPDATE tools SET
  tagline = 'Open-source AI image generation you can run locally or in the cloud',
  excerpt = 'Stable Diffusion is the leading open-source image generation AI. Run it locally for free with full control, or use cloud services. Powers thousands of apps and offers unmatched customization through LoRAs, ControlNet, and fine-tuning.',
  logo_url = 'https://logo.clearbit.com/stability.ai',
  pricing_summary = 'Free to run locally. Cloud services: DreamStudio $10 for 1000 credits. Various third-party pricing.',
  expert_verdict = 'Stable Diffusion democratized AI image generation by being truly open source. If you have a decent GPU, you can run it for free with no limits and full privacy. The ecosystem of models, LoRAs, and tools like ComfyUI and Automatic1111 is unmatched. SD XL and SD 3 have closed the quality gap with proprietary models. The tradeoff is complexity - it takes effort to set up and optimize. For those willing to learn, Stable Diffusion offers the most power and flexibility. For ease of use, Midjourney or DALL-E are simpler.',
  verdict_summary = 'The power user''s choice for AI images. Unmatched flexibility and zero cost when run locally.',
  meta_title = 'Stable Diffusion Review 2025: Free, Open-Source AI Images',
  meta_description = 'Stable Diffusion review - the open-source AI image generator. Run free locally or via cloud. Compare SD XL vs Midjourney vs DALL-E.',
  focus_keyword = 'Stable Diffusion review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 3.5,
  ratings_value_for_money = 5.0,
  ratings_features = 4.8,
  ratings_support = 3.8,
  price_last_verified = '2025-12-23'
WHERE id = 22;

UPDATE tools SET stats_users = '10M+', stats_rating = 4.5, stats_company = 'Stability AI', stats_launch_year = 2022 WHERE id = 22;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 22;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 22, 'Local (Free)', '$0', 'free', 1, 'Download Models', 'https://stability.ai'),
(1, 22, 'DreamStudio', '$10/1000 credits', 'custom', 0, 'Try DreamStudio', 'https://dreamstudio.ai');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Unlimited generations' FROM tools_pricing_tiers t WHERE t._parent_id = 22 AND t.name = 'Local (Free)';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Full privacy - runs offline' FROM tools_pricing_tiers t WHERE t._parent_id = 22 AND t.name = 'Local (Free)';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 2, t.id, 'Custom models & LoRAs' FROM tools_pricing_tiers t WHERE t._parent_id = 22 AND t.name = 'Local (Free)';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Web interface' FROM tools_pricing_tiers t WHERE t._parent_id = 22 AND t.name = 'DreamStudio';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'No GPU required' FROM tools_pricing_tiers t WHERE t._parent_id = 22 AND t.name = 'DreamStudio';

DELETE FROM tools_pros WHERE _parent_id = 22;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 22, 'Completely Free Locally', 'Run unlimited generations on your own hardware with zero ongoing cost.'),
(1, 22, 'Open Source & Private', 'Full control over your data. No content policies or restrictions.'),
(2, 22, 'Massive Ecosystem', 'Thousands of custom models, LoRAs, and community tools.'),
(3, 22, 'Ultimate Customization', 'Fine-tune models, use ControlNet, train your own styles.');

DELETE FROM tools_cons WHERE _parent_id = 22;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 22, 'Requires Technical Knowledge', 'Setting up local installation has a learning curve.'),
(1, 22, 'Needs Good Hardware', 'Best results require a modern NVIDIA GPU with 8GB+ VRAM.'),
(2, 22, 'Less Polished Than Midjourney', 'Requires more prompt engineering for consistent quality.');

DELETE FROM tools_best_for WHERE _parent_id = 22;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 22, 'Power Users & Tinkerers', 'Maximum control and customization options'),
(1, 22, 'Privacy-Conscious Users', 'Run completely offline with no data sharing'),
(2, 22, 'High-Volume Creators', 'No per-image costs when running locally');

DELETE FROM tools_faqs WHERE _parent_id = 22;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 22, 'Is Stable Diffusion free?', 'Yes, Stable Diffusion is open source and free to run locally. Cloud services like DreamStudio charge per image.'),
(1, 22, 'What GPU do I need for Stable Diffusion?', 'Minimum: NVIDIA GPU with 4GB VRAM. Recommended: 8GB+ VRAM (RTX 3060 or better). Apple M1/M2 Macs also work.'),
(2, 22, 'Is Stable Diffusion better than Midjourney?', 'Midjourney produces more consistent, aesthetic results with less effort. Stable Diffusion offers more control and is free locally. Different tools for different needs.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 22;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 22, 'Stable Diffusion free'), (1, 22, 'SD XL'), (2, 22, 'Stable Diffusion vs Midjourney');

-- ========================================
-- NOTION AI (id=21)
-- ========================================
UPDATE tools SET
  tagline = 'AI writing assistant built into your Notion workspace',
  excerpt = 'Notion AI brings powerful AI capabilities directly into your Notion workspace. Draft documents, summarize notes, brainstorm ideas, translate content, and extract action items - all without leaving your workflow.',
  logo_url = 'https://logo.clearbit.com/notion.so',
  pricing_summary = 'Add-on: $10/member/month on top of your Notion plan. Free trial available.',
  expert_verdict = 'Notion AI is the perfect example of contextual AI done right. Because it lives inside your Notion workspace, it understands your content deeply. Summarizing meeting notes, extracting tasks, improving writing - all happen with one click where you''re already working. At $10/member/month on top of Notion subscription, it''s an additional cost, but the time savings are real for heavy Notion users. If Notion is your second brain, Notion AI is its thinking assistant.',
  verdict_summary = 'Essential add-on for Notion power users. Seamless AI integration where you already work.',
  meta_title = 'Notion AI Review 2025: Pricing, Features & Is It Worth $10/mo?',
  meta_description = 'Notion AI review with pricing ($10/mo add-on), features, and whether it''s worth it. See how AI enhances your Notion workspace.',
  focus_keyword = 'Notion AI review',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.0,
  ratings_features = 4.2,
  ratings_support = 4.4,
  price_last_verified = '2025-12-23'
WHERE id = 21;

UPDATE tools SET stats_users = '30M+', stats_rating = 4.3, stats_company = 'Notion Labs', stats_launch_year = 2023 WHERE id = 21;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 21;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 21, 'Add-on', '$10/user/mo', 'monthly', 1, 'Try Notion AI', 'https://notion.so/product/ai');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Unlimited AI requests' FROM tools_pricing_tiers t WHERE t._parent_id = 21 AND t.name = 'Add-on';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Works in all Notion pages' FROM tools_pricing_tiers t WHERE t._parent_id = 21 AND t.name = 'Add-on';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 2, t.id, 'Q&A across workspace' FROM tools_pricing_tiers t WHERE t._parent_id = 21 AND t.name = 'Add-on';

DELETE FROM tools_pros WHERE _parent_id = 21;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 21, 'Seamless Integration', 'AI lives right in your Notion pages - no context switching.'),
(1, 21, 'Workspace-Aware', 'Can search and synthesize information across your entire Notion workspace.'),
(2, 21, 'One-Click Actions', 'Summarize, translate, improve writing, extract tasks with single clicks.');

DELETE FROM tools_cons WHERE _parent_id = 21;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 21, 'Additional Cost', '$10/user/month on top of Notion subscription adds up for teams.'),
(1, 21, 'Notion-Only', 'Only works within Notion - can''t use elsewhere.');

DELETE FROM tools_best_for WHERE _parent_id = 21;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 21, 'Heavy Notion Users', 'AI assistance right where you work'),
(1, 21, 'Teams Using Notion', 'Shared AI benefits across workspace');

DELETE FROM tools_faqs WHERE _parent_id = 21;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 21, 'How much does Notion AI cost?', 'Notion AI is $10 per member per month, added on top of your existing Notion subscription.'),
(1, 21, 'Is Notion AI worth it?', 'For heavy Notion users, the time saved on summarization, writing, and organization typically justifies the $10/month cost.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 21;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 21, 'Notion AI pricing'), (1, 21, 'Notion AI features');

-- ========================================
-- V0 BY VERCEL (id=6)
-- ========================================
UPDATE tools SET
  tagline = 'Generate React and Next.js UI components from text descriptions',
  excerpt = 'v0 by Vercel generates production-ready React UI components from natural language descriptions. Describe what you want, get shadcn/ui and Tailwind CSS code you can copy directly into your project.',
  logo_url = 'https://logo.clearbit.com/vercel.com',
  pricing_summary = 'Free tier: 200 credits/month. Premium $20/mo: 5000 credits. Team $30/user/mo.',
  expert_verdict = 'v0 has become an essential tool for frontend developers. It doesn''t just generate generic UI code - it produces clean, production-ready React components using shadcn/ui and Tailwind. The output matches modern best practices. For rapid prototyping, building component libraries, or learning modern React patterns, v0 is incredibly useful. Free tier is generous for exploration. Premium at $20/month is worth it for professional frontend work.',
  verdict_summary = 'Best AI tool for React/Next.js UI development. Clean, production-ready component generation.',
  meta_title = 'v0 by Vercel Review 2025: AI UI Generation Pricing & Features',
  meta_description = 'v0 by Vercel review with pricing (free-$30/mo), features, and examples. See how to generate React components with AI.',
  focus_keyword = 'v0 Vercel review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.4,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 6;

UPDATE tools SET stats_users = '1M+', stats_rating = 4.5, stats_company = 'Vercel', stats_launch_year = 2023 WHERE id = 6;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 6;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 6, 'Free', '$0', 'free', 0, 'Try v0 Free', 'https://v0.dev'),
(1, 6, 'Premium', '$20/mo', 'monthly', 1, 'Go Premium', 'https://v0.dev/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '200 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 6 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'shadcn/ui components' FROM tools_pricing_tiers t WHERE t._parent_id = 6 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '5000 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 6 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Private generations' FROM tools_pricing_tiers t WHERE t._parent_id = 6 AND t.name = 'Premium';

DELETE FROM tools_pros WHERE _parent_id = 6;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 6, 'Production-Ready Output', 'Generates clean React code using shadcn/ui and Tailwind CSS.'),
(1, 6, 'Modern Best Practices', 'Code follows current React patterns and accessibility standards.'),
(2, 6, 'Iterative Refinement', 'Chat-based interface to refine and adjust generated components.');

DELETE FROM tools_cons WHERE _parent_id = 6;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 6, 'React/Next.js Only', 'Focused on React ecosystem - not for Vue, Angular, etc.'),
(1, 6, 'Credits Can Run Out', 'Heavy users may need Premium plan.');

DELETE FROM tools_best_for WHERE _parent_id = 6;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 6, 'Frontend Developers', 'Speed up UI development significantly'),
(1, 6, 'Designers Learning React', 'See how designs translate to code');

DELETE FROM tools_faqs WHERE _parent_id = 6;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 6, 'Is v0 free?', 'Yes, v0 offers 200 free credits/month. Premium costs $20/month for 5000 credits.'),
(1, 6, 'What code does v0 generate?', 'v0 generates React components using TypeScript, Tailwind CSS, and shadcn/ui - production-ready code.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 6;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 6, 'v0 dev'), (1, 6, 'AI UI generator'), (2, 6, 'Vercel AI');

-- ========================================
-- BOLT (id=31)
-- ========================================
UPDATE tools SET
  tagline = 'Build full-stack web apps instantly with AI in your browser',
  excerpt = 'Bolt.new lets you build, run, and deploy full-stack web applications entirely in your browser using AI. Describe what you want, and Bolt generates the code, runs the dev server, and deploys your app.',
  logo_url = 'https://logo.clearbit.com/bolt.new',
  pricing_summary = 'Free tier with limited tokens. Pro $20/mo: 10M tokens. Team plans available.',
  expert_verdict = 'Bolt represents a new paradigm in AI-assisted development. Unlike code assistants that help you write code, Bolt writes AND runs the entire application in your browser. No local setup, no deployment hassle. For MVPs, prototypes, and learning, it''s magical. The quality is impressive for generated apps. Limitations: complex apps still need traditional development, and you''re somewhat locked into their ecosystem. But for going from idea to deployed app in minutes, nothing else compares.',
  verdict_summary = 'Revolutionary for rapid prototyping. Go from idea to deployed app in minutes.',
  meta_title = 'Bolt.new Review 2025: AI App Builder Pricing & Features',
  meta_description = 'Bolt.new review with pricing (free-$20/mo), features, and examples. Build full-stack apps with AI in your browser.',
  focus_keyword = 'Bolt new review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.5,
  ratings_features = 4.4,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 31;

UPDATE tools SET stats_users = '500K+', stats_rating = 4.4, stats_company = 'StackBlitz', stats_launch_year = 2024 WHERE id = 31;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 31;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 31, 'Free', '$0', 'free', 0, 'Start Building', 'https://bolt.new'),
(1, 31, 'Pro', '$20/mo', 'monthly', 1, 'Go Pro', 'https://bolt.new');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Limited free tokens' FROM tools_pricing_tiers t WHERE t._parent_id = 31 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Full-stack app generation' FROM tools_pricing_tiers t WHERE t._parent_id = 31 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '10M tokens/month' FROM tools_pricing_tiers t WHERE t._parent_id = 31 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'One-click deploy' FROM tools_pricing_tiers t WHERE t._parent_id = 31 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 31;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 31, 'Zero Setup Required', 'Build and run full apps in browser - no local environment needed.'),
(1, 31, 'Instant Deployment', 'Deploy your app with one click directly from Bolt.'),
(2, 31, 'Full-Stack Capable', 'Generates both frontend and backend code.');

DELETE FROM tools_cons WHERE _parent_id = 31;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 31, 'Limited for Complex Apps', 'Best for MVPs and prototypes, not enterprise apps.'),
(1, 31, 'Platform Lock-In', 'Apps are tied to Bolt''s ecosystem.');

DELETE FROM tools_best_for WHERE _parent_id = 31;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 31, 'Rapid Prototypers', 'Fastest way to validate ideas'),
(1, 31, 'Non-Developers', 'Build apps without coding knowledge');

DELETE FROM tools_faqs WHERE _parent_id = 31;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 31, 'Is Bolt.new free?', 'Yes, Bolt offers a free tier with limited tokens. Pro costs $20/month for 10M tokens.'),
(1, 31, 'What can I build with Bolt?', 'Full-stack web apps including React/Vue frontends and Node.js backends. Great for MVPs and prototypes.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 31;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 31, 'bolt.new'), (1, 31, 'AI app builder'), (2, 31, 'no-code AI');

-- ========================================
-- DEEPSEEK (id=35)
-- ========================================
UPDATE tools SET
  tagline = 'Powerful open-source AI models rivaling GPT-4 at a fraction of the cost',
  excerpt = 'DeepSeek offers high-performance AI models that rival GPT-4 on benchmarks at dramatically lower costs. Their open-source models can be run locally, and their API is one of the most affordable in the industry.',
  logo_url = 'https://logo.clearbit.com/deepseek.com',
  pricing_summary = 'Chat: Free. API: $0.14/M input, $0.28/M output tokens (vs GPT-4''s $30/M). Open-source models free to download.',
  expert_verdict = 'DeepSeek is the disruptor the AI industry needed. Their models genuinely compete with GPT-4 on benchmarks while costing 100x less via API. The open-source releases mean you can run these locally for free. For developers and businesses building AI applications, DeepSeek offers incredible value. The chat interface is clean and capable. Main concerns are around data privacy (China-based company) and less polish than OpenAI. But for pure capability per dollar, DeepSeek is unmatched.',
  verdict_summary = 'Best value in AI. GPT-4-class performance at 1% of the cost.',
  meta_title = 'DeepSeek Review 2025: Pricing, Models & vs GPT-4',
  meta_description = 'DeepSeek review with pricing (100x cheaper than GPT-4), open-source models, and benchmarks. See why developers are switching to DeepSeek.',
  focus_keyword = 'DeepSeek review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 5.0,
  ratings_features = 4.3,
  ratings_support = 3.8,
  price_last_verified = '2025-12-23'
WHERE id = 35;

UPDATE tools SET stats_users = '5M+', stats_rating = 4.4, stats_company = 'DeepSeek', stats_launch_year = 2023 WHERE id = 35;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 35;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 35, 'Chat', '$0', 'free', 0, 'Try DeepSeek Chat', 'https://chat.deepseek.com'),
(1, 35, 'API', '$0.14/M tokens', 'custom', 1, 'Get API Access', 'https://platform.deepseek.com');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, 'Free chat interface' FROM tools_pricing_tiers t WHERE t._parent_id = 35 AND t.name = 'Chat';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'DeepSeek V3 model' FROM tools_pricing_tiers t WHERE t._parent_id = 35 AND t.name = 'Chat';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '100x cheaper than GPT-4' FROM tools_pricing_tiers t WHERE t._parent_id = 35 AND t.name = 'API';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'OpenAI-compatible API' FROM tools_pricing_tiers t WHERE t._parent_id = 35 AND t.name = 'API';

DELETE FROM tools_pros WHERE _parent_id = 35;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 35, 'Incredibly Affordable', 'API pricing is ~100x cheaper than GPT-4 for comparable quality.'),
(1, 35, 'Strong Performance', 'Competes with GPT-4 on major benchmarks.'),
(2, 35, 'Open Source Models', 'Download and run locally for free with full control.');

DELETE FROM tools_cons WHERE _parent_id = 35;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 35, 'Privacy Concerns', 'China-based company - consider data sensitivity.'),
(1, 35, 'Less Ecosystem', 'Fewer integrations and tools compared to OpenAI.');

DELETE FROM tools_best_for WHERE _parent_id = 35;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 35, 'Developers on Budget', 'Massive API cost savings'),
(1, 35, 'Open Source Enthusiasts', 'Full models available to download');

DELETE FROM tools_faqs WHERE _parent_id = 35;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 35, 'Is DeepSeek free?', 'Chat is free. API costs ~$0.14/M tokens - about 100x cheaper than GPT-4. Models can be downloaded free for local use.'),
(1, 35, 'Is DeepSeek as good as GPT-4?', 'DeepSeek V3 competes closely with GPT-4 on benchmarks. For most tasks, the quality is comparable at a fraction of the cost.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 35;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 35, 'DeepSeek vs GPT-4'), (1, 35, 'DeepSeek API'), (2, 35, 'cheap AI API');

-- ========================================
-- LEONARDO AI (id=15)
-- ========================================
UPDATE tools SET
  tagline = 'AI image generation with training capabilities for games and creative assets',
  excerpt = 'Leonardo AI specializes in AI image generation for games, concept art, and digital assets. Features include custom model training, real-time canvas editing, and a community of trained models for specific styles.',
  logo_url = 'https://logo.clearbit.com/leonardo.ai',
  pricing_summary = 'Free: 150 tokens/day. Apprentice $12/mo. Artisan $30/mo. Maestro $60/mo.',
  expert_verdict = 'Leonardo has carved out a strong niche in game asset and concept art generation. The ability to train custom models on your own art style is powerful for studios and creators. The real-time canvas and image editing features add practical utility beyond just generation. Pricing is competitive, and the free tier is useful for experimentation. Quality rivals Midjourney for certain styles, especially game art. Best for game developers, concept artists, and those wanting consistent stylized output.',
  verdict_summary = 'Excellent for game assets and concept art. Custom model training sets it apart.',
  meta_title = 'Leonardo AI Review 2025: Pricing, Training & Game Art',
  meta_description = 'Leonardo AI review with pricing ($12-$60/mo), custom model training, and game asset features. Compare to Midjourney for concept art.',
  focus_keyword = 'Leonardo AI review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.4,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 15;

UPDATE tools SET stats_users = '6M+', stats_rating = 4.4, stats_company = 'Leonardo.AI', stats_launch_year = 2022 WHERE id = 15;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 15;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 15, 'Free', '$0', 'free', 0, 'Start Free', 'https://leonardo.ai'),
(1, 15, 'Apprentice', '$12/mo', 'monthly', 1, 'Go Apprentice', 'https://leonardo.ai/pricing'),
(2, 15, 'Artisan', '$30/mo', 'monthly', 0, 'Go Artisan', 'https://leonardo.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '150 tokens/day' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Community models' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '8500 tokens/month' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Apprentice';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Train 1 custom model' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Apprentice';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 0, t.id, '25000 tokens/month' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Artisan';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature) SELECT 1, t.id, 'Train 3 custom models' FROM tools_pricing_tiers t WHERE t._parent_id = 15 AND t.name = 'Artisan';

DELETE FROM tools_pros WHERE _parent_id = 15;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 15, 'Custom Model Training', 'Train AI on your art style for consistent outputs.'),
(1, 15, 'Game Art Focus', 'Optimized for concept art, characters, and game assets.'),
(2, 15, 'Real-Time Canvas', 'Edit and generate in a live canvas interface.');

DELETE FROM tools_cons WHERE _parent_id = 15;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 15, 'Token System', 'Can be confusing to calculate costs.'),
(1, 15, 'Narrower Than Midjourney', 'Less versatile for general photography-style images.');

DELETE FROM tools_best_for WHERE _parent_id = 15;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 15, 'Game Developers', 'Perfect for game assets and concept art'),
(1, 15, 'Digital Artists', 'Train models on your own style');

DELETE FROM tools_faqs WHERE _parent_id = 15;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 15, 'Is Leonardo AI free?', 'Yes, Leonardo offers 150 free tokens daily. Paid plans start at $12/month for more tokens and custom model training.'),
(1, 15, 'Can I train my own model on Leonardo?', 'Yes, paid plans include custom model training - upload your art and train AI to match your style.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 15;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES (0, 15, 'Leonardo AI free'), (1, 15, 'AI game art'), (2, 15, 'Leonardo vs Midjourney');
