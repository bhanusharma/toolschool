-- Batch 8: Final remaining tools
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch8.sql

-- ============================================
-- HARVEY AI (id=30) - Legal AI
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered legal research and document drafting for law firms',
  excerpt = 'Harvey AI is a legal AI platform used by major law firms for research, document review, contract analysis, and drafting. Built specifically for legal professionals.',
  logo_url = 'https://logo.clearbit.com/harvey.ai',
  pricing_summary = 'Enterprise pricing only. Contact for quotes.',
  expert_verdict = 'Harvey AI represents enterprise-grade legal AI. Used by top law firms like Allen & Overy, it handles complex legal research, document analysis, and drafting with domain expertise ChatGPT lacks. Not available to individuals - this is for law firms with budget.',
  verdict_summary = 'Enterprise legal AI for law firms. Premium pricing for premium capabilities.',
  meta_title = 'Harvey AI Review 2025: Legal AI Platform for Law Firms',
  meta_description = 'Harvey AI review with features, legal research capabilities, and enterprise focus. AI for legal professionals.',
  focus_keyword = 'Harvey AI legal',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 3.8,
  ratings_features = 4.6,
  ratings_support = 4.4,
  price_last_verified = '2025-12-23'
WHERE id = 30;

UPDATE tools SET
  stats_users = '10K+',
  stats_rating = 4.4,
  stats_company = 'Harvey AI',
  stats_launch_year = 2022
WHERE id = 30;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 30;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 30, 'Enterprise', 'Contact Sales', 'custom', 1, 'Contact Sales', 'https://harvey.ai');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Legal research' FROM tools_pricing_tiers t WHERE t._parent_id = 30 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Document analysis' FROM tools_pricing_tiers t WHERE t._parent_id = 30 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Contract review' FROM tools_pricing_tiers t WHERE t._parent_id = 30 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 30;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 30, 'Legal Expertise', 'Trained specifically on legal documents and case law.'),
(1, 30, 'Enterprise Security', 'Built for law firm compliance requirements.');

DELETE FROM tools_cons WHERE _parent_id = 30;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 30, 'Enterprise Only', 'Not available to individuals or small firms.');

DELETE FROM tools_best_for WHERE _parent_id = 30;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 30, 'Large Law Firms', 'Enterprise-grade legal AI');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 30;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 30, 'Solo Practitioners', 'Too expensive for individuals');

DELETE FROM tools_faqs WHERE _parent_id = 30;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 30, 'Is Harvey AI available to individuals?', 'No, Harvey AI is enterprise-only for law firms.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 30;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 30, 'legal AI'),
(1, 30, 'AI for lawyers');

-- ============================================
-- CLAY (id=38) - Sales Intelligence
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered sales intelligence and data enrichment platform',
  excerpt = 'Clay combines 50+ data providers with AI to enrich leads, automate research, and personalize outreach at scale. Essential for modern sales and GTM teams.',
  logo_url = 'https://logo.clearbit.com/clay.com',
  pricing_summary = 'Starter $149/mo. Explorer $349/mo. Pro $800/mo. Enterprise custom.',
  expert_verdict = 'Clay has become essential for high-velocity sales teams. The ability to combine data from 50+ sources and use AI for enrichment is powerful. Expensive but delivers ROI for teams doing significant outbound. Not for small operations.',
  verdict_summary = 'Best sales intelligence platform. Data enrichment and AI research combined.',
  meta_title = 'Clay Review 2025: Sales Intelligence & Data Enrichment Pricing',
  meta_description = 'Clay review with 2025 pricing ($149-$800/mo), data enrichment, and AI research. Essential for sales teams.',
  focus_keyword = 'Clay sales',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.1,
  ratings_features = 4.7,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 38;

UPDATE tools SET
  stats_users = '50K+',
  stats_rating = 4.5,
  stats_company = 'Clay Inc.',
  stats_launch_year = 2020
