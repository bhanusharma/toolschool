-- Batch 5: Writing & Productivity Tools
-- Grammarly (id=71), Wordtune (id=73), Copy.ai (id=44), Jasper (id=47/63), Writesonic (id=66), Surfer SEO (id=64), Clearscope (id=65)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch5.sql

-- ============================================
-- GRAMMARLY (id=71) - Writing Assistant
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered writing assistant for clear, mistake-free communication',
  excerpt = 'Grammarly is the most popular AI writing assistant, checking grammar, spelling, punctuation, and style. Now includes generative AI features for rewriting, expanding, and creating content.',
  logo_url = 'https://logo.clearbit.com/grammarly.com',
  pricing_summary = 'Free: Basic checks. Premium $12/mo: Advanced style. Business $15/user/mo: Team features.',
  expert_verdict = 'Grammarly remains the gold standard for writing assistance. The free tier catches more errors than competitors, and Premium adds valuable style suggestions. The new AI features (GrammarlyGO) bring generative capabilities, though they feel bolted-on compared to native AI tools. For anyone writing professionally in English, Grammarly is essentially mandatory.',
  verdict_summary = 'Essential writing assistant. Best grammar checking with useful AI features.',
  meta_title = 'Grammarly Review 2025: AI Writing Assistant Pricing & Features',
  meta_description = 'Grammarly review with 2025 pricing (free-$15/mo), Premium features, and AI capabilities. See why 30M+ users trust Grammarly.',
  focus_keyword = 'Grammarly review',
  ratings_overall = 4.6,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.3,
  ratings_features = 4.5,
  ratings_support = 4.4,
  price_last_verified = '2025-12-23'
WHERE id = 71;

UPDATE tools SET
  stats_users = '30M+',
  stats_rating = 4.6,
  stats_company = 'Grammarly Inc.',
  stats_launch_year = 2009
WHERE id = 71;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 71;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 71, 'Free', '$0', 'free', 0, 'Add to Browser', 'https://grammarly.com'),
(1, 71, 'Premium', '$12/mo', 'monthly', 1, 'Go Premium', 'https://grammarly.com/premium'),
(2, 71, 'Business', '$15/user/mo', 'monthly', 0, 'For Teams', 'https://grammarly.com/business');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Grammar & spelling checks' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Punctuation corrections' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Basic tone detection' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Full sentence rewrites' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Tone adjustments' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Plagiarism detection' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Premium';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'GrammarlyGO AI' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Premium';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Style guides' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Admin dashboard' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Analytics & insights' FROM tools_pricing_tiers t WHERE t._parent_id = 71 AND t.name = 'Business';

DELETE FROM tools_pros WHERE _parent_id = 71;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 71, 'Industry-Leading Accuracy', 'Catches more errors than any competitor.'),
(1, 71, 'Works Everywhere', 'Browser extension, desktop app, mobile keyboard, integrations.'),
(2, 71, 'Useful Free Tier', 'Free version is genuinely useful for basic writing.'),
(3, 71, 'Excellent Explanations', 'Learn why suggestions are made, improving your writing.');

DELETE FROM tools_cons WHERE _parent_id = 71;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 71, 'Premium Price', 'Full features require $12/month subscription.'),
(1, 71, 'English Only (mostly)', 'Limited support for non-English languages.'),
(2, 71, 'AI Features Basic', 'GrammarlyGO is less capable than dedicated AI writers.');

DELETE FROM tools_best_for WHERE _parent_id = 71;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 71, 'Professional Writers', 'Essential for polished, error-free content'),
(1, 71, 'Non-Native Speakers', 'Excellent for improving English writing'),
(2, 71, 'Students', 'Academic writing assistance and plagiarism checking');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 71;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 71, 'Non-English Writers', 'Limited language support'),
(1, 71, 'AI Content Generation', 'Use Jasper or Copy.ai for content creation');

