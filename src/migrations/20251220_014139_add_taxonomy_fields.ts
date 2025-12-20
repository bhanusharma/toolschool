import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`creation_types_example_prompts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`prompt\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`creation_types\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`creation_types_example_prompts_order_idx\` ON \`creation_types_example_prompts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`creation_types_example_prompts_parent_id_idx\` ON \`creation_types_example_prompts\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`creation_types\` ADD \`stats_tool_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`creation_types\` ADD \`stats_project_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`creation_types\` ADD \`order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`user_situations\` ADD \`order\` numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`creation_types_example_prompts\`;`)
  await db.run(sql`ALTER TABLE \`creation_types\` DROP COLUMN \`stats_tool_count\`;`)
  await db.run(sql`ALTER TABLE \`creation_types\` DROP COLUMN \`stats_project_count\`;`)
  await db.run(sql`ALTER TABLE \`creation_types\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`user_situations\` DROP COLUMN \`order\`;`)
}
