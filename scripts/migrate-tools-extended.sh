#!/bin/bash
# Run migrations for extended tool fields

DB="toolschool-db"

echo "Creating tools_pricing_tiers indexes..."
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_order_idx\" ON \"tools_pricing_tiers\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_parent_id_idx\" ON \"tools_pricing_tiers\" (\"_parent_id\")"

echo "Creating tools_pricing_tiers_features..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_pricing_tiers_features\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"feature\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools_pricing_tiers\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_features_order_idx\" ON \"tools_pricing_tiers_features\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_features_parent_id_idx\" ON \"tools_pricing_tiers_features\" (\"_parent_id\")"

echo "Creating tools_pricing_tiers_limitations..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_pricing_tiers_limitations\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"limitation\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools_pricing_tiers\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_limitations_order_idx\" ON \"tools_pricing_tiers_limitations\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pricing_tiers_limitations_parent_id_idx\" ON \"tools_pricing_tiers_limitations\" (\"_parent_id\")"

echo "Creating tools_pros..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_pros\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"title\" text,
    \"description\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pros_order_idx\" ON \"tools_pros\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_pros_parent_id_idx\" ON \"tools_pros\" (\"_parent_id\")"

echo "Creating tools_cons..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_cons\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"title\" text,
    \"description\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_cons_order_idx\" ON \"tools_cons\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_cons_parent_id_idx\" ON \"tools_cons\" (\"_parent_id\")"

echo "Creating tools_best_for..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_best_for\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"persona\" text,
    \"reason\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_best_for_order_idx\" ON \"tools_best_for\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_best_for_parent_id_idx\" ON \"tools_best_for\" (\"_parent_id\")"

echo "Creating tools_not_ideal_for..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_not_ideal_for\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"persona\" text,
    \"reason\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_not_ideal_for_order_idx\" ON \"tools_not_ideal_for\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_not_ideal_for_parent_id_idx\" ON \"tools_not_ideal_for\" (\"_parent_id\")"

echo "Creating tools_use_case_scenarios..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_use_case_scenarios\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"title\" text,
    \"persona\" text,
    \"problem\" text,
    \"solution\" text,
    \"outcome\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_use_case_scenarios_order_idx\" ON \"tools_use_case_scenarios\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_use_case_scenarios_parent_id_idx\" ON \"tools_use_case_scenarios\" (\"_parent_id\")"

echo "Creating tools_faqs..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_faqs\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"question\" text,
    \"answer\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_faqs_order_idx\" ON \"tools_faqs\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_faqs_parent_id_idx\" ON \"tools_faqs\" (\"_parent_id\")"

echo "Creating tools_secondary_keywords..."
npx wrangler d1 execute $DB --remote --command "CREATE TABLE IF NOT EXISTS \"tools_secondary_keywords\" (
    \"id\" integer PRIMARY KEY NOT NULL,
    \"_order\" integer NOT NULL,
    \"_parent_id\" integer NOT NULL,
    \"keyword\" text,
    FOREIGN KEY (\"_parent_id\") REFERENCES \"tools\"(\"id\") ON UPDATE no action ON DELETE cascade
  )"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_secondary_keywords_order_idx\" ON \"tools_secondary_keywords\" (\"_order\")"
npx wrangler d1 execute $DB --remote --command "CREATE INDEX IF NOT EXISTS \"tools_secondary_keywords_parent_id_idx\" ON \"tools_secondary_keywords\" (\"_parent_id\")"

echo "Adding columns to tools table..."
# Add columns individually (SQLite doesn't support multiple ALTER TABLE in one command)
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN how_it_works text" 2>/dev/null || echo "Column how_it_works already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN price_last_verified text" 2>/dev/null || echo "Column price_last_verified already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN ratings_overall integer" 2>/dev/null || echo "Column ratings_overall already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN ratings_ease_of_use integer" 2>/dev/null || echo "Column ratings_ease_of_use already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN ratings_value_for_money integer" 2>/dev/null || echo "Column ratings_value_for_money already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN ratings_features integer" 2>/dev/null || echo "Column ratings_features already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN ratings_support integer" 2>/dev/null || echo "Column ratings_support already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN expert_verdict text" 2>/dev/null || echo "Column expert_verdict already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN verdict_summary text" 2>/dev/null || echo "Column verdict_summary already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN comparison_notes text" 2>/dev/null || echo "Column comparison_notes already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN meta_title text" 2>/dev/null || echo "Column meta_title already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN meta_description text" 2>/dev/null || echo "Column meta_description already exists"
npx wrangler d1 execute $DB --remote --command "ALTER TABLE tools ADD COLUMN focus_keyword text" 2>/dev/null || echo "Column focus_keyword already exists"

echo "Registering migration..."
npx wrangler d1 execute $DB --remote --command "INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ('20251223_025900_add_tools_extended_fields', 8, datetime('now'), datetime('now'))"

echo "Migration complete!"
