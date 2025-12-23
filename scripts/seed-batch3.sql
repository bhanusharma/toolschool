-- Batch 3: AI Image & Video Generation Tools
-- Udio (id=3), Flux (id=12), Ideogram (id=13), Pika (id=14), Kling AI (id=33), Hailuo AI (id=34)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch3.sql

-- ============================================
-- UDIO (id=3) - AI Music Generation
-- ============================================
UPDATE tools SET
  tagline = 'Create professional-quality AI music with studio-grade audio fidelity',
  excerpt = 'Udio is an advanced AI music generation platform known for exceptional audio quality and musical coherence. Create full songs with vocals, instrumentals, and production that rivals professional studios.',
  logo_url = 'https://logo.clearbit.com/udio.com',
  pricing_summary = 'Free: 1200 credits/month. Standard $10/mo: 1200 credits. Pro $30/mo: 4800 credits.',
  expert_verdict = 'Udio represents the audiophile choice in AI music generation. While Suno is more accessible, Udio often produces more polished, radio-ready tracks with better audio fidelity. The generation process is slightly more complex but rewards users with higher quality output. For serious music creators who want the best possible AI-generated audio, Udio is worth the learning curve. The free tier is generous enough to explore extensively.',
  verdict_summary = 'Premium AI music with studio-quality audio. Higher quality than competitors.',
  meta_title = 'Udio Review 2025: AI Music Generator Pricing & Features vs Suno',
  meta_description = 'Udio AI music generator review with 2025 pricing (free-$30/mo), audio quality comparison, and Suno alternatives. Create studio-quality AI songs.',
  focus_keyword = 'Udio AI music',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.5,
  ratings_features = 4.7,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 3;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.5,
  stats_company = 'Udio',
  stats_launch_year = 2024
WHERE id = 3;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 3;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 3, 'Free', '$0', 'free', 0, 'Start Creating', 'https://udio.com'),
(1, 3, 'Standard', '$10/mo', 'monthly', 1, 'Go Standard', 'https://udio.com/pricing'),
(2, 3, 'Pro', '$30/mo', 'monthly', 0, 'Go Pro', 'https://udio.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1200 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Standard audio quality' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Non-commercial use' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1200 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'High-quality audio' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Standard';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Standard';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '4800 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Highest quality audio' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority generation' FROM tools_pricing_tiers t WHERE t._parent_id = 3 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 3;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 3, 'Superior Audio Quality', 'Produces cleaner, more polished audio than most competitors.'),
(1, 3, 'Musical Coherence', 'Songs have better structure, progression, and musical sensibility.'),
(2, 3, 'Detailed Control', 'More options for fine-tuning style, tempo, and instrumentation.'),
(3, 3, 'Generous Free Tier', '1200 free credits monthly is substantial for experimentation.');

DELETE FROM tools_cons WHERE _parent_id = 3;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 3, 'Steeper Learning Curve', 'More complex prompting required for best results.'),
(1, 3, 'Slower Generation', 'Higher quality means longer wait times.'),
(2, 3, 'Less Accessible UI', 'Interface is less intuitive than Suno.');

DELETE FROM tools_best_for WHERE _parent_id = 3;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 3, 'Audio Quality Enthusiasts', 'Best-in-class audio fidelity'),
(1, 3, 'Music Producers', 'Creates stems and tracks for further production'),
(2, 3, 'Commercial Music Needs', 'High-quality output for professional use');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 3;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 3, 'Complete Beginners', 'Suno is more beginner-friendly'),
(1, 3, 'Quick Casual Songs', 'If speed matters more than quality');