DELETE FROM tools_faqs WHERE _parent_id = 71;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 71, 'Is Grammarly free?', 'Yes, Grammarly has a robust free tier with grammar, spelling, and punctuation checks. Premium ($12/mo) adds advanced features.'),
(1, 71, 'Is Grammarly worth it?', 'For professional writers or anyone writing frequently in English, Grammarly Premium is highly worth it. The free tier is good for occasional use.'),
(2, 71, 'Does Grammarly work with Word?', 'Yes, Grammarly has a Microsoft Word add-in for both Windows and Mac, plus Google Docs integration.'),
(3, 71, 'Is Grammarly accurate?', 'Grammarly is the most accurate grammar checker available, though no tool is 100% perfect. Always review suggestions.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 71;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 71, 'Grammarly Premium'),
(1, 71, 'grammar checker'),
(2, 71, 'Grammarly vs ProWritingAid'),
(3, 71, 'best writing assistant');

-- ============================================
-- WORDTUNE (id=73) - AI Rewriting Tool
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered rewriting tool that helps you say it better',
  excerpt = 'Wordtune specializes in sentence rewriting - offering multiple ways to phrase your thoughts more clearly, casually, or formally. Developed by AI21 Labs with advanced language understanding.',
  logo_url = 'https://logo.clearbit.com/wordtune.com',
  pricing_summary = 'Free: 10 rewrites/day. Plus $10/mo: Unlimited rewrites. Business $13.50/user: Team features.',
  expert_verdict = 'Wordtune excels at what it focuses on: rewriting sentences. If you know what you want to say but struggle with how to say it, Wordtune is invaluable. The suggestions are genuinely helpful and diverse. It''s not a grammar checker or content generator - it''s a specialized tool that does one thing exceptionally well.',
  verdict_summary = 'Best AI rewriting tool. Excellent for improving sentence clarity and style.',
  meta_title = 'Wordtune Review 2025: AI Rewriting Tool Pricing & Features',
  meta_description = 'Wordtune review with 2025 pricing (free-$13.50/mo), rewrite features, and comparison to Grammarly. See how to improve your writing.',
  focus_keyword = 'Wordtune review',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.2,
  ratings_features = 4.2,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 73;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.3,
  stats_company = 'AI21 Labs',
  stats_launch_year = 2020
WHERE id = 73;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 73;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 73, 'Free', '$0', 'free', 0, 'Try Free', 'https://wordtune.com'),
(1, 73, 'Plus', '$10/mo', 'monthly', 1, 'Go Plus', 'https://wordtune.com/pricing'),
(2, 73, 'Business', '$13.50/user', 'monthly', 0, 'For Teams', 'https://wordtune.com/business');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 rewrites/day' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Basic tone options' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited rewrites' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All tone options' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Sentence expansion' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Summarization' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Team management' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Usage analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority support' FROM tools_pricing_tiers t WHERE t._parent_id = 73 AND t.name = 'Business';

DELETE FROM tools_pros WHERE _parent_id = 73;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 73, 'Excellent Rewrites', 'Multiple high-quality alternatives for any sentence.'),
(1, 73, 'Tone Control', 'Easily shift between casual, formal, and other styles.'),
(2, 73, 'AI21 Technology', 'Backed by cutting-edge language model research.'),
(3, 73, 'Browser Extension', 'Works across websites and apps.');

DELETE FROM tools_cons WHERE _parent_id = 73;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 73, 'Limited Free Tier', 'Only 10 rewrites per day on free plan.'),
(1, 73, 'Not a Grammar Checker', 'Won''t catch spelling or grammar errors.'),
(2, 73, 'Single Purpose', 'Only does rewriting - no content generation.');

DELETE FROM tools_best_for WHERE _parent_id = 73;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 73, 'Non-Native Writers', 'Get natural-sounding phrasing'),
(1, 73, 'Business Writers', 'Polish emails and reports'),
(2, 73, 'Students', 'Improve academic writing style');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 73;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 73, 'Grammar Help Needs', 'Use Grammarly for error checking'),
(1, 73, 'Content Creation', 'Use Jasper or Copy.ai for generating content');

