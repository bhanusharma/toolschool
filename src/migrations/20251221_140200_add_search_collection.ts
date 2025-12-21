import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create search collection table for Payload Search Plugin
  await db.run(sql`CREATE TABLE \`search\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`priority\` integer,
    \`excerpt\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );`)

  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`search_priority_idx\` ON \`search\` (\`priority\`);`)

  // Create search_rels table for polymorphic relationships to indexed collections
  await db.run(sql`CREATE TABLE \`search_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`tools_id\` integer,
    \`builders_id\` integer,
    \`projects_id\` integer,
    \`posts_id\` integer,
    \`tutorials_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`builders_id\`) REFERENCES \`builders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tutorials_id\`) REFERENCES \`tutorials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_tools_id_idx\` ON \`search_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_builders_id_idx\` ON \`search_rels\` (\`builders_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_projects_id_idx\` ON \`search_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_tutorials_id_idx\` ON \`search_rels\` (\`tutorials_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`search_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`search\`;`)
}