DELETE FROM tools_faqs WHERE _parent_id = 3;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 3, 'Is Udio better than Suno?', 'Udio generally produces higher audio quality and more polished tracks. Suno is easier to use and faster. Both are excellent - try both free tiers to compare.'),
(1, 3, 'Is Udio free?', 'Yes, Udio offers 1200 free credits per month. Paid plans start at $10/month for commercial use and higher quality.'),
(2, 3, 'Can I use Udio songs commercially?', 'Commercial use requires a paid subscription (Standard $10/mo or Pro $30/mo).'),
(3, 3, 'How long are Udio songs?', 'Udio can generate tracks up to 15 minutes with extensions.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 3;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 3, 'Udio vs Suno'),
(1, 3, 'AI music generator'),
(2, 3, 'Udio pricing'),
(3, 3, 'best AI song maker');

-- ============================================
-- FLUX (id=12) - AI Image Generation
-- ============================================
UPDATE tools SET
  tagline = 'State-of-the-art open-source AI image generation with exceptional quality',
  excerpt = 'Flux is Black Forest Labs'' flagship AI image model, known for exceptional prompt adherence, photorealism, and artistic versatility. Available in Pro, Dev, and Schnell variants for different use cases.',
  logo_url = 'https://logo.clearbit.com/blackforestlabs.ai',
  pricing_summary = 'Flux Schnell: Free (fast). Flux Dev: Free for non-commercial. Flux Pro: API pricing via partners.',
  expert_verdict = 'Flux has rapidly become the go-to image model for quality-conscious creators. It excels at following complex prompts accurately, produces stunning photorealistic images, and handles text in images better than most competitors. The open-source Schnell model is remarkably capable for free, while Pro delivers professional-grade results. For anyone frustrated with other AI image tools ignoring prompt details, Flux is the answer.',
  verdict_summary = 'Leading open-source image model with exceptional prompt accuracy and quality.',
  meta_title = 'Flux AI Review 2025: Best Open Source Image Generator vs Midjourney',
  meta_description = 'Flux AI image generator review comparing Schnell, Dev, and Pro models. See why Flux rivals Midjourney for free with superior prompt adherence.',
  focus_keyword = 'Flux AI image',
  ratings_overall = 4.7,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.9,
  ratings_features = 4.8,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 12;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.7,
  stats_company = 'Black Forest Labs',
  stats_launch_year = 2024
WHERE id = 12;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 12;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 12, 'Flux Schnell', '$0', 'free', 0, 'Try Free', 'https://replicate.com/black-forest-labs/flux-schnell'),
(1, 12, 'Flux Dev', '$0', 'free', 1, 'Use Dev', 'https://replicate.com/black-forest-labs/flux-dev'),
(2, 12, 'Flux Pro', 'Pay-per-use', 'usage', 0, 'Access Pro', 'https://replicate.com/black-forest-labs/flux-pro');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Fast generation (4 steps)' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Schnell';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Apache 2.0 license' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Schnell';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Good for rapid iteration' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Schnell';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Higher quality (50 steps)' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Dev';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Non-commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Dev';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Great for personal projects' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Dev';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Highest quality output' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Commercial use allowed' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'API access via partners' FROM tools_pricing_tiers t WHERE t._parent_id = 12 AND t.name = 'Flux Pro';

DELETE FROM tools_pros WHERE _parent_id = 12;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 12, 'Exceptional Prompt Adherence', 'Follows complex prompts more accurately than Midjourney or DALL-E.'),
(1, 12, 'Stunning Image Quality', 'Photorealistic and artistic outputs rival any commercial tool.'),
(2, 12, 'Text Rendering', 'One of the best at generating readable text in images.'),
(3, 12, 'Open Source Option', 'Schnell and Dev are free to use and run locally.'),
(4, 12, 'Fast Generation', 'Schnell produces quality images in seconds.');

DELETE FROM tools_cons WHERE _parent_id = 12;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 12, 'No Native Interface', 'Requires third-party UIs or API access to use.'),
(1, 12, 'Technical Setup', 'Running locally requires GPU and technical knowledge.'),
(2, 12, 'Dev License Restriction', 'Dev model is non-commercial only.');

DELETE FROM tools_best_for WHERE _parent_id = 12;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 12, 'Technical Users', 'Those comfortable with APIs and local deployment'),
(1, 12, 'Quality-Focused Creators', 'Best prompt accuracy in the market'),
(2, 12, 'Open Source Advocates', 'Free models with permissive licenses');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 12;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 12, 'Non-Technical Users', 'No simple interface - use Midjourney instead'),
(1, 12, 'Discord Workflow Fans', 'No native Discord bot like Midjourney');

