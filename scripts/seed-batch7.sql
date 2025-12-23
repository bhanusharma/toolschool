-- Batch 7: Remaining Tools - 3D, Data, Chat, Music, Dev, and Other
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch7.sql

-- ============================================
-- MUBERT (id=1) - AI Music Generation
-- ============================================
UPDATE tools SET
  tagline = 'AI-generated royalty-free music for creators and brands',
  excerpt = 'Mubert generates unique, royalty-free music tracks for videos, apps, and commercial use. Set mood, tempo, and duration - AI creates custom soundtracks instantly.',
  logo_url = 'https://logo.clearbit.com/mubert.com',
  pricing_summary = 'Free: Personal use. Creator $14/mo: Commercial rights. Pro $39/mo: Extended license.',
  expert_verdict = 'Mubert fills a specific niche well: background music for content creators who need royalty-free tracks quickly. The AI generates listenable, genre-appropriate music that works for videos, podcasts, and apps. It''s not Suno or Udio quality, but the commercial licensing is cleaner. Good for ambient/background music; less suitable for hero tracks.',
  verdict_summary = 'Best for royalty-free background music. Quick generation with clear licensing.',
  meta_title = 'Mubert Review 2025: AI Music Generator for Royalty-Free Tracks',
  meta_description = 'Mubert AI review with 2025 pricing ($14-$39/mo), royalty-free music generation, and commercial licensing. Create background music instantly.',
  focus_keyword = 'Mubert AI',
  ratings_overall = 4.0,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.2,
  ratings_features = 3.9,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 1;

UPDATE tools SET
  stats_users = '1M+',
  stats_rating = 4.0,
  stats_company = 'Mubert Inc.',
  stats_launch_year = 2017
WHERE id = 1;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 1;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 1, 'Free', '$0', 'free', 0, 'Try Free', 'https://mubert.com'),
(1, 1, 'Creator', '$14/mo', 'monthly', 1, 'Go Creator', 'https://mubert.com/render/pricing'),
(2, 1, 'Pro', '$39/mo', 'monthly', 0, 'Go Pro', 'https://mubert.com/render/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Personal use only' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Mubert attribution required' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Commercial use' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No attribution' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Unlimited downloads' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Creator';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Extended license' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Broadcast rights' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 1 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 1;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 1, 'Clear Commercial Licensing', 'No copyright worries for content creators.'),
(1, 1, 'Instant Generation', 'Get custom tracks in seconds.'),
(2, 1, 'Customizable Parameters', 'Control mood, genre, tempo, and duration.');

DELETE FROM tools_cons WHERE _parent_id = 1;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 1, 'Background Music Focus', 'Not for creating hero/feature tracks.'),
(1, 1, 'Less Musical Depth', 'Tracks lack the sophistication of Suno/Udio.');

DELETE FROM tools_best_for WHERE _parent_id = 1;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 1, 'Video Creators', 'Quick background music for YouTube/TikTok'),
(1, 1, 'Podcasters', 'Intro/outro and background music'),
(2, 1, 'App Developers', 'In-app background audio');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 1;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 1, 'Music Producers', 'Suno/Udio offer more creative control'),
(1, 1, 'Vocal Tracks', 'No vocal generation');

