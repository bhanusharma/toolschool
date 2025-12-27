-- Migration for extended tools fields
-- Run with: npx wrangler d1 execute toolschool-db --remote --file=scripts/migrate-tools-extended.sql

-- Add tools_pricing_tiers table
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
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_order_idx" ON "tools_pricing_tiers" ("_order");
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_parent_id_idx" ON "tools_pricing_tiers" ("_parent_id");

-- Add tools_pricing_tiers_features table
CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_features" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "feature" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_features_order_idx" ON "tools_pricing_tiers_features" ("_order");
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_features_parent_id_idx" ON "tools_pricing_tiers_features" ("_parent_id");

-- Add tools_pricing_tiers_limitations table
CREATE TABLE IF NOT EXISTS "tools_pricing_tiers_limitations" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "limitation" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools_pricing_tiers"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_limitations_order_idx" ON "tools_pricing_tiers_limitations" ("_order");
CREATE INDEX IF NOT EXISTS "tools_pricing_tiers_limitations_parent_id_idx" ON "tools_pricing_tiers_limitations" ("_parent_id");

-- Add tools_pros table
CREATE TABLE IF NOT EXISTS "tools_pros" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" text,
  "description" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_pros_order_idx" ON "tools_pros" ("_order");
CREATE INDEX IF NOT EXISTS "tools_pros_parent_id_idx" ON "tools_pros" ("_parent_id");

-- Add tools_cons table
CREATE TABLE IF NOT EXISTS "tools_cons" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" text,
  "description" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_cons_order_idx" ON "tools_cons" ("_order");
CREATE INDEX IF NOT EXISTS "tools_cons_parent_id_idx" ON "tools_cons" ("_parent_id");

-- Add tools_best_for table
CREATE TABLE IF NOT EXISTS "tools_best_for" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "persona" text,
  "reason" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_best_for_order_idx" ON "tools_best_for" ("_order");
CREATE INDEX IF NOT EXISTS "tools_best_for_parent_id_idx" ON "tools_best_for" ("_parent_id");

-- Add tools_not_ideal_for table
CREATE TABLE IF NOT EXISTS "tools_not_ideal_for" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "persona" text,
  "reason" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_not_ideal_for_order_idx" ON "tools_not_ideal_for" ("_order");
CREATE INDEX IF NOT EXISTS "tools_not_ideal_for_parent_id_idx" ON "tools_not_ideal_for" ("_parent_id");

-- Add tools_use_case_scenarios table
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
CREATE INDEX IF NOT EXISTS "tools_use_case_scenarios_order_idx" ON "tools_use_case_scenarios" ("_order");
CREATE INDEX IF NOT EXISTS "tools_use_case_scenarios_parent_id_idx" ON "tools_use_case_scenarios" ("_parent_id");

-- Add tools_faqs table
CREATE TABLE IF NOT EXISTS "tools_faqs" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "question" text,
  "answer" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_faqs_order_idx" ON "tools_faqs" ("_order");
CREATE INDEX IF NOT EXISTS "tools_faqs_parent_id_idx" ON "tools_faqs" ("_parent_id");

-- Add tools_secondary_keywords table
CREATE TABLE IF NOT EXISTS "tools_secondary_keywords" (
  "id" integer PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "keyword" text,
  FOREIGN KEY ("_parent_id") REFERENCES "tools"("id") ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS "tools_secondary_keywords_order_idx" ON "tools_secondary_keywords" ("_order");
CREATE INDEX IF NOT EXISTS "tools_secondary_keywords_parent_id_idx" ON "tools_secondary_keywords" ("_parent_id");

-- Add columns to tools table (SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN, but these should fail silently if already exist)
ALTER TABLE "tools" ADD COLUMN "how_it_works" text;
ALTER TABLE "tools" ADD COLUMN "price_last_verified" text;
ALTER TABLE "tools" ADD COLUMN "ratings_overall" integer;
ALTER TABLE "tools" ADD COLUMN "ratings_ease_of_use" integer;
ALTER TABLE "tools" ADD COLUMN "ratings_value_for_money" integer;
ALTER TABLE "tools" ADD COLUMN "ratings_features" integer;
ALTER TABLE "tools" ADD COLUMN "ratings_support" integer;
ALTER TABLE "tools" ADD COLUMN "expert_verdict" text;
ALTER TABLE "tools" ADD COLUMN "verdict_summary" text;
ALTER TABLE "tools" ADD COLUMN "comparison_notes" text;
ALTER TABLE "tools" ADD COLUMN "meta_title" text;
ALTER TABLE "tools" ADD COLUMN "meta_description" text;
ALTER TABLE "tools" ADD COLUMN "focus_keyword" text;