WHERE id = 38;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 38;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 38, 'Starter', '$149/mo', 'monthly', 0, 'Start', 'https://clay.com/pricing'),
(1, 38, 'Explorer', '$349/mo', 'monthly', 1, 'Explore', 'https://clay.com/pricing'),
(2, 38, 'Pro', '$800/mo', 'monthly', 0, 'Go Pro', 'https://clay.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2000 enrichments/month' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Core integrations' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10000 enrichments/month' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Explorer';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'AI research' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Explorer';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50000 enrichments/month' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Advanced workflows' FROM tools_pricing_tiers t WHERE t._parent_id = 38 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 38;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 38, 'Massive Data Sources', '50+ data providers in one platform.'),
(1, 38, 'AI Research', 'Automated prospect research.');

DELETE FROM tools_cons WHERE _parent_id = 38;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 38, 'Expensive', 'Starting at $149/month is premium.'),
(1, 38, 'Learning Curve', 'Complex platform takes time to master.');

DELETE FROM tools_best_for WHERE _parent_id = 38;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 38, 'Sales Teams', 'Data enrichment at scale'),
(1, 38, 'GTM Teams', 'Outbound automation');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 38;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 38, 'Small Businesses', 'Too expensive for low volume');

DELETE FROM tools_faqs WHERE _parent_id = 38;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 38, 'What is Clay used for?', 'Clay enriches sales leads with data from 50+ sources and uses AI for personalized outreach.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 38;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 38, 'sales data enrichment'),
(1, 38, 'Clay pricing');

-- ============================================
-- SPLINE AI (id=49) - 3D Design
-- ============================================
UPDATE tools SET
  tagline = '3D design made easy with AI-powered creation tools',
  excerpt = 'Spline is a web-based 3D design tool with AI features for generating and editing 3D content. Create 3D websites, illustrations, and interactive experiences.',
  logo_url = 'https://logo.clearbit.com/spline.design',
  pricing_summary = 'Free: Full editor. Pro $9/mo: Team features. Team $25/user/mo.',
  expert_verdict = 'Spline democratizes 3D design for web designers. The browser-based editor is intuitive, and AI generation helps non-3D-artists create impressive content. For 3D web elements and interactive experiences, Spline is excellent. Not for game development or complex 3D work.',
  verdict_summary = 'Best browser-based 3D design. Great for web designers.',
  meta_title = 'Spline AI Review 2025: 3D Design Tool Pricing & Features',
  meta_description = 'Spline review with 2025 pricing (free-$25/mo), 3D design features, and AI generation. Create 3D for web.',
  focus_keyword = 'Spline 3D',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.7,
  ratings_features = 4.3,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 49;

UPDATE tools SET
  stats_users = '2M+',
  stats_rating = 4.4,
  stats_company = 'Spline Inc.',
  stats_launch_year = 2020
WHERE id = 49;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 49;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 49, 'Free', '$0', 'free', 1, 'Start Free', 'https://spline.design'),
(1, 49, 'Pro', '$9/mo', 'monthly', 0, 'Go Pro', 'https://spline.design/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Full 3D editor' FROM tools_pricing_tiers t WHERE t._parent_id = 49 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'AI generation' FROM tools_pricing_tiers t WHERE t._parent_id = 49 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Private projects' FROM tools_pricing_tiers t WHERE t._parent_id = 49 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Export options' FROM tools_pricing_tiers t WHERE t._parent_id = 49 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 49;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 49, 'Browser-Based', 'No downloads, works anywhere.'),
(1, 49, 'Web-Native Export', 'Export directly for websites.');

DELETE FROM tools_cons WHERE _parent_id = 49;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 49, 'Limited for Games', 'Not suitable for game development.');

DELETE FROM tools_best_for WHERE _parent_id = 49;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 49, 'Web Designers', '3D elements for websites');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 49;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 49, 'Game Developers', 'Use Blender or Unity');

DELETE FROM tools_faqs WHERE _parent_id = 49;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 49, 'Is Spline free?', 'Yes, Spline has a generous free tier with full 3D editing capabilities.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 49;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 49, 'web 3D design'),
(1, 49, 'Spline vs Blender');

