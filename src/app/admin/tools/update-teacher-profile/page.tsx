"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function UpdateTeacherProfileTool() {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [id, setId] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (!url) return setMessage('Profile URL is required')
    if (!slug && !id) return setMessage('Provide slug or _id')

    setLoading(true)
    try {
      const res = await fetch('/api/admin/update-teacher-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug || undefined, _id: id || undefined, profileUrl: url }),
      })
      const data = await res.json()
      if (data.success) {
        setMessage(`Updated: matched=${data.matchedCount} modified=${data.modifiedCount}`)
        // Optionally navigate back to admin
        // router.push('/admin')
      } else {
        setMessage(data.error || 'Failed to update')
      }
    } catch (err) {
      console.error(err)
      setMessage('Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Update Teacher Profile Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Course Slug (preferred)</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="fullstack-web-developement-course-mern" />
          </div>
          <div>
            <Label>Or Course _id</Label>
            <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="mongodb _id (optional)" />
          </div>
          <div>
            <Label>New Profile Image URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://res.cloudinary.com/...jpg" />
          </div>
          {message && <div className="text-sm text-gray-700">{message}</div>}
          <div className="flex space-x-2">
            <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</Button>
            <Button type="button" variant="outline" onClick={() => { setSlug(''); setId(''); setUrl(''); setMessage(null) }}>Clear</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
