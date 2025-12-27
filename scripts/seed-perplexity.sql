-- SEO Data for Perplexity (id=20)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-perplexity.sql

UPDATE tools SET
  tagline = 'AI-powered search engine that answers questions with cited sources',
  excerpt = 'Perplexity is an AI search engine that provides direct answers with inline citations. It combines the conversational abilities of ChatGPT with real-time web search, making it ideal for research, fact-checking, and learning.',
  logo_url = 'https://logo.clearbit.com/perplexity.ai',
  pricing_summary = 'Free tier with unlimited basic searches. Pro at $20/mo for advanced AI models, unlimited Pro searches, and file uploads.',
  expert_verdict = 'Perplexity has carved out a unique niche as the "answer engine" - not just finding information but synthesizing and citing it. For research tasks, it''s genuinely superior to both traditional Google and ChatGPT. The inline citations make fact-checking trivial. The free tier is remarkably generous. Pro adds GPT-4 and Claude access plus file analysis. The main limitation is that it''s focused on research/questions rather than creative tasks. For anyone who does regular research or fact-checking, Perplexity is becoming essential.',
  verdict_summary = 'The best AI tool for research with citations. Superior to Google for complex questions.',
  meta_title = 'Perplexity AI Review 2025: Pricing, Features & vs ChatGPT',
  meta_description = 'Perplexity AI review with pricing (free & $20/mo Pro), features, and comparison to ChatGPT and Google. See why it''s best for research with citations.',
  focus_keyword = 'Perplexity AI review',
  ratings_overall = 4.6,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.8,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 20;

UPDATE tools SET
  stats_users = '15M+',
  stats_rating = 4.6,
  stats_company = 'Perplexity AI',
  stats_launch_year = 2022
WHERE id = 20;

-- Perplexity Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 20;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 20, 'Free', '$0', 'free', 0, 'Try Free', 'https://perplexity.ai'),
(1, 20, 'Pro', '$20/mo', 'monthly', 1, 'Go Pro', 'https://perplexity.ai/pro'),
(2, 20, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://perplexity.ai/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited basic searches' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '5 Pro searches per day' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Standard AI model' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Cited sources' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '300+ Pro searches/day' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'GPT-4, Claude 3, Sonar access' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'File upload & analysis' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Image generation (DALL-E 3)' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, '$5/mo API credits' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'All Pro features' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'SSO & admin controls' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Internal knowledge search' FROM tools_pricing_tiers t WHERE t._parent_id = 20 AND t.name = 'Enterprise';

-- Perplexity Pros
DELETE FROM tools_pros WHERE _parent_id = 20;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 20, 'Inline Citations', 'Every claim links to its source, making fact-checking and verification effortless.'),
(1, 20, 'Real-Time Information', 'Searches the live web, not just training data. Always current.'),
(2, 20, 'Generous Free Tier', 'Unlimited basic searches free. Pro searches (5/day) also included free.'),
(3, 20, 'Focus Mode', 'Search academic papers, Reddit, YouTube, or specific domains only.'),
(4, 20, 'Multiple AI Models', 'Pro includes GPT-4, Claude 3, and Perplexity''s own Sonar model.');

-- Perplexity Cons
DELETE FROM tools_cons WHERE _parent_id = 20;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 20, 'Not for Creative Tasks', 'Focused on research/Q&A, not creative writing or coding like ChatGPT.'),
(1, 20, 'Simpler Conversational Abilities', 'Less capable for multi-turn creative conversations than ChatGPT/Claude.'),
(2, 20, 'Source Quality Varies', 'Citations are only as good as the sources it finds - verify important claims.');

-- Perplexity Best For
DELETE FROM tools_best_for WHERE _parent_id = 20;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 20, 'Researchers & Students', 'Cited sources perfect for academic work'),
(1, 20, 'Journalists & Writers', 'Quick fact-checking with source verification'),
(2, 20, 'Curious Learners', 'Better than Google for learning about topics'),
(3, 20, 'Professionals Needing Facts', 'Get answers with proof, not just AI opinions');

-- Perplexity Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 20;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 20, 'Creative Writing', 'Use ChatGPT or Claude for fiction/creative tasks'),
(1, 20, 'Coding Assistance', 'GitHub Copilot or Cursor better for development');

-- Perplexity FAQs
DELETE FROM tools_faqs WHERE _parent_id = 20;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 20, 'Is Perplexity AI free?', 'Yes, Perplexity offers unlimited free searches plus 5 Pro searches per day at no cost. Pro costs $20/month for heavy users.'),
(1, 20, 'Is Perplexity better than ChatGPT?', 'For research and factual questions, yes - Perplexity provides citations and real-time web data. ChatGPT is better for creative tasks, coding, and conversations.'),
(2, 20, 'Is Perplexity better than Google?', 'For complex questions that need synthesized answers, Perplexity often is. For navigational searches (finding a specific site), Google is faster.'),
(3, 20, 'What AI models does Perplexity use?', 'Free tier uses Perplexity''s Sonar model. Pro adds GPT-4 Turbo, Claude 3 Opus, and specialized models.'),
(4, 20, 'Does Perplexity cite sources?', 'Yes, this is Perplexity''s key feature. Every factual claim includes inline citations linking to the original source.');

-- Perplexity Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 20;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 20, 'Perplexity vs ChatGPT'),
(1, 20, 'Perplexity AI free'),
(2, 20, 'AI search engine'),
(3, 20, 'Perplexity Pro');