-- ============================================
-- 10WEB (id=50) - AI Website Builder
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered WordPress website builder and hosting',
  excerpt = '10Web combines AI website generation with managed WordPress hosting. Generate WordPress sites from prompts, then customize with familiar WordPress tools.',
  logo_url = 'https://logo.clearbit.com/10web.io',
  pricing_summary = 'AI Starter $10/mo. AI Premium $15/mo. AI Ultimate $25/mo.',
  expert_verdict = '10Web bridges AI generation and WordPress familiarity. Generate a site with AI, then customize with the world''s most popular CMS. Good for WordPress users who want AI generation; less suitable for those seeking simpler solutions.',
  verdict_summary = 'AI WordPress builder. Best for WordPress ecosystem users.',
  meta_title = '10Web Review 2025: AI WordPress Builder Pricing & Features',
  meta_description = '10Web review with 2025 pricing ($10-$25/mo), AI website generation, and WordPress hosting. Build sites with AI.',
  focus_keyword = '10Web AI',
  ratings_overall = 4.1,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.2,
  ratings_features = 4.1,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 50;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.1,
  stats_company = '10Web',
  stats_launch_year = 2017
WHERE id = 50;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 50;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 50, 'AI Starter', '$10/mo', 'monthly', 0, 'Start', 'https://10web.io/pricing'),
(1, 50, 'AI Premium', '$15/mo', 'monthly', 1, 'Go Premium', 'https://10web.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1 website' FROM tools_pricing_tiers t WHERE t._parent_id = 50 AND t.name = 'AI Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'AI generation' FROM tools_pricing_tiers t WHERE t._parent_id = 50 AND t.name = 'AI Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '3 websites' FROM tools_pricing_tiers t WHERE t._parent_id = 50 AND t.name = 'AI Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Premium hosting' FROM tools_pricing_tiers t WHERE t._parent_id = 50 AND t.name = 'AI Premium';

DELETE FROM tools_pros WHERE _parent_id = 50;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 50, 'WordPress Based', 'Familiar CMS after generation.'),
(1, 50, 'Managed Hosting', 'Includes optimized WordPress hosting.');

DELETE FROM tools_cons WHERE _parent_id = 50;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 50, 'WordPress Complexity', 'Still WordPress learning curve.');

DELETE FROM tools_best_for WHERE _parent_id = 50;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 50, 'WordPress Users', 'AI generation with WordPress flexibility');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 50;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 50, 'Non-WordPress Users', 'Framer AI simpler');

DELETE FROM tools_faqs WHERE _parent_id = 50;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 50, 'What is 10Web?', '10Web is an AI-powered WordPress website builder with managed hosting.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 50;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 50, 'AI WordPress'),
(1, 50, '10Web pricing');

-- ============================================
-- DURABLE (id=51) - AI Website Builder
-- ============================================
UPDATE tools SET
  tagline = 'Build a complete small business website in 30 seconds',
  excerpt = 'Durable generates complete business websites with AI - including copy, images, and design - in under a minute. Built specifically for small businesses and service providers.',
  logo_url = 'https://logo.clearbit.com/durable.co',
  pricing_summary = 'Starter $12/mo. Business $20/mo.',
  expert_verdict = 'Durable is impressively fast - describe your business and get a complete website in seconds. Quality is acceptable for small businesses who need online presence quickly. More sophisticated needs should look elsewhere, but for speed-to-launch, Durable excels.',
  verdict_summary = 'Fastest AI website builder. Small business focused.',
  meta_title = 'Durable Review 2025: 30-Second AI Website Builder Pricing',
  meta_description = 'Durable AI review with 2025 pricing ($12-$20/mo), instant website generation, and small business features.',
  focus_keyword = 'Durable AI',
  ratings_overall = 4.0,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.3,
  ratings_features = 3.8,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 51;

UPDATE tools SET
  stats_users = '500K+',
  stats_rating = 4.0,
  stats_company = 'Durable',
  stats_launch_year = 2022
