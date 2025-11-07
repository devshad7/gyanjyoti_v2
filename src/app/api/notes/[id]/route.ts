import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'

function requireAdmin(request: NextRequest): NextResponse | null {
  const adminUser = process.env.ADMIN_USER || ""
  const adminPass = process.env.ADMIN_PASS || ""
  if (!adminUser || !adminPass) return NextResponse.json({ success: false, error: "Admin credentials not configured" }, { status: 503 })
  const header = request.headers.get("authorization") || request.headers.get("Authorization")
  if (!header || !header.startsWith("Basic ")) return new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } })
  const [user, pass] = Buffer.from(header.replace("Basic ", ""), "base64").toString("utf8").split(":")
  if (user !== adminUser || pass !== adminPass) return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } })
  return null
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const note = await SupabaseNotesService.getNoteById(params.id)

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          error: 'Note not found'
        },
        { status: 404 }
      )
    }

    // Increment view count
    await SupabaseNotesService.incrementViewCount(params.id)

    return NextResponse.json({
      success: true,
      data: note
    })
  } catch (error) {
    console.error('API Error - GET /notes/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch note'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authRes = requireAdmin(request)
  if (authRes) return authRes
  try {
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const subject = formData.get('subject') as string
    const class_name = formData.get('class') as string
    const tags = formData.get('tags') as string
    const favorite = formData.get('favorite') === 'true'

    // Get new image files
    const newImageFiles: File[] = []
    let index = 0
    while (true) {
      const imageFile = formData.get(`new_image_${index}`) as File
      if (!imageFile) break
      newImageFiles.push(imageFile)
      index++
    }

    const updateData: Partial<{
      title: string
      subject: string
      class: string
      tags: string[]
      favorite: boolean
    }> = {}
    if (title) updateData.title = title
    if (subject) updateData.subject = subject
    if (class_name) updateData.class = class_name
    if (tags) updateData.tags = tags.split(',').map(tag => tag.trim()).filter(Boolean)
    if (formData.has('favorite')) updateData.favorite = favorite

    const note = await SupabaseNotesService.updateNote(
      params.id,
      updateData,
      newImageFiles.length > 0 ? newImageFiles : undefined
    )

    return NextResponse.json({
      success: true,
      data: note
    })
  } catch (error) {
    console.error('API Error - PUT /notes/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update note'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authRes = requireAdmin(request)
  if (authRes) return authRes
  try {
    await SupabaseNotesService.deleteNote(params.id)

    return NextResponse.json({
      success: true,
      message: 'Note deleted successfully'
    })
  } catch (error) {
    console.error('API Error - DELETE /notes/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete note'
      },
      { status: 500 }
    )
  }
}
