-- SEO Data for Suno AI (id=4)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-suno.sql

UPDATE tools SET
  tagline = 'Create complete songs with AI-generated vocals, lyrics, and instrumentals',
  excerpt = 'Suno AI is a revolutionary music generation platform that creates full songs - vocals, lyrics, and instrumentals - from text prompts. No musical experience needed. Just describe your song and Suno composes, sings, and produces it in minutes.',
  logo_url = 'https://logo.clearbit.com/suno.ai',
  pricing_summary = 'Free: 50 credits/day. Pro $10/mo: 2500 credits/mo. Premier $30/mo: 10000 credits/mo with commercial rights.',
  expert_verdict = 'Suno has done for music what DALL-E did for images - made creation accessible to everyone. The quality is genuinely impressive: full songs with coherent lyrics, melodies that stick, and production that sounds professional. It''s not replacing human musicians, but it''s democratizing music creation for content creators, hobbyists, and rapid prototyping. The free tier is generous (50 credits/day = ~10 songs). Pro at $10/month is excellent value. For anyone curious about AI music, Suno is where to start.',
  verdict_summary = 'The most accessible and impressive AI music generator. Creates complete, professional-sounding songs.',
  meta_title = 'Suno AI Review 2025: Pricing, Features & AI Music Generation',
  meta_description = 'Suno AI review with 2025 pricing (free-$30/mo), features, and song examples. See how to create full songs with AI vocals and instrumentals.',
  focus_keyword = 'Suno AI review',
  ratings_overall = 4.6,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.8,
  ratings_features = 4.5,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 4;

UPDATE tools SET
  stats_users = '12M+',
  stats_rating = 4.6,
  stats_company = 'Suno Inc.',
  stats_launch_year = 2023
WHERE id = 4;

-- Suno AI Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 4;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 4, 'Free', '$0', 'free', 0, 'Start Creating', 'https://suno.ai'),
(1, 4, 'Pro', '$10/mo', 'monthly', 1, 'Go Pro', 'https://suno.ai/pricing'),
(2, 4, 'Premier', '$30/mo', 'monthly', 0, 'Go Premier', 'https://suno.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50 credits/day (~10 songs)' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '2 concurrent generations' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Non-commercial use only' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Shared generation queue' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2500 credits/month (~500 songs)' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '10 concurrent generations' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial use license' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Priority generation queue' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10000 credits/month (~2000 songs)' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Premier';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '10 concurrent generations' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Premier';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial use license' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Premier';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Highest priority queue' FROM tools_pricing_tiers t WHERE t._parent_id = 4 AND t.name = 'Premier';

-- Suno AI Pros
DELETE FROM tools_pros WHERE _parent_id = 4;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 4, 'Complete Song Generation', 'Creates full songs with vocals, lyrics, and instrumentals - not just beats or melodies.'),
(1, 4, 'Incredibly Easy to Use', 'Just describe your song in plain language. No musical knowledge required.'),
(2, 4, 'Surprisingly Good Quality', 'Songs often sound professionally produced with catchy melodies and coherent lyrics.'),
(3, 4, 'Generous Free Tier', '50 credits daily lets you experiment extensively without paying.'),
(4, 4, 'Genre Versatility', 'Generates convincing songs across pop, rock, jazz, hip-hop, country, and more.');

-- Suno AI Cons
DELETE FROM tools_cons WHERE _parent_id = 4;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 4, 'Limited Control', 'Can''t fine-tune specific instruments or vocal styles as precisely as DAWs.'),
(1, 4, 'Occasional Lyric Issues', 'Sometimes generates repetitive or nonsensical lyrics.'),
(2, 4, 'Copyright Uncertainty', 'Legal status of AI-generated music is still evolving.');

-- Suno AI Best For
DELETE FROM tools_best_for WHERE _parent_id = 4;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 4, 'Content Creators', 'Create unique background music and jingles for videos'),
(1, 4, 'Hobbyists & Fun', 'Make personalized songs for friends, events, or just fun'),
(2, 4, 'Rapid Prototyping', 'Musicians can quickly test song ideas before full production'),
(3, 4, 'Podcasters', 'Generate custom intro/outro music');

-- Suno AI Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 4;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 4, 'Professional Musicians', 'Lacks the control needed for serious music production'),
(1, 4, 'Specific Sound Design', 'Can''t request exact instruments or production techniques');

-- Suno AI FAQs
DELETE FROM tools_faqs WHERE _parent_id = 4;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 4, 'Is Suno AI free?', 'Yes, Suno offers 50 free credits per day - enough to generate about 10 complete songs. Paid plans start at $10/month for more credits and commercial use.'),
(1, 4, 'How do I use Suno AI?', 'Go to suno.ai, describe your song (genre, mood, topic), and click generate. Suno creates full songs with lyrics and vocals in about 30 seconds.'),
(2, 4, 'Can I use Suno songs commercially?', 'Free tier is non-commercial only. Pro ($10/mo) and Premier ($30/mo) include commercial use licenses for your generated songs.'),
(3, 4, 'Is Suno better than Udio?', 'Both are excellent. Suno is more accessible and beginner-friendly. Udio offers more control and sometimes better audio quality. Try both with free tiers.'),
(4, 4, 'Who owns Suno AI songs?', 'Songs you generate are owned by you, but check terms of service for specific rights. Commercial use requires a paid subscription.');

-- Suno AI Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 4;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 4, 'Suno AI music generator'),
(1, 4, 'AI song generator'),
(2, 4, 'Suno vs Udio'),
(3, 4, 'make music with AI');
