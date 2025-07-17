import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const note = await SupabaseNotesService.toggleFavorite(params.id)

    return NextResponse.json({
      success: true,
      data: note
    })
  } catch (error) {
    console.error('API Error - POST /notes/[id]/favorite:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to toggle favorite'
      },
      { status: 500 }
    )
  }
}
