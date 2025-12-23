-- Batch 4: Video Editing & Chat AI Tools
-- Clipchamp (id=26), Captions (id=27), Veed (id=28), InVideo (id=29), Character AI (id=10), NotebookLM (id=11)
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/seed-batch4.sql

-- ============================================
-- CLIPCHAMP (id=26) - Video Editing
-- ============================================
UPDATE tools SET
  tagline = 'Microsoft''s free AI-powered video editor for creators',
  excerpt = 'Clipchamp is Microsoft''s cloud-based video editor with AI features including auto-captions, text-to-speech, and background removal. Free for personal use, integrated with Microsoft 365.',
  logo_url = 'https://logo.clearbit.com/clipchamp.com',
  pricing_summary = 'Free: Full features, 1080p export. Essentials $12/mo: Brand kit, premium content.',
  expert_verdict = 'Clipchamp is a pleasant surprise from Microsoft - a genuinely capable free video editor. The AI auto-captions work well, the interface is intuitive, and 1080p exports are free. For basic video editing with AI assistance, it''s hard to beat free. Power users may want more features, but for most creators, Clipchamp delivers.',
  verdict_summary = 'Best free AI video editor. Microsoft quality at no cost.',
  meta_title = 'Clipchamp Review 2025: Free AI Video Editor Features & Pricing',
  meta_description = 'Clipchamp review with 2025 features, AI captions, and Microsoft 365 integration. See why it''s the best free video editor.',
  focus_keyword = 'Clipchamp review',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 4.9,
  ratings_features = 4.0,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 26;

UPDATE tools SET
  stats_users = '50M+',
  stats_rating = 4.2,
  stats_company = 'Microsoft',
  stats_launch_year = 2021
WHERE id = 26;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 26;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 26, 'Free', '$0', 'free', 1, 'Start Free', 'https://clipchamp.com'),
(1, 26, 'Essentials', '$12/mo', 'monthly', 0, 'Go Essentials', 'https://clipchamp.com/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '1080p exports' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'AI auto-captions' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Background removal' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Text-to-speech' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Brand kit' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Essentials';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Premium stock content' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Essentials';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Backup & sync' FROM tools_pricing_tiers t WHERE t._parent_id = 26 AND t.name = 'Essentials';

DELETE FROM tools_pros WHERE _parent_id = 26;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 26, 'Completely Free', 'Full-featured editor with 1080p exports at no cost.'),
(1, 26, 'AI Auto-Captions', 'Accurate automatic subtitles save hours of work.'),
(2, 26, 'Microsoft Integration', 'Works seamlessly with OneDrive and Microsoft 365.'),
(3, 26, 'Browser-Based', 'No download required, works on any computer.');

DELETE FROM tools_cons WHERE _parent_id = 26;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 26, 'Limited Advanced Features', 'Power users may want more effects and controls.'),
(1, 26, 'Windows Focus', 'Desktop app only available for Windows.'),
(2, 26, 'Basic Color Grading', 'Professional colorists will want more tools.');

DELETE FROM tools_best_for WHERE _parent_id = 26;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 26, 'Beginners', 'Easy learning curve with powerful features'),
(1, 26, 'Microsoft 365 Users', 'Seamless integration'),
(2, 26, 'Budget Creators', 'Professional results at zero cost');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 26;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 26, 'Professional Editors', 'Premiere Pro or DaVinci for advanced work'),
(1, 26, 'Mac Power Users', 'Final Cut Pro offers more on Mac');

