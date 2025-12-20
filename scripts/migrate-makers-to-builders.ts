/**
 * Migration script to rename makers tables to builders tables
 * This handles the D1 database directly
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

async function migrate() {
  console.log('Starting makers -> builders migration...')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // @ts-ignore - Access the drizzle client directly
  const db = payload.db.drizzle

  try {
    // Step 1: Create new tables by copying data
    console.log('\n📋 Copying data from makers to builders...')

    // The new schema should auto-create the builders tables
    // We just need to copy data from old tables to new

    // Check if old makers table exists
    const tablesResult = await db.run({
      sql: `SELECT name FROM sqlite_master WHERE type='table' AND name='makers'`,
      args: []
    })

    if (tablesResult.rows.length === 0) {
      console.log('No makers table found - might already be migrated or fresh install')
      console.log('Running seed instead...')

      // Import and run the seed
      const { execSync } = await import('child_process')
      execSync('PAYLOAD_SECRET=cfec5543071d9230bae7717a npx tsx scripts/seed-builders.ts', {
        cwd: process.cwd(),
        stdio: 'inherit'
      })
      return
    }

    // Copy makers to builders
    console.log('  - Copying makers table data...')
    await db.run({
      sql: `INSERT INTO builders SELECT * FROM makers`,
      args: []
    })

    // Copy maker_specialties to builder_specialties
    console.log('  - Copying maker_specialties table data...')
    await db.run({
      sql: `INSERT INTO builder_specialties SELECT * FROM maker_specialties`,
      args: []
    })

    // Copy makers_social_links to builders_social_links
    console.log('  - Copying makers_social_links table data...')
    await db.run({
      sql: `INSERT INTO builders_social_links SELECT * FROM makers_social_links`,
      args: []
    })

    // Copy makers_rels to builders_rels
    console.log('  - Copying makers_rels table data...')
    await db.run({
      sql: `INSERT INTO builders_rels SELECT * FROM makers_rels`,
      args: []
    })

    console.log('\n✅ Migration completed successfully!')
    console.log('Note: Old tables (makers, maker_specialties, etc.) still exist.')
    console.log('You can drop them manually after verifying the migration.')

  } catch (error: any) {
    console.error('Migration error:', error.message)

    if (error.message.includes('no such table')) {
      console.log('\nTable does not exist - this might be a fresh install.')
      console.log('Running seed script instead...')

      const { execSync } = await import('child_process')
      execSync('PAYLOAD_SECRET=cfec5543071d9230bae7717a npx tsx scripts/seed-builders.ts', {
        cwd: process.cwd(),
        stdio: 'inherit'
      })
    }
  }

  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
