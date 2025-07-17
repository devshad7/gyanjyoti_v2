import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'
import { NoteFilters } from '@/types/note'

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
  try {
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

    // Get image files
    const imageFiles: File[] = []
    const imageCaptions: string[] = []
    
    let index = 0
    while (true) {
      const imageFile = formData.get(`image_${index}`) as File
      const imageCaption = formData.get(`caption_${index}`) as string
      
      if (!imageFile) break
      
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
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create note'
      },
      { status: 500 }
    )
  }
}