DELETE FROM tools_faqs WHERE _parent_id = 1;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 1, 'Is Mubert free?', 'Mubert has a free tier for personal use with attribution. Commercial use requires Creator ($14/mo) or Pro ($39/mo).'),
(1, 1, 'Is Mubert music royalty-free?', 'Yes, paid plans include royalty-free licensing for commercial use including YouTube, podcasts, and advertising.'),
(2, 1, 'Mubert vs Suno?', 'Mubert is for background/ambient music with clean licensing. Suno creates full songs with vocals. Different use cases.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 1;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 1, 'royalty-free AI music'),
(1, 1, 'Mubert pricing'),
(2, 1, 'AI background music');

-- ============================================
-- REPLIT AI (id=5) - AI Coding Platform
-- ============================================
UPDATE tools SET
  tagline = 'Code, collaborate, and deploy with AI assistance in the browser',
  excerpt = 'Replit is a browser-based IDE with powerful AI features. Code in any language, get AI assistance, collaborate in real-time, and deploy apps instantly - all from your browser.',
  logo_url = 'https://logo.clearbit.com/replit.com',
  pricing_summary = 'Free: Basic features. Replit Core $25/mo: Advanced AI. Teams $40/user/mo.',
  expert_verdict = 'Replit has evolved from a simple online IDE into a powerful AI-assisted development platform. The AI Agent can build entire applications from descriptions, and the collaboration features rival dedicated tools. For learning, quick projects, and collaborative coding, Replit is excellent. For serious production development, local IDEs still have advantages.',
  verdict_summary = 'Best browser-based IDE with AI. Excellent for learning and quick projects.',
  meta_title = 'Replit AI Review 2025: Browser IDE Pricing & AI Features',
  meta_description = 'Replit AI review with 2025 pricing ($25/mo), AI Agent, and coding features. Build and deploy apps in your browser.',
  focus_keyword = 'Replit AI',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.3,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 5;

UPDATE tools SET
  stats_users = '25M+',
  stats_rating = 4.4,
  stats_company = 'Replit Inc.',
  stats_launch_year = 2016
WHERE id = 5;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 5;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 5, 'Free', '$0', 'free', 0, 'Start Free', 'https://replit.com'),
(1, 5, 'Replit Core', '$25/mo', 'monthly', 1, 'Go Core', 'https://replit.com/pricing'),
(2, 5, 'Teams', '$40/user/mo', 'monthly', 0, 'For Teams', 'https://replit.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Basic AI assistance' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Limited compute' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Public Repls only' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Advanced AI Agent' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Replit Core';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Private Repls' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Replit Core';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Boosted compute' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Replit Core';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Teams';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Shared projects' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Teams';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Admin controls' FROM tools_pricing_tiers t WHERE t._parent_id = 5 AND t.name = 'Teams';

DELETE FROM tools_pros WHERE _parent_id = 5;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 5, 'Zero Setup', 'Code in any language instantly - no installation needed.'),
(1, 5, 'AI Agent', 'Describe what you want, AI builds it.'),
(2, 5, 'Instant Deployment', 'Deploy apps with one click.'),
(3, 5, 'Real-Time Collaboration', 'Code together like Google Docs.');

DELETE FROM tools_cons WHERE _parent_id = 5;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 5, 'Browser Performance', 'Large projects can feel slow.'),
(1, 5, 'Limited for Production', 'Professional apps need traditional hosting.'),
(2, 5, 'Compute Limits', 'Free tier is resource-constrained.');

DELETE FROM tools_best_for WHERE _parent_id = 5;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 5, 'Learners', 'Best way to start coding'),
(1, 5, 'Quick Projects', 'Prototype and deploy fast'),
(2, 5, 'Educators', 'Share and collaborate on code');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 5;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 5, 'Production Apps', 'Traditional hosting more robust'),
(1, 5, 'Large Codebases', 'Local IDEs handle scale better');

DELETE FROM tools_faqs WHERE _parent_id = 5;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 5, 'Is Replit free?', 'Replit has a generous free tier. Replit Core at $25/month adds advanced AI and private projects.'),
(1, 5, 'What is Replit Agent?', 'Replit Agent is an AI that can build entire applications from natural language descriptions.'),
(2, 5, 'Replit vs VS Code?', 'Replit is browser-based with zero setup. VS Code is a local IDE with more power. Replit for learning; VS Code for production.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 5;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 5, 'online IDE'),
(1, 5, 'Replit Agent'),
(2, 5, 'browser coding');

-- ============================================
-- LUMA AI (id=67) - 3D Capture & Generation
-- ============================================
UPDATE tools SET
  tagline = 'Create 3D from photos and text with breakthrough AI',
  excerpt = 'Luma AI creates 3D assets from photos (NeRF technology) and text prompts. Capture real-world scenes in 3D or generate 3D models from descriptions.',
  logo_url = 'https://logo.clearbit.com/lumalabs.ai',
  pricing_summary = 'Free: Limited captures. Pro $30/mo: Unlimited captures. API pricing available.',
  expert_verdict = 'Luma AI represents genuine breakthrough technology. The ability to create 3D scenes from photos is magical - walk around your captures as if you were there. Text-to-3D generation is improving rapidly. For 3D artists, game developers, and anyone needing 3D assets, Luma is pushing boundaries.',
  verdict_summary = 'Revolutionary 3D capture and generation. Best photo-to-3D technology.',
  meta_title = 'Luma AI Review 2025: 3D Capture & Generation Pricing & Features',
  meta_description = 'Luma AI review with 2025 pricing ($30/mo), NeRF 3D capture, and text-to-3D generation. Create 3D from photos.',
  focus_keyword = 'Luma AI',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.3,
  ratings_features = 4.6,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 67;

UPDATE tools SET
  stats_users = '2M+',
  stats_rating = 4.4,
  stats_company = 'Luma AI',
  stats_launch_year = 2021
WHERE id = 67;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 67;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 67, 'Free', '$0', 'free', 0, 'Start Free', 'https://lumalabs.ai'),
(1, 67, 'Pro', '$30/mo', 'monthly', 1, 'Go Pro', 'https://lumalabs.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited captures' FROM tools_pricing_tiers t WHERE t._parent_id = 67 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic export options' FROM tools_pricing_tiers t WHERE t._parent_id = 67 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited captures' FROM tools_pricing_tiers t WHERE t._parent_id = 67 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'High-res export' FROM tools_pricing_tiers t WHERE t._parent_id = 67 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 67 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 67;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 67, 'Photo-to-3D Magic', 'Create explorable 3D scenes from phone photos.'),
(1, 67, 'Text-to-3D', 'Generate 3D models from text descriptions.'),
(2, 67, 'High Quality', 'NeRF technology produces impressive results.');