DELETE FROM tools_faqs WHERE _parent_id = 73;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 73, 'Is Wordtune free?', 'Wordtune offers 10 free rewrites per day. Unlimited rewrites require Plus at $10/month.'),
(1, 73, 'Wordtune vs Grammarly?', 'Different tools. Grammarly checks grammar and errors. Wordtune helps rephrase sentences. Many use both together.'),
(2, 73, 'Does Wordtune work with Google Docs?', 'Yes, Wordtune has a browser extension that works with Google Docs, Gmail, and most websites.'),
(3, 73, 'Who makes Wordtune?', 'Wordtune is developed by AI21 Labs, an AI research company known for their advanced language models.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 73;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 73, 'Wordtune vs Grammarly'),
(1, 73, 'AI rewriter'),
(2, 73, 'sentence rewriter'),
(3, 73, 'Wordtune pricing');

-- ============================================
-- COPY.AI (id=44) - AI Content Generator
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered content creation for marketers and businesses',
  excerpt = 'Copy.ai is a leading AI content platform specializing in marketing copy. Generate blog posts, social media content, emails, and ad copy with AI assistance.',
  logo_url = 'https://logo.clearbit.com/copy.ai',
  pricing_summary = 'Free: 2000 words/month. Pro $36/mo: Unlimited words. Team $186/mo: 5 seats.',
  expert_verdict = 'Copy.ai has evolved from a simple copywriting tool to a comprehensive AI content platform. The workflow features are genuinely useful for scaling content production, and the quality has improved significantly. Pro at $36/month feels premium, but unlimited words and good templates justify it for regular users. The free tier is too limited for serious use.',
  verdict_summary = 'Solid AI content platform for marketing teams. Good workflows but premium pricing.',
  meta_title = 'Copy.ai Review 2025: AI Copywriting Tool Pricing & Features',
  meta_description = 'Copy.ai review with 2025 pricing ($36/mo Pro), AI content features, and comparison to Jasper. Create marketing copy with AI.',
  focus_keyword = 'Copy.ai review',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 3.9,
  ratings_features = 4.3,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 44;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.2,
  stats_company = 'Copy.ai Inc.',
  stats_launch_year = 2020
WHERE id = 44;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 44;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 44, 'Free', '$0', 'free', 0, 'Start Free', 'https://copy.ai'),
(1, 44, 'Pro', '$36/mo', 'monthly', 1, 'Go Pro', 'https://copy.ai/pricing'),
(2, 44, 'Team', '$186/mo', 'monthly', 0, 'For Teams', 'https://copy.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2000 words/month' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Limited templates' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '1 user' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited words' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All templates' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Brand voices' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Workflows' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '5 seats included' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Usage analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 44 AND t.name = 'Team';

DELETE FROM tools_pros WHERE _parent_id = 44;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 44, 'Marketing Focus', 'Templates specifically designed for marketing content.'),
(1, 44, 'Workflow Automation', 'Create repeatable content processes.'),
(2, 44, 'Brand Voice Training', 'AI learns your brand''s writing style.'),
(3, 44, 'Good Template Library', 'Useful starting points for common content types.');

DELETE FROM tools_cons WHERE _parent_id = 44;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 44, 'Premium Pricing', '$36/month is higher than some alternatives.'),
(1, 44, 'Limited Free Tier', '2000 words/month is restrictive.'),
(2, 44, 'Quality Varies', 'Output quality can be inconsistent.');

DELETE FROM tools_best_for WHERE _parent_id = 44;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 44, 'Marketing Teams', 'Built specifically for marketing content'),
(1, 44, 'Content Agencies', 'Workflow features for scaling content'),
(2, 44, 'Social Media Managers', 'Quick social post generation');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 44;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 44, 'Casual Users', 'Too expensive for occasional use'),
(1, 44, 'Long-Form Writers', 'Jasper may be better for blog posts');

