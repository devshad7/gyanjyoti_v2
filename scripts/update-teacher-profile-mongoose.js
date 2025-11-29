
const mongoose = require('mongoose')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Set MONGODB_URI environment variable (Mongo connection string)')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Usage: MONGODB_URI="..." node scripts/update-teacher-profile-mongoose.js <filter-json> <newProfileUrl>')
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

  // Convert _id if present
  if (filter._id && typeof filter._id === 'string') {
    try {
      filter._id = mongoose.Types.ObjectId(filter._id)
    } catch (e) {
      // ignore
    }
  }

  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined })
  console.log('Connected to MongoDB')

  const courseSchema = new mongoose.Schema({}, { strict: false })
  const Course = mongoose.model('Course', courseSchema, 'courses')

  const docs = await Course.find(filter).lean()
  if (!docs || docs.length === 0) {
    console.error('No documents matched the provided filter.')
    await mongoose.disconnect()
    process.exit(2)
  }

  console.log(`Found ${docs.length} document(s):`)
  docs.forEach((d) => console.log(' -', d._id.toString(), '-', d.slug || d.title || ''))

  const confirm = process.env.AUTO_CONFIRM === '1'
  if (!confirm) {
    console.log('\nTo proceed set AUTO_CONFIRM=1 or run with that env var to apply the change.')
    await mongoose.disconnect()
    process.exit(0)
  }

  const res = await Course.updateMany(filter, { $set: { 'teacherInfo.profileUrl': newUrl, 'teacherProfileUrl': newUrl } })
  console.log('Modified count:', res.modifiedCount)

  await mongoose.disconnect()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