DELETE FROM tools_cons WHERE _parent_id = 67;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 67, 'Processing Time', '3D capture requires significant processing.'),
(1, 67, 'Export Limitations', 'Not all 3D formats supported.');

DELETE FROM tools_best_for WHERE _parent_id = 67;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 67, '3D Artists', 'Quick asset creation from photos'),
(1, 67, 'Game Developers', '3D environments from real locations'),
(2, 67, 'AR/VR Creators', 'Capture real-world scenes');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 67;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 67, 'Precision 3D Modeling', 'CAD tools for precise engineering'),
(1, 67, 'Animated Characters', 'Better tools for rigged characters');

DELETE FROM tools_faqs WHERE _parent_id = 67;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 67, 'Is Luma AI free?', 'Luma has a free tier with limited captures. Pro at $30/month offers unlimited captures.'),
(1, 67, 'How does Luma 3D capture work?', 'Luma uses NeRF (Neural Radiance Fields) to create 3D scenes from video or photos.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 67;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 67, 'NeRF 3D'),
(1, 67, 'photo to 3D'),
(2, 67, 'Luma pricing');

-- ============================================
-- MESHY (id=48) - 3D Model Generation
-- ============================================
UPDATE tools SET
  tagline = 'Generate 3D models from text and images with AI',
  excerpt = 'Meshy generates 3D models from text descriptions or images. Create game assets, product designs, and 3D art without traditional modeling skills.',
  logo_url = 'https://logo.clearbit.com/meshy.ai',
  pricing_summary = 'Free: 200 credits/month. Pro $20/mo: 1000 credits. Max $60/mo: 3500 credits.',
  expert_verdict = 'Meshy is leading the text-to-3D space with consistently improving quality. The models are game-ready and work in major 3D software. For indie game developers, designers, and 3D artists needing quick assets, Meshy delivers. Quality isn''t matching hand-crafted work yet, but for rapid prototyping and asset creation, it''s invaluable.',
  verdict_summary = 'Best text-to-3D generator. Game-ready models from descriptions.',
  meta_title = 'Meshy Review 2025: AI 3D Model Generator Pricing & Features',
  meta_description = 'Meshy AI review with 2025 pricing ($20-$60/mo), text-to-3D features, and model quality. Generate 3D assets from text.',
  focus_keyword = 'Meshy AI',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.4,
  ratings_features = 4.3,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 48;

UPDATE tools SET
  stats_users = '500K+',
  stats_rating = 4.3,
  stats_company = 'Meshy Inc.',
  stats_launch_year = 2023
WHERE id = 48;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 48;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 48, 'Free', '$0', 'free', 0, 'Start Free', 'https://meshy.ai'),
(1, 48, 'Pro', '$20/mo', 'monthly', 1, 'Go Pro', 'https://meshy.ai/pricing'),
(2, 48, 'Max', '$60/mo', 'monthly', 0, 'Go Max', 'https://meshy.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '200 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic textures' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1000 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'High-res textures' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '3500 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Priority generation' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 48 AND t.name = 'Max';

DELETE FROM tools_pros WHERE _parent_id = 48;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 48, 'Game-Ready Output', 'Models work in Unity, Unreal, Blender.'),
(1, 48, 'Image-to-3D', 'Convert 2D images to 3D models.'),
(2, 48, 'Improving Fast', 'Quality updates frequently.');

DELETE FROM tools_cons WHERE _parent_id = 48;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 48, 'Quality Variance', 'Some prompts produce better results than others.'),
(1, 48, 'Credit System', 'Heavy use can get expensive.');

DELETE FROM tools_best_for WHERE _parent_id = 48;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 48, 'Indie Game Devs', 'Quick asset creation'),
(1, 48, '3D Artists', 'Rapid prototyping and concepting');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 48;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 48, 'AAA Production', 'Hand-crafted models still superior');