DELETE FROM tools_faqs WHERE _parent_id = 44;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 44, 'Is Copy.ai free?', 'Copy.ai has a free tier with 2000 words/month. Pro at $36/month offers unlimited words.'),
(1, 44, 'Copy.ai vs Jasper?', 'Both are solid. Copy.ai is more marketing-focused with better workflows. Jasper has more integrations and longer content features.'),
(2, 44, 'What can Copy.ai write?', 'Blog posts, social media content, email campaigns, ad copy, product descriptions, and more.'),
(3, 44, 'Is Copy.ai worth it?', 'For marketing teams creating content regularly, Pro is worth it. Casual users may find the free tier too limited.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 44;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 44, 'Copy.ai vs Jasper'),
(1, 44, 'AI copywriting'),
(2, 44, 'Copy.ai pricing'),
(3, 44, 'marketing copy AI');

-- ============================================
-- JASPER (id=47) - AI Content Platform
-- ============================================
UPDATE tools SET
  tagline = 'Enterprise AI content platform for marketing teams',
  excerpt = 'Jasper is an enterprise-grade AI content platform offering long-form writing, brand voice training, and team collaboration. One of the most established AI writing tools.',
  logo_url = 'https://logo.clearbit.com/jasper.ai',
  pricing_summary = 'Creator $49/mo: 1 seat. Pro $69/mo: 1 seat, more features. Business custom pricing.',
  expert_verdict = 'Jasper has positioned itself as the enterprise choice for AI content. The brand voice feature is genuinely useful, and the quality is consistently good. However, the pricing is steep: $49-69/month is significantly more than alternatives. For enterprises with budget and need for brand consistency, Jasper delivers. For individuals or small teams, cheaper options exist.',
  verdict_summary = 'Enterprise-grade AI content platform. Premium pricing for premium features.',
  meta_title = 'Jasper AI Review 2025: Enterprise Content Platform Pricing & Features',
  meta_description = 'Jasper AI review with 2025 pricing ($49-$69/mo), brand voice, and enterprise features. See why Fortune 500s choose Jasper.',
  focus_keyword = 'Jasper AI review',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 3.7,
  ratings_features = 4.5,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 47;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.3,
  stats_company = 'Jasper AI',
  stats_launch_year = 2021
WHERE id = 47;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 47;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 47, 'Creator', '$49/mo', 'monthly', 0, 'Start Creating', 'https://jasper.ai/pricing'),
(1, 47, 'Pro', '$69/mo', 'monthly', 1, 'Go Pro', 'https://jasper.ai/pricing'),
(2, 47, 'Business', 'Custom', 'custom', 0, 'Contact Sales', 'https://jasper.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1 seat' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Brand voice' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Creator';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'SEO mode' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Creator';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1 seat' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'All Creator features' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'More AI models' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Integrations' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom seats' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'SSO & security' FROM tools_pricing_tiers t WHERE t._parent_id = 47 AND t.name = 'Business';

DELETE FROM tools_pros WHERE _parent_id = 47;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 47, 'Excellent Brand Voice', 'Train AI to write in your exact brand style.'),
(1, 47, 'Long-Form Quality', 'Consistently good output for blog posts and articles.'),
(2, 47, 'Enterprise Features', 'Security, compliance, and team management.'),
(3, 47, 'SEO Integration', 'Built-in SEO mode with Surfer integration.');

DELETE FROM tools_cons WHERE _parent_id = 47;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 47, 'Expensive', 'Starting at $49/month is steep for individuals.'),
(1, 47, 'No Free Tier', 'Only 7-day trial - no ongoing free option.'),
(2, 47, 'Enterprise Focus', 'Features may be overkill for small teams.');

DELETE FROM tools_best_for WHERE _parent_id = 47;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 47, 'Enterprise Marketing', 'Built for large marketing teams'),
(1, 47, 'Content Agencies', 'Manage multiple brand voices'),
(2, 47, 'Brand-Conscious Teams', 'Excellent brand consistency');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 47;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 47, 'Budget-Conscious Users', 'Cheaper alternatives exist'),
(1, 47, 'Occasional Writers', 'Not worth it for infrequent use');