DELETE FROM tools_faqs WHERE _parent_id = 26;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 26, 'Is Clipchamp really free?', 'Yes, Clipchamp offers full video editing features including 1080p export completely free. Premium features cost $12/month.'),
(1, 26, 'Does Clipchamp have AI?', 'Yes, Clipchamp includes AI auto-captions, text-to-speech, and background removal powered by AI.'),
(2, 26, 'Is Clipchamp owned by Microsoft?', 'Yes, Microsoft acquired Clipchamp in 2021 and integrated it into Windows 11 and Microsoft 365.'),
(3, 26, 'Clipchamp vs CapCut?', 'Both are excellent free options. Clipchamp integrates with Microsoft; CapCut has more trendy effects and TikTok integration.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 26;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 26, 'free video editor'),
(1, 26, 'Clipchamp vs CapCut'),
(2, 26, 'Microsoft video editor'),
(3, 26, 'AI captions');

-- ============================================
-- CAPTIONS (id=27) - AI Video Captions
-- ============================================
UPDATE tools SET
  tagline = 'AI-powered captions and video editing for creators',
  excerpt = 'Captions is an AI-first video app that automatically adds captions, removes filler words, adds eye contact, and enhances videos. Popular with social media creators for polished, accessible content.',
  logo_url = 'https://logo.clearbit.com/captions.ai',
  pricing_summary = 'Free: Basic features. Pro $10/mo: All AI features, no watermark.',
  expert_verdict = 'Captions has nailed the "one-tap enhancement" workflow. Upload a video, and AI handles captions, removes ums and ahs, and even corrects eye contact. For talking-head content creators, it''s magical. The $10/month Pro plan is reasonable for the time saved. Less useful for non-talking-head content.',
  verdict_summary = 'Best AI video enhancement for talking-head content. Magical one-tap improvements.',
  meta_title = 'Captions AI Review 2025: Auto Captions, Eye Contact & Pricing',
  meta_description = 'Captions AI review with 2025 pricing ($10/mo), AI eye contact, filler word removal, and auto-captions. Best for creators.',
  focus_keyword = 'Captions AI',
  ratings_overall = 4.4,
  ratings_ease_of_use = 4.8,
  ratings_value_for_money = 4.4,
  ratings_features = 4.5,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 27;

UPDATE tools SET
  stats_users = '15M+',
  stats_rating = 4.4,
  stats_company = 'Captions Technologies',
  stats_launch_year = 2021
WHERE id = 27;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 27;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 27, 'Free', '$0', 'free', 0, 'Try Free', 'https://captions.ai'),
(1, 27, 'Pro', '$10/mo', 'monthly', 1, 'Go Pro', 'https://captions.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Basic auto-captions' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Watermark on exports' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Limited features' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'AI eye contact correction' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Filler word removal' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'No watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Premium caption styles' FROM tools_pricing_tiers t WHERE t._parent_id = 27 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 27;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 27, 'AI Eye Contact', 'Magically corrects eye contact to look at camera.'),
(1, 27, 'Filler Word Removal', 'Automatically removes ums, ahs, and pauses.'),
(2, 27, 'Accurate Captions', 'High-quality auto-generated subtitles.'),
(3, 27, 'One-Tap Enhancement', 'Multiple AI improvements with single tap.');

DELETE FROM tools_cons WHERE _parent_id = 27;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 27, 'Talking Head Focus', 'Best features only work for face-to-camera content.'),
(1, 27, 'Mobile-First', 'Desktop experience is limited.'),
(2, 27, 'Limited Editing', 'Not a full-featured editor for complex projects.');

DELETE FROM tools_best_for WHERE _parent_id = 27;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 27, 'Social Media Creators', 'Perfect for TikTok, Instagram, YouTube Shorts'),
(1, 27, 'Course Creators', 'Polish talking-head educational content'),
(2, 27, 'Podcasters', 'Turn podcast clips into captioned video');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 27;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 27, 'Non-Talking Content', 'AI features focus on face-to-camera'),
(1, 27, 'Complex Video Projects', 'Use Premiere or DaVinci for advanced editing');

