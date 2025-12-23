-- Batch 6: Design, Presentation, and Automation Tools
-- Adobe Firefly (id=42), Canva Magic Studio (id=43), Figma AI (id=41), Gamma (id=45), Tome (id=46)
-- Framer AI (id=52), Make (id=58), n8n (id=59), Bardeen (id=60), Zapier AI (id=39)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch6.sql

-- ============================================
-- ADOBE FIREFLY (id=42) - AI Image Generation
-- ============================================
UPDATE tools SET
  tagline = 'Adobe''s creative AI with commercial-safe generated images',
  excerpt = 'Adobe Firefly is Adobe''s generative AI, integrated across Creative Cloud apps. Generate images, effects, and text styles with commercially-safe, ethically-trained AI models.',
  logo_url = 'https://logo.clearbit.com/adobe.com',
  pricing_summary = 'Free: 25 credits/month. Firefly Premium $5/mo: 100 credits. Included in Creative Cloud ($55+/mo).',
  expert_verdict = 'Firefly is Adobe''s answer to Midjourney, and it''s a compelling option for Creative Cloud users. The commercial licensing is bulletproof - Adobe indemnifies users against copyright claims. Quality is good but not quite Midjourney-level for artistic work. The integration into Photoshop, Illustrator, and other Adobe apps is genuinely useful. For Creative Cloud subscribers, it''s essentially a free bonus.',
  verdict_summary = 'Commercially-safe AI images with Adobe integration. Best for Creative Cloud users.',
  meta_title = 'Adobe Firefly Review 2025: AI Image Generator Pricing & Features',
  meta_description = 'Adobe Firefly review with 2025 pricing (free-$5/mo), commercial licensing, and Creative Cloud integration. Safe AI images for professionals.',
  focus_keyword = 'Adobe Firefly review',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.4,
  ratings_features = 4.2,
  ratings_support = 4.4,
  price_last_verified = '2025-12-23'
WHERE id = 42;

UPDATE tools SET
  stats_users = '50M+',
  stats_rating = 4.3,
  stats_company = 'Adobe Inc.',
  stats_launch_year = 2023
WHERE id = 42;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 42;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 42, 'Free', '$0', 'free', 0, 'Try Free', 'https://firefly.adobe.com'),
(1, 42, 'Firefly Premium', '$5/mo', 'monthly', 1, 'Go Premium', 'https://firefly.adobe.com/pricing'),
(2, 42, 'Creative Cloud', '$55+/mo', 'monthly', 0, 'Get Creative Cloud', 'https://adobe.com/creativecloud');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '25 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Commercial use' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Web access only' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Firefly Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'IP indemnification' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Firefly Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Premium models' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Firefly Premium';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Firefly in all apps' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Creative Cloud';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '1000+ credits/month' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Creative Cloud';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Full Adobe apps' FROM tools_pricing_tiers t WHERE t._parent_id = 42 AND t.name = 'Creative Cloud';

DELETE FROM tools_pros WHERE _parent_id = 42;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 42, 'Commercial Safety', 'IP indemnification protects against copyright claims.'),
(1, 42, 'Adobe Integration', 'Works seamlessly in Photoshop, Illustrator, and other apps.'),
(2, 42, 'Ethical Training', 'Trained only on Adobe Stock and public domain images.'),
(3, 42, 'Affordable Premium', 'Just $5/month for 100 credits.');

DELETE FROM tools_cons WHERE _parent_id = 42;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 42, 'Not Midjourney Quality', 'Artistic quality below top competitors.'),
(1, 42, 'Credit System', 'Can run out of credits quickly.'),
(2, 42, 'Adobe Ecosystem Lock', 'Best value requires Creative Cloud subscription.');

DELETE FROM tools_best_for WHERE _parent_id = 42;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 42, 'Creative Cloud Users', 'Included with subscription'),
(1, 42, 'Commercial Projects', 'Safe for client work with IP indemnification'),
(2, 42, 'Adobe Workflow Users', 'Seamless integration');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 42;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 42, 'Artistic Quality First', 'Midjourney produces more impressive art'),
(1, 42, 'Non-Adobe Users', 'Less value without Creative Cloud');