DELETE FROM tools_faqs WHERE _parent_id = 48;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 48, 'Is Meshy free?', 'Meshy offers 200 free credits monthly. Pro at $20/month offers 1000 credits.'),
(1, 48, 'What formats does Meshy export?', 'GLB, FBX, OBJ, and USDZ for various 3D software and game engines.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 48;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 48, 'text to 3D'),
(1, 48, 'AI 3D generator'),
(2, 48, 'Meshy pricing');

-- ============================================
-- TRIPO AI (id=70) - 3D Model Generation
-- ============================================
UPDATE tools SET
  tagline = 'Fast AI 3D model generation from text and images',
  excerpt = 'Tripo AI generates 3D models quickly from text or images. Known for speed and quality, it produces game-ready assets with textures.',
  logo_url = 'https://logo.clearbit.com/tripo3d.ai',
  pricing_summary = 'Free: Limited generations. Pro $20/mo: More generations. API available.',
  expert_verdict = 'Tripo AI offers competitive 3D generation with fast processing times. Quality rivals Meshy, and the pricing is similar. Worth trying alongside Meshy to see which works better for your specific needs.',
  verdict_summary = 'Fast AI 3D generation. Good alternative to Meshy.',
  meta_title = 'Tripo AI Review 2025: Fast 3D Model Generator Pricing',
  meta_description = 'Tripo AI review with 2025 pricing, text-to-3D features, and comparison to Meshy. Fast 3D model generation.',
  focus_keyword = 'Tripo AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.3,
  ratings_features = 4.2,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 70;

UPDATE tools SET
  stats_users = '300K+',
  stats_rating = 4.2,
  stats_company = 'Tripo AI',
  stats_launch_year = 2023
WHERE id = 70;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 70;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 70, 'Free', '$0', 'free', 0, 'Try Free', 'https://tripo3d.ai'),
(1, 70, 'Pro', '$20/mo', 'monthly', 1, 'Go Pro', 'https://tripo3d.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited generations' FROM tools_pricing_tiers t WHERE t._parent_id = 70 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic export' FROM tools_pricing_tiers t WHERE t._parent_id = 70 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'More generations' FROM tools_pricing_tiers t WHERE t._parent_id = 70 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 70 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority queue' FROM tools_pricing_tiers t WHERE t._parent_id = 70 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 70;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 70, 'Fast Generation', 'Quick 3D model creation.'),
(1, 70, 'Good Quality', 'Competitive with leading alternatives.');

DELETE FROM tools_cons WHERE _parent_id = 70;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 70, 'Newer Platform', 'Less established than competitors.');

DELETE FROM tools_best_for WHERE _parent_id = 70;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 70, '3D Artists', 'Quick asset generation');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 70;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 70, 'Production Work', 'Consider more established tools');

DELETE FROM tools_faqs WHERE _parent_id = 70;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 70, 'Is Tripo AI free?', 'Tripo offers a free tier with limited generations. Pro starts at $20/month.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 70;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 70, 'Tripo vs Meshy'),
(1, 70, 'AI 3D model');

-- ============================================
-- POE (id=75) - AI Chat Aggregator
-- ============================================
UPDATE tools SET
  tagline = 'Access all AI models in one place - ChatGPT, Claude, and more',
  excerpt = 'Poe by Quora provides access to multiple AI models (GPT-4, Claude, Llama, and more) through a single interface. Compare responses, create custom bots, and switch between AIs freely.',
  logo_url = 'https://logo.clearbit.com/poe.com',
  pricing_summary = 'Free: Limited daily messages. Poe Premium $20/mo: Unlimited access to all models.',
  expert_verdict = 'Poe is the "cable bundle" of AI chat - one subscription for access to GPT-4, Claude, and others. For users who want to try multiple AIs without separate subscriptions, it''s excellent value. The custom bot creation adds unique value. Power users of one specific AI may prefer direct subscriptions, but for exploration and variety, Poe delivers.',
  verdict_summary = 'Best AI chat aggregator. Access multiple AIs with one subscription.',
  meta_title = 'Poe Review 2025: AI Chat Platform Pricing & All Models Access',
  meta_description = 'Poe review with 2025 pricing ($20/mo), access to GPT-4, Claude, and more. Compare AI models in one place.',
  focus_keyword = 'Poe AI',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.5,
  ratings_features = 4.3,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 75;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.3,
  stats_company = 'Quora Inc.',
  stats_launch_year = 2022
