-- SEO Data for DALL-E 3 (id=24)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-dalle3.sql

UPDATE tools SET
  tagline = 'OpenAI''s most advanced text-to-image AI with exceptional prompt understanding',
  excerpt = 'DALL-E 3 is OpenAI''s latest image generation model, integrated directly into ChatGPT. It excels at following complex prompts accurately, generating legible text in images, and producing coherent multi-element scenes.',
  logo_url = 'https://logo.clearbit.com/openai.com',
  pricing_summary = 'Included with ChatGPT Plus ($20/mo) and Pro ($200/mo). API pricing: $0.040-$0.120 per image depending on resolution.',
  expert_verdict = 'DALL-E 3 has closed the gap with Midjourney in many areas while excelling in its own strengths. The killer feature is prompt adherence - DALL-E 3 actually follows your instructions, including generating readable text in images. The ChatGPT integration makes it incredibly accessible. While Midjourney still produces more aesthetically "artistic" images, DALL-E 3 is better for practical use cases: marketing materials, diagrams with text, specific compositions. For ChatGPT Plus subscribers, it''s already included, making it an easy recommendation.',
  verdict_summary = 'Best AI image generator for following complex prompts and generating text. Perfect ChatGPT companion.',
  meta_title = 'DALL-E 3 Review 2025: Pricing, Features & vs Midjourney',
  meta_description = 'DALL-E 3 review with pricing (included in ChatGPT Plus), features, and comparison to Midjourney. See why it''s best for text in images and complex prompts.',
  focus_keyword = 'DALL-E 3 review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.6,
  ratings_features = 4.5,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 24;

UPDATE tools SET
  stats_users = '200M+',
  stats_rating = 4.5,
  stats_company = 'OpenAI',
  stats_launch_year = 2023
WHERE id = 24;

-- DALL-E 3 Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 24;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 24, 'ChatGPT Plus', '$20/mo', 'monthly', 1, 'Subscribe to Plus', 'https://chat.openai.com/upgrade'),
(1, 24, 'ChatGPT Pro', '$200/mo', 'monthly', 0, 'Go Pro', 'https://chat.openai.com/upgrade'),
(2, 24, 'API Standard', '$0.040/image', 'custom', 0, 'Get API Access', 'https://platform.openai.com'),
(3, 24, 'API HD', '$0.080/image', 'custom', 0, 'Get API Access', 'https://platform.openai.com');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'DALL-E 3 via ChatGPT' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Conversational image editing' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'All GPT-4 features included' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited DALL-E generations' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Highest quality settings' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority processing' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'ChatGPT Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1024x1024 resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'API Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Pay per generation' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'API Standard';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1024x1792 or 1792x1024' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'API HD';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Higher detail' FROM tools_pricing_tiers t WHERE t._parent_id = 24 AND t.name = 'API HD';

-- DALL-E 3 Pros
DELETE FROM tools_pros WHERE _parent_id = 24;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 24, 'Best Prompt Adherence', 'DALL-E 3 actually follows complex, detailed prompts accurately - a major improvement over competitors.'),
(1, 24, 'Legible Text in Images', 'Can generate readable text, signs, and typography - a unique strength among AI image generators.'),
(2, 24, 'ChatGPT Integration', 'Natural language conversation to create and iterate on images. No prompt engineering needed.'),
(3, 24, 'Safety & Moderation', 'Built-in safeguards prevent generating harmful content while allowing creative freedom.'),
(4, 24, 'Included in ChatGPT Plus', 'No separate subscription needed if you already pay for ChatGPT.');

-- DALL-E 3 Cons
DELETE FROM tools_cons WHERE _parent_id = 24;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 24, 'Less Artistic Than Midjourney', 'Midjourney produces more aesthetically striking, "artistic" images.'),
(1, 24, 'Limited Style Control', 'Fewer parameters to fine-tune artistic style compared to Stable Diffusion.'),
(2, 24, 'No Free Tier', 'Requires ChatGPT Plus ($20/mo) or API credits to use.');

-- DALL-E 3 Best For
DELETE FROM tools_best_for WHERE _parent_id = 24;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 24, 'Marketers & Content Creators', 'Great for quick graphics with text and specific compositions'),
(1, 24, 'ChatGPT Users', 'Already included in Plus subscription, no extra cost'),
(2, 24, 'Those New to AI Art', 'Natural language interface, no prompt engineering learning curve'),
(3, 24, 'Designers Needing Text', 'Only major generator that handles text in images well');

-- DALL-E 3 Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 24;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 24, 'Fine Art Aesthetics', 'Midjourney produces more visually striking artistic images'),
(1, 24, 'Technical Control', 'Stable Diffusion offers more parameters for power users');

-- DALL-E 3 FAQs
DELETE FROM tools_faqs WHERE _parent_id = 24;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 24, 'How do I access DALL-E 3?', 'DALL-E 3 is integrated into ChatGPT. Subscribe to ChatGPT Plus ($20/mo) or Pro ($200/mo), then ask ChatGPT to create an image.'),
(1, 24, 'Is DALL-E 3 free?', 'No free tier. Access requires ChatGPT Plus ($20/mo minimum) or API usage ($0.04-$0.12 per image).'),
(2, 24, 'Is DALL-E 3 better than Midjourney?', 'DALL-E 3 excels at prompt adherence and text in images. Midjourney produces more aesthetically artistic results. Choose based on your needs.'),
(3, 24, 'Can DALL-E 3 generate text in images?', 'Yes, DALL-E 3 is the best AI image generator for creating legible text, signs, and typography in images.'),
(4, 24, 'What resolution does DALL-E 3 support?', 'Standard: 1024x1024. HD: 1024x1792 or 1792x1024 (landscape/portrait).');

-- DALL-E 3 Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 24;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 24, 'DALL-E 3 vs Midjourney'),
(1, 24, 'DALL-E 3 pricing'),
(2, 24, 'DALL-E 3 free'),
(3, 24, 'DALL-E 3 text in images');
