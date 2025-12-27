-- Production seed for ChatGPT (id=25), Midjourney (id=18)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-production-tools.sql

-- Update ChatGPT main fields
UPDATE tools SET
  tagline = 'AI-powered conversational assistant for writing, coding, analysis, and creative tasks',
  excerpt = 'ChatGPT by OpenAI is the world''s most popular AI chatbot with 900M+ weekly users. It excels at natural language understanding, code generation, creative writing, and complex problem-solving.',
  logo_url = 'https://logo.clearbit.com/openai.com',
  pricing_summary = 'Free tier with GPT-5.2. Plus $20/mo. Pro $200/mo for unlimited.',
  how_it_works = 'ChatGPT uses large language models trained on diverse text data. Type your prompt, and the AI generates contextual responses using transformer architecture with attention mechanisms.',
  expert_verdict = 'ChatGPT remains the undisputed leader in AI chatbots. With 900M weekly users and 92% of Fortune 100 adoption, it has become essential for knowledge workers. GPT-5.2 offers exceptional reasoning and multimodal capabilities.',
  verdict_summary = 'The most capable and versatile AI assistant available, with unmatched ecosystem and continuous innovation. Essential for AI productivity.',
  meta_title = 'ChatGPT Review 2025: Features, Pricing & Pros/Cons',
  meta_description = 'Comprehensive ChatGPT review with 2025 pricing ($0-$200/mo), features, pros/cons. 900M+ users. Compare Free vs Plus vs Pro plans.',
  focus_keyword = 'ChatGPT review',
  ratings_overall = 4.8,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.5,
  ratings_features = 4.9,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 25;

-- Update tools stats for ChatGPT (using available columns)
UPDATE tools SET
  stats_users = '900M+',
  stats_rating = 4.8,
  stats_company = 'OpenAI',
  stats_launch_year = 2022
WHERE id = 25;

-- ChatGPT Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 25;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 25, 'Free', '$0', 'free', 0, 'Get Started Free', 'https://chat.openai.com'),
(1, 25, 'Plus', '$20/mo', 'monthly', 1, 'Upgrade to Plus', 'https://chat.openai.com/upgrade'),
(2, 25, 'Pro', '$200/mo', 'monthly', 0, 'Go Pro', 'https://chat.openai.com/upgrade'),
(3, 25, 'Team', '$25-30/user/mo', 'monthly', 0, 'Start Team Trial', 'https://openai.com/chatgpt/team/'),
(4, 25, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://openai.com/chatgpt/enterprise/');

-- ChatGPT Pricing Tier Features (get IDs from last insert)
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Access to GPT-5.2 Instant' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '~10 messages per 5 hours' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Web browsing capability' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'GPT-5.2 Thinking mode' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '5x higher usage limits' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'DALL-E 4 image generation' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Advanced Voice mode' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, 'Custom GPTs' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited GPT-5.2 Pro access' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Maximum reasoning compute' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Sora 2 Pro video generation' FROM tools_pricing_tiers t WHERE t._parent_id = 25 AND t.name = 'Pro';

-- ChatGPT Pros
DELETE FROM tools_pros WHERE _parent_id = 25;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 25, 'Best-in-Class Language Understanding', 'Consistently outperforms competitors on natural language benchmarks with remarkable accuracy.'),
(1, 25, 'Massive App Ecosystem', 'Over 3 million custom GPTs available. Integrates with hundreds of third-party tools.'),
(2, 25, 'Generous Free Tier', 'Free access to GPT-5.2 Instant is legitimately useful, not just a trial.'),
(3, 25, 'Multimodal Capabilities', 'Can generate text, images (DALL-E), audio, and video (Sora).'),
(4, 25, 'Enterprise-Ready', 'Used by 92% of Fortune 100. Robust security and compliance features.');

-- ChatGPT Cons
DELETE FROM tools_cons WHERE _parent_id = 25;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 25, 'Usage Limits on All Plans', 'Even paid plans have message caps. Only Pro offers unlimited access.'),
(1, 25, 'Can Hallucinate Facts', 'Sometimes generates plausible-sounding but incorrect information.'),
(2, 25, 'Pro Plan is Expensive', 'At $200/month, Pro is 10x the Plus price.');

-- ChatGPT Best For
DELETE FROM tools_best_for WHERE _parent_id = 25;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 25, 'Content Writers', 'Exceptional at drafting, editing, and brainstorming'),
(1, 25, 'Software Developers', 'Industry-leading code generation and debugging'),
(2, 25, 'Students & Researchers', 'Excellent for learning, tutoring, and research'),
(3, 25, 'Business Professionals', 'Versatile for emails, presentations, and analysis');

-- ChatGPT Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 25;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 25, 'Those needing 100% accuracy', 'AI can hallucinate - always verify critical facts'),
(1, 25, 'Real-time data requirements', 'Web browsing is not instant');

-- ChatGPT FAQs
DELETE FROM tools_faqs WHERE _parent_id = 25;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 25, 'Is ChatGPT free to use?', 'Yes, ChatGPT offers a free tier with GPT-5.2 Instant access (~10 messages per 5 hours). Plus is $20/mo, Pro is $200/mo.'),
(1, 25, 'What is the difference between Plus and Pro?', 'Plus ($20/mo) gives 5x usage limits and GPT-5.2 Thinking. Pro ($200/mo) provides unlimited GPT-5.2 Pro access and Sora 2 video.'),
(2, 25, 'How many people use ChatGPT?', 'Over 900 million weekly active users. It is the 6th most visited website globally.'),
(3, 25, 'Can ChatGPT write code?', 'Yes, ChatGPT excels at code generation in 50+ programming languages including Python, JavaScript, and more.'),
(4, 25, 'Is ChatGPT safe for business use?', 'Enterprise and Team plans offer SOC 2 Type II compliance, SAML SSO, and data not used for training.');

