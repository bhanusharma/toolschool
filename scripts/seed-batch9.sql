-- Batch 9: Final unique tools - Maker, Stability AI, Kaedim, CSM AI
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch9.sql

-- ============================================
-- MAKER (id=9) - Community AI Art Platform
-- ============================================

UPDATE tools SET
  tagline = 'Community-driven AI art platform for creating and sharing digital artwork',
  excerpt = 'Maker is a collaborative AI art platform that combines powerful generation tools with a vibrant community. Create stunning digital artwork, share your creations, and discover inspiration from artists worldwide.',
  pricing_summary = 'Free tier with premium features from $12/month',
  expert_verdict = 'Maker stands out for its community-first approach to AI art. While generation capabilities are solid, the real value lies in its social features, collaborative tools, and supportive artist community. Perfect for creators who want to share and get feedback on their work.',
  verdict_summary = 'Community-focused AI art platform. Great for social creators.',
  meta_title = 'Maker AI Art Platform Review 2025 | Community-Driven Creation',
  meta_description = 'Discover Maker, the community-focused AI art platform. Create, share, and collaborate on digital artwork. Free tier available.',
  focus_keyword = 'Maker AI art platform',
  ratings_overall = 4.0,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.1,
  ratings_features = 3.9,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 9;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.0,
  stats_company = 'Maker Inc.',
  stats_launch_year = 2023
WHERE id = 9;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 9;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 9, 'Free', '$0', 'forever', 0, 'Start Free', 'https://maker.ai'),
(1, 9, 'Creator', '$12/mo', 'monthly', 1, 'Upgrade', 'https://maker.ai/pricing'),
(2, 9, 'Pro Artist', '$29/mo', 'monthly', 0, 'Go Pro', 'https://maker.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50 generations per day' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic styles and models' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Community gallery access' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '500 generations per day' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All styles and models' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Private galleries' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Priority queue' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Creator';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited generations' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Pro Artist';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Commercial license' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Pro Artist';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Custom model training' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Pro Artist';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 9 AND t.name = 'Pro Artist';

DELETE FROM tools_pros WHERE _parent_id = 9;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 9, 'Strong Community', 'Active social features and collaborative tools.'),
(1, 9, 'Beginner Friendly', 'Intuitive interface for newcomers to AI art.'),
(2, 9, 'Good Free Tier', 'Generous free plan for casual creators.');

DELETE FROM tools_cons WHERE _parent_id = 9;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 9, 'Generation Quality', 'Below top-tier competitors like Midjourney.'),
(1, 9, 'Limited Controls', 'Fewer advanced options for power users.');

DELETE FROM tools_best_for WHERE _parent_id = 9;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 9, 'Hobbyist Artists', 'Great community and social features'),
(1, 9, 'Beginners', 'Easy to learn AI art creation');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 9;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 9, 'Commercial Artists', 'Quality below professional standards'),
(1, 9, 'Power Users', 'Limited advanced controls');

DELETE FROM tools_faqs WHERE _parent_id = 9;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 9, 'Is Maker free to use?', 'Yes, Maker offers a free tier with 50 generations per day and access to basic features and the community gallery.'),
(1, 9, 'Can I sell art created with Maker?', 'Commercial rights require the Pro Artist plan at $29/month.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 9;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 9, 'AI art community'),
(1, 9, 'social AI art platform'),
(2, 9, 'collaborative AI art');


-- ============================================
-- STABILITY AI (id=17) - Stable Diffusion Company
-- ============================================

UPDATE tools SET
  tagline = 'The company behind Stable Diffusion, offering enterprise AI image generation APIs',
  excerpt = 'Stability AI is the pioneering company behind Stable Diffusion, the revolutionary open-source image generation model. Their enterprise platform provides API access to state-of-the-art models including SDXL, SD3, and specialized models.',
  pricing_summary = 'API pricing from $0.002/image, enterprise plans available',
  expert_verdict = 'Stability AI offers the most flexible and cost-effective API access to top-tier image generation models. As the creators of Stable Diffusion, they provide cutting-edge technology with transparent pricing. Best for developers and businesses needing scalable, affordable AI image generation.',
  verdict_summary = 'Industry-leading image generation APIs at competitive prices.',
  meta_title = 'Stability AI Review 2025 | Stable Diffusion API & Enterprise Solutions',
  meta_description = 'Explore Stability AI, creators of Stable Diffusion. Access SDXL, SD3, and more via API. Enterprise-grade image generation from $0.002/image.',
  focus_keyword = 'Stability AI API',
  ratings_overall = 4.4,
  ratings_ease_of_use = 3.8,
  ratings_value_for_money = 4.6,
  ratings_features = 4.7,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 17;

UPDATE tools SET
  stats_users = '1M+',
  stats_rating = 4.4,
  stats_company = 'Stability AI',
  stats_launch_year = 2022
WHERE id = 17;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 17;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 17, 'Free Trial', '$0', 'forever', 0, 'Try Free', 'https://stability.ai'),
(1, 17, 'Pay As You Go', '$0.002/image', 'usage', 1, 'Get Started', 'https://stability.ai/pricing'),
(2, 17, 'Enterprise', 'Custom', 'annual', 0, 'Contact Sales', 'https://stability.ai/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '25 free credits to start' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Free Trial';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Access to all public models' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Free Trial';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'API documentation' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Free Trial';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'SDXL from $0.002/image' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Pay As You Go';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'SD3 from $0.035/image' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Pay As You Go';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Image upscaling' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Pay As You Go';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'No commitment' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Pay As You Go';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Volume discounts' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Custom model fine-tuning' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Dedicated infrastructure' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'SLA guarantees' FROM tools_pricing_tiers t WHERE t._parent_id = 17 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 17;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 17, 'Industry-Leading Models', 'SDXL and SD3 are top-tier image generators.'),
(1, 17, 'Competitive Pricing', 'Most affordable API pricing in the market.'),
(2, 17, 'Flexible Usage', 'Pay only for what you use.');

DELETE FROM tools_cons WHERE _parent_id = 17;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 17, 'Developer-Only', 'Requires programming skills to use API.'),
(1, 17, 'No GUI', 'No consumer-facing application.');