DELETE FROM tools_faqs WHERE _parent_id = 42;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 42, 'Is Adobe Firefly free?', 'Yes, Adobe offers 25 free credits monthly. Premium at $5/month offers 100 credits. Creative Cloud subscribers get more.'),
(1, 42, 'Is Firefly safe for commercial use?', 'Yes, Adobe provides IP indemnification, making Firefly one of the safest options for commercial projects.'),
(2, 42, 'Firefly vs Midjourney?', 'Midjourney produces more impressive artistic results. Firefly is safer commercially and integrates with Adobe apps.'),
(3, 42, 'How is Firefly trained?', 'Firefly is trained only on Adobe Stock images, openly licensed content, and public domain works.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 42;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 42, 'Adobe Firefly vs Midjourney'),
(1, 42, 'Firefly commercial use'),
(2, 42, 'Adobe AI image generator'),
(3, 42, 'Firefly pricing');

-- ============================================
-- CANVA MAGIC STUDIO (id=43) - AI Design
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered design tools for everyone - create anything instantly',
  excerpt = 'Canva Magic Studio is Canva''s AI feature suite, including Magic Design, Magic Write, Background Remover, and more. Generate complete designs, edit images, and create content with AI assistance.',
  logo_url = 'https://logo.clearbit.com/canva.com',
  pricing_summary = 'Free: Limited Magic features. Canva Pro $15/mo: Full Magic Studio access.',
  expert_verdict = 'Canva Magic Studio democratizes AI design for non-designers. Magic Design generates complete social posts, presentations, and videos from a single prompt. The quality is "good enough" for most business needs, though designers may want more control. At $15/month for Pro (which includes much more than AI), it''s excellent value for small businesses and creators.',
  verdict_summary = 'Best AI design for non-designers. Magic Studio makes creation effortless.',
  meta_title = 'Canva Magic Studio Review 2025: AI Design Features & Pricing',
  meta_description = 'Canva Magic Studio review with 2025 features, Magic Design, and Pro pricing ($15/mo). AI design tools for everyone.',
  focus_keyword = 'Canva Magic Studio',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.9,
  ratings_value_for_money = 4.7,
  ratings_features = 4.4,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 43;

UPDATE tools SET
  stats_users = '180M+',
  stats_rating = 4.5,
  stats_company = 'Canva Pty Ltd',
  stats_launch_year = 2023
WHERE id = 43;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 43;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 43, 'Free', '$0', 'free', 0, 'Start Free', 'https://canva.com'),
(1, 43, 'Canva Pro', '$15/mo', 'monthly', 1, 'Go Pro', 'https://canva.com/pro');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited AI features' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic Magic Write' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Core design features' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Full Magic Studio' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Canva Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Magic Design (unlimited)' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Canva Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Background Remover' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Canva Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Brand Kit' FROM tools_pricing_tiers t WHERE t._parent_id = 43 AND t.name = 'Canva Pro';

DELETE FROM tools_pros WHERE _parent_id = 43;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 43, 'Incredibly Easy', 'Generate complete designs with a single prompt.'),
(1, 43, 'All-in-One Platform', 'Design, edit, write, and present in one tool.'),
(2, 43, 'Great Value', '$15/month includes AI plus full Canva Pro features.'),
(3, 43, 'Template Library', 'Millions of professional templates to start from.');

DELETE FROM tools_cons WHERE _parent_id = 43;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 43, 'Limited Customization', 'Designers may find AI suggestions limiting.'),
(1, 43, 'Template Dependency', 'Results often look "Canva-like" rather than unique.'),
(2, 43, 'Free Tier Limited', 'Best AI features require Pro subscription.');

DELETE FROM tools_best_for WHERE _parent_id = 43;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 43, 'Small Businesses', 'Professional designs without a designer'),
(1, 43, 'Social Media Managers', 'Rapid content creation'),
(2, 43, 'Non-Designers', 'Anyone can create professional content');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 43;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 43, 'Professional Designers', 'Figma or Adobe offer more control'),
(1, 43, 'Unique Brand Needs', 'Results can feel templated');

DELETE FROM tools_faqs WHERE _parent_id = 43;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 43, 'Is Canva Magic Studio free?', 'Basic AI features are free. Full Magic Studio requires Canva Pro at $15/month.'),
(1, 43, 'What is Magic Design?', 'Magic Design generates complete designs (social posts, presentations, videos) from a text prompt or uploaded image.'),
(2, 43, 'Canva vs Adobe Express?', 'Canva is more beginner-friendly with better AI. Adobe Express integrates better with Creative Cloud.'),
(3, 43, 'Can Magic Studio create videos?', 'Yes, Magic Studio can generate and edit videos with AI assistance.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 43;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 43, 'Canva AI features'),
(1, 43, 'Magic Design'),
(2, 43, 'Canva Pro pricing'),
(3, 43, 'Canva vs Adobe Express');

-- ============================================
-- FIGMA AI (id=41) - AI Design Tool
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered features for the leading collaborative design tool',
  excerpt = 'Figma AI brings artificial intelligence to the world''s most popular design tool. Generate designs from prompts, rename layers automatically, and streamline design workflows with AI assistance.',
  logo_url = 'https://logo.clearbit.com/figma.com',
  pricing_summary = 'Starter free. Professional $15/editor/mo. Organization $45/editor/mo with AI.',
  expert_verdict = 'Figma AI is still evolving, but the integration into an already-excellent design tool is promising. Current features focus on productivity (auto-naming, search) rather than generation. For Figma users, the AI features are nice-to-have additions. For AI-first design generation, Canva Magic Studio is currently more capable.',
  verdict_summary = 'AI enhancements for Figma users. Productivity-focused rather than generative.',
  meta_title = 'Figma AI Review 2025: AI Design Features & Pricing',
  meta_description = 'Figma AI review with 2025 features, pricing ($15-$45/mo), and comparison to Canva. AI-powered design collaboration.',
  focus_keyword = 'Figma AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.0,
  ratings_features = 4.1,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 41;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.2,
  stats_company = 'Figma Inc. (Adobe)',
  stats_launch_year = 2024
WHERE id = 41;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 41;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 41, 'Starter', '$0', 'free', 0, 'Start Free', 'https://figma.com'),
(1, 41, 'Professional', '$15/editor/mo', 'monthly', 1, 'Go Pro', 'https://figma.com/pricing'),
(2, 41, 'Organization', '$45/editor/mo', 'monthly', 0, 'For Teams', 'https://figma.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '3 projects' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic AI features' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited projects' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Team libraries' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Full AI features' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Professional';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Advanced AI' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Organization';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Design system analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Organization';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'SSO & governance' FROM tools_pricing_tiers t WHERE t._parent_id = 41 AND t.name = 'Organization';

DELETE FROM tools_pros WHERE _parent_id = 41;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 41, 'Figma Integration', 'AI built into the best collaborative design tool.'),
(1, 41, 'Productivity Features', 'Auto-naming, smart search, and workflow automation.'),
(2, 41, 'Real-Time Collaboration', 'AI-assisted design with live collaboration.');