DELETE FROM tools_faqs WHERE _parent_id = 12;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 12, 'Is Flux better than Midjourney?', 'Flux excels at prompt adherence and text rendering. Midjourney has better artistic defaults. For specific requirements, Flux often wins; for general aesthetics, Midjourney may be preferred.'),
(1, 12, 'Is Flux free?', 'Flux Schnell and Dev are free. Schnell is Apache 2.0 licensed (commercial OK). Dev is non-commercial only. Pro requires payment via API providers.'),
(2, 12, 'How do I use Flux?', 'Use through Replicate, ComfyUI, or other platforms that host the model. No official standalone app exists.'),
(3, 12, 'What is the difference between Flux Schnell, Dev, and Pro?', 'Schnell: Fast, good quality, commercial OK. Dev: Higher quality, non-commercial. Pro: Highest quality, commercial, paid.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 12;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 12, 'Flux vs Midjourney'),
(1, 12, 'Black Forest Labs Flux'),
(2, 12, 'best free AI image generator'),
(3, 12, 'Flux Schnell');

-- ============================================
-- IDEOGRAM (id=13) - AI Image Generation
-- ============================================
UPDATE tools SET
  tagline = 'AI image generation with best-in-class text rendering',
  excerpt = 'Ideogram is an AI image generator famous for its exceptional text-in-image capabilities. While competitors struggle with text, Ideogram reliably renders logos, typography, and text-heavy designs.',
  logo_url = 'https://logo.clearbit.com/ideogram.ai',
  pricing_summary = 'Free: 10 images/day. Basic $8/mo: 100 images/day. Plus $20/mo: 400 images. Pro $60/mo: 1000 images.',
  expert_verdict = 'Ideogram has carved out a unique niche by excelling where others fail: text in images. If you need logos, posters, signs, or any design with readable text, Ideogram is unmatched. Version 2.0 significantly improved general image quality too. The free tier with 10 images daily is perfect for trying it out. For designers and marketers who need text-heavy visuals, Ideogram is essential.',
  verdict_summary = 'The text-in-image specialist. Unmatched for logos, typography, and text-heavy designs.',
  meta_title = 'Ideogram AI Review 2025: Best for Text in Images & Logo Design',
  meta_description = 'Ideogram AI review with 2025 pricing (free-$60/mo). See why it''s the best AI image generator for text, logos, and typography.',
  focus_keyword = 'Ideogram AI',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.5,
  ratings_features = 4.6,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 13;

UPDATE tools SET
  stats_users = '8M+',
  stats_rating = 4.4,
  stats_company = 'Ideogram Inc.',
  stats_launch_year = 2023
WHERE id = 13;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 13;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 13, 'Free', '$0', 'free', 0, 'Try Free', 'https://ideogram.ai'),
(1, 13, 'Basic', '$8/mo', 'monthly', 1, 'Go Basic', 'https://ideogram.ai/pricing'),
(2, 13, 'Plus', '$20/mo', 'monthly', 0, 'Go Plus', 'https://ideogram.ai/pricing'),
(3, 13, 'Pro', '$60/mo', 'monthly', 0, 'Go Pro', 'https://ideogram.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 images/day' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Standard quality' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Shared generation queue' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 images/day' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Priority generation' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Private images' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Basic';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '400 images/day' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Faster generation' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1000 images/day' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Fastest generation' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 13 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 13;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 13, 'Best Text Rendering', 'Generates readable, accurate text in images far better than competitors.'),
(1, 13, 'Logo Design Excellence', 'Creates professional-looking logos with proper typography.'),
(2, 13, 'Improving Rapidly', 'Version 2.0 brought major quality improvements across all images.'),
(3, 13, 'Affordable Pricing', 'More cost-effective than Midjourney for similar capabilities.');

DELETE FROM tools_cons WHERE _parent_id = 13;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 13, 'General Quality Gap', 'Non-text images sometimes lag behind Midjourney/DALL-E.'),
(1, 13, 'Smaller Community', 'Less community resources and prompt sharing than competitors.'),
(2, 13, 'Limited Style Range', 'Best at specific use cases, less versatile overall.');

DELETE FROM tools_best_for WHERE _parent_id = 13;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 13, 'Graphic Designers', 'Text-heavy designs and typography work'),
(1, 13, 'Logo Creators', 'AI-assisted logo design with readable text'),
(2, 13, 'Marketers', 'Social media graphics with text overlays');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 13;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 13, 'Fine Art Creation', 'Midjourney better for artistic imagery'),
(1, 13, 'Photorealistic Needs', 'Flux or DALL-E may produce more realistic photos');