WHERE id = 75;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 75;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 75, 'Free', '$0', 'free', 0, 'Try Free', 'https://poe.com'),
(1, 75, 'Premium', '$20/mo', 'monthly', 1, 'Go Premium', 'https://poe.com/subscribe');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited daily messages' FROM tools_pricing_tiers t WHERE t._parent_id = 75 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Access to free models' FROM tools_pricing_tiers t WHERE t._parent_id = 75 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited messages' FROM tools_pricing_tiers t WHERE t._parent_id = 75 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'GPT-4, Claude, Llama' FROM tools_pricing_tiers t WHERE t._parent_id = 75 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Create custom bots' FROM tools_pricing_tiers t WHERE t._parent_id = 75 AND t.name = 'Premium';

DELETE FROM tools_pros WHERE _parent_id = 75;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 75, 'All AIs in One', 'Access GPT-4, Claude, and more without separate subscriptions.'),
(1, 75, 'Compare Responses', 'Ask the same question to multiple AIs.'),
(2, 75, 'Custom Bots', 'Create and share custom AI personalities.');

DELETE FROM tools_cons WHERE _parent_id = 75;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 75, 'Not Native Experience', 'Direct ChatGPT/Claude may have more features.'),
(1, 75, 'Message Limits', 'Heavy users may hit limits.');

DELETE FROM tools_best_for WHERE _parent_id = 75;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 75, 'AI Explorers', 'Try multiple AIs with one subscription'),
(1, 75, 'Comparison Shoppers', 'See which AI works best for you');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 75;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 75, 'Single AI Power Users', 'Direct subscriptions may offer more');

DELETE FROM tools_faqs WHERE _parent_id = 75;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 75, 'Is Poe free?', 'Poe has a free tier with limited messages. Premium at $20/month offers unlimited access to all models.'),
(1, 75, 'What AIs can I use on Poe?', 'Poe provides access to GPT-4, Claude, Llama, Gemini, and many other AI models.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 75;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 75, 'Poe vs ChatGPT Plus'),
(1, 75, 'AI chat aggregator'),
(2, 75, 'Poe pricing');

-- ============================================
-- PI (id=74) - Personal AI Assistant
-- ============================================
UPDATE tools SET
  tagline = 'Your personal AI companion for conversations and support',
  excerpt = 'Pi by Inflection AI is a personal AI designed for empathetic, supportive conversations. Unlike task-focused AIs, Pi prioritizes emotional intelligence and companionship.',
  logo_url = 'https://logo.clearbit.com/pi.ai',
  pricing_summary = 'Free with optional Pi+ subscription for enhanced features.',
  expert_verdict = 'Pi takes a refreshingly different approach to AI - it''s designed for conversation and emotional support rather than tasks. The AI feels warmer and more personable than ChatGPT or Claude. For those seeking an AI companion rather than a tool, Pi is unique. Limited utility for work tasks.',
  verdict_summary = 'Best personal AI companion. Empathetic conversations over productivity.',
  meta_title = 'Pi AI Review 2025: Personal AI Companion Features & Experience',
  meta_description = 'Pi AI review with features, conversational style, and comparison. The emotionally intelligent AI companion by Inflection.',
  focus_keyword = 'Pi AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.5,
  ratings_features = 4.0,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 74;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.2,
  stats_company = 'Inflection AI',
  stats_launch_year = 2023
WHERE id = 74;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 74;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 74, 'Free', '$0', 'free', 1, 'Meet Pi', 'https://pi.ai');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited conversations' FROM tools_pricing_tiers t WHERE t._parent_id = 74 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Voice conversations' FROM tools_pricing_tiers t WHERE t._parent_id = 74 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Mobile apps' FROM tools_pricing_tiers t WHERE t._parent_id = 74 AND t.name = 'Free';

DELETE FROM tools_pros WHERE _parent_id = 74;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 74, 'Emotionally Intelligent', 'Designed for empathy and understanding.'),
(1, 74, 'Natural Conversation', 'Feels like talking to a friend.'),
(2, 74, 'Free to Use', 'Full experience at no cost.');

DELETE FROM tools_cons WHERE _parent_id = 74;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 74, 'Limited Task Capability', 'Not built for work or complex tasks.'),
(1, 74, 'No Advanced Features', 'Simpler than ChatGPT/Claude.');

DELETE FROM tools_best_for WHERE _parent_id = 74;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 74, 'Seeking Companionship', 'AI that listens and supports'),
(1, 74, 'Casual Conversations', 'Friendly chat without productivity pressure');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 74;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 74, 'Work Tasks', 'Use ChatGPT or Claude'),
(1, 74, 'Research Needs', 'Limited knowledge capabilities');

