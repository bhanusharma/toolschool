-- SEO Data for Sora (id=32)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-sora.sql

UPDATE tools SET
  tagline = 'OpenAI''s revolutionary AI video generator that creates stunning videos from text',
  excerpt = 'Sora is OpenAI''s groundbreaking text-to-video AI model. It can generate up to 60-second videos with remarkable realism, complex camera movements, and coherent multi-shot narratives from text descriptions.',
  logo_url = 'https://logo.clearbit.com/openai.com',
  pricing_summary = 'Included with ChatGPT Plus ($20/mo) for limited generations. Unlimited with ChatGPT Pro ($200/mo).',
  expert_verdict = 'Sora represents a genuine breakthrough in AI video generation. The quality gap between Sora and competitors like Runway or Pika is substantial - Sora produces videos that genuinely look like professional footage. The 60-second duration, physics understanding, and camera control are unmatched. The main limitation is access: Sora 1 with limited generations comes with Plus ($20/mo), while Sora 2 Pro requires the $200/mo ChatGPT Pro subscription. For filmmakers, advertisers, and content creators, Sora is worth the premium. Hobbyists may prefer cheaper alternatives for now.',
  verdict_summary = 'The most advanced AI video generator available. Premium pricing, but unmatched quality.',
  meta_title = 'Sora Review 2025: OpenAI''s AI Video Generator Pricing & Features',
  meta_description = 'Sora by OpenAI review with 2025 access (ChatGPT Plus/Pro), features, and comparison to Runway. See why it''s the best AI video generator.',
  focus_keyword = 'Sora AI video',
  ratings_overall = 4.7,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 3.8,
  ratings_features = 4.9,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 32;

UPDATE tools SET
  stats_users = '50M+',
  stats_rating = 4.7,
  stats_company = 'OpenAI',
  stats_launch_year = 2024
WHERE id = 32;

-- Sora Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 32;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 32, 'ChatGPT Plus', '$20/mo', 'monthly', 0, 'Subscribe to Plus', 'https://chat.openai.com/upgrade'),
(1, 32, 'ChatGPT Pro', '$200/mo', 'monthly', 1, 'Go Pro', 'https://chat.openai.com/upgrade');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Sora 1 access' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '50 priority generations/month' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '720p resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Up to 5 second clips' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Sora 2 Pro access' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Unlimited generations' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '1080p resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Up to 60 second videos' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, 'Priority processing' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 5, t.id, 'Image-to-video' FROM tools_pricing_tiers t WHERE t._parent_id = 32 AND t.name = 'ChatGPT Pro';

-- Sora Pros
DELETE FROM tools_pros WHERE _parent_id = 32;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 32, 'Unmatched Video Quality', 'Produces the most realistic AI-generated video available - often indistinguishable from real footage.'),
(1, 32, 'Long-Form Generation', 'Up to 60 seconds with Pro - far longer than competitors'' 4-10 second limits.'),
(2, 32, 'Physics Understanding', 'Accurately simulates real-world physics, lighting, and object interactions.'),
(3, 32, 'Complex Camera Control', 'Can specify dolly shots, tracking, drone-style movements in prompts.'),
(4, 32, 'ChatGPT Integration', 'Use natural language to describe and iterate on videos.');

-- Sora Cons
DELETE FROM tools_cons WHERE _parent_id = 32;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 32, 'Expensive', 'Full access requires ChatGPT Pro at $200/month - 10x the cost of alternatives.'),
(1, 32, 'Limited Plus Tier', 'ChatGPT Plus only gets Sora 1 with short clips and limited generations.'),
(2, 32, 'Occasional Artifacts', 'Complex scenes can still produce physics errors or morphing artifacts.');

-- Sora Best For
DELETE FROM tools_best_for WHERE _parent_id = 32;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 32, 'Professional Filmmakers', 'Quality justifies cost for commercial projects'),
(1, 32, 'Advertisers & Agencies', 'Create high-quality ad content quickly'),
(2, 32, 'Content Creators', 'Stand out with professional-grade AI video'),
(3, 32, 'ChatGPT Pro Subscribers', 'Already included in subscription');

-- Sora Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 32;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 32, 'Hobbyists on Budget', 'Runway or Pika offer similar features much cheaper'),
(1, 32, 'High-Volume Production', 'Generation times still slow for mass production');

-- Sora FAQs
DELETE FROM tools_faqs WHERE _parent_id = 32;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 32, 'How do I access Sora?', 'Sora is available through ChatGPT. Plus subscribers ($20/mo) get limited Sora 1 access. Pro subscribers ($200/mo) get unlimited Sora 2 Pro.'),
(1, 32, 'Is Sora free?', 'No, Sora requires a ChatGPT subscription. The minimum is ChatGPT Plus at $20/month for limited generations.'),
(2, 32, 'Is Sora better than Runway?', 'Sora produces higher quality, longer videos (up to 60s vs 10s), but costs significantly more. Runway is better value for most users.'),
(3, 32, 'How long can Sora videos be?', 'ChatGPT Plus: up to 5 seconds. ChatGPT Pro: up to 60 seconds at 1080p.'),
(4, 32, 'Can Sora generate any video?', 'Sora has content policies prohibiting violence, explicit content, and real people without consent. C2PA metadata marks all outputs as AI-generated.');

-- Sora Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 32;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 32, 'Sora pricing'),
(1, 32, 'Sora vs Runway'),
(2, 32, 'OpenAI video generator'),
(3, 32, 'Sora free access');