DELETE FROM tools_faqs WHERE _parent_id = 27;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 27, 'How does Captions AI eye contact work?', 'Captions uses AI to detect your eyes and subtly adjust them to appear looking at the camera, even if you were reading a script.'),
(1, 27, 'Is Captions free?', 'Basic features are free with watermark. Pro at $10/month removes watermark and adds eye contact, filler removal, and premium features.'),
(2, 27, 'Captions vs CapCut?', 'Captions focuses on AI enhancement (eye contact, filler removal). CapCut is a more traditional video editor. Use both together.'),
(3, 27, 'Does Captions work on desktop?', 'Captions is mobile-first (iOS/Android). Limited web version available.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 27;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 27, 'AI eye contact'),
(1, 27, 'auto captions app'),
(2, 27, 'remove filler words'),
(3, 27, 'Captions vs CapCut');

-- ============================================
-- VEED (id=28) - AI Video Editor
-- ============================================
UPDATE tools SET
  tagline = 'Online video editor with powerful AI tools for creators and teams',
  excerpt = 'VEED is a browser-based video editor with comprehensive AI features: auto-subtitles, text-to-video, avatars, translations, and more. Popular with marketers and content teams.',
  logo_url = 'https://logo.clearbit.com/veed.io',
  pricing_summary = 'Free: 2GB storage, watermark. Basic $18/mo: 25GB, no watermark. Pro $30/mo: 100GB, brand kit.',
  expert_verdict = 'VEED has evolved into a serious AI video platform. The subtitle accuracy is excellent, AI avatars are useful for explainer content, and the browser-based editor is surprisingly capable. Pricing is higher than simpler tools but justified by the feature set. For marketing teams and content creators who need polished video at scale, VEED delivers.',
  verdict_summary = 'Comprehensive AI video platform for teams. Excellent subtitles and AI features.',
  meta_title = 'VEED Review 2025: AI Video Editor Pricing, Subtitles & Features',
  meta_description = 'VEED.io review with 2025 pricing ($18-$30/mo), AI subtitles, avatars, and video editing features. See why teams choose VEED.',
  focus_keyword = 'VEED review',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.1,
  ratings_features = 4.5,
  ratings_support = 4.2,
  price_last_verified = '2025-12-23'
WHERE id = 28;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.3,
  stats_company = 'VEED Limited',
  stats_launch_year = 2019
WHERE id = 28;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 28;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 28, 'Free', '$0', 'free', 0, 'Start Free', 'https://veed.io'),
(1, 28, 'Basic', '$18/mo', 'monthly', 1, 'Go Basic', 'https://veed.io/pricing'),
(2, 28, 'Pro', '$30/mo', 'monthly', 0, 'Go Pro', 'https://veed.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '2GB storage' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'VEED watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '10 min video length' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '25GB storage' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Basic';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '25 min videos' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Basic';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '100GB storage' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Brand kit' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Pro';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, '2 hour videos' FROM tools_pricing_tiers t WHERE t._parent_id = 28 AND t.name = 'Pro';

DELETE FROM tools_pros WHERE _parent_id = 28;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 28, 'Accurate AI Subtitles', 'Industry-leading auto-caption accuracy.'),
(1, 28, 'AI Avatars', 'Create talking-head videos with AI-generated presenters.'),
(2, 28, 'Translation', 'Auto-translate subtitles to 100+ languages.'),
(3, 28, 'Team Features', 'Collaboration tools for marketing teams.');

DELETE FROM tools_cons WHERE _parent_id = 28;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 28, 'Higher Pricing', 'More expensive than simpler alternatives.'),
(1, 28, 'Storage Limits', 'Can fill up quickly with video projects.'),
(2, 28, 'Learning Curve', 'Feature-rich interface takes time to master.');

DELETE FROM tools_best_for WHERE _parent_id = 28;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 28, 'Marketing Teams', 'Scale video production with AI assistance'),
(1, 28, 'Content Agencies', 'Team collaboration and brand consistency'),
(2, 28, 'International Content', 'Excellent translation features');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 28;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 28, 'Casual Creators', 'CapCut or Clipchamp are simpler and cheaper'),
(1, 28, 'Professional Editors', 'Desktop NLEs still more powerful');