DELETE FROM tools_cons WHERE _parent_id = 41;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 41, 'Limited Generation', 'Not as powerful for AI design generation as dedicated tools.'),
(1, 41, 'Still Evolving', 'AI features are newer and less mature.'),
(2, 41, 'Professional Required', 'Best AI features need paid subscription.');

DELETE FROM tools_best_for WHERE _parent_id = 41;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 41, 'Figma Users', 'AI enhancements to existing workflow'),
(1, 41, 'Design Teams', 'Productivity improvements for collaboration'),
(2, 41, 'Product Designers', 'AI-assisted UI/UX design');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 41;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 41, 'AI-First Generation', 'Canva Magic Studio is more capable'),
(1, 41, 'Non-Designers', 'Learning curve for Figma itself');

DELETE FROM tools_faqs WHERE _parent_id = 41;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 41, 'Is Figma AI free?', 'Basic AI features are included in free Starter plan. Advanced AI requires Professional ($15/mo) or Organization ($45/mo).'),
(1, 41, 'What can Figma AI do?', 'Auto-rename layers, smart search, visual search, and some generative features. More capabilities are being added.'),
(2, 41, 'Figma AI vs Canva?', 'Figma is for professional designers; Canva is for everyone. Canva has more AI generation; Figma has better design precision.'),
(3, 41, 'Is Figma owned by Adobe?', 'Adobe announced acquisition of Figma in 2022, but the deal was terminated in 2023 due to regulatory concerns.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 41;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 41, 'Figma AI features'),
(1, 41, 'Figma vs Canva'),
(2, 41, 'Figma pricing'),
(3, 41, 'AI design tool');

-- ============================================
-- GAMMA (id=45) - AI Presentations
-- ============================================
UPDATE tools SET
  tagline = 'Create beautiful presentations with AI - just describe your idea',
  excerpt = 'Gamma is an AI-powered presentation tool that creates slides, documents, and webpages from prompts. Describe your topic, and AI generates a complete, designed presentation.',
  logo_url = 'https://logo.clearbit.com/gamma.app',
  pricing_summary = 'Free: 400 credits. Plus $10/mo: Unlimited AI. Pro $20/mo: Advanced features.',
  expert_verdict = 'Gamma has genuinely changed how presentations are made. Describe your topic, and it generates a complete deck with real content - not just placeholders. The designs are modern and professional. For anyone who dreads building slides, Gamma is transformative. The free tier is generous enough to test thoroughly.',
  verdict_summary = 'Best AI presentation tool. Create complete decks from a single prompt.',
  meta_title = 'Gamma AI Review 2025: Presentation Generator Pricing & Features',
  meta_description = 'Gamma AI review with 2025 pricing (free-$20/mo), presentation generation, and comparison to PowerPoint. Create slides with AI.',
  focus_keyword = 'Gamma AI',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.6,
  ratings_features = 4.4,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 45;

UPDATE tools SET
  stats_users = '15M+',
  stats_rating = 4.5,
  stats_company = 'Gamma Tech Inc.',
  stats_launch_year = 2022
WHERE id = 45;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 45;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 45, 'Free', '$0', 'free', 0, 'Start Free', 'https://gamma.app'),
(1, 45, 'Plus', '$10/mo', 'monthly', 1, 'Go Plus', 'https://gamma.app/pricing'),
(2, 45, 'Pro', '$20/mo', 'monthly', 0, 'Go Pro', 'https://gamma.app/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '400 AI credits' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Gamma branding' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Basic templates' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited AI' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No Gamma branding' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Export to PDF/PPT' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom fonts' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Password protection' FROM tools_pricing_tiers t WHERE t._parent_id = 45 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 45;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 45, 'Truly Automated', 'Generates complete presentations with real content, not placeholders.'),
(1, 45, 'Modern Design', 'Professional, contemporary templates and styling.'),
(2, 45, 'Web-Native', 'Presentations work beautifully online with interactions.'),
(3, 45, 'Generous Free Tier', '400 credits allows substantial testing.');

DELETE FROM tools_cons WHERE _parent_id = 45;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 45, 'Limited Customization', 'Less control than PowerPoint for specific formatting.'),
(1, 45, 'Online Only', 'Requires internet connection to use.'),
(2, 45, 'Export Limitations', 'Exported PPTs may need cleanup.');

