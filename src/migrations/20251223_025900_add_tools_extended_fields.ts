import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add tools_pricing_tiers table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_pricing_tiers" (
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
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_order_idx" ON "tools_pricing_tiers" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_parent_id_idx" ON "tools_pricing_tiers" ("_parent_id")`)

  // Add tools_pricing_tiers_features table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_features" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "feature" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_features_order_idx" ON "tools_pricing_tiers_features" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_features_parent_id_idx" ON "tools_pricing_tiers_features" ("_parent_id")`)

  // Add tools_pricing_tiers_limitations table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_limitations" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "limitation" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_limitations_order_idx" ON "tools_pricing_tiers_limitations" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_limitations_parent_id_idx" ON "tools_pricing_tiers_limitations" ("_parent_id")`)

  // Add tools_pros table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_pros" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "description" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pros_order_idx" ON "tools_pros" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_pros_parent_id_idx" ON "tools_pros" ("_parent_id")`)

  // Add tools_cons table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_cons" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "description" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_cons_order_idx" ON "tools_cons" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_cons_parent_id_idx" ON "tools_cons" ("_parent_id")`)

  // Add tools_best_for table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_best_for" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "persona" text,
    "reason" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_best_for_order_idx" ON "tools_best_for" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_best_for_parent_id_idx" ON "tools_best_for" ("_parent_id")`)

  // Add tools_not_ideal_for table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_not_ideal_for" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "persona" text,
    "reason" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_not_ideal_for_order_idx" ON "tools_not_ideal_for" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_not_ideal_for_parent_id_idx" ON "tools_not_ideal_for" ("_parent_id")`)

  // Add tools_use_case_scenarios table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_use_case_scenarios" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" text,
    "persona" text,
    "problem" text,
    "solution" text,
    "outcome" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_use_case_scenarios_order_idx" ON "tools_use_case_scenarios" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_use_case_scenarios_parent_id_idx" ON "tools_use_case_scenarios" ("_parent_id")`)

  // Add tools_faqs table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_faqs" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "question" text,
    "answer" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_faqs_order_idx" ON "tools_faqs" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_faqs_parent_id_idx" ON "tools_faqs" ("_parent_id")`)

  // Add tools_secondary_keywords table
  await db.run(sql`CREATE TABLE IF NOT EXISTS "tools_secondary_keywords" (
    "id" integer PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "keyword" text,
    FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
  )`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_secondary_keywords_order_idx" ON "tools_secondary_keywords" ("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "tools_secondary_keywords_parent_id_idx" ON "tools_secondary_keywords" ("_parent_id")`)

  // Check if columns exist before adding them to tools table
  // SQLite doesn't support IF NOT EXISTS for columns, so we need to check first
  const tableInfo = await db.all(sql`PRAGMA table_info(tools)`)
  const existingColumns = new Set((tableInfo as Array<{ name: string }>).map(col => col.name))

  const columnsToAdd = [
    { name: 'how_it_works', type: 'text' },
    { name: 'price_last_verified', type: 'text' },
    { name: 'ratings_overall', type: 'integer' },
    { name: 'ratings_ease_of_use', type: 'integer' },
    { name: 'ratings_value_for_money', type: 'integer' },
    { name: 'ratings_features', type: 'integer' },
    { name: 'ratings_support', type: 'integer' },
    { name: 'expert_verdict', type: 'text' },
    { name: 'verdict_summary', type: 'text' },
    { name: 'comparison_notes', type: 'text' },
    { name: 'meta_title', type: 'text' },
    { name: 'meta_description', type: 'text' },
    { name: 'focus_keyword', type: 'text' },
  ]

  for (const col of columnsToAdd) {
    if (!existingColumns.has(col.name)) {
      await db.run(sql.raw(`ALTER TABLE "tools" ADD COLUMN "${col.name}" ${col.type}`))
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS "tools_pricing_tiers_features"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_pricing_tiers_limitations"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_pricing_tiers"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_pros"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_cons"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_best_for"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_not_ideal_for"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_use_case_scenarios"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_faqs"`)
  await db.run(sql`DROP TABLE IF EXISTS "tools_secondary_keywords"`)
}
