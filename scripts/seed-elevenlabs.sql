-- SEO Data for ElevenLabs (id=2)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-elevenlabs.sql

UPDATE tools SET
  tagline = 'Industry-leading AI voice synthesis with the most realistic speech generation',
  excerpt = 'ElevenLabs is the leading AI voice platform, known for producing the most natural-sounding synthetic speech. It offers text-to-speech, voice cloning, dubbing, and an AI voice library used by content creators, game developers, and enterprises worldwide.',
  logo_url = 'https://logo.clearbit.com/elevenlabs.io',
  pricing_summary = 'Free tier: 10K characters/month. Starter $5/mo. Creator $22/mo. Pro $99/mo. Scale $330/mo.',
  expert_verdict = 'ElevenLabs has established itself as the gold standard for AI voice synthesis. The quality difference between ElevenLabs and competitors is immediately audible - voices sound genuinely human with natural intonation and emotion. Voice cloning is remarkably accurate with just a few minutes of samples. The pricing is reasonable: free tier for experimentation, $5/month for hobbyists, scaling up for commercial use. For podcasters, game developers, content creators, and anyone needing realistic synthetic speech, ElevenLabs is the clear market leader.',
  verdict_summary = 'The best AI voice generator available. Unmatched natural-sounding speech quality.',
  meta_title = 'ElevenLabs Review 2025: Pricing, Voice Cloning & Text-to-Speech',
  meta_description = 'ElevenLabs review with 2025 pricing (free-$330/mo), voice cloning, and text-to-speech features. See why it''s the most realistic AI voice generator.',
  focus_keyword = 'ElevenLabs review',
  ratings_overall = 4.8,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.4,
  ratings_features = 4.9,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 2;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.8,
  stats_company = 'ElevenLabs',
  stats_launch_year = 2022
WHERE id = 2;

-- ElevenLabs Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 2;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 2, 'Free', '$0', 'free', 0, 'Try Free', 'https://elevenlabs.io'),
(1, 2, 'Starter', '$5/mo', 'monthly', 0, 'Start Creating', 'https://elevenlabs.io/pricing'),
(2, 2, 'Creator', '$22/mo', 'monthly', 1, 'Go Creator', 'https://elevenlabs.io/pricing'),
(3, 2, 'Pro', '$99/mo', 'monthly', 0, 'Go Pro', 'https://elevenlabs.io/pricing'),
(4, 2, 'Scale', '$330/mo', 'monthly', 0, 'Contact Sales', 'https://elevenlabs.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 characters/month' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Voice Library access' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '3 custom voices' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '30,000 characters/month' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '10 custom voices' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Instant voice cloning' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100,000 characters/month' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '30 custom voices' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Professional voice cloning' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Creator';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '500,000 characters/month' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '160 custom voices' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Higher quality audio' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2,000,000 characters/month' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Scale';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Unlimited custom voices' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Scale';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 2 AND t.name = 'Scale';

-- ElevenLabs Pros
DELETE FROM tools_pros WHERE _parent_id = 2;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 2, 'Most Natural-Sounding AI Voices', 'Industry-leading quality that''s often indistinguishable from human speech.'),
(1, 2, 'Excellent Voice Cloning', 'Clone any voice with just a few minutes of sample audio with remarkable accuracy.'),
(2, 2, 'Huge Voice Library', 'Thousands of pre-made voices across languages, accents, and speaking styles.'),
(3, 2, 'Emotion & Style Control', 'Fine-tune voice delivery with emotion, pacing, and emphasis controls.'),
(4, 2, 'Multi-Language Support', '29 languages with natural-sounding speech in each.');

-- ElevenLabs Cons
DELETE FROM tools_cons WHERE _parent_id = 2;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 2, 'Character Limits', 'Pay per character model can get expensive for high-volume use.'),
(1, 2, 'Voice Cloning Ethics', 'Powerful voice cloning raises concerns about misuse and deepfakes.'),
(2, 2, 'Premium for Best Quality', 'Highest quality settings require Pro tier or above.');

-- ElevenLabs Best For
DELETE FROM tools_best_for WHERE _parent_id = 2;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 2, 'Podcasters & Narrators', 'Create professional voiceovers without recording'),
(1, 2, 'Game Developers', 'Voice characters without hiring voice actors'),
(2, 2, 'Content Creators', 'Add narration to videos quickly'),
(3, 2, 'Accessibility Projects', 'Convert text to speech for visually impaired users');

-- ElevenLabs Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 2;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 2, 'Live/Real-Time Use', 'Latency makes it unsuitable for real-time voice applications'),
(1, 2, 'Tight Budgets with High Volume', 'Per-character pricing adds up for large projects');

-- ElevenLabs FAQs
DELETE FROM tools_faqs WHERE _parent_id = 2;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 2, 'Is ElevenLabs free?', 'Yes, ElevenLabs offers a free tier with 10,000 characters/month - enough for about 10 minutes of audio. Paid plans start at $5/month.'),
(1, 2, 'Is ElevenLabs the best AI voice?', 'ElevenLabs is widely considered the most natural-sounding AI voice generator. It consistently outperforms competitors in blind listening tests.'),
(2, 2, 'Can I clone my own voice with ElevenLabs?', 'Yes, voice cloning is available on paid plans. Instant cloning works with short samples. Professional cloning with longer samples produces better results.'),
(3, 2, 'What languages does ElevenLabs support?', 'ElevenLabs supports 29 languages including English, Spanish, French, German, Chinese, Japanese, and more with natural-sounding speech.'),
(4, 2, 'Can I use ElevenLabs commercially?', 'Yes, commercial use is allowed on Creator ($22/mo) and higher plans. Check their terms for specific usage rights.');

-- ElevenLabs Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 2;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 2, 'ElevenLabs voice cloning'),
(1, 2, 'best AI voice generator'),
(2, 2, 'ElevenLabs pricing'),
(3, 2, 'text to speech AI');
