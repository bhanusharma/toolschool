-- SEO Data for Runway ML (id=19)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-runway.sql

UPDATE tools SET
  tagline = 'Professional AI video generation and editing tools for creative professionals',
  excerpt = 'Runway is the leading professional AI video platform, pioneering generative video with Gen-2 and Gen-3. Used by filmmakers, agencies, and content creators, it offers text-to-video, image-to-video, video editing, and a suite of AI creative tools.',
  logo_url = 'https://logo.clearbit.com/runwayml.com',
  pricing_summary = 'Free: 125 credits. Basic $15/mo: 625 credits. Standard $35/mo: 2250 credits. Pro $95/mo: 6750 credits. Unlimited $145/mo.',
  expert_verdict = 'Runway has been the pioneer of AI video generation, and Gen-3 Alpha represents their most capable model yet. While Sora may grab headlines, Runway has the proven track record, professional features, and reliable service that creative professionals need. The interface is intuitive, the video editing tools are genuinely useful, and the quality has improved dramatically. Pricing is higher than hobbyist alternatives, but for commercial work, the quality and reliability justify it. For filmmakers and agencies, Runway remains the industry standard.',
  verdict_summary = 'The professional''s choice for AI video. Proven technology with creative-focused features.',
  meta_title = 'Runway ML Review 2025: Pricing, Gen-3, and AI Video Features',
  meta_description = 'Runway ML review with 2025 pricing ($15-$145/mo), Gen-3 video generation, and comparison to Sora. See why creatives choose Runway for AI video.',
  focus_keyword = 'Runway ML review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.2,
  ratings_features = 4.7,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 19;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.5,
  stats_company = 'Runway AI, Inc.',
  stats_launch_year = 2018
WHERE id = 19;

-- Runway ML Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 19;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 19, 'Free', '$0', 'free', 0, 'Try Free', 'https://runwayml.com'),
(1, 19, 'Basic', '$15/mo', 'monthly', 0, 'Start Basic', 'https://runwayml.com/pricing'),
(2, 19, 'Standard', '$35/mo', 'monthly', 1, 'Go Standard', 'https://runwayml.com/pricing'),
(3, 19, 'Pro', '$95/mo', 'monthly', 0, 'Go Pro', 'https://runwayml.com/pricing'),
(4, 19, 'Unlimited', '$145/mo', 'monthly', 0, 'Go Unlimited', 'https://runwayml.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '125 credits (one-time)' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Gen-3 Alpha Turbo access' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '5 second max video length' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, '720p exports' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '625 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '10 second videos' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '1080p exports' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Basic';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2250 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Gen-3 Alpha (full)' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '4K exports' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Custom watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Standard';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '6750 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All Standard features' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority processing' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited Gen-3 Turbo' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Unlimited';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '15750 standard credits' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Unlimited';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Dedicated support' FROM tools_pricing_tiers t WHERE t._parent_id = 19 AND t.name = 'Unlimited';

-- Runway ML Pros
DELETE FROM tools_pros WHERE _parent_id = 19;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 19, 'Professional-Grade Quality', 'Gen-3 produces video quality suitable for commercial and broadcast use.'),
(1, 19, 'Comprehensive Tool Suite', 'Beyond video generation: inpainting, motion tracking, green screen, and more.'),
(2, 19, 'Proven Track Record', 'Used in award-winning films and by major studios - battle-tested technology.'),
(3, 19, 'Intuitive Interface', 'Browser-based editor that''s accessible yet powerful for professionals.'),
(4, 19, 'Fast Iteration', 'Quick generation times allow rapid creative exploration.');

-- Runway ML Cons
DELETE FROM tools_cons WHERE _parent_id = 19;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 19, 'Expensive for Heavy Use', 'Credit system adds up quickly for high-volume production.'),
(1, 19, 'Shorter Videos Than Sora', 'Max 10 seconds vs Sora''s 60 seconds on equivalent tiers.'),
(2, 19, 'Quality Variance', 'Results can be inconsistent - may need multiple generations.');

-- Runway ML Best For
DELETE FROM tools_best_for WHERE _parent_id = 19;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 19, 'Filmmakers & Agencies', 'Professional quality and comprehensive tools'),
(1, 19, 'Content Creators', 'Create unique video content for social media'),
(2, 19, 'Motion Designers', 'AI-assisted motion graphics and effects'),
(3, 19, 'Marketing Teams', 'Rapid video ad creation and iteration');

-- Runway ML Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 19;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 19, 'Budget-Conscious Hobbyists', 'Pika or free tiers of other tools are more affordable'),
(1, 19, 'Long-Form Video Needs', 'Max clip length limits use for longer content');

-- Runway ML FAQs
DELETE FROM tools_faqs WHERE _parent_id = 19;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 19, 'Is Runway ML free?', 'Runway offers 125 free credits to start. After that, paid plans start at $15/month for 625 credits.'),
(1, 19, 'Is Runway better than Sora?', 'Runway is more accessible (no ChatGPT Pro subscription needed) and has more editing tools. Sora produces longer, higher-quality videos but costs more. Runway is better for most professionals.'),
(2, 19, 'What is Gen-3 Alpha?', 'Gen-3 Alpha is Runway''s latest video generation model, offering improved quality, consistency, and control compared to Gen-2.'),
(3, 19, 'Can I use Runway videos commercially?', 'Yes, all paid plans include commercial use rights for your generated content.'),
(4, 19, 'How long can Runway videos be?', 'Free: 5 seconds. Paid plans: up to 10 seconds per generation. You can extend clips using Extend feature.');

-- Runway ML Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 19;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 19, 'Runway Gen-3'),
(1, 19, 'Runway vs Sora'),
(2, 19, 'AI video generator'),
(3, 19, 'Runway ML pricing');