DELETE FROM tools_best_for WHERE _parent_id = 17;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 17, 'Developers', 'Excellent API for building AI apps'),
(1, 17, 'Startups', 'Scalable and cost-effective');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 17;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 17, 'Non-Technical Users', 'Requires coding knowledge'),
(1, 17, 'Casual Creators', 'No visual interface');

DELETE FROM tools_faqs WHERE _parent_id = 17;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 17, 'What is the difference between Stability AI and Stable Diffusion?', 'Stability AI is the company that created and maintains Stable Diffusion. They offer API access to their models including SDXL and SD3.'),
(1, 17, 'How much does Stability AI API cost?', 'Pricing starts at $0.002 per image for SDXL and $0.035 for SD3. Volume discounts available.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 17;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 17, 'Stable Diffusion API'),
(1, 17, 'SDXL API'),
(2, 17, 'SD3 API pricing');


-- ============================================
-- KAEDIM (id=68) - 2D to 3D AI Conversion
-- ============================================

UPDATE tools SET
  tagline = 'Transform 2D images into production-ready 3D models with AI',
  excerpt = 'Kaedim uses advanced AI to convert 2D images and concept art into high-quality 3D models. Trusted by game studios and product designers, it dramatically reduces 3D asset creation time from hours to minutes.',
  pricing_summary = 'From $15/model, subscription plans from $99/month',
  expert_verdict = 'Kaedim excels at converting concept art and product images into usable 3D models. While it cannot replace skilled 3D artists for complex work, it is transformative for rapid prototyping, game development pipelines, and e-commerce product visualization.',
  verdict_summary = 'Best 2D to 3D conversion tool. Great for game dev and e-commerce.',
  meta_title = 'Kaedim Review 2025 | AI 2D to 3D Model Conversion Tool',
  meta_description = 'Convert 2D images to 3D models with Kaedim AI. Perfect for game dev, e-commerce, and product design. From $15/model.',
  focus_keyword = 'Kaedim 2D to 3D AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.0,
  ratings_features = 4.3,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 68;

UPDATE tools SET
  stats_users = '50K+',
  stats_rating = 4.2,
  stats_company = 'Kaedim',
  stats_launch_year = 2021
WHERE id = 68;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 68;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 68, 'Pay Per Model', '$15', 'per model', 0, 'Try Now', 'https://kaedim.com'),
(1, 68, 'Starter', '$99/mo', 'monthly', 1, 'Subscribe', 'https://kaedim.com/pricing'),
(2, 68, 'Pro', '$299/mo', 'monthly', 0, 'Go Pro', 'https://kaedim.com/pricing'),
(3, 68, 'Enterprise', 'Custom', 'annual', 0, 'Contact Sales', 'https://kaedim.com/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Single model generation' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pay Per Model';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Standard quality' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pay Per Model';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'FBX and OBJ exports' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pay Per Model';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 models per month' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'High quality output' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'All export formats' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Priority processing' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50 models per month' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Maximum quality' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Texture generation' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited models' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Custom pipeline' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Dedicated support' FROM tools_pricing_tiers t WHERE t._parent_id = 68 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 68;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 68, 'Excellent Accuracy', 'High-quality 2D to 3D conversion.'),
(1, 68, 'Production Ready', 'Output suitable for games and apps.'),
(2, 68, 'Fast Turnaround', 'Models ready in minutes.');

