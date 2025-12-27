-- SEO Data for Cursor (id=7)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-cursor.sql

UPDATE tools SET
  tagline = 'The AI-first code editor built for pair programming with AI',
  excerpt = 'Cursor is a VS Code fork that puts AI at the center of the coding experience. With deep Claude and GPT-4 integration, it can understand your entire codebase, write multi-file changes, and act as a true AI pair programmer.',
  logo_url = 'https://logo.clearbit.com/cursor.sh',
  pricing_summary = 'Hobby free forever (limited). Pro $20/mo for unlimited AI. Business $40/user/mo with team features.',
  expert_verdict = 'Cursor has captured the imagination of developers who want more than just code completion. It represents a new paradigm: the AI-native IDE. Unlike Copilot which adds AI to your editor, Cursor rebuilds the editor around AI. The Composer feature for multi-file edits is genuinely impressive. At $20/month for Pro, it''s competitively priced. The main downsides are occasional instability and the learning curve of new AI-centric workflows. For developers ready to embrace AI-first development, Cursor is the leading choice.',
  verdict_summary = 'The most ambitious AI coding tool available. Best for developers ready to adopt AI-native workflows.',
  meta_title = 'Cursor Review 2025: The AI Code Editor Worth Switching To?',
  meta_description = 'Cursor AI editor review with pricing ($0-$40/mo), features, and comparison to VS Code + Copilot. See if this AI-first IDE is right for you.',
  focus_keyword = 'Cursor AI editor review',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.2,
  ratings_value_for_money = 4.6,
  ratings_features = 4.8,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 7;

UPDATE tools SET
  stats_users = '500K+',
  stats_rating = 4.5,
  stats_company = 'Anysphere',
  stats_launch_year = 2023
WHERE id = 7;

-- Cursor Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 7;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 7, 'Hobby', '$0', 'free', 0, 'Download Free', 'https://cursor.sh'),
(1, 7, 'Pro', '$20/mo', 'monthly', 1, 'Start Pro Trial', 'https://cursor.sh/pricing'),
(2, 7, 'Business', '$40/user/mo', 'monthly', 0, 'Contact Sales', 'https://cursor.sh/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2000 completions/month' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Hobby';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '50 slow premium requests/month' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Hobby';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Basic AI chat' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Hobby';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited completions' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, '500 fast premium requests/month' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Unlimited slow premium requests' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Claude & GPT-4 access' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, 'Composer for multi-file edits' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Pro';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'All Pro features' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Centralized billing' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Admin dashboard' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Usage analytics' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 4, t.id, 'Privacy mode' FROM tools_pricing_tiers t WHERE t._parent_id = 7 AND t.name = 'Business';

-- Cursor Pros
DELETE FROM tools_pros WHERE _parent_id = 7;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 7, 'Composer for Multi-File Changes', 'AI can make coordinated changes across multiple files - a game-changer for refactoring.'),
(1, 7, 'Deep Codebase Understanding', 'Indexes your entire project to provide context-aware suggestions and answers.'),
(2, 7, 'Multiple AI Models', 'Choose between Claude and GPT-4 based on task requirements.'),
(3, 7, 'VS Code Compatibility', 'Fork of VS Code means your extensions and settings largely work.'),
(4, 7, 'Agent-Like Capabilities', 'Can browse documentation, run terminal commands, and iterate on errors.');

-- Cursor Cons
DELETE FROM tools_cons WHERE _parent_id = 7;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 7, 'Occasional Instability', 'Being newer software, some users report crashes and bugs.'),
(1, 7, 'Learning Curve', 'New AI-centric workflows take time to master for maximum productivity.'),
(2, 7, 'Not Fully VS Code', 'Some VS Code features and extensions may not work perfectly.');

-- Cursor Best For
DELETE FROM tools_best_for WHERE _parent_id = 7;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 7, 'AI-Forward Developers', 'Those ready to adopt AI-native coding workflows'),
(1, 7, 'Full-Stack Developers', 'Multi-file editing shines for cross-cutting changes'),
(2, 7, 'Rapid Prototypers', 'Great for quickly building MVPs and prototypes'),
(3, 7, 'VS Code Users', 'Familiar interface with enhanced AI capabilities');

-- Cursor Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 7;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 7, 'Those Preferring Stability', 'VS Code + Copilot is more battle-tested'),
(1, 7, 'JetBrains Users', 'Cursor is VS Code-based; JetBrains has its own AI tools');

-- Cursor FAQs
DELETE FROM tools_faqs WHERE _parent_id = 7;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 7, 'Is Cursor free?', 'Yes, Cursor has a free Hobby tier with 2000 completions/month. Pro costs $20/month for unlimited AI access.'),
(1, 7, 'Is Cursor better than VS Code with Copilot?', 'Cursor offers more autonomous AI features like multi-file editing (Composer) and deeper codebase understanding. Copilot excels at inline completions. Many developers see Cursor as the next evolution.'),
(2, 7, 'What AI models does Cursor use?', 'Cursor supports Claude 3.5 Sonnet/Opus and GPT-4. You can switch between them based on the task.'),
(3, 7, 'Can I use my VS Code extensions in Cursor?', 'Yes, Cursor is a VS Code fork, so most extensions work. Some may have compatibility issues.'),
(4, 7, 'How does Cursor compare to GitHub Copilot?', 'Copilot is best for inline completions. Cursor offers more ambitious features like multi-file editing and chat-based development. Different philosophies - incremental assistance vs AI-first IDE.');

-- Cursor Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 7;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 7, 'Cursor vs Copilot'),
(1, 7, 'Cursor AI pricing'),
(2, 7, 'Cursor IDE review'),
(3, 7, 'best AI code editor');
