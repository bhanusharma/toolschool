import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add ALL missing columns to payload_locked_documents_rels
  // These columns are needed for the document locking feature for each collection

  // builders_id - from makers->builders rename
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`builders_id\` integer REFERENCES \`builders\`(\`id\`) ON DELETE CASCADE;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_builders_id_idx\` ON \`payload_locked_documents_rels\` (\`builders_id\`);`)

  // tutorials_id - from tutorials collection
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`tutorials_id\` integer REFERENCES \`tutorials\`(\`id\`) ON DELETE CASCADE;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tutorials_id_idx\` ON \`payload_locked_documents_rels\` (\`tutorials_id\`);`)

  // search_id - from search collection
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`search_id\` integer REFERENCES \`search\`(\`id\`) ON DELETE CASCADE;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)

  // builder_specialties_id - from maker-specialties->builder-specialties rename
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`builder_specialties_id\` integer REFERENCES \`builder_specialties\`(\`id\`) ON DELETE CASCADE;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_builder_specialties_id_idx\` ON \`payload_locked_documents_rels\` (\`builder_specialties_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN easily, so we'd need to recreate the table
  // For simplicity, we'll just drop the indexes (the columns will remain but be unused)
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_builders_id_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_tutorials_id_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_search_id_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_builder_specialties_id_idx\`;`)
}
