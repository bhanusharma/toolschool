-- SEO Data for Claude (id=23)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-claude.sql

UPDATE tools SET
  tagline = 'Advanced AI assistant by Anthropic known for safety, helpfulness, and nuanced reasoning',
  excerpt = 'Claude is Anthropic''s flagship AI assistant, designed to be helpful, harmless, and honest. With superior long-context understanding (200K tokens), exceptional reasoning, and Constitutional AI safety, Claude excels at complex analysis, coding, and nuanced conversations.',
  logo_url = 'https://logo.clearbit.com/anthropic.com',
  pricing_summary = 'Free tier available. Pro at $20/mo for priority access. Team at $25/user/mo. Enterprise with custom pricing.',
  expert_verdict = 'Claude has emerged as the thinking person''s AI assistant. While ChatGPT dominates in popularity, Claude consistently outperforms on tasks requiring nuance, long-form analysis, and careful reasoning. The 200K context window is genuinely transformative for document work. Anthropic''s focus on safety means Claude is more likely to give thoughtful, balanced responses. The free tier is generous, and Pro at $20/mo matches ChatGPT Plus pricing. For researchers, writers, and professionals who value depth over breadth, Claude is often the better choice.',
  verdict_summary = 'The best AI for nuanced reasoning, long documents, and thoughtful analysis. A worthy ChatGPT alternative with unique strengths.',
  meta_title = 'Claude AI Review 2025: Features, Pricing & Comparison',
  meta_description = 'Claude AI by Anthropic review with 2025 pricing, 200K context window, and comparison to ChatGPT. Free tier available. See pros, cons, and use cases.',
  focus_keyword = 'Claude AI review',
  ratings_overall = 4.7,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.6,
  ratings_features = 4.7,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 23;

UPDATE tools SET
  stats_users = '100M+',
  stats_rating = 4.7,
  stats_company = 'Anthropic',
  stats_launch_year = 2023
WHERE id = 23;

-- Claude Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 23;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 23, 'Free', '$0', 'free', 0, 'Try Claude Free', 'https://claude.ai'),
(1, 23, 'Pro', '$20/mo', 'monthly', 1, 'Upgrade to Pro', 'https://claude.ai/upgrade'),
(2, 23, 'Team', '$25/user/mo', 'monthly', 0, 'Start Team', 'https://claude.ai/team'),
(3, 23, 'Enterprise', 'Custom', 'custom', 0, 'Contact Sales', 'https://anthropic.com/claude/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Access to Claude 3.5 Sonnet' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Limited daily messages' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'File uploads up to 10MB' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Claude 3.5 Sonnet & Opus' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '5x more usage than Free' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Priority access at peak times' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Projects for organized work' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, '200K context window' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'All Pro features' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Higher usage limits' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Admin dashboard' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Team';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'No training on your data' FROM tools_pricing_tiers t WHERE t._parent_id = 23 AND t.name = 'Team';

-- Claude Pros
DELETE FROM tools_pros WHERE _parent_id = 23;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 23, 'Industry-Leading Context Window', '200K tokens means Claude can process entire books, codebases, or document sets in a single conversation.'),
(1, 23, 'Superior Long-Form Analysis', 'Excels at synthesizing complex information, producing coherent long documents, and maintaining context.'),
(2, 23, 'Thoughtful, Nuanced Responses', 'Constitutional AI training produces more balanced, careful answers that consider multiple perspectives.'),
(3, 23, 'Excellent at Following Instructions', 'Better at adhering to complex, multi-part instructions and maintaining specified formats.'),
(4, 23, 'Strong Coding Capabilities', 'Claude 3.5 Sonnet rivals GPT-4 on coding benchmarks, with excellent debugging skills.');

-- Claude Cons
DELETE FROM tools_cons WHERE _parent_id = 23;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 23, 'More Conservative Than ChatGPT', 'Safety focus means Claude may refuse some edge-case requests that ChatGPT handles.'),
(1, 23, 'Smaller Ecosystem', 'Fewer integrations, plugins, and third-party tools compared to ChatGPT''s massive ecosystem.'),
(2, 23, 'No Image Generation', 'Unlike ChatGPT with DALL-E, Claude cannot create images - text and analysis only.');

-- Claude Best For
DELETE FROM tools_best_for WHERE _parent_id = 23;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 23, 'Researchers & Analysts', 'Unmatched ability to process and synthesize long documents'),
(1, 23, 'Technical Writers', 'Excellent at producing coherent, well-structured long-form content'),
(2, 23, 'Developers', 'Strong coding with thoughtful explanations'),
(3, 23, 'Legal & Compliance Professionals', 'Can analyze lengthy contracts and policies accurately');

-- Claude Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 23;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 23, 'Image Generation Needs', 'Claude is text-only - use ChatGPT/DALL-E or Midjourney for images'),
(1, 23, 'Plugin/Integration Heavy Workflows', 'ChatGPT has a larger ecosystem of integrations');

-- Claude FAQs
DELETE FROM tools_faqs WHERE _parent_id = 23;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 23, 'Is Claude free to use?', 'Yes, Claude offers a free tier with access to Claude 3.5 Sonnet and limited daily messages. Pro costs $20/month for higher limits and access to Claude Opus.'),
(1, 23, 'Is Claude better than ChatGPT?', 'Claude excels at long-document analysis (200K context), nuanced reasoning, and following complex instructions. ChatGPT has a larger ecosystem and image generation. Choose based on your needs.'),
(2, 23, 'What is Claude''s context window?', 'Claude supports up to 200,000 tokens (about 150,000 words or 500 pages), far larger than most competitors. This allows analyzing entire books or codebases.'),
(3, 23, 'Who makes Claude?', 'Claude is developed by Anthropic, an AI safety company founded in 2021 by former OpenAI researchers including Dario and Daniela Amodei. They''ve raised over $7 billion.'),
(4, 23, 'Can Claude write code?', 'Yes, Claude 3.5 Sonnet is excellent at coding, rivaling GPT-4 on benchmarks. It can write, explain, debug, and refactor code in most programming languages.');

-- Claude Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 23;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 23, 'Claude vs ChatGPT'),
(1, 23, 'Claude AI pricing'),
(2, 23, 'Anthropic Claude'),
(3, 23, 'Claude context window');
