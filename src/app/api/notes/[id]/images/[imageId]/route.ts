import { NextRequest, NextResponse } from 'next/server'
import { SupabaseNotesService } from '@/lib/supabase-notes-service'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const note = await SupabaseNotesService.removeImageFromNote(params.id, params.imageId)

    return NextResponse.json({
      success: true,
      data: note
    })
  } catch (error) {
    console.error('API Error - DELETE /notes/[id]/images/[imageId]:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove image'
      },
      { status: 500 }
    )
  }
}
