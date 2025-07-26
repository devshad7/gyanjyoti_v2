import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'

export async function GET() {
  try {
    const [subjects, classes] = await Promise.all([
      SupabaseNotesService.getUniqueSubjects(),
      SupabaseNotesService.getUniqueClasses()
    ])

    return NextResponse.json({
      success: true,
      data: {
        subjects,
        classes
      }
    })
  } catch (error) {
    console.error('API Error - GET /notes/metadata:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch metadata'
      },
      { status: 500 }
    )
  }
}