DELETE FROM tools_faqs WHERE _parent_id = 74;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 74, 'Is Pi free?', 'Yes, Pi is free to use with unlimited conversations.'),
(1, 74, 'What is Pi good for?', 'Pi excels at supportive conversations, casual chat, and emotional support - not work tasks.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 74;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 74, 'Pi vs ChatGPT'),
(1, 74, 'personal AI'),
(2, 74, 'Inflection AI');

-- ============================================
-- GROK (id=76) - X AI Chatbot
-- ============================================
UPDATE tools SET
  tagline = 'Elon Musk''s unfiltered AI with real-time X/Twitter data',
  excerpt = 'Grok is xAI''s chatbot integrated with X (Twitter), known for its "fun mode" personality, real-time information access, and fewer content restrictions than competitors.',
  logo_url = 'https://logo.clearbit.com/x.ai',
  pricing_summary = 'Included with X Premium+ ($16/mo) or SuperGrok standalone subscription.',
  expert_verdict = 'Grok offers a unique proposition: real-time access to X/Twitter data and a less restrictive personality. "Fun mode" can be genuinely amusing. The real-time information is useful for current events. For X power users, Grok is a natural fit. Quality rivals but doesn''t exceed GPT-4 or Claude.',
  verdict_summary = 'X-integrated AI with personality. Real-time data and fewer filters.',
  meta_title = 'Grok Review 2025: xAI Chatbot Pricing, Features & X Integration',
  meta_description = 'Grok xAI review with 2025 pricing (X Premium+), real-time X data, and fun mode. Elon Musk''s AI chatbot.',
  focus_keyword = 'Grok AI',
  ratings_overall = 4.1,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.0,
  ratings_features = 4.2,
  ratings_support = 3.8,
  price_last_verified = '2025-12-23'
WHERE id = 76;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.1,
  stats_company = 'xAI',
  stats_launch_year = 2023
WHERE id = 76;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 76;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 76, 'X Premium+', '$16/mo', 'monthly', 1, 'Get Premium+', 'https://x.com/premium');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Grok access' FROM tools_pricing_tiers t WHERE t._parent_id = 76 AND t.name = 'X Premium+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Real-time X data' FROM tools_pricing_tiers t WHERE t._parent_id = 76 AND t.name = 'X Premium+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Fun mode personality' FROM tools_pricing_tiers t WHERE t._parent_id = 76 AND t.name = 'X Premium+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'X Premium+ benefits' FROM tools_pricing_tiers t WHERE t._parent_id = 76 AND t.name = 'X Premium+';

DELETE FROM tools_pros WHERE _parent_id = 76;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 76, 'Real-Time X Data', 'Access to current tweets and trends.'),
(1, 76, 'Fun Personality', 'Witty, unfiltered responses in fun mode.'),
(2, 76, 'Fewer Restrictions', 'Will discuss topics others decline.');

DELETE FROM tools_cons WHERE _parent_id = 76;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 76, 'X Subscription Required', 'Must pay for X Premium+.'),
(1, 76, 'Limited Ecosystem', 'Less integrated than ChatGPT or Claude.');

DELETE FROM tools_best_for WHERE _parent_id = 76;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 76, 'X Power Users', 'Already paying for Premium+'),
(1, 76, 'Current Events', 'Real-time information needs');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 76;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 76, 'Non-X Users', 'Bundle pricing less valuable'),
(1, 76, 'Work Tasks', 'ChatGPT/Claude more capable');