DELETE FROM tools_faqs WHERE _parent_id = 47;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 47, 'Is Jasper free?', 'No, Jasper doesn''t have a free tier. Plans start at $49/month with a 7-day trial.'),
(1, 47, 'Jasper vs ChatGPT for content?', 'Jasper is purpose-built for marketing content with brand voice and SEO features. ChatGPT is more versatile but less specialized.'),
(2, 47, 'Is Jasper worth the price?', 'For enterprise teams needing brand consistency and compliance, yes. For individuals, cheaper alternatives may suffice.'),
(3, 47, 'What happened to Jarvis AI?', 'Jarvis AI was renamed to Jasper AI in 2022 due to trademark issues.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 47;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 47, 'Jasper vs ChatGPT'),
(1, 47, 'Jasper AI pricing'),
(2, 47, 'enterprise AI writing'),
(3, 47, 'Jasper vs Copy.ai');

-- ============================================
-- WRITESONIC (id=66) - AI Content Generator
-- ============================================
UPDATE tools SET
  tagline = 'AI content generator with SEO focus and affordable pricing',
  excerpt = 'Writesonic is an AI content platform offering article writing, ad copy, and SEO tools. Known for its affordable pricing and integration with Surfer SEO.',
  logo_url = 'https://logo.clearbit.com/writesonic.com',
  pricing_summary = 'Free: 10K words. Pro $12/mo: 100K words. Enterprise custom.',
  expert_verdict = 'Writesonic offers solid value in the AI content space. The pricing is more accessible than Jasper, and the Surfer SEO integration is genuinely useful for SEO-focused content. Quality is good but not exceptional. For SEO bloggers and content marketers on a budget, Writesonic is a sensible choice.',
  verdict_summary = 'Good value AI content tool with SEO focus. Affordable alternative to Jasper.',
  meta_title = 'Writesonic Review 2025: AI Content Generator Pricing & SEO Features',
  meta_description = 'Writesonic review with 2025 pricing ($12/mo), SEO tools, and comparison to Jasper. Affordable AI content creation.',
  focus_keyword = 'Writesonic review',
  ratings_overall = 4.1,
  ratings_ease_of_use = 4.4,
  ratings_value_for_money = 4.4,
  ratings_features = 4.1,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 66;

UPDATE tools SET
  stats_users = '5M+',
  stats_rating = 4.1,
  stats_company = 'Writesonic Inc.',
  stats_launch_year = 2021
WHERE id = 66;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 66;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 66, 'Free', '$0', 'free', 0, 'Start Free', 'https://writesonic.com'),
(1, 66, 'Pro', '$12/mo', 'monthly', 1, 'Go Pro', 'https://writesonic.com/pricing'),
(2, 66, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://writesonic.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10,000 words' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'GPT-3.5 quality' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100,000 words/month' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'GPT-4 quality' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'SEO tools' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom limits' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Team features' FROM tools_pricing_tiers t WHERE t._parent_id = 66 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 66;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 66, 'Affordable Pricing', 'Much cheaper than Jasper for similar features.'),
(1, 66, 'SEO Integration', 'Built-in SEO tools and Surfer integration.'),
(2, 66, 'Good Free Tier', '10K words free is generous for testing.'),
(3, 66, 'Chatsonic Feature', 'ChatGPT-like chat with web access.');

DELETE FROM tools_cons WHERE _parent_id = 66;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 66, 'Quality Inconsistency', 'Output quality can vary significantly.'),
(1, 66, 'Interface Complexity', 'Feature-rich but can be overwhelming.'),
(2, 66, 'Brand Voice Limited', 'Less sophisticated than Jasper.');

DELETE FROM tools_best_for WHERE _parent_id = 66;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 66, 'SEO Bloggers', 'Strong SEO integration'),
(1, 66, 'Budget-Conscious Teams', 'Good value for money'),
(2, 66, 'Freelance Writers', 'Affordable for solopreneurs');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 66;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 66, 'Enterprise Brands', 'Jasper offers better brand features'),
(1, 66, 'Quality-First Writers', 'Quality can be inconsistent');