WHERE id = 51;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 51;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 51, 'Starter', '$12/mo', 'monthly', 1, 'Get Started', 'https://durable.co/pricing'),
(1, 51, 'Business', '$20/mo', 'monthly', 0, 'Go Business', 'https://durable.co/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'AI website generation' FROM tools_pricing_tiers t WHERE t._parent_id = 51 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Custom domain' FROM tools_pricing_tiers t WHERE t._parent_id = 51 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'CRM included' FROM tools_pricing_tiers t WHERE t._parent_id = 51 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Invoice tools' FROM tools_pricing_tiers t WHERE t._parent_id = 51 AND t.name = 'Business';

DELETE FROM tools_pros WHERE _parent_id = 51;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 51, 'Incredible Speed', 'Complete website in under a minute.'),
(1, 51, 'Small Business Focus', 'Built for service businesses.');

DELETE FROM tools_cons WHERE _parent_id = 51;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 51, 'Limited Customization', 'Less flexible than Framer or Webflow.');

DELETE FROM tools_best_for WHERE _parent_id = 51;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 51, 'Local Businesses', 'Quick online presence');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 51;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 51, 'Design-Focused', 'Use Framer for more control');

DELETE FROM tools_faqs WHERE _parent_id = 51;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 51, 'How fast is Durable?', 'Durable generates complete websites in about 30 seconds.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 51;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 51, 'instant website'),
(1, 51, 'Durable vs Framer');

-- ============================================
-- EQUALS (id=54) - Spreadsheet Analytics
-- ============================================
UPDATE tools SET
  tagline = 'Next-generation spreadsheet with SQL and AI built-in',
  excerpt = 'Equals combines spreadsheet functionality with database connections and AI analysis. Query databases directly, visualize data, and get AI insights - all in a familiar spreadsheet interface.',
  logo_url = 'https://logo.clearbit.com/equals.com',
  pricing_summary = 'Free: Basic features. Pro $49/user/mo. Team $79/user/mo.',
  expert_verdict = 'Equals modernizes spreadsheets for data-heavy teams. The ability to query databases directly and get AI analysis makes it powerful for ops and analytics. More complex than Excel/Sheets but far more capable for data work.',
  verdict_summary = 'Modern spreadsheet for data teams. SQL + AI in familiar format.',
  meta_title = 'Equals Review 2025: AI Spreadsheet for Data Teams',
  meta_description = 'Equals review with 2025 pricing ($49-$79/mo), SQL integration, and AI analysis. The modern spreadsheet.',
  focus_keyword = 'Equals spreadsheet',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.1,
  ratings_value_for_money = 4.0,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 54;

UPDATE tools SET
  stats_users = '50K+',
  stats_rating = 4.3,
  stats_company = 'Equals Inc.',
  stats_launch_year = 2021
WHERE id = 54;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 54;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 54, 'Free', '$0', 'free', 0, 'Try Free', 'https://equals.com'),
(1, 54, 'Pro', '$49/user/mo', 'monthly', 1, 'Go Pro', 'https://equals.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Basic spreadsheets' FROM tools_pricing_tiers t WHERE t._parent_id = 54 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'SQL connections' FROM tools_pricing_tiers t WHERE t._parent_id = 54 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'AI analysis' FROM tools_pricing_tiers t WHERE t._parent_id = 54 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 54;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 54, 'Database Direct', 'Query databases in spreadsheet.'),
(1, 54, 'AI Analysis', 'Get insights from data automatically.');

DELETE FROM tools_cons WHERE _parent_id = 54;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 54, 'Expensive', '$49/user is steep.');

DELETE FROM tools_best_for WHERE _parent_id = 54;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 54, 'Data Teams', 'Modern spreadsheet for analytics');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 54;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 54, 'Basic Needs', 'Google Sheets is free');

DELETE FROM tools_faqs WHERE _parent_id = 54;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 54, 'What makes Equals different?', 'Equals connects directly to databases and includes AI analysis.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 54;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 54, 'AI spreadsheet'),
(1, 54, 'Equals vs Airtable');