DELETE FROM tools_faqs WHERE _parent_id = 13;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 13, 'Why is Ideogram good for text?', 'Ideogram was specifically trained to understand typography and render text accurately. Most AI image tools treat text as visual patterns, causing errors.'),
(1, 13, 'Is Ideogram free?', 'Yes, Ideogram offers 10 free images per day. Paid plans start at $8/month for 100 images daily.'),
(2, 13, 'Ideogram vs Midjourney for logos?', 'Ideogram is better for logos with text. Midjourney is better for artistic, text-free logo concepts.'),
(3, 13, 'What is Ideogram 2.0?', 'Version 2.0 improved general image quality significantly while maintaining superior text rendering.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 13;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 13, 'Ideogram vs Midjourney'),
(1, 13, 'AI logo generator'),
(2, 13, 'text in AI images'),
(3, 13, 'Ideogram pricing');

-- ============================================
-- PIKA (id=14) - AI Video Generation
-- ============================================
UPDATE tools SET
  tagline = 'Create and edit AI videos with intuitive controls and creative effects',
  excerpt = 'Pika is an AI video platform that makes video generation accessible and fun. Known for its creative effects, intuitive interface, and ability to animate images or extend existing videos.',
  logo_url = 'https://logo.clearbit.com/pika.art',
  pricing_summary = 'Free: 250 credits. Unlimited $10/mo: 700 monthly + unlimited. Pro $35/mo: 2000 monthly + unlimited. Enterprise custom.',
  expert_verdict = 'Pika has found its niche as the approachable, creative-focused AI video tool. While it may not match Runway or Sora in raw quality, its unique effects (expand, modify, lip sync) and intuitive interface make it perfect for content creators who want quick, fun results. The Unlimited plan at $10/month is excellent value. For serious filmmaking, look elsewhere; for creative social content, Pika delivers.',
  verdict_summary = 'The creative, accessible AI video tool. Great effects and value pricing.',
  meta_title = 'Pika AI Review 2025: Pricing, Effects & Video Generation Features',
  meta_description = 'Pika AI video generator review with 2025 pricing (free-$35/mo), creative effects, and comparison to Runway. See how to create AI videos easily.',
  focus_keyword = 'Pika AI video',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.6,
  ratings_features = 4.4,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 14;

UPDATE tools SET
  stats_users = '8M+',
  stats_rating = 4.3,
  stats_company = 'Pika Labs',
  stats_launch_year = 2023
WHERE id = 14;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 14;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 14, 'Free', '$0', 'free', 0, 'Try Free', 'https://pika.art'),
(1, 14, 'Unlimited', '$10/mo', 'monthly', 1, 'Go Unlimited', 'https://pika.art/pricing'),
(2, 14, 'Pro', '$35/mo', 'monthly', 0, 'Go Pro', 'https://pika.art/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '250 credits one-time' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic video generation' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Watermarked output' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '700 monthly + unlimited slow' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Unlimited';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Unlimited';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Unlimited';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2000 monthly + unlimited slow' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Priority generation' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Higher resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 14 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 14;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 14, 'Intuitive Interface', 'Easy to use for beginners with drag-and-drop simplicity.'),
(1, 14, 'Creative Effects', 'Unique features like expand canvas, modify regions, and lip sync.'),
(2, 14, 'Great Value', '$10/month unlimited plan is exceptionally affordable.'),
(3, 14, 'Image Animation', 'Excellent at bringing still images to life.');

DELETE FROM tools_cons WHERE _parent_id = 14;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 14, 'Lower Quality Ceiling', 'Maximum quality below Runway or Sora.'),
(1, 14, 'Shorter Videos', '4-second clips limit narrative possibilities.'),
(2, 14, 'Less Control', 'Fewer professional controls than Runway.');

DELETE FROM tools_best_for WHERE _parent_id = 14;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 14, 'Social Media Creators', 'Quick, fun content for TikTok/Instagram'),
(1, 14, 'Beginners to AI Video', 'Most accessible learning curve'),
(2, 14, 'Budget-Conscious Creators', 'Best value pricing in the category');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 14;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 14, 'Professional Filmmakers', 'Runway or Sora offer higher quality'),
(1, 14, 'Long-Form Content', '4-second limit is restrictive');