DELETE FROM tools_best_for WHERE _parent_id = 45;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 45, 'Startup Founders', 'Quick pitch decks and investor presentations'),
(1, 45, 'Marketers', 'Rapid campaign and strategy presentations'),
(2, 45, 'Educators', 'Create engaging lesson content');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 45;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 45, 'Brand-Specific Needs', 'Limited branding customization'),
(1, 45, 'PowerPoint Power Users', 'Less precise control');

DELETE FROM tools_faqs WHERE _parent_id = 45;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 45, 'Is Gamma free?', 'Yes, Gamma offers 400 free AI credits to start. Plus at $10/month offers unlimited AI generation.'),
(1, 45, 'Gamma vs PowerPoint?', 'Gamma creates presentations from prompts automatically. PowerPoint requires manual slide building. Gamma is faster; PowerPoint offers more control.'),
(2, 45, 'Can I export Gamma to PowerPoint?', 'Yes, Plus and Pro plans allow export to PowerPoint (PPTX) and PDF formats.'),
(3, 45, 'What makes Gamma different?', 'Gamma generates complete presentations with real content from a single prompt - not just templates or placeholders.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 45;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 45, 'AI presentation maker'),
(1, 45, 'Gamma vs PowerPoint'),
(2, 45, 'Gamma pricing'),
(3, 45, 'create slides with AI');

-- ============================================
-- TOME (id=46) - AI Storytelling
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered storytelling and presentation tool for modern narratives',
  excerpt = 'Tome is an AI storytelling platform that creates narrative presentations with generated text, images, and layouts. Popular for pitch decks, portfolios, and creative storytelling.',
  logo_url = 'https://logo.clearbit.com/tome.app',
  pricing_summary = 'Free: Limited features. Professional $16/mo: Unlimited AI. Enterprise custom.',
  expert_verdict = 'Tome takes a more narrative approach to presentations than Gamma. It''s excellent for storytelling - investor pitches, creative portfolios, thought leadership. The AI generation is capable but the differentiator is the emphasis on story flow rather than traditional slides. For traditional business presentations, Gamma may be more suitable.',
  verdict_summary = 'AI storytelling for narrative presentations. Best for creative and pitch decks.',
  meta_title = 'Tome AI Review 2025: AI Storytelling Tool Pricing & Features',
  meta_description = 'Tome AI review with 2025 pricing ($16/mo), storytelling features, and comparison to Gamma. Create narrative presentations with AI.',
  focus_keyword = 'Tome AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.0,
  ratings_features = 4.3,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 46;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.2,
  stats_company = 'Tome',
  stats_launch_year = 2022
WHERE id = 46;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 46;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 46, 'Free', '$0', 'free', 0, 'Try Free', 'https://tome.app'),
(1, 46, 'Professional', '$16/mo', 'monthly', 1, 'Go Pro', 'https://tome.app/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited pages' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic AI features' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Tome branding' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited AI generation' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No branding' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Custom branding' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Export options' FROM tools_pricing_tiers t WHERE t._parent_id = 46 AND t.name = 'Professional';

DELETE FROM tools_pros WHERE _parent_id = 46;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 46, 'Narrative Focus', 'Designed for storytelling, not just bullet points.'),
(1, 46, 'Beautiful Defaults', 'Modern, cinematic design aesthetic.'),
(2, 46, 'AI Image Generation', 'Built-in image generation for visuals.'),
(3, 46, 'Web-Native', 'Presentations work beautifully as shareable links.');

DELETE FROM tools_cons WHERE _parent_id = 46;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 46, 'Pricier Than Gamma', '$16/month vs Gamma''s $10/month.'),
(1, 46, 'Less Traditional', 'May not suit conventional business presentations.'),
(2, 46, 'Learning Curve', 'Different paradigm takes adjustment.');

DELETE FROM tools_best_for WHERE _parent_id = 46;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 46, 'Startup Founders', 'Compelling investor pitch decks'),
(1, 46, 'Creatives', 'Portfolio presentations and case studies'),
(2, 46, 'Thought Leaders', 'Narrative-driven content');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 46;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 46, 'Traditional Business', 'May prefer conventional slide formats'),
(1, 46, 'Budget-Conscious', 'Gamma offers similar for less');