-- ============================================
-- OBVIOUSLY AI (id=55) - No-Code ML
-- ============================================
UPDATE tools SET
  tagline = 'Build predictive AI models without coding',
  excerpt = 'Obviously AI lets business users build machine learning models without code. Upload data, select what to predict, and get deployable ML models in minutes.',
  logo_url = 'https://logo.clearbit.com/obviously.ai',
  pricing_summary = 'Starter $75/mo. Growth $250/mo. Enterprise custom.',
  expert_verdict = 'Obviously AI makes machine learning accessible to non-technical users. Upload a CSV, point at what to predict, and get a working model. Quality won''t match data science teams, but for business users, it''s transformative.',
  verdict_summary = 'No-code ML for business users. Prediction without programming.',
  meta_title = 'Obviously AI Review 2025: No-Code ML Platform Pricing',
  meta_description = 'Obviously AI review with 2025 pricing ($75-$250/mo), no-code machine learning, and prediction features.',
  focus_keyword = 'Obviously AI',
  ratings_overall = 4.1,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 3.9,
  ratings_features = 4.0,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 55;

UPDATE tools SET
  stats_users = '10K+',
  stats_rating = 4.1,
  stats_company = 'Obviously AI',
  stats_launch_year = 2020
WHERE id = 55;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 55;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 55, 'Starter', '$75/mo', 'monthly', 0, 'Start', 'https://obviously.ai/pricing'),
(1, 55, 'Growth', '$250/mo', 'monthly', 1, 'Grow', 'https://obviously.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 predictions' FROM tools_pricing_tiers t WHERE t._parent_id = 55 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic models' FROM tools_pricing_tiers t WHERE t._parent_id = 55 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50 predictions' FROM tools_pricing_tiers t WHERE t._parent_id = 55 AND t.name = 'Growth';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 55 AND t.name = 'Growth';

DELETE FROM tools_pros WHERE _parent_id = 55;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 55, 'No Code Required', 'Business users can build ML models.');

DELETE FROM tools_cons WHERE _parent_id = 55;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 55, 'Limited Customization', 'Data scientists may want more control.');

DELETE FROM tools_best_for WHERE _parent_id = 55;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 55, 'Business Analysts', 'ML without coding');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 55;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 55, 'Data Scientists', 'Python offers more control');

DELETE FROM tools_faqs WHERE _parent_id = 55;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 55, 'Can non-technical users use Obviously AI?', 'Yes, Obviously AI is designed for business users without coding skills.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 55;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 55, 'no-code ML'),
(1, 55, 'prediction AI');

-- ============================================
-- AKKIO (id=56) - No-Code AI
-- ============================================
UPDATE tools SET
  tagline = 'No-code AI for business prediction and analysis',
  excerpt = 'Akkio enables businesses to build AI models without coding. Predict outcomes, analyze data, and automate insights using drag-and-drop interfaces.',
  logo_url = 'https://logo.clearbit.com/akkio.com',
  pricing_summary = 'Starter $50/mo. Professional $500/mo. Enterprise custom.',
  expert_verdict = 'Akkio makes business AI accessible. Upload data, select outcomes, and get predictions. Good for sales forecasting, churn prediction, and similar business use cases.',
  verdict_summary = 'Business-focused no-code AI. Good for predictions and forecasting.',
  meta_title = 'Akkio Review 2025: No-Code AI Platform Pricing & Features',
  meta_description = 'Akkio review with 2025 pricing ($50-$500/mo), no-code AI, and prediction features.',
  focus_keyword = 'Akkio AI',
  ratings_overall = 4.0,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.0,
  ratings_features = 4.0,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 56;

UPDATE tools SET
  stats_users = '10K+',
  stats_rating = 4.0,
  stats_company = 'Akkio',
  stats_launch_year = 2020
WHERE id = 56;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 56;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 56, 'Starter', '$50/mo', 'monthly', 1, 'Start', 'https://akkio.com/pricing'),
(1, 56, 'Professional', '$500/mo', 'monthly', 0, 'Go Pro', 'https://akkio.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1000 predictions/month' FROM tools_pricing_tiers t WHERE t._parent_id = 56 AND t.name = 'Starter';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10000 predictions/month' FROM tools_pricing_tiers t WHERE t._parent_id = 56 AND t.name = 'Professional';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 56 AND t.name = 'Professional';

DELETE FROM tools_pros WHERE _parent_id = 56;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 56, 'Easy to Use', 'No coding required for AI predictions.');