DELETE FROM tools_cons WHERE _parent_id = 68;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 68, 'Price Adds Up', 'Can be expensive at volume.'),
(1, 68, 'No Rigging', 'Animation rigging not included.');

DELETE FROM tools_best_for WHERE _parent_id = 68;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 68, 'Game Developers', 'Rapid 3D asset creation'),
(1, 68, 'E-commerce Teams', 'Product visualization');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 68;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 68, 'Architects', 'Not suited for detailed buildings'),
(1, 68, 'Animators', 'No rigging included');

DELETE FROM tools_faqs WHERE _parent_id = 68;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 68, 'How accurate is Kaedim 2D to 3D conversion?', 'Kaedim produces highly accurate 3D models from 2D images, especially for characters and products.'),
(1, 68, 'What file formats does Kaedim export?', 'Kaedim exports to FBX, OBJ, GLTF, and other common 3D formats.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 68;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 68, '2D to 3D converter'),
(1, 68, 'AI 3D model generation'),
(2, 68, 'image to 3D model');


-- ============================================
-- CSM AI (id=69) - 3D Generation from Images
-- ============================================

UPDATE tools SET
  tagline = 'Generate detailed 3D models from single images using AI',
  excerpt = 'CSM AI (Common Sense Machines) creates high-fidelity 3D models from single images or text descriptions. Their technology excels at capturing intricate details and producing game-ready assets.',
  pricing_summary = 'Free tier available, Pro from $20/month',
  expert_verdict = 'CSM AI delivers impressive 3D model quality from minimal input. The free tier is generous enough for experimentation, and the paid plans offer excellent value for professional use. Particularly strong at organic shapes and characters.',
  verdict_summary = 'Excellent free 3D generator. Great for organic shapes.',
  meta_title = 'CSM AI Review 2025 | Image to 3D Model Generator',
  meta_description = 'Create detailed 3D models from images with CSM AI. Free tier available. Perfect for game dev and 3D artists.',
  focus_keyword = 'CSM AI 3D generator',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.5,
  ratings_features = 4.4,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 69;

UPDATE tools SET
  stats_users = '200K+',
  stats_rating = 4.3,
  stats_company = 'Common Sense Machines',
  stats_launch_year = 2022
WHERE id = 69;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 69;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 69, 'Free', '$0', 'forever', 0, 'Start Free', 'https://csm.ai'),
(1, 69, 'Pro', '$20/mo', 'monthly', 1, 'Upgrade', 'https://csm.ai/pricing'),
(2, 69, 'Team', '$50/mo', 'monthly', 0, 'Team Plan', 'https://csm.ai/pricing'),
(3, 69, 'Enterprise', 'Custom', 'annual', 0, 'Contact Sales', 'https://csm.ai/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 models per month' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Standard resolution' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'GLB export' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 models per month' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'High resolution output' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'All export formats' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Texture generation' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '500 models per month' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '3 team members' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Shared workspace' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Team';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited generations' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Custom model training' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'On-premise deployment' FROM tools_pricing_tiers t WHERE t._parent_id = 69 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 69;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 69, 'Excellent Detail', 'Captures fine details from single images.'),
(1, 69, 'Generous Free Tier', '10 free models per month.'),
(2, 69, 'Good Value', 'Affordable Pro plan at $20/mo.');

DELETE FROM tools_cons WHERE _parent_id = 69;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 69, 'Hard Surfaces', 'Less accurate for mechanical objects.'),
(1, 69, 'Processing Time', 'Can be slow at peak times.');

DELETE FROM tools_best_for WHERE _parent_id = 69;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 69, 'Game Developers', 'Quick 3D asset generation'),
(1, 69, '3D Hobbyists', 'Great free tier for learning');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 69;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 69, 'CAD Users', 'Not for precise mechanical models'),
(1, 69, 'Impatient Users', 'Processing can take time');

DELETE FROM tools_faqs WHERE _parent_id = 69;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 69, 'Is CSM AI free?', 'Yes, CSM AI offers a free tier with 10 models per month. Enough for testing and light personal use.'),
(1, 69, 'Can I use CSM AI models commercially?', 'Yes, all paid plans include commercial usage rights.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 69;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 69, 'image to 3D AI'),
(1, 69, 'CSM 3D model generator'),
(2, 69, 'free AI 3D generator');
