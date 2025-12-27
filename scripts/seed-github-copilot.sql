-- SEO Data for GitHub Copilot (id=8)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-github-copilot.sql

UPDATE tools SET
  tagline = 'AI pair programmer that helps you write code faster with intelligent suggestions',
  excerpt = 'GitHub Copilot is the most widely adopted AI coding assistant, used by over 1.8 million developers. Powered by OpenAI Codex, it provides real-time code suggestions, completes entire functions, and understands context across your codebase.',
  logo_url = 'https://logo.clearbit.com/github.com',
  pricing_summary = 'Free for students/OSS maintainers. Individual $10/mo. Business $19/user/mo. Enterprise $39/user/mo.',
  expert_verdict = 'GitHub Copilot has become the industry standard for AI-assisted coding. Its tight IDE integration, understanding of your codebase, and high-quality suggestions make it genuinely useful for day-to-day development. The $10/month Individual plan is a no-brainer for professional developers - the productivity gains easily justify the cost. Copilot Chat brings conversational AI directly into your editor. For teams, Business and Enterprise plans add admin controls and security features. While competitors like Cursor and Codeium are gaining ground, Copilot''s GitHub integration and massive training dataset keep it ahead.',
  verdict_summary = 'The gold standard for AI coding assistants. Essential for professional developers seeking productivity gains.',
  meta_title = 'GitHub Copilot Review 2025: Pricing, Features & Is It Worth It?',
  meta_description = 'GitHub Copilot review with 2025 pricing ($10-$39/mo), features, and real developer opinions. Free for students. Compare Individual vs Business plans.',
  focus_keyword = 'GitHub Copilot review',
  ratings_overall = 4.6,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.5,
  ratings_features = 4.7,
  ratings_support = 4.3,
  price_last_verified = '2025-12-23'
WHERE id = 8;

UPDATE tools SET
  stats_users = '1.8M+',
  stats_rating = 4.6,
  stats_company = 'GitHub (Microsoft)',
  stats_launch_year = 2021
WHERE id = 8;

-- GitHub Copilot Pricing Tiers
DELETE FROM tools_pricing_tiers WHERE _parent_id = 8;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 8, 'Free', '$0', 'free', 0, 'Apply for Free Access', 'https://github.com/features/copilot'),
(1, 8, 'Individual', '$10/mo', 'monthly', 1, 'Start Free Trial', 'https://github.com/features/copilot'),
(2, 8, 'Business', '$19/user/mo', 'monthly', 0, 'Start Business Trial', 'https://github.com/features/copilot/business'),
(3, 8, 'Enterprise', '$39/user/mo', 'monthly', 0, 'Contact Sales', 'https://github.com/features/copilot/enterprise');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'For verified students & OSS maintainers' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Code completions in IDE' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Copilot Chat' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Code completions in all IDEs' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Individual';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Copilot Chat in IDE & mobile' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Individual';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'CLI assistance' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Individual';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Security vulnerability filtering' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Individual';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'All Individual features' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Organization-wide policy management' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Audit logs' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Business';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Exclude specified files' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Business';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'All Business features' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Fine-tuned models for your code' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'SAML SSO' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Enterprise';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'IP indemnity' FROM tools_pricing_tiers t WHERE t._parent_id = 8 AND t.name = 'Enterprise';

-- GitHub Copilot Pros
DELETE FROM tools_pros WHERE _parent_id = 8;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 8, 'Best-in-Class IDE Integration', 'Works seamlessly in VS Code, JetBrains, Neovim, and Visual Studio with minimal setup.'),
(1, 8, 'Excellent Context Understanding', 'Analyzes your entire codebase to provide relevant suggestions that match your coding style.'),
(2, 8, 'Copilot Chat', 'Conversational AI in your IDE for explaining code, generating tests, and debugging.'),
(3, 8, 'Free for Students', 'Verified students and open source maintainers get free access.'),
(4, 8, 'GitHub Ecosystem Integration', 'Tight integration with GitHub repos, PRs, and Actions workflows.');

-- GitHub Copilot Cons
DELETE FROM tools_cons WHERE _parent_id = 8;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 8, 'Subscription Required', 'No free tier for professional developers - $10/mo minimum after trial.'),
(1, 8, 'Occasional Irrelevant Suggestions', 'Sometimes generates code that doesn''t fit context or introduces bugs.'),
(2, 8, 'Privacy Concerns', 'Code is sent to GitHub servers - may not suit all enterprise security requirements.');

-- GitHub Copilot Best For
DELETE FROM tools_best_for WHERE _parent_id = 8;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 8, 'Professional Developers', 'Productivity gains easily justify $10/month subscription'),
(1, 8, 'Students', 'Free access with valid student credentials'),
(2, 8, 'Open Source Contributors', 'Free for verified OSS maintainers'),
(3, 8, 'Teams Using GitHub', 'Best integration with GitHub-based workflows');

-- GitHub Copilot Not Ideal For
DELETE FROM tools_not_ideal_for WHERE _parent_id = 8;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 8, 'Air-Gapped Environments', 'Requires internet connection to function'),
(1, 8, 'Those Needing Local-Only AI', 'Code is processed on GitHub servers');

-- GitHub Copilot FAQs
DELETE FROM tools_faqs WHERE _parent_id = 8;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 8, 'Is GitHub Copilot free?', 'Free for verified students and open source maintainers. For others, Individual costs $10/month or $100/year after a free trial.'),
(1, 8, 'Is GitHub Copilot worth $10/month?', 'For professional developers, yes. Studies show 55% faster task completion. The productivity gains typically far exceed the cost.'),
(2, 8, 'What IDEs support GitHub Copilot?', 'VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, etc.), Neovim, and GitHub.com itself.'),
(3, 8, 'Does GitHub Copilot use my code for training?', 'GitHub Copilot Business and Enterprise do not use your code for training. Individual plan has opt-out options.'),
(4, 8, 'How does Copilot compare to Cursor?', 'Copilot excels at inline completions and GitHub integration. Cursor offers more autonomous coding features and uses Claude/GPT-4. Many developers use both.');

-- GitHub Copilot Secondary Keywords
DELETE FROM tools_secondary_keywords WHERE _parent_id = 8;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 8, 'GitHub Copilot pricing'),
(1, 8, 'GitHub Copilot free'),
(2, 8, 'GitHub Copilot vs Cursor'),
(3, 8, 'is GitHub Copilot worth it');