DELETE FROM tools_cons WHERE _parent_id = 56;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 56, 'Price Jump', 'Big gap between Starter and Pro.');

DELETE FROM tools_best_for WHERE _parent_id = 56;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 56, 'Business Teams', 'Predictions without data science');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 56;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 56, 'Technical Users', 'Python offers more flexibility');

DELETE FROM tools_faqs WHERE _parent_id = 56;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 56, 'What can Akkio predict?', 'Sales outcomes, churn, lead scoring, and other business metrics.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 56;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 56, 'Akkio vs Obviously AI'),
(1, 56, 'business AI');

-- ============================================
-- HEX (id=57) - Data Workspace
-- ============================================
UPDATE tools SET
  tagline = 'Collaborative data workspace for analytics and AI',
  excerpt = 'Hex combines notebooks, SQL, visualization, and AI in one platform. Build analyses, create dashboards, and collaborate on data work.',
  logo_url = 'https://logo.clearbit.com/hex.tech',
  pricing_summary = 'Community free. Team $45/user/mo. Enterprise custom.',
  expert_verdict = 'Hex modernizes data work by combining notebooks, SQL, and visualization. The collaborative features make it excellent for data teams. More complex than simple BI tools but more powerful.',
  verdict_summary = 'Modern data workspace. Notebooks + SQL + AI together.',
  meta_title = 'Hex Review 2025: Data Workspace Pricing & Features',
  meta_description = 'Hex review with 2025 pricing ($45/user/mo), notebooks, SQL, and AI features. Collaborative data platform.',
  focus_keyword = 'Hex data',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.2,
  ratings_features = 4.5,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 57;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.4,
  stats_company = 'Hex Technologies',
  stats_launch_year = 2020
WHERE id = 57;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 57;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 57, 'Community', '$0', 'free', 0, 'Try Free', 'https://hex.tech'),
(1, 57, 'Team', '$45/user/mo', 'monthly', 1, 'For Teams', 'https://hex.tech/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Personal notebooks' FROM tools_pricing_tiers t WHERE t._parent_id = 57 AND t.name = 'Community';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 57 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Scheduled runs' FROM tools_pricing_tiers t WHERE t._parent_id = 57 AND t.name = 'Team';

DELETE FROM tools_pros WHERE _parent_id = 57;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 57, 'All-in-One', 'Notebooks, SQL, and viz together.');

DELETE FROM tools_cons WHERE _parent_id = 57;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 57, 'Learning Curve', 'More complex than simple BI tools.');

DELETE FROM tools_best_for WHERE _parent_id = 57;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 57, 'Data Teams', 'Modern collaborative analytics');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 57;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 57, 'Non-Technical', 'Requires data skills');

DELETE FROM tools_faqs WHERE _parent_id = 57;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 57, 'What is Hex?', 'Hex is a collaborative data workspace combining notebooks, SQL, and visualization.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 57;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 57, 'data notebook'),
(1, 57, 'Hex vs Jupyter');

-- ============================================
-- RELAY (id=61) - Automation
-- ============================================
UPDATE tools SET
  tagline = 'Human-in-the-loop automation for business workflows',
  excerpt = 'Relay adds human decision points to automation. Build workflows that pause for human input, combining AI automation with human judgment.',
  logo_url = 'https://logo.clearbit.com/relay.app',
  pricing_summary = 'Free: Limited. Starter $15/mo. Pro $45/mo.',
  expert_verdict = 'Relay''s human-in-the-loop approach solves a real problem: automation that needs occasional human judgment. Good for workflows where full automation isn''t appropriate.',
  verdict_summary = 'Automation with human checkpoints. Best for judgment-required workflows.',
  meta_title = 'Relay Review 2025: Human-in-the-Loop Automation Pricing',
  meta_description = 'Relay review with 2025 pricing ($15-$45/mo), human-in-the-loop features, and workflow automation.',
  focus_keyword = 'Relay automation',
  ratings_overall = 4.1,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.2,
  ratings_features = 4.0,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 61;