DELETE FROM tools_faqs WHERE _parent_id = 46;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 46, 'Is Tome free?', 'Tome has a limited free tier. Professional at $16/month unlocks unlimited AI and full features.'),
(1, 46, 'Tome vs Gamma?', 'Tome focuses on narrative storytelling. Gamma is better for traditional presentations. Both use AI generation.'),
(2, 46, 'Can Tome generate images?', 'Yes, Tome has built-in AI image generation powered by DALL-E.'),
(3, 46, 'What is Tome best for?', 'Pitch decks, creative portfolios, thought leadership content, and any presentation that tells a story.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 46;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 46, 'Tome vs Gamma'),
(1, 46, 'AI pitch deck'),
(2, 46, 'Tome pricing'),
(3, 46, 'AI storytelling tool');

-- ============================================
-- FRAMER AI (id=52) - AI Website Builder
-- ============================================
UPDATE tools SET
  tagline = 'Design and publish websites with AI - no code required',
  excerpt = 'Framer AI generates complete, publishable websites from text prompts. Describe your site, and AI creates pages, layouts, and copy. Popular for portfolios, landing pages, and marketing sites.',
  logo_url = 'https://logo.clearbit.com/framer.com',
  pricing_summary = 'Free: Framer subdomain. Mini $5/mo: Custom domain. Basic $15/mo: More pages. Pro $30/mo: Analytics.',
  expert_verdict = 'Framer AI is genuinely impressive for website generation. Describe your site and get a publishable result in minutes. The designs are modern and professional - not obviously AI-generated. For landing pages, portfolios, and marketing sites, it''s excellent. Complex web apps still need traditional development, but for most websites, Framer delivers.',
  verdict_summary = 'Best AI website generator. Professional sites from prompts in minutes.',
  meta_title = 'Framer AI Review 2025: AI Website Builder Pricing & Features',
  meta_description = 'Framer AI review with 2025 pricing ($5-$30/mo), website generation, and comparison. Create professional websites with AI prompts.',
  focus_keyword = 'Framer AI',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.4,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 52;

UPDATE tools SET
  stats_users = '4M+',
  stats_rating = 4.5,
  stats_company = 'Framer BV',
  stats_launch_year = 2023
WHERE id = 52;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 52;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 52, 'Free', '$0', 'free', 0, 'Start Free', 'https://framer.com'),
(1, 52, 'Mini', '$5/mo', 'monthly', 0, 'Go Mini', 'https://framer.com/pricing'),
(2, 52, 'Basic', '$15/mo', 'monthly', 1, 'Go Basic', 'https://framer.com/pricing'),
(3, 52, 'Pro', '$30/mo', 'monthly', 0, 'Go Pro', 'https://framer.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Framer subdomain' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '2 pages' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'AI generation' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom domain' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Mini';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '3 pages' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Mini';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'No Framer badge' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Mini';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '150 pages' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'CMS collections' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Form submissions' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Basic';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '300 pages' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Password protection' FROM tools_pricing_tiers t WHERE t._parent_id = 52 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 52;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 52, 'Impressive Generation', 'Creates professional, publishable websites from prompts.'),
(1, 52, 'Modern Design', 'Generates contemporary, well-designed sites.'),
(2, 52, 'Easy Customization', 'Visual editor for refining AI-generated designs.'),
(3, 52, 'Fast Publishing', 'Go from idea to live site in minutes.');

DELETE FROM tools_cons WHERE _parent_id = 52;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 52, 'Page Limits', 'Free tier limited to 2 pages.'),
(1, 52, 'Not for Web Apps', 'Static sites only - no complex functionality.'),
(2, 52, 'Hosting Required', 'Sites hosted on Framer infrastructure.');

DELETE FROM tools_best_for WHERE _parent_id = 52;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 52, 'Freelancers', 'Quick portfolio and personal sites'),
(1, 52, 'Startups', 'Rapid landing page creation'),
(2, 52, 'Agencies', 'Fast client site prototypes');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 52;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 52, 'Web App Builders', 'Static sites only'),
(1, 52, 'E-commerce Needs', 'Use Shopify or dedicated platforms');

DELETE FROM tools_faqs WHERE _parent_id = 52;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 52, 'Is Framer AI free?', 'Framer has a free tier with 2 pages on a Framer subdomain. Custom domains start at $5/month.'),
(1, 52, 'Framer vs Webflow?', 'Framer has better AI generation. Webflow has more powerful traditional features. Framer is faster; Webflow is more flexible.'),
(2, 52, 'Can Framer AI build any website?', 'Framer excels at landing pages, portfolios, and marketing sites. Complex web apps need traditional development.'),
(3, 52, 'How does Framer AI work?', 'Describe your website in text, and AI generates a complete site with pages, layouts, copy, and styling.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 52;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 52, 'AI website builder'),
(1, 52, 'Framer vs Webflow'),
(2, 52, 'Framer pricing'),
(3, 52, 'create website with AI');

-- ============================================
-- MAKE (id=58) - Automation Platform
-- ============================================
UPDATE tools SET
  tagline = 'Visual automation platform connecting 1500+ apps without code',
  excerpt = 'Make (formerly Integromat) is a powerful no-code automation platform. Build complex workflows visually, connecting apps and services with advanced logic and data transformation.',
  logo_url = 'https://logo.clearbit.com/make.com',
  pricing_summary = 'Free: 1000 ops/month. Core $9/mo: 10K ops. Pro $16/mo: Priority. Teams $29/mo.',
  expert_verdict = 'Make is the power user''s choice for automation. More capable than Zapier for complex workflows, with better data manipulation and visual flow building. The learning curve is steeper, but the capabilities justify it. For serious automation needs, Make offers better value than Zapier, especially for complex multi-step processes.',
  verdict_summary = 'Most powerful visual automation platform. Best for complex workflows.',
  meta_title = 'Make Review 2025: Automation Platform Pricing vs Zapier',
  meta_description = 'Make (Integromat) review with 2025 pricing ($9-$29/mo), features, and Zapier comparison. Build powerful automations visually.',
  focus_keyword = 'Make automation',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.6,
  ratings_features = 4.7,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 58;

UPDATE tools SET
  stats_users = '500K+',
  stats_rating = 4.5,
  stats_company = 'Celonis SE',
  stats_launch_year = 2016
WHERE id = 58;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 58;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 58, 'Free', '$0', 'free', 0, 'Start Free', 'https://make.com'),
(1, 58, 'Core', '$9/mo', 'monthly', 1, 'Go Core', 'https://make.com/pricing'),
(2, 58, 'Pro', '$16/mo', 'monthly', 0, 'Go Pro', 'https://make.com/pricing'),
(3, 58, 'Teams', '$29/mo', 'monthly', 0, 'For Teams', 'https://make.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1,000 ops/month' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '2 active scenarios' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 ops/month' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Core';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Unlimited scenarios' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Core';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Access to all apps' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Core';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 ops/month' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Priority execution' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Custom variables' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 ops/month' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Teams';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Teams';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Shared scenarios' FROM tools_pricing_tiers t WHERE t._parent_id = 58 AND t.name = 'Teams';

DELETE FROM tools_pros WHERE _parent_id = 58;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 58, 'Powerful Visual Builder', 'Complex workflows with branching, loops, and error handling.'),
(1, 58, 'Better Value', 'More operations per dollar than Zapier.'),
(2, 58, 'Data Transformation', 'Built-in functions for manipulating data.'),
(3, 58, '1500+ Integrations', 'Connects with most popular apps and services.');