-- ChatGPT Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 25;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 25, 'ChatGPT pricing'),
(1, 25, 'ChatGPT free vs plus'),
(2, 25, 'ChatGPT alternatives'),
(3, 25, 'best AI chatbot');

-- ========================================
-- MIDJOURNEY (id=18)
-- ========================================

UPDATE tools SET
  tagline = 'Create stunning AI-generated art from text descriptions with industry-leading quality',
  excerpt = 'Midjourney is the leading AI image generation platform with 21M+ Discord users. Known for exceptional artistic quality and aesthetic coherence.',
  logo_url = 'https://logo.clearbit.com/midjourney.com',
  pricing_summary = 'Basic $10/mo, Standard $30/mo, Pro $60/mo, Mega $120/mo. No free trial.',
  how_it_works = 'Type text prompts in Discord or web app. Midjourney''s diffusion model generates 4 image variations. Upscale, vary, or remix your favorites.',
  expert_verdict = 'Midjourney V6 delivers the most aesthetically pleasing AI art. While Discord-only was a barrier, the new web editor changes that. For artists and designers who care about visual quality above all else, Midjourney remains the gold standard.',
  verdict_summary = 'The undisputed leader in AI art quality. No free tier, but worth every penny for serious creators.',
  meta_title = 'Midjourney Review 2025: Pricing, Art Quality & Guide',
  meta_description = 'Complete Midjourney review with V6 features, 2025 pricing ($10-$120/mo), prompt guide, and comparison to DALL-E 3 and Stable Diffusion.',
  focus_keyword = 'Midjourney review',
  ratings_overall = 4.7,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.4,
  ratings_features = 4.8,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 18;

UPDATE tools SET
  stats_users = '21M+',
  stats_rating = 4.7,
  stats_company = 'Midjourney, Inc.',
  stats_launch_year = 2022
WHERE id = 18;

-- Midjourney Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 18;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 18, 'Basic', '$10/mo', 'monthly', 0, 'Start Basic', 'https://www.midjourney.com/account/'),
(1, 18, 'Standard', '$30/mo', 'monthly', 1, 'Get Standard', 'https://www.midjourney.com/account/'),
(2, 18, 'Pro', '$60/mo', 'monthly', 0, 'Go Pro', 'https://www.midjourney.com/account/'),
(3, 18, 'Mega', '$120/mo', 'monthly', 0, 'Get Mega', 'https://www.midjourney.com/account/');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '~200 image generations' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '3 concurrent fast jobs' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'General commercial use' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Basic';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited Relax Mode' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '~15 GPU hours/month' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'General commercial use' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Standard';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Stealth Mode (private)' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '~30 GPU hours/month' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '12 concurrent fast jobs' FROM tools_pricing_tiers t WHERE t._parent_id = 18 AND t.name = 'Pro';

-- Midjourney Pros
DELETE FROM tools_pros WHERE _parent_id = 18;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 18, 'Unmatched Aesthetic Quality', 'Produces the most visually stunning, coherent AI art. Natural lighting and composition.'),
(1, 18, 'Profitable and Bootstrapped', '$200M+ ARR with no VC funding. Highly sustainable business model.'),
(2, 18, 'Active Community', '21M+ users sharing prompts, techniques, and inspiration on Discord.'),
(3, 18, 'Continuous Improvement', 'V6 introduced major quality and text-in-image improvements.');

-- Midjourney Cons
DELETE FROM tools_cons WHERE _parent_id = 18;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 18, 'No Free Tier', 'Unlike DALL-E or Stable Diffusion, there is no free trial.'),
(1, 18, 'Discord Learning Curve', 'Using Midjourney through Discord can be confusing for new users.'),
(2, 18, 'Less Precise Control', 'Getting exactly what you want requires prompt engineering skill.');

-- Midjourney Best For
DELETE FROM tools_best_for WHERE _parent_id = 18;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 18, 'Professional Artists', 'Highest quality outputs for portfolio and client work'),
(1, 18, 'Designers', 'Excellent for concept art, mood boards, and visual exploration'),
(2, 18, 'Content Creators', 'Stunning imagery for social media and marketing');

-- Midjourney Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 18;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 18, 'Budget-Conscious Beginners', 'No free tier means commitment before trying'),
(1, 18, 'Technical Illustration', 'Better tools exist for diagrams and schematics');

-- Midjourney FAQs
DELETE FROM tools_faqs WHERE _parent_id = 18;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 18, 'Is Midjourney free?', 'No, Midjourney does not offer a free tier. The cheapest plan is Basic at $10/month for ~200 images.'),
(1, 18, 'How much does Midjourney cost?', 'Basic $10/mo, Standard $30/mo (most popular), Pro $60/mo, Mega $120/mo. Annual plans get 20% off.'),
(2, 18, 'Is Midjourney better than DALL-E?', 'For artistic quality and aesthetics, Midjourney generally produces more visually stunning results. DALL-E integrates better with ChatGPT.'),
(3, 18, 'How do I use Midjourney?', 'Join the Midjourney Discord server or use the web editor. Type /imagine followed by your prompt to generate images.'),
(4, 18, 'Can I use Midjourney images commercially?', 'Yes, all paid plans include commercial use rights. Pro/Mega add Stealth Mode for privacy.');

-- Midjourney Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 18;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 18, 'Midjourney pricing'),
(1, 18, 'Midjourney vs DALL-E'),
(2, 18, 'Midjourney prompt guide'),
(3, 18, 'best AI image generator');