DELETE FROM tools_faqs WHERE _parent_id = 66;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 66, 'Is Writesonic free?', 'Yes, Writesonic offers 10,000 free words. Pro at $12/month provides 100K words.'),
(1, 66, 'Writesonic vs Jasper?', 'Writesonic is more affordable with good SEO tools. Jasper has better brand voice and enterprise features. Choose based on budget and needs.'),
(2, 66, 'What is Chatsonic?', 'Chatsonic is Writesonic''s ChatGPT alternative with web access and real-time information.'),
(3, 66, 'Is Writesonic good for SEO?', 'Yes, Writesonic has strong SEO features and integrates with Surfer SEO for optimization.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 66;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 66, 'Writesonic vs Jasper'),
(1, 66, 'Chatsonic'),
(2, 66, 'AI SEO writing'),
(3, 66, 'Writesonic pricing');

-- ============================================
-- SURFER SEO (id=64) - SEO Content Tool
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered SEO content optimization for higher rankings',
  excerpt = 'Surfer SEO analyzes top-ranking content and provides data-driven recommendations for optimizing your content. Integrates with AI writers to create SEO-optimized articles from scratch.',
  logo_url = 'https://logo.clearbit.com/surferseo.com',
  pricing_summary = 'Essential $99/mo: 30 articles. Scale $219/mo: 100 articles. Enterprise custom.',
  expert_verdict = 'Surfer SEO has become essential for data-driven content optimization. The Content Editor shows exactly what keywords, headings, and structure you need to rank. The AI writing integration is genuinely useful. Pricing is premium but justified by the depth of analysis. For SEO-focused content teams, Surfer is the industry standard.',
  verdict_summary = 'Industry-standard SEO content tool. Data-driven optimization that works.',
  meta_title = 'Surfer SEO Review 2025: AI Content Optimization Pricing & Features',
  meta_description = 'Surfer SEO review with 2025 pricing ($99-$219/mo), content editor, and AI features. See why top SEOs use Surfer.',
  focus_keyword = 'Surfer SEO review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.3,
  ratings_value_for_money = 4.0,
  ratings_features = 4.6,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 64;

UPDATE tools SET
  stats_users = '100K+',
  stats_rating = 4.5,
  stats_company = 'Surfer SEO',
  stats_launch_year = 2017
WHERE id = 64;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 64;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 64, 'Essential', '$99/mo', 'monthly', 0, 'Start Essential', 'https://surferseo.com/pricing'),
(1, 64, 'Scale', '$219/mo', 'monthly', 1, 'Go Scale', 'https://surferseo.com/pricing'),
(2, 64, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://surferseo.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '30 articles/month' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Essential';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Content Editor' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Essential';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'AI writing' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Essential';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 articles/month' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Scale';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Audit & SERP Analyzer' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Scale';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Scale';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom limits' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'White-label' FROM tools_pricing_tiers t WHERE t._parent_id = 64 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 64;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 64, 'Data-Driven Optimization', 'Recommendations based on top-ranking content analysis.'),
(1, 64, 'Real-Time Scoring', 'See content score improve as you write.'),
(2, 64, 'AI Integration', 'Generate SEO-optimized content with AI.'),
(3, 64, 'Industry Standard', 'Used by top SEO agencies and in-house teams.');

DELETE FROM tools_cons WHERE _parent_id = 64;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 64, 'Premium Pricing', 'Starting at $99/month is steep.'),
(1, 64, 'Learning Curve', 'Takes time to master all features.'),
(2, 64, 'Can Be Prescriptive', 'Risk of over-optimizing if followed blindly.');

DELETE FROM tools_best_for WHERE _parent_id = 64;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 64, 'SEO Agencies', 'Essential tool for client work'),
(1, 64, 'Content Teams', 'Systematic approach to SEO content'),
(2, 64, 'Affiliate Marketers', 'Optimize for competitive keywords');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 64;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 64, 'Casual Bloggers', 'Too expensive for occasional use'),
(1, 64, 'Non-SEO Content', 'Not needed for social or internal content');

