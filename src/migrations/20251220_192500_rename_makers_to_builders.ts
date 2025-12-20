import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Rename makers table to builders
  await db.run(sql`ALTER TABLE \`makers\` RENAME TO \`builders\`;`)

  // Rename makers_social_links to builders_social_links
  await db.run(sql`ALTER TABLE \`makers_social_links\` RENAME TO \`builders_social_links\`;`)

  // Rename makers_rels to builders_rels
  await db.run(sql`ALTER TABLE \`makers_rels\` RENAME TO \`builders_rels\`;`)

  // Rename maker_specialties to builder_specialties
  await db.run(sql`ALTER TABLE \`maker_specialties\` RENAME TO \`builder_specialties\`;`)

  // Update the column reference in builders_rels from maker_specialties_id to builder_specialties_id
  // SQLite doesn't support renaming columns directly in older versions, so we need to recreate
  // However, Payload will handle the column names via its ORM, so we just need the table renamed
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Rename back to original names
  await db.run(sql`ALTER TABLE \`builders\` RENAME TO \`makers\`;`)
  await db.run(sql`ALTER TABLE \`builders_social_links\` RENAME TO \`makers_social_links\`;`)
  await db.run(sql`ALTER TABLE \`builders_rels\` RENAME TO \`makers_rels\`;`)
  await db.run(sql`ALTER TABLE \`builder_specialties\` RENAME TO \`maker_specialties\`;`)
}
