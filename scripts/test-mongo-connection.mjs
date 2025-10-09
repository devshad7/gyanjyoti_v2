import fs from 'fs'
import dotenv from 'dotenv'

// prefer .env.local (used by Next.js) but fall back to .env
const dotenvLocal = '.env.local'
if (fs.existsSync(dotenvLocal)) {
  dotenv.config({ path: dotenvLocal })
} else {
  dotenv.config()
}
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI not set in environment')
  process.exit(1)
}

const safeUri = uri.replace(/:\/\/([^:@]+):([^@]+)@/, '://<user>:<pass>@')
console.log('[test] attempting connection to', safeUri)
console.log('[test] node version', process.version)
console.log('[test] openssl', process.versions.openssl)

const client = new MongoClient(uri, { connectTimeoutMS: 10000 })

async function run() {
  try {
    await client.connect()
    console.log('[test] connected successfully')
    await client.db('admin').command({ ping: 1 })
    console.log('[test] ping OK')
  } catch (err) {
    console.error('[test] connection error:')
    console.error(err)
  } finally {
    try { await client.close() } catch (e) {}
    process.exit(0)
  }
}

run()