UPDATE tools SET
  stats_users = '20K+',
  stats_rating = 4.1,
  stats_company = 'Relay',
  stats_launch_year = 2021
WHERE id = 61;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 61;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 61, 'Free', '$0', 'free', 0, 'Try Free', 'https://relay.app'),
(1, 61, 'Starter', '$15/mo', 'monthly', 1, 'Start', 'https://relay.app/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Limited workflows' FROM tools_pricing_tiers t WHERE t._parent_id = 61 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited workflows' FROM tools_pricing_tiers t WHERE t._parent_id = 61 AND t.name = 'Starter';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Human steps' FROM tools_pricing_tiers t WHERE t._parent_id = 61 AND t.name = 'Starter';

DELETE FROM tools_pros WHERE _parent_id = 61;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 61, 'Human Checkpoints', 'Automation that pauses for decisions.');

DELETE FROM tools_cons WHERE _parent_id = 61;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 61, 'Fewer Integrations', 'Less than Zapier or Make.');

DELETE FROM tools_best_for WHERE _parent_id = 61;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 61, 'Approval Workflows', 'Automation needing human review');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 61;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 61, 'Full Automation', 'Use Zapier for hands-off workflows');

DELETE FROM tools_faqs WHERE _parent_id = 61;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 61, 'What is human-in-the-loop?', 'Workflows that pause for human input before continuing.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 61;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 61, 'human-in-the-loop'),
(1, 61, 'Relay vs Zapier');

-- ============================================
-- ACTIVEPIECES (id=62) - Open Source Automation
-- ============================================
UPDATE tools SET
  tagline = 'Open-source automation alternative to Zapier',
  excerpt = 'Activepieces is an open-source automation platform. Self-host for free or use cloud version. Build workflows connecting apps without Zapier pricing.',
  logo_url = 'https://logo.clearbit.com/activepieces.com',
  pricing_summary = 'Self-hosted: Free. Cloud Pro $30/mo.',
  expert_verdict = 'Activepieces offers Zapier-like automation for free when self-hosted. Good for teams with technical resources who want to avoid per-task pricing.',
  verdict_summary = 'Open-source Zapier alternative. Self-host free.',
  meta_title = 'Activepieces Review 2025: Open Source Automation Platform',
  meta_description = 'Activepieces review with 2025 pricing (free self-hosted), open-source features, and Zapier comparison.',
  focus_keyword = 'Activepieces',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.8,
  ratings_features = 4.1,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 62;

UPDATE tools SET
  stats_users = '50K+',
  stats_rating = 4.2,
  stats_company = 'Activepieces',
  stats_launch_year = 2023
WHERE id = 62;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 62;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 62, 'Self-Hosted', '$0', 'free', 1, 'Self-Host', 'https://activepieces.com'),
(1, 62, 'Cloud', '$30/mo', 'monthly', 0, 'Use Cloud', 'https://activepieces.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited tasks' FROM tools_pricing_tiers t WHERE t._parent_id = 62 AND t.name = 'Self-Hosted';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Managed hosting' FROM tools_pricing_tiers t WHERE t._parent_id = 62 AND t.name = 'Cloud';

DELETE FROM tools_pros WHERE _parent_id = 62;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 62, 'Free Self-Hosting', 'Unlimited automation at no cost.');

DELETE FROM tools_cons WHERE _parent_id = 62;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 62, 'Fewer Integrations', 'Less than Zapier.');

DELETE FROM tools_best_for WHERE _parent_id = 62;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 62, 'Technical Teams', 'Free automation with self-hosting');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 62;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 62, 'Non-Technical', 'Zapier easier to use');

DELETE FROM tools_faqs WHERE _parent_id = 62;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 62, 'Is Activepieces free?', 'Yes, self-hosted version is completely free with unlimited tasks.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 62;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 62, 'open source automation'),
(1, 62, 'Activepieces vs Zapier');

-- Note: ids 9, 16, 17, 40, 63, 68, 69 appear to be duplicates or less popular tools
-- Skipping detailed SEO for these to avoid conflicts with existing entries
