import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251219_192426 from './20251219_192426';
import * as migration_20251220_014139_add_taxonomy_fields from './20251220_014139_add_taxonomy_fields';
import * as migration_20251220_192500_rename_makers_to_builders from './20251220_192500_rename_makers_to_builders';
import * as migration_20251220_193300_fix_builders_rels_column from './20251220_193300_fix_builders_rels_column';
import * as migration_20251221_022700_add_tutorials from './20251221_022700_add_tutorials';
import * as migration_20251221_140200_add_search_collection from './20251221_140200_add_search_collection';
import * as migration_20251223_000000_add_logo_url from './20251223_000000_add_logo_url';
import * as migration_20251223_025900_add_tools_extended_fields from './20251223_025900_add_tools_extended_fields';
import * as migration_20251224_011300_add_builders_id_to_locked_docs_rels from './20251224_011300_add_builders_id_to_locked_docs_rels';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251219_192426.up,
    down: migration_20251219_192426.down,
    name: '20251219_192426',
  },
  {
    up: migration_20251220_014139_add_taxonomy_fields.up,
    down: migration_20251220_014139_add_taxonomy_fields.down,
    name: '20251220_014139_add_taxonomy_fields'
  },
  {
    up: migration_20251220_192500_rename_makers_to_builders.up,
    down: migration_20251220_192500_rename_makers_to_builders.down,
    name: '20251220_192500_rename_makers_to_builders'
  },
  {
    up: migration_20251220_193300_fix_builders_rels_column.up,
    down: migration_20251220_193300_fix_builders_rels_column.down,
    name: '20251220_193300_fix_builders_rels_column'
  },
  {
    up: migration_20251221_022700_add_tutorials.up,
    down: migration_20251221_022700_add_tutorials.down,
    name: '20251221_022700_add_tutorials'
  },
  {
    up: migration_20251221_140200_add_search_collection.up,
    down: migration_20251221_140200_add_search_collection.down,
    name: '20251221_140200_add_search_collection'
  },
  {
    up: migration_20251223_000000_add_logo_url.up,
    down: migration_20251223_000000_add_logo_url.down,
    name: '20251223_000000_add_logo_url'
  },
  {
    up: migration_20251223_025900_add_tools_extended_fields.up,
    down: migration_20251223_025900_add_tools_extended_fields.down,
    name: '20251223_025900_add_tools_extended_fields'
  },
  {
    up: migration_20251224_011300_add_builders_id_to_locked_docs_rels.up,
    down: migration_20251224_011300_add_builders_id_to_locked_docs_rels.down,
    name: '20251224_011300_add_builders_id_to_locked_docs_rels'
  },
];