DELETE FROM tools_cons WHERE _parent_id = 58;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 58, 'Steeper Learning Curve', 'More complex than Zapier to get started.'),
(1, 58, 'Interface Overwhelming', 'Visual builder can feel cluttered.'),
(2, 58, 'Documentation Gaps', 'Some features lack clear documentation.');

DELETE FROM tools_best_for WHERE _parent_id = 58;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 58, 'Power Users', 'Complex automation requirements'),
(1, 58, 'Agencies', 'Client automation at scale'),
(2, 58, 'Data-Heavy Workflows', 'Excellent data transformation');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 58;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 58, 'Beginners', 'Zapier is easier to start with'),
(1, 58, 'Simple Automations', 'Overkill for basic workflows');

DELETE FROM tools_faqs WHERE _parent_id = 58;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 58, 'Is Make free?', 'Make offers 1,000 free operations per month. Paid plans start at $9/month for 10,000 operations.'),
(1, 58, 'Make vs Zapier?', 'Make is more powerful for complex workflows with better value. Zapier is easier to use with more integrations. Choose based on complexity needs.'),
(2, 58, 'What was Make called before?', 'Make was previously known as Integromat. It rebranded to Make in 2022.'),
(3, 58, 'Can Make handle complex logic?', 'Yes, Make excels at complex workflows with branching, loops, error handling, and data transformation.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 58;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 58, 'Make vs Zapier'),
(1, 58, 'Integromat alternative'),
(2, 58, 'no-code automation'),
(3, 58, 'Make pricing');

-- ============================================
-- N8N (id=59) - Self-Hosted Automation
-- ============================================
UPDATE tools SET
  tagline = 'Open-source workflow automation with self-hosting option',
  excerpt = 'n8n is an open-source automation platform that can be self-hosted. Build workflows connecting 400+ apps with code-optional customization and full data control.',
  logo_url = 'https://logo.clearbit.com/n8n.io',
  pricing_summary = 'Self-hosted: Free forever. Cloud Starter $20/mo: 2500 executions. Pro $50/mo: 10K executions.',
  expert_verdict = 'n8n is the automation tool for those who want control. Self-hosting means your data never leaves your infrastructure - crucial for compliance-sensitive businesses. The open-source code means unlimited customization. For developers and privacy-focused teams, n8n is the clear choice. The cloud option offers convenience without the self-hosting burden.',
  verdict_summary = 'Best self-hosted automation platform. Full control and open source.',
  meta_title = 'n8n Review 2025: Open Source Automation vs Zapier & Make',
  meta_description = 'n8n review with 2025 pricing (free self-hosted, $20/mo cloud), self-hosting guide, and comparison. Open-source workflow automation.',
  focus_keyword = 'n8n automation',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.0,
  ratings_value_for_money = 4.8,
  ratings_features = 4.5,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 59;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.4,
  stats_company = 'n8n GmbH',
  stats_launch_year = 2019
WHERE id = 59;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 59;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 59, 'Self-Hosted', '$0', 'free', 1, 'Self-Host Free', 'https://n8n.io'),
(1, 59, 'Cloud Starter', '$20/mo', 'monthly', 0, 'Start Cloud', 'https://n8n.io/pricing'),
(2, 59, 'Cloud Pro', '$50/mo', 'monthly', 0, 'Go Pro', 'https://n8n.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited executions' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Self-Hosted';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Full source code' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Self-Hosted';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Your infrastructure' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Self-Hosted';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2,500 executions/month' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Managed hosting' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Auto-updates' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 executions/month' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'SSO' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 59 AND t.name = 'Cloud Pro';

DELETE FROM tools_pros WHERE _parent_id = 59;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 59, 'Self-Hosting Option', 'Run on your own servers with full data control.'),
(1, 59, 'Open Source', 'Full source code access, MIT licensed.'),
(2, 59, 'Free Forever', 'Unlimited executions when self-hosted.'),
(3, 59, 'Code Integration', 'Add custom JavaScript/Python to workflows.');