DELETE FROM tools_faqs WHERE _parent_id = 76;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 76, 'Is Grok free?', 'Grok requires X Premium+ ($16/month). No free tier available.'),
(1, 76, 'What makes Grok different?', 'Real-time X/Twitter data access and a more unfiltered, witty personality.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 76;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 76, 'Grok vs ChatGPT'),
(1, 76, 'xAI Grok'),
(2, 76, 'Elon Musk AI');

-- ============================================
-- SUDOWRITE (id=72) - AI Fiction Writing
-- ============================================
UPDATE tools SET
  tagline = 'AI writing assistant built specifically for fiction authors',
  excerpt = 'Sudowrite is an AI writing tool designed for novelists and fiction writers. Unlike general AI writers, it''s trained on storytelling and offers features like "Write" mode, "Describe" sensory details, and "Brainstorm" plot ideas.',
  logo_url = 'https://logo.clearbit.com/sudowrite.com',
  pricing_summary = 'Hobby $10/mo: 30K words. Professional $25/mo: 90K words. Max $100/mo: 300K words.',
  expert_verdict = 'Sudowrite understands fiction in a way general AI tools don''t. The "Describe" feature that expands sensory details and "Brainstorm" for plot ideas feel purpose-built for novelists. For fiction writers, especially those with writer''s block, Sudowrite is invaluable. Non-fiction writers should look elsewhere.',
  verdict_summary = 'Best AI for fiction writers. Purpose-built for storytelling.',
  meta_title = 'Sudowrite Review 2025: AI Fiction Writing Assistant Pricing',
  meta_description = 'Sudowrite review with 2025 pricing ($10-$100/mo), fiction writing features, and novelist tools. AI assistant for creative writing.',
  focus_keyword = 'Sudowrite',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.2,
  ratings_features = 4.4,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 72;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.3,
  stats_company = 'Sudowrite Inc.',
  stats_launch_year = 2020
WHERE id = 72;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 72;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 72, 'Hobby', '$10/mo', 'monthly', 0, 'Start Writing', 'https://sudowrite.com/pricing'),
(1, 72, 'Professional', '$25/mo', 'monthly', 1, 'Go Pro', 'https://sudowrite.com/pricing'),
(2, 72, 'Max', '$100/mo', 'monthly', 0, 'Go Max', 'https://sudowrite.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '30,000 words/month' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Hobby';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Write, Describe, Brainstorm' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Hobby';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '90,000 words/month' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Story Engine' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Canvas visualization' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Professional';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '300,000 words/month' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All features' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 72 AND t.name = 'Max';

DELETE FROM tools_pros WHERE _parent_id = 72;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 72, 'Fiction-Focused', 'Understands storytelling, not just text.'),
(1, 72, 'Useful Features', 'Describe, Brainstorm, Write modes are genuinely helpful.'),
(2, 72, 'Writer''s Block Cure', 'Excellent for getting unstuck.');

DELETE FROM tools_cons WHERE _parent_id = 72;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 72, 'Fiction Only', 'Not useful for non-fiction writing.'),
(1, 72, 'Word Limits', 'Can be restrictive for prolific writers.');

DELETE FROM tools_best_for WHERE _parent_id = 72;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 72, 'Novelists', 'Purpose-built for long-form fiction'),
(1, 72, 'Writers with Block', 'Excellent for getting unstuck');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 72;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 72, 'Non-Fiction Writers', 'Use Jasper or Copy.ai'),
(1, 72, 'Short Content', 'Overkill for blog posts');

DELETE FROM tools_faqs WHERE _parent_id = 72;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 72, 'Is Sudowrite good for fiction?', 'Yes, Sudowrite is specifically designed for fiction with features like Describe, Brainstorm, and Story Engine.'),
(1, 72, 'How is Sudowrite different from ChatGPT?', 'Sudowrite is trained on fiction and offers specialized tools for storytelling. ChatGPT is general-purpose.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 72;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 72, 'AI fiction writing'),
(1, 72, 'Sudowrite vs ChatGPT'),
(2, 72, 'AI for novelists');

-- ============================================
-- JULIUS AI (id=53) - Data Analysis
-- ============================================
UPDATE tools SET
  tagline = 'Chat with your data - AI-powered analysis for everyone',
  excerpt = 'Julius AI lets you upload data and ask questions in plain English. Generate charts, perform analysis, and get insights without knowing Python or SQL.',
  logo_url = 'https://logo.clearbit.com/julius.ai',
  pricing_summary = 'Free: Limited queries. Pro $20/mo: Unlimited analysis.',
  expert_verdict = 'Julius democratizes data analysis. Upload a CSV or connect a database, ask questions in English, and get visualizations and insights. For non-technical users who need data insights, Julius is transformative. Power users may want more control, but for quick analysis, it''s excellent.',
  verdict_summary = 'Best AI for non-technical data analysis. Natural language to insights.',
  meta_title = 'Julius AI Review 2025: Chat with Data Pricing & Features',
  meta_description = 'Julius AI review with 2025 pricing ($20/mo), data analysis, and visualization. Ask questions about your data in plain English.',
  focus_keyword = 'Julius AI',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.4,
  ratings_features = 4.2,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 53;

UPDATE tools SET
  stats_users = '500K+',
  stats_rating = 4.3,
  stats_company = 'Julius AI',
  stats_launch_year = 2022
WHERE id = 53;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 53;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 53, 'Free', '$0', 'free', 0, 'Try Free', 'https://julius.ai'),
(1, 53, 'Pro', '$20/mo', 'monthly', 1, 'Go Pro', 'https://julius.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited queries' FROM tools_pricing_tiers t WHERE t._parent_id = 53 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic visualizations' FROM tools_pricing_tiers t WHERE t._parent_id = 53 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited queries' FROM tools_pricing_tiers t WHERE t._parent_id = 53 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Advanced visualizations' FROM tools_pricing_tiers t WHERE t._parent_id = 53 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Data connections' FROM tools_pricing_tiers t WHERE t._parent_id = 53 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 53;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 53, 'Natural Language', 'Ask questions about data in plain English.'),
(1, 53, 'Auto Visualizations', 'Generates charts and graphs automatically.'),
(2, 53, 'No Code Required', 'Analysis without programming.');

