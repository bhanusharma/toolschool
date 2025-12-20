import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251219_192426 from './20251219_192426';
import * as migration_20251220_014139_add_taxonomy_fields from './20251220_014139_add_taxonomy_fields';
import * as migration_20251220_192500_rename_makers_to_builders from './20251220_192500_rename_makers_to_builders';

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
];
