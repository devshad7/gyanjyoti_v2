/**
 * Usage: MONGODB_URI="your-mongo-uri" node scripts/update-teacher-profile.js <filter> <newProfileUrl>
 * Examples:
 * 1) Update by slug:
 *    MONGODB_URI="mongodb+srv://..." node scripts/update-teacher-profile.js '{"slug":"advanced-math"}' 'https://example.com/new.jpg'
 * 2) Update by _id (use double quotes for JSON and ObjectId string):
 *    MONGODB_URI="..." node scripts/update-teacher-profile.js '{"_id":"64f..."}' 'https://example.com/new.jpg'
 */

const { MongoClient, ObjectId } = require('mongodb')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Set MONGODB_URI environment variable (Mongo connection string)')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Usage: MONGODB_URI="..." node scripts/update-teacher-profile.js <filter-json> <newProfileUrl>')
    process.exit(1)
  }

  const filterJson = args[0]
  const newUrl = args[1]

  let filter
  try {
    filter = JSON.parse(filterJson)
  } catch (e) {
    console.error('Invalid JSON for filter:', e.message)
    process.exit(1)
  }

  // If filter includes _id as string, convert to ObjectId
  if (filter._id && typeof filter._id === 'string') {
    try {
      filter._id = new ObjectId(filter._id)
    } catch (e) {
      // leave as-is
    }
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const db = client.db(process.env.MONGODB_DB || 'gyanjyoti')
    const collection = db.collection('courses')

    console.log('Searching for documents with filter:', JSON.stringify(filter))
    const docs = await collection.find(filter).toArray()
    if (docs.length === 0) {
      console.error('No documents matched the provided filter.')
      process.exit(2)
    }

    console.log(`Found ${docs.length} document(s).`)
    docs.forEach((d) => console.log(' -', d._id.toString(), d.title || d.slug || ''))

    const confirm = process.env.AUTO_CONFIRM === '1'
    if (!confirm) {
      console.log('\nTo proceed set AUTO_CONFIRM=1 or run again with that env var.')
      process.exit(0)
    }

    const res = await collection.updateMany(filter, { $set: { 'teacherInfo.profileUrl': newUrl, 'teacherProfileUrl': newUrl } })
    console.log('Modified count:', res.modifiedCount)
  } finally {
    await client.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