DELETE FROM tools_faqs WHERE _parent_id = 28;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 28, 'Is VEED free?', 'VEED has a free tier with 2GB storage and watermark. Paid plans start at $18/month.'),
(1, 28, 'How accurate are VEED subtitles?', 'VEED is known for industry-leading subtitle accuracy, typically 95%+ correct.'),
(2, 28, 'VEED vs Descript?', 'Both have AI transcription. VEED is more video-focused; Descript is better for podcast editing.'),
(3, 28, 'Can VEED translate videos?', 'Yes, VEED can auto-translate subtitles to 100+ languages and even generate AI voiceovers.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 28;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 28, 'VEED pricing'),
(1, 28, 'online video editor'),
(2, 28, 'AI subtitles'),
(3, 28, 'VEED vs CapCut');

-- ============================================
-- INVIDEO (id=29) - AI Video Creator
-- ============================================
UPDATE tools SET
  tagline = 'Turn ideas into videos with AI-powered creation',
  excerpt = 'InVideo is an AI video platform that creates videos from text prompts. Describe your video, and AI generates scripts, selects stock footage, adds music, and produces polished results.',
  logo_url = 'https://logo.clearbit.com/invideo.io',
  pricing_summary = 'Free: 10 min/week, watermark. Plus $25/mo: 50 min/week. Max $60/mo: 200 min/week.',
  expert_verdict = 'InVideo AI is genuinely useful for creating video content at scale. The AI script generation is competent, stock footage selection is relevant, and output quality is acceptable for social media and marketing. Not for high-end production, but excellent for rapid content creation. The Plus plan at $25/month is reasonable for businesses.',
  verdict_summary = 'Best AI video creation from text. Great for rapid marketing content.',
  meta_title = 'InVideo AI Review 2025: Text-to-Video Pricing & Features',
  meta_description = 'InVideo AI review with 2025 pricing ($25-$60/mo), text-to-video features, and comparison. Create videos from prompts.',
  focus_keyword = 'InVideo AI',
  ratings_overall = 4.2,
  ratings_ease_of_use = 4.5,
  ratings_value_for_money = 4.2,
  ratings_features = 4.3,
  ratings_support = 4.1,
  price_last_verified = '2025-12-23'
WHERE id = 29;

UPDATE tools SET
  stats_users = '7M+',
  stats_rating = 4.2,
  stats_company = 'InVideo Inc.',
  stats_launch_year = 2017
WHERE id = 29;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 29;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 29, 'Free', '$0', 'free', 0, 'Try Free', 'https://invideo.io'),
(1, 29, 'Plus', '$25/mo', 'monthly', 1, 'Go Plus', 'https://invideo.io/pricing'),
(2, 29, 'Max', '$60/mo', 'monthly', 0, 'Go Max', 'https://invideo.io/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '10 min AI video/week' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'InVideo watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'iStock media library' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '50 min AI video/week' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'No watermark' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Plus';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Voice cloning' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Plus';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, '200 min AI video/week' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Priority rendering' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Max';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Team collaboration' FROM tools_pricing_tiers t WHERE t._parent_id = 29 AND t.name = 'Max';

DELETE FROM tools_pros WHERE _parent_id = 29;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 29, 'True Text-to-Video', 'Describe a video, AI creates it complete with footage and music.'),
(1, 29, 'Script Generation', 'AI writes compelling scripts from simple prompts.'),
(2, 29, 'Stock Integration', 'Automatically selects relevant iStock footage.'),
(3, 29, 'Voice Cloning', 'Clone your voice for consistent AI narration.');

DELETE FROM tools_cons WHERE _parent_id = 29;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 29, 'Generic Results', 'AI-generated videos can feel templated.'),
(1, 29, 'Stock Footage Dependent', 'Limited without access to premium stock.'),
(2, 29, 'Time Limits', 'Weekly minute limits can be restrictive.');

DELETE FROM tools_best_for WHERE _parent_id = 29;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 29, 'Marketing Teams', 'Rapid video ad creation'),
(1, 29, 'Social Media Managers', 'Quick content for multiple platforms'),
(2, 29, 'Small Businesses', 'Professional videos without video skills');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 29;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 29, 'Brand-Conscious Companies', 'Results can feel generic'),
(1, 29, 'Custom Content Needs', 'Limited to available stock footage');

DELETE FROM tools_faqs WHERE _parent_id = 29;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 29, 'How does InVideo AI work?', 'Describe your video in text (topic, style, audience), and AI generates a script, selects stock footage, adds music, and produces a complete video.'),
(1, 29, 'Is InVideo free?', 'Free tier allows 10 minutes of AI video per week with watermark. Plus plan ($25/mo) offers 50 minutes without watermark.'),
(2, 29, 'InVideo vs Synthesia?', 'InVideo uses stock footage; Synthesia uses AI avatars. InVideo is more versatile; Synthesia is better for talking-head content.'),
(3, 29, 'What''s voice cloning in InVideo?', 'Record a few minutes of your voice, and AI can generate narration in your voice for future videos.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 29;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 29, 'text to video AI'),
(1, 29, 'InVideo pricing'),
(2, 29, 'AI video maker'),
(3, 29, 'InVideo vs Synthesia');

-- ============================================
-- CHARACTER AI (id=10) - AI Chatbot
-- ============================================
UPDATE tools SET
  tagline = 'Chat with AI characters - fictional, historical, or custom-created',
  excerpt = 'Character.AI lets you chat with AI-powered characters - celebrities, fictional heroes, historical figures, or characters you create. Popular for roleplay, entertainment, and creative exploration.',
  logo_url = 'https://logo.clearbit.com/character.ai',
  pricing_summary = 'Free: Full access with ads. c.ai+ $10/mo: Priority access, no ads, longer memory.',
  expert_verdict = 'Character.AI has created something unique - AI companions that feel genuinely engaging. Whether chatting with fictional characters, practicing languages, or exploring creative roleplay, the experience is compelling. Free tier is generous; $10/month removes friction. Not a productivity tool, but excellent for entertainment and creative exploration.',
  verdict_summary = 'Best AI character chat platform. Engaging roleplay and entertainment.',
  meta_title = 'Character AI Review 2025: Pricing, Features & AI Chatbot Platform',
  meta_description = 'Character.AI review with 2025 pricing (free-$10/mo), character creation, and chat features. See why millions chat with AI characters.',
  focus_keyword = 'Character AI',
  ratings_overall = 4.3,
  ratings_ease_of_use = 4.7,
  ratings_value_for_money = 4.5,
  ratings_features = 4.3,
  ratings_support = 3.9,
  price_last_verified = '2025-12-23'
WHERE id = 10;

UPDATE tools SET
  stats_users = '20M+',
  stats_rating = 4.3,
  stats_company = 'Character Technologies',
  stats_launch_year = 2022
WHERE id = 10;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 10;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 10, 'Free', '$0', 'free', 1, 'Start Chatting', 'https://character.ai'),
(1, 10, 'c.ai+', '$10/mo', 'monthly', 0, 'Go Plus', 'https://character.ai/pricing');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited chats' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Create characters' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Contains ads' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'Free';

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Priority access' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'c.ai+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Longer memory' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'c.ai+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'No ads' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'c.ai+';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'Faster responses' FROM tools_pricing_tiers t WHERE t._parent_id = 10 AND t.name = 'c.ai+';

