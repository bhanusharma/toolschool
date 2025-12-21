import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create tutorials table
  await db.run(sql`CREATE TABLE \`tutorials\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text NOT NULL,
    \`subtitle\` text,
    \`excerpt\` text,
    \`introduction\` text,
    \`what_you_built\` text,
    \`slug\` text NOT NULL,
    \`status\` text DEFAULT 'draft',
    \`featured\` integer DEFAULT false,
    \`difficulty\` text,
    \`estimated_time\` numeric,
    \`category\` text,
    \`featured_image_id\` integer REFERENCES \`media\`(\`id\`) ON DELETE SET NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );`)

  await db.run(sql`CREATE UNIQUE INDEX \`tutorials_slug_idx\` ON \`tutorials\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_created_at_idx\` ON \`tutorials\` (\`created_at\`);`)

  // Create tutorials_steps table (array field)
  await db.run(sql`CREATE TABLE \`tutorials_steps\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`step_number\` numeric NOT NULL,
    \`title\` text NOT NULL,
    \`estimated_minutes\` numeric,
    \`content\` text,
    \`alternative_content\` text,
    \`alternative_label\` text,
    \`tip\` text,
    \`warning\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`tutorials_steps_order_idx\` ON \`tutorials_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_steps_parent_id_idx\` ON \`tutorials_steps\` (\`_parent_id\`);`)

  // Create tutorials_tool_stack table (array field)
  await db.run(sql`CREATE TABLE \`tutorials_tool_stack\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`role\` text NOT NULL,
    \`primary_tool\` text NOT NULL,
    \`alternative_tool\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`tutorials_tool_stack_order_idx\` ON \`tutorials_tool_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_tool_stack_parent_id_idx\` ON \`tutorials_tool_stack\` (\`_parent_id\`);`)

  // Create tutorials_prerequisites table (array field)
  await db.run(sql`CREATE TABLE \`tutorials_prerequisites\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`item\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`tutorials_prerequisites_order_idx\` ON \`tutorials_prerequisites\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_prerequisites_parent_id_idx\` ON \`tutorials_prerequisites\` (\`_parent_id\`);`)

  // Create tutorials_next_steps table (array field)
  await db.run(sql`CREATE TABLE \`tutorials_next_steps\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`title\` text NOT NULL,
    \`description\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`tutorials_next_steps_order_idx\` ON \`tutorials_next_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_next_steps_parent_id_idx\` ON \`tutorials_next_steps\` (\`_parent_id\`);`)

  // Create tutorials_rels table (for relationships)
  await db.run(sql`CREATE TABLE \`tutorials_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`tools_id\` integer,
    \`tutorials_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tutorials_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`tutorials_rels_order_idx\` ON \`tutorials_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_rels_parent_idx\` ON \`tutorials_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_rels_path_idx\` ON \`tutorials_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_rels_tools_id_idx\` ON \`tutorials_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`tutorials_rels_tutorials_id_idx\` ON \`tutorials_rels\` (\`tutorials_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials_next_steps\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials_prerequisites\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials_tool_stack\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials_steps\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tutorials\`;`)
}