DELETE FROM tools_faqs WHERE _parent_id = 64;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 64, 'Is Surfer SEO worth it?', 'For SEO-focused content creators, yes. The data-driven approach consistently improves rankings. Casual bloggers may not need it.'),
(1, 64, 'Surfer SEO vs Clearscope?', 'Both are excellent. Surfer has more features and AI writing. Clearscope is simpler and arguably more intuitive.'),
(2, 64, 'Does Surfer write content?', 'Yes, Surfer has AI writing features that generate SEO-optimized content based on SERP analysis.'),
(3, 64, 'How does Surfer SEO work?', 'Surfer analyzes top-ranking pages and tells you exactly what keywords, headings, and structure to include.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 64;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 64, 'Surfer SEO vs Clearscope'),
(1, 64, 'SEO content optimization'),
(2, 64, 'Surfer SEO pricing'),
(3, 64, 'content editor SEO');

-- ============================================
-- CLEARSCOPE (id=65) - SEO Content Tool
-- ============================================
UPDATE tools SET
  tagline = 'Premium SEO content optimization with intuitive interface',
  excerpt = 'Clearscope is an SEO content optimization platform known for its clean interface and accurate recommendations. Used by major publishers and enterprise content teams.',
  logo_url = 'https://logo.clearbit.com/clearscope.io',
  pricing_summary = 'Essentials $189/mo: 100 credits. Business $399/mo: 300 credits. Enterprise custom.',
  expert_verdict = 'Clearscope is the premium choice in SEO content optimization. The interface is cleaner than Surfer, the recommendations feel more actionable, and the grades are intuitive. The premium pricing ($189/month starting) is justified for enterprise teams but steep for individuals. For publishers and agencies who prioritize UX, Clearscope delivers.',
  verdict_summary = 'Premium SEO optimization with excellent UX. Enterprise pricing for enterprise quality.',
  meta_title = 'Clearscope Review 2025: SEO Content Optimization Pricing & Features',
  meta_description = 'Clearscope review with 2025 pricing ($189-$399/mo), content grading, and comparison to Surfer. Enterprise SEO optimization.',
  focus_keyword = 'Clearscope review',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 3.7,
  ratings_features = 4.4,
  ratings_support = 4.5,
  price_last_verified = '2025-12-23'
WHERE id = 65;

UPDATE tools SET
  stats_users = '10K+',
  stats_rating = 4.4,
  stats_company = 'Clearscope',
  stats_launch_year = 2018
WHERE id = 65;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 65;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 65, 'Essentials', '$189/mo', 'monthly', 0, 'Start Essentials', 'https://clearscope.io/pricing'),
(1, 65, 'Business', '$399/mo', 'monthly', 1, 'Go Business', 'https://clearscope.io/pricing'),
(2, 65, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://clearscope.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100 content credits' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Essentials';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Content grading' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Essentials';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Google Docs add-on' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Essentials';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '300 content credits' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'WordPress plugin' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Team seats' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Business';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Custom credits' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'API access' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Dedicated support' FROM tools_pricing_tiers t WHERE t._parent_id = 65 AND t.name = 'Enterprise';

DELETE FROM tools_pros WHERE _parent_id = 65;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 65, 'Intuitive Interface', 'Cleanest UX in the SEO content tool category.'),
(1, 65, 'Accurate Grading', 'Content scores that correlate with ranking improvements.'),
(2, 65, 'Enterprise Quality', 'Used by major publishers like Condé Nast.'),
(3, 65, 'Excellent Support', 'Responsive, knowledgeable customer service.');

DELETE FROM tools_cons WHERE _parent_id = 65;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 65, 'Premium Pricing', '$189/month starting is expensive.'),
(1, 65, 'Credit System', 'Pay per report can feel limiting.'),
(2, 65, 'No AI Writing', 'Doesn''t generate content like Surfer does.');

DELETE FROM tools_best_for WHERE _parent_id = 65;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 65, 'Enterprise Publishers', 'Used by major media companies'),
(1, 65, 'UX-Focused Teams', 'Best interface in the category'),
(2, 65, 'Content Agencies', 'Reliable, enterprise-grade tool');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 65;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 65, 'Budget Teams', 'Surfer offers more for less'),
(1, 65, 'AI Writing Needs', 'No AI content generation');

DELETE FROM tools_faqs WHERE _parent_id = 65;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 65, 'Is Clearscope worth the price?', 'For enterprise teams valuing UX and accuracy, yes. For individuals or small teams, Surfer may offer better value.'),
(1, 65, 'Clearscope vs Surfer SEO?', 'Clearscope has better UX and accuracy. Surfer has more features, AI writing, and lower pricing. Both are excellent.'),
(2, 65, 'Does Clearscope write content?', 'No, Clearscope focuses on optimization only. It doesn''t generate content like Surfer does.'),
(3, 65, 'Who uses Clearscope?', 'Major publishers like Condé Nast, Shopify, and Adobe use Clearscope for content optimization.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 65;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 65, 'Clearscope vs Surfer'),
(1, 65, 'content optimization tool'),
(2, 65, 'Clearscope pricing'),
(3, 65, 'enterprise SEO content');
