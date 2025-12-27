PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE `users_sessions` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`created_at` text,
  	`expires_at` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "users_sessions" VALUES(1,1,'5532e5e3-149f-4786-a170-dbc1c8fce2df','2025-12-23T13:35:37.610Z','2025-12-23T15:35:37.610Z');
INSERT INTO "users_sessions" VALUES(2,1,'ced31f70-2c50-49b4-be5c-00d621781746','2025-12-23T13:47:47.120Z','2025-12-23T15:47:47.120Z');
CREATE TABLE `users` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`email` text NOT NULL,
  	`reset_password_token` text,
  	`reset_password_expiration` text,
  	`salt` text,
  	`hash` text,
  	`login_attempts` numeric DEFAULT 0,
  	`lock_until` text
  );
INSERT INTO "users" VALUES(1,'2025-12-23T13:47:47.272Z','2025-12-20T01:36:27.585Z','bhanu.sharma@gmail.com',NULL,NULL,'70dca466f5f77c2cbe204aced4df0dccf4e616fca018e1969327c0dd1558a730','705fc086f63b082e8f56d66265c5570aa2acc3166382e7255540b9a1ce7b156cfae4a0eb85bb87acf4ef454fd4ebb614e004b854f674d07db64f0177a5e8655a4ed60c5f902c5dd6d75bec0373df3677b11e4e3bd609cfbbd32b4a03be2fef19fad48d696a2d32d2fce36589d6330efe5f94e30f705ad4dd763b0b02fc1c65a36860baf429e20a8adbb7a74a29aedd801e4cf3ff7e319f0b2f1afc191a9aee5d3d280d5816d37efe5ba4012732f3706168acdbc93569de0e77ab6438e711652d432b226ba1a8c8c5286ec5290e095f3f8ac465f3c4105c0e9293b698723cfd157c9a51e0c9716bc69447cee01150700317a64c173cad06f910646033b3ffb4afdbca75b47fdf317041ccdb198947e76c16420d1d81a995b500d898fdf03f7dad44e65ae5d619afdc1407c0849d563b0ca8a715c6c8c0cb361653f90f2e4046c2a772eb2b9f164b12cb59748cb07b3939daf5c1116f31763f5965142c3660f8064e1c174ded078f7c93e575ad4d166a29fda389b3e7c17585672c017550e8255ab979168c34c7c8500a890c591066ecc39b664af6bc055a61deed7f8abe2fbbf42da70eb2411f511a16a611cef2d33fe80e60b865c0a5317f8525f24f7fbafda0a16e479502cbf44184f35cd9c7daf9d7b4d25402726d11586cc8f5e6b12ccd585a007138be56ddcc2bbf78c4cc679ef6f39c6aec8da9e689fbcc5e0590d7e212',0,NULL);
CREATE TABLE `media` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`alt` text NOT NULL,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`url` text,
  	`thumbnail_u_r_l` text,
  	`filename` text,
  	`mime_type` text,
  	`filesize` numeric,
  	`width` numeric,
  	`height` numeric
  );
INSERT INTO "media" VALUES(1,'AI Video Tutorial Cover - Typewriter with cinematic film frames emerging','2025-12-23T03:33:33.405Z','2025-12-23T03:33:33.405Z',NULL,NULL,'video-tutorial-cover.png','image/png',5838713,2752,1536);
INSERT INTO "media" VALUES(2,'AI Video Tutorial Infographic - 5-step workflow: Setup, Prompt, Generate, Edit, Export','2025-12-23T03:33:35.551Z','2025-12-23T03:33:35.551Z',NULL,NULL,'video-tutorial-infographic.png','image/png',4633338,2752,1536);
INSERT INTO "media" VALUES(3,'AI Chatbot Tutorial Cover - Laptop with holographic chat interface','2025-12-23T03:33:37.028Z','2025-12-23T03:33:37.028Z',NULL,NULL,'chatbot-tutorial-cover.png','image/png',5307315,2752,1536);
INSERT INTO "media" VALUES(4,'AI Chatbot Tutorial Infographic - 5-step workflow: Choose, Configure, Customize, Embed, Launch','2025-12-23T03:33:38.115Z','2025-12-23T03:33:38.115Z',NULL,NULL,'chatbot-tutorial-infographic.png','image/png',4758624,2752,1536);
CREATE TABLE `payload_locked_documents` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`global_slug` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE TABLE `payload_locked_documents_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`users_id` integer,
  	`media_id` integer, `tools_id` integer REFERENCES tools(id), `makers_id` integer REFERENCES "builders"(id), `projects_id` integer REFERENCES projects(id), `posts_id` integer REFERENCES posts(id), `examples_id` integer REFERENCES examples(id), `tool_categories_id` integer REFERENCES tool_categories(id), `creation_types_id` integer REFERENCES creation_types(id), `maker_specialties_id` integer REFERENCES "builder_specialties"(id), `community_types_id` integer REFERENCES community_types(id), `news_categories_id` integer REFERENCES news_categories(id), `user_situations_id` integer REFERENCES user_situations(id),
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_locked_documents`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `payload_preferences` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text,
  	`value` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "payload_preferences" VALUES(1,'collection-tool-categories','{"limit":10}','2025-12-23T11:14:19.001Z','2025-12-20T01:36:42.611Z');
INSERT INTO "payload_preferences" VALUES(2,'collection-creation-types','{}','2025-12-20T01:36:48.325Z','2025-12-20T01:36:48.325Z');
INSERT INTO "payload_preferences" VALUES(3,'collection-tools','{"limit":10}','2025-12-23T11:14:51.811Z','2025-12-20T01:36:51.186Z');
INSERT INTO "payload_preferences" VALUES(4,'collection-makers','{}','2025-12-20T01:36:53.258Z','2025-12-20T01:36:53.258Z');
INSERT INTO "payload_preferences" VALUES(5,'collection-media','{}','2025-12-20T01:36:55.372Z','2025-12-20T01:36:55.372Z');
INSERT INTO "payload_preferences" VALUES(6,'collection-users','{}','2025-12-20T01:36:56.472Z','2025-12-20T01:36:56.472Z');
INSERT INTO "payload_preferences" VALUES(7,'collection-builders','{"limit":10}','2025-12-23T11:14:24.280Z','2025-12-22T14:56:31.087Z');
INSERT INTO "payload_preferences" VALUES(8,'collection-tutorials','{"limit":10}','2025-12-23T11:14:38.209Z','2025-12-23T01:35:43.688Z');
INSERT INTO "payload_preferences" VALUES(9,'collection-posts','{}','2025-12-23T10:59:27.861Z','2025-12-23T10:59:27.861Z');
INSERT INTO "payload_preferences" VALUES(10,'collection-projects','{}','2025-12-23T11:14:44.800Z','2025-12-23T11:14:44.800Z');
CREATE TABLE `payload_preferences_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`users_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_preferences`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "payload_preferences_rels" VALUES(2,NULL,2,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(4,NULL,4,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(5,NULL,5,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(6,NULL,6,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(9,NULL,9,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(10,NULL,1,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(11,NULL,7,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(12,NULL,8,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(13,NULL,10,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(14,NULL,3,'user',1);
CREATE TABLE `payload_migrations` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`name` text,
  	`batch` numeric,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "payload_migrations" VALUES(1,'20250929_111647',1,'2025-12-20T01:00:19.421Z','2025-12-20T01:00:19.420Z');
INSERT INTO "payload_migrations" VALUES(2,'20251219_192426',1,'2025-12-20T01:00:35.901Z','2025-12-20T01:00:35.901Z');
INSERT INTO "payload_migrations" VALUES(3,'20251220_014139_add_taxonomy_fields',2,'2025-12-20T01:42:01.226Z','2025-12-20T01:42:01.225Z');
INSERT INTO "payload_migrations" VALUES(4,'20251220_192500_rename_makers_to_builders',3,'2025-12-20T19:29:04.276Z','2025-12-20T19:29:04.275Z');
INSERT INTO "payload_migrations" VALUES(5,'20251220_193300_fix_builders_rels_column',4,'2025-12-20T19:34:09.467Z','2025-12-20T19:34:09.466Z');
INSERT INTO "payload_migrations" VALUES(6,'20251221_022700_add_tutorials',5,'2025-12-21T02:32:10.946Z','2025-12-21T02:32:10.945Z');
INSERT INTO "payload_migrations" VALUES(7,'20251221_140200_add_search_collection',6,'2025-12-21T14:08:01.425Z','2025-12-21T14:08:01.424Z');
INSERT INTO "payload_migrations" VALUES(8,'20251223_000000_add_logo_url',7,'2025-12-23T00:31:53.509Z','2025-12-23T00:31:53.508Z');
INSERT INTO "payload_migrations" VALUES(9,'20251223_025900_add_tools_extended_fields',8,'2025-12-23T03:00:04.630Z','2025-12-23T03:00:04.630Z');
INSERT INTO "payload_migrations" VALUES(10,'20251223_025900_add_tools_extended_fields',8,'2025-12-23 03:00:07','2025-12-23 03:00:07');
CREATE TABLE `tools_use_cases` (
  	`order` integer NOT NULL,
  	`parent_id` integer NOT NULL,
  	`value` text,
  	`id` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (`parent_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `tools_platforms` (
  	`order` integer NOT NULL,
  	`parent_id` integer NOT NULL,
  	`value` text,
  	`id` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (`parent_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `tools_key_features` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`icon` text,
  	`title` text NOT NULL,
  	`description` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_key_features" VALUES(1,18,'6945feb8d5b925864856dd7c',NULL,'Text-to-Image Generation','Create stunning images from detailed text prompts');
INSERT INTO "tools_key_features" VALUES(2,18,'6945feb8d5b925864856dd7d',NULL,'Multiple Art Styles','Support for various artistic styles and aesthetics');
INSERT INTO "tools_key_features" VALUES(3,18,'6945feb8d5b925864856dd7e',NULL,'High Resolution Output','Generate high-quality images with upscaling');
CREATE TABLE `tools` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`tagline` text,
  	`excerpt` text,
  	`content` text,
  	`logo_id` integer,
  	`website` text,
  	`pricing_model` text,
  	`pricing_summary` text,
  	`difficulty` text,
  	`stats_users` text,
  	`stats_rating` numeric,
  	`stats_company` text,
  	`stats_launch_year` numeric,
  	`slug` text NOT NULL,
  	`featured` integer DEFAULT false,
  	`tool_category_id` integer,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL, logo_url text, how_it_works text, price_last_verified text, ratings_overall integer, ratings_ease_of_use integer, ratings_value_for_money integer, ratings_features integer, ratings_support integer, expert_verdict text, "verdict_summary" text, "comparison_notes" text, "meta_title" text, "meta_description" text, "focus_keyword" text,
  	FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`tool_category_id`) REFERENCES `tool_categories`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "tools" VALUES(1,'Mubert','AI-generated royalty-free music for creators and brands','Mubert generates unique, royalty-free music tracks for videos, apps, and commercial use. Set mood, tempo, and duration - AI creates custom soundtracks instantly.',NULL,NULL,'','freemium','Free: Personal use. Creator $14/mo: Commercial rights. Pro $39/mo: Extended license.','beginner','1M+',4,'Mubert Inc.',2017,'mubert',0,6,'2025-12-20T01:41:05.991Z','2025-12-20T01:41:05.991Z','https://logo.clearbit.com/mubert.com',NULL,'2025-12-23',4,4.3,4.2,3.9,4,'Mubert fills a specific niche well: background music for content creators who need royalty-free tracks quickly. The AI generates listenable, genre-appropriate music that works for videos, podcasts, and apps. It''s not Suno or Udio quality, but the commercial licensing is cleaner. Good for ambient/background music; less suitable for hero tracks.','Best for royalty-free background music. Quick generation with clear licensing.',NULL,'Mubert Review 2025: AI Music Generator for Royalty-Free Tracks','Mubert AI review with 2025 pricing ($14-$39/mo), royalty-free music generation, and commercial licensing. Create background music instantly.','Mubert AI');
INSERT INTO "tools" VALUES(2,'ElevenLabs','Industry-leading AI voice synthesis with the most realistic speech generation','ElevenLabs is the leading AI voice platform, known for producing the most natural-sounding synthetic speech. It offers text-to-speech, voice cloning, dubbing, and an AI voice library used by content creators, game developers, and enterprises worldwide.',NULL,NULL,'','freemium','Free tier: 10K characters/month. Starter $5/mo. Creator $22/mo. Pro $99/mo. Scale $330/mo.','beginner','10M+',4.8,'ElevenLabs',2022,'elevenlabs',0,6,'2025-12-20T01:41:06.391Z','2025-12-20T01:41:06.391Z','https://logo.clearbit.com/elevenlabs.io',NULL,'2025-12-23',4.8,4.7,4.4,4.9,4.3,'ElevenLabs has established itself as the gold standard for AI voice synthesis. The quality difference between ElevenLabs and competitors is immediately audible - voices sound genuinely human with natural intonation and emotion. Voice cloning is remarkably accurate with just a few minutes of samples. The pricing is reasonable: free tier for experimentation, $5/month for hobbyists, scaling up for commercial use. For podcasters, game developers, content creators, and anyone needing realistic synthetic speech, ElevenLabs is the clear market leader.','The best AI voice generator available. Unmatched natural-sounding speech quality.',NULL,'ElevenLabs Review 2025: Pricing, Voice Cloning & Text-to-Speech','ElevenLabs review with 2025 pricing (free-$330/mo), voice cloning, and text-to-speech features. See why it''s the most realistic AI voice generator.','ElevenLabs review');
INSERT INTO "tools" VALUES(3,'Udio','Create professional-quality AI music with studio-grade audio fidelity','Udio is an advanced AI music generation platform known for exceptional audio quality and musical coherence. Create full songs with vocals, instrumentals, and production that rivals professional studios.',NULL,NULL,'','freemium','Free: 1200 credits/month. Standard $10/mo: 1200 credits. Pro $30/mo: 4800 credits.','beginner','5M+',4.5,'Udio',2024,'udio',0,6,'2025-12-20T01:41:06.799Z','2025-12-20T01:41:06.799Z','https://logo.clearbit.com/udio.com',NULL,'2025-12-23',4.5,4.2,4.5,4.7,4,'Udio represents the audiophile choice in AI music generation. While Suno is more accessible, Udio often produces more polished, radio-ready tracks with better audio fidelity. The generation process is slightly more complex but rewards users with higher quality output. For serious music creators who want the best possible AI-generated audio, Udio is worth the learning curve. The free tier is generous enough to explore extensively.','Premium AI music with studio-quality audio. Higher quality than competitors.',NULL,'Udio Review 2025: AI Music Generator Pricing & Features vs Suno','Udio AI music generator review with 2025 pricing (free-$30/mo), audio quality comparison, and Suno alternatives. Create studio-quality AI songs.','Udio AI music');
INSERT INTO "tools" VALUES(4,'Suno AI','Create complete songs with AI-generated vocals, lyrics, and instrumentals','Suno AI is a revolutionary music generation platform that creates full songs - vocals, lyrics, and instrumentals - from text prompts. No musical experience needed. Just describe your song and Suno composes, sings, and produces it in minutes.',NULL,NULL,'','freemium','Free: 50 credits/day. Pro $10/mo: 2500 credits/mo. Premier $30/mo: 10000 credits/mo with commercial rights.','beginner','12M+',4.6,'Suno Inc.',2023,'suno-ai',0,6,'2025-12-20T01:41:07.222Z','2025-12-20T01:41:07.222Z','https://logo.clearbit.com/suno.ai',NULL,'2025-12-23',4.6,4.9,4.8,4.5,4,'Suno has done for music what DALL-E did for images - made creation accessible to everyone. The quality is genuinely impressive: full songs with coherent lyrics, melodies that stick, and production that sounds professional. It''s not replacing human musicians, but it''s democratizing music creation for content creators, hobbyists, and rapid prototyping. The free tier is generous (50 credits/day = ~10 songs). Pro at $10/month is excellent value. For anyone curious about AI music, Suno is where to start.','The most accessible and impressive AI music generator. Creates complete, professional-sounding songs.',NULL,'Suno AI Review 2025: Pricing, Features & AI Music Generation','Suno AI review with 2025 pricing (free-$30/mo), features, and song examples. See how to create full songs with AI vocals and instrumentals.','Suno AI review');
INSERT INTO "tools" VALUES(5,'Replit AI','Code, collaborate, and deploy with AI assistance in the browser','Replit is a browser-based IDE with powerful AI features. Code in any language, get AI assistance, collaborate in real-time, and deploy apps instantly - all from your browser.',NULL,NULL,'','freemium','Free: Basic features. Replit Core $25/mo: Advanced AI. Teams $40/user/mo.','beginner','25M+',4.4,'Replit Inc.',2016,'replit-ai',0,4,'2025-12-20T01:41:07.637Z','2025-12-20T01:41:07.637Z','https://logo.clearbit.com/replit.com',NULL,'2025-12-23',4.4,4.7,4.3,4.5,4.2,'Replit has evolved from a simple online IDE into a powerful AI-assisted development platform. The AI Agent can build entire applications from descriptions, and the collaboration features rival dedicated tools. For learning, quick projects, and collaborative coding, Replit is excellent. For serious production development, local IDEs still have advantages.','Best browser-based IDE with AI. Excellent for learning and quick projects.',NULL,'Replit AI Review 2025: Browser IDE Pricing & AI Features','Replit AI review with 2025 pricing ($25/mo), AI Agent, and coding features. Build and deploy apps in your browser.','Replit AI');
INSERT INTO "tools" VALUES(6,'v0 by Vercel','Generate React and Next.js UI components from text descriptions','v0 by Vercel generates production-ready React UI components from natural language descriptions. Describe what you want, get shadcn/ui and Tailwind CSS code you can copy directly into your project.',NULL,NULL,'','freemium','Free tier: 200 credits/month. Premium $20/mo: 5000 credits. Team $30/user/mo.','beginner','1M+',4.5,'Vercel',2023,'v0-by-vercel',0,4,'2025-12-20T01:41:08.038Z','2025-12-20T01:41:08.038Z','https://logo.clearbit.com/vercel.com',NULL,'2025-12-23',4.5,4.8,4.4,4.5,4.2,'v0 has become an essential tool for frontend developers. It doesn''t just generate generic UI code - it produces clean, production-ready React components using shadcn/ui and Tailwind. The output matches modern best practices. For rapid prototyping, building component libraries, or learning modern React patterns, v0 is incredibly useful. Free tier is generous for exploration. Premium at $20/month is worth it for professional frontend work.','Best AI tool for React/Next.js UI development. Clean, production-ready component generation.',NULL,'v0 by Vercel Review 2025: AI UI Generation Pricing & Features','v0 by Vercel review with pricing (free-$30/mo), features, and examples. See how to generate React components with AI.','v0 Vercel review');
INSERT INTO "tools" VALUES(7,'Cursor','The AI-first code editor built for pair programming with AI','Cursor is a VS Code fork that puts AI at the center of the coding experience. With deep Claude and GPT-4 integration, it can understand your entire codebase, write multi-file changes, and act as a true AI pair programmer.',NULL,NULL,'','freemium','Hobby free forever (limited). Pro $20/mo for unlimited AI. Business $40/user/mo with team features.','beginner','500K+',4.5,'Anysphere',2023,'cursor',0,4,'2025-12-20T01:41:08.429Z','2025-12-20T01:41:08.428Z','https://logo.clearbit.com/cursor.sh',NULL,'2025-12-23',4.5,4.2,4.6,4.8,4,'Cursor has captured the imagination of developers who want more than just code completion. It represents a new paradigm: the AI-native IDE. Unlike Copilot which adds AI to your editor, Cursor rebuilds the editor around AI. The Composer feature for multi-file edits is genuinely impressive. At $20/month for Pro, it''s competitively priced. The main downsides are occasional instability and the learning curve of new AI-centric workflows. For developers ready to embrace AI-first development, Cursor is the leading choice.','The most ambitious AI coding tool available. Best for developers ready to adopt AI-native workflows.',NULL,'Cursor Review 2025: The AI Code Editor Worth Switching To?','Cursor AI editor review with pricing ($0-$40/mo), features, and comparison to VS Code + Copilot. See if this AI-first IDE is right for you.','Cursor AI editor review');
INSERT INTO "tools" VALUES(8,'GitHub Copilot','AI pair programmer that helps you write code faster with intelligent suggestions','GitHub Copilot is the most widely adopted AI coding assistant, used by over 1.8 million developers. Powered by OpenAI Codex, it provides real-time code suggestions, completes entire functions, and understands context across your codebase.',NULL,NULL,'','freemium','Free for students/OSS maintainers. Individual $10/mo. Business $19/user/mo. Enterprise $39/user/mo.','beginner','1.8M+',4.6,'GitHub (Microsoft)',2021,'github-copilot',0,4,'2025-12-20T01:41:08.860Z','2025-12-20T01:41:08.860Z','https://logo.clearbit.com/github.com',NULL,'2025-12-23',4.6,4.8,4.5,4.7,4.3,'GitHub Copilot has become the industry standard for AI-assisted coding. Its tight IDE integration, understanding of your codebase, and high-quality suggestions make it genuinely useful for day-to-day development. The $10/month Individual plan is a no-brainer for professional developers - the productivity gains easily justify the cost. Copilot Chat brings conversational AI directly into your editor. For teams, Business and Enterprise plans add admin controls and security features. While competitors like Cursor and Codeium are gaining ground, Copilot''s GitHub integration and massive training dataset keep it ahead.','The gold standard for AI coding assistants. Essential for professional developers seeking productivity gains.',NULL,'GitHub Copilot Review 2025: Pricing, Features & Is It Worth It?','GitHub Copilot review with 2025 pricing ($10-$39/mo), features, and real developer opinions. Free for students. Compare Individual vs Business plans.','GitHub Copilot review');
INSERT INTO "tools" VALUES(9,'Maker','Community-driven AI art platform for creating and sharing digital artwork','Maker is a collaborative AI art platform that combines powerful generation tools with a vibrant community. Create stunning digital artwork, share your creations, and discover inspiration from artists worldwide.',NULL,NULL,'https://www.maker.ai','paid','Free tier with premium features from $12/month','beginner','100K+',4,'Maker Inc.',2023,'maker',1,9,'2025-12-20T01:41:09.300Z','2025-12-20T01:41:09.300Z',NULL,NULL,'2025-12-23',4,4.3,4.1,3.9,4,'Maker stands out for its community-first approach to AI art. While generation capabilities are solid, the real value lies in its social features, collaborative tools, and supportive artist community. Perfect for creators who want to share and get feedback on their work.','Community-focused AI art platform. Great for social creators.',NULL,'Maker AI Art Platform Review 2025 | Community-Driven Creation','Discover Maker, the community-focused AI art platform. Create, share, and collaborate on digital artwork. Free tier available.','Maker AI art platform');
INSERT INTO "tools" VALUES(10,'Character AI','Chat with AI characters - fictional, historical, or custom-created','Character.AI lets you chat with AI-powered characters - celebrities, fictional heroes, historical figures, or characters you create. Popular for roleplay, entertainment, and creative exploration.',NULL,NULL,'https://character.ai','freemium','Free: Full access with ads. c.ai+ $10/mo: Priority access, no ads, longer memory.','beginner','20M+',4.3,'Character Technologies',2022,'character-ai',1,11,'2025-12-20T01:41:09.640Z','2025-12-20T01:41:09.640Z','https://logo.clearbit.com/character.ai',NULL,'2025-12-23',4.3,4.7,4.5,4.3,3.9,'Character.AI has created something unique - AI companions that feel genuinely engaging. Whether chatting with fictional characters, practicing languages, or exploring creative roleplay, the experience is compelling. Free tier is generous; $10/month removes friction. Not a productivity tool, but excellent for entertainment and creative exploration.','Best AI character chat platform. Engaging roleplay and entertainment.',NULL,'Character AI Review 2025: Pricing, Features & AI Chatbot Platform','Character.AI review with 2025 pricing (free-$10/mo), character creation, and chat features. See why millions chat with AI characters.','Character AI');
INSERT INTO "tools" VALUES(11,'NotebookLM','Google''s AI research assistant that turns documents into interactive knowledge','NotebookLM is Google''s experimental AI tool that lets you upload documents and have conversations about them. Famous for its "Audio Overview" feature that creates podcasts from your content.',NULL,NULL,'https://notebooklm.google.com','freemium','Free for Google account holders. NotebookLM Plus for businesses coming soon.','beginner','10M+',4.5,'Google',2023,'notebooklm',1,11,'2025-12-20T01:41:09.971Z','2025-12-20T01:41:09.971Z','https://logo.clearbit.com/notebooklm.google.com',NULL,'2025-12-23',4.5,4.6,5,4.5,4,'NotebookLM is a delightful surprise from Google Labs. Upload PDFs, docs, or paste text, and have intelligent conversations grounded in your sources. The Audio Overview feature that generates podcast-style discussions is genuinely impressive. For researchers, students, and anyone working with documents, it''s remarkably useful - and free.','Best free AI research assistant. Brilliant Audio Overview feature.',NULL,'NotebookLM Review 2025: Google''s Free AI Research & Podcast Tool','NotebookLM review with features, Audio Overview podcast generation, and research capabilities. See why it''s the best free AI document tool.','NotebookLM');
INSERT INTO "tools" VALUES(12,'Flux','State-of-the-art open-source AI image generation with exceptional quality','Flux is Black Forest Labs'' flagship AI image model, known for exceptional prompt adherence, photorealism, and artistic versatility. Available in Pro, Dev, and Schnell variants for different use cases.',NULL,NULL,'https://blackforestlabs.ai','free','Flux Schnell: Free (fast). Flux Dev: Free for non-commercial. Flux Pro: API pricing via partners.','intermediate','10M+',4.7,'Black Forest Labs',2024,'flux',1,9,'2025-12-20T01:41:10.295Z','2025-12-20T01:41:10.295Z','https://logo.clearbit.com/blackforestlabs.ai',NULL,'2025-12-23',4.7,4.3,4.9,4.8,4,'Flux has rapidly become the go-to image model for quality-conscious creators. It excels at following complex prompts accurately, produces stunning photorealistic images, and handles text in images better than most competitors. The open-source Schnell model is remarkably capable for free, while Pro delivers professional-grade results. For anyone frustrated with other AI image tools ignoring prompt details, Flux is the answer.','Leading open-source image model with exceptional prompt accuracy and quality.',NULL,'Flux AI Review 2025: Best Open Source Image Generator vs Midjourney','Flux AI image generator review comparing Schnell, Dev, and Pro models. See why Flux rivals Midjourney for free with superior prompt adherence.','Flux AI image');
INSERT INTO "tools" VALUES(13,'Ideogram','AI image generation with best-in-class text rendering','Ideogram is an AI image generator famous for its exceptional text-in-image capabilities. While competitors struggle with text, Ideogram reliably renders logos, typography, and text-heavy designs.',NULL,NULL,'https://ideogram.ai','freemium','Free: 10 images/day. Basic $8/mo: 100 images/day. Plus $20/mo: 400 images. Pro $60/mo: 1000 images.','beginner','8M+',4.4,'Ideogram Inc.',2023,'ideogram',1,9,'2025-12-20T01:41:10.715Z','2025-12-20T01:41:10.715Z','https://logo.clearbit.com/ideogram.ai',NULL,'2025-12-23',4.4,4.6,4.5,4.6,4,'Ideogram has carved out a unique niche by excelling where others fail: text in images. If you need logos, posters, signs, or any design with readable text, Ideogram is unmatched. Version 2.0 significantly improved general image quality too. The free tier with 10 images daily is perfect for trying it out. For designers and marketers who need text-heavy visuals, Ideogram is essential.','The text-in-image specialist. Unmatched for logos, typography, and text-heavy designs.',NULL,'Ideogram AI Review 2025: Best for Text in Images & Logo Design','Ideogram AI review with 2025 pricing (free-$60/mo). See why it''s the best AI image generator for text, logos, and typography.','Ideogram AI');
INSERT INTO "tools" VALUES(14,'Pika','Create and edit AI videos with intuitive controls and creative effects','Pika is an AI video platform that makes video generation accessible and fun. Known for its creative effects, intuitive interface, and ability to animate images or extend existing videos.',NULL,NULL,'https://pika.art','freemium','Free: 250 credits. Unlimited $10/mo: 700 monthly + unlimited. Pro $35/mo: 2000 monthly + unlimited. Enterprise custom.','beginner','8M+',4.3,'Pika Labs',2023,'pika',1,5,'2025-12-20T01:41:11.061Z','2025-12-20T01:41:11.060Z','https://logo.clearbit.com/pika.art',NULL,'2025-12-23',4.3,4.7,4.6,4.4,4.2,'Pika has found its niche as the approachable, creative-focused AI video tool. While it may not match Runway or Sora in raw quality, its unique effects (expand, modify, lip sync) and intuitive interface make it perfect for content creators who want quick, fun results. The Unlimited plan at $10/month is excellent value. For serious filmmaking, look elsewhere; for creative social content, Pika delivers.','The creative, accessible AI video tool. Great effects and value pricing.',NULL,'Pika AI Review 2025: Pricing, Effects & Video Generation Features','Pika AI video generator review with 2025 pricing (free-$35/mo), creative effects, and comparison to Runway. See how to create AI videos easily.','Pika AI video');
INSERT INTO "tools" VALUES(15,'Leonardo AI','AI image generation with training capabilities for games and creative assets','Leonardo AI specializes in AI image generation for games, concept art, and digital assets. Features include custom model training, real-time canvas editing, and a community of trained models for specific styles.',NULL,NULL,'https://leonardo.ai','freemium','Free: 150 tokens/day. Apprentice $12/mo. Artisan $30/mo. Maestro $60/mo.','intermediate','6M+',4.4,'Leonardo.AI',2022,'leonardo-ai',1,9,'2025-12-20T01:41:11.397Z','2025-12-20T01:41:11.397Z','https://logo.clearbit.com/leonardo.ai',NULL,'2025-12-23',4.4,4.5,4.4,4.5,4.2,'Leonardo has carved out a strong niche in game asset and concept art generation. The ability to train custom models on your own art style is powerful for studios and creators. The real-time canvas and image editing features add practical utility beyond just generation. Pricing is competitive, and the free tier is useful for experimentation. Quality rivals Midjourney for certain styles, especially game art. Best for game developers, concept artists, and those wanting consistent stylized output.','Excellent for game assets and concept art. Custom model training sets it apart.',NULL,'Leonardo AI Review 2025: Pricing, Training & Game Art','Leonardo AI review with pricing ($12-$60/mo), custom model training, and game asset features. Compare to Midjourney for concept art.','Leonardo AI review');
INSERT INTO "tools" VALUES(17,'Stability AI','The company behind Stable Diffusion, offering enterprise AI image generation APIs','Stability AI is the pioneering company behind Stable Diffusion, the revolutionary open-source image generation model. Their enterprise platform provides API access to state-of-the-art models including SDXL, SD3, and specialized models.',NULL,NULL,'https://stability.ai','freemium','API pricing from $0.002/image, enterprise plans available','intermediate','1M+',4.4,'Stability AI',2022,'stability-ai',1,9,'2025-12-20T01:41:12.109Z','2025-12-20T01:41:12.109Z',NULL,NULL,'2025-12-23',4.4,3.8,4.6,4.7,4.1,'Stability AI offers the most flexible and cost-effective API access to top-tier image generation models. As the creators of Stable Diffusion, they provide cutting-edge technology with transparent pricing. Best for developers and businesses needing scalable, affordable AI image generation.','Industry-leading image generation APIs at competitive prices.',NULL,'Stability AI Review 2025 | Stable Diffusion API & Enterprise Solutions','Explore Stability AI, creators of Stable Diffusion. Access SDXL, SD3, and more via API. Enterprise-grade image generation from $0.002/image.','Stability AI API');
INSERT INTO "tools" VALUES(18,'Midjourney','Create stunning AI-generated art from text descriptions with industry-leading quality','Midjourney is the leading AI image generation platform with 21M+ Discord users. Known for exceptional artistic quality and aesthetic coherence.',NULL,NULL,'https://www.midjourney.com','paid','Basic $10/mo, Standard $30/mo, Pro $60/mo, Mega $120/mo. No free trial.','intermediate','21M+',4.7,'Midjourney, Inc.',2022,'midjourney',1,9,'2025-12-20T01:41:12.444Z','2025-12-20T01:41:12.444Z','https://logo.clearbit.com/midjourney.com',NULL,'2025-12-23',4.7,4.2,4.4,4.8,4,'Midjourney V6 delivers the most aesthetically pleasing AI art. While Discord-only was a barrier, the new web editor changes that. For artists and designers who care about visual quality above all else, Midjourney remains the gold standard.','The undisputed leader in AI art quality. No free tier, but worth every penny for serious creators.',NULL,'Midjourney Review 2025: Pricing, Art Quality & Guide','Complete Midjourney review with V6 features, 2025 pricing ($10-$120/mo), prompt guide, and comparison to DALL-E 3 and Stable Diffusion.','Midjourney review');
INSERT INTO "tools" VALUES(19,'Runway ML','Professional AI video generation and editing tools for creative professionals','Runway is the leading professional AI video platform, pioneering generative video with Gen-2 and Gen-3. Used by filmmakers, agencies, and content creators, it offers text-to-video, image-to-video, video editing, and a suite of AI creative tools.',NULL,NULL,'https://runwayml.com','freemium','Free: 125 credits. Basic $15/mo: 625 credits. Standard $35/mo: 2250 credits. Pro $95/mo: 6750 credits. Unlimited $145/mo.','beginner','5M+',4.5,'Runway AI, Inc.',2018,'runway-ml',0,5,'2025-12-20T01:41:12.880Z','2025-12-20T01:41:12.880Z','https://logo.clearbit.com/runwayml.com',NULL,'2025-12-23',4.5,4.6,4.2,4.7,4.3,'Runway has been the pioneer of AI video generation, and Gen-3 Alpha represents their most capable model yet. While Sora may grab headlines, Runway has the proven track record, professional features, and reliable service that creative professionals need. The interface is intuitive, the video editing tools are genuinely useful, and the quality has improved dramatically. Pricing is higher than hobbyist alternatives, but for commercial work, the quality and reliability justify it. For filmmakers and agencies, Runway remains the industry standard.','The professional''s choice for AI video. Proven technology with creative-focused features.',NULL,'Runway ML Review 2025: Pricing, Gen-3, and AI Video Features','Runway ML review with 2025 pricing ($15-$145/mo), Gen-3 video generation, and comparison to Sora. See why creatives choose Runway for AI video.','Runway ML review');
INSERT INTO "tools" VALUES(20,'Perplexity','AI-powered search engine that answers questions with cited sources','Perplexity is an AI search engine that provides direct answers with inline citations. It combines the conversational abilities of ChatGPT with real-time web search, making it ideal for research, fact-checking, and learning.',NULL,NULL,'https://perplexity.ai','freemium','Free tier with unlimited basic searches. Pro at $20/mo for advanced AI models, unlimited Pro searches, and file uploads.','beginner','15M+',4.6,'Perplexity AI',2022,'perplexity',0,11,'2025-12-20T01:41:13.283Z','2025-12-20T01:41:13.283Z','https://logo.clearbit.com/perplexity.ai',NULL,'2025-12-23',4.6,4.9,4.8,4.5,4.2,'Perplexity has carved out a unique niche as the "answer engine" - not just finding information but synthesizing and citing it. For research tasks, it''s genuinely superior to both traditional Google and ChatGPT. The inline citations make fact-checking trivial. The free tier is remarkably generous. Pro adds GPT-4 and Claude access plus file analysis. The main limitation is that it''s focused on research/questions rather than creative tasks. For anyone who does regular research or fact-checking, Perplexity is becoming essential.','The best AI tool for research with citations. Superior to Google for complex questions.',NULL,'Perplexity AI Review 2025: Pricing, Features & vs ChatGPT','Perplexity AI review with pricing (free & $20/mo Pro), features, and comparison to ChatGPT and Google. See why it''s best for research with citations.','Perplexity AI review');
INSERT INTO "tools" VALUES(21,'Notion AI','AI writing assistant built into your Notion workspace','Notion AI brings powerful AI capabilities directly into your Notion workspace. Draft documents, summarize notes, brainstorm ideas, translate content, and extract action items - all without leaving your workflow.',NULL,NULL,'https://notion.so','freemium','Add-on: $10/member/month on top of your Notion plan. Free trial available.','beginner','30M+',4.3,'Notion Labs',2023,'notion-ai',0,2,'2025-12-20T01:41:13.697Z','2025-12-20T01:41:13.696Z','https://logo.clearbit.com/notion.so',NULL,'2025-12-23',4.3,4.8,4,4.2,4.4,'Notion AI is the perfect example of contextual AI done right. Because it lives inside your Notion workspace, it understands your content deeply. Summarizing meeting notes, extracting tasks, improving writing - all happen with one click where you''re already working. At $10/member/month on top of Notion subscription, it''s an additional cost, but the time savings are real for heavy Notion users. If Notion is your second brain, Notion AI is its thinking assistant.','Essential add-on for Notion power users. Seamless AI integration where you already work.',NULL,'Notion AI Review 2025: Pricing, Features & Is It Worth $10/mo?','Notion AI review with pricing ($10/mo add-on), features, and whether it''s worth it. See how AI enhances your Notion workspace.','Notion AI review');
INSERT INTO "tools" VALUES(22,'Stable Diffusion','Open-source AI image generation you can run locally or in the cloud','Stable Diffusion is the leading open-source image generation AI. Run it locally for free with full control, or use cloud services. Powers thousands of apps and offers unmatched customization through LoRAs, ControlNet, and fine-tuning.',NULL,NULL,'https://stability.ai','freemium','Free to run locally. Cloud services: DreamStudio $10 for 1000 credits. Various third-party pricing.','beginner','10M+',4.5,'Stability AI',2022,'stable-diffusion',0,9,'2025-12-20T01:41:14.110Z','2025-12-20T01:41:14.110Z','https://logo.clearbit.com/stability.ai',NULL,'2025-12-23',4.5,3.5,5,4.8,3.8,'Stable Diffusion democratized AI image generation by being truly open source. If you have a decent GPU, you can run it for free with no limits and full privacy. The ecosystem of models, LoRAs, and tools like ComfyUI and Automatic1111 is unmatched. SD XL and SD 3 have closed the quality gap with proprietary models. The tradeoff is complexity - it takes effort to set up and optimize. For those willing to learn, Stable Diffusion offers the most power and flexibility. For ease of use, Midjourney or DALL-E are simpler.','The power user''s choice for AI images. Unmatched flexibility and zero cost when run locally.',NULL,'Stable Diffusion Review 2025: Free, Open-Source AI Images','Stable Diffusion review - the open-source AI image generator. Run free locally or via cloud. Compare SD XL vs Midjourney vs DALL-E.','Stable Diffusion review');
INSERT INTO "tools" VALUES(23,'Claude','Advanced AI assistant by Anthropic known for safety, helpfulness, and nuanced reasoning','Claude is Anthropic''s flagship AI assistant, designed to be helpful, harmless, and honest. With superior long-context understanding (200K tokens), exceptional reasoning, and Constitutional AI safety, Claude excels at complex analysis, coding, and nuanced conversations.',NULL,NULL,'https://claude.ai','freemium','Free tier available. Pro at $20/mo for priority access. Team at $25/user/mo. Enterprise with custom pricing.','beginner','100M+',4.7,'Anthropic',2023,'claude',1,2,'2025-12-20T01:41:14.635Z','2025-12-20T01:41:14.634Z','https://logo.clearbit.com/anthropic.com',NULL,'2025-12-23',4.7,4.8,4.6,4.7,4.2,'Claude has emerged as the thinking person''s AI assistant. While ChatGPT dominates in popularity, Claude consistently outperforms on tasks requiring nuance, long-form analysis, and careful reasoning. The 200K context window is genuinely transformative for document work. Anthropic''s focus on safety means Claude is more likely to give thoughtful, balanced responses. The free tier is generous, and Pro at $20/mo matches ChatGPT Plus pricing. For researchers, writers, and professionals who value depth over breadth, Claude is often the better choice.','The best AI for nuanced reasoning, long documents, and thoughtful analysis. A worthy ChatGPT alternative with unique strengths.',NULL,'Claude AI Review 2025: Features, Pricing & Comparison','Claude AI by Anthropic review with 2025 pricing, 200K context window, and comparison to ChatGPT. Free tier available. See pros, cons, and use cases.','Claude AI review');
INSERT INTO "tools" VALUES(24,'DALL-E 3','OpenAI''s most advanced text-to-image AI with exceptional prompt understanding','DALL-E 3 is OpenAI''s latest image generation model, integrated directly into ChatGPT. It excels at following complex prompts accurately, generating legible text in images, and producing coherent multi-element scenes.',NULL,NULL,'https://openai.com/dall-e-3','freemium','Included with ChatGPT Plus ($20/mo) and Pro ($200/mo). API pricing: $0.040-$0.120 per image depending on resolution.','beginner','200M+',4.5,'OpenAI',2023,'dall-e-3',0,9,'2025-12-20T01:41:15.065Z','2025-12-20T01:41:15.065Z','https://logo.clearbit.com/openai.com',NULL,'2025-12-23',4.5,4.9,4.6,4.5,4.3,'DALL-E 3 has closed the gap with Midjourney in many areas while excelling in its own strengths. The killer feature is prompt adherence - DALL-E 3 actually follows your instructions, including generating readable text in images. The ChatGPT integration makes it incredibly accessible. While Midjourney still produces more aesthetically "artistic" images, DALL-E 3 is better for practical use cases: marketing materials, diagrams with text, specific compositions. For ChatGPT Plus subscribers, it''s already included, making it an easy recommendation.','Best AI image generator for following complex prompts and generating text. Perfect ChatGPT companion.',NULL,'DALL-E 3 Review 2025: Pricing, Features & vs Midjourney','DALL-E 3 review with pricing (included in ChatGPT Plus), features, and comparison to Midjourney. See why it''s best for text in images and complex prompts.','DALL-E 3 review');
INSERT INTO "tools" VALUES(25,'ChatGPT','AI-powered conversational assistant for writing, coding, analysis, and creative tasks','ChatGPT by OpenAI is the world''s most popular AI chatbot with 900M+ weekly users. It excels at natural language understanding, code generation, creative writing, and complex problem-solving.',NULL,NULL,'https://chat.openai.com','freemium','Free tier with GPT-5.2. Plus $20/mo. Pro $200/mo for unlimited.','beginner','900M+',4.8,'OpenAI',2022,'chatgpt',1,11,'2025-12-20T01:41:15.413Z','2025-12-20T01:41:15.412Z','https://logo.clearbit.com/openai.com',NULL,'2025-12-23',4.8,4.9,4.5,4.9,4.3,'ChatGPT remains the undisputed leader in AI chatbots. With 900M weekly users and 92% of Fortune 100 adoption, it has become essential for knowledge workers. GPT-5.2 offers exceptional reasoning and multimodal capabilities.','The most capable and versatile AI assistant available, with unmatched ecosystem and continuous innovation. Essential for AI productivity.',NULL,'ChatGPT Review 2025: Features, Pricing & Pros/Cons','Comprehensive ChatGPT review with 2025 pricing ($0-$200/mo), features, pros/cons. 900M+ users. Compare Free vs Plus vs Pro plans.','ChatGPT review');
INSERT INTO "tools" VALUES(26,'Clipchamp','Microsoft''s free AI-powered video editor for creators','Clipchamp is Microsoft''s cloud-based video editor with AI features including auto-captions, text-to-speech, and background removal. Free for personal use, integrated with Microsoft 365.',NULL,NULL,'','freemium','Free: Full features, 1080p export. Essentials $12/mo: Brand kit, premium content.','beginner','50M+',4.2,'Microsoft',2021,'clipchamp',0,5,'2025-12-20T01:43:30.163Z','2025-12-20T01:43:30.161Z','https://logo.clearbit.com/clipchamp.com',NULL,'2025-12-23',4.2,4.6,4.9,4,4.2,'Clipchamp is a pleasant surprise from Microsoft - a genuinely capable free video editor. The AI auto-captions work well, the interface is intuitive, and 1080p exports are free. For basic video editing with AI assistance, it''s hard to beat free. Power users may want more features, but for most creators, Clipchamp delivers.','Best free AI video editor. Microsoft quality at no cost.',NULL,'Clipchamp Review 2025: Free AI Video Editor Features & Pricing','Clipchamp review with 2025 features, AI captions, and Microsoft 365 integration. See why it''s the best free video editor.','Clipchamp review');
INSERT INTO "tools" VALUES(27,'Captions','AI-powered captions and video editing for creators','Captions is an AI-first video app that automatically adds captions, removes filler words, adds eye contact, and enhances videos. Popular with social media creators for polished, accessible content.',NULL,NULL,'','freemium','Free: Basic features. Pro $10/mo: All AI features, no watermark.','beginner','15M+',4.4,'Captions Technologies',2021,'captions',0,5,'2025-12-20T01:43:30.664Z','2025-12-20T01:43:30.664Z','https://logo.clearbit.com/captions.ai',NULL,'2025-12-23',4.4,4.8,4.4,4.5,4.1,'Captions has nailed the "one-tap enhancement" workflow. Upload a video, and AI handles captions, removes ums and ahs, and even corrects eye contact. For talking-head content creators, it''s magical. The $10/month Pro plan is reasonable for the time saved. Less useful for non-talking-head content.','Best AI video enhancement for talking-head content. Magical one-tap improvements.',NULL,'Captions AI Review 2025: Auto Captions, Eye Contact & Pricing','Captions AI review with 2025 pricing ($10/mo), AI eye contact, filler word removal, and auto-captions. Best for creators.','Captions AI');
INSERT INTO "tools" VALUES(28,'Veed','Online video editor with powerful AI tools for creators and teams','VEED is a browser-based video editor with comprehensive AI features: auto-subtitles, text-to-video, avatars, translations, and more. Popular with marketers and content teams.',NULL,NULL,'','freemium','Free: 2GB storage, watermark. Basic $18/mo: 25GB, no watermark. Pro $30/mo: 100GB, brand kit.','beginner','10M+',4.3,'VEED Limited',2019,'veed',0,5,'2025-12-20T01:43:31.123Z','2025-12-20T01:43:31.123Z','https://logo.clearbit.com/veed.io',NULL,'2025-12-23',4.3,4.5,4.1,4.5,4.2,'VEED has evolved into a serious AI video platform. The subtitle accuracy is excellent, AI avatars are useful for explainer content, and the browser-based editor is surprisingly capable. Pricing is higher than simpler tools but justified by the feature set. For marketing teams and content creators who need polished video at scale, VEED delivers.','Comprehensive AI video platform for teams. Excellent subtitles and AI features.',NULL,'VEED Review 2025: AI Video Editor Pricing, Subtitles & Features','VEED.io review with 2025 pricing ($18-$30/mo), AI subtitles, avatars, and video editing features. See why teams choose VEED.','VEED review');
INSERT INTO "tools" VALUES(29,'InVideo','Turn ideas into videos with AI-powered creation','InVideo is an AI video platform that creates videos from text prompts. Describe your video, and AI generates scripts, selects stock footage, adds music, and produces polished results.',NULL,NULL,'','freemium','Free: 10 min/week, watermark. Plus $25/mo: 50 min/week. Max $60/mo: 200 min/week.','beginner','7M+',4.2,'InVideo Inc.',2017,'invideo',0,5,'2025-12-20T01:43:31.584Z','2025-12-20T01:43:31.583Z','https://logo.clearbit.com/invideo.io',NULL,'2025-12-23',4.2,4.5,4.2,4.3,4.1,'InVideo AI is genuinely useful for creating video content at scale. The AI script generation is competent, stock footage selection is relevant, and output quality is acceptable for social media and marketing. Not for high-end production, but excellent for rapid content creation. The Plus plan at $25/month is reasonable for businesses.','Best AI video creation from text. Great for rapid marketing content.',NULL,'InVideo AI Review 2025: Text-to-Video Pricing & Features','InVideo AI review with 2025 pricing ($25-$60/mo), text-to-video features, and comparison. Create videos from prompts.','InVideo AI');
INSERT INTO "tools" VALUES(30,'Harvey AI','AI-powered legal research and document drafting for law firms','Harvey AI is a legal AI platform used by major law firms for research, document review, contract analysis, and drafting. Built specifically for legal professionals.',NULL,NULL,'','freemium','Enterprise pricing only. Contact for quotes.','beginner','10K+',4.4,'Harvey AI',2022,'harvey-ai',0,11,'2025-12-20T01:43:32.034Z','2025-12-20T01:43:32.034Z','https://logo.clearbit.com/harvey.ai',NULL,'2025-12-23',4.4,4.2,3.8,4.6,4.4,'Harvey AI represents enterprise-grade legal AI. Used by top law firms like Allen & Overy, it handles complex legal research, document analysis, and drafting with domain expertise ChatGPT lacks. Not available to individuals - this is for law firms with budget.','Enterprise legal AI for law firms. Premium pricing for premium capabilities.',NULL,'Harvey AI Review 2025: Legal AI Platform for Law Firms','Harvey AI review with features, legal research capabilities, and enterprise focus. AI for legal professionals.','Harvey AI legal');
INSERT INTO "tools" VALUES(31,'Bolt','Build full-stack web apps instantly with AI in your browser','Bolt.new lets you build, run, and deploy full-stack web applications entirely in your browser using AI. Describe what you want, and Bolt generates the code, runs the dev server, and deploys your app.',NULL,NULL,'','freemium','Free tier with limited tokens. Pro $20/mo: 10M tokens. Team plans available.','beginner','500K+',4.4,'StackBlitz',2024,'bolt',0,4,'2025-12-20T01:43:32.497Z','2025-12-20T01:43:32.497Z','https://logo.clearbit.com/bolt.new',NULL,'2025-12-23',4.4,4.9,4.5,4.4,4,'Bolt represents a new paradigm in AI-assisted development. Unlike code assistants that help you write code, Bolt writes AND runs the entire application in your browser. No local setup, no deployment hassle. For MVPs, prototypes, and learning, it''s magical. The quality is impressive for generated apps. Limitations: complex apps still need traditional development, and you''re somewhat locked into their ecosystem. But for going from idea to deployed app in minutes, nothing else compares.','Revolutionary for rapid prototyping. Go from idea to deployed app in minutes.',NULL,'Bolt.new Review 2025: AI App Builder Pricing & Features','Bolt.new review with pricing (free-$20/mo), features, and examples. Build full-stack apps with AI in your browser.','Bolt new review');
INSERT INTO "tools" VALUES(32,'Sora','OpenAI''s revolutionary AI video generator that creates stunning videos from text','Sora is OpenAI''s groundbreaking text-to-video AI model. It can generate up to 60-second videos with remarkable realism, complex camera movements, and coherent multi-shot narratives from text descriptions.',NULL,NULL,'','freemium','Included with ChatGPT Plus ($20/mo) for limited generations. Unlimited with ChatGPT Pro ($200/mo).','beginner','50M+',4.7,'OpenAI',2024,'sora',0,5,'2025-12-20T01:43:32.945Z','2025-12-20T01:43:32.945Z','https://logo.clearbit.com/openai.com',NULL,'2025-12-23',4.7,4.5,3.8,4.9,4.2,'Sora represents a genuine breakthrough in AI video generation. The quality gap between Sora and competitors like Runway or Pika is substantial - Sora produces videos that genuinely look like professional footage. The 60-second duration, physics understanding, and camera control are unmatched. The main limitation is access: Sora 1 with limited generations comes with Plus ($20/mo), while Sora 2 Pro requires the $200/mo ChatGPT Pro subscription. For filmmakers, advertisers, and content creators, Sora is worth the premium. Hobbyists may prefer cheaper alternatives for now.','The most advanced AI video generator available. Premium pricing, but unmatched quality.',NULL,'Sora Review 2025: OpenAI''s AI Video Generator Pricing & Features','Sora by OpenAI review with 2025 access (ChatGPT Plus/Pro), features, and comparison to Runway. See why it''s the best AI video generator.','Sora AI video');
INSERT INTO "tools" VALUES(33,'Kling AI','Chinese AI video pioneer with impressive long-form generation','Kling AI is Kuaishou''s advanced video generation model, notable for generating longer videos (up to 2 minutes) with good quality. One of the most capable free options available.',NULL,NULL,'','freemium','Free tier available with daily credits. Pro plans from $10/mo.','beginner','20M+',4.2,'Kuaishou Technology',2024,'kling-ai',0,5,'2025-12-20T01:43:33.401Z','2025-12-20T01:43:33.401Z','https://logo.clearbit.com/klingai.com',NULL,'2025-12-23',4.2,4.3,4.7,4.4,3.8,'Kling AI has surprised the industry with quality that rivals Western alternatives at a fraction of the cost. The free tier is generous, and the ability to generate longer videos sets it apart. Some content restrictions exist due to Chinese regulations. For budget-conscious creators who need longer AI videos, Kling is worth exploring.','Impressive Chinese AI video tool with generous free tier and long video capability.',NULL,'Kling AI Review 2025: Free AI Video Generator with Long Videos','Kling AI review with 2025 features, free tier, and comparison to Runway/Sora. See how to generate 2-minute AI videos free.','Kling AI video');
INSERT INTO "tools" VALUES(34,'Hailuo AI','MiniMax''s impressive AI video generator with excellent motion quality','Hailuo AI (also known as MiniMax Video) is a Chinese AI video platform gaining attention for its natural motion, good physics simulation, and competitive quality against Western alternatives.',NULL,NULL,'','freemium','Free tier with daily credits. Premium tiers available.','beginner','5M+',4.2,'MiniMax',2024,'hailuo-ai',0,5,'2025-12-20T01:43:33.880Z','2025-12-20T01:43:33.880Z','https://logo.clearbit.com/hailuoai.video',NULL,'2025-12-23',4.2,4.2,4.6,4.3,3.7,'Hailuo AI has emerged as a dark horse in AI video generation. Its motion quality and physics understanding often surpass more established tools. The free tier is useful for testing, and the quality-to-cost ratio is excellent. Like other Chinese AI tools, consider data privacy implications. For creators seeking quality AI video without Western premium pricing, Hailuo deserves consideration.','Rising star in AI video with excellent motion quality and physics.',NULL,'Hailuo AI Review 2025: MiniMax Video Generator Quality & Pricing','Hailuo AI (MiniMax Video) review with 2025 features, free tier, and quality analysis. See how it compares to Runway and Kling.','Hailuo AI video');
INSERT INTO "tools" VALUES(35,'DeepSeek','Powerful open-source AI models rivaling GPT-4 at a fraction of the cost','DeepSeek offers high-performance AI models that rival GPT-4 on benchmarks at dramatically lower costs. Their open-source models can be run locally, and their API is one of the most affordable in the industry.',NULL,NULL,'','freemium','Chat: Free. API: $0.14/M input, $0.28/M output tokens (vs GPT-4''s $30/M). Open-source models free to download.','beginner','5M+',4.4,'DeepSeek',2023,'deepseek',0,11,'2025-12-20T01:43:34.826Z','2025-12-20T01:43:34.825Z','https://logo.clearbit.com/deepseek.com',NULL,'2025-12-23',4.4,4.5,5,4.3,3.8,'DeepSeek is the disruptor the AI industry needed. Their models genuinely compete with GPT-4 on benchmarks while costing 100x less via API. The open-source releases mean you can run these locally for free. For developers and businesses building AI applications, DeepSeek offers incredible value. The chat interface is clean and capable. Main concerns are around data privacy (China-based company) and less polish than OpenAI. But for pure capability per dollar, DeepSeek is unmatched.','Best value in AI. GPT-4-class performance at 1% of the cost.',NULL,'DeepSeek Review 2025: Pricing, Models & vs GPT-4','DeepSeek review with pricing (100x cheaper than GPT-4), open-source models, and benchmarks. See why developers are switching to DeepSeek.','DeepSeek review');
INSERT INTO "tools" VALUES(36,'Google Gemini','Google''s most capable AI model with multimodal understanding and deep Google integration','Google Gemini is Google''s flagship AI, offering multimodal understanding across text, images, video, and audio. Deeply integrated with Google services, it powers Bard, Google Search, and Workspace features.',NULL,NULL,'','freemium','Free tier available. Gemini Advanced $20/mo includes 2TB Google One storage.','beginner','300M+',4.4,'Google',2023,'google-gemini',0,11,'2025-12-20T01:43:35.325Z','2025-12-20T01:43:35.325Z','https://logo.clearbit.com/google.com',NULL,'2025-12-23',4.4,4.7,4.5,4.4,4.2,'Gemini represents Google''s serious push into AI. The integration with Google services is its killer feature - summarize Gmail threads, analyze Google Docs, get AI in your Google searches. Gemini 1.5 Pro''s 1M token context window is industry-leading. For Google Workspace users, Gemini Advanced is compelling value at $20/mo including 2TB storage. The main weakness is that Gemini still trails ChatGPT and Claude in raw reasoning benchmarks. Best for users deep in the Google ecosystem.','Best for Google Workspace users. Deep integration with Google services makes it uniquely valuable.',NULL,'Google Gemini Review 2025: Advanced Pricing & Features','Google Gemini review with 2025 pricing (free & $20/mo Advanced), features, and comparison to ChatGPT. See why Google''s AI excels for Workspace users.','Google Gemini review');
INSERT INTO "tools" VALUES(37,'Warp AI','The AI-powered terminal for modern developers','Warp is a reimagined terminal with AI built-in. Get command suggestions, fix errors, and learn shell commands through natural language - all in a fast, modern interface.',NULL,NULL,'','freemium','Free for individuals. Team $22/user/mo. Enterprise custom.','beginner','1M+',4.4,'Warp',2022,'warp-ai',0,4,'2025-12-20T01:43:35.778Z','2025-12-20T01:43:35.778Z','https://logo.clearbit.com/warp.dev',NULL,'2025-12-23',4.4,4.6,4.7,4.4,4.2,'Warp solves a real problem: the terminal is powerful but cryptic. Warp AI explains errors, suggests commands, and helps you learn. For developers who struggle with shell commands or want productivity boosts, Warp is excellent. Power users who know their shells may not need it.','Best AI-powered terminal. Makes command line accessible.',NULL,'Warp Review 2025: AI Terminal Features & Pricing','Warp AI terminal review with 2025 pricing (free), AI command suggestions, and modern interface. The smarter command line.','Warp terminal');
INSERT INTO "tools" VALUES(38,'Clay','AI-powered sales intelligence and data enrichment platform','Clay combines 50+ data providers with AI to enrich leads, automate research, and personalize outreach at scale. Essential for modern sales and GTM teams.',NULL,NULL,'','freemium','Starter $149/mo. Explorer $349/mo. Pro $800/mo. Enterprise custom.','beginner','50K+',4.5,'Clay Inc.',2020,'clay',0,12,'2025-12-20T01:43:36.526Z','2025-12-20T01:43:36.526Z','https://logo.clearbit.com/clay.com',NULL,'2025-12-23',4.5,4.2,4.1,4.7,4.3,'Clay has become essential for high-velocity sales teams. The ability to combine data from 50+ sources and use AI for enrichment is powerful. Expensive but delivers ROI for teams doing significant outbound. Not for small operations.','Best sales intelligence platform. Data enrichment and AI research combined.',NULL,'Clay Review 2025: Sales Intelligence & Data Enrichment Pricing','Clay review with 2025 pricing ($149-$800/mo), data enrichment, and AI research. Essential for sales teams.','Clay sales');
INSERT INTO "tools" VALUES(39,'Zapier AI','Connect 6000+ apps with AI-powered workflow automation','Zapier is the most popular automation platform, connecting 6000+ apps with AI features for building and optimizing workflows. Natural language automation creation and AI-powered suggestions.',NULL,NULL,'','freemium','Free: 100 tasks/month. Starter $20/mo: 750 tasks. Professional $49/mo: 2K tasks. Team $69/mo.','beginner','2M+',4.4,'Zapier Inc.',2012,'zapier-ai',0,10,'2025-12-20T01:43:36.982Z','2025-12-20T01:43:36.982Z','https://logo.clearbit.com/zapier.com',NULL,'2025-12-23',4.4,4.7,3.9,4.4,4.3,'Zapier remains the default choice for automation thanks to its massive app library and ease of use. The AI features (natural language workflow creation) are genuinely useful for beginners. It''s more expensive than Make for equivalent usage, but the lower learning curve and larger integration library often justify the premium. For most businesses, Zapier is where to start.','Most popular automation platform. Best for beginners with huge app library.',NULL,'Zapier Review 2025: AI Automation Platform Pricing & Features','Zapier review with 2025 pricing ($20-$69/mo), AI features, 6000+ integrations, and comparison to Make. Automate your work.','Zapier review');
INSERT INTO "tools" VALUES(41,'Figma AI','AI-powered features for the leading collaborative design tool','Figma AI brings artificial intelligence to the world''s most popular design tool. Generate designs from prompts, rename layers automatically, and streamline design workflows with AI assistance.',NULL,NULL,'','freemium','Starter free. Professional $15/editor/mo. Organization $45/editor/mo with AI.','beginner','5M+',4.2,'Figma Inc. (Adobe)',2024,'figma-ai',0,9,'2025-12-20T01:43:37.924Z','2025-12-20T01:43:37.924Z','https://logo.clearbit.com/figma.com',NULL,'2025-12-23',4.2,4.4,4,4.1,4.3,'Figma AI is still evolving, but the integration into an already-excellent design tool is promising. Current features focus on productivity (auto-naming, search) rather than generation. For Figma users, the AI features are nice-to-have additions. For AI-first design generation, Canva Magic Studio is currently more capable.','AI enhancements for Figma users. Productivity-focused rather than generative.',NULL,'Figma AI Review 2025: AI Design Features & Pricing','Figma AI review with 2025 features, pricing ($15-$45/mo), and comparison to Canva. AI-powered design collaboration.','Figma AI');
INSERT INTO "tools" VALUES(42,'Adobe Firefly','Adobe''s creative AI with commercial-safe generated images','Adobe Firefly is Adobe''s generative AI, integrated across Creative Cloud apps. Generate images, effects, and text styles with commercially-safe, ethically-trained AI models.',NULL,NULL,'','freemium','Free: 25 credits/month. Firefly Premium $5/mo: 100 credits. Included in Creative Cloud ($55+/mo).','beginner','50M+',4.3,'Adobe Inc.',2023,'adobe-firefly',0,9,'2025-12-20T01:43:38.366Z','2025-12-20T01:43:38.366Z','https://logo.clearbit.com/adobe.com',NULL,'2025-12-23',4.3,4.5,4.4,4.2,4.4,'Firefly is Adobe''s answer to Midjourney, and it''s a compelling option for Creative Cloud users. The commercial licensing is bulletproof - Adobe indemnifies users against copyright claims. Quality is good but not quite Midjourney-level for artistic work. The integration into Photoshop, Illustrator, and other Adobe apps is genuinely useful. For Creative Cloud subscribers, it''s essentially a free bonus.','Commercially-safe AI images with Adobe integration. Best for Creative Cloud users.',NULL,'Adobe Firefly Review 2025: AI Image Generator Pricing & Features','Adobe Firefly review with 2025 pricing (free-$5/mo), commercial licensing, and Creative Cloud integration. Safe AI images for professionals.','Adobe Firefly review');
INSERT INTO "tools" VALUES(43,'Canva Magic Studio','AI-powered design tools for everyone - create anything instantly','Canva Magic Studio is Canva''s AI feature suite, including Magic Design, Magic Write, Background Remover, and more. Generate complete designs, edit images, and create content with AI assistance.',NULL,NULL,'','freemium','Free: Limited Magic features. Canva Pro $15/mo: Full Magic Studio access.','beginner','180M+',4.5,'Canva Pty Ltd',2023,'canva-magic-studio',0,9,'2025-12-20T01:43:38.812Z','2025-12-20T01:43:38.812Z','https://logo.clearbit.com/canva.com',NULL,'2025-12-23',4.5,4.9,4.7,4.4,4.3,'Canva Magic Studio democratizes AI design for non-designers. Magic Design generates complete social posts, presentations, and videos from a single prompt. The quality is "good enough" for most business needs, though designers may want more control. At $15/month for Pro (which includes much more than AI), it''s excellent value for small businesses and creators.','Best AI design for non-designers. Magic Studio makes creation effortless.',NULL,'Canva Magic Studio Review 2025: AI Design Features & Pricing','Canva Magic Studio review with 2025 features, Magic Design, and Pro pricing ($15/mo). AI design tools for everyone.','Canva Magic Studio');
INSERT INTO "tools" VALUES(44,'Copy.ai','AI-powered content creation for marketers and businesses','Copy.ai is a leading AI content platform specializing in marketing copy. Generate blog posts, social media content, emails, and ad copy with AI assistance.',NULL,NULL,'','freemium','Free: 2000 words/month. Pro $36/mo: Unlimited words. Team $186/mo: 5 seats.','beginner','10M+',4.2,'Copy.ai Inc.',2020,'copy-ai',0,2,'2025-12-20T01:43:39.479Z','2025-12-20T01:43:39.479Z','https://logo.clearbit.com/copy.ai',NULL,'2025-12-23',4.2,4.5,3.9,4.3,4,'Copy.ai has evolved from a simple copywriting tool to a comprehensive AI content platform. The workflow features are genuinely useful for scaling content production, and the quality has improved significantly. Pro at $36/month feels premium, but unlimited words and good templates justify it for regular users. The free tier is too limited for serious use.','Solid AI content platform for marketing teams. Good workflows but premium pricing.',NULL,'Copy.ai Review 2025: AI Copywriting Tool Pricing & Features','Copy.ai review with 2025 pricing ($36/mo Pro), AI content features, and comparison to Jasper. Create marketing copy with AI.','Copy.ai review');
INSERT INTO "tools" VALUES(45,'Gamma','Create beautiful presentations with AI - just describe your idea','Gamma is an AI-powered presentation tool that creates slides, documents, and webpages from prompts. Describe your topic, and AI generates a complete, designed presentation.',NULL,NULL,'','freemium','Free: 400 credits. Plus $10/mo: Unlimited AI. Pro $20/mo: Advanced features.','beginner','15M+',4.5,'Gamma Tech Inc.',2022,'gamma',0,12,'2025-12-20T01:43:39.933Z','2025-12-20T01:43:39.933Z','https://logo.clearbit.com/gamma.app',NULL,'2025-12-23',4.5,4.8,4.6,4.4,4.2,'Gamma has genuinely changed how presentations are made. Describe your topic, and it generates a complete deck with real content - not just placeholders. The designs are modern and professional. For anyone who dreads building slides, Gamma is transformative. The free tier is generous enough to test thoroughly.','Best AI presentation tool. Create complete decks from a single prompt.',NULL,'Gamma AI Review 2025: Presentation Generator Pricing & Features','Gamma AI review with 2025 pricing (free-$20/mo), presentation generation, and comparison to PowerPoint. Create slides with AI.','Gamma AI');
INSERT INTO "tools" VALUES(46,'Tome','AI-powered storytelling and presentation tool for modern narratives','Tome is an AI storytelling platform that creates narrative presentations with generated text, images, and layouts. Popular for pitch decks, portfolios, and creative storytelling.',NULL,NULL,'','freemium','Free: Limited features. Professional $16/mo: Unlimited AI. Enterprise custom.','beginner','5M+',4.2,'Tome',2022,'tome',0,12,'2025-12-20T01:44:05.155Z','2025-12-20T01:44:05.154Z','https://logo.clearbit.com/tome.app',NULL,'2025-12-23',4.2,4.5,4,4.3,4.1,'Tome takes a more narrative approach to presentations than Gamma. It''s excellent for storytelling - investor pitches, creative portfolios, thought leadership. The AI generation is capable but the differentiator is the emphasis on story flow rather than traditional slides. For traditional business presentations, Gamma may be more suitable.','AI storytelling for narrative presentations. Best for creative and pitch decks.',NULL,'Tome AI Review 2025: AI Storytelling Tool Pricing & Features','Tome AI review with 2025 pricing ($16/mo), storytelling features, and comparison to Gamma. Create narrative presentations with AI.','Tome AI');
INSERT INTO "tools" VALUES(47,'Jasper AI','Enterprise AI content platform for marketing teams','Jasper is an enterprise-grade AI content platform offering long-form writing, brand voice training, and team collaboration. One of the most established AI writing tools.',NULL,NULL,'','freemium','Creator $49/mo: 1 seat. Pro $69/mo: 1 seat, more features. Business custom pricing.','beginner','100K+',4.3,'Jasper AI',2021,'jasper-ai',0,2,'2025-12-20T01:44:05.605Z','2025-12-20T01:44:05.605Z','https://logo.clearbit.com/jasper.ai',NULL,'2025-12-23',4.3,4.4,3.7,4.5,4.3,'Jasper has positioned itself as the enterprise choice for AI content. The brand voice feature is genuinely useful, and the quality is consistently good. However, the pricing is steep: $49-69/month is significantly more than alternatives. For enterprises with budget and need for brand consistency, Jasper delivers. For individuals or small teams, cheaper options exist.','Enterprise-grade AI content platform. Premium pricing for premium features.',NULL,'Jasper AI Review 2025: Enterprise Content Platform Pricing & Features','Jasper AI review with 2025 pricing ($49-$69/mo), brand voice, and enterprise features. See why Fortune 500s choose Jasper.','Jasper AI review');
INSERT INTO "tools" VALUES(48,'Meshy','Generate 3D models from text and images with AI','Meshy generates 3D models from text descriptions or images. Create game assets, product designs, and 3D art without traditional modeling skills.',NULL,NULL,'','freemium','Free: 200 credits/month. Pro $20/mo: 1000 credits. Max $60/mo: 3500 credits.','beginner','500K+',4.3,'Meshy Inc.',2023,'meshy',0,8,'2025-12-20T01:44:06.713Z','2025-12-20T01:44:06.713Z','https://logo.clearbit.com/meshy.ai',NULL,'2025-12-23',4.3,4.4,4.4,4.3,4.1,'Meshy is leading the text-to-3D space with consistently improving quality. The models are game-ready and work in major 3D software. For indie game developers, designers, and 3D artists needing quick assets, Meshy delivers. Quality isn''t matching hand-crafted work yet, but for rapid prototyping and asset creation, it''s invaluable.','Best text-to-3D generator. Game-ready models from descriptions.',NULL,'Meshy Review 2025: AI 3D Model Generator Pricing & Features','Meshy AI review with 2025 pricing ($20-$60/mo), text-to-3D features, and model quality. Generate 3D assets from text.','Meshy AI');
INSERT INTO "tools" VALUES(49,'Spline AI','3D design made easy with AI-powered creation tools','Spline is a web-based 3D design tool with AI features for generating and editing 3D content. Create 3D websites, illustrations, and interactive experiences.',NULL,NULL,'','freemium','Free: Full editor. Pro $9/mo: Team features. Team $25/user/mo.','beginner','2M+',4.4,'Spline Inc.',2020,'spline-ai',0,8,'2025-12-20T01:44:07.168Z','2025-12-20T01:44:07.168Z','https://logo.clearbit.com/spline.design',NULL,'2025-12-23',4.4,4.6,4.7,4.3,4.1,'Spline democratizes 3D design for web designers. The browser-based editor is intuitive, and AI generation helps non-3D-artists create impressive content. For 3D web elements and interactive experiences, Spline is excellent. Not for game development or complex 3D work.','Best browser-based 3D design. Great for web designers.',NULL,'Spline AI Review 2025: 3D Design Tool Pricing & Features','Spline review with 2025 pricing (free-$25/mo), 3D design features, and AI generation. Create 3D for web.','Spline 3D');
INSERT INTO "tools" VALUES(50,'10Web','AI-powered WordPress website builder and hosting','10Web combines AI website generation with managed WordPress hosting. Generate WordPress sites from prompts, then customize with familiar WordPress tools.',NULL,NULL,'','freemium','AI Starter $10/mo. AI Premium $15/mo. AI Ultimate $25/mo.','beginner','100K+',4.1,'10Web',2017,'10web',0,4,'2025-12-20T01:44:07.561Z','2025-12-20T01:44:07.561Z','https://logo.clearbit.com/10web.io',NULL,'2025-12-23',4.1,4.2,4.2,4.1,4,'10Web bridges AI generation and WordPress familiarity. Generate a site with AI, then customize with the world''s most popular CMS. Good for WordPress users who want AI generation; less suitable for those seeking simpler solutions.','AI WordPress builder. Best for WordPress ecosystem users.',NULL,'10Web Review 2025: AI WordPress Builder Pricing & Features','10Web review with 2025 pricing ($10-$25/mo), AI website generation, and WordPress hosting. Build sites with AI.','10Web AI');
INSERT INTO "tools" VALUES(51,'Durable','Build a complete small business website in 30 seconds','Durable generates complete business websites with AI - including copy, images, and design - in under a minute. Built specifically for small businesses and service providers.',NULL,NULL,'','freemium','Starter $12/mo. Business $20/mo.','beginner','500K+',4,'Durable',2022,'durable',0,4,'2025-12-20T01:44:07.996Z','2025-12-20T01:44:07.996Z','https://logo.clearbit.com/durable.co',NULL,'2025-12-23',4,4.8,4.3,3.8,4,'Durable is impressively fast - describe your business and get a complete website in seconds. Quality is acceptable for small businesses who need online presence quickly. More sophisticated needs should look elsewhere, but for speed-to-launch, Durable excels.','Fastest AI website builder. Small business focused.',NULL,'Durable Review 2025: 30-Second AI Website Builder Pricing','Durable AI review with 2025 pricing ($12-$20/mo), instant website generation, and small business features.','Durable AI');
INSERT INTO "tools" VALUES(52,'Framer AI','Design and publish websites with AI - no code required','Framer AI generates complete, publishable websites from text prompts. Describe your site, and AI creates pages, layouts, and copy. Popular for portfolios, landing pages, and marketing sites.',NULL,NULL,'','freemium','Free: Framer subdomain. Mini $5/mo: Custom domain. Basic $15/mo: More pages. Pro $30/mo: Analytics.','beginner','4M+',4.5,'Framer BV',2023,'framer-ai',0,4,'2025-12-20T01:44:08.381Z','2025-12-20T01:44:08.381Z','https://logo.clearbit.com/framer.com',NULL,'2025-12-23',4.5,4.6,4.4,4.5,4.2,'Framer AI is genuinely impressive for website generation. Describe your site and get a publishable result in minutes. The designs are modern and professional - not obviously AI-generated. For landing pages, portfolios, and marketing sites, it''s excellent. Complex web apps still need traditional development, but for most websites, Framer delivers.','Best AI website generator. Professional sites from prompts in minutes.',NULL,'Framer AI Review 2025: AI Website Builder Pricing & Features','Framer AI review with 2025 pricing ($5-$30/mo), website generation, and comparison. Create professional websites with AI prompts.','Framer AI');
INSERT INTO "tools" VALUES(53,'Julius AI','Chat with your data - AI-powered analysis for everyone','Julius AI lets you upload data and ask questions in plain English. Generate charts, perform analysis, and get insights without knowing Python or SQL.',NULL,NULL,'https://julius.ai','freemium','Free: Limited queries. Pro $20/mo: Unlimited analysis.','beginner','500K+',4.3,'Julius AI',2022,'julius-ai',0,13,'2025-12-23 01:57:55','2025-12-23 01:57:55','https://logo.clearbit.com/julius.ai',NULL,'2025-12-23',4.3,4.7,4.4,4.2,4.1,'Julius democratizes data analysis. Upload a CSV or connect a database, ask questions in English, and get visualizations and insights. For non-technical users who need data insights, Julius is transformative. Power users may want more control, but for quick analysis, it''s excellent.','Best AI for non-technical data analysis. Natural language to insights.',NULL,'Julius AI Review 2025: Chat with Data Pricing & Features','Julius AI review with 2025 pricing ($20/mo), data analysis, and visualization. Ask questions about your data in plain English.','Julius AI');
INSERT INTO "tools" VALUES(54,'Equals','Next-generation spreadsheet with SQL and AI built-in','Equals combines spreadsheet functionality with database connections and AI analysis. Query databases directly, visualize data, and get AI insights - all in a familiar spreadsheet interface.',NULL,NULL,'https://equals.com','paid','Free: Basic features. Pro $49/user/mo. Team $79/user/mo.','intermediate','50K+',4.3,'Equals Inc.',2021,'equals',0,13,'2025-12-23 01:57:56','2025-12-23 01:57:56','https://logo.clearbit.com/equals.com',NULL,'2025-12-23',4.3,4.1,4,4.5,4.2,'Equals modernizes spreadsheets for data-heavy teams. The ability to query databases directly and get AI analysis makes it powerful for ops and analytics. More complex than Excel/Sheets but far more capable for data work.','Modern spreadsheet for data teams. SQL + AI in familiar format.',NULL,'Equals Review 2025: AI Spreadsheet for Data Teams','Equals review with 2025 pricing ($49-$79/mo), SQL integration, and AI analysis. The modern spreadsheet.','Equals spreadsheet');
INSERT INTO "tools" VALUES(55,'Obviously AI','Build predictive AI models without coding','Obviously AI lets business users build machine learning models without code. Upload data, select what to predict, and get deployable ML models in minutes.',NULL,NULL,'https://obviously.ai','freemium','Starter $75/mo. Growth $250/mo. Enterprise custom.','beginner','10K+',4.1,'Obviously AI',2020,'obviously-ai',0,13,'2025-12-23 01:57:56','2025-12-23 01:57:56','https://logo.clearbit.com/obviously.ai',NULL,'2025-12-23',4.1,4.5,3.9,4,4,'Obviously AI makes machine learning accessible to non-technical users. Upload a CSV, point at what to predict, and get a working model. Quality won''t match data science teams, but for business users, it''s transformative.','No-code ML for business users. Prediction without programming.',NULL,'Obviously AI Review 2025: No-Code ML Platform Pricing','Obviously AI review with 2025 pricing ($75-$250/mo), no-code machine learning, and prediction features.','Obviously AI');
INSERT INTO "tools" VALUES(56,'Akkio','No-code AI for business prediction and analysis','Akkio enables businesses to build AI models without coding. Predict outcomes, analyze data, and automate insights using drag-and-drop interfaces.',NULL,NULL,'https://akkio.com','freemium','Starter $50/mo. Professional $500/mo. Enterprise custom.','beginner','10K+',4,'Akkio',2020,'akkio',0,13,'2025-12-23 01:57:57','2025-12-23 01:57:57','https://logo.clearbit.com/akkio.com',NULL,'2025-12-23',4,4.4,4,4,4,'Akkio makes business AI accessible. Upload data, select outcomes, and get predictions. Good for sales forecasting, churn prediction, and similar business use cases.','Business-focused no-code AI. Good for predictions and forecasting.',NULL,'Akkio Review 2025: No-Code AI Platform Pricing & Features','Akkio review with 2025 pricing ($50-$500/mo), no-code AI, and prediction features.','Akkio AI');
INSERT INTO "tools" VALUES(57,'Hex','Collaborative data workspace for analytics and AI','Hex combines notebooks, SQL, visualization, and AI in one platform. Build analyses, create dashboards, and collaborate on data work.',NULL,NULL,'https://hex.tech','freemium','Community free. Team $45/user/mo. Enterprise custom.','intermediate','100K+',4.4,'Hex Technologies',2020,'hex',0,13,'2025-12-23 01:57:58','2025-12-23 01:57:58','https://logo.clearbit.com/hex.tech',NULL,'2025-12-23',4.4,4.2,4.2,4.5,4.3,'Hex modernizes data work by combining notebooks, SQL, and visualization. The collaborative features make it excellent for data teams. More complex than simple BI tools but more powerful.','Modern data workspace. Notebooks + SQL + AI together.',NULL,'Hex Review 2025: Data Workspace Pricing & Features','Hex review with 2025 pricing ($45/user/mo), notebooks, SQL, and AI features. Collaborative data platform.','Hex data');
INSERT INTO "tools" VALUES(58,'Make','Visual automation platform connecting 1500+ apps without code','Make (formerly Integromat) is a powerful no-code automation platform. Build complex workflows visually, connecting apps and services with advanced logic and data transformation.',NULL,NULL,'https://make.com','freemium','Free: 1000 ops/month. Core $9/mo: 10K ops. Pro $16/mo: Priority. Teams $29/mo.','intermediate','500K+',4.5,'Celonis SE',2016,'make',0,10,'2025-12-23 01:57:58','2025-12-23 01:57:58','https://logo.clearbit.com/make.com',NULL,'2025-12-23',4.5,4.2,4.6,4.7,4.3,'Make is the power user''s choice for automation. More capable than Zapier for complex workflows, with better data manipulation and visual flow building. The learning curve is steeper, but the capabilities justify it. For serious automation needs, Make offers better value than Zapier, especially for complex multi-step processes.','Most powerful visual automation platform. Best for complex workflows.',NULL,'Make Review 2025: Automation Platform Pricing vs Zapier','Make (Integromat) review with 2025 pricing ($9-$29/mo), features, and Zapier comparison. Build powerful automations visually.','Make automation');
INSERT INTO "tools" VALUES(59,'n8n','Open-source workflow automation with self-hosting option','n8n is an open-source automation platform that can be self-hosted. Build workflows connecting 400+ apps with code-optional customization and full data control.',NULL,NULL,'https://n8n.io','freemium','Self-hosted: Free forever. Cloud Starter $20/mo: 2500 executions. Pro $50/mo: 10K executions.','intermediate','100K+',4.4,'n8n GmbH',2019,'n8n',0,10,'2025-12-23 01:57:59','2025-12-23 01:57:59','https://logo.clearbit.com/n8n.io',NULL,'2025-12-23',4.4,4,4.8,4.5,4,'n8n is the automation tool for those who want control. Self-hosting means your data never leaves your infrastructure - crucial for compliance-sensitive businesses. The open-source code means unlimited customization. For developers and privacy-focused teams, n8n is the clear choice. The cloud option offers convenience without the self-hosting burden.','Best self-hosted automation platform. Full control and open source.',NULL,'n8n Review 2025: Open Source Automation vs Zapier & Make','n8n review with 2025 pricing (free self-hosted, $20/mo cloud), self-hosting guide, and comparison. Open-source workflow automation.','n8n automation');
INSERT INTO "tools" VALUES(60,'Bardeen','AI-powered browser automation that scrapes, automates, and integrates','Bardeen is a Chrome extension for browser automation. Scrape data, automate repetitive tasks, and connect web apps with AI assistance - all from your browser.',NULL,NULL,'https://bardeen.ai','freemium','Free: Unlimited non-premium. Pro $10/mo: Premium automations. Business $15/user.','beginner','300K+',4.3,'Bardeen AI Inc.',2020,'bardeen',0,10,'2025-12-23 01:57:59','2025-12-23 01:57:59','https://logo.clearbit.com/bardeen.ai',NULL,'2025-12-23',4.3,4.5,4.4,4.3,4.1,'Bardeen fills a unique niche: browser-based automation. It excels at tasks that require interacting with web pages - scraping data, filling forms, moving information between web apps. The AI can generate automations from natural language. For sales, recruiting, and research workflows that live in the browser, Bardeen is excellent.','Best browser-based automation. AI-powered web scraping and task automation.',NULL,'Bardeen Review 2025: Browser Automation AI Pricing & Features','Bardeen AI review with 2025 pricing ($10/mo), web scraping, browser automation, and comparison. Automate any website.','Bardeen AI');
INSERT INTO "tools" VALUES(61,'Relay','Human-in-the-loop automation for business workflows','Relay adds human decision points to automation. Build workflows that pause for human input, combining AI automation with human judgment.',NULL,NULL,'https://relay.app','freemium','Free: Limited. Starter $15/mo. Pro $45/mo.','beginner','20K+',4.1,'Relay',2021,'relay',0,10,'2025-12-23 01:58:00','2025-12-23 01:58:00','https://logo.clearbit.com/relay.app',NULL,'2025-12-23',4.1,4.4,4.2,4,4.1,'Relay''s human-in-the-loop approach solves a real problem: automation that needs occasional human judgment. Good for workflows where full automation isn''t appropriate.','Automation with human checkpoints. Best for judgment-required workflows.',NULL,'Relay Review 2025: Human-in-the-Loop Automation Pricing','Relay review with 2025 pricing ($15-$45/mo), human-in-the-loop features, and workflow automation.','Relay automation');
INSERT INTO "tools" VALUES(62,'Activepieces','Open-source automation alternative to Zapier','Activepieces is an open-source automation platform. Self-host for free or use cloud version. Build workflows connecting apps without Zapier pricing.',NULL,NULL,'https://activepieces.com','freemium','Self-hosted: Free. Cloud Pro $30/mo.','beginner','50K+',4.2,'Activepieces',2023,'activepieces',0,10,'2025-12-23 01:58:01','2025-12-23 01:58:01','https://logo.clearbit.com/activepieces.com',NULL,'2025-12-23',4.2,4.2,4.8,4.1,4,'Activepieces offers Zapier-like automation for free when self-hosted. Good for teams with technical resources who want to avoid per-task pricing.','Open-source Zapier alternative. Self-host free.',NULL,'Activepieces Review 2025: Open Source Automation Platform','Activepieces review with 2025 pricing (free self-hosted), open-source features, and Zapier comparison.','Activepieces');
INSERT INTO "tools" VALUES(64,'Surfer SEO','AI-powered SEO content optimization for higher rankings','Surfer SEO analyzes top-ranking content and provides data-driven recommendations for optimizing your content. Integrates with AI writers to create SEO-optimized articles from scratch.',NULL,NULL,'https://surferseo.com','paid','Essential $99/mo: 30 articles. Scale $219/mo: 100 articles. Enterprise custom.','intermediate','100K+',4.5,'Surfer SEO',2017,'surfer-seo',0,12,'2025-12-23 01:58:02','2025-12-23 01:58:02','https://logo.clearbit.com/surferseo.com',NULL,'2025-12-23',4.5,4.3,4,4.6,4.2,'Surfer SEO has become essential for data-driven content optimization. The Content Editor shows exactly what keywords, headings, and structure you need to rank. The AI writing integration is genuinely useful. Pricing is premium but justified by the depth of analysis. For SEO-focused content teams, Surfer is the industry standard.','Industry-standard SEO content tool. Data-driven optimization that works.',NULL,'Surfer SEO Review 2025: AI Content Optimization Pricing & Features','Surfer SEO review with 2025 pricing ($99-$219/mo), content editor, and AI features. See why top SEOs use Surfer.','Surfer SEO review');
INSERT INTO "tools" VALUES(65,'Clearscope','Premium SEO content optimization with intuitive interface','Clearscope is an SEO content optimization platform known for its clean interface and accurate recommendations. Used by major publishers and enterprise content teams.',NULL,NULL,'https://clearscope.io','paid','Essentials $189/mo: 100 credits. Business $399/mo: 300 credits. Enterprise custom.','intermediate','10K+',4.4,'Clearscope',2018,'clearscope',0,12,'2025-12-23 01:58:03','2025-12-23 01:58:03','https://logo.clearbit.com/clearscope.io',NULL,'2025-12-23',4.4,4.7,3.7,4.4,4.5,'Clearscope is the premium choice in SEO content optimization. The interface is cleaner than Surfer, the recommendations feel more actionable, and the grades are intuitive. The premium pricing ($189/month starting) is justified for enterprise teams but steep for individuals. For publishers and agencies who prioritize UX, Clearscope delivers.','Premium SEO optimization with excellent UX. Enterprise pricing for enterprise quality.',NULL,'Clearscope Review 2025: SEO Content Optimization Pricing & Features','Clearscope review with 2025 pricing ($189-$399/mo), content grading, and comparison to Surfer. Enterprise SEO optimization.','Clearscope review');
INSERT INTO "tools" VALUES(66,'Writesonic','AI content generator with SEO focus and affordable pricing','Writesonic is an AI content platform offering article writing, ad copy, and SEO tools. Known for its affordable pricing and integration with Surfer SEO.',NULL,NULL,'https://writesonic.com','freemium','Free: 10K words. Pro $12/mo: 100K words. Enterprise custom.','beginner','5M+',4.1,'Writesonic Inc.',2021,'writesonic',0,12,'2025-12-23 01:58:04','2025-12-23 01:58:04','https://logo.clearbit.com/writesonic.com',NULL,'2025-12-23',4.1,4.4,4.4,4.1,4,'Writesonic offers solid value in the AI content space. The pricing is more accessible than Jasper, and the Surfer SEO integration is genuinely useful for SEO-focused content. Quality is good but not exceptional. For SEO bloggers and content marketers on a budget, Writesonic is a sensible choice.','Good value AI content tool with SEO focus. Affordable alternative to Jasper.',NULL,'Writesonic Review 2025: AI Content Generator Pricing & SEO Features','Writesonic review with 2025 pricing ($12/mo), SEO tools, and comparison to Jasper. Affordable AI content creation.','Writesonic review');
INSERT INTO "tools" VALUES(67,'Luma AI','Create 3D from photos and text with breakthrough AI','Luma AI creates 3D assets from photos (NeRF technology) and text prompts. Capture real-world scenes in 3D or generate 3D models from descriptions.',NULL,NULL,'https://lumalabs.ai','freemium','Free: Limited captures. Pro $30/mo: Unlimited captures. API pricing available.','beginner','2M+',4.4,'Luma AI',2021,'luma-ai',0,8,'2025-12-23 01:58:04','2025-12-23 01:58:04','https://logo.clearbit.com/lumalabs.ai',NULL,'2025-12-23',4.4,4.2,4.3,4.6,4.1,'Luma AI represents genuine breakthrough technology. The ability to create 3D scenes from photos is magical - walk around your captures as if you were there. Text-to-3D generation is improving rapidly. For 3D artists, game developers, and anyone needing 3D assets, Luma is pushing boundaries.','Revolutionary 3D capture and generation. Best photo-to-3D technology.',NULL,'Luma AI Review 2025: 3D Capture & Generation Pricing & Features','Luma AI review with 2025 pricing ($30/mo), NeRF 3D capture, and text-to-3D generation. Create 3D from photos.','Luma AI');
INSERT INTO "tools" VALUES(68,'Kaedim','Transform 2D images into production-ready 3D models with AI','Kaedim uses advanced AI to convert 2D images and concept art into high-quality 3D models. Trusted by game studios and product designers, it dramatically reduces 3D asset creation time from hours to minutes.',NULL,NULL,'https://kaedim3d.com','paid','From $15/model, subscription plans from $99/month','intermediate','50K+',4.2,'Kaedim',2021,'kaedim',0,8,'2025-12-23 01:58:05','2025-12-23 01:58:05',NULL,NULL,'2025-12-23',4.2,4.4,4,4.3,4.2,'Kaedim excels at converting concept art and product images into usable 3D models. While it cannot replace skilled 3D artists for complex work, it is transformative for rapid prototyping, game development pipelines, and e-commerce product visualization.','Best 2D to 3D conversion tool. Great for game dev and e-commerce.',NULL,'Kaedim Review 2025 | AI 2D to 3D Model Conversion Tool','Convert 2D images to 3D models with Kaedim AI. Perfect for game dev, e-commerce, and product design. From $15/model.','Kaedim 2D to 3D AI');
INSERT INTO "tools" VALUES(69,'CSM AI','Generate detailed 3D models from single images using AI','CSM AI (Common Sense Machines) creates high-fidelity 3D models from single images or text descriptions. Their technology excels at capturing intricate details and producing game-ready assets.',NULL,NULL,'https://csm.ai','freemium','Free tier available, Pro from $20/month','intermediate','200K+',4.3,'Common Sense Machines',2022,'csm-ai',0,8,'2025-12-23 01:58:05','2025-12-23 01:58:05',NULL,NULL,'2025-12-23',4.3,4.3,4.5,4.4,4.1,'CSM AI delivers impressive 3D model quality from minimal input. The free tier is generous enough for experimentation, and the paid plans offer excellent value for professional use. Particularly strong at organic shapes and characters.','Excellent free 3D generator. Great for organic shapes.',NULL,'CSM AI Review 2025 | Image to 3D Model Generator','Create detailed 3D models from images with CSM AI. Free tier available. Perfect for game dev and 3D artists.','CSM AI 3D generator');
INSERT INTO "tools" VALUES(70,'Tripo AI','Fast AI 3D model generation from text and images','Tripo AI generates 3D models quickly from text or images. Known for speed and quality, it produces game-ready assets with textures.',NULL,NULL,'https://tripo3d.ai','freemium','Free: Limited generations. Pro $20/mo: More generations. API available.','beginner','300K+',4.2,'Tripo AI',2023,'tripo-ai',0,8,'2025-12-23 01:58:06','2025-12-23 01:58:06','https://logo.clearbit.com/tripo3d.ai',NULL,'2025-12-23',4.2,4.3,4.3,4.2,4,'Tripo AI offers competitive 3D generation with fast processing times. Quality rivals Meshy, and the pricing is similar. Worth trying alongside Meshy to see which works better for your specific needs.','Fast AI 3D generation. Good alternative to Meshy.',NULL,'Tripo AI Review 2025: Fast 3D Model Generator Pricing','Tripo AI review with 2025 pricing, text-to-3D features, and comparison to Meshy. Fast 3D model generation.','Tripo AI');
INSERT INTO "tools" VALUES(71,'Grammarly','AI-powered writing assistant for clear, mistake-free communication','Grammarly is the most popular AI writing assistant, checking grammar, spelling, punctuation, and style. Now includes generative AI features for rewriting, expanding, and creating content.',NULL,NULL,'https://grammarly.com','freemium','Free: Basic checks. Premium $12/mo: Advanced style. Business $15/user/mo: Team features.','beginner','30M+',4.6,'Grammarly Inc.',2009,'grammarly',0,2,'2025-12-23 01:58:07','2025-12-23 01:58:07','https://logo.clearbit.com/grammarly.com',NULL,'2025-12-23',4.6,4.8,4.3,4.5,4.4,'Grammarly remains the gold standard for writing assistance. The free tier catches more errors than competitors, and Premium adds valuable style suggestions. The new AI features (GrammarlyGO) bring generative capabilities, though they feel bolted-on compared to native AI tools. For anyone writing professionally in English, Grammarly is essentially mandatory.','Essential writing assistant. Best grammar checking with useful AI features.',NULL,'Grammarly Review 2025: AI Writing Assistant Pricing & Features','Grammarly review with 2025 pricing (free-$15/mo), Premium features, and AI capabilities. See why 30M+ users trust Grammarly.','Grammarly review');
INSERT INTO "tools" VALUES(72,'Sudowrite','AI writing assistant built specifically for fiction authors','Sudowrite is an AI writing tool designed for novelists and fiction writers. Unlike general AI writers, it''s trained on storytelling and offers features like "Write" mode, "Describe" sensory details, and "Brainstorm" plot ideas.',NULL,NULL,'https://sudowrite.com','paid','Hobby $10/mo: 30K words. Professional $25/mo: 90K words. Max $100/mo: 300K words.','intermediate','100K+',4.3,'Sudowrite Inc.',2020,'sudowrite',0,2,'2025-12-23 01:58:07','2025-12-23 01:58:07','https://logo.clearbit.com/sudowrite.com',NULL,'2025-12-23',4.3,4.4,4.2,4.4,4.1,'Sudowrite understands fiction in a way general AI tools don''t. The "Describe" feature that expands sensory details and "Brainstorm" for plot ideas feel purpose-built for novelists. For fiction writers, especially those with writer''s block, Sudowrite is invaluable. Non-fiction writers should look elsewhere.','Best AI for fiction writers. Purpose-built for storytelling.',NULL,'Sudowrite Review 2025: AI Fiction Writing Assistant Pricing','Sudowrite review with 2025 pricing ($10-$100/mo), fiction writing features, and novelist tools. AI assistant for creative writing.','Sudowrite');
INSERT INTO "tools" VALUES(73,'Wordtune','AI-powered rewriting tool that helps you say it better','Wordtune specializes in sentence rewriting - offering multiple ways to phrase your thoughts more clearly, casually, or formally. Developed by AI21 Labs with advanced language understanding.',NULL,NULL,'https://wordtune.com','freemium','Free: 10 rewrites/day. Plus $10/mo: Unlimited rewrites. Business $13.50/user: Team features.','beginner','10M+',4.3,'AI21 Labs',2020,'wordtune',0,2,'2025-12-23 01:58:08','2025-12-23 01:58:08','https://logo.clearbit.com/wordtune.com',NULL,'2025-12-23',4.3,4.6,4.2,4.2,4,'Wordtune excels at what it focuses on: rewriting sentences. If you know what you want to say but struggle with how to say it, Wordtune is invaluable. The suggestions are genuinely helpful and diverse. It''s not a grammar checker or content generator - it''s a specialized tool that does one thing exceptionally well.','Best AI rewriting tool. Excellent for improving sentence clarity and style.',NULL,'Wordtune Review 2025: AI Rewriting Tool Pricing & Features','Wordtune review with 2025 pricing (free-$13.50/mo), rewrite features, and comparison to Grammarly. See how to improve your writing.','Wordtune review');
INSERT INTO "tools" VALUES(74,'Pi','Your personal AI companion for conversations and support','Pi by Inflection AI is a personal AI designed for empathetic, supportive conversations. Unlike task-focused AIs, Pi prioritizes emotional intelligence and companionship.',NULL,NULL,'https://pi.ai','free','Free with optional Pi+ subscription for enhanced features.','beginner','5M+',4.2,'Inflection AI',2023,'pi',0,11,'2025-12-23 01:58:08','2025-12-23 01:58:08','https://logo.clearbit.com/pi.ai',NULL,'2025-12-23',4.2,4.8,4.5,4,4,'Pi takes a refreshingly different approach to AI - it''s designed for conversation and emotional support rather than tasks. The AI feels warmer and more personable than ChatGPT or Claude. For those seeking an AI companion rather than a tool, Pi is unique. Limited utility for work tasks.','Best personal AI companion. Empathetic conversations over productivity.',NULL,'Pi AI Review 2025: Personal AI Companion Features & Experience','Pi AI review with features, conversational style, and comparison. The emotionally intelligent AI companion by Inflection.','Pi AI');
INSERT INTO "tools" VALUES(75,'Poe','Access all AI models in one place - ChatGPT, Claude, and more','Poe by Quora provides access to multiple AI models (GPT-4, Claude, Llama, and more) through a single interface. Compare responses, create custom bots, and switch between AIs freely.',NULL,NULL,'https://poe.com','freemium','Free: Limited daily messages. Poe Premium $20/mo: Unlimited access to all models.','beginner','10M+',4.3,'Quora Inc.',2022,'poe',0,11,'2025-12-23 01:58:09','2025-12-23 01:58:09','https://logo.clearbit.com/poe.com',NULL,'2025-12-23',4.3,4.6,4.5,4.3,4,'Poe is the "cable bundle" of AI chat - one subscription for access to GPT-4, Claude, and others. For users who want to try multiple AIs without separate subscriptions, it''s excellent value. The custom bot creation adds unique value. Power users of one specific AI may prefer direct subscriptions, but for exploration and variety, Poe delivers.','Best AI chat aggregator. Access multiple AIs with one subscription.',NULL,'Poe Review 2025: AI Chat Platform Pricing & All Models Access','Poe review with 2025 pricing ($20/mo), access to GPT-4, Claude, and more. Compare AI models in one place.','Poe AI');
INSERT INTO "tools" VALUES(76,'Grok','Elon Musk''s unfiltered AI with real-time X/Twitter data','Grok is xAI''s chatbot integrated with X (Twitter), known for its "fun mode" personality, real-time information access, and fewer content restrictions than competitors.',NULL,NULL,'https://x.ai','paid','Included with X Premium+ ($16/mo) or SuperGrok standalone subscription.','beginner','10M+',4.1,'xAI',2023,'grok',0,11,'2025-12-23 01:58:10','2025-12-23 01:58:10','https://logo.clearbit.com/x.ai',NULL,'2025-12-23',4.1,4.4,4,4.2,3.8,'Grok offers a unique proposition: real-time access to X/Twitter data and a less restrictive personality. "Fun mode" can be genuinely amusing. The real-time information is useful for current events. For X power users, Grok is a natural fit. Quality rivals but doesn''t exceed GPT-4 or Claude.','X-integrated AI with personality. Real-time data and fewer filters.',NULL,'Grok Review 2025: xAI Chatbot Pricing, Features & X Integration','Grok xAI review with 2025 pricing (X Premium+), real-time X data, and fun mode. Elon Musk''s AI chatbot.','Grok AI');
CREATE TABLE `tools_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`creation_types_id` integer,
  	`user_situations_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`creation_types_id`) REFERENCES `creation_types`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`user_situations_id`) REFERENCES `user_situations`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE IF NOT EXISTS "builders_social_links" (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`platform` text NOT NULL,
  	`url` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES "builders"(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "builders_social_links" VALUES(1,2,'6946fa426207169bad4bb80e','twitter','https://twitter.com/marcuswmusic');
INSERT INTO "builders_social_links" VALUES(2,2,'6946fa426207169bad4bb80f','youtube','https://youtube.com/@marcuswilliamsmusic');
INSERT INTO "builders_social_links" VALUES(1,3,'6946fa446207169bad4bb810','twitter','https://twitter.com/yukitanaka_art');
INSERT INTO "builders_social_links" VALUES(2,3,'6946fa446207169bad4bb811','behance','https://behance.net/yukitanaka');
INSERT INTO "builders_social_links" VALUES(1,4,'6946fa456207169bad4bb812','github','https://github.com/alexrodriguez');
INSERT INTO "builders_social_links" VALUES(2,4,'6946fa456207169bad4bb813','twitter','https://twitter.com/alexr_gamedev');
INSERT INTO "builders_social_links" VALUES(1,5,'6946fa476207169bad4bb814','linkedin','https://linkedin.com/in/emmathompsonai');
INSERT INTO "builders_social_links" VALUES(2,5,'6946fa476207169bad4bb815','twitter','https://twitter.com/emmatwrites');
INSERT INTO "builders_social_links" VALUES(1,6,'6946fa496207169bad4bb816','instagram','https://instagram.com/davidkimphoto');
INSERT INTO "builders_social_links" VALUES(1,7,'6946fa4a6207169bad4bb817','youtube','https://youtube.com/@ninapatelfilms');
INSERT INTO "builders_social_links" VALUES(2,7,'6946fa4a6207169bad4bb818','twitter','https://twitter.com/ninapatelfilms');
INSERT INTO "builders_social_links" VALUES(1,8,'6946fa4b6207169bad4bb819','dribbble','https://dribbble.com/lucasberg');
INSERT INTO "builders_social_links" VALUES(2,8,'6946fa4b6207169bad4bb81a','linkedin','https://linkedin.com/in/lucasbergdesign');
INSERT INTO "builders_social_links" VALUES(1,9,'6946fa4c6207169bad4bb81b','instagram','https://instagram.com/oliviamartaudio');
INSERT INTO "builders_social_links" VALUES(2,9,'6946fa4c6207169bad4bb81c','youtube','https://youtube.com/@oliviamartinez');
INSERT INTO "builders_social_links" VALUES(1,10,'6946fa4d6207169bad4bb81d','behance','https://behance.net/jameswilson');
INSERT INTO "builders_social_links" VALUES(2,10,'6946fa4d6207169bad4bb81e','twitter','https://twitter.com/jwmotiongfx');
CREATE TABLE IF NOT EXISTS "builders" (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`bio` text,
  	`content` text,
  	`location` text,
  	`profile_image_id` integer,
  	`background_image_id` integer,
  	`website` text,
  	`experience_level` text,
  	`availability` text,
  	`slug` text NOT NULL,
  	`featured` integer DEFAULT false,
  	`featured_position` numeric,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`profile_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`background_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "builders" VALUES(1,'Sarah Chen','Digital artist and AI art pioneer. Creator of the "Synthetic Dreams" collection that has been exhibited in galleries worldwide. Specializing in combining traditional art techniques with cutting-edge AI image generation.',NULL,'San Francisco, USA',NULL,NULL,'https://sarahchen.art','expert','selective','sarah-chen',1,1,'2025-12-20T19:33:00.849Z','2025-12-20T19:33:00.848Z');
INSERT INTO "builders" VALUES(2,'Marcus Williams','Music producer and sound designer pushing the boundaries of AI-generated music. Has worked with major labels to integrate AI tools into professional music production workflows.',NULL,'Los Angeles, USA',NULL,NULL,'https://marcuswilliams.studio','advanced','available','marcus-williams',1,2,'2025-12-20T19:34:27.135Z','2025-12-20T19:34:27.133Z');
INSERT INTO "builders" VALUES(3,'Yuki Tanaka','Award-winning animator and motion graphics artist. Combines traditional Japanese animation principles with AI-powered tools to create stunning visual narratives.',NULL,'Tokyo, Japan',NULL,NULL,'https://yukitanaka.jp','expert','selective','yuki-tanaka',1,3,'2025-12-20T19:34:28.423Z','2025-12-20T19:34:28.423Z');
INSERT INTO "builders" VALUES(4,'Alex Rodriguez','Game developer and 3D artist creating immersive worlds using AI tools. Founder of Nebula Studios, specializing in indie game development with AI-generated assets.',NULL,'Barcelona, Spain',NULL,NULL,'https://nebulastudios.dev','advanced','open-source-only','alex-rodriguez',0,NULL,'2025-12-20T19:34:29.870Z','2025-12-20T19:34:29.870Z');
INSERT INTO "builders" VALUES(5,'Emma Thompson','Content creator and AI writing specialist. Helps brands and individuals harness the power of AI for compelling storytelling and content strategy.',NULL,'London, UK',NULL,NULL,'https://emmathompson.co','advanced','available','emma-thompson',1,4,'2025-12-20T19:34:32.083Z','2025-12-20T19:34:32.083Z');
INSERT INTO "builders" VALUES(6,'David Kim','Photographer and visual artist exploring the intersection of AI and documentary photography. His work challenges perceptions of authenticity in the age of AI.',NULL,'Seoul, South Korea',NULL,NULL,'https://davidkim.photo','intermediate','available','david-kim',0,NULL,'2025-12-20T19:34:33.410Z','2025-12-20T19:34:33.410Z');
INSERT INTO "builders" VALUES(7,'Nina Patel','Video producer and filmmaker specializing in AI-enhanced documentaries. Uses generative AI to visualize complex scientific concepts and historical events.',NULL,'Mumbai, India',NULL,NULL,'https://ninapatelfilms.com','advanced','selective','nina-patel',1,5,'2025-12-20T19:34:34.606Z','2025-12-20T19:34:34.606Z');
INSERT INTO "builders" VALUES(8,'Lucas Berg','Industrial designer and 3D artist using AI to prototype and visualize products faster than ever. Consults for major tech companies on AI-integrated design workflows.',NULL,'Berlin, Germany',NULL,NULL,'https://lucasberg.design','expert','unavailable','lucas-berg',0,NULL,'2025-12-20T19:34:35.651Z','2025-12-20T19:34:35.650Z');
INSERT INTO "builders" VALUES(9,'Olivia Martinez','Electronic music producer and sound designer creating experimental soundscapes with AI. Her album "Neural Frequencies" topped independent electronic charts.',NULL,'Austin, USA',NULL,NULL,'https://oliviamart.audio','intermediate','available','olivia-martinez',0,NULL,'2025-12-20T19:34:36.777Z','2025-12-20T19:34:36.777Z');
INSERT INTO "builders" VALUES(10,'James Wilson','Motion graphics artist and animator creating viral content for major brands. Specializes in combining AI animation tools with traditional motion design principles.',NULL,'Toronto, Canada',NULL,NULL,'https://jameswilsonmotion.com','advanced','available','james-wilson',1,6,'2025-12-20T19:34:37.934Z','2025-12-20T19:34:37.933Z');
CREATE TABLE `projects_tools_used` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`name` text NOT NULL,
  	`category` text,
  	`url` text,
  	`usage` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `projects_social_links` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`platform` text NOT NULL,
  	`url` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `projects` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`excerpt` text,
  	`content` text,
  	`featured_image_id` integer,
  	`hero_background_id` integer,
  	`project_year` numeric,
  	`project_author` text,
  	`project_url` text,
  	`demo_url` text,
  	`github_url` text,
  	`workflow` text,
  	`difficulty` text,
  	`time_spent` text,
  	`duration` text,
  	`genre` text,
  	`audio_file_id` integer,
  	`video_file_id` integer,
  	`slug` text NOT NULL,
  	`community_type_id` integer,
  	`views` numeric DEFAULT 0,
  	`featured_in_hero` integer DEFAULT false,
  	`featured_in_showcase` integer DEFAULT false,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`hero_background_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`audio_file_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`video_file_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`community_type_id`) REFERENCES `community_types`(`id`) ON UPDATE no action ON DELETE set null
  );
CREATE TABLE `projects_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`media_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `posts` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`excerpt` text,
  	`content` text,
  	`featured_image_id` integer,
  	`category_badge` text,
  	`publication_date_override` text,
  	`slug` text NOT NULL,
  	`news_category_id` integer,
  	`author_id` integer,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`news_category_id`) REFERENCES `news_categories`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "posts" VALUES(1,'OpenAI Launches GPT-5: A New Era of AI Intelligence','OpenAI has unveiled GPT-5, their most advanced language model yet, featuring unprecedented reasoning capabilities and multimodal understanding.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"OpenAI has officially released GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model demonstrates remarkable improvements in reasoning, creativity, and understanding complex instructions."}]},{"type":"paragraph","children":[{"text":"Key improvements include a 10x increase in context window, native multimodal capabilities, and significantly reduced hallucinations. Early testers report the model can now handle complex multi-step tasks with unprecedented accuracy."}]},{"type":"heading","tag":2,"children":[{"text":"What''s New in GPT-5"}]},{"type":"paragraph","children":[{"text":"The model introduces several groundbreaking features that set it apart from its predecessors:"}]},{"type":"list","listType":"bullet","children":[{"children":[{"text":"Native vision, audio, and video understanding in a single model"}]},{"children":[{"text":"Advanced reasoning with chain-of-thought by default"}]},{"children":[{"text":"Real-time web access and tool use"}]},{"children":[{"text":"Significantly improved coding and mathematical abilities"}]}]},{"type":"paragraph","children":[{"text":"OpenAI CEO Sam Altman stated that GPT-5 represents \"the beginning of truly useful AI assistants that can help with complex real-world tasks.\""}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'breaking',NULL,'openai-launches-gpt-5-new-era-ai-intelligence',1,NULL,'2025-12-20T19:32:28.057Z','2025-12-20T19:32:28.056Z');
INSERT INTO "posts" VALUES(2,'Midjourney V7 Introduces Revolutionary 3D Generation','The latest Midjourney update brings native 3D model generation, allowing creators to turn prompts directly into usable 3D assets.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Midjourney has announced version 7 of their AI image generator, now featuring groundbreaking 3D model generation capabilities. This update transforms the platform from a 2D image generator into a comprehensive creative tool."}]},{"type":"paragraph","children":[{"text":"Creators can now generate fully textured 3D models directly from text prompts, export them in standard formats like OBJ and FBX, and use them in professional 3D software like Blender and Unity."}]},{"type":"heading","tag":2,"children":[{"text":"Game-Changing Features"}]},{"type":"paragraph","children":[{"text":"The 3D generation feature maintains Midjourney''s signature artistic quality while adding entirely new dimensions to creative workflows. Early users report exceptional detail in organic shapes and architectural elements."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'new-release',NULL,'midjourney-v7-introduces-revolutionary-3d-generation',1,NULL,'2025-12-20T19:32:28.624Z','2025-12-20T19:32:28.624Z');
INSERT INTO "posts" VALUES(3,'Suno AI Hits 50 Million Users as Music Generation Goes Mainstream','The AI music platform celebrates a major milestone as professional musicians increasingly adopt AI-assisted composition tools.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Suno AI has reached 50 million users, marking a pivotal moment for AI-generated music. The platform, which allows anyone to create full songs from text prompts, has gained acceptance from both amateur creators and professional musicians."}]},{"type":"paragraph","children":[{"text":"Major record labels are now exploring partnerships with Suno to use AI for demo creation and songwriting assistance. This shift represents a dramatic change from the initial skepticism the industry showed toward AI music."}]},{"type":"heading","tag":2,"children":[{"text":"The Democratization of Music"}]},{"type":"paragraph","children":[{"text":"CEO Mikey Shulman emphasized that Suno''s mission is to democratize music creation: \"Everyone has music inside them. We''re just giving them the tools to express it.\""}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'trending',NULL,'suno-ai-hits-50-million-users-music-generation-mainstream',2,NULL,'2025-12-20T19:32:29.170Z','2025-12-20T19:32:29.170Z');
INSERT INTO "posts" VALUES(4,'Anthropic''s Claude 4 Achieves New Benchmarks in Coding and Research','Claude 4 sets new records on academic benchmarks while introducing revolutionary agent capabilities for autonomous task completion.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Anthropic has released Claude 4, their most capable AI model to date, achieving state-of-the-art results on coding, mathematics, and scientific reasoning benchmarks. The model introduces new agent capabilities that allow it to autonomously complete complex multi-step tasks."}]},{"type":"paragraph","children":[{"text":"Key highlights include a 2 million token context window, native computer use capabilities, and significant improvements in following nuanced instructions. The model demonstrates near-human performance on professional-level exams."}]},{"type":"heading","tag":2,"children":[{"text":"Safety First Approach"}]},{"type":"paragraph","children":[{"text":"True to Anthropic''s mission, Claude 4 includes enhanced safety measures including Constitutional AI 2.0, better refusal of harmful requests, and improved truthfulness. The company continues to lead in responsible AI development."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'breaking',NULL,'anthropic-claude-4-achieves-new-benchmarks-coding-research',1,NULL,'2025-12-20T19:32:29.990Z','2025-12-20T19:32:29.990Z');
INSERT INTO "posts" VALUES(5,'Runway Gen-4 Revolutionizes Video Production with Real-Time AI','The new Runway model enables professional-quality video generation at unprecedented speeds, transforming filmmaking workflows.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Runway has unveiled Gen-4, their most advanced video generation model, capable of producing cinema-quality footage in near real-time. The update represents a major leap in AI video capabilities, making previously impossible shots achievable for independent creators."}]},{"type":"paragraph","children":[{"text":"The model introduces precise camera control, consistent character generation, and 8K output resolution. Hollywood studios are already integrating Gen-4 into their visual effects pipelines."}]},{"type":"heading","tag":2,"children":[{"text":"Democratizing Cinema"}]},{"type":"paragraph","children":[{"text":"Independent filmmakers report that Gen-4 enables them to achieve visual quality that previously required million-dollar budgets. The barrier between imagination and creation continues to dissolve."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'new-release',NULL,'runway-gen-4-revolutionizes-video-production-real-time-ai',1,NULL,'2025-12-20T19:32:30.559Z','2025-12-20T19:32:30.559Z');
INSERT INTO "posts" VALUES(6,'How AI Art Tools Are Reshaping the Creative Industry in 2025','A deep dive into how professional artists, designers, and studios are integrating AI tools into their creative workflows.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"The creative industry has undergone a fundamental transformation in 2025, with AI tools becoming integral to professional workflows across art, design, music, and film. Rather than replacing human creativity, these tools are amplifying it in unexpected ways."}]},{"type":"paragraph","children":[{"text":"Studios report significant productivity gains, with concept artists using AI to explore more ideas faster, musicians collaborating with AI co-composers, and filmmakers achieving previously impossible visual effects."}]},{"type":"heading","tag":2,"children":[{"text":"The New Creative Process"}]},{"type":"paragraph","children":[{"text":"Creative professionals describe a new paradigm where AI handles technical execution while humans focus on vision, curation, and emotional resonance. The most successful creators have learned to use AI as a creative partner rather than a replacement."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'analysis',NULL,'how-ai-art-tools-reshaping-creative-industry-2025',2,NULL,'2025-12-20T19:32:31.175Z','2025-12-20T19:32:31.175Z');
INSERT INTO "posts" VALUES(7,'Stable Diffusion 4 Brings Local AI Image Generation to New Heights','The open-source image model now rivals closed alternatives while running on consumer hardware, empowering privacy-conscious creators.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Stability AI has released Stable Diffusion 4, their most advanced open-source image generation model. Running locally on consumer GPUs, it now matches or exceeds the quality of cloud-based alternatives while preserving user privacy."}]},{"type":"paragraph","children":[{"text":"The model introduces native video generation, 3D understanding, and unprecedented prompt following. The open-source community has already begun building innovative applications on top of the new architecture."}]},{"type":"heading","tag":2,"children":[{"text":"Open Source Momentum"}]},{"type":"paragraph","children":[{"text":"The release demonstrates that open-source AI development continues to advance rapidly. Enterprises are increasingly adopting local AI solutions for sensitive workflows where cloud processing poses privacy concerns."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'new-release',NULL,'stable-diffusion-4-brings-local-ai-image-generation-new-heights',1,NULL,'2025-12-20T19:32:31.681Z','2025-12-20T19:32:31.680Z');
INSERT INTO "posts" VALUES(8,'ElevenLabs Introduces Perfect Voice Cloning with Just 30 Seconds of Audio','The voice AI company pushes the boundaries of what''s possible with minimal training data while implementing robust consent systems.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"ElevenLabs has announced a breakthrough in voice cloning technology, achieving near-perfect voice replication with just 30 seconds of audio input. The advancement has significant implications for audiobook production, dubbing, and accessibility applications."}]},{"type":"paragraph","children":[{"text":"The company has simultaneously introduced comprehensive consent and verification systems to prevent misuse. All cloned voices require verified consent from the voice owner, addressing industry concerns about deepfakes."}]},{"type":"heading","tag":2,"children":[{"text":"Accessibility Impact"}]},{"type":"paragraph","children":[{"text":"Advocates for people with speech disabilities have praised the technology, which allows individuals who have lost their voice to disease to preserve and use synthetic versions of their natural voice."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'trending',NULL,'elevenlabs-introduces-perfect-voice-cloning-30-seconds-audio',1,NULL,'2025-12-20T19:32:32.264Z','2025-12-20T19:32:32.264Z');
INSERT INTO "posts" VALUES(9,'The Rise of AI Code Assistants: Cursor, Copilot, and the Future of Programming','Examining how AI coding tools are transforming software development and what it means for the future of the programming profession.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"AI code assistants have become indispensable tools for software developers. Cursor, GitHub Copilot, and similar tools are now used by millions of developers daily, fundamentally changing how code is written."}]},{"type":"paragraph","children":[{"text":"Studies show developers using AI assistants complete tasks 40-60% faster while maintaining code quality. Rather than replacing programmers, these tools are elevating what individual developers can accomplish."}]},{"type":"heading","tag":2,"children":[{"text":"The New Developer Experience"}]},{"type":"paragraph","children":[{"text":"Junior developers report learning faster with AI assistance, while senior developers appreciate off-loading boilerplate code to focus on architecture and complex problem-solving. The skill of prompt engineering has become as important as traditional coding skills."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'analysis',NULL,'rise-ai-code-assistants-cursor-copilot-future-programming',2,NULL,'2025-12-20T19:32:32.810Z','2025-12-20T19:32:32.810Z');
INSERT INTO "posts" VALUES(10,'Google Introduces Gemini Ultra 2: Native Multimodal Reasoning at Scale','Google''s latest AI model sets new standards for understanding and generating across text, images, video, and audio simultaneously.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Google has unveiled Gemini Ultra 2, a next-generation AI model with seamless multimodal capabilities. The model can reason across text, images, audio, and video in a single unified architecture, enabling new categories of AI applications."}]},{"type":"paragraph","children":[{"text":"Early demonstrations show the model analyzing complex documents with embedded images, understanding video content in real-time, and generating coordinated multimodal outputs. Integration with Google''s ecosystem brings these capabilities to billions of users."}]},{"type":"heading","tag":2,"children":[{"text":"Enterprise Applications"}]},{"type":"paragraph","children":[{"text":"Enterprise customers gain access to advanced document understanding, meeting summarization with visual context, and creative tools that combine multiple modalities. The model represents Google''s most significant AI release since the original Gemini launch."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'breaking',NULL,'google-introduces-gemini-ultra-2-native-multimodal-reasoning',1,NULL,'2025-12-20T19:32:33.304Z','2025-12-20T19:32:33.304Z');
INSERT INTO "posts" VALUES(11,'Adobe Firefly 3 Seamlessly Integrates AI into Professional Creative Suite','The latest Firefly update embeds powerful generative AI throughout Photoshop, Illustrator, and Premiere Pro for non-destructive creation.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Adobe has released Firefly 3, deeply integrating AI generation throughout their Creative Cloud applications. The update brings context-aware generation to Photoshop, vector AI to Illustrator, and intelligent editing to Premiere Pro."}]},{"type":"paragraph","children":[{"text":"Key features include non-destructive AI edits that can be refined or removed, style matching that learns from existing brand assets, and collaborative AI that adapts to team preferences over time."}]},{"type":"heading","tag":2,"children":[{"text":"Commercial Safety"}]},{"type":"paragraph","children":[{"text":"Adobe emphasizes Firefly''s commercially safe training data, addressing enterprise concerns about copyright. All generated content comes with IP indemnification, making it suitable for commercial projects at any scale."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'new-release',NULL,'adobe-firefly-3-seamlessly-integrates-ai-professional-creative-suite',1,NULL,'2025-12-20T19:32:33.865Z','2025-12-20T19:32:33.865Z');
INSERT INTO "posts" VALUES(12,'AI Ethics: Industry Leaders Agree on New Standards for Responsible Development','Major AI companies commit to shared safety protocols and transparency measures in a landmark industry agreement.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Leading AI companies including OpenAI, Anthropic, Google, and Meta have signed a comprehensive agreement establishing shared standards for responsible AI development. The framework addresses safety testing, transparency, and societal impact assessment."}]},{"type":"paragraph","children":[{"text":"Key commitments include pre-deployment safety evaluations, watermarking of AI-generated content, and sharing of safety research. The agreement marks the first time major competitors have aligned on concrete ethical standards."}]},{"type":"heading","tag":2,"children":[{"text":"Industry Self-Regulation"}]},{"type":"paragraph","children":[{"text":"Observers note this proactive approach may influence upcoming government regulations. By establishing their own standards, AI companies demonstrate a commitment to responsible development ahead of legislative requirements."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'policy',NULL,'ai-ethics-industry-leaders-agree-new-standards-responsible-development',2,NULL,'2025-12-20T19:32:34.442Z','2025-12-20T19:32:34.441Z');
INSERT INTO "posts" VALUES(13,'Tutorial: Building Your First AI Art Portfolio in 2025','A step-by-step guide to curating, presenting, and monetizing AI-generated artwork as a professional creator.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Creating a professional AI art portfolio requires more than just generating images. This guide covers the complete journey from developing your unique style to presenting work that attracts clients and opportunities."}]},{"type":"heading","tag":2,"children":[{"text":"Step 1: Find Your Voice"}]},{"type":"paragraph","children":[{"text":"The most successful AI artists develop a recognizable style. Experiment with different tools—Midjourney for artistic imagery, DALL-E for conceptual work, Stable Diffusion for fine control—until you find your unique aesthetic."}]},{"type":"heading","tag":2,"children":[{"text":"Step 2: Curate Ruthlessly"}]},{"type":"paragraph","children":[{"text":"Quality over quantity. Select only your best work that demonstrates consistency and vision. A focused portfolio of 20 excellent pieces outperforms 200 mediocre ones."}]},{"type":"heading","tag":2,"children":[{"text":"Step 3: Present Professionally"}]},{"type":"paragraph","children":[{"text":"Create a clean, focused website. Include process documentation showing your creative decisions. Transparency about AI use builds trust with potential clients."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'tutorial',NULL,'tutorial-building-first-ai-art-portfolio-2025',3,NULL,'2025-12-20T19:32:35.009Z','2025-12-20T19:32:35.009Z');
INSERT INTO "posts" VALUES(14,'Pika Labs 2.0 Brings Hollywood-Quality Video Generation to Everyone','The startup''s new model produces cinematic quality video with advanced camera controls and seamless scene transitions.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Pika Labs has released version 2.0 of their AI video platform, introducing capabilities that rival professional production tools. The update features advanced camera movements, consistent character generation, and intelligent scene transitions."}]},{"type":"paragraph","children":[{"text":"The new model can generate up to 2 minutes of continuous, coherent video—a significant leap from previous 10-second limitations. Users praise the natural motion and cinematic quality of the output."}]},{"type":"heading","tag":2,"children":[{"text":"Creator Economy Impact"}]},{"type":"paragraph","children":[{"text":"Content creators on YouTube and TikTok are rapidly adopting Pika for B-roll, visual effects, and animated content. The democratization of professional video production continues to accelerate."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'new-release',NULL,'pika-labs-2-0-hollywood-quality-video-generation-everyone',1,NULL,'2025-12-20T19:32:35.660Z','2025-12-20T19:32:35.660Z');
INSERT INTO "posts" VALUES(15,'The Complete Guide to Prompt Engineering in 2025','Master the art and science of writing effective prompts for AI image generators, language models, and creative tools.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Prompt engineering has evolved from a curiosity to a critical skill for AI creators. This comprehensive guide covers techniques for extracting the best results from today''s leading AI tools."}]},{"type":"heading","tag":2,"children":[{"text":"Understanding Model Behavior"}]},{"type":"paragraph","children":[{"text":"Different AI models respond to different prompting strategies. Midjourney favors artistic and emotional language, while DALL-E excels with literal descriptions. Understanding these preferences is key to consistent results."}]},{"type":"heading","tag":2,"children":[{"text":"Structure Your Prompts"}]},{"type":"paragraph","children":[{"text":"Effective prompts typically include: subject, style, mood, technical specifications, and negative prompts. Order matters—put your most important elements first."}]},{"type":"heading","tag":2,"children":[{"text":"Iterate and Refine"}]},{"type":"paragraph","children":[{"text":"The best prompts emerge through iteration. Start broad, identify what works, and progressively refine. Keep a prompt library of successful formulations for future reference."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'tutorial',NULL,'complete-guide-prompt-engineering-2025',3,NULL,'2025-12-20T19:32:36.258Z','2025-12-20T19:32:36.258Z');
INSERT INTO "posts" VALUES(16,'How Udio Is Changing the Music Industry Forever','Udio''s AI music platform has sparked a revolution in how music is created, distributed, and consumed worldwide.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"text":"Udio has emerged as a transformative force in the music industry, enabling anyone to create professional-quality songs from text descriptions. The platform''s impact extends far beyond hobbyist creation—it''s reshaping the entire music value chain."}]},{"type":"paragraph","children":[{"text":"Independent artists use Udio for rapid prototyping, commercial producers for demo creation, and brands for custom audio content. The barrier between musical imagination and realization has effectively dissolved."}]},{"type":"heading","tag":2,"children":[{"text":"Industry Adaptation"}]},{"type":"paragraph","children":[{"text":"Major labels are adapting rather than resisting. Partnerships between Udio and established music companies suggest a future where AI and human creativity complement each other in new ways."}]}],"direction":"ltr","format":"","indent":0,"version":1}}',NULL,'analysis',NULL,'how-udio-is-changing-music-industry-forever',2,NULL,'2025-12-20T19:32:36.800Z','2025-12-20T19:32:36.800Z');
CREATE TABLE `examples_tools_used` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`name` text NOT NULL,
  	`purpose` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples_step_by_step` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`step_number` numeric NOT NULL,
  	`title` text NOT NULL,
  	`description` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples_prompts_used` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`tool` text NOT NULL,
  	`prompt` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples_key_outcomes` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`outcome` text NOT NULL,
  	`metric` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples_download_files` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`name` text NOT NULL,
  	`file_id` integer,
  	`description` text,
  	FOREIGN KEY (`file_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples_helpful_links` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`url` text NOT NULL,
  	`description` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `examples`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `examples` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`tagline` text,
  	`content` text,
  	`difficulty_level` text,
  	`time_to_create` text,
  	`cost_range` text,
  	`creator_info_name` text,
  	`creator_info_title` text,
  	`creator_info_website` text,
  	`before_after_before_id` integer,
  	`before_after_after_id` integer,
  	`lessons_learned` text,
  	`slug` text NOT NULL,
  	`creation_type_id` integer,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`before_after_before_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`before_after_after_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`creation_type_id`) REFERENCES `creation_types`(`id`) ON UPDATE no action ON DELETE set null
  );
CREATE TABLE `tool_categories` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`description` text,
  	`icon` text,
  	`color` text,
  	`order` numeric DEFAULT 0,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "tool_categories" VALUES(2,'Writing','writing','AI-powered text generation and editing',NULL,'#1a73e8',0,'2025-12-20T01:40:48.001Z','2025-12-20T01:40:48.000Z');
INSERT INTO "tool_categories" VALUES(4,'Building','building','Develop AI-powered applications',NULL,'#fbbc04',0,'2025-12-20T01:40:48.759Z','2025-12-20T01:40:48.759Z');
INSERT INTO "tool_categories" VALUES(5,'Video','video','AI video generation and editing',NULL,'#9c27b0',0,'2025-12-20T01:40:49.109Z','2025-12-20T01:40:49.109Z');
INSERT INTO "tool_categories" VALUES(6,'Audio','audio','AI music and voice generation',NULL,'#ff5722',0,'2025-12-20T01:40:49.607Z','2025-12-20T01:40:49.606Z');
INSERT INTO "tool_categories" VALUES(8,'3D','3d','AI 3D modeling and generation',NULL,'#673ab7',0,'2025-12-20T01:40:50.364Z','2025-12-20T01:40:50.364Z');
INSERT INTO "tool_categories" VALUES(9,'Image','image','Generate art, images, and visual content',NULL,'#e7131a',0,'2025-12-23T01:53:02.409Z','2025-12-23T01:53:02.408Z');
INSERT INTO "tool_categories" VALUES(10,'Automation','automation','Workflow and task automation tools',NULL,'#10b981',0,'2025-12-23T01:53:03.232Z','2025-12-23T01:53:03.232Z');
INSERT INTO "tool_categories" VALUES(11,'Chatbots','chatbots','Conversational AI and agents',NULL,'#6366f1',0,'2025-12-23T01:53:03.661Z','2025-12-23T01:53:03.661Z');
INSERT INTO "tool_categories" VALUES(12,'Marketing','marketing','SEO, ads, and content strategy',NULL,'#f59e0b',0,'2025-12-23T01:53:04.082Z','2025-12-23T01:53:04.082Z');
INSERT INTO "tool_categories" VALUES(13,'Data','data','Analytics and data visualization',NULL,'#06b6d4',0,'2025-12-23T01:53:04.447Z','2025-12-23T01:53:04.447Z');
CREATE TABLE `creation_types` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`icon` text,
  	`tagline` text,
  	`description` text,
  	`color` text,
  	`gradient_color` text,
  	`featured_image_id` integer,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL, `stats_tool_count` numeric, `stats_project_count` numeric, `order` numeric DEFAULT 0,
  	FOREIGN KEY (`featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "creation_types" VALUES(1,'Image','image',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:26.466Z','2025-12-20T01:42:26.465Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(2,'Video','video',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:26.837Z','2025-12-20T01:42:26.836Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(3,'Audio','audio',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:27.277Z','2025-12-20T01:42:27.277Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(4,'Text','text',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:27.684Z','2025-12-20T01:42:27.684Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(5,'Code','code',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:28.049Z','2025-12-20T01:42:28.049Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(6,'3D','3d',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:28.416Z','2025-12-20T01:42:28.416Z',NULL,NULL,0);
INSERT INTO "creation_types" VALUES(7,'Design','design',NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:28.828Z','2025-12-20T01:42:28.828Z',NULL,NULL,0);
CREATE TABLE IF NOT EXISTS "builder_specialties" (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`description` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "builder_specialties" VALUES(1,'AI Artist','ai-artist',NULL,'2025-12-20T01:40:51.947Z','2025-12-20T01:40:51.947Z');
INSERT INTO "builder_specialties" VALUES(2,'Prompt Engineer','prompt-engineer',NULL,'2025-12-20T01:40:52.288Z','2025-12-20T01:40:52.288Z');
INSERT INTO "builder_specialties" VALUES(3,'AI Developer','ai-developer',NULL,'2025-12-20T01:40:52.636Z','2025-12-20T01:40:52.636Z');
INSERT INTO "builder_specialties" VALUES(4,'AI Musician','ai-musician',NULL,'2025-12-20T01:40:53.009Z','2025-12-20T01:40:53.009Z');
INSERT INTO "builder_specialties" VALUES(5,'AI Writer','ai-writer',NULL,'2025-12-20T01:40:53.429Z','2025-12-20T01:40:53.429Z');
INSERT INTO "builder_specialties" VALUES(6,'AI Filmmaker','ai-filmmaker',NULL,'2025-12-20T01:40:53.786Z','2025-12-20T01:40:53.786Z');
INSERT INTO "builder_specialties" VALUES(7,'AI Art','ai-art','Generative art and visual creation using AI','2025-12-20T19:32:56.506Z','2025-12-20T19:32:56.505Z');
INSERT INTO "builder_specialties" VALUES(8,'Music Production','music-production','AI-powered music and audio creation','2025-12-20T19:32:56.945Z','2025-12-20T19:32:56.945Z');
INSERT INTO "builder_specialties" VALUES(9,'Video Creation','video-creation','AI video generation and editing','2025-12-20T19:32:57.460Z','2025-12-20T19:32:57.460Z');
INSERT INTO "builder_specialties" VALUES(10,'3D Design','3d-design','AI-assisted 3D modeling and rendering','2025-12-20T19:32:57.888Z','2025-12-20T19:32:57.888Z');
INSERT INTO "builder_specialties" VALUES(11,'Writing & Content','writing-content','AI writing, copywriting, and content creation','2025-12-20T19:32:58.306Z','2025-12-20T19:32:58.306Z');
INSERT INTO "builder_specialties" VALUES(12,'Game Development','game-development','AI tools for game design and development','2025-12-20T19:32:58.705Z','2025-12-20T19:32:58.705Z');
INSERT INTO "builder_specialties" VALUES(13,'Photography','photography','AI-enhanced photography and editing','2025-12-20T19:32:59.117Z','2025-12-20T19:32:59.117Z');
INSERT INTO "builder_specialties" VALUES(14,'Animation','animation','AI-powered animation and motion graphics','2025-12-20T19:32:59.798Z','2025-12-20T19:32:59.798Z');
CREATE TABLE `community_types` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`description` text,
  	`icon` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "community_types" VALUES(1,'Art','art',NULL,NULL,'2025-12-20T01:40:54.144Z','2025-12-20T01:40:54.144Z');
INSERT INTO "community_types" VALUES(2,'Music','music',NULL,NULL,'2025-12-20T01:40:54.510Z','2025-12-20T01:40:54.510Z');
INSERT INTO "community_types" VALUES(3,'Code','code',NULL,NULL,'2025-12-20T01:40:54.866Z','2025-12-20T01:40:54.866Z');
INSERT INTO "community_types" VALUES(4,'Writing','writing',NULL,NULL,'2025-12-20T01:40:55.223Z','2025-12-20T01:40:55.223Z');
INSERT INTO "community_types" VALUES(5,'Video','video',NULL,NULL,'2025-12-20T01:40:55.542Z','2025-12-20T01:40:55.542Z');
INSERT INTO "community_types" VALUES(6,'Design','design',NULL,NULL,'2025-12-20T01:40:55.862Z','2025-12-20T01:40:55.862Z');
CREATE TABLE `news_categories` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`color` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "news_categories" VALUES(1,'Product Launch','product-launch',NULL,'2025-12-20T01:40:56.249Z','2025-12-20T01:40:56.249Z');
INSERT INTO "news_categories" VALUES(2,'Industry News','industry-news',NULL,'2025-12-20T01:40:56.567Z','2025-12-20T01:40:56.567Z');
INSERT INTO "news_categories" VALUES(3,'Tutorial','tutorial',NULL,'2025-12-20T01:40:56.889Z','2025-12-20T01:40:56.889Z');
INSERT INTO "news_categories" VALUES(4,'Opinion','opinion',NULL,'2025-12-20T01:40:57.281Z','2025-12-20T01:40:57.281Z');
INSERT INTO "news_categories" VALUES(5,'Research','research',NULL,'2025-12-20T01:40:57.630Z','2025-12-20T01:40:57.630Z');
CREATE TABLE `user_situations_pain_points` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`severity` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `user_situations`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `user_situations_goals` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`priority` text,
  	FOREIGN KEY (`_parent_id`) REFERENCES `user_situations`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `user_situations` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text NOT NULL,
  	`icon` text,
  	`tagline` text,
  	`description` text,
  	`color` text,
  	`accent_color` text,
  	`avatar_id` integer,
  	`experience_level` text,
  	`budget_range` text,
  	`time_availability` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL, `order` numeric DEFAULT 0,
  	FOREIGN KEY (`avatar_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "user_situations" VALUES(1,'Creator','creator',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:32.419Z','2025-12-20T01:42:32.418Z',0);
INSERT INTO "user_situations" VALUES(2,'Developer','developer',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:32.909Z','2025-12-20T01:42:32.909Z',0);
INSERT INTO "user_situations" VALUES(3,'Business','business',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:33.380Z','2025-12-20T01:42:33.380Z',0);
INSERT INTO "user_situations" VALUES(4,'Student','student',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:33.803Z','2025-12-20T01:42:33.802Z',0);
INSERT INTO "user_situations" VALUES(5,'Hobbyist','hobbyist',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20T01:42:34.213Z','2025-12-20T01:42:34.213Z',0);
CREATE TABLE `payload_kv` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text NOT NULL,
  	`data` text NOT NULL
  );
ANALYZE sqlite_schema;
INSERT INTO "sqlite_stat1" VALUES('payload_migrations','payload_migrations_created_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('payload_migrations','payload_migrations_updated_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('_cf_KV','_cf_KV','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_users_id_idx','6 6');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_path_idx','6 6');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_parent_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_order_idx','6 6');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_created_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_updated_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_key_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_email_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','users_sessions_parent_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','users_sessions_order_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','sqlite_autoindex_users_sessions_1','1 1');
INSERT INTO "sqlite_stat1" VALUES('news_categories','news_categories_created_at_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('news_categories','news_categories_updated_at_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('news_categories','news_categories_slug_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('tools_key_features','tools_key_features_parent_id_idx','3 3');
INSERT INTO "sqlite_stat1" VALUES('tools_key_features','tools_key_features_order_idx','3 1');
INSERT INTO "sqlite_stat1" VALUES('tools_key_features','sqlite_autoindex_tools_key_features_1','3 1');
INSERT INTO "sqlite_stat1" VALUES('tools','tools_created_at_idx','52 1');
INSERT INTO "sqlite_stat1" VALUES('tools','tools_updated_at_idx','52 1');
INSERT INTO "sqlite_stat1" VALUES('tools','tools_tool_category_idx','52 7');
INSERT INTO "sqlite_stat1" VALUES('tools','tools_slug_idx','52 1');
INSERT INTO "sqlite_stat1" VALUES('tools','tools_logo_idx','52 52');
INSERT INTO "sqlite_stat1" VALUES('community_types','community_types_created_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('community_types','community_types_updated_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('community_types','community_types_slug_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('creation_types','creation_types_created_at_idx','7 1');
INSERT INTO "sqlite_stat1" VALUES('creation_types','creation_types_updated_at_idx','7 1');
INSERT INTO "sqlite_stat1" VALUES('creation_types','creation_types_featured_image_idx','7 7');
INSERT INTO "sqlite_stat1" VALUES('creation_types','creation_types_slug_idx','7 1');
INSERT INTO "sqlite_stat1" VALUES('user_situations','user_situations_created_at_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('user_situations','user_situations_updated_at_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('user_situations','user_situations_avatar_idx','5 5');
INSERT INTO "sqlite_stat1" VALUES('user_situations','user_situations_slug_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('maker_specialties','maker_specialties_created_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('maker_specialties','maker_specialties_updated_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('maker_specialties','maker_specialties_slug_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('tool_categories','tool_categories_created_at_idx','8 1');
INSERT INTO "sqlite_stat1" VALUES('tool_categories','tool_categories_updated_at_idx','8 1');
INSERT INTO "sqlite_stat1" VALUES('tool_categories','tool_categories_slug_idx','8 1');
INSERT INTO "sqlite_stat1" VALUES('builder_specialties','maker_specialties_created_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('builder_specialties','maker_specialties_updated_at_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('builder_specialties','maker_specialties_slug_idx','6 1');
INSERT INTO "sqlite_stat1" VALUES('builders','makers_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('builders','makers_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('builders','makers_slug_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('builders','makers_background_image_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('builders','makers_profile_image_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_created_at_idx','16 1');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_updated_at_idx','16 1');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_author_idx','16 16');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_news_category_idx','16 6');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_slug_idx','16 1');
INSERT INTO "sqlite_stat1" VALUES('posts','posts_featured_image_idx','16 16');
INSERT INTO "sqlite_stat1" VALUES('builders_rels','builders_rels_builder_specialties_id_idx','32 4');
INSERT INTO "sqlite_stat1" VALUES('builders_rels','builders_rels_tools_id_idx','32 4');
INSERT INTO "sqlite_stat1" VALUES('builders_rels','builders_rels_path_idx','32 16');
INSERT INTO "sqlite_stat1" VALUES('builders_rels','builders_rels_parent_idx','32 4');
INSERT INTO "sqlite_stat1" VALUES('builders_rels','builders_rels_order_idx','32 11');
INSERT INTO "sqlite_stat1" VALUES('builders_social_links','makers_social_links_parent_id_idx','17 2');
INSERT INTO "sqlite_stat1" VALUES('builders_social_links','makers_social_links_order_idx','17 9');
INSERT INTO "sqlite_stat1" VALUES('builders_social_links','sqlite_autoindex_builders_social_links_1','17 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_next_steps','tutorials_next_steps_parent_id_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('tutorials_next_steps','tutorials_next_steps_order_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_next_steps','sqlite_autoindex_tutorials_next_steps_1','4 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_prerequisites','tutorials_prerequisites_parent_id_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('tutorials_prerequisites','tutorials_prerequisites_order_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_prerequisites','sqlite_autoindex_tutorials_prerequisites_1','4 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_steps','tutorials_steps_parent_id_idx','5 5');
INSERT INTO "sqlite_stat1" VALUES('tutorials_steps','tutorials_steps_order_idx','5 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_steps','sqlite_autoindex_tutorials_steps_1','5 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials','tutorials_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials','tutorials_slug_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_tool_stack','tutorials_tool_stack_parent_id_idx','3 3');
INSERT INTO "sqlite_stat1" VALUES('tutorials_tool_stack','tutorials_tool_stack_order_idx','3 1');
INSERT INTO "sqlite_stat1" VALUES('tutorials_tool_stack','sqlite_autoindex_tutorials_tool_stack_1','3 1');
INSERT INTO "sqlite_stat1" VALUES('tools_faqs','tools_faqs_parent_id_idx','71 4');
INSERT INTO "sqlite_stat1" VALUES('tools_faqs','tools_faqs_order_idx','71 15');
INSERT INTO "sqlite_stat1" VALUES('tools_not_ideal_for','tools_not_ideal_for_parent_id_idx','22 2');
INSERT INTO "sqlite_stat1" VALUES('tools_not_ideal_for','tools_not_ideal_for_order_idx','22 11');
INSERT INTO "sqlite_stat1" VALUES('tools_best_for','tools_best_for_parent_id_idx','58 4');
INSERT INTO "sqlite_stat1" VALUES('tools_best_for','tools_best_for_order_idx','58 15');
INSERT INTO "sqlite_stat1" VALUES('tools_cons','tools_cons_parent_id_idx','48 3');
INSERT INTO "sqlite_stat1" VALUES('tools_cons','tools_cons_order_idx','48 16');
INSERT INTO "sqlite_stat1" VALUES('tools_pricing_tiers_features','tools_pricing_tiers_features_parent_id_idx','171 4');
INSERT INTO "sqlite_stat1" VALUES('tools_pricing_tiers_features','tools_pricing_tiers_features_order_idx','171 29');
INSERT INTO "sqlite_stat1" VALUES('media','media_filename_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('media','media_created_at_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('media','media_updated_at_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('tools_pros','tools_pros_parent_id_idx','77 5');
INSERT INTO "sqlite_stat1" VALUES('tools_pros','tools_pros_order_idx','77 16');
INSERT INTO "sqlite_stat1" VALUES('tools_pricing_tiers','tools_pricing_tiers_parent_id_idx','56 4');
INSERT INTO "sqlite_stat1" VALUES('tools_pricing_tiers','tools_pricing_tiers_order_idx','56 12');
INSERT INTO "sqlite_stat1" VALUES('tools_secondary_keywords','tools_secondary_keywords_parent_id_idx','64 4');
INSERT INTO "sqlite_stat1" VALUES('tools_secondary_keywords','tools_secondary_keywords_order_idx','64 16');
CREATE TABLE `creation_types_example_prompts` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`prompt` text NOT NULL,
  	`featured` integer DEFAULT false,
  	FOREIGN KEY (`_parent_id`) REFERENCES `creation_types`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE IF NOT EXISTS "builders_rels" (
    `id` integer PRIMARY KEY NOT NULL,
    `order` integer,
    `parent_id` integer NOT NULL,
    `path` text NOT NULL,
    `tools_id` integer,
    `builder_specialties_id` integer,
    FOREIGN KEY (`parent_id`) REFERENCES `builders`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`tools_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`builder_specialties_id`) REFERENCES `builder_specialties`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "builders_rels" VALUES(1,1,2,'toolsExpertise',45,NULL);
INSERT INTO "builders_rels" VALUES(2,2,2,'toolsExpertise',44,NULL);
INSERT INTO "builders_rels" VALUES(3,1,2,'specialties',NULL,8);
INSERT INTO "builders_rels" VALUES(4,1,3,'toolsExpertise',52,NULL);
INSERT INTO "builders_rels" VALUES(5,2,3,'toolsExpertise',43,NULL);
INSERT INTO "builders_rels" VALUES(6,1,3,'specialties',NULL,14);
INSERT INTO "builders_rels" VALUES(7,2,3,'specialties',NULL,9);
INSERT INTO "builders_rels" VALUES(8,1,4,'toolsExpertise',43,NULL);
INSERT INTO "builders_rels" VALUES(9,1,4,'specialties',NULL,12);
INSERT INTO "builders_rels" VALUES(10,2,4,'specialties',NULL,10);
INSERT INTO "builders_rels" VALUES(11,1,5,'toolsExpertise',51,NULL);
INSERT INTO "builders_rels" VALUES(12,2,5,'toolsExpertise',49,NULL);
INSERT INTO "builders_rels" VALUES(13,1,5,'specialties',NULL,11);
INSERT INTO "builders_rels" VALUES(14,1,6,'toolsExpertise',51,NULL);
INSERT INTO "builders_rels" VALUES(15,2,6,'toolsExpertise',50,NULL);
INSERT INTO "builders_rels" VALUES(16,3,6,'toolsExpertise',49,NULL);
INSERT INTO "builders_rels" VALUES(17,1,6,'specialties',NULL,13);
INSERT INTO "builders_rels" VALUES(18,2,6,'specialties',NULL,7);
INSERT INTO "builders_rels" VALUES(19,1,7,'toolsExpertise',45,NULL);
INSERT INTO "builders_rels" VALUES(20,1,7,'specialties',NULL,9);
INSERT INTO "builders_rels" VALUES(21,1,8,'toolsExpertise',45,NULL);
INSERT INTO "builders_rels" VALUES(22,2,8,'toolsExpertise',43,NULL);
INSERT INTO "builders_rels" VALUES(23,1,8,'specialties',NULL,10);
INSERT INTO "builders_rels" VALUES(24,1,9,'toolsExpertise',49,NULL);
INSERT INTO "builders_rels" VALUES(25,2,9,'toolsExpertise',48,NULL);
INSERT INTO "builders_rels" VALUES(26,3,9,'toolsExpertise',52,NULL);
INSERT INTO "builders_rels" VALUES(27,1,9,'specialties',NULL,8);
INSERT INTO "builders_rels" VALUES(28,1,10,'toolsExpertise',49,NULL);
INSERT INTO "builders_rels" VALUES(29,2,10,'toolsExpertise',48,NULL);
INSERT INTO "builders_rels" VALUES(30,3,10,'toolsExpertise',43,NULL);
INSERT INTO "builders_rels" VALUES(31,1,10,'specialties',NULL,14);
INSERT INTO "builders_rels" VALUES(32,2,10,'specialties',NULL,9);
CREATE TABLE `tutorials` (
    `id` integer PRIMARY KEY NOT NULL,
    `title` text NOT NULL,
    `subtitle` text,
    `excerpt` text,
    `introduction` text,
    `what_you_built` text,
    `slug` text NOT NULL,
    `status` text DEFAULT 'draft',
    `featured` integer DEFAULT false,
    `difficulty` text,
    `estimated_time` numeric,
    `category` text,
    `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  , featured_image_id integer REFERENCES media(id) ON DELETE SET NULL, notion_template_url text);
INSERT INTO "tutorials" VALUES(1,'Build Your AI Second Brain in 45 Minutes','Create a system that captures your ideas, processes them with AI, and organizes everything automatically.','Learn to build a personal knowledge system that uses AI to automatically summarize, tag, and organize your notes. Works with Notion or Airtable, Claude or ChatGPT, and Zapier or Make.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Ever had a brilliant idea in the shower, only to forget it 10 minutes later? Or saved a bunch of articles you''ll \"read later\" but never do? You''re not alone."}]},{"type":"paragraph","children":[{"type":"text","text":"In this tutorial, you''ll build a "},{"type":"text","text":"personal AI second brain","bold":true},{"type":"text","text":" — a system that captures your ideas, processes them with AI, and organizes them automatically so nothing falls through the cracks."}]},{"type":"heading","tag":"h3","children":[{"type":"text","text":"What You''ll Build"}]},{"type":"paragraph","children":[{"type":"text","text":"By the end of this tutorial, you''ll have a working automation that:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Watches your knowledge base for new entries"}]},{"type":"listitem","children":[{"type":"text","text":"Sends each entry to AI for processing"}]},{"type":"listitem","children":[{"type":"text","text":"Automatically generates a summary, relevant tags, and action items"}]},{"type":"listitem","children":[{"type":"text","text":"Updates your knowledge base with the AI output"}]}]},{"type":"paragraph","children":[{"type":"text","text":"The result: You add a messy note → AI turns it into an organized, actionable entry. No manual work required."}]}]}}','You now have a personal knowledge system that automatically processes every note you add. AI summarizes your thoughts, tags them for searchability, and extracts action items so nothing falls through the cracks. Add ideas freely — your second brain handles the organization.','ai-second-brain','published',0,'beginner',45,'workflow-automation','2025-12-21T02:47:08.610Z','2025-12-21T02:47:08.609Z',NULL,'https://observant-shop-39a.notion.site/2d0d26ceba458030b99cc591c063d73c?duplicate=true');
INSERT INTO "tutorials" VALUES(2,'Create Your First AI-Generated Video in 30 Minutes','Transform text prompts and images into stunning video content using the latest AI video tools.','Learn to create professional-looking AI videos from scratch. Compare Runway, Pika, and Kling AI to find your perfect workflow. No video editing experience required.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"AI video generation has exploded in 2024-2025. What used to require expensive software, years of training, and a Hollywood budget can now be done in minutes with a text prompt. The results? Increasingly indistinguishable from professional footage."}]},{"type":"paragraph","children":[{"type":"text","text":"In this tutorial, you''ll create your first "},{"type":"text","text":"AI-generated video","bold":true},{"type":"text","text":" — learning the fundamentals of prompting, understanding the different tools available, and walking away with a finished clip you can use."}]},{"type":"heading","tag":"h3","children":[{"type":"text","text":"What You''ll Create"}]},{"type":"paragraph","children":[{"type":"text","text":"By the end of this tutorial, you''ll have:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"A 5-10 second AI-generated video clip"}]},{"type":"listitem","children":[{"type":"text","text":"Understanding of how to write effective video prompts"}]},{"type":"listitem","children":[{"type":"text","text":"Knowledge of when to use text-to-video vs image-to-video"}]},{"type":"listitem","children":[{"type":"text","text":"A comparison of the top AI video tools in 2025"}]}]},{"type":"heading","tag":"h3","children":[{"type":"text","text":"The AI Video Landscape in 2025"}]},{"type":"paragraph","children":[{"type":"text","text":"Three major players dominate AI video generation right now:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Runway Gen-3:","bold":true},{"type":"text","text":" The industry standard with the most consistent quality. Best for cinematic shots."}]},{"type":"listitem","children":[{"type":"text","text":"Pika 2.5:","bold":true},{"type":"text","text":" Known for creative effects like \"Pikaffects\" and \"Scene Ingredients.\" Great for stylized content."}]},{"type":"listitem","children":[{"type":"text","text":"Kling AI:","bold":true},{"type":"text","text":" Offers longer videos (up to 2 minutes) and \"Elements\" for character consistency. Best value for longer clips."}]}]},{"type":"paragraph","children":[{"type":"text","text":"We''ll use Runway in this tutorial because it has the most beginner-friendly interface, but the prompting principles apply to all tools."}]}]}}','You''ve created your first AI-generated video and learned the fundamentals of video prompting. You understand the difference between text-to-video and image-to-video, when to use each, and how the major AI video tools compare. These skills apply across Runway, Pika, Kling, and future tools as the technology evolves.','ai-video-generation','published',0,'beginner',30,'content-creation','2025-12-23 02:41:49','2025-12-23 02:41:49',1,NULL);
INSERT INTO "tutorials" VALUES(3,'Build a Custom AI Chatbot for Your Website','Create an intelligent chatbot trained on your content that answers customer questions 24/7.','Learn to build and deploy a custom AI chatbot for your website. Train it on your documentation, FAQ, or knowledge base. No coding required — embed with a single line of code.','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Your customers have questions. You''re tired of answering the same ones repeatedly. And hiring 24/7 support isn''t in the budget. Sound familiar?"}]},{"type":"paragraph","children":[{"type":"text","text":"In this tutorial, you''ll build a "},{"type":"text","text":"custom AI chatbot","bold":true},{"type":"text","text":" trained on YOUR content — your website, documentation, or knowledge base. It answers questions accurately, sounds like your brand, and works while you sleep."}]},{"type":"heading","tag":"h3","children":[{"type":"text","text":"What You''ll Build"}]},{"type":"paragraph","children":[{"type":"text","text":"By the end of this tutorial, you''ll have:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"A working AI chatbot trained on your content"}]},{"type":"listitem","children":[{"type":"text","text":"Custom branding and personality matching your brand voice"}]},{"type":"listitem","children":[{"type":"text","text":"An embed code ready for your website"}]},{"type":"listitem","children":[{"type":"text","text":"Understanding of how to improve accuracy over time"}]}]},{"type":"heading","tag":"h3","children":[{"type":"text","text":"Chatbot Platform Comparison (2025)"}]},{"type":"paragraph","children":[{"type":"text","text":"Here are the top no-code chatbot builders:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Chatbase:","bold":true},{"type":"text","text":" Easiest to use. Free tier with 100 messages/month. Best for small websites and MVPs. $19/mo Hobby plan."}]},{"type":"listitem","children":[{"type":"text","text":"Voiceflow:","bold":true},{"type":"text","text":" More powerful with visual flow builder. Free tier with 100 credits. $60/mo Pro. Best for complex conversation flows."}]},{"type":"listitem","children":[{"type":"text","text":"Botpress:","bold":true},{"type":"text","text":" Developer-friendly with advanced features. Free tier with $5 credit. Best for teams wanting more control."}]},{"type":"listitem","children":[{"type":"text","text":"CustomGPT:","bold":true},{"type":"text","text":" Enterprise-focused with SOC-2 compliance. $99/mo minimum. Best for security-conscious businesses."}]}]},{"type":"paragraph","children":[{"type":"text","text":"We''ll use Chatbase in this tutorial because it has the fastest time-to-value and a generous free tier."}]}]}}','You now have a custom AI chatbot trained on your content, ready to help website visitors 24/7. It answers questions based on your documentation, maintains your brand voice, and frees you from answering the same questions repeatedly. Monitor conversations in the dashboard to identify gaps and improve over time.','ai-chatbot-website','published',1,'beginner',40,'ai-agents','2025-12-23 02:41:57','2025-12-23 02:41:57',3,NULL);
CREATE TABLE `tutorials_steps` (
    `_order` integer NOT NULL,
    `_parent_id` integer NOT NULL,
    `id` text PRIMARY KEY NOT NULL,
    `step_number` numeric NOT NULL,
    `title` text NOT NULL,
    `estimated_minutes` numeric,
    `content` text,
    `alternative_content` text,
    `alternative_label` text,
    `tip` text,
    `warning` text,
    FOREIGN KEY (`_parent_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tutorials_steps" VALUES(1,1,'69475fac2a4e93c7cf0b3a5b',1,'Set Up Your Knowledge Base',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"First, we need a place to store your notes. We''ll use Notion, but the same principles apply to Airtable or any database tool."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Create Your Database"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Open Notion and create a new page"}]},{"type":"listitem","children":[{"type":"text","text":"Add a full-page database (type /database and select \"Database - Full page\")"}]},{"type":"listitem","children":[{"type":"text","text":"Name it \"Second Brain\" or \"Knowledge Base\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add These Fields"}]},{"type":"paragraph","children":[{"type":"text","text":"Your database needs these properties:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Content","bold":true},{"type":"text","text":" (Text) — Your raw thought or note"}]},{"type":"listitem","children":[{"type":"text","text":"Source","bold":true},{"type":"text","text":" (Select) — Where it came from: \"Manual\", \"Email\", \"Voice\", \"Article\""}]},{"type":"listitem","children":[{"type":"text","text":"Summary","bold":true},{"type":"text","text":" (Text) — AI will fill this in"}]},{"type":"listitem","children":[{"type":"text","text":"Tags","bold":true},{"type":"text","text":" (Multi-select) — AI will add relevant tags"}]},{"type":"listitem","children":[{"type":"text","text":"Action Items","bold":true},{"type":"text","text":" (Text) — AI will extract any tasks"}]},{"type":"listitem","children":[{"type":"text","text":"Processed","bold":true},{"type":"text","text":" (Checkbox) — Tracks if AI has processed it"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Test It"}]},{"type":"paragraph","children":[{"type":"text","text":"Add one sample entry to test later. In the Content field, paste something like:"}]},{"type":"code","children":[{"type":"text","text":"Had a meeting with the design team about the new landing page. They want to use more illustrations. I need to find a freelance illustrator and get quotes by Friday. Also should update the brand guidelines document."}]},{"type":"paragraph","children":[{"type":"text","text":"Leave the Summary, Tags, Action Items, and Processed fields empty — AI will fill those in."}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"If you prefer Airtable:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Create a new base called \"Second Brain\""}]},{"type":"listitem","children":[{"type":"text","text":"Add a table with the same fields as above"}]},{"type":"listitem","children":[{"type":"text","text":"Use \"Single line text\" for Content, Summary, and Action Items"}]},{"type":"listitem","children":[{"type":"text","text":"Use \"Single select\" for Source and \"Multiple select\" for Tags"}]},{"type":"listitem","children":[{"type":"text","text":"Use \"Checkbox\" for Processed"}]}]},{"type":"paragraph","children":[{"type":"text","text":"The Zapier setup in the next steps works identically with Airtable."}]}]}}','Using Airtable Instead','Create a "Quick Add" template in Notion with Source pre-filled as "Manual" so you can capture ideas faster.',NULL);
INSERT INTO "tutorials_steps" VALUES(2,1,'69475fac2a4e93c7cf0b3a5c',2,'Connect Your Automation Tool',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Now we''ll set up Zapier to watch your Notion database and trigger the AI processing."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Create Your Zap"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to zapier.com and log in (or create a free account)"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Create Zap\" or \"Make a Zap\""}]},{"type":"listitem","children":[{"type":"text","text":"Search for \"Notion\" as your trigger app"}]},{"type":"listitem","children":[{"type":"text","text":"Select \"New Data Source Item\" as the trigger event"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Connect Notion"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Click \"Sign in to Notion\""}]},{"type":"listitem","children":[{"type":"text","text":"In the popup, select your workspace"}]},{"type":"listitem","children":[{"type":"text","text":"IMPORTANT: Click \"Select pages\" and choose your Second Brain database"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Allow access\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Configure the Trigger"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Select your \"Second Brain\" database"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Test trigger\""}]},{"type":"listitem","children":[{"type":"text","text":"You should see your test entry from Step 1"}]}]},{"type":"paragraph","children":[{"type":"text","text":"If the test succeeds, you''re ready to add the AI step!"}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"If you prefer Make (formerly Integromat):"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Create a new scenario"}]},{"type":"listitem","children":[{"type":"text","text":"Add Notion module: \"Watch Database Items\""}]},{"type":"listitem","children":[{"type":"text","text":"Connect your Notion account and select your database"}]},{"type":"listitem","children":[{"type":"text","text":"Set it to watch for new items"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Make''s visual builder works similarly to Zapier, just with a drag-and-drop interface."}]}]}}','Using Make Instead',NULL,'Make sure you grant Zapier access specifically to your Second Brain database. If you skip this, the trigger won''t find your data.');
INSERT INTO "tutorials_steps" VALUES(3,1,'69475fac2a4e93c7cf0b3a5d',3,'Add AI Processing',15,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"This is where the magic happens. We''ll connect Claude to analyze your notes and generate structured output."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Set Up Your Anthropic Account"}]},{"type":"paragraph","children":[{"type":"text","text":"Before connecting to Zapier, you need API access:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to console.anthropic.com and sign in (or create an account)"}]},{"type":"listitem","children":[{"type":"text","text":"New accounts start on the \"Evaluation\" plan — go to Settings → Plans and select \"Build\""}]},{"type":"listitem","children":[{"type":"text","text":"Add credits ($5 minimum). Tip: You may be eligible for $5 free credits by verifying your phone number"}]},{"type":"listitem","children":[{"type":"text","text":"Click the key icon in the left navigation to access API Keys"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"+ Create Key\", name it \"Zapier Second Brain\", and copy the key immediately (you won''t see it again!)"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add Claude to Your Zap"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"In Zapier, click the + to add an action"}]},{"type":"listitem","children":[{"type":"text","text":"Search for \"Anthropic (Claude)\""}]},{"type":"listitem","children":[{"type":"text","text":"Select \"Send Message\" as the action"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Sign in to Anthropic\" and paste your API key"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Configure the Prompt"}]},{"type":"paragraph","children":[{"type":"text","text":"In the \"User Message\" field, enter this prompt (and insert your Notion content field):"}]},{"type":"code","children":[{"type":"text","text":"Analyze this note and provide structured output:\n\nNOTE:\n{{Content from Notion}}\n\nRespond in EXACTLY this format (no other text):\n\nSUMMARY: [1-2 sentence summary of the main point]\n\nTAGS: [3-5 relevant single-word tags, comma-separated]\n\nACTION ITEMS: [Any tasks or to-dos mentioned, semicolon-separated. If none, write \"None\"]"}]},{"type":"paragraph","children":[{"type":"text","text":"Click the + button in the prompt field to insert your Notion \"Content\" field where it says {{Content from Notion}}."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Set Advanced Options"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Model:","bold":true},{"type":"text","text":" claude-haiku-4-5 (fast and affordable)"}]},{"type":"listitem","children":[{"type":"text","text":"Max Tokens:","bold":true},{"type":"text","text":" 500 (keeps responses concise)"}]},{"type":"listitem","children":[{"type":"text","text":"Temperature:","bold":true},{"type":"text","text":" 0.3 (more consistent output)"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Click \"Test action\" to see Claude process your sample note."}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"If you prefer ChatGPT/OpenAI:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Get an API key from platform.openai.com"}]},{"type":"listitem","children":[{"type":"text","text":"Add $5+ in credits to enable API access"}]},{"type":"listitem","children":[{"type":"text","text":"In Zapier, search for \"ChatGPT\" or \"OpenAI\""}]},{"type":"listitem","children":[{"type":"text","text":"Select \"Conversation\" as the action (this is the recommended option)"}]},{"type":"listitem","children":[{"type":"text","text":"Use the same prompt as above"}]},{"type":"listitem","children":[{"type":"text","text":"Select a model from the dropdown (gpt-4o-mini offers good price/performance)"}]}]}]}}','Using ChatGPT Instead','Claude Haiku 4.5 is extremely affordable at $1 per million input tokens. Processing 1,000 short notes costs just a few cents.',NULL);
INSERT INTO "tutorials_steps" VALUES(4,1,'69475fac2a4e93c7cf0b3a5e',4,'Update Your Knowledge Base',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Now we need to take Claude''s response and write it back to Notion. This requires a bit of text parsing."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add a Formatter Step (Optional but Recommended)"}]},{"type":"paragraph","children":[{"type":"text","text":"Before updating Notion, let''s parse Claude''s response into separate fields:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Add a new action: \"Formatter by Zapier\""}]},{"type":"listitem","children":[{"type":"text","text":"Select \"Text\" → \"Split Text\""}]},{"type":"listitem","children":[{"type":"text","text":"Input: Claude''s response"}]},{"type":"listitem","children":[{"type":"text","text":"Separator: Use [:newline:][:newline:] for double line breaks (Zapier requires this special syntax for whitespace)"}]}]},{"type":"paragraph","children":[{"type":"text","text":"This gives you separate outputs for Summary, Tags, and Action Items."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add the Notion Update Action"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Add action: \"Notion\" → \"Update Data Source Item\""}]},{"type":"listitem","children":[{"type":"text","text":"Select your Second Brain database"}]},{"type":"listitem","children":[{"type":"text","text":"Database Item: Select the item from your trigger"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Map the Fields"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Summary:","bold":true},{"type":"text","text":" Map the parsed SUMMARY section (or full Claude response if not parsing)"}]},{"type":"listitem","children":[{"type":"text","text":"Tags:","bold":true},{"type":"text","text":" Map the TAGS section"}]},{"type":"listitem","children":[{"type":"text","text":"Action Items:","bold":true},{"type":"text","text":" Map the ACTION ITEMS section"}]},{"type":"listitem","children":[{"type":"text","text":"Processed:","bold":true},{"type":"text","text":" Set to \"True\" or checked"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Click \"Test action\" to verify the update works."}]}]}}',NULL,NULL,'If you skip the Formatter step, you can paste Claude''s full response into the Summary field. It''s less clean but works.','IMPORTANT: Notion multi-select fields require options to exist before Zapier can add them. Either pre-create common tags (productivity, ideas, tasks, etc.) in your database, OR use a regular text field for Tags instead of multi-select. This is a common gotcha that breaks automations!');
INSERT INTO "tutorials_steps" VALUES(5,1,'69475fac2a4e93c7cf0b3a5f',5,'Test End-to-End',5,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Time to see your AI Second Brain in action!"}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Turn On Your Zap"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"In Zapier, click \"Publish\" or toggle your Zap on"}]},{"type":"listitem","children":[{"type":"text","text":"Go to your Notion Second Brain database"}]},{"type":"listitem","children":[{"type":"text","text":"Add a new entry with some raw content"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Try this sample note:"}]},{"type":"code","children":[{"type":"text","text":"Just finished reading \"Atomic Habits\" by James Clear. Key insight: focus on systems not goals. I should set up a morning routine that includes 10 min of reading and 5 min of journaling. Need to buy a physical journal this weekend."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Wait and Watch"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Zapier checks for new items every 1-15 minutes (depending on your plan)"}]},{"type":"listitem","children":[{"type":"text","text":"Within a few minutes, your entry should update automatically"}]},{"type":"listitem","children":[{"type":"text","text":"Check that Summary, Tags, and Action Items are filled in"}]},{"type":"listitem","children":[{"type":"text","text":"The Processed checkbox should be checked"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Expected Output"}]},{"type":"paragraph","children":[{"type":"text","text":"For the sample above, you should see something like:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Summary:","bold":true},{"type":"text","text":" Reflections on \"Atomic Habits\" book emphasizing systems over goals, with plans to implement a morning routine."}]},{"type":"listitem","children":[{"type":"text","text":"Tags:","bold":true},{"type":"text","text":" books, habits, productivity, morning-routine, self-improvement"}]},{"type":"listitem","children":[{"type":"text","text":"Action Items:","bold":true},{"type":"text","text":" Set up morning routine with reading and journaling; Buy a physical journal this weekend"}]}]},{"type":"paragraph","children":[{"type":"text","text":"🎉 Congratulations — you''ve built your AI Second Brain!"}]}]}}',NULL,NULL,NULL,NULL);
INSERT INTO "tutorials_steps" VALUES(1,2,'6949ffa462ea7c3d5b09f7b5',1,'Set Up Your Runway Account',5,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"First, let''s get you set up with Runway and understand the credit system."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Create Your Account"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to runwayml.com and click \"Try Runway for Free\""}]},{"type":"listitem","children":[{"type":"text","text":"Sign up with Google or email"}]},{"type":"listitem","children":[{"type":"text","text":"You''ll get 125 free credits to start (enough for several test videos)"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Understanding Credits"}]},{"type":"paragraph","children":[{"type":"text","text":"Runway uses a credit system. Here''s how it works:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Gen-3 Alpha:","bold":true},{"type":"text","text":" 10 credits per second of video"}]},{"type":"listitem","children":[{"type":"text","text":"Gen-3 Alpha Turbo:","bold":true},{"type":"text","text":" 5 credits per second (faster, slightly lower quality)"}]},{"type":"listitem","children":[{"type":"text","text":"A 5-second video costs 25-50 credits depending on the model"}]},{"type":"listitem","children":[{"type":"text","text":"Your free 125 credits = roughly 2-4 test videos"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Navigate to Gen-3"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"From the Runway dashboard, look for \"Generate Videos\" in the left sidebar"}]},{"type":"listitem","children":[{"type":"text","text":"Select \"Gen-3 Alpha\" (or Gen-3 Alpha Turbo for faster results)"}]},{"type":"listitem","children":[{"type":"text","text":"You''ll see two input options: \"Text\" and \"Image + Text\""}]}]},{"type":"paragraph","children":[{"type":"text","text":"We''ll start with text-to-video, then level up to image-to-video for more control."}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"If you prefer Pika 2.5:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to pika.art and sign up"}]},{"type":"listitem","children":[{"type":"text","text":"Free tier gives you 80 credits per month"}]},{"type":"listitem","children":[{"type":"text","text":"Standard videos cost 10 credits each"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Create\" to access the video generator"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Pika excels at creative effects. Try their \"Pikaffects\" feature for unique transformations like melting, exploding, or morphing objects."}]}]}}','Using Pika Instead','Start with Gen-3 Alpha Turbo to stretch your free credits further. The quality difference is subtle for most use cases.',NULL);
INSERT INTO "tutorials_steps" VALUES(2,2,'6949ffa462ea7c3d5b09f7b6',2,'Write Your First Video Prompt',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Writing prompts for video is different from image generation. Motion and camera movement are key."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"The Video Prompt Formula"}]},{"type":"paragraph","children":[{"type":"text","text":"A great video prompt has four components:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Subject:","bold":true},{"type":"text","text":" What or who is in the scene"}]},{"type":"listitem","children":[{"type":"text","text":"Action/Motion:","bold":true},{"type":"text","text":" What movement is happening"}]},{"type":"listitem","children":[{"type":"text","text":"Environment:","bold":true},{"type":"text","text":" Where the scene takes place"}]},{"type":"listitem","children":[{"type":"text","text":"Style/Mood:","bold":true},{"type":"text","text":" Visual style, lighting, atmosphere"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Example Prompts to Try"}]},{"type":"paragraph","children":[{"type":"text","text":"Copy one of these prompts to get started:"}]},{"type":"paragraph","children":[{"type":"text","text":"Cinematic Nature:","bold":true}]},{"type":"code","children":[{"type":"text","text":"A majestic eagle soaring through a misty mountain valley at sunrise, slow motion, golden hour lighting, cinematic drone shot tracking the bird, 4K documentary style"}]},{"type":"paragraph","children":[{"type":"text","text":"Urban Scene:","bold":true}]},{"type":"code","children":[{"type":"text","text":"A woman in a red coat walking through a rainy Tokyo street at night, neon signs reflecting on wet pavement, camera slowly pushing forward, Blade Runner aesthetic"}]},{"type":"paragraph","children":[{"type":"text","text":"Product Shot:","bold":true}]},{"type":"code","children":[{"type":"text","text":"A coffee cup on a wooden table with steam rising, morning sunlight streaming through a window, camera slowly orbiting around the cup, cozy cafe atmosphere"}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Camera Movement Keywords"}]},{"type":"paragraph","children":[{"type":"text","text":"Use these terms to control camera motion:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"\"tracking shot\"","bold":true},{"type":"text","text":" — camera follows the subject"}]},{"type":"listitem","children":[{"type":"text","text":"\"push in\" or \"dolly in\"","bold":true},{"type":"text","text":" — camera moves toward subject"}]},{"type":"listitem","children":[{"type":"text","text":"\"pull out\" or \"dolly out\"","bold":true},{"type":"text","text":" — camera moves away from subject"}]},{"type":"listitem","children":[{"type":"text","text":"\"orbit\" or \"arc\"","bold":true},{"type":"text","text":" — camera circles around subject"}]},{"type":"listitem","children":[{"type":"text","text":"\"static shot\"","bold":true},{"type":"text","text":" — camera stays still, only subject moves"}]},{"type":"listitem","children":[{"type":"text","text":"\"drone shot\"","bold":true},{"type":"text","text":" — aerial perspective"}]},{"type":"listitem","children":[{"type":"text","text":"\"slow motion\"","bold":true},{"type":"text","text":" — reduces perceived speed"}]}]}]}}',NULL,NULL,NULL,'Avoid prompts with text, logos, or specific brand names — AI video tools struggle with these. Also avoid complex multi-person scenes; start with single subjects.');
INSERT INTO "tutorials_steps" VALUES(3,2,'6949ffa462ea7c3d5b09f7b7',3,'Generate Your First Video',5,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Now let''s create your first AI video. We''ll start with text-to-video."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Generate the Video"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"In the Gen-3 interface, make sure \"Text\" mode is selected"}]},{"type":"listitem","children":[{"type":"text","text":"Paste your prompt in the text field"}]},{"type":"listitem","children":[{"type":"text","text":"Set duration to 5 seconds (conserves credits for testing)"}]},{"type":"listitem","children":[{"type":"text","text":"Leave other settings at default for now"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Generate\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Wait for Processing"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Gen-3 Alpha: 60-90 seconds per video"}]},{"type":"listitem","children":[{"type":"text","text":"Gen-3 Alpha Turbo: 20-40 seconds per video"}]},{"type":"listitem","children":[{"type":"text","text":"You can queue multiple generations while waiting"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Evaluate Your Results"}]},{"type":"paragraph","children":[{"type":"text","text":"When reviewing your generated video, look for:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Motion consistency:","bold":true},{"type":"text","text":" Does movement look natural?"}]},{"type":"listitem","children":[{"type":"text","text":"Subject integrity:","bold":true},{"type":"text","text":" Does the subject maintain its shape throughout?"}]},{"type":"listitem","children":[{"type":"text","text":"Prompt adherence:","bold":true},{"type":"text","text":" Did it follow your instructions?"}]},{"type":"listitem","children":[{"type":"text","text":"Artifacts:","bold":true},{"type":"text","text":" Any glitches, morphing, or unnatural elements?"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Don''t expect perfection on the first try. Iteration is normal — even pros regenerate multiple times."}]}]}}',NULL,NULL,'If your first result isn''t great, try generating 2-3 more with the same prompt. AI video is probabilistic — you''ll often get varying quality from the same input.',NULL);
INSERT INTO "tutorials_steps" VALUES(4,2,'6949ffa462ea7c3d5b09f7b8',4,'Level Up with Image-to-Video',7,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Image-to-video gives you much more control over the starting point. This is how professionals use AI video tools."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Why Use Image-to-Video?"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Consistent character/subject appearance across shots"}]},{"type":"listitem","children":[{"type":"text","text":"Precise control over the first frame composition"}]},{"type":"listitem","children":[{"type":"text","text":"Better results for specific products or branded content"}]},{"type":"listitem","children":[{"type":"text","text":"Animate existing artwork, photos, or AI-generated images"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Find or Create Your Source Image"}]},{"type":"paragraph","children":[{"type":"text","text":"You have several options:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Use a stock photo","bold":true},{"type":"text","text":" from Unsplash or Pexels (free)"}]},{"type":"listitem","children":[{"type":"text","text":"Generate with AI","bold":true},{"type":"text","text":" using Midjourney, DALL-E, or Ideogram"}]},{"type":"listitem","children":[{"type":"text","text":"Use your own photo","bold":true},{"type":"text","text":" — landscapes and objects work best"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Generate Image-to-Video"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"In Gen-3, switch to \"Image + Text\" mode"}]},{"type":"listitem","children":[{"type":"text","text":"Upload your source image"}]},{"type":"listitem","children":[{"type":"text","text":"Write a motion prompt (focus on what should MOVE, not what''s in the image)"}]},{"type":"listitem","children":[{"type":"text","text":"Click Generate"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Motion Prompt Examples"}]},{"type":"paragraph","children":[{"type":"text","text":"For a landscape image:"}]},{"type":"code","children":[{"type":"text","text":"Gentle wind moves through the grass, clouds slowly drift across the sky, camera slowly pushes forward"}]},{"type":"paragraph","children":[{"type":"text","text":"For a portrait:"}]},{"type":"code","children":[{"type":"text","text":"Subject slowly turns their head, subtle smile forms, hair gently moves, soft breathing motion"}]},{"type":"paragraph","children":[{"type":"text","text":"For a product shot:"}]},{"type":"code","children":[{"type":"text","text":"Camera slowly orbits around the product, reflections shift on the surface, dramatic lighting"}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Kling AI offers unique advantages:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Generate videos up to 2 minutes long"}]},{"type":"listitem","children":[{"type":"text","text":"\"Elements\" feature maintains character consistency across shots"}]},{"type":"listitem","children":[{"type":"text","text":"More affordable at $4-10/month for entry plans"}]},{"type":"listitem","children":[{"type":"text","text":"Best for narrative content or character-driven videos"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Access Kling at klingai.com — the interface is similar to Runway."}]}]}}','Using Kling AI for Longer Videos',NULL,'For image-to-video, your source image quality matters a lot. Use high-resolution images (at least 1024x1024) and avoid images with text or logos.');
INSERT INTO "tutorials_steps" VALUES(5,2,'6949ffa462ea7c3d5b09f7b9',5,'Export and Use Your Video',3,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"You''ve created your first AI video! Now let''s download it and understand your options for next steps."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Download Your Video"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Click on your finished video in Runway"}]},{"type":"listitem","children":[{"type":"text","text":"Click the download icon (arrow pointing down)"}]},{"type":"listitem","children":[{"type":"text","text":"Choose your quality (720p is free, 4K requires paid plan)"}]},{"type":"listitem","children":[{"type":"text","text":"Video downloads as MP4 — universally compatible"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Optional: Add Audio"}]},{"type":"paragraph","children":[{"type":"text","text":"AI videos are silent. To add music or sound effects:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"CapCut","bold":true},{"type":"text","text":" (free) — Browser-based, includes royalty-free music library"}]},{"type":"listitem","children":[{"type":"text","text":"DaVinci Resolve","bold":true},{"type":"text","text":" (free) — Professional-grade, more features"}]},{"type":"listitem","children":[{"type":"text","text":"ElevenLabs","bold":true},{"type":"text","text":" — Generate AI voiceovers to narrate your video"}]},{"type":"listitem","children":[{"type":"text","text":"Suno or Udio","bold":true},{"type":"text","text":" — Generate custom AI music to match your video mood"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Common Use Cases"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Social media content","bold":true},{"type":"text","text":" — Short clips for Instagram Reels, TikTok, YouTube Shorts"}]},{"type":"listitem","children":[{"type":"text","text":"B-roll footage","bold":true},{"type":"text","text":" — Fill gaps in video projects"}]},{"type":"listitem","children":[{"type":"text","text":"Product visualization","bold":true},{"type":"text","text":" — Showcase products before they exist"}]},{"type":"listitem","children":[{"type":"text","text":"Music videos","bold":true},{"type":"text","text":" — Create visuals for original music"}]},{"type":"listitem","children":[{"type":"text","text":"Presentation graphics","bold":true},{"type":"text","text":" — Add motion to slides and decks"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Congratulations — you''ve just created your first AI-generated video!"}]}]}}',NULL,NULL,'Create a folder system for your AI videos: Drafts, Approved, Published. You''ll generate many iterations — staying organized saves time.',NULL);
INSERT INTO "tutorials_steps" VALUES(1,3,'694a007462ea7c3d5b09f8b1',1,'Create Your Chatbase Account',5,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Let''s set up Chatbase and understand what you''re getting."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Sign Up for Chatbase"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to chatbase.co and click \"Get Started Free\""}]},{"type":"listitem","children":[{"type":"text","text":"Sign up with Google or email"}]},{"type":"listitem","children":[{"type":"text","text":"You''ll land on the dashboard with \"Create New Chatbot\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Understand the Free Tier"}]},{"type":"paragraph","children":[{"type":"text","text":"Chatbase''s free plan includes:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"100 message credits per month"}]},{"type":"listitem","children":[{"type":"text","text":"1 chatbot (called an \"agent\")"}]},{"type":"listitem","children":[{"type":"text","text":"400,000 characters of training data"}]},{"type":"listitem","children":[{"type":"text","text":"Basic customization"}]},{"type":"listitem","children":[{"type":"text","text":"\"Powered by Chatbase\" branding"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"About Message Credits"}]},{"type":"paragraph","children":[{"type":"text","text":"Each AI response uses credits based on the model:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"GPT-4, Claude 3 Opus:","bold":true},{"type":"text","text":" 20 credits per response"}]},{"type":"listitem","children":[{"type":"text","text":"GPT-4 mini:","bold":true},{"type":"text","text":" 10 credits per response"}]},{"type":"listitem","children":[{"type":"text","text":"Claude 3.5 Sonnet, Gemini:","bold":true},{"type":"text","text":" 1 credit per response"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Pro tip: Claude 3.5 Sonnet offers excellent quality at just 1 credit per response — ideal for high-volume use."}]}]}}','{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"If you prefer Voiceflow:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to voiceflow.com and sign up"}]},{"type":"listitem","children":[{"type":"text","text":"Create a new \"Web Chat\" project"}]},{"type":"listitem","children":[{"type":"text","text":"Voiceflow uses a visual flow builder for more complex conversations"}]},{"type":"listitem","children":[{"type":"text","text":"Free tier includes 100 credits and 2 agents"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Voiceflow is better if you need multi-step conversation flows, branching logic, or integration with external systems."}]}]}}','Using Voiceflow Instead','Start with Claude 3.5 Sonnet as your model. It gives you 100 conversations on the free tier versus just 5 with GPT-4.',NULL);
INSERT INTO "tutorials_steps" VALUES(2,3,'694a007462ea7c3d5b09f8b2',2,'Train Your Chatbot on Your Content',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"This is where the magic happens. You''ll feed your chatbot your content so it can answer questions accurately."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Create Your First Chatbot"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"From the Chatbase dashboard, click \"Create New Chatbot\""}]},{"type":"listitem","children":[{"type":"text","text":"You''ll see data source options: Website, Files, Text, Q&A, Notion"}]},{"type":"listitem","children":[{"type":"text","text":"We''ll start with Website — the easiest option"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Option A: Train from Website"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Select \"Website\" as your data source"}]},{"type":"listitem","children":[{"type":"text","text":"Enter your website URL (e.g., https://yoursite.com)"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Crawl\" — Chatbase will scrape your pages"}]},{"type":"listitem","children":[{"type":"text","text":"Review the discovered pages and deselect any you don''t want"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Create Chatbot\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Option B: Train from Documents"}]},{"type":"paragraph","children":[{"type":"text","text":"If you have documentation, manuals, or FAQ documents:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Select \"Files\" as your data source"}]},{"type":"listitem","children":[{"type":"text","text":"Upload PDFs, DOCX, or TXT files"}]},{"type":"listitem","children":[{"type":"text","text":"You can upload multiple files (up to 400K characters on free tier)"}]},{"type":"listitem","children":[{"type":"text","text":"Click \"Create Chatbot\""}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Option C: Add Q&A Pairs"}]},{"type":"paragraph","children":[{"type":"text","text":"For precise control over specific questions:"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Select \"Q&A\" as your data source"}]},{"type":"listitem","children":[{"type":"text","text":"Add question-answer pairs manually"}]},{"type":"listitem","children":[{"type":"text","text":"These get highest priority when matching user questions"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Pro tip: You can combine all three — website + files + Q&A for comprehensive coverage."}]}]}}',NULL,NULL,NULL,'Make sure your training content is accurate and up-to-date. The chatbot will confidently repeat any incorrect information in your source material.');
INSERT INTO "tutorials_steps" VALUES(3,3,'694a007462ea7c3d5b09f8b3',3,'Customize Your Chatbot''s Personality',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"A good chatbot doesn''t just answer questions — it represents your brand. Let''s customize its personality and appearance."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Set the Base Prompt (System Instructions)"}]},{"type":"paragraph","children":[{"type":"text","text":"Navigate to Settings → AI Model and find \"Base Prompt.\" This controls how your bot behaves. Here''s a template:"}]},{"type":"code","children":[{"type":"text","text":"You are a friendly customer support assistant for [Company Name]. Your goal is to help users find information about our products and services.\n\nGuidelines:\n- Be helpful, concise, and friendly\n- If you don''t know something, say so — don''t make up information\n- Direct users to contact support@company.com for complex issues\n- Never discuss competitors or off-topic subjects\n- Always offer to help with anything else at the end of your response\n\nTone: Professional but approachable. Use simple language. Avoid jargon unless the user uses it first."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Choose Your AI Model"}]},{"type":"paragraph","children":[{"type":"text","text":"In the same settings panel, select your model:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Claude 3.5 Sonnet:","bold":true},{"type":"text","text":" Best value (1 credit). Great for most use cases."}]},{"type":"listitem","children":[{"type":"text","text":"GPT-4o mini:","bold":true},{"type":"text","text":" Good balance of quality and cost (10 credits)."}]},{"type":"listitem","children":[{"type":"text","text":"GPT-4:","bold":true},{"type":"text","text":" Highest quality but expensive (20 credits). Use for complex topics."}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Customize the Chat Widget"}]},{"type":"paragraph","children":[{"type":"text","text":"Go to Settings → Chat Interface to customize appearance:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Theme color:","bold":true},{"type":"text","text":" Match your brand colors"}]},{"type":"listitem","children":[{"type":"text","text":"Chat bubble icon:","bold":true},{"type":"text","text":" Upload your logo or use default"}]},{"type":"listitem","children":[{"type":"text","text":"Welcome message:","bold":true},{"type":"text","text":" First thing users see (e.g., \"Hi! How can I help you today?\")"}]},{"type":"listitem","children":[{"type":"text","text":"Suggested messages:","bold":true},{"type":"text","text":" Pre-written questions users can click"}]},{"type":"listitem","children":[{"type":"text","text":"Position:","bold":true},{"type":"text","text":" Bottom-right (default) or bottom-left"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add Suggested Questions"}]},{"type":"paragraph","children":[{"type":"text","text":"Add 3-4 starter questions based on your most common queries:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"\"What are your pricing plans?\""}]},{"type":"listitem","children":[{"type":"text","text":"\"How do I get started?\""}]},{"type":"listitem","children":[{"type":"text","text":"\"What features are included?\""}]},{"type":"listitem","children":[{"type":"text","text":"\"How do I contact support?\""}]}]}]}}',NULL,NULL,'Test your chatbot extensively before going live. Ask edge-case questions and questions you DON''T want it to answer to see how it handles them.',NULL);
INSERT INTO "tutorials_steps" VALUES(4,3,'694a007462ea7c3d5b09f8b4',4,'Test Your Chatbot',5,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Before embedding on your site, let''s make sure your chatbot works as expected."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Use the Playground"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Click \"Playground\" in the left sidebar"}]},{"type":"listitem","children":[{"type":"text","text":"You''ll see a live chat interface"}]},{"type":"listitem","children":[{"type":"text","text":"Test messages DON''T count against your credit limit"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Test These Scenarios"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Ask a question your content clearly answers:","bold":true},{"type":"text","text":" Verify accuracy"}]},{"type":"listitem","children":[{"type":"text","text":"Ask something NOT in your content:","bold":true},{"type":"text","text":" Should admit it doesn''t know"}]},{"type":"listitem","children":[{"type":"text","text":"Ask something off-topic:","bold":true},{"type":"text","text":" Should politely redirect"}]},{"type":"listitem","children":[{"type":"text","text":"Try to get it to say something inappropriate:","bold":true},{"type":"text","text":" Should refuse"}]},{"type":"listitem","children":[{"type":"text","text":"Ask the same question in different ways:","bold":true},{"type":"text","text":" Should give consistent answers"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Check Response Quality"}]},{"type":"paragraph","children":[{"type":"text","text":"Good responses should:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Be accurate based on your source material"}]},{"type":"listitem","children":[{"type":"text","text":"Match the tone you set in the base prompt"}]},{"type":"listitem","children":[{"type":"text","text":"Be concise (not rambling)"}]},{"type":"listitem","children":[{"type":"text","text":"Include helpful follow-ups when appropriate"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Refine If Needed"}]},{"type":"paragraph","children":[{"type":"text","text":"If responses aren''t right:"}]},{"type":"list","listType":"bullet","children":[{"type":"listitem","children":[{"type":"text","text":"Wrong answers?","bold":true},{"type":"text","text":" Add Q&A pairs for those specific questions"}]},{"type":"listitem","children":[{"type":"text","text":"Wrong tone?","bold":true},{"type":"text","text":" Adjust your base prompt with more specific guidance"}]},{"type":"listitem","children":[{"type":"text","text":"Missing info?","bold":true},{"type":"text","text":" Add more source content or documents"}]}]}]}}',NULL,NULL,NULL,NULL);
INSERT INTO "tutorials_steps" VALUES(5,3,'694a007462ea7c3d5b09f8b5',5,'Embed on Your Website',10,'{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Time to go live! Chatbase gives you a simple embed code that works on any website."}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Get Your Embed Code"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to Settings → Embed on Website"}]},{"type":"listitem","children":[{"type":"text","text":"You''ll see a code snippet that looks like this:"}]}]},{"type":"code","children":[{"type":"text","text":"<script>\n  window.chatbaseConfig = {\n    chatbotId: \"your-chatbot-id\"\n  }\n</script>\n<script src=\"https://www.chatbase.co/embed.min.js\" defer></script>"}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Add to Your Website"}]},{"type":"paragraph","children":[{"type":"text","text":"Where to paste depends on your platform:"}]},{"type":"paragraph","children":[{"type":"text","text":"WordPress:","bold":true}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to Appearance → Theme File Editor"}]},{"type":"listitem","children":[{"type":"text","text":"Open footer.php"}]},{"type":"listitem","children":[{"type":"text","text":"Paste the code before </body>"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Webflow:","bold":true}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to Site Settings → Custom Code"}]},{"type":"listitem","children":[{"type":"text","text":"Paste in the \"Footer Code\" section"}]},{"type":"listitem","children":[{"type":"text","text":"Publish your site"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Framer:","bold":true}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to Site Settings → General → Custom Code"}]},{"type":"listitem","children":[{"type":"text","text":"Add to \"End of <body> tag\""}]}]},{"type":"paragraph","children":[{"type":"text","text":"Shopify:","bold":true}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Go to Online Store → Themes → Edit Code"}]},{"type":"listitem","children":[{"type":"text","text":"Open theme.liquid"}]},{"type":"listitem","children":[{"type":"text","text":"Paste before </body>"}]}]},{"type":"heading","tag":"h4","children":[{"type":"text","text":"Verify It Works"}]},{"type":"list","listType":"number","children":[{"type":"listitem","children":[{"type":"text","text":"Visit your website"}]},{"type":"listitem","children":[{"type":"text","text":"Look for the chat bubble in the bottom corner"}]},{"type":"listitem","children":[{"type":"text","text":"Click it and send a test message"}]},{"type":"listitem","children":[{"type":"text","text":"Check the Chatbase dashboard to see the conversation logged"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Congratulations — your AI chatbot is live!"}]}]}}',NULL,NULL,NULL,'The embed code will appear on ALL pages where you add it. If you only want the chatbot on specific pages, use conditional logic in your CMS or platform settings.');
CREATE TABLE `tutorials_tool_stack` (
    `_order` integer NOT NULL,
    `_parent_id` integer NOT NULL,
    `id` text PRIMARY KEY NOT NULL,
    `role` text NOT NULL,
    `primary_tool` text NOT NULL,
    `alternative_tool` text,
    FOREIGN KEY (`_parent_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tutorials_tool_stack" VALUES(1,1,'69475fac2a4e93c7cf0b3a60','Knowledge Base','Notion','Airtable');
INSERT INTO "tutorials_tool_stack" VALUES(2,1,'69475fac2a4e93c7cf0b3a61','AI Reasoning','Claude','ChatGPT');
INSERT INTO "tutorials_tool_stack" VALUES(3,1,'69475fac2a4e93c7cf0b3a62','Automation','Zapier','Make');
INSERT INTO "tutorials_tool_stack" VALUES(1,2,'6949ffa462ea7c3d5b09f7ba','Video Generation','Runway Gen-3','Pika 2.5');
INSERT INTO "tutorials_tool_stack" VALUES(2,2,'6949ffa462ea7c3d5b09f7bb','Image Source (Optional)','Midjourney','DALL-E 3');
INSERT INTO "tutorials_tool_stack" VALUES(3,2,'6949ffa462ea7c3d5b09f7bc','Video Editing (Optional)','CapCut','DaVinci Resolve');
INSERT INTO "tutorials_tool_stack" VALUES(1,3,'694a007462ea7c3d5b09f8a1','Chatbot Platform','Chatbase','Voiceflow');
INSERT INTO "tutorials_tool_stack" VALUES(2,3,'694a007462ea7c3d5b09f8a2','AI Model','GPT-4','Claude 3.5');
INSERT INTO "tutorials_tool_stack" VALUES(3,3,'694a007462ea7c3d5b09f8a3','Data Source','Website URL','PDF/Documents');
CREATE TABLE `tutorials_prerequisites` (
    `_order` integer NOT NULL,
    `_parent_id` integer NOT NULL,
    `id` text PRIMARY KEY NOT NULL,
    `item` text NOT NULL,
    FOREIGN KEY (`_parent_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tutorials_prerequisites" VALUES(1,1,'69475fac2a4e93c7cf0b3a63','Free Notion account (or Airtable)');
INSERT INTO "tutorials_prerequisites" VALUES(2,1,'69475fac2a4e93c7cf0b3a64','Free Zapier account (or Make)');
INSERT INTO "tutorials_prerequisites" VALUES(3,1,'69475fac2a4e93c7cf0b3a65','Anthropic Console account with API credits (or OpenAI account)');
INSERT INTO "tutorials_prerequisites" VALUES(4,1,'69475fac2a4e93c7cf0b3a66','About 45 minutes of focused time');
INSERT INTO "tutorials_prerequisites" VALUES(1,2,'6949ffa462ea7c3d5b09f7bd','Runway account (free tier available)');
INSERT INTO "tutorials_prerequisites" VALUES(2,2,'6949ffa462ea7c3d5b09f7be','A creative idea or reference image');
INSERT INTO "tutorials_prerequisites" VALUES(3,2,'6949ffa462ea7c3d5b09f7bf','About 30 minutes of focused time');
INSERT INTO "tutorials_prerequisites" VALUES(4,2,'6949ffa462ea7c3d5b09f7c0','Optional: Image generation tool for custom starting frames');
INSERT INTO "tutorials_prerequisites" VALUES(1,3,'694a007462ea7c3d5b09f8a4','A website where you want to add the chatbot');
INSERT INTO "tutorials_prerequisites" VALUES(2,3,'694a007462ea7c3d5b09f8a5','Content to train the bot on (website, docs, FAQ, or PDFs)');
INSERT INTO "tutorials_prerequisites" VALUES(3,3,'694a007462ea7c3d5b09f8a6','About 40 minutes of focused time');
INSERT INTO "tutorials_prerequisites" VALUES(4,3,'694a007462ea7c3d5b09f8a7','Basic understanding of HTML (just for embedding)');
CREATE TABLE `tutorials_next_steps` (
    `_order` integer NOT NULL,
    `_parent_id` integer NOT NULL,
    `id` text PRIMARY KEY NOT NULL,
    `title` text NOT NULL,
    `description` text,
    FOREIGN KEY (`_parent_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tutorials_next_steps" VALUES(1,1,'69475fac2a4e93c7cf0b3a67','Add More Input Sources','Connect email forwarding, voice memos via transcription, or saved articles to automatically feed your second brain.');
INSERT INTO "tutorials_next_steps" VALUES(2,1,'69475fac2a4e93c7cf0b3a68','Create Views in Notion','Set up filtered views: "Unprocessed" items, "Action Items to Review", items by tag, or a weekly digest view.');
INSERT INTO "tutorials_next_steps" VALUES(3,1,'69475fac2a4e93c7cf0b3a69','Add a Weekly Review Automation','Create a scheduled Zap that sends you a weekly summary of everything you captured.');
INSERT INTO "tutorials_next_steps" VALUES(4,1,'69475fac2a4e93c7cf0b3a6a','Expand to Other Workflows','Use the same pattern for meeting notes, customer feedback, or research — any text that needs organizing.');
INSERT INTO "tutorials_next_steps" VALUES(1,2,'6949ffa462ea7c3d5b09f7c1','Experiment with Different Styles','Try generating videos in different visual styles: anime, film noir, documentary, stop-motion, watercolor painting, etc.');
INSERT INTO "tutorials_next_steps" VALUES(2,2,'6949ffa462ea7c3d5b09f7c2','Create a Multi-Clip Sequence','Generate 3-5 related clips and edit them together in CapCut or DaVinci Resolve to create a complete scene.');
INSERT INTO "tutorials_next_steps" VALUES(3,2,'6949ffa462ea7c3d5b09f7c3','Try Pika''s Special Effects','Experiment with Pika''s "Pikaffects" to add creative transformations like melting, exploding, or morphing.');
INSERT INTO "tutorials_next_steps" VALUES(4,2,'6949ffa462ea7c3d5b09f7c4','Add AI Audio','Use ElevenLabs for voiceover or Suno/Udio for AI-generated music to create fully AI-produced videos.');
INSERT INTO "tutorials_next_steps" VALUES(1,3,'694a007462ea7c3d5b09f8c1','Connect Integrations','Chatbase integrates with Slack, Zapier, and webhooks. Get notified when someone asks a question the bot can''t answer, or log conversations to a CRM.');
INSERT INTO "tutorials_next_steps" VALUES(2,3,'694a007462ea7c3d5b09f8c2','Add Lead Capture','Configure the chatbot to collect email addresses before answering questions. Great for building your mailing list from curious visitors.');
INSERT INTO "tutorials_next_steps" VALUES(3,3,'694a007462ea7c3d5b09f8c3','Review Conversation Logs','Check the dashboard regularly to see what people are asking. Add Q&A pairs for commonly missed questions.');
INSERT INTO "tutorials_next_steps" VALUES(4,3,'694a007462ea7c3d5b09f8c4','Set Up Human Handoff','Configure escalation paths for complex questions. Route to email, live chat, or schedule a call when the bot can''t help.');
CREATE TABLE `tutorials_rels` (
    `id` integer PRIMARY KEY NOT NULL,
    `order` integer,
    `parent_id` integer NOT NULL,
    `path` text NOT NULL,
    `tools_id` integer,
    `tutorials_id` integer,
    FOREIGN KEY (`parent_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`tools_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`tutorials_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `search` (
    `id` integer PRIMARY KEY NOT NULL,
    `title` text,
    `priority` integer,
    `excerpt` text,
    `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE TABLE `search_rels` (
    `id` integer PRIMARY KEY NOT NULL,
    `order` integer,
    `parent_id` integer NOT NULL,
    `path` text NOT NULL,
    `tools_id` integer,
    `builders_id` integer,
    `projects_id` integer,
    `posts_id` integer,
    `tutorials_id` integer,
    FOREIGN KEY (`parent_id`) REFERENCES `search`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`tools_id`) REFERENCES `tools`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`builders_id`) REFERENCES `builders`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`projects_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`posts_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`tutorials_id`) REFERENCES `tutorials`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE IF NOT EXISTS "tools_pricing_tiers" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "name" text,
    "price" text,
    "billing_period" text,
    "recommended" integer DEFAULT false,
    "cta_text" text,
    "cta_url" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_pricing_tiers" VALUES(1,0,25,'Free','$0','free',0,'Get Started Free','https://chat.openai.com');
INSERT INTO "tools_pricing_tiers" VALUES(2,1,25,'Plus','$20/mo','monthly',1,'Upgrade to Plus','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(3,2,25,'Pro','$200/mo','monthly',0,'Go Pro','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(4,3,25,'Team','$25-30/user/mo','monthly',0,'Start Team Trial','https://openai.com/chatgpt/team/');
INSERT INTO "tools_pricing_tiers" VALUES(5,4,25,'Enterprise','Custom','custom',0,'Contact Sales','https://openai.com/chatgpt/enterprise/');
INSERT INTO "tools_pricing_tiers" VALUES(6,0,18,'Basic','$10/mo','monthly',0,'Start Basic','https://www.midjourney.com/account/');
INSERT INTO "tools_pricing_tiers" VALUES(7,1,18,'Standard','$30/mo','monthly',1,'Get Standard','https://www.midjourney.com/account/');
INSERT INTO "tools_pricing_tiers" VALUES(8,2,18,'Pro','$60/mo','monthly',0,'Go Pro','https://www.midjourney.com/account/');
INSERT INTO "tools_pricing_tiers" VALUES(9,3,18,'Mega','$120/mo','monthly',0,'Get Mega','https://www.midjourney.com/account/');
INSERT INTO "tools_pricing_tiers" VALUES(10,0,23,'Free','$0','free',0,'Try Claude Free','https://claude.ai');
INSERT INTO "tools_pricing_tiers" VALUES(11,1,23,'Pro','$20/mo','monthly',1,'Upgrade to Pro','https://claude.ai/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(12,2,23,'Team','$25/user/mo','monthly',0,'Start Team','https://claude.ai/team');
INSERT INTO "tools_pricing_tiers" VALUES(13,3,23,'Enterprise','Custom','custom',0,'Contact Sales','https://anthropic.com/claude/enterprise');
INSERT INTO "tools_pricing_tiers" VALUES(14,0,8,'Free','$0','free',0,'Apply for Free Access','https://github.com/features/copilot');
INSERT INTO "tools_pricing_tiers" VALUES(15,1,8,'Individual','$10/mo','monthly',1,'Start Free Trial','https://github.com/features/copilot');
INSERT INTO "tools_pricing_tiers" VALUES(16,2,8,'Business','$19/user/mo','monthly',0,'Start Business Trial','https://github.com/features/copilot/business');
INSERT INTO "tools_pricing_tiers" VALUES(17,3,8,'Enterprise','$39/user/mo','monthly',0,'Contact Sales','https://github.com/features/copilot/enterprise');
INSERT INTO "tools_pricing_tiers" VALUES(18,0,7,'Hobby','$0','free',0,'Download Free','https://cursor.sh');
INSERT INTO "tools_pricing_tiers" VALUES(19,1,7,'Pro','$20/mo','monthly',1,'Start Pro Trial','https://cursor.sh/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(20,2,7,'Business','$40/user/mo','monthly',0,'Contact Sales','https://cursor.sh/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(21,0,24,'ChatGPT Plus','$20/mo','monthly',1,'Subscribe to Plus','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(22,1,24,'ChatGPT Pro','$200/mo','monthly',0,'Go Pro','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(23,2,24,'API Standard','$0.040/image','custom',0,'Get API Access','https://platform.openai.com');
INSERT INTO "tools_pricing_tiers" VALUES(24,3,24,'API HD','$0.080/image','custom',0,'Get API Access','https://platform.openai.com');
INSERT INTO "tools_pricing_tiers" VALUES(25,0,20,'Free','$0','free',0,'Try Free','https://perplexity.ai');
INSERT INTO "tools_pricing_tiers" VALUES(26,1,20,'Pro','$20/mo','monthly',1,'Go Pro','https://perplexity.ai/pro');
INSERT INTO "tools_pricing_tiers" VALUES(27,2,20,'Enterprise','Custom','custom',0,'Contact Sales','https://perplexity.ai/enterprise');
INSERT INTO "tools_pricing_tiers" VALUES(28,0,32,'ChatGPT Plus','$20/mo','monthly',0,'Subscribe to Plus','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(29,1,32,'ChatGPT Pro','$200/mo','monthly',1,'Go Pro','https://chat.openai.com/upgrade');
INSERT INTO "tools_pricing_tiers" VALUES(30,0,2,'Free','$0','free',0,'Try Free','https://elevenlabs.io');
INSERT INTO "tools_pricing_tiers" VALUES(31,1,2,'Starter','$5/mo','monthly',0,'Start Creating','https://elevenlabs.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(32,2,2,'Creator','$22/mo','monthly',1,'Go Creator','https://elevenlabs.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(33,3,2,'Pro','$99/mo','monthly',0,'Go Pro','https://elevenlabs.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(34,4,2,'Scale','$330/mo','monthly',0,'Contact Sales','https://elevenlabs.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(35,0,4,'Free','$0','free',0,'Start Creating','https://suno.ai');
INSERT INTO "tools_pricing_tiers" VALUES(36,1,4,'Pro','$10/mo','monthly',1,'Go Pro','https://suno.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(37,2,4,'Premier','$30/mo','monthly',0,'Go Premier','https://suno.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(38,0,19,'Free','$0','free',0,'Try Free','https://runwayml.com');
INSERT INTO "tools_pricing_tiers" VALUES(39,1,19,'Basic','$15/mo','monthly',0,'Start Basic','https://runwayml.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(40,2,19,'Standard','$35/mo','monthly',1,'Go Standard','https://runwayml.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(41,3,19,'Pro','$95/mo','monthly',0,'Go Pro','https://runwayml.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(42,4,19,'Unlimited','$145/mo','monthly',0,'Go Unlimited','https://runwayml.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(43,0,36,'Free','$0','free',0,'Try Gemini','https://gemini.google.com');
INSERT INTO "tools_pricing_tiers" VALUES(44,1,36,'Advanced','$20/mo','monthly',1,'Try Advanced','https://one.google.com/about/ai-premium');
INSERT INTO "tools_pricing_tiers" VALUES(45,0,22,'Local (Free)','$0','free',1,'Download Models','https://stability.ai');
INSERT INTO "tools_pricing_tiers" VALUES(46,1,22,'DreamStudio','$10/1000 credits','custom',0,'Try DreamStudio','https://dreamstudio.ai');
INSERT INTO "tools_pricing_tiers" VALUES(47,0,21,'Add-on','$10/user/mo','monthly',1,'Try Notion AI','https://notion.so/product/ai');
INSERT INTO "tools_pricing_tiers" VALUES(48,0,6,'Free','$0','free',0,'Try v0 Free','https://v0.dev');
INSERT INTO "tools_pricing_tiers" VALUES(49,1,6,'Premium','$20/mo','monthly',1,'Go Premium','https://v0.dev/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(50,0,31,'Free','$0','free',0,'Start Building','https://bolt.new');
INSERT INTO "tools_pricing_tiers" VALUES(51,1,31,'Pro','$20/mo','monthly',1,'Go Pro','https://bolt.new');
INSERT INTO "tools_pricing_tiers" VALUES(52,0,35,'Chat','$0','free',0,'Try DeepSeek Chat','https://chat.deepseek.com');
INSERT INTO "tools_pricing_tiers" VALUES(53,1,35,'API','$0.14/M tokens','custom',1,'Get API Access','https://platform.deepseek.com');
INSERT INTO "tools_pricing_tiers" VALUES(54,0,15,'Free','$0','free',0,'Start Free','https://leonardo.ai');
INSERT INTO "tools_pricing_tiers" VALUES(55,1,15,'Apprentice','$12/mo','monthly',1,'Go Apprentice','https://leonardo.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(56,2,15,'Artisan','$30/mo','monthly',0,'Go Artisan','https://leonardo.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(57,0,3,'Free','$0','free',0,'Start Creating','https://udio.com');
INSERT INTO "tools_pricing_tiers" VALUES(58,1,3,'Standard','$10/mo','monthly',1,'Go Standard','https://udio.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(59,2,3,'Pro','$30/mo','monthly',0,'Go Pro','https://udio.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(60,0,12,'Flux Schnell','$0','free',0,'Try Free','https://replicate.com/black-forest-labs/flux-schnell');
INSERT INTO "tools_pricing_tiers" VALUES(61,1,12,'Flux Dev','$0','free',1,'Use Dev','https://replicate.com/black-forest-labs/flux-dev');
INSERT INTO "tools_pricing_tiers" VALUES(62,2,12,'Flux Pro','Pay-per-use','usage',0,'Access Pro','https://replicate.com/black-forest-labs/flux-pro');
INSERT INTO "tools_pricing_tiers" VALUES(63,0,13,'Free','$0','free',0,'Try Free','https://ideogram.ai');
INSERT INTO "tools_pricing_tiers" VALUES(64,1,13,'Basic','$8/mo','monthly',1,'Go Basic','https://ideogram.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(65,2,13,'Plus','$20/mo','monthly',0,'Go Plus','https://ideogram.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(66,3,13,'Pro','$60/mo','monthly',0,'Go Pro','https://ideogram.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(67,0,14,'Free','$0','free',0,'Try Free','https://pika.art');
INSERT INTO "tools_pricing_tiers" VALUES(68,1,14,'Unlimited','$10/mo','monthly',1,'Go Unlimited','https://pika.art/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(69,2,14,'Pro','$35/mo','monthly',0,'Go Pro','https://pika.art/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(70,0,33,'Free','$0','free',1,'Try Free','https://klingai.com');
INSERT INTO "tools_pricing_tiers" VALUES(71,1,33,'Pro','$10/mo','monthly',0,'Go Pro','https://klingai.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(72,0,34,'Free','$0','free',1,'Try Free','https://hailuoai.video');
INSERT INTO "tools_pricing_tiers" VALUES(73,1,34,'Premium','Varies','monthly',0,'Go Premium','https://hailuoai.video');
INSERT INTO "tools_pricing_tiers" VALUES(74,0,26,'Free','$0','free',1,'Start Free','https://clipchamp.com');
INSERT INTO "tools_pricing_tiers" VALUES(75,1,26,'Essentials','$12/mo','monthly',0,'Go Essentials','https://clipchamp.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(76,0,27,'Free','$0','free',0,'Try Free','https://captions.ai');
INSERT INTO "tools_pricing_tiers" VALUES(77,1,27,'Pro','$10/mo','monthly',1,'Go Pro','https://captions.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(78,0,28,'Free','$0','free',0,'Start Free','https://veed.io');
INSERT INTO "tools_pricing_tiers" VALUES(79,1,28,'Basic','$18/mo','monthly',1,'Go Basic','https://veed.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(80,2,28,'Pro','$30/mo','monthly',0,'Go Pro','https://veed.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(81,0,29,'Free','$0','free',0,'Try Free','https://invideo.io');
INSERT INTO "tools_pricing_tiers" VALUES(82,1,29,'Plus','$25/mo','monthly',1,'Go Plus','https://invideo.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(83,2,29,'Max','$60/mo','monthly',0,'Go Max','https://invideo.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(84,0,10,'Free','$0','free',1,'Start Chatting','https://character.ai');
INSERT INTO "tools_pricing_tiers" VALUES(85,1,10,'c.ai+','$10/mo','monthly',0,'Go Plus','https://character.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(86,0,11,'Free','$0','free',1,'Try Free','https://notebooklm.google.com');
INSERT INTO "tools_pricing_tiers" VALUES(87,0,71,'Free','$0','free',0,'Add to Browser','https://grammarly.com');
INSERT INTO "tools_pricing_tiers" VALUES(88,1,71,'Premium','$12/mo','monthly',1,'Go Premium','https://grammarly.com/premium');
INSERT INTO "tools_pricing_tiers" VALUES(89,2,71,'Business','$15/user/mo','monthly',0,'For Teams','https://grammarly.com/business');
INSERT INTO "tools_pricing_tiers" VALUES(90,0,73,'Free','$0','free',0,'Try Free','https://wordtune.com');
INSERT INTO "tools_pricing_tiers" VALUES(91,1,73,'Plus','$10/mo','monthly',1,'Go Plus','https://wordtune.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(92,2,73,'Business','$13.50/user','monthly',0,'For Teams','https://wordtune.com/business');
INSERT INTO "tools_pricing_tiers" VALUES(93,0,44,'Free','$0','free',0,'Start Free','https://copy.ai');
INSERT INTO "tools_pricing_tiers" VALUES(94,1,44,'Pro','$36/mo','monthly',1,'Go Pro','https://copy.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(95,2,44,'Team','$186/mo','monthly',0,'For Teams','https://copy.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(96,0,47,'Creator','$49/mo','monthly',0,'Start Creating','https://jasper.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(97,1,47,'Pro','$69/mo','monthly',1,'Go Pro','https://jasper.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(98,2,47,'Business','Custom','custom',0,'Contact Sales','https://jasper.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(99,0,66,'Free','$0','free',0,'Start Free','https://writesonic.com');
INSERT INTO "tools_pricing_tiers" VALUES(100,1,66,'Pro','$12/mo','monthly',1,'Go Pro','https://writesonic.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(101,2,66,'Enterprise','Custom','custom',0,'Contact Sales','https://writesonic.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(102,0,64,'Essential','$99/mo','monthly',0,'Start Essential','https://surferseo.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(103,1,64,'Scale','$219/mo','monthly',1,'Go Scale','https://surferseo.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(104,2,64,'Enterprise','Custom','custom',0,'Contact Sales','https://surferseo.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(105,0,65,'Essentials','$189/mo','monthly',0,'Start Essentials','https://clearscope.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(106,1,65,'Business','$399/mo','monthly',1,'Go Business','https://clearscope.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(107,2,65,'Enterprise','Custom','custom',0,'Contact Sales','https://clearscope.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(108,0,42,'Free','$0','free',0,'Try Free','https://firefly.adobe.com');
INSERT INTO "tools_pricing_tiers" VALUES(109,1,42,'Firefly Premium','$5/mo','monthly',1,'Go Premium','https://firefly.adobe.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(110,2,42,'Creative Cloud','$55+/mo','monthly',0,'Get Creative Cloud','https://adobe.com/creativecloud');
INSERT INTO "tools_pricing_tiers" VALUES(111,0,43,'Free','$0','free',0,'Start Free','https://canva.com');
INSERT INTO "tools_pricing_tiers" VALUES(112,1,43,'Canva Pro','$15/mo','monthly',1,'Go Pro','https://canva.com/pro');
INSERT INTO "tools_pricing_tiers" VALUES(113,0,41,'Starter','$0','free',0,'Start Free','https://figma.com');
INSERT INTO "tools_pricing_tiers" VALUES(114,1,41,'Professional','$15/editor/mo','monthly',1,'Go Pro','https://figma.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(115,2,41,'Organization','$45/editor/mo','monthly',0,'For Teams','https://figma.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(116,0,45,'Free','$0','free',0,'Start Free','https://gamma.app');
INSERT INTO "tools_pricing_tiers" VALUES(117,1,45,'Plus','$10/mo','monthly',1,'Go Plus','https://gamma.app/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(118,2,45,'Pro','$20/mo','monthly',0,'Go Pro','https://gamma.app/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(119,0,46,'Free','$0','free',0,'Try Free','https://tome.app');
INSERT INTO "tools_pricing_tiers" VALUES(120,1,46,'Professional','$16/mo','monthly',1,'Go Pro','https://tome.app/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(121,0,52,'Free','$0','free',0,'Start Free','https://framer.com');
INSERT INTO "tools_pricing_tiers" VALUES(122,1,52,'Mini','$5/mo','monthly',0,'Go Mini','https://framer.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(123,2,52,'Basic','$15/mo','monthly',1,'Go Basic','https://framer.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(124,3,52,'Pro','$30/mo','monthly',0,'Go Pro','https://framer.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(125,0,58,'Free','$0','free',0,'Start Free','https://make.com');
INSERT INTO "tools_pricing_tiers" VALUES(126,1,58,'Core','$9/mo','monthly',1,'Go Core','https://make.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(127,2,58,'Pro','$16/mo','monthly',0,'Go Pro','https://make.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(128,3,58,'Teams','$29/mo','monthly',0,'For Teams','https://make.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(129,0,59,'Self-Hosted','$0','free',1,'Self-Host Free','https://n8n.io');
INSERT INTO "tools_pricing_tiers" VALUES(130,1,59,'Cloud Starter','$20/mo','monthly',0,'Start Cloud','https://n8n.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(131,2,59,'Cloud Pro','$50/mo','monthly',0,'Go Pro','https://n8n.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(132,0,60,'Free','$0','free',0,'Add to Chrome','https://bardeen.ai');
INSERT INTO "tools_pricing_tiers" VALUES(133,1,60,'Pro','$10/mo','monthly',1,'Go Pro','https://bardeen.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(134,2,60,'Business','$15/user/mo','monthly',0,'For Teams','https://bardeen.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(135,0,39,'Free','$0','free',0,'Start Free','https://zapier.com');
INSERT INTO "tools_pricing_tiers" VALUES(136,1,39,'Starter','$20/mo','monthly',0,'Start Starter','https://zapier.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(137,2,39,'Professional','$49/mo','monthly',1,'Go Pro','https://zapier.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(138,3,39,'Team','$69/mo','monthly',0,'For Teams','https://zapier.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(139,0,1,'Free','$0','free',0,'Try Free','https://mubert.com');
INSERT INTO "tools_pricing_tiers" VALUES(140,1,1,'Creator','$14/mo','monthly',1,'Go Creator','https://mubert.com/render/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(141,2,1,'Pro','$39/mo','monthly',0,'Go Pro','https://mubert.com/render/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(142,0,5,'Free','$0','free',0,'Start Free','https://replit.com');
INSERT INTO "tools_pricing_tiers" VALUES(143,1,5,'Replit Core','$25/mo','monthly',1,'Go Core','https://replit.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(144,2,5,'Teams','$40/user/mo','monthly',0,'For Teams','https://replit.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(145,0,67,'Free','$0','free',0,'Start Free','https://lumalabs.ai');
INSERT INTO "tools_pricing_tiers" VALUES(146,1,67,'Pro','$30/mo','monthly',1,'Go Pro','https://lumalabs.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(147,0,48,'Free','$0','free',0,'Start Free','https://meshy.ai');
INSERT INTO "tools_pricing_tiers" VALUES(148,1,48,'Pro','$20/mo','monthly',1,'Go Pro','https://meshy.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(149,2,48,'Max','$60/mo','monthly',0,'Go Max','https://meshy.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(150,0,70,'Free','$0','free',0,'Try Free','https://tripo3d.ai');
INSERT INTO "tools_pricing_tiers" VALUES(151,1,70,'Pro','$20/mo','monthly',1,'Go Pro','https://tripo3d.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(152,0,75,'Free','$0','free',0,'Try Free','https://poe.com');
INSERT INTO "tools_pricing_tiers" VALUES(153,1,75,'Premium','$20/mo','monthly',1,'Go Premium','https://poe.com/subscribe');
INSERT INTO "tools_pricing_tiers" VALUES(154,0,74,'Free','$0','free',1,'Meet Pi','https://pi.ai');
INSERT INTO "tools_pricing_tiers" VALUES(155,0,76,'X Premium+','$16/mo','monthly',1,'Get Premium+','https://x.com/premium');
INSERT INTO "tools_pricing_tiers" VALUES(156,0,72,'Hobby','$10/mo','monthly',0,'Start Writing','https://sudowrite.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(157,1,72,'Professional','$25/mo','monthly',1,'Go Pro','https://sudowrite.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(158,2,72,'Max','$100/mo','monthly',0,'Go Max','https://sudowrite.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(159,0,53,'Free','$0','free',0,'Try Free','https://julius.ai');
INSERT INTO "tools_pricing_tiers" VALUES(160,1,53,'Pro','$20/mo','monthly',1,'Go Pro','https://julius.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(161,0,37,'Free','$0','free',1,'Download Free','https://warp.dev');
INSERT INTO "tools_pricing_tiers" VALUES(162,1,37,'Team','$22/user/mo','monthly',0,'For Teams','https://warp.dev/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(163,0,30,'Enterprise','Contact Sales','custom',1,'Contact Sales','https://harvey.ai');
INSERT INTO "tools_pricing_tiers" VALUES(164,0,38,'Starter','$149/mo','monthly',0,'Start','https://clay.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(165,1,38,'Explorer','$349/mo','monthly',1,'Explore','https://clay.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(166,2,38,'Pro','$800/mo','monthly',0,'Go Pro','https://clay.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(167,0,49,'Free','$0','free',1,'Start Free','https://spline.design');
INSERT INTO "tools_pricing_tiers" VALUES(168,1,49,'Pro','$9/mo','monthly',0,'Go Pro','https://spline.design/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(169,0,50,'AI Starter','$10/mo','monthly',0,'Start','https://10web.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(170,1,50,'AI Premium','$15/mo','monthly',1,'Go Premium','https://10web.io/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(171,0,51,'Starter','$12/mo','monthly',1,'Get Started','https://durable.co/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(172,1,51,'Business','$20/mo','monthly',0,'Go Business','https://durable.co/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(173,0,54,'Free','$0','free',0,'Try Free','https://equals.com');
INSERT INTO "tools_pricing_tiers" VALUES(174,1,54,'Pro','$49/user/mo','monthly',1,'Go Pro','https://equals.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(175,0,55,'Starter','$75/mo','monthly',0,'Start','https://obviously.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(176,1,55,'Growth','$250/mo','monthly',1,'Grow','https://obviously.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(177,0,56,'Starter','$50/mo','monthly',1,'Start','https://akkio.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(178,1,56,'Professional','$500/mo','monthly',0,'Go Pro','https://akkio.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(179,0,57,'Community','$0','free',0,'Try Free','https://hex.tech');
INSERT INTO "tools_pricing_tiers" VALUES(180,1,57,'Team','$45/user/mo','monthly',1,'For Teams','https://hex.tech/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(181,0,61,'Free','$0','free',0,'Try Free','https://relay.app');
INSERT INTO "tools_pricing_tiers" VALUES(182,1,61,'Starter','$15/mo','monthly',1,'Start','https://relay.app/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(183,0,62,'Self-Hosted','$0','free',1,'Self-Host','https://activepieces.com');
INSERT INTO "tools_pricing_tiers" VALUES(184,1,62,'Cloud','$30/mo','monthly',0,'Use Cloud','https://activepieces.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(185,0,9,'Free','$0','forever',0,'Start Free','https://maker.ai');
INSERT INTO "tools_pricing_tiers" VALUES(186,1,9,'Creator','$12/mo','monthly',1,'Upgrade','https://maker.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(187,2,9,'Pro Artist','$29/mo','monthly',0,'Go Pro','https://maker.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(188,0,17,'Free Trial','$0','forever',0,'Try Free','https://stability.ai');
INSERT INTO "tools_pricing_tiers" VALUES(189,1,17,'Pay As You Go','$0.002/image','usage',1,'Get Started','https://stability.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(190,2,17,'Enterprise','Custom','annual',0,'Contact Sales','https://stability.ai/enterprise');
INSERT INTO "tools_pricing_tiers" VALUES(191,0,68,'Pay Per Model','$15','per model',0,'Try Now','https://kaedim.com');
INSERT INTO "tools_pricing_tiers" VALUES(192,1,68,'Starter','$99/mo','monthly',1,'Subscribe','https://kaedim.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(193,2,68,'Pro','$299/mo','monthly',0,'Go Pro','https://kaedim.com/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(194,3,68,'Enterprise','Custom','annual',0,'Contact Sales','https://kaedim.com/enterprise');
INSERT INTO "tools_pricing_tiers" VALUES(195,0,69,'Free','$0','forever',0,'Start Free','https://csm.ai');
INSERT INTO "tools_pricing_tiers" VALUES(196,1,69,'Pro','$20/mo','monthly',1,'Upgrade','https://csm.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(197,2,69,'Team','$50/mo','monthly',0,'Team Plan','https://csm.ai/pricing');
INSERT INTO "tools_pricing_tiers" VALUES(198,3,69,'Enterprise','Custom','annual',0,'Contact Sales','https://csm.ai/enterprise');
CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_features" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "feature" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_pricing_tiers_features" VALUES(1,0,1,'Access to GPT-5.2 Instant');
INSERT INTO "tools_pricing_tiers_features" VALUES(2,1,1,'~10 messages per 5 hours');
INSERT INTO "tools_pricing_tiers_features" VALUES(3,2,1,'Web browsing capability');
INSERT INTO "tools_pricing_tiers_features" VALUES(4,0,2,'GPT-5.2 Thinking mode');
INSERT INTO "tools_pricing_tiers_features" VALUES(5,1,2,'5x higher usage limits');
INSERT INTO "tools_pricing_tiers_features" VALUES(6,2,2,'DALL-E 4 image generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(7,3,2,'Advanced Voice mode');
INSERT INTO "tools_pricing_tiers_features" VALUES(8,4,2,'Custom GPTs');
INSERT INTO "tools_pricing_tiers_features" VALUES(9,0,3,'Unlimited GPT-5.2 Pro access');
INSERT INTO "tools_pricing_tiers_features" VALUES(10,1,3,'Maximum reasoning compute');
INSERT INTO "tools_pricing_tiers_features" VALUES(11,2,3,'Sora 2 Pro video generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(12,0,6,'~200 image generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(13,1,6,'3 concurrent fast jobs');
INSERT INTO "tools_pricing_tiers_features" VALUES(14,2,6,'General commercial use');
INSERT INTO "tools_pricing_tiers_features" VALUES(15,0,7,'Unlimited Relax Mode');
INSERT INTO "tools_pricing_tiers_features" VALUES(16,1,7,'~15 GPU hours/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(17,2,7,'General commercial use');
INSERT INTO "tools_pricing_tiers_features" VALUES(18,0,8,'Stealth Mode (private)');
INSERT INTO "tools_pricing_tiers_features" VALUES(19,1,8,'~30 GPU hours/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(20,2,8,'12 concurrent fast jobs');
INSERT INTO "tools_pricing_tiers_features" VALUES(21,0,10,'Access to Claude 3.5 Sonnet');
INSERT INTO "tools_pricing_tiers_features" VALUES(22,1,10,'Limited daily messages');
INSERT INTO "tools_pricing_tiers_features" VALUES(23,2,10,'File uploads up to 10MB');
INSERT INTO "tools_pricing_tiers_features" VALUES(24,0,11,'Claude 3.5 Sonnet & Opus');
INSERT INTO "tools_pricing_tiers_features" VALUES(25,1,11,'5x more usage than Free');
INSERT INTO "tools_pricing_tiers_features" VALUES(26,2,11,'Priority access at peak times');
INSERT INTO "tools_pricing_tiers_features" VALUES(27,3,11,'Projects for organized work');
INSERT INTO "tools_pricing_tiers_features" VALUES(28,4,11,'200K context window');
INSERT INTO "tools_pricing_tiers_features" VALUES(29,0,12,'All Pro features');
INSERT INTO "tools_pricing_tiers_features" VALUES(30,1,12,'Higher usage limits');
INSERT INTO "tools_pricing_tiers_features" VALUES(31,2,12,'Admin dashboard');
INSERT INTO "tools_pricing_tiers_features" VALUES(32,3,12,'No training on your data');
INSERT INTO "tools_pricing_tiers_features" VALUES(33,0,14,'For verified students & OSS maintainers');
INSERT INTO "tools_pricing_tiers_features" VALUES(34,1,14,'Code completions in IDE');
INSERT INTO "tools_pricing_tiers_features" VALUES(35,2,14,'Copilot Chat');
INSERT INTO "tools_pricing_tiers_features" VALUES(36,0,15,'Code completions in all IDEs');
INSERT INTO "tools_pricing_tiers_features" VALUES(37,1,15,'Copilot Chat in IDE & mobile');
INSERT INTO "tools_pricing_tiers_features" VALUES(38,2,15,'CLI assistance');
INSERT INTO "tools_pricing_tiers_features" VALUES(39,3,15,'Security vulnerability filtering');
INSERT INTO "tools_pricing_tiers_features" VALUES(40,0,16,'All Individual features');
INSERT INTO "tools_pricing_tiers_features" VALUES(41,1,16,'Organization-wide policy management');
INSERT INTO "tools_pricing_tiers_features" VALUES(42,2,16,'Audit logs');
INSERT INTO "tools_pricing_tiers_features" VALUES(43,3,16,'Exclude specified files');
INSERT INTO "tools_pricing_tiers_features" VALUES(44,0,17,'All Business features');
INSERT INTO "tools_pricing_tiers_features" VALUES(45,1,17,'Fine-tuned models for your code');
INSERT INTO "tools_pricing_tiers_features" VALUES(46,2,17,'SAML SSO');
INSERT INTO "tools_pricing_tiers_features" VALUES(47,3,17,'IP indemnity');
INSERT INTO "tools_pricing_tiers_features" VALUES(48,0,18,'2000 completions/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(49,1,18,'50 slow premium requests/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(50,2,18,'Basic AI chat');
INSERT INTO "tools_pricing_tiers_features" VALUES(51,0,19,'Unlimited completions');
INSERT INTO "tools_pricing_tiers_features" VALUES(52,1,19,'500 fast premium requests/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(53,2,19,'Unlimited slow premium requests');
INSERT INTO "tools_pricing_tiers_features" VALUES(54,3,19,'Claude & GPT-4 access');
INSERT INTO "tools_pricing_tiers_features" VALUES(55,4,19,'Composer for multi-file edits');
INSERT INTO "tools_pricing_tiers_features" VALUES(56,0,20,'All Pro features');
INSERT INTO "tools_pricing_tiers_features" VALUES(57,1,20,'Centralized billing');
INSERT INTO "tools_pricing_tiers_features" VALUES(58,2,20,'Admin dashboard');
INSERT INTO "tools_pricing_tiers_features" VALUES(59,3,20,'Usage analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(60,4,20,'Privacy mode');
INSERT INTO "tools_pricing_tiers_features" VALUES(61,0,21,'DALL-E 3 via ChatGPT');
INSERT INTO "tools_pricing_tiers_features" VALUES(62,1,21,'Conversational image editing');
INSERT INTO "tools_pricing_tiers_features" VALUES(63,2,21,'All GPT-4 features included');
INSERT INTO "tools_pricing_tiers_features" VALUES(64,0,22,'Unlimited DALL-E generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(65,1,22,'Highest quality settings');
INSERT INTO "tools_pricing_tiers_features" VALUES(66,2,22,'Priority processing');
INSERT INTO "tools_pricing_tiers_features" VALUES(67,0,23,'1024x1024 resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(68,1,23,'Pay per generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(69,0,24,'1024x1792 or 1792x1024');
INSERT INTO "tools_pricing_tiers_features" VALUES(70,1,24,'Higher detail');
INSERT INTO "tools_pricing_tiers_features" VALUES(71,0,25,'Unlimited basic searches');
INSERT INTO "tools_pricing_tiers_features" VALUES(72,1,25,'5 Pro searches per day');
INSERT INTO "tools_pricing_tiers_features" VALUES(73,2,25,'Standard AI model');
INSERT INTO "tools_pricing_tiers_features" VALUES(74,3,25,'Cited sources');
INSERT INTO "tools_pricing_tiers_features" VALUES(75,0,26,'300+ Pro searches/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(76,1,26,'GPT-4, Claude 3, Sonar access');
INSERT INTO "tools_pricing_tiers_features" VALUES(77,2,26,'File upload & analysis');
INSERT INTO "tools_pricing_tiers_features" VALUES(78,3,26,'Image generation (DALL-E 3)');
INSERT INTO "tools_pricing_tiers_features" VALUES(79,4,26,'$5/mo API credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(80,0,27,'All Pro features');
INSERT INTO "tools_pricing_tiers_features" VALUES(81,1,27,'SSO & admin controls');
INSERT INTO "tools_pricing_tiers_features" VALUES(82,2,27,'Internal knowledge search');
INSERT INTO "tools_pricing_tiers_features" VALUES(83,0,28,'Sora 1 access');
INSERT INTO "tools_pricing_tiers_features" VALUES(84,1,28,'50 priority generations/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(85,2,28,'720p resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(86,3,28,'Up to 5 second clips');
INSERT INTO "tools_pricing_tiers_features" VALUES(87,0,29,'Sora 2 Pro access');
INSERT INTO "tools_pricing_tiers_features" VALUES(88,1,29,'Unlimited generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(89,2,29,'1080p resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(90,3,29,'Up to 60 second videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(91,4,29,'Priority processing');
INSERT INTO "tools_pricing_tiers_features" VALUES(92,5,29,'Image-to-video');
INSERT INTO "tools_pricing_tiers_features" VALUES(93,0,30,'10,000 characters/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(94,1,30,'Voice Library access');
INSERT INTO "tools_pricing_tiers_features" VALUES(95,2,30,'3 custom voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(96,0,31,'30,000 characters/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(97,1,31,'10 custom voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(98,2,31,'Instant voice cloning');
INSERT INTO "tools_pricing_tiers_features" VALUES(99,0,32,'100,000 characters/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(100,1,32,'30 custom voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(101,2,32,'Professional voice cloning');
INSERT INTO "tools_pricing_tiers_features" VALUES(102,3,32,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(103,0,33,'500,000 characters/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(104,1,33,'160 custom voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(105,2,33,'Higher quality audio');
INSERT INTO "tools_pricing_tiers_features" VALUES(106,3,33,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(107,0,34,'2,000,000 characters/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(108,1,34,'Unlimited custom voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(109,2,34,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(110,0,35,'50 credits/day (~10 songs)');
INSERT INTO "tools_pricing_tiers_features" VALUES(111,1,35,'2 concurrent generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(112,2,35,'Non-commercial use only');
INSERT INTO "tools_pricing_tiers_features" VALUES(113,3,35,'Shared generation queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(114,0,36,'2500 credits/month (~500 songs)');
INSERT INTO "tools_pricing_tiers_features" VALUES(115,1,36,'10 concurrent generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(116,2,36,'Commercial use license');
INSERT INTO "tools_pricing_tiers_features" VALUES(117,3,36,'Priority generation queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(118,0,37,'10000 credits/month (~2000 songs)');
INSERT INTO "tools_pricing_tiers_features" VALUES(119,1,37,'10 concurrent generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(120,2,37,'Commercial use license');
INSERT INTO "tools_pricing_tiers_features" VALUES(121,3,37,'Highest priority queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(122,0,38,'125 credits (one-time)');
INSERT INTO "tools_pricing_tiers_features" VALUES(123,1,38,'Gen-3 Alpha Turbo access');
INSERT INTO "tools_pricing_tiers_features" VALUES(124,2,38,'5 second max video length');
INSERT INTO "tools_pricing_tiers_features" VALUES(125,3,38,'720p exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(126,0,39,'625 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(127,1,39,'10 second videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(128,2,39,'1080p exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(129,0,40,'2250 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(130,1,40,'Gen-3 Alpha (full)');
INSERT INTO "tools_pricing_tiers_features" VALUES(131,2,40,'4K exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(132,3,40,'Custom watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(133,0,41,'6750 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(134,1,41,'All Standard features');
INSERT INTO "tools_pricing_tiers_features" VALUES(135,2,41,'Priority processing');
INSERT INTO "tools_pricing_tiers_features" VALUES(136,0,42,'Unlimited Gen-3 Turbo');
INSERT INTO "tools_pricing_tiers_features" VALUES(137,1,42,'15750 standard credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(138,2,42,'Dedicated support');
INSERT INTO "tools_pricing_tiers_features" VALUES(139,0,43,'Gemini 1.0 Pro model');
INSERT INTO "tools_pricing_tiers_features" VALUES(140,1,43,'Image understanding');
INSERT INTO "tools_pricing_tiers_features" VALUES(141,2,43,'Google services integration');
INSERT INTO "tools_pricing_tiers_features" VALUES(142,0,44,'Gemini 1.5 Pro model');
INSERT INTO "tools_pricing_tiers_features" VALUES(143,1,44,'1M token context window');
INSERT INTO "tools_pricing_tiers_features" VALUES(144,2,44,'Gemini in Gmail, Docs, etc.');
INSERT INTO "tools_pricing_tiers_features" VALUES(145,3,44,'2TB Google One storage');
INSERT INTO "tools_pricing_tiers_features" VALUES(146,0,45,'Unlimited generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(147,1,45,'Full privacy - runs offline');
INSERT INTO "tools_pricing_tiers_features" VALUES(148,2,45,'Custom models & LoRAs');
INSERT INTO "tools_pricing_tiers_features" VALUES(149,0,46,'Web interface');
INSERT INTO "tools_pricing_tiers_features" VALUES(150,1,46,'No GPU required');
INSERT INTO "tools_pricing_tiers_features" VALUES(151,0,47,'Unlimited AI requests');
INSERT INTO "tools_pricing_tiers_features" VALUES(152,1,47,'Works in all Notion pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(153,2,47,'Q&A across workspace');
INSERT INTO "tools_pricing_tiers_features" VALUES(154,0,48,'200 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(155,1,48,'shadcn/ui components');
INSERT INTO "tools_pricing_tiers_features" VALUES(156,0,49,'5000 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(157,1,49,'Private generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(158,0,50,'Limited free tokens');
INSERT INTO "tools_pricing_tiers_features" VALUES(159,1,50,'Full-stack app generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(160,0,51,'10M tokens/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(161,1,51,'One-click deploy');
INSERT INTO "tools_pricing_tiers_features" VALUES(162,0,52,'Free chat interface');
INSERT INTO "tools_pricing_tiers_features" VALUES(163,1,52,'DeepSeek V3 model');
INSERT INTO "tools_pricing_tiers_features" VALUES(164,0,53,'100x cheaper than GPT-4');
INSERT INTO "tools_pricing_tiers_features" VALUES(165,1,53,'OpenAI-compatible API');
INSERT INTO "tools_pricing_tiers_features" VALUES(166,0,54,'150 tokens/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(167,1,54,'Community models');
INSERT INTO "tools_pricing_tiers_features" VALUES(168,0,55,'8500 tokens/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(169,1,55,'Train 1 custom model');
INSERT INTO "tools_pricing_tiers_features" VALUES(170,0,56,'25000 tokens/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(171,1,56,'Train 3 custom models');
INSERT INTO "tools_pricing_tiers_features" VALUES(172,0,57,'1200 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(173,1,57,'Standard audio quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(174,2,57,'Non-commercial use');
INSERT INTO "tools_pricing_tiers_features" VALUES(175,0,58,'1200 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(176,1,58,'High-quality audio');
INSERT INTO "tools_pricing_tiers_features" VALUES(177,2,58,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(178,0,59,'4800 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(179,1,59,'Highest quality audio');
INSERT INTO "tools_pricing_tiers_features" VALUES(180,2,59,'Priority generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(181,0,60,'Fast generation (4 steps)');
INSERT INTO "tools_pricing_tiers_features" VALUES(182,1,60,'Apache 2.0 license');
INSERT INTO "tools_pricing_tiers_features" VALUES(183,2,60,'Good for rapid iteration');
INSERT INTO "tools_pricing_tiers_features" VALUES(184,0,61,'Higher quality (50 steps)');
INSERT INTO "tools_pricing_tiers_features" VALUES(185,1,61,'Non-commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(186,2,61,'Great for personal projects');
INSERT INTO "tools_pricing_tiers_features" VALUES(187,0,62,'Highest quality output');
INSERT INTO "tools_pricing_tiers_features" VALUES(188,1,62,'Commercial use allowed');
INSERT INTO "tools_pricing_tiers_features" VALUES(189,2,62,'API access via partners');
INSERT INTO "tools_pricing_tiers_features" VALUES(190,0,63,'10 images/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(191,1,63,'Standard quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(192,2,63,'Shared generation queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(193,0,64,'100 images/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(194,1,64,'Priority generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(195,2,64,'Private images');
INSERT INTO "tools_pricing_tiers_features" VALUES(196,0,65,'400 images/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(197,1,65,'Faster generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(198,2,65,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(199,0,66,'1000 images/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(200,1,66,'Fastest generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(201,2,66,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(202,0,67,'250 credits one-time');
INSERT INTO "tools_pricing_tiers_features" VALUES(203,1,67,'Basic video generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(204,2,67,'Watermarked output');
INSERT INTO "tools_pricing_tiers_features" VALUES(205,0,68,'700 monthly + unlimited slow');
INSERT INTO "tools_pricing_tiers_features" VALUES(206,1,68,'No watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(207,2,68,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(208,0,69,'2000 monthly + unlimited slow');
INSERT INTO "tools_pricing_tiers_features" VALUES(209,1,69,'Priority generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(210,2,69,'Higher resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(211,0,70,'Daily free credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(212,1,70,'Up to 5 second videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(213,2,70,'720p resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(214,0,71,'More monthly credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(215,1,71,'Up to 2 minute videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(216,2,71,'1080p resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(217,0,72,'Daily free credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(218,1,72,'Standard quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(219,2,72,'Basic features');
INSERT INTO "tools_pricing_tiers_features" VALUES(220,0,73,'More generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(221,1,73,'Higher resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(222,2,73,'Priority queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(223,0,74,'1080p exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(224,1,74,'AI auto-captions');
INSERT INTO "tools_pricing_tiers_features" VALUES(225,2,74,'Background removal');
INSERT INTO "tools_pricing_tiers_features" VALUES(226,3,74,'Text-to-speech');
INSERT INTO "tools_pricing_tiers_features" VALUES(227,0,75,'Brand kit');
INSERT INTO "tools_pricing_tiers_features" VALUES(228,1,75,'Premium stock content');
INSERT INTO "tools_pricing_tiers_features" VALUES(229,2,75,'Backup & sync');
INSERT INTO "tools_pricing_tiers_features" VALUES(230,0,76,'Basic auto-captions');
INSERT INTO "tools_pricing_tiers_features" VALUES(231,1,76,'Watermark on exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(232,2,76,'Limited features');
INSERT INTO "tools_pricing_tiers_features" VALUES(233,0,77,'AI eye contact correction');
INSERT INTO "tools_pricing_tiers_features" VALUES(234,1,77,'Filler word removal');
INSERT INTO "tools_pricing_tiers_features" VALUES(235,2,77,'No watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(236,3,77,'Premium caption styles');
INSERT INTO "tools_pricing_tiers_features" VALUES(237,0,78,'2GB storage');
INSERT INTO "tools_pricing_tiers_features" VALUES(238,1,78,'VEED watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(239,2,78,'10 min video length');
INSERT INTO "tools_pricing_tiers_features" VALUES(240,0,79,'25GB storage');
INSERT INTO "tools_pricing_tiers_features" VALUES(241,1,79,'No watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(242,2,79,'25 min videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(243,0,80,'100GB storage');
INSERT INTO "tools_pricing_tiers_features" VALUES(244,1,80,'Brand kit');
INSERT INTO "tools_pricing_tiers_features" VALUES(245,2,80,'2 hour videos');
INSERT INTO "tools_pricing_tiers_features" VALUES(246,0,81,'10 min AI video/week');
INSERT INTO "tools_pricing_tiers_features" VALUES(247,1,81,'InVideo watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(248,2,81,'iStock media library');
INSERT INTO "tools_pricing_tiers_features" VALUES(249,0,82,'50 min AI video/week');
INSERT INTO "tools_pricing_tiers_features" VALUES(250,1,82,'No watermark');
INSERT INTO "tools_pricing_tiers_features" VALUES(251,2,82,'Voice cloning');
INSERT INTO "tools_pricing_tiers_features" VALUES(252,0,83,'200 min AI video/week');
INSERT INTO "tools_pricing_tiers_features" VALUES(253,1,83,'Priority rendering');
INSERT INTO "tools_pricing_tiers_features" VALUES(254,2,83,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(255,0,84,'Unlimited chats');
INSERT INTO "tools_pricing_tiers_features" VALUES(256,1,84,'Create characters');
INSERT INTO "tools_pricing_tiers_features" VALUES(257,2,84,'Contains ads');
INSERT INTO "tools_pricing_tiers_features" VALUES(258,0,85,'Priority access');
INSERT INTO "tools_pricing_tiers_features" VALUES(259,1,85,'Longer memory');
INSERT INTO "tools_pricing_tiers_features" VALUES(260,2,85,'No ads');
INSERT INTO "tools_pricing_tiers_features" VALUES(261,3,85,'Faster responses');
INSERT INTO "tools_pricing_tiers_features" VALUES(262,0,86,'Unlimited notebooks');
INSERT INTO "tools_pricing_tiers_features" VALUES(263,1,86,'Audio Overview generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(264,2,86,'Source-grounded responses');
INSERT INTO "tools_pricing_tiers_features" VALUES(265,3,86,'PDF, Docs, web support');
INSERT INTO "tools_pricing_tiers_features" VALUES(266,0,87,'Grammar & spelling checks');
INSERT INTO "tools_pricing_tiers_features" VALUES(267,1,87,'Punctuation corrections');
INSERT INTO "tools_pricing_tiers_features" VALUES(268,2,87,'Basic tone detection');
INSERT INTO "tools_pricing_tiers_features" VALUES(269,0,88,'Full sentence rewrites');
INSERT INTO "tools_pricing_tiers_features" VALUES(270,1,88,'Tone adjustments');
INSERT INTO "tools_pricing_tiers_features" VALUES(271,2,88,'Plagiarism detection');
INSERT INTO "tools_pricing_tiers_features" VALUES(272,3,88,'GrammarlyGO AI');
INSERT INTO "tools_pricing_tiers_features" VALUES(273,0,89,'Style guides');
INSERT INTO "tools_pricing_tiers_features" VALUES(274,1,89,'Admin dashboard');
INSERT INTO "tools_pricing_tiers_features" VALUES(275,2,89,'Analytics & insights');
INSERT INTO "tools_pricing_tiers_features" VALUES(276,0,90,'10 rewrites/day');
INSERT INTO "tools_pricing_tiers_features" VALUES(277,1,90,'Basic tone options');
INSERT INTO "tools_pricing_tiers_features" VALUES(278,0,91,'Unlimited rewrites');
INSERT INTO "tools_pricing_tiers_features" VALUES(279,1,91,'All tone options');
INSERT INTO "tools_pricing_tiers_features" VALUES(280,2,91,'Sentence expansion');
INSERT INTO "tools_pricing_tiers_features" VALUES(281,3,91,'Summarization');
INSERT INTO "tools_pricing_tiers_features" VALUES(282,0,92,'Team management');
INSERT INTO "tools_pricing_tiers_features" VALUES(283,1,92,'Usage analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(284,2,92,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(285,0,93,'2000 words/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(286,1,93,'Limited templates');
INSERT INTO "tools_pricing_tiers_features" VALUES(287,2,93,'1 user');
INSERT INTO "tools_pricing_tiers_features" VALUES(288,0,94,'Unlimited words');
INSERT INTO "tools_pricing_tiers_features" VALUES(289,1,94,'All templates');
INSERT INTO "tools_pricing_tiers_features" VALUES(290,2,94,'Brand voices');
INSERT INTO "tools_pricing_tiers_features" VALUES(291,3,94,'Workflows');
INSERT INTO "tools_pricing_tiers_features" VALUES(292,0,95,'5 seats included');
INSERT INTO "tools_pricing_tiers_features" VALUES(293,1,95,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(294,2,95,'Usage analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(295,0,96,'1 seat');
INSERT INTO "tools_pricing_tiers_features" VALUES(296,1,96,'Brand voice');
INSERT INTO "tools_pricing_tiers_features" VALUES(297,2,96,'SEO mode');
INSERT INTO "tools_pricing_tiers_features" VALUES(298,0,97,'1 seat');
INSERT INTO "tools_pricing_tiers_features" VALUES(299,1,97,'All Creator features');
INSERT INTO "tools_pricing_tiers_features" VALUES(300,2,97,'More AI models');
INSERT INTO "tools_pricing_tiers_features" VALUES(301,3,97,'Integrations');
INSERT INTO "tools_pricing_tiers_features" VALUES(302,0,98,'Custom seats');
INSERT INTO "tools_pricing_tiers_features" VALUES(303,1,98,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(304,2,98,'SSO & security');
INSERT INTO "tools_pricing_tiers_features" VALUES(305,0,99,'10,000 words');
INSERT INTO "tools_pricing_tiers_features" VALUES(306,1,99,'GPT-3.5 quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(307,0,100,'100,000 words/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(308,1,100,'GPT-4 quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(309,2,100,'SEO tools');
INSERT INTO "tools_pricing_tiers_features" VALUES(310,0,101,'Custom limits');
INSERT INTO "tools_pricing_tiers_features" VALUES(311,1,101,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(312,2,101,'Team features');
INSERT INTO "tools_pricing_tiers_features" VALUES(313,0,102,'30 articles/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(314,1,102,'Content Editor');
INSERT INTO "tools_pricing_tiers_features" VALUES(315,2,102,'AI writing');
INSERT INTO "tools_pricing_tiers_features" VALUES(316,0,103,'100 articles/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(317,1,103,'Audit & SERP Analyzer');
INSERT INTO "tools_pricing_tiers_features" VALUES(318,2,103,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(319,0,104,'Custom limits');
INSERT INTO "tools_pricing_tiers_features" VALUES(320,1,104,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(321,2,104,'White-label');
INSERT INTO "tools_pricing_tiers_features" VALUES(322,0,105,'100 content credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(323,1,105,'Content grading');
INSERT INTO "tools_pricing_tiers_features" VALUES(324,2,105,'Google Docs add-on');
INSERT INTO "tools_pricing_tiers_features" VALUES(325,0,106,'300 content credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(326,1,106,'WordPress plugin');
INSERT INTO "tools_pricing_tiers_features" VALUES(327,2,106,'Team seats');
INSERT INTO "tools_pricing_tiers_features" VALUES(328,0,107,'Custom credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(329,1,107,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(330,2,107,'Dedicated support');
INSERT INTO "tools_pricing_tiers_features" VALUES(331,0,108,'25 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(332,1,108,'Commercial use');
INSERT INTO "tools_pricing_tiers_features" VALUES(333,2,108,'Web access only');
INSERT INTO "tools_pricing_tiers_features" VALUES(334,0,109,'100 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(335,1,109,'IP indemnification');
INSERT INTO "tools_pricing_tiers_features" VALUES(336,2,109,'Premium models');
INSERT INTO "tools_pricing_tiers_features" VALUES(337,0,110,'Firefly in all apps');
INSERT INTO "tools_pricing_tiers_features" VALUES(338,1,110,'1000+ credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(339,2,110,'Full Adobe apps');
INSERT INTO "tools_pricing_tiers_features" VALUES(340,0,111,'Limited AI features');
INSERT INTO "tools_pricing_tiers_features" VALUES(341,1,111,'Basic Magic Write');
INSERT INTO "tools_pricing_tiers_features" VALUES(342,2,111,'Core design features');
INSERT INTO "tools_pricing_tiers_features" VALUES(343,0,112,'Full Magic Studio');
INSERT INTO "tools_pricing_tiers_features" VALUES(344,1,112,'Magic Design (unlimited)');
INSERT INTO "tools_pricing_tiers_features" VALUES(345,2,112,'Background Remover');
INSERT INTO "tools_pricing_tiers_features" VALUES(346,3,112,'Brand Kit');
INSERT INTO "tools_pricing_tiers_features" VALUES(347,0,113,'3 projects');
INSERT INTO "tools_pricing_tiers_features" VALUES(348,1,113,'Basic AI features');
INSERT INTO "tools_pricing_tiers_features" VALUES(349,0,114,'Unlimited projects');
INSERT INTO "tools_pricing_tiers_features" VALUES(350,1,114,'Team libraries');
INSERT INTO "tools_pricing_tiers_features" VALUES(351,2,114,'Full AI features');
INSERT INTO "tools_pricing_tiers_features" VALUES(352,0,115,'Advanced AI');
INSERT INTO "tools_pricing_tiers_features" VALUES(353,1,115,'Design system analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(354,2,115,'SSO & governance');
INSERT INTO "tools_pricing_tiers_features" VALUES(355,0,116,'400 AI credits');
INSERT INTO "tools_pricing_tiers_features" VALUES(356,1,116,'Gamma branding');
INSERT INTO "tools_pricing_tiers_features" VALUES(357,2,116,'Basic templates');
INSERT INTO "tools_pricing_tiers_features" VALUES(358,0,117,'Unlimited AI');
INSERT INTO "tools_pricing_tiers_features" VALUES(359,1,117,'No Gamma branding');
INSERT INTO "tools_pricing_tiers_features" VALUES(360,2,117,'Export to PDF/PPT');
INSERT INTO "tools_pricing_tiers_features" VALUES(361,0,118,'Custom fonts');
INSERT INTO "tools_pricing_tiers_features" VALUES(362,1,118,'Analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(363,2,118,'Password protection');
INSERT INTO "tools_pricing_tiers_features" VALUES(364,0,119,'Limited pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(365,1,119,'Basic AI features');
INSERT INTO "tools_pricing_tiers_features" VALUES(366,2,119,'Tome branding');
INSERT INTO "tools_pricing_tiers_features" VALUES(367,0,120,'Unlimited AI generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(368,1,120,'No branding');
INSERT INTO "tools_pricing_tiers_features" VALUES(369,2,120,'Custom branding');
INSERT INTO "tools_pricing_tiers_features" VALUES(370,3,120,'Export options');
INSERT INTO "tools_pricing_tiers_features" VALUES(371,0,121,'Framer subdomain');
INSERT INTO "tools_pricing_tiers_features" VALUES(372,1,121,'2 pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(373,2,121,'AI generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(374,0,122,'Custom domain');
INSERT INTO "tools_pricing_tiers_features" VALUES(375,1,122,'3 pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(376,2,122,'No Framer badge');
INSERT INTO "tools_pricing_tiers_features" VALUES(377,0,123,'150 pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(378,1,123,'CMS collections');
INSERT INTO "tools_pricing_tiers_features" VALUES(379,2,123,'Form submissions');
INSERT INTO "tools_pricing_tiers_features" VALUES(380,0,124,'300 pages');
INSERT INTO "tools_pricing_tiers_features" VALUES(381,1,124,'Analytics');
INSERT INTO "tools_pricing_tiers_features" VALUES(382,2,124,'Password protection');
INSERT INTO "tools_pricing_tiers_features" VALUES(383,0,125,'1,000 ops/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(384,1,125,'2 active scenarios');
INSERT INTO "tools_pricing_tiers_features" VALUES(385,0,126,'10,000 ops/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(386,1,126,'Unlimited scenarios');
INSERT INTO "tools_pricing_tiers_features" VALUES(387,2,126,'Access to all apps');
INSERT INTO "tools_pricing_tiers_features" VALUES(388,0,127,'10,000 ops/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(389,1,127,'Priority execution');
INSERT INTO "tools_pricing_tiers_features" VALUES(390,2,127,'Custom variables');
INSERT INTO "tools_pricing_tiers_features" VALUES(391,0,128,'10,000 ops/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(392,1,128,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(393,2,128,'Shared scenarios');
INSERT INTO "tools_pricing_tiers_features" VALUES(394,0,129,'Unlimited executions');
INSERT INTO "tools_pricing_tiers_features" VALUES(395,1,129,'Full source code');
INSERT INTO "tools_pricing_tiers_features" VALUES(396,2,129,'Your infrastructure');
INSERT INTO "tools_pricing_tiers_features" VALUES(397,0,130,'2,500 executions/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(398,1,130,'Managed hosting');
INSERT INTO "tools_pricing_tiers_features" VALUES(399,2,130,'Auto-updates');
INSERT INTO "tools_pricing_tiers_features" VALUES(400,0,131,'10,000 executions/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(401,1,131,'SSO');
INSERT INTO "tools_pricing_tiers_features" VALUES(402,2,131,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(403,0,132,'Unlimited basic automations');
INSERT INTO "tools_pricing_tiers_features" VALUES(404,1,132,'Manual triggers');
INSERT INTO "tools_pricing_tiers_features" VALUES(405,2,132,'Basic integrations');
INSERT INTO "tools_pricing_tiers_features" VALUES(406,0,133,'Premium automations');
INSERT INTO "tools_pricing_tiers_features" VALUES(407,1,133,'Auto-triggers');
INSERT INTO "tools_pricing_tiers_features" VALUES(408,2,133,'AI automation builder');
INSERT INTO "tools_pricing_tiers_features" VALUES(409,0,134,'Team sharing');
INSERT INTO "tools_pricing_tiers_features" VALUES(410,1,134,'Admin controls');
INSERT INTO "tools_pricing_tiers_features" VALUES(411,2,134,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(412,0,135,'100 tasks/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(413,1,135,'5 Zaps');
INSERT INTO "tools_pricing_tiers_features" VALUES(414,2,135,'Single-step Zaps');
INSERT INTO "tools_pricing_tiers_features" VALUES(415,0,136,'750 tasks/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(416,1,136,'Multi-step Zaps');
INSERT INTO "tools_pricing_tiers_features" VALUES(417,2,136,'Filters');
INSERT INTO "tools_pricing_tiers_features" VALUES(418,0,137,'2,000 tasks/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(419,1,137,'Unlimited Zaps');
INSERT INTO "tools_pricing_tiers_features" VALUES(420,2,137,'Custom logic');
INSERT INTO "tools_pricing_tiers_features" VALUES(421,0,138,'2,000 tasks/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(422,1,138,'Shared workspace');
INSERT INTO "tools_pricing_tiers_features" VALUES(423,2,138,'User permissions');
INSERT INTO "tools_pricing_tiers_features" VALUES(424,0,139,'Personal use only');
INSERT INTO "tools_pricing_tiers_features" VALUES(425,1,139,'Mubert attribution required');
INSERT INTO "tools_pricing_tiers_features" VALUES(426,0,140,'Commercial use');
INSERT INTO "tools_pricing_tiers_features" VALUES(427,1,140,'No attribution');
INSERT INTO "tools_pricing_tiers_features" VALUES(428,2,140,'Unlimited downloads');
INSERT INTO "tools_pricing_tiers_features" VALUES(429,0,141,'Extended license');
INSERT INTO "tools_pricing_tiers_features" VALUES(430,1,141,'Broadcast rights');
INSERT INTO "tools_pricing_tiers_features" VALUES(431,2,141,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(432,0,142,'Basic AI assistance');
INSERT INTO "tools_pricing_tiers_features" VALUES(433,1,142,'Limited compute');
INSERT INTO "tools_pricing_tiers_features" VALUES(434,2,142,'Public Repls only');
INSERT INTO "tools_pricing_tiers_features" VALUES(435,0,143,'Advanced AI Agent');
INSERT INTO "tools_pricing_tiers_features" VALUES(436,1,143,'Private Repls');
INSERT INTO "tools_pricing_tiers_features" VALUES(437,2,143,'Boosted compute');
INSERT INTO "tools_pricing_tiers_features" VALUES(438,0,144,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(439,1,144,'Shared projects');
INSERT INTO "tools_pricing_tiers_features" VALUES(440,2,144,'Admin controls');
INSERT INTO "tools_pricing_tiers_features" VALUES(441,0,145,'Limited captures');
INSERT INTO "tools_pricing_tiers_features" VALUES(442,1,145,'Basic export options');
INSERT INTO "tools_pricing_tiers_features" VALUES(443,0,146,'Unlimited captures');
INSERT INTO "tools_pricing_tiers_features" VALUES(444,1,146,'High-res export');
INSERT INTO "tools_pricing_tiers_features" VALUES(445,2,146,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(446,0,147,'200 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(447,1,147,'Basic textures');
INSERT INTO "tools_pricing_tiers_features" VALUES(448,0,148,'1000 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(449,1,148,'High-res textures');
INSERT INTO "tools_pricing_tiers_features" VALUES(450,2,148,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(451,0,149,'3500 credits/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(452,1,149,'Priority generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(453,2,149,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(454,0,150,'Limited generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(455,1,150,'Basic export');
INSERT INTO "tools_pricing_tiers_features" VALUES(456,0,151,'More generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(457,1,151,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(458,2,151,'Priority queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(459,0,152,'Limited daily messages');
INSERT INTO "tools_pricing_tiers_features" VALUES(460,1,152,'Access to free models');
INSERT INTO "tools_pricing_tiers_features" VALUES(461,0,153,'Unlimited messages');
INSERT INTO "tools_pricing_tiers_features" VALUES(462,1,153,'GPT-4, Claude, Llama');
INSERT INTO "tools_pricing_tiers_features" VALUES(463,2,153,'Create custom bots');
INSERT INTO "tools_pricing_tiers_features" VALUES(464,0,154,'Unlimited conversations');
INSERT INTO "tools_pricing_tiers_features" VALUES(465,1,154,'Voice conversations');
INSERT INTO "tools_pricing_tiers_features" VALUES(466,2,154,'Mobile apps');
INSERT INTO "tools_pricing_tiers_features" VALUES(467,0,155,'Grok access');
INSERT INTO "tools_pricing_tiers_features" VALUES(468,1,155,'Real-time X data');
INSERT INTO "tools_pricing_tiers_features" VALUES(469,2,155,'Fun mode personality');
INSERT INTO "tools_pricing_tiers_features" VALUES(470,3,155,'X Premium+ benefits');
INSERT INTO "tools_pricing_tiers_features" VALUES(471,0,156,'30,000 words/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(472,1,156,'Write, Describe, Brainstorm');
INSERT INTO "tools_pricing_tiers_features" VALUES(473,0,157,'90,000 words/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(474,1,157,'Story Engine');
INSERT INTO "tools_pricing_tiers_features" VALUES(475,2,157,'Canvas visualization');
INSERT INTO "tools_pricing_tiers_features" VALUES(476,0,158,'300,000 words/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(477,1,158,'All features');
INSERT INTO "tools_pricing_tiers_features" VALUES(478,2,158,'Priority support');
INSERT INTO "tools_pricing_tiers_features" VALUES(479,0,159,'Limited queries');
INSERT INTO "tools_pricing_tiers_features" VALUES(480,1,159,'Basic visualizations');
INSERT INTO "tools_pricing_tiers_features" VALUES(481,0,160,'Unlimited queries');
INSERT INTO "tools_pricing_tiers_features" VALUES(482,1,160,'Advanced visualizations');
INSERT INTO "tools_pricing_tiers_features" VALUES(483,2,160,'Data connections');
INSERT INTO "tools_pricing_tiers_features" VALUES(484,0,161,'AI command suggestions');
INSERT INTO "tools_pricing_tiers_features" VALUES(485,1,161,'Error explanations');
INSERT INTO "tools_pricing_tiers_features" VALUES(486,2,161,'Modern interface');
INSERT INTO "tools_pricing_tiers_features" VALUES(487,0,162,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(488,1,162,'Shared workflows');
INSERT INTO "tools_pricing_tiers_features" VALUES(489,2,162,'Admin controls');
INSERT INTO "tools_pricing_tiers_features" VALUES(490,0,163,'Legal research');
INSERT INTO "tools_pricing_tiers_features" VALUES(491,1,163,'Document analysis');
INSERT INTO "tools_pricing_tiers_features" VALUES(492,2,163,'Contract review');
INSERT INTO "tools_pricing_tiers_features" VALUES(493,0,164,'2000 enrichments/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(494,1,164,'Core integrations');
INSERT INTO "tools_pricing_tiers_features" VALUES(495,0,165,'10000 enrichments/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(496,1,165,'AI research');
INSERT INTO "tools_pricing_tiers_features" VALUES(497,0,166,'50000 enrichments/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(498,1,166,'Advanced workflows');
INSERT INTO "tools_pricing_tiers_features" VALUES(499,0,167,'Full 3D editor');
INSERT INTO "tools_pricing_tiers_features" VALUES(500,1,167,'AI generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(501,0,168,'Private projects');
INSERT INTO "tools_pricing_tiers_features" VALUES(502,1,168,'Export options');
INSERT INTO "tools_pricing_tiers_features" VALUES(503,0,169,'1 website');
INSERT INTO "tools_pricing_tiers_features" VALUES(504,1,169,'AI generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(505,0,170,'3 websites');
INSERT INTO "tools_pricing_tiers_features" VALUES(506,1,170,'Premium hosting');
INSERT INTO "tools_pricing_tiers_features" VALUES(507,0,171,'AI website generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(508,1,171,'Custom domain');
INSERT INTO "tools_pricing_tiers_features" VALUES(509,0,172,'CRM included');
INSERT INTO "tools_pricing_tiers_features" VALUES(510,1,172,'Invoice tools');
INSERT INTO "tools_pricing_tiers_features" VALUES(511,0,173,'Basic spreadsheets');
INSERT INTO "tools_pricing_tiers_features" VALUES(512,0,174,'SQL connections');
INSERT INTO "tools_pricing_tiers_features" VALUES(513,1,174,'AI analysis');
INSERT INTO "tools_pricing_tiers_features" VALUES(514,0,175,'10 predictions');
INSERT INTO "tools_pricing_tiers_features" VALUES(515,1,175,'Basic models');
INSERT INTO "tools_pricing_tiers_features" VALUES(516,0,176,'50 predictions');
INSERT INTO "tools_pricing_tiers_features" VALUES(517,1,176,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(518,0,177,'1000 predictions/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(519,0,178,'10000 predictions/month');
INSERT INTO "tools_pricing_tiers_features" VALUES(520,1,178,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(521,0,179,'Personal notebooks');
INSERT INTO "tools_pricing_tiers_features" VALUES(522,0,180,'Team collaboration');
INSERT INTO "tools_pricing_tiers_features" VALUES(523,1,180,'Scheduled runs');
INSERT INTO "tools_pricing_tiers_features" VALUES(524,0,181,'Limited workflows');
INSERT INTO "tools_pricing_tiers_features" VALUES(525,0,182,'Unlimited workflows');
INSERT INTO "tools_pricing_tiers_features" VALUES(526,1,182,'Human steps');
INSERT INTO "tools_pricing_tiers_features" VALUES(527,0,183,'Unlimited tasks');
INSERT INTO "tools_pricing_tiers_features" VALUES(528,0,184,'Managed hosting');
INSERT INTO "tools_pricing_tiers_features" VALUES(529,0,185,'50 generations per day');
INSERT INTO "tools_pricing_tiers_features" VALUES(530,1,185,'Basic styles and models');
INSERT INTO "tools_pricing_tiers_features" VALUES(531,2,185,'Community gallery access');
INSERT INTO "tools_pricing_tiers_features" VALUES(532,0,186,'500 generations per day');
INSERT INTO "tools_pricing_tiers_features" VALUES(533,1,186,'All styles and models');
INSERT INTO "tools_pricing_tiers_features" VALUES(534,2,186,'Private galleries');
INSERT INTO "tools_pricing_tiers_features" VALUES(535,3,186,'Priority queue');
INSERT INTO "tools_pricing_tiers_features" VALUES(536,0,187,'Unlimited generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(537,1,187,'Commercial license');
INSERT INTO "tools_pricing_tiers_features" VALUES(538,2,187,'Custom model training');
INSERT INTO "tools_pricing_tiers_features" VALUES(539,3,187,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(540,0,188,'25 free credits to start');
INSERT INTO "tools_pricing_tiers_features" VALUES(541,1,188,'Access to all public models');
INSERT INTO "tools_pricing_tiers_features" VALUES(542,2,188,'API documentation');
INSERT INTO "tools_pricing_tiers_features" VALUES(543,0,189,'SDXL from $0.002/image');
INSERT INTO "tools_pricing_tiers_features" VALUES(544,1,189,'SD3 from $0.035/image');
INSERT INTO "tools_pricing_tiers_features" VALUES(545,2,189,'Image upscaling');
INSERT INTO "tools_pricing_tiers_features" VALUES(546,3,189,'No commitment');
INSERT INTO "tools_pricing_tiers_features" VALUES(547,0,190,'Volume discounts');
INSERT INTO "tools_pricing_tiers_features" VALUES(548,1,190,'Custom model fine-tuning');
INSERT INTO "tools_pricing_tiers_features" VALUES(549,2,190,'Dedicated infrastructure');
INSERT INTO "tools_pricing_tiers_features" VALUES(550,3,190,'SLA guarantees');
INSERT INTO "tools_pricing_tiers_features" VALUES(551,0,191,'Single model generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(552,1,191,'Standard quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(553,2,191,'FBX and OBJ exports');
INSERT INTO "tools_pricing_tiers_features" VALUES(554,0,192,'10 models per month');
INSERT INTO "tools_pricing_tiers_features" VALUES(555,1,192,'High quality output');
INSERT INTO "tools_pricing_tiers_features" VALUES(556,2,192,'All export formats');
INSERT INTO "tools_pricing_tiers_features" VALUES(557,3,192,'Priority processing');
INSERT INTO "tools_pricing_tiers_features" VALUES(558,0,193,'50 models per month');
INSERT INTO "tools_pricing_tiers_features" VALUES(559,1,193,'Maximum quality');
INSERT INTO "tools_pricing_tiers_features" VALUES(560,2,193,'Texture generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(561,3,193,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(562,0,194,'Unlimited models');
INSERT INTO "tools_pricing_tiers_features" VALUES(563,1,194,'Custom pipeline');
INSERT INTO "tools_pricing_tiers_features" VALUES(564,2,194,'Dedicated support');
INSERT INTO "tools_pricing_tiers_features" VALUES(565,0,195,'10 models per month');
INSERT INTO "tools_pricing_tiers_features" VALUES(566,1,195,'Standard resolution');
INSERT INTO "tools_pricing_tiers_features" VALUES(567,2,195,'GLB export');
INSERT INTO "tools_pricing_tiers_features" VALUES(568,0,196,'100 models per month');
INSERT INTO "tools_pricing_tiers_features" VALUES(569,1,196,'High resolution output');
INSERT INTO "tools_pricing_tiers_features" VALUES(570,2,196,'All export formats');
INSERT INTO "tools_pricing_tiers_features" VALUES(571,3,196,'Texture generation');
INSERT INTO "tools_pricing_tiers_features" VALUES(572,0,197,'500 models per month');
INSERT INTO "tools_pricing_tiers_features" VALUES(573,1,197,'3 team members');
INSERT INTO "tools_pricing_tiers_features" VALUES(574,2,197,'Shared workspace');
INSERT INTO "tools_pricing_tiers_features" VALUES(575,3,197,'API access');
INSERT INTO "tools_pricing_tiers_features" VALUES(576,0,198,'Unlimited generations');
INSERT INTO "tools_pricing_tiers_features" VALUES(577,1,198,'Custom model training');
INSERT INTO "tools_pricing_tiers_features" VALUES(578,2,198,'On-premise deployment');
CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_limitations" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "limitation" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE IF NOT EXISTS "tools_pros" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "description" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_pros" VALUES(1,0,25,'Best-in-Class Language Understanding','Consistently outperforms competitors on natural language benchmarks with remarkable accuracy.');
INSERT INTO "tools_pros" VALUES(2,1,25,'Massive App Ecosystem','Over 3 million custom GPTs available. Integrates with hundreds of third-party tools.');
INSERT INTO "tools_pros" VALUES(3,2,25,'Generous Free Tier','Free access to GPT-5.2 Instant is legitimately useful, not just a trial.');
INSERT INTO "tools_pros" VALUES(4,3,25,'Multimodal Capabilities','Can generate text, images (DALL-E), audio, and video (Sora).');
INSERT INTO "tools_pros" VALUES(5,4,25,'Enterprise-Ready','Used by 92% of Fortune 100. Robust security and compliance features.');
INSERT INTO "tools_pros" VALUES(6,0,18,'Unmatched Aesthetic Quality','Produces the most visually stunning, coherent AI art. Natural lighting and composition.');
INSERT INTO "tools_pros" VALUES(7,1,18,'Profitable and Bootstrapped','$200M+ ARR with no VC funding. Highly sustainable business model.');
INSERT INTO "tools_pros" VALUES(8,2,18,'Active Community','21M+ users sharing prompts, techniques, and inspiration on Discord.');
INSERT INTO "tools_pros" VALUES(9,3,18,'Continuous Improvement','V6 introduced major quality and text-in-image improvements.');
INSERT INTO "tools_pros" VALUES(10,0,23,'Industry-Leading Context Window','200K tokens means Claude can process entire books, codebases, or document sets in a single conversation.');
INSERT INTO "tools_pros" VALUES(11,1,23,'Superior Long-Form Analysis','Excels at synthesizing complex information, producing coherent long documents, and maintaining context.');
INSERT INTO "tools_pros" VALUES(12,2,23,'Thoughtful, Nuanced Responses','Constitutional AI training produces more balanced, careful answers that consider multiple perspectives.');
INSERT INTO "tools_pros" VALUES(13,3,23,'Excellent at Following Instructions','Better at adhering to complex, multi-part instructions and maintaining specified formats.');
INSERT INTO "tools_pros" VALUES(14,4,23,'Strong Coding Capabilities','Claude 3.5 Sonnet rivals GPT-4 on coding benchmarks, with excellent debugging skills.');
INSERT INTO "tools_pros" VALUES(15,0,8,'Best-in-Class IDE Integration','Works seamlessly in VS Code, JetBrains, Neovim, and Visual Studio with minimal setup.');
INSERT INTO "tools_pros" VALUES(16,1,8,'Excellent Context Understanding','Analyzes your entire codebase to provide relevant suggestions that match your coding style.');
INSERT INTO "tools_pros" VALUES(17,2,8,'Copilot Chat','Conversational AI in your IDE for explaining code, generating tests, and debugging.');
INSERT INTO "tools_pros" VALUES(18,3,8,'Free for Students','Verified students and open source maintainers get free access.');
INSERT INTO "tools_pros" VALUES(19,4,8,'GitHub Ecosystem Integration','Tight integration with GitHub repos, PRs, and Actions workflows.');
INSERT INTO "tools_pros" VALUES(20,0,7,'Composer for Multi-File Changes','AI can make coordinated changes across multiple files - a game-changer for refactoring.');
INSERT INTO "tools_pros" VALUES(21,1,7,'Deep Codebase Understanding','Indexes your entire project to provide context-aware suggestions and answers.');
INSERT INTO "tools_pros" VALUES(22,2,7,'Multiple AI Models','Choose between Claude and GPT-4 based on task requirements.');
INSERT INTO "tools_pros" VALUES(23,3,7,'VS Code Compatibility','Fork of VS Code means your extensions and settings largely work.');
INSERT INTO "tools_pros" VALUES(24,4,7,'Agent-Like Capabilities','Can browse documentation, run terminal commands, and iterate on errors.');
INSERT INTO "tools_pros" VALUES(25,0,24,'Best Prompt Adherence','DALL-E 3 actually follows complex, detailed prompts accurately - a major improvement over competitors.');
INSERT INTO "tools_pros" VALUES(26,1,24,'Legible Text in Images','Can generate readable text, signs, and typography - a unique strength among AI image generators.');
INSERT INTO "tools_pros" VALUES(27,2,24,'ChatGPT Integration','Natural language conversation to create and iterate on images. No prompt engineering needed.');
INSERT INTO "tools_pros" VALUES(28,3,24,'Safety & Moderation','Built-in safeguards prevent generating harmful content while allowing creative freedom.');
INSERT INTO "tools_pros" VALUES(29,4,24,'Included in ChatGPT Plus','No separate subscription needed if you already pay for ChatGPT.');
INSERT INTO "tools_pros" VALUES(30,0,20,'Inline Citations','Every claim links to its source, making fact-checking and verification effortless.');
INSERT INTO "tools_pros" VALUES(31,1,20,'Real-Time Information','Searches the live web, not just training data. Always current.');
INSERT INTO "tools_pros" VALUES(32,2,20,'Generous Free Tier','Unlimited basic searches free. Pro searches (5/day) also included free.');
INSERT INTO "tools_pros" VALUES(33,3,20,'Focus Mode','Search academic papers, Reddit, YouTube, or specific domains only.');
INSERT INTO "tools_pros" VALUES(34,4,20,'Multiple AI Models','Pro includes GPT-4, Claude 3, and Perplexity''s own Sonar model.');
INSERT INTO "tools_pros" VALUES(35,0,32,'Unmatched Video Quality','Produces the most realistic AI-generated video available - often indistinguishable from real footage.');
INSERT INTO "tools_pros" VALUES(36,1,32,'Long-Form Generation','Up to 60 seconds with Pro - far longer than competitors'' 4-10 second limits.');
INSERT INTO "tools_pros" VALUES(37,2,32,'Physics Understanding','Accurately simulates real-world physics, lighting, and object interactions.');
INSERT INTO "tools_pros" VALUES(38,3,32,'Complex Camera Control','Can specify dolly shots, tracking, drone-style movements in prompts.');
INSERT INTO "tools_pros" VALUES(39,4,32,'ChatGPT Integration','Use natural language to describe and iterate on videos.');
INSERT INTO "tools_pros" VALUES(40,0,2,'Most Natural-Sounding AI Voices','Industry-leading quality that''s often indistinguishable from human speech.');
INSERT INTO "tools_pros" VALUES(41,1,2,'Excellent Voice Cloning','Clone any voice with just a few minutes of sample audio with remarkable accuracy.');
INSERT INTO "tools_pros" VALUES(42,2,2,'Huge Voice Library','Thousands of pre-made voices across languages, accents, and speaking styles.');
INSERT INTO "tools_pros" VALUES(43,3,2,'Emotion & Style Control','Fine-tune voice delivery with emotion, pacing, and emphasis controls.');
INSERT INTO "tools_pros" VALUES(44,4,2,'Multi-Language Support','29 languages with natural-sounding speech in each.');
INSERT INTO "tools_pros" VALUES(45,0,4,'Complete Song Generation','Creates full songs with vocals, lyrics, and instrumentals - not just beats or melodies.');
INSERT INTO "tools_pros" VALUES(46,1,4,'Incredibly Easy to Use','Just describe your song in plain language. No musical knowledge required.');
INSERT INTO "tools_pros" VALUES(47,2,4,'Surprisingly Good Quality','Songs often sound professionally produced with catchy melodies and coherent lyrics.');
INSERT INTO "tools_pros" VALUES(48,3,4,'Generous Free Tier','50 credits daily lets you experiment extensively without paying.');
INSERT INTO "tools_pros" VALUES(49,4,4,'Genre Versatility','Generates convincing songs across pop, rock, jazz, hip-hop, country, and more.');
INSERT INTO "tools_pros" VALUES(50,0,19,'Professional-Grade Quality','Gen-3 produces video quality suitable for commercial and broadcast use.');
INSERT INTO "tools_pros" VALUES(51,1,19,'Comprehensive Tool Suite','Beyond video generation: inpainting, motion tracking, green screen, and more.');
INSERT INTO "tools_pros" VALUES(52,2,19,'Proven Track Record','Used in award-winning films and by major studios - battle-tested technology.');
INSERT INTO "tools_pros" VALUES(53,3,19,'Intuitive Interface','Browser-based editor that''s accessible yet powerful for professionals.');
INSERT INTO "tools_pros" VALUES(54,4,19,'Fast Iteration','Quick generation times allow rapid creative exploration.');
INSERT INTO "tools_pros" VALUES(55,0,36,'Deep Google Integration','Works seamlessly with Gmail, Docs, Sheets, Drive, and other Google services.');
INSERT INTO "tools_pros" VALUES(56,1,36,'Massive Context Window','1M tokens - can process entire books or codebases in a single conversation.');
INSERT INTO "tools_pros" VALUES(57,2,36,'Multimodal Capabilities','Understands text, images, video, and audio natively.');
INSERT INTO "tools_pros" VALUES(58,3,36,'Includes Google One Storage','Advanced plan includes 2TB cloud storage - great value.');
INSERT INTO "tools_pros" VALUES(59,0,22,'Completely Free Locally','Run unlimited generations on your own hardware with zero ongoing cost.');
INSERT INTO "tools_pros" VALUES(60,1,22,'Open Source & Private','Full control over your data. No content policies or restrictions.');
INSERT INTO "tools_pros" VALUES(61,2,22,'Massive Ecosystem','Thousands of custom models, LoRAs, and community tools.');
INSERT INTO "tools_pros" VALUES(62,3,22,'Ultimate Customization','Fine-tune models, use ControlNet, train your own styles.');
INSERT INTO "tools_pros" VALUES(63,0,21,'Seamless Integration','AI lives right in your Notion pages - no context switching.');
INSERT INTO "tools_pros" VALUES(64,1,21,'Workspace-Aware','Can search and synthesize information across your entire Notion workspace.');
INSERT INTO "tools_pros" VALUES(65,2,21,'One-Click Actions','Summarize, translate, improve writing, extract tasks with single clicks.');
INSERT INTO "tools_pros" VALUES(66,0,6,'Production-Ready Output','Generates clean React code using shadcn/ui and Tailwind CSS.');
INSERT INTO "tools_pros" VALUES(67,1,6,'Modern Best Practices','Code follows current React patterns and accessibility standards.');
INSERT INTO "tools_pros" VALUES(68,2,6,'Iterative Refinement','Chat-based interface to refine and adjust generated components.');
INSERT INTO "tools_pros" VALUES(69,0,31,'Zero Setup Required','Build and run full apps in browser - no local environment needed.');
INSERT INTO "tools_pros" VALUES(70,1,31,'Instant Deployment','Deploy your app with one click directly from Bolt.');
INSERT INTO "tools_pros" VALUES(71,2,31,'Full-Stack Capable','Generates both frontend and backend code.');
INSERT INTO "tools_pros" VALUES(72,0,35,'Incredibly Affordable','API pricing is ~100x cheaper than GPT-4 for comparable quality.');
INSERT INTO "tools_pros" VALUES(73,1,35,'Strong Performance','Competes with GPT-4 on major benchmarks.');
INSERT INTO "tools_pros" VALUES(74,2,35,'Open Source Models','Download and run locally for free with full control.');
INSERT INTO "tools_pros" VALUES(75,0,15,'Custom Model Training','Train AI on your art style for consistent outputs.');
INSERT INTO "tools_pros" VALUES(76,1,15,'Game Art Focus','Optimized for concept art, characters, and game assets.');
INSERT INTO "tools_pros" VALUES(77,2,15,'Real-Time Canvas','Edit and generate in a live canvas interface.');
INSERT INTO "tools_pros" VALUES(78,0,3,'Superior Audio Quality','Produces cleaner, more polished audio than most competitors.');
INSERT INTO "tools_pros" VALUES(79,1,3,'Musical Coherence','Songs have better structure, progression, and musical sensibility.');
INSERT INTO "tools_pros" VALUES(80,2,3,'Detailed Control','More options for fine-tuning style, tempo, and instrumentation.');
INSERT INTO "tools_pros" VALUES(81,3,3,'Generous Free Tier','1200 free credits monthly is substantial for experimentation.');
INSERT INTO "tools_pros" VALUES(82,0,12,'Exceptional Prompt Adherence','Follows complex prompts more accurately than Midjourney or DALL-E.');
INSERT INTO "tools_pros" VALUES(83,1,12,'Stunning Image Quality','Photorealistic and artistic outputs rival any commercial tool.');
INSERT INTO "tools_pros" VALUES(84,2,12,'Text Rendering','One of the best at generating readable text in images.');
INSERT INTO "tools_pros" VALUES(85,3,12,'Open Source Option','Schnell and Dev are free to use and run locally.');
INSERT INTO "tools_pros" VALUES(86,4,12,'Fast Generation','Schnell produces quality images in seconds.');
INSERT INTO "tools_pros" VALUES(87,0,13,'Best Text Rendering','Generates readable, accurate text in images far better than competitors.');
INSERT INTO "tools_pros" VALUES(88,1,13,'Logo Design Excellence','Creates professional-looking logos with proper typography.');
INSERT INTO "tools_pros" VALUES(89,2,13,'Improving Rapidly','Version 2.0 brought major quality improvements across all images.');
INSERT INTO "tools_pros" VALUES(90,3,13,'Affordable Pricing','More cost-effective than Midjourney for similar capabilities.');
INSERT INTO "tools_pros" VALUES(91,0,14,'Intuitive Interface','Easy to use for beginners with drag-and-drop simplicity.');
INSERT INTO "tools_pros" VALUES(92,1,14,'Creative Effects','Unique features like expand canvas, modify regions, and lip sync.');
INSERT INTO "tools_pros" VALUES(93,2,14,'Great Value','$10/month unlimited plan is exceptionally affordable.');
INSERT INTO "tools_pros" VALUES(94,3,14,'Image Animation','Excellent at bringing still images to life.');
INSERT INTO "tools_pros" VALUES(95,0,33,'Generous Free Tier','More free generations than most competitors.');
INSERT INTO "tools_pros" VALUES(96,1,33,'Long Video Generation','Up to 2 minutes - far longer than Runway or Pika.');
INSERT INTO "tools_pros" VALUES(97,2,33,'Good Quality','Competitive quality with Western alternatives.');
INSERT INTO "tools_pros" VALUES(98,3,33,'Affordable Pro','Pro tier cheaper than Runway/Sora.');
INSERT INTO "tools_pros" VALUES(99,0,34,'Excellent Motion Quality','Natural, fluid movement that rivals top competitors.');
INSERT INTO "tools_pros" VALUES(100,1,34,'Good Physics','Better understanding of real-world physics than many alternatives.');
INSERT INTO "tools_pros" VALUES(101,2,34,'Free Tier Available','Can test quality without payment.');
INSERT INTO "tools_pros" VALUES(102,3,34,'Rapid Improvement','MiniMax is iterating quickly on quality.');
INSERT INTO "tools_pros" VALUES(103,0,26,'Completely Free','Full-featured editor with 1080p exports at no cost.');
INSERT INTO "tools_pros" VALUES(104,1,26,'AI Auto-Captions','Accurate automatic subtitles save hours of work.');
INSERT INTO "tools_pros" VALUES(105,2,26,'Microsoft Integration','Works seamlessly with OneDrive and Microsoft 365.');
INSERT INTO "tools_pros" VALUES(106,3,26,'Browser-Based','No download required, works on any computer.');
INSERT INTO "tools_pros" VALUES(107,0,27,'AI Eye Contact','Magically corrects eye contact to look at camera.');
INSERT INTO "tools_pros" VALUES(108,1,27,'Filler Word Removal','Automatically removes ums, ahs, and pauses.');
INSERT INTO "tools_pros" VALUES(109,2,27,'Accurate Captions','High-quality auto-generated subtitles.');
INSERT INTO "tools_pros" VALUES(110,3,27,'One-Tap Enhancement','Multiple AI improvements with single tap.');
INSERT INTO "tools_pros" VALUES(111,0,28,'Accurate AI Subtitles','Industry-leading auto-caption accuracy.');
INSERT INTO "tools_pros" VALUES(112,1,28,'AI Avatars','Create talking-head videos with AI-generated presenters.');
INSERT INTO "tools_pros" VALUES(113,2,28,'Translation','Auto-translate subtitles to 100+ languages.');
INSERT INTO "tools_pros" VALUES(114,3,28,'Team Features','Collaboration tools for marketing teams.');
INSERT INTO "tools_pros" VALUES(115,0,29,'True Text-to-Video','Describe a video, AI creates it complete with footage and music.');
INSERT INTO "tools_pros" VALUES(116,1,29,'Script Generation','AI writes compelling scripts from simple prompts.');
INSERT INTO "tools_pros" VALUES(117,2,29,'Stock Integration','Automatically selects relevant iStock footage.');
INSERT INTO "tools_pros" VALUES(118,3,29,'Voice Cloning','Clone your voice for consistent AI narration.');
INSERT INTO "tools_pros" VALUES(119,0,10,'Engaging Characters','AI characters feel genuinely interactive and responsive.');
INSERT INTO "tools_pros" VALUES(120,1,10,'Character Creation','Create and share your own AI characters.');
INSERT INTO "tools_pros" VALUES(121,2,10,'Generous Free Tier','Full functionality available for free.');
INSERT INTO "tools_pros" VALUES(122,3,10,'Vast Library','Millions of user-created characters to explore.');
INSERT INTO "tools_pros" VALUES(123,0,11,'Audio Overview','Generates podcast-style discussions from your documents.');
INSERT INTO "tools_pros" VALUES(124,1,11,'Source Grounding','All answers cite specific sources - no hallucinations.');
INSERT INTO "tools_pros" VALUES(125,2,11,'Completely Free','No cost for full functionality with Google account.');
INSERT INTO "tools_pros" VALUES(126,3,11,'Document Understanding','Excellent comprehension of complex documents.');
INSERT INTO "tools_pros" VALUES(127,0,71,'Industry-Leading Accuracy','Catches more errors than any competitor.');
INSERT INTO "tools_pros" VALUES(128,1,71,'Works Everywhere','Browser extension, desktop app, mobile keyboard, integrations.');
INSERT INTO "tools_pros" VALUES(129,2,71,'Useful Free Tier','Free version is genuinely useful for basic writing.');
INSERT INTO "tools_pros" VALUES(130,3,71,'Excellent Explanations','Learn why suggestions are made, improving your writing.');
INSERT INTO "tools_pros" VALUES(131,0,73,'Excellent Rewrites','Multiple high-quality alternatives for any sentence.');
INSERT INTO "tools_pros" VALUES(132,1,73,'Tone Control','Easily shift between casual, formal, and other styles.');
INSERT INTO "tools_pros" VALUES(133,2,73,'AI21 Technology','Backed by cutting-edge language model research.');
INSERT INTO "tools_pros" VALUES(134,3,73,'Browser Extension','Works across websites and apps.');
INSERT INTO "tools_pros" VALUES(135,0,44,'Marketing Focus','Templates specifically designed for marketing content.');
INSERT INTO "tools_pros" VALUES(136,1,44,'Workflow Automation','Create repeatable content processes.');
INSERT INTO "tools_pros" VALUES(137,2,44,'Brand Voice Training','AI learns your brand''s writing style.');
INSERT INTO "tools_pros" VALUES(138,3,44,'Good Template Library','Useful starting points for common content types.');
INSERT INTO "tools_pros" VALUES(139,0,47,'Excellent Brand Voice','Train AI to write in your exact brand style.');
INSERT INTO "tools_pros" VALUES(140,1,47,'Long-Form Quality','Consistently good output for blog posts and articles.');
INSERT INTO "tools_pros" VALUES(141,2,47,'Enterprise Features','Security, compliance, and team management.');
INSERT INTO "tools_pros" VALUES(142,3,47,'SEO Integration','Built-in SEO mode with Surfer integration.');
INSERT INTO "tools_pros" VALUES(143,0,66,'Affordable Pricing','Much cheaper than Jasper for similar features.');
INSERT INTO "tools_pros" VALUES(144,1,66,'SEO Integration','Built-in SEO tools and Surfer integration.');
INSERT INTO "tools_pros" VALUES(145,2,66,'Good Free Tier','10K words free is generous for testing.');
INSERT INTO "tools_pros" VALUES(146,3,66,'Chatsonic Feature','ChatGPT-like chat with web access.');
INSERT INTO "tools_pros" VALUES(147,0,64,'Data-Driven Optimization','Recommendations based on top-ranking content analysis.');
INSERT INTO "tools_pros" VALUES(148,1,64,'Real-Time Scoring','See content score improve as you write.');
INSERT INTO "tools_pros" VALUES(149,2,64,'AI Integration','Generate SEO-optimized content with AI.');
INSERT INTO "tools_pros" VALUES(150,3,64,'Industry Standard','Used by top SEO agencies and in-house teams.');
INSERT INTO "tools_pros" VALUES(151,0,65,'Intuitive Interface','Cleanest UX in the SEO content tool category.');
INSERT INTO "tools_pros" VALUES(152,1,65,'Accurate Grading','Content scores that correlate with ranking improvements.');
INSERT INTO "tools_pros" VALUES(153,2,65,'Enterprise Quality','Used by major publishers like Condé Nast.');
INSERT INTO "tools_pros" VALUES(154,3,65,'Excellent Support','Responsive, knowledgeable customer service.');
INSERT INTO "tools_pros" VALUES(155,0,42,'Commercial Safety','IP indemnification protects against copyright claims.');
INSERT INTO "tools_pros" VALUES(156,1,42,'Adobe Integration','Works seamlessly in Photoshop, Illustrator, and other apps.');
INSERT INTO "tools_pros" VALUES(157,2,42,'Ethical Training','Trained only on Adobe Stock and public domain images.');
INSERT INTO "tools_pros" VALUES(158,3,42,'Affordable Premium','Just $5/month for 100 credits.');
INSERT INTO "tools_pros" VALUES(159,0,43,'Incredibly Easy','Generate complete designs with a single prompt.');
INSERT INTO "tools_pros" VALUES(160,1,43,'All-in-One Platform','Design, edit, write, and present in one tool.');
INSERT INTO "tools_pros" VALUES(161,2,43,'Great Value','$15/month includes AI plus full Canva Pro features.');
INSERT INTO "tools_pros" VALUES(162,3,43,'Template Library','Millions of professional templates to start from.');
INSERT INTO "tools_pros" VALUES(163,0,41,'Figma Integration','AI built into the best collaborative design tool.');
INSERT INTO "tools_pros" VALUES(164,1,41,'Productivity Features','Auto-naming, smart search, and workflow automation.');
INSERT INTO "tools_pros" VALUES(165,2,41,'Real-Time Collaboration','AI-assisted design with live collaboration.');
INSERT INTO "tools_pros" VALUES(166,0,45,'Truly Automated','Generates complete presentations with real content, not placeholders.');
INSERT INTO "tools_pros" VALUES(167,1,45,'Modern Design','Professional, contemporary templates and styling.');
INSERT INTO "tools_pros" VALUES(168,2,45,'Web-Native','Presentations work beautifully online with interactions.');
INSERT INTO "tools_pros" VALUES(169,3,45,'Generous Free Tier','400 credits allows substantial testing.');
INSERT INTO "tools_pros" VALUES(170,0,46,'Narrative Focus','Designed for storytelling, not just bullet points.');
INSERT INTO "tools_pros" VALUES(171,1,46,'Beautiful Defaults','Modern, cinematic design aesthetic.');
INSERT INTO "tools_pros" VALUES(172,2,46,'AI Image Generation','Built-in image generation for visuals.');
INSERT INTO "tools_pros" VALUES(173,3,46,'Web-Native','Presentations work beautifully as shareable links.');
INSERT INTO "tools_pros" VALUES(174,0,52,'Impressive Generation','Creates professional, publishable websites from prompts.');
INSERT INTO "tools_pros" VALUES(175,1,52,'Modern Design','Generates contemporary, well-designed sites.');
INSERT INTO "tools_pros" VALUES(176,2,52,'Easy Customization','Visual editor for refining AI-generated designs.');
INSERT INTO "tools_pros" VALUES(177,3,52,'Fast Publishing','Go from idea to live site in minutes.');
INSERT INTO "tools_pros" VALUES(178,0,58,'Powerful Visual Builder','Complex workflows with branching, loops, and error handling.');
INSERT INTO "tools_pros" VALUES(179,1,58,'Better Value','More operations per dollar than Zapier.');
INSERT INTO "tools_pros" VALUES(180,2,58,'Data Transformation','Built-in functions for manipulating data.');
INSERT INTO "tools_pros" VALUES(181,3,58,'1500+ Integrations','Connects with most popular apps and services.');
INSERT INTO "tools_pros" VALUES(182,0,59,'Self-Hosting Option','Run on your own servers with full data control.');
INSERT INTO "tools_pros" VALUES(183,1,59,'Open Source','Full source code access, MIT licensed.');
INSERT INTO "tools_pros" VALUES(184,2,59,'Free Forever','Unlimited executions when self-hosted.');
INSERT INTO "tools_pros" VALUES(185,3,59,'Code Integration','Add custom JavaScript/Python to workflows.');
INSERT INTO "tools_pros" VALUES(186,0,60,'Browser-Native','Runs directly in Chrome for seamless web automation.');
INSERT INTO "tools_pros" VALUES(187,1,60,'Web Scraping','Extract data from any website with point-and-click.');
INSERT INTO "tools_pros" VALUES(188,2,60,'AI Builder','Describe automation in plain English.');
INSERT INTO "tools_pros" VALUES(189,3,60,'Generous Free Tier','Unlimited basic automations free.');
INSERT INTO "tools_pros" VALUES(190,0,39,'Huge App Library','6000+ integrations - largest in the market.');
INSERT INTO "tools_pros" VALUES(191,1,39,'Easiest to Use','Most beginner-friendly automation platform.');
INSERT INTO "tools_pros" VALUES(192,2,39,'AI Assistant','Create workflows from natural language descriptions.');
INSERT INTO "tools_pros" VALUES(193,3,39,'Reliable','Mature platform with excellent uptime.');
INSERT INTO "tools_pros" VALUES(194,0,1,'Clear Commercial Licensing','No copyright worries for content creators.');
INSERT INTO "tools_pros" VALUES(195,1,1,'Instant Generation','Get custom tracks in seconds.');
INSERT INTO "tools_pros" VALUES(196,2,1,'Customizable Parameters','Control mood, genre, tempo, and duration.');
INSERT INTO "tools_pros" VALUES(197,0,5,'Zero Setup','Code in any language instantly - no installation needed.');
INSERT INTO "tools_pros" VALUES(198,1,5,'AI Agent','Describe what you want, AI builds it.');
INSERT INTO "tools_pros" VALUES(199,2,5,'Instant Deployment','Deploy apps with one click.');
INSERT INTO "tools_pros" VALUES(200,3,5,'Real-Time Collaboration','Code together like Google Docs.');
INSERT INTO "tools_pros" VALUES(201,0,67,'Photo-to-3D Magic','Create explorable 3D scenes from phone photos.');
INSERT INTO "tools_pros" VALUES(202,1,67,'Text-to-3D','Generate 3D models from text descriptions.');
INSERT INTO "tools_pros" VALUES(203,2,67,'High Quality','NeRF technology produces impressive results.');
INSERT INTO "tools_pros" VALUES(204,0,48,'Game-Ready Output','Models work in Unity, Unreal, Blender.');
INSERT INTO "tools_pros" VALUES(205,1,48,'Image-to-3D','Convert 2D images to 3D models.');
INSERT INTO "tools_pros" VALUES(206,2,48,'Improving Fast','Quality updates frequently.');
INSERT INTO "tools_pros" VALUES(207,0,70,'Fast Generation','Quick 3D model creation.');
INSERT INTO "tools_pros" VALUES(208,1,70,'Good Quality','Competitive with leading alternatives.');
INSERT INTO "tools_pros" VALUES(209,0,75,'All AIs in One','Access GPT-4, Claude, and more without separate subscriptions.');
INSERT INTO "tools_pros" VALUES(210,1,75,'Compare Responses','Ask the same question to multiple AIs.');
INSERT INTO "tools_pros" VALUES(211,2,75,'Custom Bots','Create and share custom AI personalities.');
INSERT INTO "tools_pros" VALUES(212,0,74,'Emotionally Intelligent','Designed for empathy and understanding.');
INSERT INTO "tools_pros" VALUES(213,1,74,'Natural Conversation','Feels like talking to a friend.');
INSERT INTO "tools_pros" VALUES(214,2,74,'Free to Use','Full experience at no cost.');
INSERT INTO "tools_pros" VALUES(215,0,76,'Real-Time X Data','Access to current tweets and trends.');
INSERT INTO "tools_pros" VALUES(216,1,76,'Fun Personality','Witty, unfiltered responses in fun mode.');
INSERT INTO "tools_pros" VALUES(217,2,76,'Fewer Restrictions','Will discuss topics others decline.');
INSERT INTO "tools_pros" VALUES(218,0,72,'Fiction-Focused','Understands storytelling, not just text.');
INSERT INTO "tools_pros" VALUES(219,1,72,'Useful Features','Describe, Brainstorm, Write modes are genuinely helpful.');
INSERT INTO "tools_pros" VALUES(220,2,72,'Writer''s Block Cure','Excellent for getting unstuck.');
INSERT INTO "tools_pros" VALUES(221,0,53,'Natural Language','Ask questions about data in plain English.');
INSERT INTO "tools_pros" VALUES(222,1,53,'Auto Visualizations','Generates charts and graphs automatically.');
INSERT INTO "tools_pros" VALUES(223,2,53,'No Code Required','Analysis without programming.');
INSERT INTO "tools_pros" VALUES(224,0,37,'AI Command Help','Ask what you want to do, get the command.');
INSERT INTO "tools_pros" VALUES(225,1,37,'Error Explanations','Understand what went wrong.');
INSERT INTO "tools_pros" VALUES(226,2,37,'Free for Individuals','Full features at no cost.');
INSERT INTO "tools_pros" VALUES(227,0,30,'Legal Expertise','Trained specifically on legal documents and case law.');
INSERT INTO "tools_pros" VALUES(228,1,30,'Enterprise Security','Built for law firm compliance requirements.');
INSERT INTO "tools_pros" VALUES(229,0,38,'Massive Data Sources','50+ data providers in one platform.');
INSERT INTO "tools_pros" VALUES(230,1,38,'AI Research','Automated prospect research.');
INSERT INTO "tools_pros" VALUES(231,0,49,'Browser-Based','No downloads, works anywhere.');
INSERT INTO "tools_pros" VALUES(232,1,49,'Web-Native Export','Export directly for websites.');
INSERT INTO "tools_pros" VALUES(233,0,50,'WordPress Based','Familiar CMS after generation.');
INSERT INTO "tools_pros" VALUES(234,1,50,'Managed Hosting','Includes optimized WordPress hosting.');
INSERT INTO "tools_pros" VALUES(235,0,51,'Incredible Speed','Complete website in under a minute.');
INSERT INTO "tools_pros" VALUES(236,1,51,'Small Business Focus','Built for service businesses.');
INSERT INTO "tools_pros" VALUES(237,0,54,'Database Direct','Query databases in spreadsheet.');
INSERT INTO "tools_pros" VALUES(238,1,54,'AI Analysis','Get insights from data automatically.');
INSERT INTO "tools_pros" VALUES(239,0,55,'No Code Required','Business users can build ML models.');
INSERT INTO "tools_pros" VALUES(240,0,56,'Easy to Use','No coding required for AI predictions.');
INSERT INTO "tools_pros" VALUES(241,0,57,'All-in-One','Notebooks, SQL, and viz together.');
INSERT INTO "tools_pros" VALUES(242,0,61,'Human Checkpoints','Automation that pauses for decisions.');
INSERT INTO "tools_pros" VALUES(243,0,62,'Free Self-Hosting','Unlimited automation at no cost.');
INSERT INTO "tools_pros" VALUES(244,0,9,'Strong Community','Active social features and collaborative tools.');
INSERT INTO "tools_pros" VALUES(245,1,9,'Beginner Friendly','Intuitive interface for newcomers to AI art.');
INSERT INTO "tools_pros" VALUES(246,2,9,'Good Free Tier','Generous free plan for casual creators.');
INSERT INTO "tools_pros" VALUES(247,0,17,'Industry-Leading Models','SDXL and SD3 are top-tier image generators.');
INSERT INTO "tools_pros" VALUES(248,1,17,'Competitive Pricing','Most affordable API pricing in the market.');
INSERT INTO "tools_pros" VALUES(249,2,17,'Flexible Usage','Pay only for what you use.');
INSERT INTO "tools_pros" VALUES(250,0,68,'Excellent Accuracy','High-quality 2D to 3D conversion.');
INSERT INTO "tools_pros" VALUES(251,1,68,'Production Ready','Output suitable for games and apps.');
INSERT INTO "tools_pros" VALUES(252,2,68,'Fast Turnaround','Models ready in minutes.');
INSERT INTO "tools_pros" VALUES(253,0,69,'Excellent Detail','Captures fine details from single images.');
INSERT INTO "tools_pros" VALUES(254,1,69,'Generous Free Tier','10 free models per month.');
INSERT INTO "tools_pros" VALUES(255,2,69,'Good Value','Affordable Pro plan at $20/mo.');
CREATE TABLE IF NOT EXISTS "tools_cons" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "description" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_cons" VALUES(1,0,25,'Usage Limits on All Plans','Even paid plans have message caps. Only Pro offers unlimited access.');
INSERT INTO "tools_cons" VALUES(2,1,25,'Can Hallucinate Facts','Sometimes generates plausible-sounding but incorrect information.');
INSERT INTO "tools_cons" VALUES(3,2,25,'Pro Plan is Expensive','At $200/month, Pro is 10x the Plus price.');
INSERT INTO "tools_cons" VALUES(4,0,18,'No Free Tier','Unlike DALL-E or Stable Diffusion, there is no free trial.');
INSERT INTO "tools_cons" VALUES(5,1,18,'Discord Learning Curve','Using Midjourney through Discord can be confusing for new users.');
INSERT INTO "tools_cons" VALUES(6,2,18,'Less Precise Control','Getting exactly what you want requires prompt engineering skill.');
INSERT INTO "tools_cons" VALUES(7,0,23,'More Conservative Than ChatGPT','Safety focus means Claude may refuse some edge-case requests that ChatGPT handles.');
INSERT INTO "tools_cons" VALUES(8,1,23,'Smaller Ecosystem','Fewer integrations, plugins, and third-party tools compared to ChatGPT''s massive ecosystem.');
INSERT INTO "tools_cons" VALUES(9,2,23,'No Image Generation','Unlike ChatGPT with DALL-E, Claude cannot create images - text and analysis only.');
INSERT INTO "tools_cons" VALUES(10,0,8,'Subscription Required','No free tier for professional developers - $10/mo minimum after trial.');
INSERT INTO "tools_cons" VALUES(11,1,8,'Occasional Irrelevant Suggestions','Sometimes generates code that doesn''t fit context or introduces bugs.');
INSERT INTO "tools_cons" VALUES(12,2,8,'Privacy Concerns','Code is sent to GitHub servers - may not suit all enterprise security requirements.');
INSERT INTO "tools_cons" VALUES(13,0,7,'Occasional Instability','Being newer software, some users report crashes and bugs.');
INSERT INTO "tools_cons" VALUES(14,1,7,'Learning Curve','New AI-centric workflows take time to master for maximum productivity.');
INSERT INTO "tools_cons" VALUES(15,2,7,'Not Fully VS Code','Some VS Code features and extensions may not work perfectly.');
INSERT INTO "tools_cons" VALUES(16,0,24,'Less Artistic Than Midjourney','Midjourney produces more aesthetically striking, "artistic" images.');
INSERT INTO "tools_cons" VALUES(17,1,24,'Limited Style Control','Fewer parameters to fine-tune artistic style compared to Stable Diffusion.');
INSERT INTO "tools_cons" VALUES(18,2,24,'No Free Tier','Requires ChatGPT Plus ($20/mo) or API credits to use.');
INSERT INTO "tools_cons" VALUES(19,0,20,'Not for Creative Tasks','Focused on research/Q&A, not creative writing or coding like ChatGPT.');
INSERT INTO "tools_cons" VALUES(20,1,20,'Simpler Conversational Abilities','Less capable for multi-turn creative conversations than ChatGPT/Claude.');
INSERT INTO "tools_cons" VALUES(21,2,20,'Source Quality Varies','Citations are only as good as the sources it finds - verify important claims.');
INSERT INTO "tools_cons" VALUES(22,0,32,'Expensive','Full access requires ChatGPT Pro at $200/month - 10x the cost of alternatives.');
INSERT INTO "tools_cons" VALUES(23,1,32,'Limited Plus Tier','ChatGPT Plus only gets Sora 1 with short clips and limited generations.');
INSERT INTO "tools_cons" VALUES(24,2,32,'Occasional Artifacts','Complex scenes can still produce physics errors or morphing artifacts.');
INSERT INTO "tools_cons" VALUES(25,0,2,'Character Limits','Pay per character model can get expensive for high-volume use.');
INSERT INTO "tools_cons" VALUES(26,1,2,'Voice Cloning Ethics','Powerful voice cloning raises concerns about misuse and deepfakes.');
INSERT INTO "tools_cons" VALUES(27,2,2,'Premium for Best Quality','Highest quality settings require Pro tier or above.');
INSERT INTO "tools_cons" VALUES(28,0,4,'Limited Control','Can''t fine-tune specific instruments or vocal styles as precisely as DAWs.');
INSERT INTO "tools_cons" VALUES(29,1,4,'Occasional Lyric Issues','Sometimes generates repetitive or nonsensical lyrics.');
INSERT INTO "tools_cons" VALUES(30,2,4,'Copyright Uncertainty','Legal status of AI-generated music is still evolving.');
INSERT INTO "tools_cons" VALUES(31,0,19,'Expensive for Heavy Use','Credit system adds up quickly for high-volume production.');
INSERT INTO "tools_cons" VALUES(32,1,19,'Shorter Videos Than Sora','Max 10 seconds vs Sora''s 60 seconds on equivalent tiers.');
INSERT INTO "tools_cons" VALUES(33,2,19,'Quality Variance','Results can be inconsistent - may need multiple generations.');
INSERT INTO "tools_cons" VALUES(34,0,36,'Lags in Pure Reasoning','ChatGPT and Claude still outperform on complex reasoning benchmarks.');
INSERT INTO "tools_cons" VALUES(35,1,36,'Less Third-Party Ecosystem','Fewer plugins and integrations compared to ChatGPT.');
INSERT INTO "tools_cons" VALUES(36,0,22,'Requires Technical Knowledge','Setting up local installation has a learning curve.');
INSERT INTO "tools_cons" VALUES(37,1,22,'Needs Good Hardware','Best results require a modern NVIDIA GPU with 8GB+ VRAM.');
INSERT INTO "tools_cons" VALUES(38,2,22,'Less Polished Than Midjourney','Requires more prompt engineering for consistent quality.');
INSERT INTO "tools_cons" VALUES(39,0,21,'Additional Cost','$10/user/month on top of Notion subscription adds up for teams.');
INSERT INTO "tools_cons" VALUES(40,1,21,'Notion-Only','Only works within Notion - can''t use elsewhere.');
INSERT INTO "tools_cons" VALUES(41,0,6,'React/Next.js Only','Focused on React ecosystem - not for Vue, Angular, etc.');
INSERT INTO "tools_cons" VALUES(42,1,6,'Credits Can Run Out','Heavy users may need Premium plan.');
INSERT INTO "tools_cons" VALUES(43,0,31,'Limited for Complex Apps','Best for MVPs and prototypes, not enterprise apps.');
INSERT INTO "tools_cons" VALUES(44,1,31,'Platform Lock-In','Apps are tied to Bolt''s ecosystem.');
INSERT INTO "tools_cons" VALUES(45,0,35,'Privacy Concerns','China-based company - consider data sensitivity.');
INSERT INTO "tools_cons" VALUES(46,1,35,'Less Ecosystem','Fewer integrations and tools compared to OpenAI.');
INSERT INTO "tools_cons" VALUES(47,0,15,'Token System','Can be confusing to calculate costs.');
INSERT INTO "tools_cons" VALUES(48,1,15,'Narrower Than Midjourney','Less versatile for general photography-style images.');
INSERT INTO "tools_cons" VALUES(49,0,3,'Steeper Learning Curve','More complex prompting required for best results.');
INSERT INTO "tools_cons" VALUES(50,1,3,'Slower Generation','Higher quality means longer wait times.');
INSERT INTO "tools_cons" VALUES(51,2,3,'Less Accessible UI','Interface is less intuitive than Suno.');
INSERT INTO "tools_cons" VALUES(52,0,12,'No Native Interface','Requires third-party UIs or API access to use.');
INSERT INTO "tools_cons" VALUES(53,1,12,'Technical Setup','Running locally requires GPU and technical knowledge.');
INSERT INTO "tools_cons" VALUES(54,2,12,'Dev License Restriction','Dev model is non-commercial only.');
INSERT INTO "tools_cons" VALUES(55,0,13,'General Quality Gap','Non-text images sometimes lag behind Midjourney/DALL-E.');
INSERT INTO "tools_cons" VALUES(56,1,13,'Smaller Community','Less community resources and prompt sharing than competitors.');
INSERT INTO "tools_cons" VALUES(57,2,13,'Limited Style Range','Best at specific use cases, less versatile overall.');
INSERT INTO "tools_cons" VALUES(58,0,14,'Lower Quality Ceiling','Maximum quality below Runway or Sora.');
INSERT INTO "tools_cons" VALUES(59,1,14,'Shorter Videos','4-second clips limit narrative possibilities.');
INSERT INTO "tools_cons" VALUES(60,2,14,'Less Control','Fewer professional controls than Runway.');
INSERT INTO "tools_cons" VALUES(61,0,33,'Content Restrictions','Chinese regulations limit some content types.');
INSERT INTO "tools_cons" VALUES(62,1,33,'Interface Language','Some UI elements may be in Chinese.');
INSERT INTO "tools_cons" VALUES(63,2,33,'Data Privacy Concerns','Data stored on Chinese servers.');
INSERT INTO "tools_cons" VALUES(64,0,34,'Less Established','Newer platform with less track record.');
INSERT INTO "tools_cons" VALUES(65,1,34,'Chinese Platform','Data privacy considerations.');
INSERT INTO "tools_cons" VALUES(66,2,34,'Limited Documentation','Less community resources in English.');
INSERT INTO "tools_cons" VALUES(67,0,26,'Limited Advanced Features','Power users may want more effects and controls.');
INSERT INTO "tools_cons" VALUES(68,1,26,'Windows Focus','Desktop app only available for Windows.');
INSERT INTO "tools_cons" VALUES(69,2,26,'Basic Color Grading','Professional colorists will want more tools.');
INSERT INTO "tools_cons" VALUES(70,0,27,'Talking Head Focus','Best features only work for face-to-camera content.');
INSERT INTO "tools_cons" VALUES(71,1,27,'Mobile-First','Desktop experience is limited.');
INSERT INTO "tools_cons" VALUES(72,2,27,'Limited Editing','Not a full-featured editor for complex projects.');
INSERT INTO "tools_cons" VALUES(73,0,28,'Higher Pricing','More expensive than simpler alternatives.');
INSERT INTO "tools_cons" VALUES(74,1,28,'Storage Limits','Can fill up quickly with video projects.');
INSERT INTO "tools_cons" VALUES(75,2,28,'Learning Curve','Feature-rich interface takes time to master.');
INSERT INTO "tools_cons" VALUES(76,0,29,'Generic Results','AI-generated videos can feel templated.');
INSERT INTO "tools_cons" VALUES(77,1,29,'Stock Footage Dependent','Limited without access to premium stock.');
INSERT INTO "tools_cons" VALUES(78,2,29,'Time Limits','Weekly minute limits can be restrictive.');
INSERT INTO "tools_cons" VALUES(79,0,10,'Content Filters','Strict content moderation limits some conversations.');
INSERT INTO "tools_cons" VALUES(80,1,10,'Memory Limitations','Characters can forget earlier conversation context.');
INSERT INTO "tools_cons" VALUES(81,2,10,'Not Productive','Entertainment-focused, not a work tool.');
INSERT INTO "tools_cons" VALUES(82,0,11,'Google Account Required','Must have Google account to use.');
INSERT INTO "tools_cons" VALUES(83,1,11,'Limited Integrations','Can''t connect to all document sources.');
INSERT INTO "tools_cons" VALUES(84,2,11,'Experimental Status','Still Google Labs - features may change.');
INSERT INTO "tools_cons" VALUES(85,0,71,'Premium Price','Full features require $12/month subscription.');
INSERT INTO "tools_cons" VALUES(86,1,71,'English Only (mostly)','Limited support for non-English languages.');
INSERT INTO "tools_cons" VALUES(87,2,71,'AI Features Basic','GrammarlyGO is less capable than dedicated AI writers.');
INSERT INTO "tools_cons" VALUES(88,0,73,'Limited Free Tier','Only 10 rewrites per day on free plan.');
INSERT INTO "tools_cons" VALUES(89,1,73,'Not a Grammar Checker','Won''t catch spelling or grammar errors.');
INSERT INTO "tools_cons" VALUES(90,2,73,'Single Purpose','Only does rewriting - no content generation.');
INSERT INTO "tools_cons" VALUES(91,0,44,'Premium Pricing','$36/month is higher than some alternatives.');
INSERT INTO "tools_cons" VALUES(92,1,44,'Limited Free Tier','2000 words/month is restrictive.');
INSERT INTO "tools_cons" VALUES(93,2,44,'Quality Varies','Output quality can be inconsistent.');
INSERT INTO "tools_cons" VALUES(94,0,47,'Expensive','Starting at $49/month is steep for individuals.');
INSERT INTO "tools_cons" VALUES(95,1,47,'No Free Tier','Only 7-day trial - no ongoing free option.');
INSERT INTO "tools_cons" VALUES(96,2,47,'Enterprise Focus','Features may be overkill for small teams.');
INSERT INTO "tools_cons" VALUES(97,0,66,'Quality Inconsistency','Output quality can vary significantly.');
INSERT INTO "tools_cons" VALUES(98,1,66,'Interface Complexity','Feature-rich but can be overwhelming.');
INSERT INTO "tools_cons" VALUES(99,2,66,'Brand Voice Limited','Less sophisticated than Jasper.');
INSERT INTO "tools_cons" VALUES(100,0,64,'Premium Pricing','Starting at $99/month is steep.');
INSERT INTO "tools_cons" VALUES(101,1,64,'Learning Curve','Takes time to master all features.');
INSERT INTO "tools_cons" VALUES(102,2,64,'Can Be Prescriptive','Risk of over-optimizing if followed blindly.');
INSERT INTO "tools_cons" VALUES(103,0,65,'Premium Pricing','$189/month starting is expensive.');
INSERT INTO "tools_cons" VALUES(104,1,65,'Credit System','Pay per report can feel limiting.');
INSERT INTO "tools_cons" VALUES(105,2,65,'No AI Writing','Doesn''t generate content like Surfer does.');
INSERT INTO "tools_cons" VALUES(106,0,42,'Not Midjourney Quality','Artistic quality below top competitors.');
INSERT INTO "tools_cons" VALUES(107,1,42,'Credit System','Can run out of credits quickly.');
INSERT INTO "tools_cons" VALUES(108,2,42,'Adobe Ecosystem Lock','Best value requires Creative Cloud subscription.');
INSERT INTO "tools_cons" VALUES(109,0,43,'Limited Customization','Designers may find AI suggestions limiting.');
INSERT INTO "tools_cons" VALUES(110,1,43,'Template Dependency','Results often look "Canva-like" rather than unique.');
INSERT INTO "tools_cons" VALUES(111,2,43,'Free Tier Limited','Best AI features require Pro subscription.');
INSERT INTO "tools_cons" VALUES(112,0,41,'Limited Generation','Not as powerful for AI design generation as dedicated tools.');
INSERT INTO "tools_cons" VALUES(113,1,41,'Still Evolving','AI features are newer and less mature.');
INSERT INTO "tools_cons" VALUES(114,2,41,'Professional Required','Best AI features need paid subscription.');
INSERT INTO "tools_cons" VALUES(115,0,45,'Limited Customization','Less control than PowerPoint for specific formatting.');
INSERT INTO "tools_cons" VALUES(116,1,45,'Online Only','Requires internet connection to use.');
INSERT INTO "tools_cons" VALUES(117,2,45,'Export Limitations','Exported PPTs may need cleanup.');
INSERT INTO "tools_cons" VALUES(118,0,46,'Pricier Than Gamma','$16/month vs Gamma''s $10/month.');
INSERT INTO "tools_cons" VALUES(119,1,46,'Less Traditional','May not suit conventional business presentations.');
INSERT INTO "tools_cons" VALUES(120,2,46,'Learning Curve','Different paradigm takes adjustment.');
INSERT INTO "tools_cons" VALUES(121,0,52,'Page Limits','Free tier limited to 2 pages.');
INSERT INTO "tools_cons" VALUES(122,1,52,'Not for Web Apps','Static sites only - no complex functionality.');
INSERT INTO "tools_cons" VALUES(123,2,52,'Hosting Required','Sites hosted on Framer infrastructure.');
INSERT INTO "tools_cons" VALUES(124,0,58,'Steeper Learning Curve','More complex than Zapier to get started.');
INSERT INTO "tools_cons" VALUES(125,1,58,'Interface Overwhelming','Visual builder can feel cluttered.');
INSERT INTO "tools_cons" VALUES(126,2,58,'Documentation Gaps','Some features lack clear documentation.');
INSERT INTO "tools_cons" VALUES(127,0,59,'Self-Hosting Complexity','Requires technical knowledge to deploy and maintain.');
INSERT INTO "tools_cons" VALUES(128,1,59,'Fewer Integrations','400+ apps vs Zapier''s 6000+.');
INSERT INTO "tools_cons" VALUES(129,2,59,'Steeper Learning Curve','More technical than Zapier or Make.');
INSERT INTO "tools_cons" VALUES(130,0,60,'Chrome Only','Requires Chrome browser.');
INSERT INTO "tools_cons" VALUES(131,1,60,'Browser Dependent','Must be running for automations.');
INSERT INTO "tools_cons" VALUES(132,2,60,'Web-Focused','Less useful for non-web tasks.');
INSERT INTO "tools_cons" VALUES(133,0,39,'Expensive Per Task','More expensive than Make for equivalent usage.');
INSERT INTO "tools_cons" VALUES(134,1,39,'Limited Free Tier','Only 100 tasks/month free.');
INSERT INTO "tools_cons" VALUES(135,2,39,'Complex Logic Limits','Make is more powerful for complex workflows.');
INSERT INTO "tools_cons" VALUES(136,0,1,'Background Music Focus','Not for creating hero/feature tracks.');
INSERT INTO "tools_cons" VALUES(137,1,1,'Less Musical Depth','Tracks lack the sophistication of Suno/Udio.');
INSERT INTO "tools_cons" VALUES(138,0,5,'Browser Performance','Large projects can feel slow.');
INSERT INTO "tools_cons" VALUES(139,1,5,'Limited for Production','Professional apps need traditional hosting.');
INSERT INTO "tools_cons" VALUES(140,2,5,'Compute Limits','Free tier is resource-constrained.');
INSERT INTO "tools_cons" VALUES(141,0,67,'Processing Time','3D capture requires significant processing.');
INSERT INTO "tools_cons" VALUES(142,1,67,'Export Limitations','Not all 3D formats supported.');
INSERT INTO "tools_cons" VALUES(143,0,48,'Quality Variance','Some prompts produce better results than others.');
INSERT INTO "tools_cons" VALUES(144,1,48,'Credit System','Heavy use can get expensive.');
INSERT INTO "tools_cons" VALUES(145,0,70,'Newer Platform','Less established than competitors.');
INSERT INTO "tools_cons" VALUES(146,0,75,'Not Native Experience','Direct ChatGPT/Claude may have more features.');
INSERT INTO "tools_cons" VALUES(147,1,75,'Message Limits','Heavy users may hit limits.');
INSERT INTO "tools_cons" VALUES(148,0,74,'Limited Task Capability','Not built for work or complex tasks.');
INSERT INTO "tools_cons" VALUES(149,1,74,'No Advanced Features','Simpler than ChatGPT/Claude.');
INSERT INTO "tools_cons" VALUES(150,0,76,'X Subscription Required','Must pay for X Premium+.');
INSERT INTO "tools_cons" VALUES(151,1,76,'Limited Ecosystem','Less integrated than ChatGPT or Claude.');
INSERT INTO "tools_cons" VALUES(152,0,72,'Fiction Only','Not useful for non-fiction writing.');
INSERT INTO "tools_cons" VALUES(153,1,72,'Word Limits','Can be restrictive for prolific writers.');
INSERT INTO "tools_cons" VALUES(154,0,53,'Limited for Complex Analysis','Power users may need traditional tools.');
INSERT INTO "tools_cons" VALUES(155,1,53,'Data Size Limits','Very large datasets may be slow.');
INSERT INTO "tools_cons" VALUES(156,0,37,'Mac Only','No Windows or Linux yet.');
INSERT INTO "tools_cons" VALUES(157,1,37,'Learning Curve','Different from traditional terminals.');
INSERT INTO "tools_cons" VALUES(158,0,30,'Enterprise Only','Not available to individuals or small firms.');
INSERT INTO "tools_cons" VALUES(159,0,38,'Expensive','Starting at $149/month is premium.');
INSERT INTO "tools_cons" VALUES(160,1,38,'Learning Curve','Complex platform takes time to master.');
INSERT INTO "tools_cons" VALUES(161,0,49,'Limited for Games','Not suitable for game development.');
INSERT INTO "tools_cons" VALUES(162,0,50,'WordPress Complexity','Still WordPress learning curve.');
INSERT INTO "tools_cons" VALUES(163,0,51,'Limited Customization','Less flexible than Framer or Webflow.');
INSERT INTO "tools_cons" VALUES(164,0,54,'Expensive','$49/user is steep.');
INSERT INTO "tools_cons" VALUES(165,0,55,'Limited Customization','Data scientists may want more control.');
INSERT INTO "tools_cons" VALUES(166,0,56,'Price Jump','Big gap between Starter and Pro.');
INSERT INTO "tools_cons" VALUES(167,0,57,'Learning Curve','More complex than simple BI tools.');
INSERT INTO "tools_cons" VALUES(168,0,61,'Fewer Integrations','Less than Zapier or Make.');
INSERT INTO "tools_cons" VALUES(169,0,62,'Fewer Integrations','Less than Zapier.');
INSERT INTO "tools_cons" VALUES(170,0,9,'Generation Quality','Below top-tier competitors like Midjourney.');
INSERT INTO "tools_cons" VALUES(171,1,9,'Limited Controls','Fewer advanced options for power users.');
INSERT INTO "tools_cons" VALUES(172,0,17,'Developer-Only','Requires programming skills to use API.');
INSERT INTO "tools_cons" VALUES(173,1,17,'No GUI','No consumer-facing application.');
INSERT INTO "tools_cons" VALUES(174,0,68,'Price Adds Up','Can be expensive at volume.');
INSERT INTO "tools_cons" VALUES(175,1,68,'No Rigging','Animation rigging not included.');
INSERT INTO "tools_cons" VALUES(176,0,69,'Hard Surfaces','Less accurate for mechanical objects.');
INSERT INTO "tools_cons" VALUES(177,1,69,'Processing Time','Can be slow at peak times.');
CREATE TABLE IF NOT EXISTS "tools_best_for" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "persona" text,
    "reason" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_best_for" VALUES(1,0,25,'Content Writers','Exceptional at drafting, editing, and brainstorming');
INSERT INTO "tools_best_for" VALUES(2,1,25,'Software Developers','Industry-leading code generation and debugging');
INSERT INTO "tools_best_for" VALUES(3,2,25,'Students & Researchers','Excellent for learning, tutoring, and research');
INSERT INTO "tools_best_for" VALUES(4,3,25,'Business Professionals','Versatile for emails, presentations, and analysis');
INSERT INTO "tools_best_for" VALUES(5,0,18,'Professional Artists','Highest quality outputs for portfolio and client work');
INSERT INTO "tools_best_for" VALUES(6,1,18,'Designers','Excellent for concept art, mood boards, and visual exploration');
INSERT INTO "tools_best_for" VALUES(7,2,18,'Content Creators','Stunning imagery for social media and marketing');
INSERT INTO "tools_best_for" VALUES(8,0,23,'Researchers & Analysts','Unmatched ability to process and synthesize long documents');
INSERT INTO "tools_best_for" VALUES(9,1,23,'Technical Writers','Excellent at producing coherent, well-structured long-form content');
INSERT INTO "tools_best_for" VALUES(10,2,23,'Developers','Strong coding with thoughtful explanations');
INSERT INTO "tools_best_for" VALUES(11,3,23,'Legal & Compliance Professionals','Can analyze lengthy contracts and policies accurately');
INSERT INTO "tools_best_for" VALUES(12,0,8,'Professional Developers','Productivity gains easily justify $10/month subscription');
INSERT INTO "tools_best_for" VALUES(13,1,8,'Students','Free access with valid student credentials');
INSERT INTO "tools_best_for" VALUES(14,2,8,'Open Source Contributors','Free for verified OSS maintainers');
INSERT INTO "tools_best_for" VALUES(15,3,8,'Teams Using GitHub','Best integration with GitHub-based workflows');
INSERT INTO "tools_best_for" VALUES(16,0,7,'AI-Forward Developers','Those ready to adopt AI-native coding workflows');
INSERT INTO "tools_best_for" VALUES(17,1,7,'Full-Stack Developers','Multi-file editing shines for cross-cutting changes');
INSERT INTO "tools_best_for" VALUES(18,2,7,'Rapid Prototypers','Great for quickly building MVPs and prototypes');
INSERT INTO "tools_best_for" VALUES(19,3,7,'VS Code Users','Familiar interface with enhanced AI capabilities');
INSERT INTO "tools_best_for" VALUES(20,0,24,'Marketers & Content Creators','Great for quick graphics with text and specific compositions');
INSERT INTO "tools_best_for" VALUES(21,1,24,'ChatGPT Users','Already included in Plus subscription, no extra cost');
INSERT INTO "tools_best_for" VALUES(22,2,24,'Those New to AI Art','Natural language interface, no prompt engineering learning curve');
INSERT INTO "tools_best_for" VALUES(23,3,24,'Designers Needing Text','Only major generator that handles text in images well');
INSERT INTO "tools_best_for" VALUES(24,0,20,'Researchers & Students','Cited sources perfect for academic work');
INSERT INTO "tools_best_for" VALUES(25,1,20,'Journalists & Writers','Quick fact-checking with source verification');
INSERT INTO "tools_best_for" VALUES(26,2,20,'Curious Learners','Better than Google for learning about topics');
INSERT INTO "tools_best_for" VALUES(27,3,20,'Professionals Needing Facts','Get answers with proof, not just AI opinions');
INSERT INTO "tools_best_for" VALUES(28,0,32,'Professional Filmmakers','Quality justifies cost for commercial projects');
INSERT INTO "tools_best_for" VALUES(29,1,32,'Advertisers & Agencies','Create high-quality ad content quickly');
INSERT INTO "tools_best_for" VALUES(30,2,32,'Content Creators','Stand out with professional-grade AI video');
INSERT INTO "tools_best_for" VALUES(31,3,32,'ChatGPT Pro Subscribers','Already included in subscription');
INSERT INTO "tools_best_for" VALUES(32,0,2,'Podcasters & Narrators','Create professional voiceovers without recording');
INSERT INTO "tools_best_for" VALUES(33,1,2,'Game Developers','Voice characters without hiring voice actors');
INSERT INTO "tools_best_for" VALUES(34,2,2,'Content Creators','Add narration to videos quickly');
INSERT INTO "tools_best_for" VALUES(35,3,2,'Accessibility Projects','Convert text to speech for visually impaired users');
INSERT INTO "tools_best_for" VALUES(36,0,4,'Content Creators','Create unique background music and jingles for videos');
INSERT INTO "tools_best_for" VALUES(37,1,4,'Hobbyists & Fun','Make personalized songs for friends, events, or just fun');
INSERT INTO "tools_best_for" VALUES(38,2,4,'Rapid Prototyping','Musicians can quickly test song ideas before full production');
INSERT INTO "tools_best_for" VALUES(39,3,4,'Podcasters','Generate custom intro/outro music');
INSERT INTO "tools_best_for" VALUES(40,0,19,'Filmmakers & Agencies','Professional quality and comprehensive tools');
INSERT INTO "tools_best_for" VALUES(41,1,19,'Content Creators','Create unique video content for social media');
INSERT INTO "tools_best_for" VALUES(42,2,19,'Motion Designers','AI-assisted motion graphics and effects');
INSERT INTO "tools_best_for" VALUES(43,3,19,'Marketing Teams','Rapid video ad creation and iteration');
INSERT INTO "tools_best_for" VALUES(44,0,36,'Google Workspace Users','Seamless integration with your existing Google tools');
INSERT INTO "tools_best_for" VALUES(45,1,36,'Android Users','Built into Android devices and Google Assistant');
INSERT INTO "tools_best_for" VALUES(46,0,22,'Power Users & Tinkerers','Maximum control and customization options');
INSERT INTO "tools_best_for" VALUES(47,1,22,'Privacy-Conscious Users','Run completely offline with no data sharing');
INSERT INTO "tools_best_for" VALUES(48,2,22,'High-Volume Creators','No per-image costs when running locally');
INSERT INTO "tools_best_for" VALUES(49,0,21,'Heavy Notion Users','AI assistance right where you work');
INSERT INTO "tools_best_for" VALUES(50,1,21,'Teams Using Notion','Shared AI benefits across workspace');
INSERT INTO "tools_best_for" VALUES(51,0,6,'Frontend Developers','Speed up UI development significantly');
INSERT INTO "tools_best_for" VALUES(52,1,6,'Designers Learning React','See how designs translate to code');
INSERT INTO "tools_best_for" VALUES(53,0,31,'Rapid Prototypers','Fastest way to validate ideas');
INSERT INTO "tools_best_for" VALUES(54,1,31,'Non-Developers','Build apps without coding knowledge');
INSERT INTO "tools_best_for" VALUES(55,0,35,'Developers on Budget','Massive API cost savings');
INSERT INTO "tools_best_for" VALUES(56,1,35,'Open Source Enthusiasts','Full models available to download');
INSERT INTO "tools_best_for" VALUES(57,0,15,'Game Developers','Perfect for game assets and concept art');
INSERT INTO "tools_best_for" VALUES(58,1,15,'Digital Artists','Train models on your own style');
INSERT INTO "tools_best_for" VALUES(59,0,3,'Audio Quality Enthusiasts','Best-in-class audio fidelity');
INSERT INTO "tools_best_for" VALUES(60,1,3,'Music Producers','Creates stems and tracks for further production');
INSERT INTO "tools_best_for" VALUES(61,2,3,'Commercial Music Needs','High-quality output for professional use');
INSERT INTO "tools_best_for" VALUES(62,0,12,'Technical Users','Those comfortable with APIs and local deployment');
INSERT INTO "tools_best_for" VALUES(63,1,12,'Quality-Focused Creators','Best prompt accuracy in the market');
INSERT INTO "tools_best_for" VALUES(64,2,12,'Open Source Advocates','Free models with permissive licenses');
INSERT INTO "tools_best_for" VALUES(65,0,13,'Graphic Designers','Text-heavy designs and typography work');
INSERT INTO "tools_best_for" VALUES(66,1,13,'Logo Creators','AI-assisted logo design with readable text');
INSERT INTO "tools_best_for" VALUES(67,2,13,'Marketers','Social media graphics with text overlays');
INSERT INTO "tools_best_for" VALUES(68,0,14,'Social Media Creators','Quick, fun content for TikTok/Instagram');
INSERT INTO "tools_best_for" VALUES(69,1,14,'Beginners to AI Video','Most accessible learning curve');
INSERT INTO "tools_best_for" VALUES(70,2,14,'Budget-Conscious Creators','Best value pricing in the category');
INSERT INTO "tools_best_for" VALUES(71,0,33,'Budget Creators','Best free AI video option');
INSERT INTO "tools_best_for" VALUES(72,1,33,'Long-Form Needs','Only option for 2-minute videos');
INSERT INTO "tools_best_for" VALUES(73,2,33,'Experimental Projects','Low-risk way to try AI video');
INSERT INTO "tools_best_for" VALUES(74,0,34,'Quality Seekers','Excellent motion quality for the price');
INSERT INTO "tools_best_for" VALUES(75,1,34,'Budget Creators','Good free tier to start');
INSERT INTO "tools_best_for" VALUES(76,2,34,'Experimenters','Worth trying alongside other tools');
INSERT INTO "tools_best_for" VALUES(77,0,26,'Beginners','Easy learning curve with powerful features');
INSERT INTO "tools_best_for" VALUES(78,1,26,'Microsoft 365 Users','Seamless integration');
INSERT INTO "tools_best_for" VALUES(79,2,26,'Budget Creators','Professional results at zero cost');
INSERT INTO "tools_best_for" VALUES(80,0,27,'Social Media Creators','Perfect for TikTok, Instagram, YouTube Shorts');
INSERT INTO "tools_best_for" VALUES(81,1,27,'Course Creators','Polish talking-head educational content');
INSERT INTO "tools_best_for" VALUES(82,2,27,'Podcasters','Turn podcast clips into captioned video');
INSERT INTO "tools_best_for" VALUES(83,0,28,'Marketing Teams','Scale video production with AI assistance');
INSERT INTO "tools_best_for" VALUES(84,1,28,'Content Agencies','Team collaboration and brand consistency');
INSERT INTO "tools_best_for" VALUES(85,2,28,'International Content','Excellent translation features');
INSERT INTO "tools_best_for" VALUES(86,0,29,'Marketing Teams','Rapid video ad creation');
INSERT INTO "tools_best_for" VALUES(87,1,29,'Social Media Managers','Quick content for multiple platforms');
INSERT INTO "tools_best_for" VALUES(88,2,29,'Small Businesses','Professional videos without video skills');
INSERT INTO "tools_best_for" VALUES(89,0,10,'Entertainment Seekers','Fun conversations with interesting characters');
INSERT INTO "tools_best_for" VALUES(90,1,10,'Roleplay Enthusiasts','Creative storytelling and character interaction');
INSERT INTO "tools_best_for" VALUES(91,2,10,'Language Learners','Practice conversations with patient AI');
INSERT INTO "tools_best_for" VALUES(92,0,11,'Researchers','Synthesize information across multiple papers');
INSERT INTO "tools_best_for" VALUES(93,1,11,'Students','Study materials and exam preparation');
INSERT INTO "tools_best_for" VALUES(94,2,11,'Content Creators','Turn documents into podcast content');
INSERT INTO "tools_best_for" VALUES(95,0,71,'Professional Writers','Essential for polished, error-free content');
INSERT INTO "tools_best_for" VALUES(96,1,71,'Non-Native Speakers','Excellent for improving English writing');
INSERT INTO "tools_best_for" VALUES(97,2,71,'Students','Academic writing assistance and plagiarism checking');
INSERT INTO "tools_best_for" VALUES(98,0,73,'Non-Native Writers','Get natural-sounding phrasing');
INSERT INTO "tools_best_for" VALUES(99,1,73,'Business Writers','Polish emails and reports');
INSERT INTO "tools_best_for" VALUES(100,2,73,'Students','Improve academic writing style');
INSERT INTO "tools_best_for" VALUES(101,0,44,'Marketing Teams','Built specifically for marketing content');
INSERT INTO "tools_best_for" VALUES(102,1,44,'Content Agencies','Workflow features for scaling content');
INSERT INTO "tools_best_for" VALUES(103,2,44,'Social Media Managers','Quick social post generation');
INSERT INTO "tools_best_for" VALUES(104,0,47,'Enterprise Marketing','Built for large marketing teams');
INSERT INTO "tools_best_for" VALUES(105,1,47,'Content Agencies','Manage multiple brand voices');
INSERT INTO "tools_best_for" VALUES(106,2,47,'Brand-Conscious Teams','Excellent brand consistency');
INSERT INTO "tools_best_for" VALUES(107,0,66,'SEO Bloggers','Strong SEO integration');
INSERT INTO "tools_best_for" VALUES(108,1,66,'Budget-Conscious Teams','Good value for money');
INSERT INTO "tools_best_for" VALUES(109,2,66,'Freelance Writers','Affordable for solopreneurs');
INSERT INTO "tools_best_for" VALUES(110,0,64,'SEO Agencies','Essential tool for client work');
INSERT INTO "tools_best_for" VALUES(111,1,64,'Content Teams','Systematic approach to SEO content');
INSERT INTO "tools_best_for" VALUES(112,2,64,'Affiliate Marketers','Optimize for competitive keywords');
INSERT INTO "tools_best_for" VALUES(113,0,65,'Enterprise Publishers','Used by major media companies');
INSERT INTO "tools_best_for" VALUES(114,1,65,'UX-Focused Teams','Best interface in the category');
INSERT INTO "tools_best_for" VALUES(115,2,65,'Content Agencies','Reliable, enterprise-grade tool');
INSERT INTO "tools_best_for" VALUES(116,0,42,'Creative Cloud Users','Included with subscription');
INSERT INTO "tools_best_for" VALUES(117,1,42,'Commercial Projects','Safe for client work with IP indemnification');
INSERT INTO "tools_best_for" VALUES(118,2,42,'Adobe Workflow Users','Seamless integration');
INSERT INTO "tools_best_for" VALUES(119,0,43,'Small Businesses','Professional designs without a designer');
INSERT INTO "tools_best_for" VALUES(120,1,43,'Social Media Managers','Rapid content creation');
INSERT INTO "tools_best_for" VALUES(121,2,43,'Non-Designers','Anyone can create professional content');
INSERT INTO "tools_best_for" VALUES(122,0,41,'Figma Users','AI enhancements to existing workflow');
INSERT INTO "tools_best_for" VALUES(123,1,41,'Design Teams','Productivity improvements for collaboration');
INSERT INTO "tools_best_for" VALUES(124,2,41,'Product Designers','AI-assisted UI/UX design');
INSERT INTO "tools_best_for" VALUES(125,0,45,'Startup Founders','Quick pitch decks and investor presentations');
INSERT INTO "tools_best_for" VALUES(126,1,45,'Marketers','Rapid campaign and strategy presentations');
INSERT INTO "tools_best_for" VALUES(127,2,45,'Educators','Create engaging lesson content');
INSERT INTO "tools_best_for" VALUES(128,0,46,'Startup Founders','Compelling investor pitch decks');
INSERT INTO "tools_best_for" VALUES(129,1,46,'Creatives','Portfolio presentations and case studies');
INSERT INTO "tools_best_for" VALUES(130,2,46,'Thought Leaders','Narrative-driven content');
INSERT INTO "tools_best_for" VALUES(131,0,52,'Freelancers','Quick portfolio and personal sites');
INSERT INTO "tools_best_for" VALUES(132,1,52,'Startups','Rapid landing page creation');
INSERT INTO "tools_best_for" VALUES(133,2,52,'Agencies','Fast client site prototypes');
INSERT INTO "tools_best_for" VALUES(134,0,58,'Power Users','Complex automation requirements');
INSERT INTO "tools_best_for" VALUES(135,1,58,'Agencies','Client automation at scale');
INSERT INTO "tools_best_for" VALUES(136,2,58,'Data-Heavy Workflows','Excellent data transformation');
INSERT INTO "tools_best_for" VALUES(137,0,59,'Developers','Code integration and customization');
INSERT INTO "tools_best_for" VALUES(138,1,59,'Privacy-Focused Teams','Self-hosting for data control');
INSERT INTO "tools_best_for" VALUES(139,2,59,'Cost-Conscious Power Users','Unlimited free executions');
INSERT INTO "tools_best_for" VALUES(140,0,60,'Sales Teams','Lead research and CRM enrichment');
INSERT INTO "tools_best_for" VALUES(141,1,60,'Recruiters','Candidate sourcing and outreach');
INSERT INTO "tools_best_for" VALUES(142,2,60,'Researchers','Data collection from web sources');
INSERT INTO "tools_best_for" VALUES(143,0,39,'Automation Beginners','Easiest platform to learn');
INSERT INTO "tools_best_for" VALUES(144,1,39,'Small Businesses','Quick setup for common workflows');
INSERT INTO "tools_best_for" VALUES(145,2,39,'Integration-Heavy Needs','Largest app library available');
INSERT INTO "tools_best_for" VALUES(146,0,1,'Video Creators','Quick background music for YouTube/TikTok');
INSERT INTO "tools_best_for" VALUES(147,1,1,'Podcasters','Intro/outro and background music');
INSERT INTO "tools_best_for" VALUES(148,2,1,'App Developers','In-app background audio');
INSERT INTO "tools_best_for" VALUES(149,0,5,'Learners','Best way to start coding');
INSERT INTO "tools_best_for" VALUES(150,1,5,'Quick Projects','Prototype and deploy fast');
INSERT INTO "tools_best_for" VALUES(151,2,5,'Educators','Share and collaborate on code');
INSERT INTO "tools_best_for" VALUES(152,0,67,'3D Artists','Quick asset creation from photos');
INSERT INTO "tools_best_for" VALUES(153,1,67,'Game Developers','3D environments from real locations');
INSERT INTO "tools_best_for" VALUES(154,2,67,'AR/VR Creators','Capture real-world scenes');
INSERT INTO "tools_best_for" VALUES(155,0,48,'Indie Game Devs','Quick asset creation');
INSERT INTO "tools_best_for" VALUES(156,1,48,'3D Artists','Rapid prototyping and concepting');
INSERT INTO "tools_best_for" VALUES(157,0,70,'3D Artists','Quick asset generation');
INSERT INTO "tools_best_for" VALUES(158,0,75,'AI Explorers','Try multiple AIs with one subscription');
INSERT INTO "tools_best_for" VALUES(159,1,75,'Comparison Shoppers','See which AI works best for you');
INSERT INTO "tools_best_for" VALUES(160,0,74,'Seeking Companionship','AI that listens and supports');
INSERT INTO "tools_best_for" VALUES(161,1,74,'Casual Conversations','Friendly chat without productivity pressure');
INSERT INTO "tools_best_for" VALUES(162,0,76,'X Power Users','Already paying for Premium+');
INSERT INTO "tools_best_for" VALUES(163,1,76,'Current Events','Real-time information needs');
INSERT INTO "tools_best_for" VALUES(164,0,72,'Novelists','Purpose-built for long-form fiction');
INSERT INTO "tools_best_for" VALUES(165,1,72,'Writers with Block','Excellent for getting unstuck');
INSERT INTO "tools_best_for" VALUES(166,0,53,'Non-Technical Analysts','Data insights without coding');
INSERT INTO "tools_best_for" VALUES(167,1,53,'Quick Exploration','Fast analysis of new datasets');
INSERT INTO "tools_best_for" VALUES(168,0,37,'Developers','Faster, smarter terminal');
INSERT INTO "tools_best_for" VALUES(169,1,37,'Terminal Learners','AI helps learn commands');
INSERT INTO "tools_best_for" VALUES(170,0,30,'Large Law Firms','Enterprise-grade legal AI');
INSERT INTO "tools_best_for" VALUES(171,0,38,'Sales Teams','Data enrichment at scale');
INSERT INTO "tools_best_for" VALUES(172,1,38,'GTM Teams','Outbound automation');
INSERT INTO "tools_best_for" VALUES(173,0,49,'Web Designers','3D elements for websites');
INSERT INTO "tools_best_for" VALUES(174,0,50,'WordPress Users','AI generation with WordPress flexibility');
INSERT INTO "tools_best_for" VALUES(175,0,51,'Local Businesses','Quick online presence');
INSERT INTO "tools_best_for" VALUES(176,0,54,'Data Teams','Modern spreadsheet for analytics');
INSERT INTO "tools_best_for" VALUES(177,0,55,'Business Analysts','ML without coding');
INSERT INTO "tools_best_for" VALUES(178,0,56,'Business Teams','Predictions without data science');
INSERT INTO "tools_best_for" VALUES(179,0,57,'Data Teams','Modern collaborative analytics');
INSERT INTO "tools_best_for" VALUES(180,0,61,'Approval Workflows','Automation needing human review');
INSERT INTO "tools_best_for" VALUES(181,0,62,'Technical Teams','Free automation with self-hosting');
INSERT INTO "tools_best_for" VALUES(182,0,9,'Hobbyist Artists','Great community and social features');
INSERT INTO "tools_best_for" VALUES(183,1,9,'Beginners','Easy to learn AI art creation');
INSERT INTO "tools_best_for" VALUES(184,0,17,'Developers','Excellent API for building AI apps');
INSERT INTO "tools_best_for" VALUES(185,1,17,'Startups','Scalable and cost-effective');
INSERT INTO "tools_best_for" VALUES(186,0,68,'Game Developers','Rapid 3D asset creation');
INSERT INTO "tools_best_for" VALUES(187,1,68,'E-commerce Teams','Product visualization');
INSERT INTO "tools_best_for" VALUES(188,0,69,'Game Developers','Quick 3D asset generation');
INSERT INTO "tools_best_for" VALUES(189,1,69,'3D Hobbyists','Great free tier for learning');
CREATE TABLE IF NOT EXISTS "tools_not_ideal_for" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "persona" text,
    "reason" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_not_ideal_for" VALUES(1,0,25,'Those needing 100% accuracy','AI can hallucinate - always verify critical facts');
INSERT INTO "tools_not_ideal_for" VALUES(2,1,25,'Real-time data requirements','Web browsing is not instant');
INSERT INTO "tools_not_ideal_for" VALUES(3,0,18,'Budget-Conscious Beginners','No free tier means commitment before trying');
INSERT INTO "tools_not_ideal_for" VALUES(4,1,18,'Technical Illustration','Better tools exist for diagrams and schematics');
INSERT INTO "tools_not_ideal_for" VALUES(5,0,23,'Image Generation Needs','Claude is text-only - use ChatGPT/DALL-E or Midjourney for images');
INSERT INTO "tools_not_ideal_for" VALUES(6,1,23,'Plugin/Integration Heavy Workflows','ChatGPT has a larger ecosystem of integrations');
INSERT INTO "tools_not_ideal_for" VALUES(7,0,8,'Air-Gapped Environments','Requires internet connection to function');
INSERT INTO "tools_not_ideal_for" VALUES(8,1,8,'Those Needing Local-Only AI','Code is processed on GitHub servers');
INSERT INTO "tools_not_ideal_for" VALUES(9,0,7,'Those Preferring Stability','VS Code + Copilot is more battle-tested');
INSERT INTO "tools_not_ideal_for" VALUES(10,1,7,'JetBrains Users','Cursor is VS Code-based; JetBrains has its own AI tools');
INSERT INTO "tools_not_ideal_for" VALUES(11,0,24,'Fine Art Aesthetics','Midjourney produces more visually striking artistic images');
INSERT INTO "tools_not_ideal_for" VALUES(12,1,24,'Technical Control','Stable Diffusion offers more parameters for power users');
INSERT INTO "tools_not_ideal_for" VALUES(13,0,20,'Creative Writing','Use ChatGPT or Claude for fiction/creative tasks');
INSERT INTO "tools_not_ideal_for" VALUES(14,1,20,'Coding Assistance','GitHub Copilot or Cursor better for development');
INSERT INTO "tools_not_ideal_for" VALUES(15,0,32,'Hobbyists on Budget','Runway or Pika offer similar features much cheaper');
INSERT INTO "tools_not_ideal_for" VALUES(16,1,32,'High-Volume Production','Generation times still slow for mass production');
INSERT INTO "tools_not_ideal_for" VALUES(17,0,2,'Live/Real-Time Use','Latency makes it unsuitable for real-time voice applications');
INSERT INTO "tools_not_ideal_for" VALUES(18,1,2,'Tight Budgets with High Volume','Per-character pricing adds up for large projects');
INSERT INTO "tools_not_ideal_for" VALUES(19,0,4,'Professional Musicians','Lacks the control needed for serious music production');
INSERT INTO "tools_not_ideal_for" VALUES(20,1,4,'Specific Sound Design','Can''t request exact instruments or production techniques');
INSERT INTO "tools_not_ideal_for" VALUES(21,0,19,'Budget-Conscious Hobbyists','Pika or free tiers of other tools are more affordable');
INSERT INTO "tools_not_ideal_for" VALUES(22,1,19,'Long-Form Video Needs','Max clip length limits use for longer content');
INSERT INTO "tools_not_ideal_for" VALUES(23,0,3,'Complete Beginners','Suno is more beginner-friendly');
INSERT INTO "tools_not_ideal_for" VALUES(24,1,3,'Quick Casual Songs','If speed matters more than quality');
INSERT INTO "tools_not_ideal_for" VALUES(25,0,12,'Non-Technical Users','No simple interface - use Midjourney instead');
INSERT INTO "tools_not_ideal_for" VALUES(26,1,12,'Discord Workflow Fans','No native Discord bot like Midjourney');
INSERT INTO "tools_not_ideal_for" VALUES(27,0,13,'Fine Art Creation','Midjourney better for artistic imagery');
INSERT INTO "tools_not_ideal_for" VALUES(28,1,13,'Photorealistic Needs','Flux or DALL-E may produce more realistic photos');
INSERT INTO "tools_not_ideal_for" VALUES(29,0,14,'Professional Filmmakers','Runway or Sora offer higher quality');
INSERT INTO "tools_not_ideal_for" VALUES(30,1,14,'Long-Form Content','4-second limit is restrictive');
INSERT INTO "tools_not_ideal_for" VALUES(31,0,33,'Privacy-Sensitive Users','Chinese data storage may be a concern');
INSERT INTO "tools_not_ideal_for" VALUES(32,1,33,'Professional Productions','Runway/Sora still have quality edge');
INSERT INTO "tools_not_ideal_for" VALUES(33,0,34,'Enterprise Users','Less established for professional workflows');
INSERT INTO "tools_not_ideal_for" VALUES(34,1,34,'Privacy-First Users','Chinese data storage');
INSERT INTO "tools_not_ideal_for" VALUES(35,0,26,'Professional Editors','Premiere Pro or DaVinci for advanced work');
INSERT INTO "tools_not_ideal_for" VALUES(36,1,26,'Mac Power Users','Final Cut Pro offers more on Mac');
INSERT INTO "tools_not_ideal_for" VALUES(37,0,27,'Non-Talking Content','AI features focus on face-to-camera');
INSERT INTO "tools_not_ideal_for" VALUES(38,1,27,'Complex Video Projects','Use Premiere or DaVinci for advanced editing');
INSERT INTO "tools_not_ideal_for" VALUES(39,0,28,'Casual Creators','CapCut or Clipchamp are simpler and cheaper');
INSERT INTO "tools_not_ideal_for" VALUES(40,1,28,'Professional Editors','Desktop NLEs still more powerful');
INSERT INTO "tools_not_ideal_for" VALUES(41,0,29,'Brand-Conscious Companies','Results can feel generic');
INSERT INTO "tools_not_ideal_for" VALUES(42,1,29,'Custom Content Needs','Limited to available stock footage');
INSERT INTO "tools_not_ideal_for" VALUES(43,0,10,'Productivity Needs','Use ChatGPT or Claude for work tasks');
INSERT INTO "tools_not_ideal_for" VALUES(44,1,10,'Adult Content','Strict content filters in place');
INSERT INTO "tools_not_ideal_for" VALUES(45,0,11,'Real-Time Info Needs','Only works with uploaded documents, not web search');
INSERT INTO "tools_not_ideal_for" VALUES(46,1,11,'Non-Google Users','Requires Google account');
INSERT INTO "tools_not_ideal_for" VALUES(47,0,71,'Non-English Writers','Limited language support');
INSERT INTO "tools_not_ideal_for" VALUES(48,1,71,'AI Content Generation','Use Jasper or Copy.ai for content creation');
INSERT INTO "tools_not_ideal_for" VALUES(49,0,73,'Grammar Help Needs','Use Grammarly for error checking');
INSERT INTO "tools_not_ideal_for" VALUES(50,1,73,'Content Creation','Use Jasper or Copy.ai for generating content');
INSERT INTO "tools_not_ideal_for" VALUES(51,0,44,'Casual Users','Too expensive for occasional use');
INSERT INTO "tools_not_ideal_for" VALUES(52,1,44,'Long-Form Writers','Jasper may be better for blog posts');
INSERT INTO "tools_not_ideal_for" VALUES(53,0,47,'Budget-Conscious Users','Cheaper alternatives exist');
INSERT INTO "tools_not_ideal_for" VALUES(54,1,47,'Occasional Writers','Not worth it for infrequent use');
INSERT INTO "tools_not_ideal_for" VALUES(55,0,66,'Enterprise Brands','Jasper offers better brand features');
INSERT INTO "tools_not_ideal_for" VALUES(56,1,66,'Quality-First Writers','Quality can be inconsistent');
INSERT INTO "tools_not_ideal_for" VALUES(57,0,64,'Casual Bloggers','Too expensive for occasional use');
INSERT INTO "tools_not_ideal_for" VALUES(58,1,64,'Non-SEO Content','Not needed for social or internal content');
INSERT INTO "tools_not_ideal_for" VALUES(59,0,65,'Budget Teams','Surfer offers more for less');
INSERT INTO "tools_not_ideal_for" VALUES(60,1,65,'AI Writing Needs','No AI content generation');
INSERT INTO "tools_not_ideal_for" VALUES(61,0,42,'Artistic Quality First','Midjourney produces more impressive art');
INSERT INTO "tools_not_ideal_for" VALUES(62,1,42,'Non-Adobe Users','Less value without Creative Cloud');
INSERT INTO "tools_not_ideal_for" VALUES(63,0,43,'Professional Designers','Figma or Adobe offer more control');
INSERT INTO "tools_not_ideal_for" VALUES(64,1,43,'Unique Brand Needs','Results can feel templated');
INSERT INTO "tools_not_ideal_for" VALUES(65,0,41,'AI-First Generation','Canva Magic Studio is more capable');
INSERT INTO "tools_not_ideal_for" VALUES(66,1,41,'Non-Designers','Learning curve for Figma itself');
INSERT INTO "tools_not_ideal_for" VALUES(67,0,45,'Brand-Specific Needs','Limited branding customization');
INSERT INTO "tools_not_ideal_for" VALUES(68,1,45,'PowerPoint Power Users','Less precise control');
INSERT INTO "tools_not_ideal_for" VALUES(69,0,46,'Traditional Business','May prefer conventional slide formats');
INSERT INTO "tools_not_ideal_for" VALUES(70,1,46,'Budget-Conscious','Gamma offers similar for less');
INSERT INTO "tools_not_ideal_for" VALUES(71,0,52,'Web App Builders','Static sites only');
INSERT INTO "tools_not_ideal_for" VALUES(72,1,52,'E-commerce Needs','Use Shopify or dedicated platforms');
INSERT INTO "tools_not_ideal_for" VALUES(73,0,58,'Beginners','Zapier is easier to start with');
INSERT INTO "tools_not_ideal_for" VALUES(74,1,58,'Simple Automations','Overkill for basic workflows');
INSERT INTO "tools_not_ideal_for" VALUES(75,0,59,'Non-Technical Users','Zapier is much easier');
INSERT INTO "tools_not_ideal_for" VALUES(76,1,59,'Quick Setup Needs','Cloud alternatives are faster to start');
INSERT INTO "tools_not_ideal_for" VALUES(77,0,60,'Non-Web Workflows','Make or Zapier better for app-to-app');
INSERT INTO "tools_not_ideal_for" VALUES(78,1,60,'Non-Chrome Users','Requires Chrome browser');
INSERT INTO "tools_not_ideal_for" VALUES(79,0,39,'Cost-Conscious Power Users','Make offers better value');
INSERT INTO "tools_not_ideal_for" VALUES(80,1,39,'Complex Logic Needs','Make handles complexity better');
INSERT INTO "tools_not_ideal_for" VALUES(81,0,1,'Music Producers','Suno/Udio offer more creative control');
INSERT INTO "tools_not_ideal_for" VALUES(82,1,1,'Vocal Tracks','No vocal generation');
INSERT INTO "tools_not_ideal_for" VALUES(83,0,5,'Production Apps','Traditional hosting more robust');
INSERT INTO "tools_not_ideal_for" VALUES(84,1,5,'Large Codebases','Local IDEs handle scale better');
INSERT INTO "tools_not_ideal_for" VALUES(85,0,67,'Precision 3D Modeling','CAD tools for precise engineering');
INSERT INTO "tools_not_ideal_for" VALUES(86,1,67,'Animated Characters','Better tools for rigged characters');
INSERT INTO "tools_not_ideal_for" VALUES(87,0,48,'AAA Production','Hand-crafted models still superior');
INSERT INTO "tools_not_ideal_for" VALUES(88,0,70,'Production Work','Consider more established tools');
INSERT INTO "tools_not_ideal_for" VALUES(89,0,75,'Single AI Power Users','Direct subscriptions may offer more');
INSERT INTO "tools_not_ideal_for" VALUES(90,0,74,'Work Tasks','Use ChatGPT or Claude');
INSERT INTO "tools_not_ideal_for" VALUES(91,1,74,'Research Needs','Limited knowledge capabilities');
INSERT INTO "tools_not_ideal_for" VALUES(92,0,76,'Non-X Users','Bundle pricing less valuable');
INSERT INTO "tools_not_ideal_for" VALUES(93,1,76,'Work Tasks','ChatGPT/Claude more capable');
INSERT INTO "tools_not_ideal_for" VALUES(94,0,72,'Non-Fiction Writers','Use Jasper or Copy.ai');
INSERT INTO "tools_not_ideal_for" VALUES(95,1,72,'Short Content','Overkill for blog posts');
INSERT INTO "tools_not_ideal_for" VALUES(96,0,53,'Data Scientists','Prefer Python/R for control');
INSERT INTO "tools_not_ideal_for" VALUES(97,1,53,'Production Pipelines','Not for automated workflows');
INSERT INTO "tools_not_ideal_for" VALUES(98,0,37,'Linux/Windows Users','Mac only for now');
INSERT INTO "tools_not_ideal_for" VALUES(99,1,37,'Minimal Setup Fans','More complex than basic terminals');
INSERT INTO "tools_not_ideal_for" VALUES(100,0,30,'Solo Practitioners','Too expensive for individuals');
INSERT INTO "tools_not_ideal_for" VALUES(101,0,38,'Small Businesses','Too expensive for low volume');
INSERT INTO "tools_not_ideal_for" VALUES(102,0,49,'Game Developers','Use Blender or Unity');
INSERT INTO "tools_not_ideal_for" VALUES(103,0,50,'Non-WordPress Users','Framer AI simpler');
INSERT INTO "tools_not_ideal_for" VALUES(104,0,51,'Design-Focused','Use Framer for more control');
INSERT INTO "tools_not_ideal_for" VALUES(105,0,54,'Basic Needs','Google Sheets is free');
INSERT INTO "tools_not_ideal_for" VALUES(106,0,55,'Data Scientists','Python offers more control');
INSERT INTO "tools_not_ideal_for" VALUES(107,0,56,'Technical Users','Python offers more flexibility');
INSERT INTO "tools_not_ideal_for" VALUES(108,0,57,'Non-Technical','Requires data skills');
INSERT INTO "tools_not_ideal_for" VALUES(109,0,61,'Full Automation','Use Zapier for hands-off workflows');
INSERT INTO "tools_not_ideal_for" VALUES(110,0,62,'Non-Technical','Zapier easier to use');
INSERT INTO "tools_not_ideal_for" VALUES(111,0,9,'Commercial Artists','Quality below professional standards');
INSERT INTO "tools_not_ideal_for" VALUES(112,1,9,'Power Users','Limited advanced controls');
INSERT INTO "tools_not_ideal_for" VALUES(113,0,17,'Non-Technical Users','Requires coding knowledge');
INSERT INTO "tools_not_ideal_for" VALUES(114,1,17,'Casual Creators','No visual interface');
INSERT INTO "tools_not_ideal_for" VALUES(115,0,68,'Architects','Not suited for detailed buildings');
INSERT INTO "tools_not_ideal_for" VALUES(116,1,68,'Animators','No rigging included');
INSERT INTO "tools_not_ideal_for" VALUES(117,0,69,'CAD Users','Not for precise mechanical models');
INSERT INTO "tools_not_ideal_for" VALUES(118,1,69,'Impatient Users','Processing can take time');
CREATE TABLE IF NOT EXISTS "tools_use_case_scenarios" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "persona" text,
    "problem" text,
    "solution" text,
    "outcome" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE IF NOT EXISTS "tools_faqs" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "question" text,
    "answer" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_faqs" VALUES(1,0,25,'Is ChatGPT free to use?','Yes, ChatGPT offers a free tier with GPT-5.2 Instant access (~10 messages per 5 hours). Plus is $20/mo, Pro is $200/mo.');
INSERT INTO "tools_faqs" VALUES(2,1,25,'What is the difference between Plus and Pro?','Plus ($20/mo) gives 5x usage limits and GPT-5.2 Thinking. Pro ($200/mo) provides unlimited GPT-5.2 Pro access and Sora 2 video.');
INSERT INTO "tools_faqs" VALUES(3,2,25,'How many people use ChatGPT?','Over 900 million weekly active users. It is the 6th most visited website globally.');
INSERT INTO "tools_faqs" VALUES(4,3,25,'Can ChatGPT write code?','Yes, ChatGPT excels at code generation in 50+ programming languages including Python, JavaScript, and more.');
INSERT INTO "tools_faqs" VALUES(5,4,25,'Is ChatGPT safe for business use?','Enterprise and Team plans offer SOC 2 Type II compliance, SAML SSO, and data not used for training.');
INSERT INTO "tools_faqs" VALUES(6,0,18,'Is Midjourney free?','No, Midjourney does not offer a free tier. The cheapest plan is Basic at $10/month for ~200 images.');
INSERT INTO "tools_faqs" VALUES(7,1,18,'How much does Midjourney cost?','Basic $10/mo, Standard $30/mo (most popular), Pro $60/mo, Mega $120/mo. Annual plans get 20% off.');
INSERT INTO "tools_faqs" VALUES(8,2,18,'Is Midjourney better than DALL-E?','For artistic quality and aesthetics, Midjourney generally produces more visually stunning results. DALL-E integrates better with ChatGPT.');
INSERT INTO "tools_faqs" VALUES(9,3,18,'How do I use Midjourney?','Join the Midjourney Discord server or use the web editor. Type /imagine followed by your prompt to generate images.');
INSERT INTO "tools_faqs" VALUES(10,4,18,'Can I use Midjourney images commercially?','Yes, all paid plans include commercial use rights. Pro/Mega add Stealth Mode for privacy.');
INSERT INTO "tools_faqs" VALUES(11,0,23,'Is Claude free to use?','Yes, Claude offers a free tier with access to Claude 3.5 Sonnet and limited daily messages. Pro costs $20/month for higher limits and access to Claude Opus.');
INSERT INTO "tools_faqs" VALUES(12,1,23,'Is Claude better than ChatGPT?','Claude excels at long-document analysis (200K context), nuanced reasoning, and following complex instructions. ChatGPT has a larger ecosystem and image generation. Choose based on your needs.');
INSERT INTO "tools_faqs" VALUES(13,2,23,'What is Claude''s context window?','Claude supports up to 200,000 tokens (about 150,000 words or 500 pages), far larger than most competitors. This allows analyzing entire books or codebases.');
INSERT INTO "tools_faqs" VALUES(14,3,23,'Who makes Claude?','Claude is developed by Anthropic, an AI safety company founded in 2021 by former OpenAI researchers including Dario and Daniela Amodei. They''ve raised over $7 billion.');
INSERT INTO "tools_faqs" VALUES(15,4,23,'Can Claude write code?','Yes, Claude 3.5 Sonnet is excellent at coding, rivaling GPT-4 on benchmarks. It can write, explain, debug, and refactor code in most programming languages.');
INSERT INTO "tools_faqs" VALUES(16,0,8,'Is GitHub Copilot free?','Free for verified students and open source maintainers. For others, Individual costs $10/month or $100/year after a free trial.');
INSERT INTO "tools_faqs" VALUES(17,1,8,'Is GitHub Copilot worth $10/month?','For professional developers, yes. Studies show 55% faster task completion. The productivity gains typically far exceed the cost.');
INSERT INTO "tools_faqs" VALUES(18,2,8,'What IDEs support GitHub Copilot?','VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, etc.), Neovim, and GitHub.com itself.');
INSERT INTO "tools_faqs" VALUES(19,3,8,'Does GitHub Copilot use my code for training?','GitHub Copilot Business and Enterprise do not use your code for training. Individual plan has opt-out options.');
INSERT INTO "tools_faqs" VALUES(20,4,8,'How does Copilot compare to Cursor?','Copilot excels at inline completions and GitHub integration. Cursor offers more autonomous coding features and uses Claude/GPT-4. Many developers use both.');
INSERT INTO "tools_faqs" VALUES(21,0,7,'Is Cursor free?','Yes, Cursor has a free Hobby tier with 2000 completions/month. Pro costs $20/month for unlimited AI access.');
INSERT INTO "tools_faqs" VALUES(22,1,7,'Is Cursor better than VS Code with Copilot?','Cursor offers more autonomous AI features like multi-file editing (Composer) and deeper codebase understanding. Copilot excels at inline completions. Many developers see Cursor as the next evolution.');
INSERT INTO "tools_faqs" VALUES(23,2,7,'What AI models does Cursor use?','Cursor supports Claude 3.5 Sonnet/Opus and GPT-4. You can switch between them based on the task.');
INSERT INTO "tools_faqs" VALUES(24,3,7,'Can I use my VS Code extensions in Cursor?','Yes, Cursor is a VS Code fork, so most extensions work. Some may have compatibility issues.');
INSERT INTO "tools_faqs" VALUES(25,4,7,'How does Cursor compare to GitHub Copilot?','Copilot is best for inline completions. Cursor offers more ambitious features like multi-file editing and chat-based development. Different philosophies - incremental assistance vs AI-first IDE.');
INSERT INTO "tools_faqs" VALUES(26,0,24,'How do I access DALL-E 3?','DALL-E 3 is integrated into ChatGPT. Subscribe to ChatGPT Plus ($20/mo) or Pro ($200/mo), then ask ChatGPT to create an image.');
INSERT INTO "tools_faqs" VALUES(27,1,24,'Is DALL-E 3 free?','No free tier. Access requires ChatGPT Plus ($20/mo minimum) or API usage ($0.04-$0.12 per image).');
INSERT INTO "tools_faqs" VALUES(28,2,24,'Is DALL-E 3 better than Midjourney?','DALL-E 3 excels at prompt adherence and text in images. Midjourney produces more aesthetically artistic results. Choose based on your needs.');
INSERT INTO "tools_faqs" VALUES(29,3,24,'Can DALL-E 3 generate text in images?','Yes, DALL-E 3 is the best AI image generator for creating legible text, signs, and typography in images.');
INSERT INTO "tools_faqs" VALUES(30,4,24,'What resolution does DALL-E 3 support?','Standard: 1024x1024. HD: 1024x1792 or 1792x1024 (landscape/portrait).');
INSERT INTO "tools_faqs" VALUES(31,0,20,'Is Perplexity AI free?','Yes, Perplexity offers unlimited free searches plus 5 Pro searches per day at no cost. Pro costs $20/month for heavy users.');
INSERT INTO "tools_faqs" VALUES(32,1,20,'Is Perplexity better than ChatGPT?','For research and factual questions, yes - Perplexity provides citations and real-time web data. ChatGPT is better for creative tasks, coding, and conversations.');
INSERT INTO "tools_faqs" VALUES(33,2,20,'Is Perplexity better than Google?','For complex questions that need synthesized answers, Perplexity often is. For navigational searches (finding a specific site), Google is faster.');
INSERT INTO "tools_faqs" VALUES(34,3,20,'What AI models does Perplexity use?','Free tier uses Perplexity''s Sonar model. Pro adds GPT-4 Turbo, Claude 3 Opus, and specialized models.');
INSERT INTO "tools_faqs" VALUES(35,4,20,'Does Perplexity cite sources?','Yes, this is Perplexity''s key feature. Every factual claim includes inline citations linking to the original source.');
INSERT INTO "tools_faqs" VALUES(36,0,32,'How do I access Sora?','Sora is available through ChatGPT. Plus subscribers ($20/mo) get limited Sora 1 access. Pro subscribers ($200/mo) get unlimited Sora 2 Pro.');
INSERT INTO "tools_faqs" VALUES(37,1,32,'Is Sora free?','No, Sora requires a ChatGPT subscription. The minimum is ChatGPT Plus at $20/month for limited generations.');
INSERT INTO "tools_faqs" VALUES(38,2,32,'Is Sora better than Runway?','Sora produces higher quality, longer videos (up to 60s vs 10s), but costs significantly more. Runway is better value for most users.');
INSERT INTO "tools_faqs" VALUES(39,3,32,'How long can Sora videos be?','ChatGPT Plus: up to 5 seconds. ChatGPT Pro: up to 60 seconds at 1080p.');
INSERT INTO "tools_faqs" VALUES(40,4,32,'Can Sora generate any video?','Sora has content policies prohibiting violence, explicit content, and real people without consent. C2PA metadata marks all outputs as AI-generated.');
INSERT INTO "tools_faqs" VALUES(41,0,2,'Is ElevenLabs free?','Yes, ElevenLabs offers a free tier with 10,000 characters/month - enough for about 10 minutes of audio. Paid plans start at $5/month.');
INSERT INTO "tools_faqs" VALUES(42,1,2,'Is ElevenLabs the best AI voice?','ElevenLabs is widely considered the most natural-sounding AI voice generator. It consistently outperforms competitors in blind listening tests.');
INSERT INTO "tools_faqs" VALUES(43,2,2,'Can I clone my own voice with ElevenLabs?','Yes, voice cloning is available on paid plans. Instant cloning works with short samples. Professional cloning with longer samples produces better results.');
INSERT INTO "tools_faqs" VALUES(44,3,2,'What languages does ElevenLabs support?','ElevenLabs supports 29 languages including English, Spanish, French, German, Chinese, Japanese, and more with natural-sounding speech.');
INSERT INTO "tools_faqs" VALUES(45,4,2,'Can I use ElevenLabs commercially?','Yes, commercial use is allowed on Creator ($22/mo) and higher plans. Check their terms for specific usage rights.');
INSERT INTO "tools_faqs" VALUES(46,0,4,'Is Suno AI free?','Yes, Suno offers 50 free credits per day - enough to generate about 10 complete songs. Paid plans start at $10/month for more credits and commercial use.');
INSERT INTO "tools_faqs" VALUES(47,1,4,'How do I use Suno AI?','Go to suno.ai, describe your song (genre, mood, topic), and click generate. Suno creates full songs with lyrics and vocals in about 30 seconds.');
INSERT INTO "tools_faqs" VALUES(48,2,4,'Can I use Suno songs commercially?','Free tier is non-commercial only. Pro ($10/mo) and Premier ($30/mo) include commercial use licenses for your generated songs.');
INSERT INTO "tools_faqs" VALUES(49,3,4,'Is Suno better than Udio?','Both are excellent. Suno is more accessible and beginner-friendly. Udio offers more control and sometimes better audio quality. Try both with free tiers.');
INSERT INTO "tools_faqs" VALUES(50,4,4,'Who owns Suno AI songs?','Songs you generate are owned by you, but check terms of service for specific rights. Commercial use requires a paid subscription.');
INSERT INTO "tools_faqs" VALUES(51,0,19,'Is Runway ML free?','Runway offers 125 free credits to start. After that, paid plans start at $15/month for 625 credits.');
INSERT INTO "tools_faqs" VALUES(52,1,19,'Is Runway better than Sora?','Runway is more accessible (no ChatGPT Pro subscription needed) and has more editing tools. Sora produces longer, higher-quality videos but costs more. Runway is better for most professionals.');
INSERT INTO "tools_faqs" VALUES(53,2,19,'What is Gen-3 Alpha?','Gen-3 Alpha is Runway''s latest video generation model, offering improved quality, consistency, and control compared to Gen-2.');
INSERT INTO "tools_faqs" VALUES(54,3,19,'Can I use Runway videos commercially?','Yes, all paid plans include commercial use rights for your generated content.');
INSERT INTO "tools_faqs" VALUES(55,4,19,'How long can Runway videos be?','Free: 5 seconds. Paid plans: up to 10 seconds per generation. You can extend clips using Extend feature.');
INSERT INTO "tools_faqs" VALUES(56,0,36,'Is Google Gemini free?','Yes, basic Gemini is free. Gemini Advanced costs $20/month and includes 2TB Google One storage.');
INSERT INTO "tools_faqs" VALUES(57,1,36,'Is Gemini better than ChatGPT?','Gemini excels at Google integration and has a larger context window. ChatGPT is stronger at reasoning and has a larger ecosystem. Choose based on your needs.');
INSERT INTO "tools_faqs" VALUES(58,2,36,'What is Gemini''s context window?','Gemini 1.5 Pro supports 1 million tokens - the largest of any major AI, able to process entire books or codebases.');
INSERT INTO "tools_faqs" VALUES(59,0,22,'Is Stable Diffusion free?','Yes, Stable Diffusion is open source and free to run locally. Cloud services like DreamStudio charge per image.');
INSERT INTO "tools_faqs" VALUES(60,1,22,'What GPU do I need for Stable Diffusion?','Minimum: NVIDIA GPU with 4GB VRAM. Recommended: 8GB+ VRAM (RTX 3060 or better). Apple M1/M2 Macs also work.');
INSERT INTO "tools_faqs" VALUES(61,2,22,'Is Stable Diffusion better than Midjourney?','Midjourney produces more consistent, aesthetic results with less effort. Stable Diffusion offers more control and is free locally. Different tools for different needs.');
INSERT INTO "tools_faqs" VALUES(62,0,21,'How much does Notion AI cost?','Notion AI is $10 per member per month, added on top of your existing Notion subscription.');
INSERT INTO "tools_faqs" VALUES(63,1,21,'Is Notion AI worth it?','For heavy Notion users, the time saved on summarization, writing, and organization typically justifies the $10/month cost.');
INSERT INTO "tools_faqs" VALUES(64,0,6,'Is v0 free?','Yes, v0 offers 200 free credits/month. Premium costs $20/month for 5000 credits.');
INSERT INTO "tools_faqs" VALUES(65,1,6,'What code does v0 generate?','v0 generates React components using TypeScript, Tailwind CSS, and shadcn/ui - production-ready code.');
INSERT INTO "tools_faqs" VALUES(66,0,31,'Is Bolt.new free?','Yes, Bolt offers a free tier with limited tokens. Pro costs $20/month for 10M tokens.');
INSERT INTO "tools_faqs" VALUES(67,1,31,'What can I build with Bolt?','Full-stack web apps including React/Vue frontends and Node.js backends. Great for MVPs and prototypes.');
INSERT INTO "tools_faqs" VALUES(68,0,35,'Is DeepSeek free?','Chat is free. API costs ~$0.14/M tokens - about 100x cheaper than GPT-4. Models can be downloaded free for local use.');
INSERT INTO "tools_faqs" VALUES(69,1,35,'Is DeepSeek as good as GPT-4?','DeepSeek V3 competes closely with GPT-4 on benchmarks. For most tasks, the quality is comparable at a fraction of the cost.');
INSERT INTO "tools_faqs" VALUES(70,0,15,'Is Leonardo AI free?','Yes, Leonardo offers 150 free tokens daily. Paid plans start at $12/month for more tokens and custom model training.');
INSERT INTO "tools_faqs" VALUES(71,1,15,'Can I train my own model on Leonardo?','Yes, paid plans include custom model training - upload your art and train AI to match your style.');
INSERT INTO "tools_faqs" VALUES(72,0,3,'Is Udio better than Suno?','Udio generally produces higher audio quality and more polished tracks. Suno is easier to use and faster. Both are excellent - try both free tiers to compare.');
INSERT INTO "tools_faqs" VALUES(73,1,3,'Is Udio free?','Yes, Udio offers 1200 free credits per month. Paid plans start at $10/month for commercial use and higher quality.');
INSERT INTO "tools_faqs" VALUES(74,2,3,'Can I use Udio songs commercially?','Commercial use requires a paid subscription (Standard $10/mo or Pro $30/mo).');
INSERT INTO "tools_faqs" VALUES(75,3,3,'How long are Udio songs?','Udio can generate tracks up to 15 minutes with extensions.');
INSERT INTO "tools_faqs" VALUES(76,0,12,'Is Flux better than Midjourney?','Flux excels at prompt adherence and text rendering. Midjourney has better artistic defaults. For specific requirements, Flux often wins; for general aesthetics, Midjourney may be preferred.');
INSERT INTO "tools_faqs" VALUES(77,1,12,'Is Flux free?','Flux Schnell and Dev are free. Schnell is Apache 2.0 licensed (commercial OK). Dev is non-commercial only. Pro requires payment via API providers.');
INSERT INTO "tools_faqs" VALUES(78,2,12,'How do I use Flux?','Use through Replicate, ComfyUI, or other platforms that host the model. No official standalone app exists.');
INSERT INTO "tools_faqs" VALUES(79,3,12,'What is the difference between Flux Schnell, Dev, and Pro?','Schnell: Fast, good quality, commercial OK. Dev: Higher quality, non-commercial. Pro: Highest quality, commercial, paid.');
INSERT INTO "tools_faqs" VALUES(80,0,13,'Why is Ideogram good for text?','Ideogram was specifically trained to understand typography and render text accurately. Most AI image tools treat text as visual patterns, causing errors.');
INSERT INTO "tools_faqs" VALUES(81,1,13,'Is Ideogram free?','Yes, Ideogram offers 10 free images per day. Paid plans start at $8/month for 100 images daily.');
INSERT INTO "tools_faqs" VALUES(82,2,13,'Ideogram vs Midjourney for logos?','Ideogram is better for logos with text. Midjourney is better for artistic, text-free logo concepts.');
INSERT INTO "tools_faqs" VALUES(83,3,13,'What is Ideogram 2.0?','Version 2.0 improved general image quality significantly while maintaining superior text rendering.');
INSERT INTO "tools_faqs" VALUES(84,0,14,'Is Pika free?','Pika offers 250 free credits to start. After that, the Unlimited plan at $10/month offers excellent value.');
INSERT INTO "tools_faqs" VALUES(85,1,14,'Pika vs Runway: which is better?','Runway offers higher quality and longer videos. Pika is more affordable and user-friendly. Choose Runway for professional work, Pika for creative social content.');
INSERT INTO "tools_faqs" VALUES(86,2,14,'How long are Pika videos?','Pika generates 4-second video clips. You can extend by generating additional clips.');
INSERT INTO "tools_faqs" VALUES(87,3,14,'What makes Pika unique?','Pika excels at creative effects like canvas expansion, regional editing, and lip sync - features others lack.');
INSERT INTO "tools_faqs" VALUES(88,0,33,'Is Kling AI free?','Yes, Kling AI offers a generous free tier with daily credits for video generation.');
INSERT INTO "tools_faqs" VALUES(89,1,33,'How long can Kling AI videos be?','Free tier: up to 5 seconds. Pro: up to 2 minutes - significantly longer than competitors.');
INSERT INTO "tools_faqs" VALUES(90,2,33,'Is Kling AI safe to use?','Kling is developed by Kuaishou, a major Chinese tech company. Data is stored on Chinese servers. Evaluate based on your privacy requirements.');
INSERT INTO "tools_faqs" VALUES(91,3,33,'Kling vs Runway?','Kling offers longer videos and better free tier. Runway has more professional features and higher peak quality.');
INSERT INTO "tools_faqs" VALUES(92,0,34,'What is Hailuo AI?','Hailuo AI is MiniMax''s AI video generation platform, known for natural motion and competitive quality.');
INSERT INTO "tools_faqs" VALUES(93,1,34,'Is Hailuo AI free?','Yes, Hailuo offers a free tier with daily credits. Premium options available for more generations.');
INSERT INTO "tools_faqs" VALUES(94,2,34,'Hailuo vs Kling AI?','Both are strong Chinese AI video tools. Kling offers longer videos; Hailuo often has better motion quality.');
INSERT INTO "tools_faqs" VALUES(95,3,34,'Is Hailuo AI safe?','Hailuo is developed by MiniMax, a funded Chinese AI company. Consider your data privacy requirements.');
INSERT INTO "tools_faqs" VALUES(96,0,26,'Is Clipchamp really free?','Yes, Clipchamp offers full video editing features including 1080p export completely free. Premium features cost $12/month.');
INSERT INTO "tools_faqs" VALUES(97,1,26,'Does Clipchamp have AI?','Yes, Clipchamp includes AI auto-captions, text-to-speech, and background removal powered by AI.');
INSERT INTO "tools_faqs" VALUES(98,2,26,'Is Clipchamp owned by Microsoft?','Yes, Microsoft acquired Clipchamp in 2021 and integrated it into Windows 11 and Microsoft 365.');
INSERT INTO "tools_faqs" VALUES(99,3,26,'Clipchamp vs CapCut?','Both are excellent free options. Clipchamp integrates with Microsoft; CapCut has more trendy effects and TikTok integration.');
INSERT INTO "tools_faqs" VALUES(100,0,27,'How does Captions AI eye contact work?','Captions uses AI to detect your eyes and subtly adjust them to appear looking at the camera, even if you were reading a script.');
INSERT INTO "tools_faqs" VALUES(101,1,27,'Is Captions free?','Basic features are free with watermark. Pro at $10/month removes watermark and adds eye contact, filler removal, and premium features.');
INSERT INTO "tools_faqs" VALUES(102,2,27,'Captions vs CapCut?','Captions focuses on AI enhancement (eye contact, filler removal). CapCut is a more traditional video editor. Use both together.');
INSERT INTO "tools_faqs" VALUES(103,3,27,'Does Captions work on desktop?','Captions is mobile-first (iOS/Android). Limited web version available.');
INSERT INTO "tools_faqs" VALUES(104,0,28,'Is VEED free?','VEED has a free tier with 2GB storage and watermark. Paid plans start at $18/month.');
INSERT INTO "tools_faqs" VALUES(105,1,28,'How accurate are VEED subtitles?','VEED is known for industry-leading subtitle accuracy, typically 95%+ correct.');
INSERT INTO "tools_faqs" VALUES(106,2,28,'VEED vs Descript?','Both have AI transcription. VEED is more video-focused; Descript is better for podcast editing.');
INSERT INTO "tools_faqs" VALUES(107,3,28,'Can VEED translate videos?','Yes, VEED can auto-translate subtitles to 100+ languages and even generate AI voiceovers.');
INSERT INTO "tools_faqs" VALUES(108,0,29,'How does InVideo AI work?','Describe your video in text (topic, style, audience), and AI generates a script, selects stock footage, adds music, and produces a complete video.');
INSERT INTO "tools_faqs" VALUES(109,1,29,'Is InVideo free?','Free tier allows 10 minutes of AI video per week with watermark. Plus plan ($25/mo) offers 50 minutes without watermark.');
INSERT INTO "tools_faqs" VALUES(110,2,29,'InVideo vs Synthesia?','InVideo uses stock footage; Synthesia uses AI avatars. InVideo is more versatile; Synthesia is better for talking-head content.');
INSERT INTO "tools_faqs" VALUES(111,3,29,'What''s voice cloning in InVideo?','Record a few minutes of your voice, and AI can generate narration in your voice for future videos.');
INSERT INTO "tools_faqs" VALUES(112,0,10,'Is Character AI free?','Yes, Character.AI offers unlimited free chats with ads. c.ai+ at $10/month removes ads and adds premium features.');
INSERT INTO "tools_faqs" VALUES(113,1,10,'Is Character AI safe?','Character.AI has content filters and safety measures. All conversations are with AI - no real humans involved.');
INSERT INTO "tools_faqs" VALUES(114,2,10,'Can I create my own character?','Yes, anyone can create and share AI characters. Define personality, background, and conversation style.');
INSERT INTO "tools_faqs" VALUES(115,3,10,'Character AI vs ChatGPT?','Character AI focuses on personality and roleplay. ChatGPT is better for tasks, information, and productivity.');
INSERT INTO "tools_faqs" VALUES(116,0,11,'Is NotebookLM free?','Yes, NotebookLM is completely free with a Google account. A paid Plus tier for businesses is planned.');
INSERT INTO "tools_faqs" VALUES(117,1,11,'What is Audio Overview?','Audio Overview generates a podcast-style conversation between two AI hosts discussing your uploaded documents.');
INSERT INTO "tools_faqs" VALUES(118,2,11,'NotebookLM vs ChatGPT?','NotebookLM excels at document analysis with source citations. ChatGPT is better for general knowledge and tasks.');
INSERT INTO "tools_faqs" VALUES(119,3,11,'What can I upload to NotebookLM?','PDFs, Google Docs, web URLs, text files, and more. Up to 50 sources per notebook.');
INSERT INTO "tools_faqs" VALUES(120,0,71,'Is Grammarly free?','Yes, Grammarly has a robust free tier with grammar, spelling, and punctuation checks. Premium ($12/mo) adds advanced features.');
INSERT INTO "tools_faqs" VALUES(121,1,71,'Is Grammarly worth it?','For professional writers or anyone writing frequently in English, Grammarly Premium is highly worth it. The free tier is good for occasional use.');
INSERT INTO "tools_faqs" VALUES(122,2,71,'Does Grammarly work with Word?','Yes, Grammarly has a Microsoft Word add-in for both Windows and Mac, plus Google Docs integration.');
INSERT INTO "tools_faqs" VALUES(123,3,71,'Is Grammarly accurate?','Grammarly is the most accurate grammar checker available, though no tool is 100% perfect. Always review suggestions.');
INSERT INTO "tools_faqs" VALUES(124,0,73,'Is Wordtune free?','Wordtune offers 10 free rewrites per day. Unlimited rewrites require Plus at $10/month.');
INSERT INTO "tools_faqs" VALUES(125,1,73,'Wordtune vs Grammarly?','Different tools. Grammarly checks grammar and errors. Wordtune helps rephrase sentences. Many use both together.');
INSERT INTO "tools_faqs" VALUES(126,2,73,'Does Wordtune work with Google Docs?','Yes, Wordtune has a browser extension that works with Google Docs, Gmail, and most websites.');
INSERT INTO "tools_faqs" VALUES(127,3,73,'Who makes Wordtune?','Wordtune is developed by AI21 Labs, an AI research company known for their advanced language models.');
INSERT INTO "tools_faqs" VALUES(128,0,44,'Is Copy.ai free?','Copy.ai has a free tier with 2000 words/month. Pro at $36/month offers unlimited words.');
INSERT INTO "tools_faqs" VALUES(129,1,44,'Copy.ai vs Jasper?','Both are solid. Copy.ai is more marketing-focused with better workflows. Jasper has more integrations and longer content features.');
INSERT INTO "tools_faqs" VALUES(130,2,44,'What can Copy.ai write?','Blog posts, social media content, email campaigns, ad copy, product descriptions, and more.');
INSERT INTO "tools_faqs" VALUES(131,3,44,'Is Copy.ai worth it?','For marketing teams creating content regularly, Pro is worth it. Casual users may find the free tier too limited.');
INSERT INTO "tools_faqs" VALUES(132,0,47,'Is Jasper free?','No, Jasper doesn''t have a free tier. Plans start at $49/month with a 7-day trial.');
INSERT INTO "tools_faqs" VALUES(133,1,47,'Jasper vs ChatGPT for content?','Jasper is purpose-built for marketing content with brand voice and SEO features. ChatGPT is more versatile but less specialized.');
INSERT INTO "tools_faqs" VALUES(134,2,47,'Is Jasper worth the price?','For enterprise teams needing brand consistency and compliance, yes. For individuals, cheaper alternatives may suffice.');
INSERT INTO "tools_faqs" VALUES(135,3,47,'What happened to Jarvis AI?','Jarvis AI was renamed to Jasper AI in 2022 due to trademark issues.');
INSERT INTO "tools_faqs" VALUES(136,0,66,'Is Writesonic free?','Yes, Writesonic offers 10,000 free words. Pro at $12/month provides 100K words.');
INSERT INTO "tools_faqs" VALUES(137,1,66,'Writesonic vs Jasper?','Writesonic is more affordable with good SEO tools. Jasper has better brand voice and enterprise features. Choose based on budget and needs.');
INSERT INTO "tools_faqs" VALUES(138,2,66,'What is Chatsonic?','Chatsonic is Writesonic''s ChatGPT alternative with web access and real-time information.');
INSERT INTO "tools_faqs" VALUES(139,3,66,'Is Writesonic good for SEO?','Yes, Writesonic has strong SEO features and integrates with Surfer SEO for optimization.');
INSERT INTO "tools_faqs" VALUES(140,0,64,'Is Surfer SEO worth it?','For SEO-focused content creators, yes. The data-driven approach consistently improves rankings. Casual bloggers may not need it.');
INSERT INTO "tools_faqs" VALUES(141,1,64,'Surfer SEO vs Clearscope?','Both are excellent. Surfer has more features and AI writing. Clearscope is simpler and arguably more intuitive.');
INSERT INTO "tools_faqs" VALUES(142,2,64,'Does Surfer write content?','Yes, Surfer has AI writing features that generate SEO-optimized content based on SERP analysis.');
INSERT INTO "tools_faqs" VALUES(143,3,64,'How does Surfer SEO work?','Surfer analyzes top-ranking pages and tells you exactly what keywords, headings, and structure to include.');
INSERT INTO "tools_faqs" VALUES(144,0,65,'Is Clearscope worth the price?','For enterprise teams valuing UX and accuracy, yes. For individuals or small teams, Surfer may offer better value.');
INSERT INTO "tools_faqs" VALUES(145,1,65,'Clearscope vs Surfer SEO?','Clearscope has better UX and accuracy. Surfer has more features, AI writing, and lower pricing. Both are excellent.');
INSERT INTO "tools_faqs" VALUES(146,2,65,'Does Clearscope write content?','No, Clearscope focuses on optimization only. It doesn''t generate content like Surfer does.');
INSERT INTO "tools_faqs" VALUES(147,3,65,'Who uses Clearscope?','Major publishers like Condé Nast, Shopify, and Adobe use Clearscope for content optimization.');
INSERT INTO "tools_faqs" VALUES(148,0,42,'Is Adobe Firefly free?','Yes, Adobe offers 25 free credits monthly. Premium at $5/month offers 100 credits. Creative Cloud subscribers get more.');
INSERT INTO "tools_faqs" VALUES(149,1,42,'Is Firefly safe for commercial use?','Yes, Adobe provides IP indemnification, making Firefly one of the safest options for commercial projects.');
INSERT INTO "tools_faqs" VALUES(150,2,42,'Firefly vs Midjourney?','Midjourney produces more impressive artistic results. Firefly is safer commercially and integrates with Adobe apps.');
INSERT INTO "tools_faqs" VALUES(151,3,42,'How is Firefly trained?','Firefly is trained only on Adobe Stock images, openly licensed content, and public domain works.');
INSERT INTO "tools_faqs" VALUES(152,0,43,'Is Canva Magic Studio free?','Basic AI features are free. Full Magic Studio requires Canva Pro at $15/month.');
INSERT INTO "tools_faqs" VALUES(153,1,43,'What is Magic Design?','Magic Design generates complete designs (social posts, presentations, videos) from a text prompt or uploaded image.');
INSERT INTO "tools_faqs" VALUES(154,2,43,'Canva vs Adobe Express?','Canva is more beginner-friendly with better AI. Adobe Express integrates better with Creative Cloud.');
INSERT INTO "tools_faqs" VALUES(155,3,43,'Can Magic Studio create videos?','Yes, Magic Studio can generate and edit videos with AI assistance.');
INSERT INTO "tools_faqs" VALUES(156,0,41,'Is Figma AI free?','Basic AI features are included in free Starter plan. Advanced AI requires Professional ($15/mo) or Organization ($45/mo).');
INSERT INTO "tools_faqs" VALUES(157,1,41,'What can Figma AI do?','Auto-rename layers, smart search, visual search, and some generative features. More capabilities are being added.');
INSERT INTO "tools_faqs" VALUES(158,2,41,'Figma AI vs Canva?','Figma is for professional designers; Canva is for everyone. Canva has more AI generation; Figma has better design precision.');
INSERT INTO "tools_faqs" VALUES(159,3,41,'Is Figma owned by Adobe?','Adobe announced acquisition of Figma in 2022, but the deal was terminated in 2023 due to regulatory concerns.');
INSERT INTO "tools_faqs" VALUES(160,0,45,'Is Gamma free?','Yes, Gamma offers 400 free AI credits to start. Plus at $10/month offers unlimited AI generation.');
INSERT INTO "tools_faqs" VALUES(161,1,45,'Gamma vs PowerPoint?','Gamma creates presentations from prompts automatically. PowerPoint requires manual slide building. Gamma is faster; PowerPoint offers more control.');
INSERT INTO "tools_faqs" VALUES(162,2,45,'Can I export Gamma to PowerPoint?','Yes, Plus and Pro plans allow export to PowerPoint (PPTX) and PDF formats.');
INSERT INTO "tools_faqs" VALUES(163,3,45,'What makes Gamma different?','Gamma generates complete presentations with real content from a single prompt - not just templates or placeholders.');
INSERT INTO "tools_faqs" VALUES(164,0,46,'Is Tome free?','Tome has a limited free tier. Professional at $16/month unlocks unlimited AI and full features.');
INSERT INTO "tools_faqs" VALUES(165,1,46,'Tome vs Gamma?','Tome focuses on narrative storytelling. Gamma is better for traditional presentations. Both use AI generation.');
INSERT INTO "tools_faqs" VALUES(166,2,46,'Can Tome generate images?','Yes, Tome has built-in AI image generation powered by DALL-E.');
INSERT INTO "tools_faqs" VALUES(167,3,46,'What is Tome best for?','Pitch decks, creative portfolios, thought leadership content, and any presentation that tells a story.');
INSERT INTO "tools_faqs" VALUES(168,0,52,'Is Framer AI free?','Framer has a free tier with 2 pages on a Framer subdomain. Custom domains start at $5/month.');
INSERT INTO "tools_faqs" VALUES(169,1,52,'Framer vs Webflow?','Framer has better AI generation. Webflow has more powerful traditional features. Framer is faster; Webflow is more flexible.');
INSERT INTO "tools_faqs" VALUES(170,2,52,'Can Framer AI build any website?','Framer excels at landing pages, portfolios, and marketing sites. Complex web apps need traditional development.');
INSERT INTO "tools_faqs" VALUES(171,3,52,'How does Framer AI work?','Describe your website in text, and AI generates a complete site with pages, layouts, copy, and styling.');
INSERT INTO "tools_faqs" VALUES(172,0,58,'Is Make free?','Make offers 1,000 free operations per month. Paid plans start at $9/month for 10,000 operations.');
INSERT INTO "tools_faqs" VALUES(173,1,58,'Make vs Zapier?','Make is more powerful for complex workflows with better value. Zapier is easier to use with more integrations. Choose based on complexity needs.');
INSERT INTO "tools_faqs" VALUES(174,2,58,'What was Make called before?','Make was previously known as Integromat. It rebranded to Make in 2022.');
INSERT INTO "tools_faqs" VALUES(175,3,58,'Can Make handle complex logic?','Yes, Make excels at complex workflows with branching, loops, error handling, and data transformation.');
INSERT INTO "tools_faqs" VALUES(176,0,59,'Is n8n free?','Yes, n8n is free when self-hosted with unlimited executions. Cloud plans start at $20/month.');
INSERT INTO "tools_faqs" VALUES(177,1,59,'n8n vs Zapier?','n8n is open-source with self-hosting option. Zapier is easier with more integrations. n8n is better for developers; Zapier for business users.');
INSERT INTO "tools_faqs" VALUES(178,2,59,'How do I self-host n8n?','n8n can be deployed via Docker, npm, or directly on servers. Documentation covers all methods.');
INSERT INTO "tools_faqs" VALUES(179,3,59,'Is n8n secure?','When self-hosted, n8n data never leaves your infrastructure. Cloud version has SOC2 compliance.');
INSERT INTO "tools_faqs" VALUES(180,0,60,'Is Bardeen free?','Yes, Bardeen offers unlimited basic automations free. Pro at $10/month adds premium features and auto-triggers.');
INSERT INTO "tools_faqs" VALUES(181,1,60,'Bardeen vs Zapier?','Bardeen is browser-based for web automation. Zapier connects cloud apps. Use Bardeen for web scraping; Zapier for app integration.');
INSERT INTO "tools_faqs" VALUES(182,2,60,'Can Bardeen scrape any website?','Bardeen can scrape most websites, but some sites with strong anti-bot measures may be difficult.');
INSERT INTO "tools_faqs" VALUES(183,3,60,'Does Bardeen need to be open?','Yes, Chrome must be running for Bardeen automations to execute.');
INSERT INTO "tools_faqs" VALUES(184,0,39,'Is Zapier free?','Zapier offers a limited free tier with 100 tasks/month. Paid plans start at $20/month.');
INSERT INTO "tools_faqs" VALUES(185,1,39,'Zapier vs Make?','Zapier is easier with more integrations. Make is more powerful and better value for complex workflows. Start with Zapier; switch to Make if needed.');
INSERT INTO "tools_faqs" VALUES(186,2,39,'What is a Zapier task?','A task is any action executed by Zapier - sending an email, creating a row, etc. Multi-step Zaps consume one task per step executed.');
INSERT INTO "tools_faqs" VALUES(187,3,39,'Can Zapier use AI?','Yes, Zapier has AI features for creating workflows from natural language and an AI assistant for suggestions and debugging.');
INSERT INTO "tools_faqs" VALUES(188,0,1,'Is Mubert free?','Mubert has a free tier for personal use with attribution. Commercial use requires Creator ($14/mo) or Pro ($39/mo).');
INSERT INTO "tools_faqs" VALUES(189,1,1,'Is Mubert music royalty-free?','Yes, paid plans include royalty-free licensing for commercial use including YouTube, podcasts, and advertising.');
INSERT INTO "tools_faqs" VALUES(190,2,1,'Mubert vs Suno?','Mubert is for background/ambient music with clean licensing. Suno creates full songs with vocals. Different use cases.');
INSERT INTO "tools_faqs" VALUES(191,0,5,'Is Replit free?','Replit has a generous free tier. Replit Core at $25/month adds advanced AI and private projects.');
INSERT INTO "tools_faqs" VALUES(192,1,5,'What is Replit Agent?','Replit Agent is an AI that can build entire applications from natural language descriptions.');
INSERT INTO "tools_faqs" VALUES(193,2,5,'Replit vs VS Code?','Replit is browser-based with zero setup. VS Code is a local IDE with more power. Replit for learning; VS Code for production.');
INSERT INTO "tools_faqs" VALUES(194,0,67,'Is Luma AI free?','Luma has a free tier with limited captures. Pro at $30/month offers unlimited captures.');
INSERT INTO "tools_faqs" VALUES(195,1,67,'How does Luma 3D capture work?','Luma uses NeRF (Neural Radiance Fields) to create 3D scenes from video or photos.');
INSERT INTO "tools_faqs" VALUES(196,0,48,'Is Meshy free?','Meshy offers 200 free credits monthly. Pro at $20/month offers 1000 credits.');
INSERT INTO "tools_faqs" VALUES(197,1,48,'What formats does Meshy export?','GLB, FBX, OBJ, and USDZ for various 3D software and game engines.');
INSERT INTO "tools_faqs" VALUES(198,0,70,'Is Tripo AI free?','Tripo offers a free tier with limited generations. Pro starts at $20/month.');
INSERT INTO "tools_faqs" VALUES(199,0,75,'Is Poe free?','Poe has a free tier with limited messages. Premium at $20/month offers unlimited access to all models.');
INSERT INTO "tools_faqs" VALUES(200,1,75,'What AIs can I use on Poe?','Poe provides access to GPT-4, Claude, Llama, Gemini, and many other AI models.');
INSERT INTO "tools_faqs" VALUES(201,0,74,'Is Pi free?','Yes, Pi is free to use with unlimited conversations.');
INSERT INTO "tools_faqs" VALUES(202,1,74,'What is Pi good for?','Pi excels at supportive conversations, casual chat, and emotional support - not work tasks.');
INSERT INTO "tools_faqs" VALUES(203,0,76,'Is Grok free?','Grok requires X Premium+ ($16/month). No free tier available.');
INSERT INTO "tools_faqs" VALUES(204,1,76,'What makes Grok different?','Real-time X/Twitter data access and a more unfiltered, witty personality.');
INSERT INTO "tools_faqs" VALUES(205,0,72,'Is Sudowrite good for fiction?','Yes, Sudowrite is specifically designed for fiction with features like Describe, Brainstorm, and Story Engine.');
INSERT INTO "tools_faqs" VALUES(206,1,72,'How is Sudowrite different from ChatGPT?','Sudowrite is trained on fiction and offers specialized tools for storytelling. ChatGPT is general-purpose.');
INSERT INTO "tools_faqs" VALUES(207,0,53,'Is Julius AI free?','Julius has a free tier with limited queries. Pro at $20/month offers unlimited analysis.');
INSERT INTO "tools_faqs" VALUES(208,1,53,'What data can Julius analyze?','Julius works with CSVs, Excel files, and can connect to databases.');
INSERT INTO "tools_faqs" VALUES(209,0,37,'Is Warp free?','Yes, Warp is free for individuals with full AI features. Team plans start at $22/user/month.');
INSERT INTO "tools_faqs" VALUES(210,1,37,'Does Warp work on Linux?','Currently Mac only. Windows and Linux are in development.');
INSERT INTO "tools_faqs" VALUES(211,0,30,'Is Harvey AI available to individuals?','No, Harvey AI is enterprise-only for law firms.');
INSERT INTO "tools_faqs" VALUES(212,0,38,'What is Clay used for?','Clay enriches sales leads with data from 50+ sources and uses AI for personalized outreach.');
INSERT INTO "tools_faqs" VALUES(213,0,49,'Is Spline free?','Yes, Spline has a generous free tier with full 3D editing capabilities.');
INSERT INTO "tools_faqs" VALUES(214,0,50,'What is 10Web?','10Web is an AI-powered WordPress website builder with managed hosting.');
INSERT INTO "tools_faqs" VALUES(215,0,51,'How fast is Durable?','Durable generates complete websites in about 30 seconds.');
INSERT INTO "tools_faqs" VALUES(216,0,54,'What makes Equals different?','Equals connects directly to databases and includes AI analysis.');
INSERT INTO "tools_faqs" VALUES(217,0,55,'Can non-technical users use Obviously AI?','Yes, Obviously AI is designed for business users without coding skills.');
INSERT INTO "tools_faqs" VALUES(218,0,56,'What can Akkio predict?','Sales outcomes, churn, lead scoring, and other business metrics.');
INSERT INTO "tools_faqs" VALUES(219,0,57,'What is Hex?','Hex is a collaborative data workspace combining notebooks, SQL, and visualization.');
INSERT INTO "tools_faqs" VALUES(220,0,61,'What is human-in-the-loop?','Workflows that pause for human input before continuing.');
INSERT INTO "tools_faqs" VALUES(221,0,62,'Is Activepieces free?','Yes, self-hosted version is completely free with unlimited tasks.');
INSERT INTO "tools_faqs" VALUES(222,0,9,'Is Maker free to use?','Yes, Maker offers a free tier with 50 generations per day and access to basic features and the community gallery.');
INSERT INTO "tools_faqs" VALUES(223,1,9,'Can I sell art created with Maker?','Commercial rights require the Pro Artist plan at $29/month.');
INSERT INTO "tools_faqs" VALUES(224,0,17,'What is the difference between Stability AI and Stable Diffusion?','Stability AI is the company that created and maintains Stable Diffusion. They offer API access to their models including SDXL and SD3.');
INSERT INTO "tools_faqs" VALUES(225,1,17,'How much does Stability AI API cost?','Pricing starts at $0.002 per image for SDXL and $0.035 for SD3. Volume discounts available.');
INSERT INTO "tools_faqs" VALUES(226,0,68,'How accurate is Kaedim 2D to 3D conversion?','Kaedim produces highly accurate 3D models from 2D images, especially for characters and products.');
INSERT INTO "tools_faqs" VALUES(227,1,68,'What file formats does Kaedim export?','Kaedim exports to FBX, OBJ, GLTF, and other common 3D formats.');
INSERT INTO "tools_faqs" VALUES(228,0,69,'Is CSM AI free?','Yes, CSM AI offers a free tier with 10 models per month. Enough for testing and light personal use.');
INSERT INTO "tools_faqs" VALUES(229,1,69,'Can I use CSM AI models commercially?','Yes, all paid plans include commercial usage rights.');
CREATE TABLE IF NOT EXISTS "tools_secondary_keywords" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "keyword" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "tools_secondary_keywords" VALUES(1,0,25,'ChatGPT pricing');
INSERT INTO "tools_secondary_keywords" VALUES(2,1,25,'ChatGPT free vs plus');
INSERT INTO "tools_secondary_keywords" VALUES(3,2,25,'ChatGPT alternatives');
INSERT INTO "tools_secondary_keywords" VALUES(4,3,25,'best AI chatbot');
INSERT INTO "tools_secondary_keywords" VALUES(5,0,18,'Midjourney pricing');
INSERT INTO "tools_secondary_keywords" VALUES(6,1,18,'Midjourney vs DALL-E');
INSERT INTO "tools_secondary_keywords" VALUES(7,2,18,'Midjourney prompt guide');
INSERT INTO "tools_secondary_keywords" VALUES(8,3,18,'best AI image generator');
INSERT INTO "tools_secondary_keywords" VALUES(9,0,23,'Claude vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(10,1,23,'Claude AI pricing');
INSERT INTO "tools_secondary_keywords" VALUES(11,2,23,'Anthropic Claude');
INSERT INTO "tools_secondary_keywords" VALUES(12,3,23,'Claude context window');
INSERT INTO "tools_secondary_keywords" VALUES(13,0,8,'GitHub Copilot pricing');
INSERT INTO "tools_secondary_keywords" VALUES(14,1,8,'GitHub Copilot free');
INSERT INTO "tools_secondary_keywords" VALUES(15,2,8,'GitHub Copilot vs Cursor');
INSERT INTO "tools_secondary_keywords" VALUES(16,3,8,'is GitHub Copilot worth it');
INSERT INTO "tools_secondary_keywords" VALUES(17,0,7,'Cursor vs Copilot');
INSERT INTO "tools_secondary_keywords" VALUES(18,1,7,'Cursor AI pricing');
INSERT INTO "tools_secondary_keywords" VALUES(19,2,7,'Cursor IDE review');
INSERT INTO "tools_secondary_keywords" VALUES(20,3,7,'best AI code editor');
INSERT INTO "tools_secondary_keywords" VALUES(21,0,24,'DALL-E 3 vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(22,1,24,'DALL-E 3 pricing');
INSERT INTO "tools_secondary_keywords" VALUES(23,2,24,'DALL-E 3 free');
INSERT INTO "tools_secondary_keywords" VALUES(24,3,24,'DALL-E 3 text in images');
INSERT INTO "tools_secondary_keywords" VALUES(25,0,20,'Perplexity vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(26,1,20,'Perplexity AI free');
INSERT INTO "tools_secondary_keywords" VALUES(27,2,20,'AI search engine');
INSERT INTO "tools_secondary_keywords" VALUES(28,3,20,'Perplexity Pro');
INSERT INTO "tools_secondary_keywords" VALUES(29,0,32,'Sora pricing');
INSERT INTO "tools_secondary_keywords" VALUES(30,1,32,'Sora vs Runway');
INSERT INTO "tools_secondary_keywords" VALUES(31,2,32,'OpenAI video generator');
INSERT INTO "tools_secondary_keywords" VALUES(32,3,32,'Sora free access');
INSERT INTO "tools_secondary_keywords" VALUES(33,0,2,'ElevenLabs voice cloning');
INSERT INTO "tools_secondary_keywords" VALUES(34,1,2,'best AI voice generator');
INSERT INTO "tools_secondary_keywords" VALUES(35,2,2,'ElevenLabs pricing');
INSERT INTO "tools_secondary_keywords" VALUES(36,3,2,'text to speech AI');
INSERT INTO "tools_secondary_keywords" VALUES(37,0,4,'Suno AI music generator');
INSERT INTO "tools_secondary_keywords" VALUES(38,1,4,'AI song generator');
INSERT INTO "tools_secondary_keywords" VALUES(39,2,4,'Suno vs Udio');
INSERT INTO "tools_secondary_keywords" VALUES(40,3,4,'make music with AI');
INSERT INTO "tools_secondary_keywords" VALUES(41,0,19,'Runway Gen-3');
INSERT INTO "tools_secondary_keywords" VALUES(42,1,19,'Runway vs Sora');
INSERT INTO "tools_secondary_keywords" VALUES(43,2,19,'AI video generator');
INSERT INTO "tools_secondary_keywords" VALUES(44,3,19,'Runway ML pricing');
INSERT INTO "tools_secondary_keywords" VALUES(45,0,36,'Gemini vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(46,1,36,'Gemini Advanced');
INSERT INTO "tools_secondary_keywords" VALUES(47,2,36,'Google AI');
INSERT INTO "tools_secondary_keywords" VALUES(48,0,22,'Stable Diffusion free');
INSERT INTO "tools_secondary_keywords" VALUES(49,1,22,'SD XL');
INSERT INTO "tools_secondary_keywords" VALUES(50,2,22,'Stable Diffusion vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(51,0,21,'Notion AI pricing');
INSERT INTO "tools_secondary_keywords" VALUES(52,1,21,'Notion AI features');
INSERT INTO "tools_secondary_keywords" VALUES(53,0,6,'v0 dev');
INSERT INTO "tools_secondary_keywords" VALUES(54,1,6,'AI UI generator');
INSERT INTO "tools_secondary_keywords" VALUES(55,2,6,'Vercel AI');
INSERT INTO "tools_secondary_keywords" VALUES(56,0,31,'bolt.new');
INSERT INTO "tools_secondary_keywords" VALUES(57,1,31,'AI app builder');
INSERT INTO "tools_secondary_keywords" VALUES(58,2,31,'no-code AI');
INSERT INTO "tools_secondary_keywords" VALUES(59,0,35,'DeepSeek vs GPT-4');
INSERT INTO "tools_secondary_keywords" VALUES(60,1,35,'DeepSeek API');
INSERT INTO "tools_secondary_keywords" VALUES(61,2,35,'cheap AI API');
INSERT INTO "tools_secondary_keywords" VALUES(62,0,15,'Leonardo AI free');
INSERT INTO "tools_secondary_keywords" VALUES(63,1,15,'AI game art');
INSERT INTO "tools_secondary_keywords" VALUES(64,2,15,'Leonardo vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(65,0,3,'Udio vs Suno');
INSERT INTO "tools_secondary_keywords" VALUES(66,1,3,'AI music generator');
INSERT INTO "tools_secondary_keywords" VALUES(67,2,3,'Udio pricing');
INSERT INTO "tools_secondary_keywords" VALUES(68,3,3,'best AI song maker');
INSERT INTO "tools_secondary_keywords" VALUES(69,0,12,'Flux vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(70,1,12,'Black Forest Labs Flux');
INSERT INTO "tools_secondary_keywords" VALUES(71,2,12,'best free AI image generator');
INSERT INTO "tools_secondary_keywords" VALUES(72,3,12,'Flux Schnell');
INSERT INTO "tools_secondary_keywords" VALUES(73,0,13,'Ideogram vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(74,1,13,'AI logo generator');
INSERT INTO "tools_secondary_keywords" VALUES(75,2,13,'text in AI images');
INSERT INTO "tools_secondary_keywords" VALUES(76,3,13,'Ideogram pricing');
INSERT INTO "tools_secondary_keywords" VALUES(77,0,14,'Pika vs Runway');
INSERT INTO "tools_secondary_keywords" VALUES(78,1,14,'Pika AI pricing');
INSERT INTO "tools_secondary_keywords" VALUES(79,2,14,'AI video effects');
INSERT INTO "tools_secondary_keywords" VALUES(80,3,14,'animate image AI');
INSERT INTO "tools_secondary_keywords" VALUES(81,0,33,'Kling AI free');
INSERT INTO "tools_secondary_keywords" VALUES(82,1,33,'Chinese AI video generator');
INSERT INTO "tools_secondary_keywords" VALUES(83,2,33,'Kling vs Runway');
INSERT INTO "tools_secondary_keywords" VALUES(84,3,33,'long AI video');
INSERT INTO "tools_secondary_keywords" VALUES(85,0,34,'MiniMax video');
INSERT INTO "tools_secondary_keywords" VALUES(86,1,34,'Hailuo vs Kling');
INSERT INTO "tools_secondary_keywords" VALUES(87,2,34,'free AI video generator');
INSERT INTO "tools_secondary_keywords" VALUES(88,3,34,'best Chinese AI video');
INSERT INTO "tools_secondary_keywords" VALUES(89,0,26,'free video editor');
INSERT INTO "tools_secondary_keywords" VALUES(90,1,26,'Clipchamp vs CapCut');
INSERT INTO "tools_secondary_keywords" VALUES(91,2,26,'Microsoft video editor');
INSERT INTO "tools_secondary_keywords" VALUES(92,3,26,'AI captions');
INSERT INTO "tools_secondary_keywords" VALUES(93,0,27,'AI eye contact');
INSERT INTO "tools_secondary_keywords" VALUES(94,1,27,'auto captions app');
INSERT INTO "tools_secondary_keywords" VALUES(95,2,27,'remove filler words');
INSERT INTO "tools_secondary_keywords" VALUES(96,3,27,'Captions vs CapCut');
INSERT INTO "tools_secondary_keywords" VALUES(97,0,28,'VEED pricing');
INSERT INTO "tools_secondary_keywords" VALUES(98,1,28,'online video editor');
INSERT INTO "tools_secondary_keywords" VALUES(99,2,28,'AI subtitles');
INSERT INTO "tools_secondary_keywords" VALUES(100,3,28,'VEED vs CapCut');
INSERT INTO "tools_secondary_keywords" VALUES(101,0,29,'text to video AI');
INSERT INTO "tools_secondary_keywords" VALUES(102,1,29,'InVideo pricing');
INSERT INTO "tools_secondary_keywords" VALUES(103,2,29,'AI video maker');
INSERT INTO "tools_secondary_keywords" VALUES(104,3,29,'InVideo vs Synthesia');
INSERT INTO "tools_secondary_keywords" VALUES(105,0,10,'Character AI free');
INSERT INTO "tools_secondary_keywords" VALUES(106,1,10,'AI chat characters');
INSERT INTO "tools_secondary_keywords" VALUES(107,2,10,'Character AI vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(108,3,10,'roleplay AI');
INSERT INTO "tools_secondary_keywords" VALUES(109,0,11,'NotebookLM Audio Overview');
INSERT INTO "tools_secondary_keywords" VALUES(110,1,11,'Google NotebookLM');
INSERT INTO "tools_secondary_keywords" VALUES(111,2,11,'AI research assistant');
INSERT INTO "tools_secondary_keywords" VALUES(112,3,11,'NotebookLM vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(113,0,71,'Grammarly Premium');
INSERT INTO "tools_secondary_keywords" VALUES(114,1,71,'grammar checker');
INSERT INTO "tools_secondary_keywords" VALUES(115,2,71,'Grammarly vs ProWritingAid');
INSERT INTO "tools_secondary_keywords" VALUES(116,3,71,'best writing assistant');
INSERT INTO "tools_secondary_keywords" VALUES(117,0,73,'Wordtune vs Grammarly');
INSERT INTO "tools_secondary_keywords" VALUES(118,1,73,'AI rewriter');
INSERT INTO "tools_secondary_keywords" VALUES(119,2,73,'sentence rewriter');
INSERT INTO "tools_secondary_keywords" VALUES(120,3,73,'Wordtune pricing');
INSERT INTO "tools_secondary_keywords" VALUES(121,0,44,'Copy.ai vs Jasper');
INSERT INTO "tools_secondary_keywords" VALUES(122,1,44,'AI copywriting');
INSERT INTO "tools_secondary_keywords" VALUES(123,2,44,'Copy.ai pricing');
INSERT INTO "tools_secondary_keywords" VALUES(124,3,44,'marketing copy AI');
INSERT INTO "tools_secondary_keywords" VALUES(125,0,47,'Jasper vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(126,1,47,'Jasper AI pricing');
INSERT INTO "tools_secondary_keywords" VALUES(127,2,47,'enterprise AI writing');
INSERT INTO "tools_secondary_keywords" VALUES(128,3,47,'Jasper vs Copy.ai');
INSERT INTO "tools_secondary_keywords" VALUES(129,0,66,'Writesonic vs Jasper');
INSERT INTO "tools_secondary_keywords" VALUES(130,1,66,'Chatsonic');
INSERT INTO "tools_secondary_keywords" VALUES(131,2,66,'AI SEO writing');
INSERT INTO "tools_secondary_keywords" VALUES(132,3,66,'Writesonic pricing');
INSERT INTO "tools_secondary_keywords" VALUES(133,0,64,'Surfer SEO vs Clearscope');
INSERT INTO "tools_secondary_keywords" VALUES(134,1,64,'SEO content optimization');
INSERT INTO "tools_secondary_keywords" VALUES(135,2,64,'Surfer SEO pricing');
INSERT INTO "tools_secondary_keywords" VALUES(136,3,64,'content editor SEO');
INSERT INTO "tools_secondary_keywords" VALUES(137,0,65,'Clearscope vs Surfer');
INSERT INTO "tools_secondary_keywords" VALUES(138,1,65,'content optimization tool');
INSERT INTO "tools_secondary_keywords" VALUES(139,2,65,'Clearscope pricing');
INSERT INTO "tools_secondary_keywords" VALUES(140,3,65,'enterprise SEO content');
INSERT INTO "tools_secondary_keywords" VALUES(141,0,42,'Adobe Firefly vs Midjourney');
INSERT INTO "tools_secondary_keywords" VALUES(142,1,42,'Firefly commercial use');
INSERT INTO "tools_secondary_keywords" VALUES(143,2,42,'Adobe AI image generator');
INSERT INTO "tools_secondary_keywords" VALUES(144,3,42,'Firefly pricing');
INSERT INTO "tools_secondary_keywords" VALUES(145,0,43,'Canva AI features');
INSERT INTO "tools_secondary_keywords" VALUES(146,1,43,'Magic Design');
INSERT INTO "tools_secondary_keywords" VALUES(147,2,43,'Canva Pro pricing');
INSERT INTO "tools_secondary_keywords" VALUES(148,3,43,'Canva vs Adobe Express');
INSERT INTO "tools_secondary_keywords" VALUES(149,0,41,'Figma AI features');
INSERT INTO "tools_secondary_keywords" VALUES(150,1,41,'Figma vs Canva');
INSERT INTO "tools_secondary_keywords" VALUES(151,2,41,'Figma pricing');
INSERT INTO "tools_secondary_keywords" VALUES(152,3,41,'AI design tool');
INSERT INTO "tools_secondary_keywords" VALUES(153,0,45,'AI presentation maker');
INSERT INTO "tools_secondary_keywords" VALUES(154,1,45,'Gamma vs PowerPoint');
INSERT INTO "tools_secondary_keywords" VALUES(155,2,45,'Gamma pricing');
INSERT INTO "tools_secondary_keywords" VALUES(156,3,45,'create slides with AI');
INSERT INTO "tools_secondary_keywords" VALUES(157,0,46,'Tome vs Gamma');
INSERT INTO "tools_secondary_keywords" VALUES(158,1,46,'AI pitch deck');
INSERT INTO "tools_secondary_keywords" VALUES(159,2,46,'Tome pricing');
INSERT INTO "tools_secondary_keywords" VALUES(160,3,46,'AI storytelling tool');
INSERT INTO "tools_secondary_keywords" VALUES(161,0,52,'AI website builder');
INSERT INTO "tools_secondary_keywords" VALUES(162,1,52,'Framer vs Webflow');
INSERT INTO "tools_secondary_keywords" VALUES(163,2,52,'Framer pricing');
INSERT INTO "tools_secondary_keywords" VALUES(164,3,52,'create website with AI');
INSERT INTO "tools_secondary_keywords" VALUES(165,0,58,'Make vs Zapier');
INSERT INTO "tools_secondary_keywords" VALUES(166,1,58,'Integromat alternative');
INSERT INTO "tools_secondary_keywords" VALUES(167,2,58,'no-code automation');
INSERT INTO "tools_secondary_keywords" VALUES(168,3,58,'Make pricing');
INSERT INTO "tools_secondary_keywords" VALUES(169,0,59,'n8n vs Zapier');
INSERT INTO "tools_secondary_keywords" VALUES(170,1,59,'self-hosted automation');
INSERT INTO "tools_secondary_keywords" VALUES(171,2,59,'open source workflow');
INSERT INTO "tools_secondary_keywords" VALUES(172,3,59,'n8n pricing');
INSERT INTO "tools_secondary_keywords" VALUES(173,0,60,'browser automation');
INSERT INTO "tools_secondary_keywords" VALUES(174,1,60,'web scraping AI');
INSERT INTO "tools_secondary_keywords" VALUES(175,2,60,'Bardeen vs Zapier');
INSERT INTO "tools_secondary_keywords" VALUES(176,3,60,'Chrome automation');
INSERT INTO "tools_secondary_keywords" VALUES(177,0,39,'Zapier vs Make');
INSERT INTO "tools_secondary_keywords" VALUES(178,1,39,'Zapier pricing');
INSERT INTO "tools_secondary_keywords" VALUES(179,2,39,'best automation tool');
INSERT INTO "tools_secondary_keywords" VALUES(180,3,39,'Zapier AI');
INSERT INTO "tools_secondary_keywords" VALUES(181,0,1,'royalty-free AI music');
INSERT INTO "tools_secondary_keywords" VALUES(182,1,1,'Mubert pricing');
INSERT INTO "tools_secondary_keywords" VALUES(183,2,1,'AI background music');
INSERT INTO "tools_secondary_keywords" VALUES(184,0,5,'online IDE');
INSERT INTO "tools_secondary_keywords" VALUES(185,1,5,'Replit Agent');
INSERT INTO "tools_secondary_keywords" VALUES(186,2,5,'browser coding');
INSERT INTO "tools_secondary_keywords" VALUES(187,0,67,'NeRF 3D');
INSERT INTO "tools_secondary_keywords" VALUES(188,1,67,'photo to 3D');
INSERT INTO "tools_secondary_keywords" VALUES(189,2,67,'Luma pricing');
INSERT INTO "tools_secondary_keywords" VALUES(190,0,48,'text to 3D');
INSERT INTO "tools_secondary_keywords" VALUES(191,1,48,'AI 3D generator');
INSERT INTO "tools_secondary_keywords" VALUES(192,2,48,'Meshy pricing');
INSERT INTO "tools_secondary_keywords" VALUES(193,0,70,'Tripo vs Meshy');
INSERT INTO "tools_secondary_keywords" VALUES(194,1,70,'AI 3D model');
INSERT INTO "tools_secondary_keywords" VALUES(195,0,75,'Poe vs ChatGPT Plus');
INSERT INTO "tools_secondary_keywords" VALUES(196,1,75,'AI chat aggregator');
INSERT INTO "tools_secondary_keywords" VALUES(197,2,75,'Poe pricing');
INSERT INTO "tools_secondary_keywords" VALUES(198,0,74,'Pi vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(199,1,74,'personal AI');
INSERT INTO "tools_secondary_keywords" VALUES(200,2,74,'Inflection AI');
INSERT INTO "tools_secondary_keywords" VALUES(201,0,76,'Grok vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(202,1,76,'xAI Grok');
INSERT INTO "tools_secondary_keywords" VALUES(203,2,76,'Elon Musk AI');
INSERT INTO "tools_secondary_keywords" VALUES(204,0,72,'AI fiction writing');
INSERT INTO "tools_secondary_keywords" VALUES(205,1,72,'Sudowrite vs ChatGPT');
INSERT INTO "tools_secondary_keywords" VALUES(206,2,72,'AI for novelists');
INSERT INTO "tools_secondary_keywords" VALUES(207,0,53,'AI data analysis');
INSERT INTO "tools_secondary_keywords" VALUES(208,1,53,'natural language data');
INSERT INTO "tools_secondary_keywords" VALUES(209,2,53,'Julius pricing');
INSERT INTO "tools_secondary_keywords" VALUES(210,0,37,'AI terminal');
INSERT INTO "tools_secondary_keywords" VALUES(211,1,37,'Warp vs iTerm');
INSERT INTO "tools_secondary_keywords" VALUES(212,2,37,'smart command line');
INSERT INTO "tools_secondary_keywords" VALUES(213,0,30,'legal AI');
INSERT INTO "tools_secondary_keywords" VALUES(214,1,30,'AI for lawyers');
INSERT INTO "tools_secondary_keywords" VALUES(215,0,38,'sales data enrichment');
INSERT INTO "tools_secondary_keywords" VALUES(216,1,38,'Clay pricing');
INSERT INTO "tools_secondary_keywords" VALUES(217,0,49,'web 3D design');
INSERT INTO "tools_secondary_keywords" VALUES(218,1,49,'Spline vs Blender');
INSERT INTO "tools_secondary_keywords" VALUES(219,0,50,'AI WordPress');
INSERT INTO "tools_secondary_keywords" VALUES(220,1,50,'10Web pricing');
INSERT INTO "tools_secondary_keywords" VALUES(221,0,51,'instant website');
INSERT INTO "tools_secondary_keywords" VALUES(222,1,51,'Durable vs Framer');
INSERT INTO "tools_secondary_keywords" VALUES(223,0,54,'AI spreadsheet');
INSERT INTO "tools_secondary_keywords" VALUES(224,1,54,'Equals vs Airtable');
INSERT INTO "tools_secondary_keywords" VALUES(225,0,55,'no-code ML');
INSERT INTO "tools_secondary_keywords" VALUES(226,1,55,'prediction AI');
INSERT INTO "tools_secondary_keywords" VALUES(227,0,56,'Akkio vs Obviously AI');
INSERT INTO "tools_secondary_keywords" VALUES(228,1,56,'business AI');
INSERT INTO "tools_secondary_keywords" VALUES(229,0,57,'data notebook');
INSERT INTO "tools_secondary_keywords" VALUES(230,1,57,'Hex vs Jupyter');
INSERT INTO "tools_secondary_keywords" VALUES(231,0,61,'human-in-the-loop');
INSERT INTO "tools_secondary_keywords" VALUES(232,1,61,'Relay vs Zapier');
INSERT INTO "tools_secondary_keywords" VALUES(233,0,62,'open source automation');
INSERT INTO "tools_secondary_keywords" VALUES(234,1,62,'Activepieces vs Zapier');
INSERT INTO "tools_secondary_keywords" VALUES(235,0,9,'AI art community');
INSERT INTO "tools_secondary_keywords" VALUES(236,1,9,'social AI art platform');
INSERT INTO "tools_secondary_keywords" VALUES(237,2,9,'collaborative AI art');
INSERT INTO "tools_secondary_keywords" VALUES(238,0,17,'Stable Diffusion API');
INSERT INTO "tools_secondary_keywords" VALUES(239,1,17,'SDXL API');
INSERT INTO "tools_secondary_keywords" VALUES(240,2,17,'SD3 API pricing');
INSERT INTO "tools_secondary_keywords" VALUES(241,0,68,'2D to 3D converter');
INSERT INTO "tools_secondary_keywords" VALUES(242,1,68,'AI 3D model generation');
INSERT INTO "tools_secondary_keywords" VALUES(243,2,68,'image to 3D model');
INSERT INTO "tools_secondary_keywords" VALUES(244,0,69,'image to 3D AI');
INSERT INTO "tools_secondary_keywords" VALUES(245,1,69,'CSM 3D model generator');
INSERT INTO "tools_secondary_keywords" VALUES(246,2,69,'free AI 3D generator');
CREATE INDEX `users_sessions_order_idx` ON `users_sessions` (`_order`);
CREATE INDEX `users_sessions_parent_id_idx` ON `users_sessions` (`_parent_id`);
CREATE INDEX `users_updated_at_idx` ON `users` (`updated_at`);
CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);
CREATE INDEX `media_updated_at_idx` ON `media` (`updated_at`);
CREATE INDEX `media_created_at_idx` ON `media` (`created_at`);
CREATE UNIQUE INDEX `media_filename_idx` ON `media` (`filename`);
CREATE INDEX `payload_locked_documents_global_slug_idx` ON `payload_locked_documents` (`global_slug`);
CREATE INDEX `payload_locked_documents_updated_at_idx` ON `payload_locked_documents` (`updated_at`);
CREATE INDEX `payload_locked_documents_created_at_idx` ON `payload_locked_documents` (`created_at`);
CREATE INDEX `payload_locked_documents_rels_order_idx` ON `payload_locked_documents_rels` (`order`);
CREATE INDEX `payload_locked_documents_rels_parent_idx` ON `payload_locked_documents_rels` (`parent_id`);
CREATE INDEX `payload_locked_documents_rels_path_idx` ON `payload_locked_documents_rels` (`path`);
CREATE INDEX `payload_locked_documents_rels_users_id_idx` ON `payload_locked_documents_rels` (`users_id`);
CREATE INDEX `payload_locked_documents_rels_media_id_idx` ON `payload_locked_documents_rels` (`media_id`);
CREATE INDEX `payload_preferences_key_idx` ON `payload_preferences` (`key`);
CREATE INDEX `payload_preferences_updated_at_idx` ON `payload_preferences` (`updated_at`);
CREATE INDEX `payload_preferences_created_at_idx` ON `payload_preferences` (`created_at`);
CREATE INDEX `payload_preferences_rels_order_idx` ON `payload_preferences_rels` (`order`);
CREATE INDEX `payload_preferences_rels_parent_idx` ON `payload_preferences_rels` (`parent_id`);
CREATE INDEX `payload_preferences_rels_path_idx` ON `payload_preferences_rels` (`path`);
CREATE INDEX `payload_preferences_rels_users_id_idx` ON `payload_preferences_rels` (`users_id`);
CREATE INDEX `payload_migrations_updated_at_idx` ON `payload_migrations` (`updated_at`);
CREATE INDEX `payload_migrations_created_at_idx` ON `payload_migrations` (`created_at`);
CREATE INDEX `tools_use_cases_order_idx` ON `tools_use_cases` (`order`);
CREATE INDEX `tools_use_cases_parent_idx` ON `tools_use_cases` (`parent_id`);
CREATE INDEX `tools_platforms_order_idx` ON `tools_platforms` (`order`);
CREATE INDEX `tools_platforms_parent_idx` ON `tools_platforms` (`parent_id`);
CREATE INDEX `tools_key_features_order_idx` ON `tools_key_features` (`_order`);
CREATE INDEX `tools_key_features_parent_id_idx` ON `tools_key_features` (`_parent_id`);
CREATE INDEX `tools_logo_idx` ON `tools` (`logo_id`);
CREATE UNIQUE INDEX `tools_slug_idx` ON `tools` (`slug`);
CREATE INDEX `tools_tool_category_idx` ON `tools` (`tool_category_id`);
CREATE INDEX `tools_updated_at_idx` ON `tools` (`updated_at`);
CREATE INDEX `tools_created_at_idx` ON `tools` (`created_at`);
CREATE INDEX `tools_rels_order_idx` ON `tools_rels` (`order`);
CREATE INDEX `tools_rels_parent_idx` ON `tools_rels` (`parent_id`);
CREATE INDEX `tools_rels_path_idx` ON `tools_rels` (`path`);
CREATE INDEX `tools_rels_creation_types_id_idx` ON `tools_rels` (`creation_types_id`);
CREATE INDEX `tools_rels_user_situations_id_idx` ON `tools_rels` (`user_situations_id`);
CREATE INDEX `makers_social_links_order_idx` ON "builders_social_links" (`_order`);
CREATE INDEX `makers_social_links_parent_id_idx` ON "builders_social_links" (`_parent_id`);
CREATE INDEX `makers_profile_image_idx` ON "builders" (`profile_image_id`);
CREATE INDEX `makers_background_image_idx` ON "builders" (`background_image_id`);
CREATE UNIQUE INDEX `makers_slug_idx` ON "builders" (`slug`);
CREATE INDEX `makers_updated_at_idx` ON "builders" (`updated_at`);
CREATE INDEX `makers_created_at_idx` ON "builders" (`created_at`);
CREATE INDEX `projects_tools_used_order_idx` ON `projects_tools_used` (`_order`);
CREATE INDEX `projects_tools_used_parent_id_idx` ON `projects_tools_used` (`_parent_id`);
CREATE INDEX `projects_social_links_order_idx` ON `projects_social_links` (`_order`);
CREATE INDEX `projects_social_links_parent_id_idx` ON `projects_social_links` (`_parent_id`);
CREATE INDEX `projects_featured_image_idx` ON `projects` (`featured_image_id`);
CREATE INDEX `projects_hero_background_idx` ON `projects` (`hero_background_id`);
CREATE INDEX `projects_audio_file_idx` ON `projects` (`audio_file_id`);
CREATE INDEX `projects_video_file_idx` ON `projects` (`video_file_id`);
CREATE UNIQUE INDEX `projects_slug_idx` ON `projects` (`slug`);
CREATE INDEX `projects_community_type_idx` ON `projects` (`community_type_id`);
CREATE INDEX `projects_updated_at_idx` ON `projects` (`updated_at`);
CREATE INDEX `projects_created_at_idx` ON `projects` (`created_at`);
CREATE INDEX `projects_rels_order_idx` ON `projects_rels` (`order`);
CREATE INDEX `projects_rels_parent_idx` ON `projects_rels` (`parent_id`);
CREATE INDEX `projects_rels_path_idx` ON `projects_rels` (`path`);
CREATE INDEX `projects_rels_media_id_idx` ON `projects_rels` (`media_id`);
CREATE INDEX `posts_featured_image_idx` ON `posts` (`featured_image_id`);
CREATE UNIQUE INDEX `posts_slug_idx` ON `posts` (`slug`);
CREATE INDEX `posts_news_category_idx` ON `posts` (`news_category_id`);
CREATE INDEX `posts_author_idx` ON `posts` (`author_id`);
CREATE INDEX `posts_updated_at_idx` ON `posts` (`updated_at`);
CREATE INDEX `posts_created_at_idx` ON `posts` (`created_at`);
CREATE INDEX `examples_tools_used_order_idx` ON `examples_tools_used` (`_order`);
CREATE INDEX `examples_tools_used_parent_id_idx` ON `examples_tools_used` (`_parent_id`);
CREATE INDEX `examples_step_by_step_order_idx` ON `examples_step_by_step` (`_order`);
CREATE INDEX `examples_step_by_step_parent_id_idx` ON `examples_step_by_step` (`_parent_id`);
CREATE INDEX `examples_prompts_used_order_idx` ON `examples_prompts_used` (`_order`);
CREATE INDEX `examples_prompts_used_parent_id_idx` ON `examples_prompts_used` (`_parent_id`);
CREATE INDEX `examples_key_outcomes_order_idx` ON `examples_key_outcomes` (`_order`);
CREATE INDEX `examples_key_outcomes_parent_id_idx` ON `examples_key_outcomes` (`_parent_id`);
CREATE INDEX `examples_download_files_order_idx` ON `examples_download_files` (`_order`);
CREATE INDEX `examples_download_files_parent_id_idx` ON `examples_download_files` (`_parent_id`);
CREATE INDEX `examples_download_files_file_idx` ON `examples_download_files` (`file_id`);
CREATE INDEX `examples_helpful_links_order_idx` ON `examples_helpful_links` (`_order`);
CREATE INDEX `examples_helpful_links_parent_id_idx` ON `examples_helpful_links` (`_parent_id`);
CREATE INDEX `examples_before_after_before_after_before_idx` ON `examples` (`before_after_before_id`);
CREATE INDEX `examples_before_after_before_after_after_idx` ON `examples` (`before_after_after_id`);
CREATE UNIQUE INDEX `examples_slug_idx` ON `examples` (`slug`);
CREATE INDEX `examples_creation_type_idx` ON `examples` (`creation_type_id`);
CREATE INDEX `examples_updated_at_idx` ON `examples` (`updated_at`);
CREATE INDEX `examples_created_at_idx` ON `examples` (`created_at`);
CREATE UNIQUE INDEX `tool_categories_slug_idx` ON `tool_categories` (`slug`);
CREATE INDEX `tool_categories_updated_at_idx` ON `tool_categories` (`updated_at`);
CREATE INDEX `tool_categories_created_at_idx` ON `tool_categories` (`created_at`);
CREATE UNIQUE INDEX `creation_types_slug_idx` ON `creation_types` (`slug`);
CREATE INDEX `creation_types_featured_image_idx` ON `creation_types` (`featured_image_id`);
CREATE INDEX `creation_types_updated_at_idx` ON `creation_types` (`updated_at`);
CREATE INDEX `creation_types_created_at_idx` ON `creation_types` (`created_at`);
CREATE UNIQUE INDEX `maker_specialties_slug_idx` ON "builder_specialties" (`slug`);
CREATE INDEX `maker_specialties_updated_at_idx` ON "builder_specialties" (`updated_at`);
CREATE INDEX `maker_specialties_created_at_idx` ON "builder_specialties" (`created_at`);
CREATE UNIQUE INDEX `community_types_slug_idx` ON `community_types` (`slug`);
CREATE INDEX `community_types_updated_at_idx` ON `community_types` (`updated_at`);
CREATE INDEX `community_types_created_at_idx` ON `community_types` (`created_at`);
CREATE UNIQUE INDEX `news_categories_slug_idx` ON `news_categories` (`slug`);
CREATE INDEX `news_categories_updated_at_idx` ON `news_categories` (`updated_at`);
CREATE INDEX `news_categories_created_at_idx` ON `news_categories` (`created_at`);
CREATE INDEX `user_situations_pain_points_order_idx` ON `user_situations_pain_points` (`_order`);
CREATE INDEX `user_situations_pain_points_parent_id_idx` ON `user_situations_pain_points` (`_parent_id`);
CREATE INDEX `user_situations_goals_order_idx` ON `user_situations_goals` (`_order`);
CREATE INDEX `user_situations_goals_parent_id_idx` ON `user_situations_goals` (`_parent_id`);
CREATE UNIQUE INDEX `user_situations_slug_idx` ON `user_situations` (`slug`);
CREATE INDEX `user_situations_avatar_idx` ON `user_situations` (`avatar_id`);
CREATE INDEX `user_situations_updated_at_idx` ON `user_situations` (`updated_at`);
CREATE INDEX `user_situations_created_at_idx` ON `user_situations` (`created_at`);
CREATE UNIQUE INDEX `payload_kv_key_idx` ON `payload_kv` (`key`);
CREATE INDEX `payload_locked_documents_rels_tools_id_idx` ON `payload_locked_documents_rels` (`tools_id`);
CREATE INDEX `payload_locked_documents_rels_makers_id_idx` ON `payload_locked_documents_rels` (`makers_id`);
CREATE INDEX `payload_locked_documents_rels_projects_id_idx` ON `payload_locked_documents_rels` (`projects_id`);
CREATE INDEX `payload_locked_documents_rels_posts_id_idx` ON `payload_locked_documents_rels` (`posts_id`);
CREATE INDEX `payload_locked_documents_rels_examples_id_idx` ON `payload_locked_documents_rels` (`examples_id`);
CREATE INDEX `payload_locked_documents_rels_tool_categories_id_idx` ON `payload_locked_documents_rels` (`tool_categories_id`);
CREATE INDEX `payload_locked_documents_rels_creation_types_id_idx` ON `payload_locked_documents_rels` (`creation_types_id`);
CREATE INDEX `payload_locked_documents_rels_maker_specialties_id_idx` ON `payload_locked_documents_rels` (`maker_specialties_id`);
CREATE INDEX `payload_locked_documents_rels_community_types_id_idx` ON `payload_locked_documents_rels` (`community_types_id`);
CREATE INDEX `payload_locked_documents_rels_news_categories_id_idx` ON `payload_locked_documents_rels` (`news_categories_id`);
CREATE INDEX `payload_locked_documents_rels_user_situations_id_idx` ON `payload_locked_documents_rels` (`user_situations_id`);
CREATE INDEX `creation_types_example_prompts_order_idx` ON `creation_types_example_prompts` (`_order`);
CREATE INDEX `creation_types_example_prompts_parent_id_idx` ON `creation_types_example_prompts` (`_parent_id`);
CREATE INDEX `builders_rels_order_idx` ON `builders_rels` (`order`);
CREATE INDEX `builders_rels_parent_idx` ON `builders_rels` (`parent_id`);
CREATE INDEX `builders_rels_path_idx` ON `builders_rels` (`path`);
CREATE INDEX `builders_rels_tools_id_idx` ON `builders_rels` (`tools_id`);
CREATE INDEX `builders_rels_builder_specialties_id_idx` ON `builders_rels` (`builder_specialties_id`);
CREATE UNIQUE INDEX `tutorials_slug_idx` ON `tutorials` (`slug`);
CREATE INDEX `tutorials_created_at_idx` ON `tutorials` (`created_at`);
CREATE INDEX `tutorials_steps_order_idx` ON `tutorials_steps` (`_order`);
CREATE INDEX `tutorials_steps_parent_id_idx` ON `tutorials_steps` (`_parent_id`);
CREATE INDEX `tutorials_tool_stack_order_idx` ON `tutorials_tool_stack` (`_order`);
CREATE INDEX `tutorials_tool_stack_parent_id_idx` ON `tutorials_tool_stack` (`_parent_id`);
CREATE INDEX `tutorials_prerequisites_order_idx` ON `tutorials_prerequisites` (`_order`);
CREATE INDEX `tutorials_prerequisites_parent_id_idx` ON `tutorials_prerequisites` (`_parent_id`);
CREATE INDEX `tutorials_next_steps_order_idx` ON `tutorials_next_steps` (`_order`);
CREATE INDEX `tutorials_next_steps_parent_id_idx` ON `tutorials_next_steps` (`_parent_id`);
CREATE INDEX `tutorials_rels_order_idx` ON `tutorials_rels` (`order`);
CREATE INDEX `tutorials_rels_parent_idx` ON `tutorials_rels` (`parent_id`);
CREATE INDEX `tutorials_rels_path_idx` ON `tutorials_rels` (`path`);
CREATE INDEX `tutorials_rels_tools_id_idx` ON `tutorials_rels` (`tools_id`);
CREATE INDEX `tutorials_rels_tutorials_id_idx` ON `tutorials_rels` (`tutorials_id`);
CREATE INDEX `search_created_at_idx` ON `search` (`created_at`);
CREATE INDEX `search_priority_idx` ON `search` (`priority`);
CREATE INDEX `search_rels_order_idx` ON `search_rels` (`order`);
CREATE INDEX `search_rels_parent_idx` ON `search_rels` (`parent_id`);
CREATE INDEX `search_rels_path_idx` ON `search_rels` (`path`);
CREATE INDEX `search_rels_tools_id_idx` ON `search_rels` (`tools_id`);
CREATE INDEX `search_rels_builders_id_idx` ON `search_rels` (`builders_id`);
CREATE INDEX `search_rels_projects_id_idx` ON `search_rels` (`projects_id`);
CREATE INDEX `search_rels_posts_id_idx` ON `search_rels` (`posts_id`);
CREATE INDEX `search_rels_tutorials_id_idx` ON `search_rels` (`tutorials_id`);
CREATE INDEX "tools_pricing_tiers_order_idx" ON "tools_pricing_tiers" ("_order");
CREATE INDEX "tools_pricing_tiers_parent_id_idx" ON "tools_pricing_tiers" ("_parent_id");
CREATE INDEX "tools_pricing_tiers_features_order_idx" ON "tools_pricing_tiers_features" ("_order");
CREATE INDEX "tools_pricing_tiers_features_parent_id_idx" ON "tools_pricing_tiers_features" ("_parent_id");
CREATE INDEX "tools_pricing_tiers_limitations_order_idx" ON "tools_pricing_tiers_limitations" ("_order");
CREATE INDEX "tools_pricing_tiers_limitations_parent_id_idx" ON "tools_pricing_tiers_limitations" ("_parent_id");
CREATE INDEX "tools_pros_order_idx" ON "tools_pros" ("_order");
CREATE INDEX "tools_pros_parent_id_idx" ON "tools_pros" ("_parent_id");
CREATE INDEX "tools_cons_order_idx" ON "tools_cons" ("_order");
CREATE INDEX "tools_cons_parent_id_idx" ON "tools_cons" ("_parent_id");
CREATE INDEX "tools_best_for_order_idx" ON "tools_best_for" ("_order");
CREATE INDEX "tools_best_for_parent_id_idx" ON "tools_best_for" ("_parent_id");
CREATE INDEX "tools_not_ideal_for_order_idx" ON "tools_not_ideal_for" ("_order");
CREATE INDEX "tools_not_ideal_for_parent_id_idx" ON "tools_not_ideal_for" ("_parent_id");
CREATE INDEX "tools_use_case_scenarios_order_idx" ON "tools_use_case_scenarios" ("_order");
CREATE INDEX "tools_use_case_scenarios_parent_id_idx" ON "tools_use_case_scenarios" ("_parent_id");
CREATE INDEX "tools_faqs_order_idx" ON "tools_faqs" ("_order");
CREATE INDEX "tools_faqs_parent_id_idx" ON "tools_faqs" ("_parent_id");
CREATE INDEX "tools_secondary_keywords_order_idx" ON "tools_secondary_keywords" ("_order");
CREATE INDEX "tools_secondary_keywords_parent_id_idx" ON "tools_secondary_keywords" ("_parent_id");