DELETE FROM tools_cons WHERE _parent_id = 59;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 59, 'Self-Hosting Complexity', 'Requires technical knowledge to deploy and maintain.'),
(1, 59, 'Fewer Integrations', '400+ apps vs Zapier''s 6000+.'),
(2, 59, 'Steeper Learning Curve', 'More technical than Zapier or Make.');

DELETE FROM tools_best_for WHERE _parent_id = 59;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 59, 'Developers', 'Code integration and customization'),
(1, 59, 'Privacy-Focused Teams', 'Self-hosting for data control'),
(2, 59, 'Cost-Conscious Power Users', 'Unlimited free executions');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 59;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 59, 'Non-Technical Users', 'Zapier is much easier'),
(1, 59, 'Quick Setup Needs', 'Cloud alternatives are faster to start');

DELETE FROM tools_faqs WHERE _parent_id = 59;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 59, 'Is n8n free?', 'Yes, n8n is free when self-hosted with unlimited executions. Cloud plans start at $20/month.'),
(1, 59, 'n8n vs Zapier?', 'n8n is open-source with self-hosting option. Zapier is easier with more integrations. n8n is better for developers; Zapier for business users.'),
(2, 59, 'How do I self-host n8n?', 'n8n can be deployed via Docker, npm, or directly on servers. Documentation covers all methods.'),
(3, 59, 'Is n8n secure?', 'When self-hosted, n8n data never leaves your infrastructure. Cloud version has SOC2 compliance.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 59;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 59, 'n8n vs Zapier'),
(1, 59, 'self-hosted automation'),
(2, 59, 'open source workflow'),
(3, 59, 'n8n pricing');

-- ============================================
-- BARDEEN (id=60) - Browser Automation
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered browser automation that scrapes, automates, and integrates',
  excerpt = 'Bardeen is a Chrome extension for browser automation. Scrape data, automate repetitive tasks, and connect web apps with AI assistance - all from your browser.',
  logo_url = 'https://logo.clearbit.com/bardeen.ai',
  pricing_summary = 'Free: Unlimited non-premium. Pro $10/mo: Premium automations. Business $15/user.',
  expert_verdict = 'Bardeen fills a unique niche: browser-based automation. It excels at tasks that require interacting with web pages - scraping data, filling forms, moving information between web apps. The AI can generate automations from natural language. For sales, recruiting, and research workflows that live in the browser, Bardeen is excellent.',
  verdict_summary = 'Best browser-based automation. AI-powered web scraping and task automation.',
  meta_title = 'Bardeen Review 2025: Browser Automation AI Pricing & Features',
  meta_description = 'Bardeen AI review with 2025 pricing ($10/mo), web scraping, browser automation, and comparison. Automate any website.',
  focus_keyword = 'Bardeen AI',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.4,
  ratings_features = 4.3,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 60;

UPDATE tools SET
  stats_users = '300K+',
  stats_rating = 4.3,
  stats_company = 'Bardeen AI Inc.',
  stats_launch_year = 2020
WHERE id = 60;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 60;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 60, 'Free', '$0', 'free', 0, 'Add to Chrome', 'https://bardeen.ai'),
(1, 60, 'Pro', '$10/mo', 'monthly', 1, 'Go Pro', 'https://bardeen.ai/pricing'),
(2, 60, 'Business', '$15/user/mo', 'monthly', 0, 'For Teams', 'https://bardeen.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited basic automations' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Manual triggers' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Basic integrations' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Premium automations' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Auto-triggers' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'AI automation builder' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Team sharing' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Admin controls' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 60 AND t.name = 'Business';

DELETE FROM tools_pros WHERE _parent_id = 60;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 60, 'Browser-Native', 'Runs directly in Chrome for seamless web automation.'),
(1, 60, 'Web Scraping', 'Extract data from any website with point-and-click.'),
(2, 60, 'AI Builder', 'Describe automation in plain English.'),
(3, 60, 'Generous Free Tier', 'Unlimited basic automations free.');

DELETE FROM tools_cons WHERE _parent_id = 60;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 60, 'Chrome Only', 'Requires Chrome browser.'),
(1, 60, 'Browser Dependent', 'Must be running for automations.'),
(2, 60, 'Web-Focused', 'Less useful for non-web tasks.');

DELETE FROM tools_best_for WHERE _parent_id = 60;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 60, 'Sales Teams', 'Lead research and CRM enrichment'),
(1, 60, 'Recruiters', 'Candidate sourcing and outreach'),
(2, 60, 'Researchers', 'Data collection from web sources');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 60;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 60, 'Non-Web Workflows', 'Make or Zapier better for app-to-app'),
(1, 60, 'Non-Chrome Users', 'Requires Chrome browser');