DELETE FROM tools_pros WHERE _parent_id = 10;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 10, 'Engaging Characters', 'AI characters feel genuinely interactive and responsive.'),
(1, 10, 'Character Creation', 'Create and share your own AI characters.'),
(2, 10, 'Generous Free Tier', 'Full functionality available for free.'),
(3, 10, 'Vast Library', 'Millions of user-created characters to explore.');

DELETE FROM tools_cons WHERE _parent_id = 10;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 10, 'Content Filters', 'Strict content moderation limits some conversations.'),
(1, 10, 'Memory Limitations', 'Characters can forget earlier conversation context.'),
(2, 10, 'Not Productive', 'Entertainment-focused, not a work tool.');

DELETE FROM tools_best_for WHERE _parent_id = 10;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 10, 'Entertainment Seekers', 'Fun conversations with interesting characters'),
(1, 10, 'Roleplay Enthusiasts', 'Creative storytelling and character interaction'),
(2, 10, 'Language Learners', 'Practice conversations with patient AI');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 10;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 10, 'Productivity Needs', 'Use ChatGPT or Claude for work tasks'),
(1, 10, 'Adult Content', 'Strict content filters in place');

DELETE FROM tools_faqs WHERE _parent_id = 10;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 10, 'Is Character AI free?', 'Yes, Character.AI offers unlimited free chats with ads. c.ai+ at $10/month removes ads and adds premium features.'),
(1, 10, 'Is Character AI safe?', 'Character.AI has content filters and safety measures. All conversations are with AI - no real humans involved.'),
(2, 10, 'Can I create my own character?', 'Yes, anyone can create and share AI characters. Define personality, background, and conversation style.'),
(3, 10, 'Character AI vs ChatGPT?', 'Character AI focuses on personality and roleplay. ChatGPT is better for tasks, information, and productivity.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 10;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 10, 'Character AI free'),
(1, 10, 'AI chat characters'),
(2, 10, 'Character AI vs ChatGPT'),
(3, 10, 'roleplay AI');

-- ============================================
-- NOTEBOOKLM (id=11) - AI Research Assistant
-- ============================================
UPDATE tools SET
  tagline = 'Google''s AI research assistant that turns documents into interactive knowledge',
  excerpt = 'NotebookLM is Google''s experimental AI tool that lets you upload documents and have conversations about them. Famous for its "Audio Overview" feature that creates podcasts from your content.',
  logo_url = 'https://logo.clearbit.com/notebooklm.google.com',
  pricing_summary = 'Free for Google account holders. NotebookLM Plus for businesses coming soon.',
  expert_verdict = 'NotebookLM is a delightful surprise from Google Labs. Upload PDFs, docs, or paste text, and have intelligent conversations grounded in your sources. The Audio Overview feature that generates podcast-style discussions is genuinely impressive. For researchers, students, and anyone working with documents, it''s remarkably useful - and free.',
  verdict_summary = 'Best free AI research assistant. Brilliant Audio Overview feature.',
  meta_title = 'NotebookLM Review 2025: Google''s Free AI Research & Podcast Tool',
  meta_description = 'NotebookLM review with features, Audio Overview podcast generation, and research capabilities. See why it''s the best free AI document tool.',
  focus_keyword = 'NotebookLM',
  ratings_overall = 4.5,
  ratings_ease_of_use = 4.6,
  ratings_value_for_money = 5.0,
  ratings_features = 4.5,
  ratings_support = 4.0,
  price_last_verified = '2025-12-23'
WHERE id = 11;

UPDATE tools SET
  stats_users = '10M+',
  stats_rating = 4.5,
  stats_company = 'Google',
  stats_launch_year = 2023
WHERE id = 11;

DELETE FROM tools_pricing_tiers WHERE _parent_id = 11;
INSERT INTO tools_pricing_tiers (_order, _parent_id, name, price, billing_period, recommended, cta_text, cta_url) VALUES
(0, 11, 'Free', '$0', 'free', 1, 'Try Free', 'https://notebooklm.google.com');

INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 0, t.id, 'Unlimited notebooks' FROM tools_pricing_tiers t WHERE t._parent_id = 11 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 1, t.id, 'Audio Overview generation' FROM tools_pricing_tiers t WHERE t._parent_id = 11 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 2, t.id, 'Source-grounded responses' FROM tools_pricing_tiers t WHERE t._parent_id = 11 AND t.name = 'Free';
INSERT INTO tools_pricing_tiers_features (_order, _parent_id, feature)
SELECT 3, t.id, 'PDF, Docs, web support' FROM tools_pricing_tiers t WHERE t._parent_id = 11 AND t.name = 'Free';

DELETE FROM tools_pros WHERE _parent_id = 11;
INSERT INTO tools_pros (_order, _parent_id, title, description) VALUES
(0, 11, 'Audio Overview', 'Generates podcast-style discussions from your documents.'),
(1, 11, 'Source Grounding', 'All answers cite specific sources - no hallucinations.'),
(2, 11, 'Completely Free', 'No cost for full functionality with Google account.'),
(3, 11, 'Document Understanding', 'Excellent comprehension of complex documents.');

DELETE FROM tools_cons WHERE _parent_id = 11;
INSERT INTO tools_cons (_order, _parent_id, title, description) VALUES
(0, 11, 'Google Account Required', 'Must have Google account to use.'),
(1, 11, 'Limited Integrations', 'Can''t connect to all document sources.'),
(2, 11, 'Experimental Status', 'Still Google Labs - features may change.');

DELETE FROM tools_best_for WHERE _parent_id = 11;
INSERT INTO tools_best_for (_order, _parent_id, persona, reason) VALUES
(0, 11, 'Researchers', 'Synthesize information across multiple papers'),
(1, 11, 'Students', 'Study materials and exam preparation'),
(2, 11, 'Content Creators', 'Turn documents into podcast content');

DELETE FROM tools_not_ideal_for WHERE _parent_id = 11;
INSERT INTO tools_not_ideal_for (_order, _parent_id, persona, reason) VALUES
(0, 11, 'Real-Time Info Needs', 'Only works with uploaded documents, not web search'),
(1, 11, 'Non-Google Users', 'Requires Google account');

DELETE FROM tools_faqs WHERE _parent_id = 11;
INSERT INTO tools_faqs (_order, _parent_id, question, answer) VALUES
(0, 11, 'Is NotebookLM free?', 'Yes, NotebookLM is completely free with a Google account. A paid Plus tier for businesses is planned.'),
(1, 11, 'What is Audio Overview?', 'Audio Overview generates a podcast-style conversation between two AI hosts discussing your uploaded documents.'),
(2, 11, 'NotebookLM vs ChatGPT?', 'NotebookLM excels at document analysis with source citations. ChatGPT is better for general knowledge and tasks.'),
(3, 11, 'What can I upload to NotebookLM?', 'PDFs, Google Docs, web URLs, text files, and more. Up to 50 sources per notebook.');

DELETE FROM tools_secondary_keywords WHERE _parent_id = 11;
INSERT INTO tools_secondary_keywords (_order, _parent_id, keyword) VALUES
(0, 11, 'NotebookLM Audio Overview'),
(1, 11, 'Google NotebookLM'),
(2, 11, 'AI research assistant'),
(3, 11, 'NotebookLM vs ChatGPT');