DELETE FROM tools_cons WHERE _parent_id = 53;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 53, 'Limited for Complex Analysis', 'Power users may need traditional tools.'),
(1, 53, 'Data Size Limits', 'Very large datasets may be slow.');

DELETE FROM tools_best_for WHERE _parent_id = 53;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 53, 'Non-Technical Analysts', 'Data insights without coding'),
(1, 53, 'Quick Exploration', 'Fast analysis of new datasets');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 53;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 53, 'Data Scientists', 'Prefer Python/R for control'),
(1, 53, 'Production Pipelines', 'Not for automated workflows');

DELETE FROM tools_faqs WHERE _parent_id = 53;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 53, 'Is Julius AI free?', 'Julius has a free tier with limited queries. Pro at $20/month offers unlimited analysis.'),
(1, 53, 'What data can Julius analyze?', 'Julius works with CSVs, Excel files, and can connect to databases.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 53;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 53, 'AI data analysis'),
(1, 53, 'natural language data'),
(2, 53, 'Julius pricing');

-- ============================================
-- WARP AI (id=37) - AI Terminal
-- ============================================
UPDATE tools SET
  tagline = 'The AI-powered terminal for modern developers',
  excerpt = 'Warp is a reimagined terminal with AI built-in. Get command suggestions, fix errors, and learn shell commands through natural language - all in a fast, modern interface.',
  logo_url = 'https://logo.clearbit.com/warp.dev',
  pricing_summary = 'Free for individuals. Team $22/user/mo. Enterprise custom.',
  expert_verdict = 'Warp solves a real problem: the terminal is powerful but cryptic. Warp AI explains errors, suggests commands, and helps you learn. For developers who struggle with shell commands or want productivity boosts, Warp is excellent. Power users who know their shells may not need it.',
  verdict_summary = 'Best AI-powered terminal. Makes command line accessible.',
  meta_title = 'Warp Review 2025: AI Terminal Features & Pricing',
  meta_description = 'Warp AI terminal review with 2025 pricing (free), AI command suggestions, and modern interface. The smarter command line.',
  focus_keyword = 'Warp terminal',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.7,
  ratings_features = 4.4,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 37;

UPDATE tools SET
  stats_users = '1M+',
  stats_rating = 4.4,
  stats_company = 'Warp',
  stats_launch_year = 2022
WHERE id = 37;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 37;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 37, 'Free', '$0', 'free', 1, 'Download Free', 'https://warp.dev'),
(1, 37, 'Team', '$22/user/mo', 'monthly', 0, 'For Teams', 'https://warp.dev/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'AI command suggestions' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Error explanations' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Modern interface' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Shared workflows' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Admin controls' FROM tools_pricing_tiers t WHERE t._parent_id = 37 AND t.name = 'Team';

DELETE FROM tools_pros WHERE _parent_id = 37;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 37, 'AI Command Help', 'Ask what you want to do, get the command.'),
(1, 37, 'Error Explanations', 'Understand what went wrong.'),
(2, 37, 'Free for Individuals', 'Full features at no cost.');

DELETE FROM tools_cons WHERE _parent_id = 37;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 37, 'Mac Only', 'No Windows or Linux yet.'),
(1, 37, 'Learning Curve', 'Different from traditional terminals.');

DELETE FROM tools_best_for WHERE _parent_id = 37;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 37, 'Developers', 'Faster, smarter terminal'),
(1, 37, 'Terminal Learners', 'AI helps learn commands');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 37;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 37, 'Linux/Windows Users', 'Mac only for now'),
(1, 37, 'Minimal Setup Fans', 'More complex than basic terminals');

DELETE FROM tools_faqs WHERE _parent_id = 37;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 37, 'Is Warp free?', 'Yes, Warp is free for individuals with full AI features. Team plans start at $22/user/month.'),
(1, 37, 'Does Warp work on Linux?', 'Currently Mac only. Windows and Linux are in development.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 37;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 37, 'AI terminal'),
(1, 37, 'Warp vs iTerm'),
(2, 37, 'smart command line');