DELETE FROM tools_faqs WHERE _parent_id = 60;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 60, 'Is Bardeen free?', 'Yes, Bardeen offers unlimited basic automations free. Pro at $10/month adds premium features and auto-triggers.'),
(1, 60, 'Bardeen vs Zapier?', 'Bardeen is browser-based for web automation. Zapier connects cloud apps. Use Bardeen for web scraping; Zapier for app integration.'),
(2, 60, 'Can Bardeen scrape any website?', 'Bardeen can scrape most websites, but some sites with strong anti-bot measures may be difficult.'),
(3, 60, 'Does Bardeen need to be open?', 'Yes, Chrome must be running for Bardeen automations to execute.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 60;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 60, 'browser automation'),
(1, 60, 'web scraping AI'),
(2, 60, 'Bardeen vs Zapier'),
(3, 60, 'Chrome automation');

-- ============================================
-- ZAPIER AI (id=39) - AI Automation
-- ============================================
UPDATE tools SET
  tagline = 'Connect 6000+ apps with AI-powered workflow automation',
  excerpt = 'Zapier is the most popular automation platform, connecting 6000+ apps with AI features for building and optimizing workflows. Natural language automation creation and AI-powered suggestions.',
  logo_url = 'https://logo.clearbit.com/zapier.com',
  pricing_summary = 'Free: 100 tasks/month. Starter $20/mo: 750 tasks. Professional $49/mo: 2K tasks. Team $69/mo.',
  expert_verdict = 'Zapier remains the default choice for automation thanks to its massive app library and ease of use. The AI features (natural language workflow creation) are genuinely useful for beginners. It''s more expensive than Make for equivalent usage, but the lower learning curve and larger integration library often justify the premium. For most businesses, Zapier is where to start.',
  verdict_summary = 'Most popular automation platform. Best for beginners with huge app library.',
  meta_title = 'Zapier Review 2025: AI Automation Platform Pricing & Features',
  meta_description = 'Zapier review with 2025 pricing ($20-$69/mo), AI features, 6000+ integrations, and comparison to Make. Automate your work.',
  focus_keyword = 'Zapier review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 3.9,
  ratings_features = 4.4,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 39;

UPDATE tools SET
  stats_users = '2M+',
  stats_rating = 4.4,
  stats_company = 'Zapier Inc.',
  stats_launch_year = 2012
WHERE id = 39;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 39;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 39, 'Free', '$0', 'free', 0, 'Start Free', 'https://zapier.com'),
(1, 39, 'Starter', '$20/mo', 'monthly', 0, 'Start Starter', 'https://zapier.com/pricing'),
(2, 39, 'Professional', '$49/mo', 'monthly', 1, 'Go Pro', 'https://zapier.com/pricing'),
(3, 39, 'Team', '$69/mo', 'monthly', 0, 'For Teams', 'https://zapier.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 tasks/month' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '5 Zaps' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Single-step Zaps' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '750 tasks/month' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Multi-step Zaps' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Filters' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2,000 tasks/month' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Unlimited Zaps' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Custom logic' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Professional';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2,000 tasks/month' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Shared workspace' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'User permissions' FROM tools_pricing_tiers t WHERE t._parent_id = 39 AND t.name = 'Team';

DELETE FROM tools_pros WHERE _parent_id = 39;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 39, 'Huge App Library', '6000+ integrations - largest in the market.'),
(1, 39, 'Easiest to Use', 'Most beginner-friendly automation platform.'),
(2, 39, 'AI Assistant', 'Create workflows from natural language descriptions.'),
(3, 39, 'Reliable', 'Mature platform with excellent uptime.');

DELETE FROM tools_cons WHERE _parent_id = 39;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 39, 'Expensive Per Task', 'More expensive than Make for equivalent usage.'),
(1, 39, 'Limited Free Tier', 'Only 100 tasks/month free.'),
(2, 39, 'Complex Logic Limits', 'Make is more powerful for complex workflows.');

DELETE FROM tools_best_for WHERE _parent_id = 39;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 39, 'Automation Beginners', 'Easiest platform to learn'),
(1, 39, 'Small Businesses', 'Quick setup for common workflows'),
(2, 39, 'Integration-Heavy Needs', 'Largest app library available');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 39;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 39, 'Cost-Conscious Power Users', 'Make offers better value'),
(1, 39, 'Complex Logic Needs', 'Make handles complexity better');

DELETE FROM tools_faqs WHERE _parent_id = 39;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 39, 'Is Zapier free?', 'Zapier offers a limited free tier with 100 tasks/month. Paid plans start at $20/month.'),
(1, 39, 'Zapier vs Make?', 'Zapier is easier with more integrations. Make is more powerful and better value for complex workflows. Start with Zapier; switch to Make if needed.'),
(2, 39, 'What is a Zapier task?', 'A task is any action executed by Zapier - sending an email, creating a row, etc. Multi-step Zaps consume one task per step executed.'),
(3, 39, 'Can Zapier use AI?', 'Yes, Zapier has AI features for creating workflows from natural language and an AI assistant for suggestions and debugging.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 39;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 39, 'Zapier vs Make'),
(1, 39, 'Zapier pricing'),
(2, 39, 'best automation tool'),
(3, 39, 'Zapier AI');