DELETE FROM tools_faqs WHERE _parent_id = 14;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 14, 'Is Pika free?', 'Pika offers 250 free credits to start. After that, the Unlimited plan at $10/month offers excellent value.'),
(1, 14, 'Pika vs Runway: which is better?', 'Runway offers higher quality and longer videos. Pika is more affordable and user-friendly. Choose Runway for professional work, Pika for creative social content.'),
(2, 14, 'How long are Pika videos?', 'Pika generates 4-second video clips. You can extend by generating additional clips.'),
(3, 14, 'What makes Pika unique?', 'Pika excels at creative effects like canvas expansion, regional editing, and lip sync - features others lack.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 14;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 14, 'Pika vs Runway'),
(1, 14, 'Pika AI pricing'),
(2, 14, 'AI video effects'),
(3, 14, 'animate image AI');

-- ============================================
-- KLING AI (id=33) - AI Video Generation
-- ============================================
UPDATE tools SET
  tagline = 'Chinese AI video pioneer with impressive long-form generation',
  excerpt = 'Kling AI is Kuaishou''s advanced video generation model, notable for generating longer videos (up to 2 minutes) with good quality. One of the most capable free options available.',
  logo_url = 'https://logo.clearbit.com/klingai.com',
  pricing_summary = 'Free tier available with daily credits. Pro plans from $10/mo.',
  expert_verdict = 'Kling AI has surprised the industry with quality that rivals Western alternatives at a fraction of the cost. The free tier is generous, and the ability to generate longer videos sets it apart. Some content restrictions exist due to Chinese regulations. For budget-conscious creators who need longer AI videos, Kling is worth exploring.',
  verdict_summary = 'Impressive Chinese AI video tool with generous free tier and long video capability.',
  meta_title = 'Kling AI Review 2025: Free AI Video Generator with Long Videos',
  meta_description = 'Kling AI review with 2025 features, free tier, and comparison to Runway/Sora. See how to generate 2-minute AI videos free.',
  focus_keyword = 'Kling AI video',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.7,
  ratings_features = 4.4,
  ratings_support = 3.8,
  price_last_verified = '2025-12-23'
WHERE id = 33;

UPDATE tools SET
  stats_users = '20M+',
  stats_rating = 4.2,
  stats_company = 'Kuaishou Technology',
  stats_launch_year = 2024
WHERE id = 33;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 33;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 33, 'Free', '$0', 'free', 1, 'Try Free', 'https://klingai.com'),
(1, 33, 'Pro', '$10/mo', 'monthly', 0, 'Go Pro', 'https://klingai.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Daily free credits' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Up to 5 second videos' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '720p resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'More monthly credits' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Up to 2 minute videos' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '1080p resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 33 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 33;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 33, 'Generous Free Tier', 'More free generations than most competitors.'),
(1, 33, 'Long Video Generation', 'Up to 2 minutes - far longer than Runway or Pika.'),
(2, 33, 'Good Quality', 'Competitive quality with Western alternatives.'),
(3, 33, 'Affordable Pro', 'Pro tier cheaper than Runway/Sora.');

DELETE FROM tools_cons WHERE _parent_id = 33;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 33, 'Content Restrictions', 'Chinese regulations limit some content types.'),
(1, 33, 'Interface Language', 'Some UI elements may be in Chinese.'),
(2, 33, 'Data Privacy Concerns', 'Data stored on Chinese servers.');

DELETE FROM tools_best_for WHERE _parent_id = 33;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 33, 'Budget Creators', 'Best free AI video option'),
(1, 33, 'Long-Form Needs', 'Only option for 2-minute videos'),
(2, 33, 'Experimental Projects', 'Low-risk way to try AI video');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 33;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 33, 'Privacy-Sensitive Users', 'Chinese data storage may be a concern'),
(1, 33, 'Professional Productions', 'Runway/Sora still have quality edge');

