import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, _id, profileUrl } = body

    if (!profileUrl) {
      return NextResponse.json({ success: false, error: 'profileUrl is required' }, { status: 400 })
    }

    if (!slug && !_id) {
      return NextResponse.json({ success: false, error: 'Provide slug or _id to identify course' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'gyanjyoti')
    const collection = db.collection('courses')

    const filter: any = {}
    if (slug) filter.slug = slug
    if (_id) {
      try {
        const { ObjectId } = await import('mongodb')
        filter._id = new ObjectId(_id)
      } catch (e) {
        // fallback to string match
        filter._id = _id
      }
    }

    const update = { $set: { 'teacherInfo.profileUrl': profileUrl, teacherProfileUrl: profileUrl } }
    const res = await collection.updateMany(filter, update)

    return NextResponse.json({ success: true, matchedCount: res.matchedCount, modifiedCount: res.modifiedCount })
  } catch (error) {
    console.error('update-teacher-profile error:', error)
    return NextResponse.json({ success: false, error: (error as Error).message || 'Server error' }, { status: 500 })
  }
}
