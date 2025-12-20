import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tools_use_cases\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_use_cases_order_idx\` ON \`tools_use_cases\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tools_use_cases_parent_idx\` ON \`tools_use_cases\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tools_platforms\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_platforms_order_idx\` ON \`tools_platforms\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tools_platforms_parent_idx\` ON \`tools_platforms\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tools_key_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_key_features_order_idx\` ON \`tools_key_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tools_key_features_parent_id_idx\` ON \`tools_key_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`tagline\` text,
  	\`excerpt\` text,
  	\`content\` text,
  	\`logo_id\` integer,
  	\`website\` text,
  	\`pricing_model\` text,
  	\`pricing_summary\` text,
  	\`difficulty\` text,
  	\`stats_users\` text,
  	\`stats_rating\` numeric,
  	\`stats_company\` text,
  	\`stats_launch_year\` numeric,
  	\`slug\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`tool_category_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tool_category_id\`) REFERENCES \`tool_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_logo_idx\` ON \`tools\` (\`logo_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tools_tool_category_idx\` ON \`tools\` (\`tool_category_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_updated_at_idx\` ON \`tools\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tools_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`creation_types_id\` integer,
  	\`user_situations_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`creation_types_id\`) REFERENCES \`creation_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`user_situations_id\`) REFERENCES \`user_situations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_rels_order_idx\` ON \`tools_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_parent_idx\` ON \`tools_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_path_idx\` ON \`tools_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_creation_types_id_idx\` ON \`tools_rels\` (\`creation_types_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_user_situations_id_idx\` ON \`tools_rels\` (\`user_situations_id\`);`)
  await db.run(sql`CREATE TABLE \`makers_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`makers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`makers_social_links_order_idx\` ON \`makers_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`makers_social_links_parent_id_idx\` ON \`makers_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`makers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`bio\` text,
  	\`content\` text,
  	\`location\` text,
  	\`profile_image_id\` integer,
  	\`background_image_id\` integer,
  	\`website\` text,
  	\`experience_level\` text,
  	\`availability\` text,
  	\`slug\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`featured_position\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`makers_profile_image_idx\` ON \`makers\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`makers_background_image_idx\` ON \`makers\` (\`background_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`makers_slug_idx\` ON \`makers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`makers_updated_at_idx\` ON \`makers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`makers_created_at_idx\` ON \`makers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`makers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tools_id\` integer,
  	\`maker_specialties_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`makers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`maker_specialties_id\`) REFERENCES \`maker_specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`makers_rels_order_idx\` ON \`makers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`makers_rels_parent_idx\` ON \`makers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`makers_rels_path_idx\` ON \`makers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`makers_rels_tools_id_idx\` ON \`makers_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`makers_rels_maker_specialties_id_idx\` ON \`makers_rels\` (\`maker_specialties_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_tools_used\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`category\` text,
  	\`url\` text,
  	\`usage\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_tools_used_order_idx\` ON \`projects_tools_used\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_tools_used_parent_id_idx\` ON \`projects_tools_used\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_social_links_order_idx\` ON \`projects_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_social_links_parent_id_idx\` ON \`projects_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text,
  	\`featured_image_id\` integer,
  	\`hero_background_id\` integer,
  	\`project_year\` numeric,
  	\`project_author\` text,
  	\`project_url\` text,
  	\`demo_url\` text,
  	\`github_url\` text,
  	\`workflow\` text,
  	\`difficulty\` text,
  	\`time_spent\` text,
  	\`duration\` text,
  	\`genre\` text,
  	\`audio_file_id\` integer,
  	\`video_file_id\` integer,
  	\`slug\` text NOT NULL,
  	\`community_type_id\` integer,
  	\`views\` numeric DEFAULT 0,
  	\`featured_in_hero\` integer DEFAULT false,
  	\`featured_in_showcase\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audio_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`community_type_id\`) REFERENCES \`community_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_featured_image_idx\` ON \`projects\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_hero_background_idx\` ON \`projects\` (\`hero_background_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_audio_file_idx\` ON \`projects\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_video_file_idx\` ON \`projects\` (\`video_file_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_community_type_idx\` ON \`projects\` (\`community_type_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_media_id_idx\` ON \`projects_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text,
  	\`featured_image_id\` integer,
  	\`category_badge\` text,
  	\`publication_date_override\` text,
  	\`slug\` text NOT NULL,
  	\`news_category_id\` integer,
  	\`author_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`news_category_id\`) REFERENCES \`news_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_news_category_idx\` ON \`posts\` (\`news_category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`examples_tools_used\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`purpose\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_tools_used_order_idx\` ON \`examples_tools_used\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_tools_used_parent_id_idx\` ON \`examples_tools_used\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`examples_step_by_step\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step_number\` numeric NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_step_by_step_order_idx\` ON \`examples_step_by_step\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_step_by_step_parent_id_idx\` ON \`examples_step_by_step\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`examples_prompts_used\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tool\` text NOT NULL,
  	\`prompt\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_prompts_used_order_idx\` ON \`examples_prompts_used\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_prompts_used_parent_id_idx\` ON \`examples_prompts_used\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`examples_key_outcomes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`outcome\` text NOT NULL,
  	\`metric\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_key_outcomes_order_idx\` ON \`examples_key_outcomes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_key_outcomes_parent_id_idx\` ON \`examples_key_outcomes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`examples_download_files\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`file_id\` integer,
  	\`description\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_download_files_order_idx\` ON \`examples_download_files\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_download_files_parent_id_idx\` ON \`examples_download_files\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`examples_download_files_file_idx\` ON \`examples_download_files\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`examples_helpful_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`examples\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_helpful_links_order_idx\` ON \`examples_helpful_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`examples_helpful_links_parent_id_idx\` ON \`examples_helpful_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`examples\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`tagline\` text,
  	\`content\` text,
  	\`difficulty_level\` text,
  	\`time_to_create\` text,
  	\`cost_range\` text,
  	\`creator_info_name\` text,
  	\`creator_info_title\` text,
  	\`creator_info_website\` text,
  	\`before_after_before_id\` integer,
  	\`before_after_after_id\` integer,
  	\`lessons_learned\` text,
  	\`slug\` text NOT NULL,
  	\`creation_type_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`before_after_before_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`before_after_after_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`creation_type_id\`) REFERENCES \`creation_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`examples_before_after_before_after_before_idx\` ON \`examples\` (\`before_after_before_id\`);`)
  await db.run(sql`CREATE INDEX \`examples_before_after_before_after_after_idx\` ON \`examples\` (\`before_after_after_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`examples_slug_idx\` ON \`examples\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`examples_creation_type_idx\` ON \`examples\` (\`creation_type_id\`);`)
  await db.run(sql`CREATE INDEX \`examples_updated_at_idx\` ON \`examples\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`examples_created_at_idx\` ON \`examples\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tool_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	\`color\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tool_categories_slug_idx\` ON \`tool_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tool_categories_updated_at_idx\` ON \`tool_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tool_categories_created_at_idx\` ON \`tool_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`creation_types\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`icon\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`color\` text,
  	\`gradient_color\` text,
  	\`featured_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`creation_types_slug_idx\` ON \`creation_types\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`creation_types_featured_image_idx\` ON \`creation_types\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`creation_types_updated_at_idx\` ON \`creation_types\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`creation_types_created_at_idx\` ON \`creation_types\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`maker_specialties\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`maker_specialties_slug_idx\` ON \`maker_specialties\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`maker_specialties_updated_at_idx\` ON \`maker_specialties\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`maker_specialties_created_at_idx\` ON \`maker_specialties\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`community_types\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`community_types_slug_idx\` ON \`community_types\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`community_types_updated_at_idx\` ON \`community_types\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`community_types_created_at_idx\` ON \`community_types\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`news_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`color\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`news_categories_slug_idx\` ON \`news_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`news_categories_updated_at_idx\` ON \`news_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`news_categories_created_at_idx\` ON \`news_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`user_situations_pain_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`severity\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`user_situations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`user_situations_pain_points_order_idx\` ON \`user_situations_pain_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`user_situations_pain_points_parent_id_idx\` ON \`user_situations_pain_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`user_situations_goals\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`priority\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`user_situations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`user_situations_goals_order_idx\` ON \`user_situations_goals\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`user_situations_goals_parent_id_idx\` ON \`user_situations_goals\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`user_situations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`icon\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`color\` text,
  	\`accent_color\` text,
  	\`avatar_id\` integer,
  	\`experience_level\` text,
  	\`budget_range\` text,
  	\`time_availability\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`user_situations_slug_idx\` ON \`user_situations\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`user_situations_avatar_idx\` ON \`user_situations\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`user_situations_updated_at_idx\` ON \`user_situations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`user_situations_created_at_idx\` ON \`user_situations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tools_id\` integer REFERENCES tools(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`makers_id\` integer REFERENCES makers(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`projects_id\` integer REFERENCES projects(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`examples_id\` integer REFERENCES examples(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tool_categories_id\` integer REFERENCES tool_categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`creation_types_id\` integer REFERENCES creation_types(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`maker_specialties_id\` integer REFERENCES maker_specialties(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`community_types_id\` integer REFERENCES community_types(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`news_categories_id\` integer REFERENCES news_categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`user_situations_id\` integer REFERENCES user_situations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_makers_id_idx\` ON \`payload_locked_documents_rels\` (\`makers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_examples_id_idx\` ON \`payload_locked_documents_rels\` (\`examples_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tool_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`tool_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_creation_types_id_idx\` ON \`payload_locked_documents_rels\` (\`creation_types_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_maker_specialties_id_idx\` ON \`payload_locked_documents_rels\` (\`maker_specialties_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_community_types_id_idx\` ON \`payload_locked_documents_rels\` (\`community_types_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`news_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_user_situations_id_idx\` ON \`payload_locked_documents_rels\` (\`user_situations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tools_use_cases\`;`)
  await db.run(sql`DROP TABLE \`tools_platforms\`;`)
  await db.run(sql`DROP TABLE \`tools_key_features\`;`)
  await db.run(sql`DROP TABLE \`tools\`;`)
  await db.run(sql`DROP TABLE \`tools_rels\`;`)
  await db.run(sql`DROP TABLE \`makers_social_links\`;`)
  await db.run(sql`DROP TABLE \`makers\`;`)
  await db.run(sql`DROP TABLE \`makers_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_tools_used\`;`)
  await db.run(sql`DROP TABLE \`projects_social_links\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`examples_tools_used\`;`)
  await db.run(sql`DROP TABLE \`examples_step_by_step\`;`)
  await db.run(sql`DROP TABLE \`examples_prompts_used\`;`)
  await db.run(sql`DROP TABLE \`examples_key_outcomes\`;`)
  await db.run(sql`DROP TABLE \`examples_download_files\`;`)
  await db.run(sql`DROP TABLE \`examples_helpful_links\`;`)
  await db.run(sql`DROP TABLE \`examples\`;`)
  await db.run(sql`DROP TABLE \`tool_categories\`;`)
  await db.run(sql`DROP TABLE \`creation_types\`;`)
  await db.run(sql`DROP TABLE \`maker_specialties\`;`)
  await db.run(sql`DROP TABLE \`community_types\`;`)
  await db.run(sql`DROP TABLE \`news_categories\`;`)
  await db.run(sql`DROP TABLE \`user_situations_pain_points\`;`)
  await db.run(sql`DROP TABLE \`user_situations_goals\`;`)
  await db.run(sql`DROP TABLE \`user_situations\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