DELETE FROM tools_faqs WHERE _parent_id = 33;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 33, 'Is Kling AI free?', 'Yes, Kling AI offers a generous free tier with daily credits for video generation.'),
(1, 33, 'How long can Kling AI videos be?', 'Free tier: up to 5 seconds. Pro: up to 2 minutes - significantly longer than competitors.'),
(2, 33, 'Is Kling AI safe to use?', 'Kling is developed by Kuaishou, a major Chinese tech company. Data is stored on Chinese servers. Evaluate based on your privacy requirements.'),
(3, 33, 'Kling vs Runway?', 'Kling offers longer videos and better free tier. Runway has more professional features and higher peak quality.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 33;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 33, 'Kling AI free'),
(1, 33, 'Chinese AI video generator'),
(2, 33, 'Kling vs Runway'),
(3, 33, 'long AI video');

-- ============================================
-- HAILUO AI (id=34) - AI Video Generation
-- ============================================
UPDATE tools SET
  tagline = 'MiniMax''s impressive AI video generator with excellent motion quality',
  excerpt = 'Hailuo AI (also known as MiniMax Video) is a Chinese AI video platform gaining attention for its natural motion, good physics simulation, and competitive quality against Western alternatives.',
  logo_url = 'https://logo.clearbit.com/hailuoai.video',
  pricing_summary = 'Free tier with daily credits. Premium tiers available.',
  expert_verdict = 'Hailuo AI has emerged as a dark horse in AI video generation. Its motion quality and physics understanding often surpass more established tools. The free tier is useful for testing, and the quality-to-cost ratio is excellent. Like other Chinese AI tools, consider data privacy implications. For creators seeking quality AI video without Western premium pricing, Hailuo deserves consideration.',
  verdict_summary = 'Rising star in AI video with excellent motion quality and physics.',
  meta_title = 'Hailuo AI Review 2025: MiniMax Video Generator Quality & Pricing',
  meta_description = 'Hailuo AI (MiniMax Video) review with 2025 features, free tier, and quality analysis. See how it compares to Runway and Kling.',
  focus_keyword = 'Hailuo AI video',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.6,
  ratings_features = 4.3,
  ratings_support = 3.7,
  price_last_verified = '2025-12-23'
WHERE id = 34;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.2,
  stats_company = 'MiniMax',
  stats_launch_year = 2024
WHERE id = 34;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 34;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 34, 'Free', '$0', 'free', 1, 'Try Free', 'https://hailuoai.video'),
(1, 34, 'Premium', 'Varies', 'monthly', 0, 'Go Premium', 'https://hailuoai.video');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Daily free credits' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Standard quality' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Basic features' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'More generations' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Higher resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority queue' FROM tools_pricing_tiers t WHERE t._parent_id = 34 AND t.name = 'Premium';

DELETE FROM tools_pros WHERE _parent_id = 34;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 34, 'Excellent Motion Quality', 'Natural, fluid movement that rivals top competitors.'),
(1, 34, 'Good Physics', 'Better understanding of real-world physics than many alternatives.'),
(2, 34, 'Free Tier Available', 'Can test quality without payment.'),
(3, 34, 'Rapid Improvement', 'MiniMax is iterating quickly on quality.');

DELETE FROM tools_cons WHERE _parent_id = 34;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 34, 'Less Established', 'Newer platform with less track record.'),
(1, 34, 'Chinese Platform', 'Data privacy considerations.'),
(2, 34, 'Limited Documentation', 'Less community resources in English.');

DELETE FROM tools_best_for WHERE _parent_id = 34;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 34, 'Quality Seekers', 'Excellent motion quality for the price'),
(1, 34, 'Budget Creators', 'Good free tier to start'),
(2, 34, 'Experimenters', 'Worth trying alongside other tools');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 34;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 34, 'Enterprise Users', 'Less established for professional workflows'),
(1, 34, 'Privacy-First Users', 'Chinese data storage');

DELETE FROM tools_faqs WHERE _parent_id = 34;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 34, 'What is Hailuo AI?', 'Hailuo AI is MiniMax''s AI video generation platform, known for natural motion and competitive quality.'),
(1, 34, 'Is Hailuo AI free?', 'Yes, Hailuo offers a free tier with daily credits. Premium options available for more generations.'),
(2, 34, 'Hailuo vs Kling AI?', 'Both are strong Chinese AI video tools. Kling offers longer videos; Hailuo often has better motion quality.'),
(3, 34, 'Is Hailuo AI safe?', 'Hailuo is developed by MiniMax, a funded Chinese AI company. Consider your data privacy requirements.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 34;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 34, 'MiniMax video'),
(1, 34, 'Hailuo vs Kling'),
(2, 34, 'free AI video generator'),
(3, 34, 'best Chinese AI video');
