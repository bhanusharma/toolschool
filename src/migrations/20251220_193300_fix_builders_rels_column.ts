import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // SQLite doesn't support ALTER COLUMN RENAME, so we need to recreate the table
  // Step 1: Create new table with correct column name
  await db.run(sql`CREATE TABLE \`builders_rels_new\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`tools_id\` integer,
    \`builder_specialties_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`builders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`builder_specialties_id\`) REFERENCES \`builder_specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  // Step 2: Copy data from old table to new table
  await db.run(sql`INSERT INTO \`builders_rels_new\` (\`id\`, \`order\`, \`parent_id\`, \`path\`, \`tools_id\`, \`builder_specialties_id\`)
    SELECT \`id\`, \`order\`, \`parent_id\`, \`path\`, \`tools_id\`, \`maker_specialties_id\` FROM \`builders_rels\`;`)

  // Step 3: Drop old table
  await db.run(sql`DROP TABLE \`builders_rels\`;`)

  // Step 4: Rename new table to original name
  await db.run(sql`ALTER TABLE \`builders_rels_new\` RENAME TO \`builders_rels\`;`)

  // Step 5: Recreate indexes
  await db.run(sql`CREATE INDEX \`builders_rels_order_idx\` ON \`builders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_parent_idx\` ON \`builders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_path_idx\` ON \`builders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_tools_id_idx\` ON \`builders_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_builder_specialties_id_idx\` ON \`builders_rels\` (\`builder_specialties_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse the process - rename column back to maker_specialties_id
  await db.run(sql`CREATE TABLE \`builders_rels_old\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`tools_id\` integer,
    \`maker_specialties_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`builders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`maker_specialties_id\`) REFERENCES \`builder_specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)

  await db.run(sql`INSERT INTO \`builders_rels_old\` (\`id\`, \`order\`, \`parent_id\`, \`path\`, \`tools_id\`, \`maker_specialties_id\`)
    SELECT \`id\`, \`order\`, \`parent_id\`, \`path\`, \`tools_id\`, \`builder_specialties_id\` FROM \`builders_rels\`;`)

  await db.run(sql`DROP TABLE \`builders_rels\`;`)
  await db.run(sql`ALTER TABLE \`builders_rels_old\` RENAME TO \`builders_rels\`;`)

  await db.run(sql`CREATE INDEX \`builders_rels_order_idx\` ON \`builders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_parent_idx\` ON \`builders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_path_idx\` ON \`builders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_tools_id_idx\` ON \`builders_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`builders_rels_maker_specialties_id_idx\` ON \`builders_rels\` (\`maker_specialties_id\`);`)
}
