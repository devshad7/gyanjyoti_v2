import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'
import { NoteFilters } from '@/types/note'

// NOTE: Admin Basic Auth removed to allow public access to admin APIs.

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: NoteFilters = {
      subject: searchParams.get('subject') || undefined,
      class: searchParams.get('class') || undefined,
      favorite: searchParams.get('favorite') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
      limit: parseInt(searchParams.get('limit') || '12'),
      offset: parseInt(searchParams.get('offset') || '0')
    }

    const result = await SupabaseNotesService.getAllNotes(filters)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('API Error - GET /notes:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch notes'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // previously required admin auth; now public
  try {
    // Check Content-Length header for file size validation
    const contentLength = request.headers.get('content-length')
    const maxSize = 25 * 1024 * 1024 // 25MB limit
    
    if (contentLength && parseInt(contentLength) > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request too large. Maximum file size is 25MB total.'
        },
        { status: 413 }
      )
    }

    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const subject = formData.get('subject') as string
    const class_name = formData.get('class') as string
    const tags = formData.get('tags') as string
    const favorite = formData.get('favorite') === 'true'
    const created_by = formData.get('created_by') as string
    
    if (!title || !subject || !class_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, subject, and class are required'
        },
        { status: 400 }
      )
    }

    // Get image files and validate sizes
    const imageFiles: File[] = []
    const imageCaptions: string[] = []
    const maxFileSize = 5 * 1024 * 1024 // 5MB per file
    
    let index = 0
    let totalSize = 0
    
    while (true) {
      const imageFile = formData.get(`image_${index}`) as File
      const imageCaption = formData.get(`caption_${index}`) as string
      
      if (!imageFile) break
      
      // Validate individual file size
      if (imageFile.size > maxFileSize) {
        return NextResponse.json(
          {
            success: false,
            error: `Image ${index + 1} is too large. Maximum 5MB per image.`
          },
          { status: 413 }
        )
      }
      
      totalSize += imageFile.size
      
      // Validate total size
      if (totalSize > maxSize) {
        return NextResponse.json(
          {
            success: false,
            error: 'Total file size too large. Maximum 25MB for all images.'
          },
          { status: 413 }
        )
      }
      
      imageFiles.push(imageFile)
      imageCaptions.push(imageCaption || '')
      index++
    }

    const noteData = {
      title,
      subject,
      class: class_name,
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      favorite,
      created_by: created_by || undefined
    }

    const note = await SupabaseNotesService.createNote(noteData, imageFiles.length > 0 ? imageFiles : undefined)

    return NextResponse.json({
      success: true,
      data: note
    })
  } catch (error) {
    console.error('API Error - POST /notes:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('413') || error.message.includes('too large')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Files too large. Please reduce file sizes and try again.'
          },
          { status: 413 }
        )
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create note'
      },
      { status: 500 }
    )
  }
}
