import { supabase } from './supabase'
import { Note, NoteCreateInput, NoteUpdateInput, NoteFilters, NoteResponse, NoteImage } from '@/types/note'
import { CloudinaryImageService } from './cloudinary-notes-service'

export class SupabaseNotesService {
  static async getAllNotes(filters: NoteFilters = {}): Promise<NoteResponse> {
    try {
      let query = supabase
        .from('notes')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.subject && filters.subject !== 'All') {
        query = query.eq('subject', filters.subject)
      }

      if (filters.class && filters.class !== 'All') {
        query = query.eq('class', filters.class)
      }

      if (filters.favorite !== undefined) {
        query = query.eq('favorite', filters.favorite)
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%, tags.cs.{${filters.search}}`)
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags)
      }

      // Pagination
      const limit = filters.limit || 12
      const offset = filters.offset || 0
      query = query.range(offset, offset + limit - 1)

      const { data, error, count } = await query

      if (error) {
        throw new Error(`Failed to fetch notes: ${error.message}`)
      }

      const notes: Note[] = (data || []).map(note => ({
        ...note,
        created_at: new Date(note.created_at),
        updated_at: new Date(note.updated_at),
        images: note.images || [],
        tags: note.tags || []
      }))

      const totalPages = Math.ceil((count || 0) / limit)
      const currentPage = Math.floor(offset / limit) + 1

      return {
        data: notes,
        total: count || 0,
        page: currentPage,
        totalPages
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw new Error(`Failed to fetch notes: ${error}`)
    }
  }

  static async getNoteById(id: string): Promise<Note | null> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Note not found
        }
        throw new Error(`Failed to fetch note: ${error.message}`)
      }

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        images: data.images || [],
        tags: data.tags || []
      }
    } catch (error) {
      console.error('Error fetching note by ID:', error)
      throw new Error(`Failed to fetch note: ${error}`)
    }
  }

  static async createNote(noteData: NoteCreateInput, imageFiles?: File[]): Promise<Note> {
    try {
      let images: NoteImage[] = []

      // Upload images to Cloudinary if provided
      if (imageFiles && imageFiles.length > 0) {
        try {
          const uploadResults = await CloudinaryImageService.uploadMultipleImages(imageFiles)
          images = uploadResults.map((result, index) => ({
            id: `img_${Date.now()}_${index}`,
            url: result.url,
            cloudinary_public_id: result.public_id,
            caption: noteData.images?.[index]?.caption || ''
          }))
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          // In development, continue without images if upload fails
          if (process.env.NODE_ENV === 'development') {
            console.warn('Continuing without images in development mode')
            images = []
          } else {
            throw uploadError
          }
        }
      }

      const noteToInsert = {
        title: noteData.title,
        subject: noteData.subject,
        class: noteData.class,
        tags: noteData.tags || [],
        images: images,
        favorite: noteData.favorite || false,
        created_by: noteData.created_by,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('notes')
        .insert(noteToInsert)
        .select()
        .single()

      if (error) {
        // If note creation fails, cleanup uploaded images
        if (images.length > 0) {
          const publicIds = images
            .map(img => img.cloudinary_public_id)
            .filter(Boolean) as string[]
          
          if (publicIds.length > 0) {
            try {
              await CloudinaryImageService.deleteMultipleImages(publicIds)
            } catch (cleanupError) {
              console.error('Failed to cleanup images after note creation failure:', cleanupError)
            }
          }
        }
        throw new Error(`Failed to create note: ${error.message}`)
      }

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        images: data.images || [],
        tags: data.tags || []
      }
    } catch (error) {
      console.error('Error creating note:', error)
      throw new Error(`Failed to create note: ${error}`)
    }
  }

  static async updateNote(id: string, noteData: NoteUpdateInput, newImageFiles?: File[]): Promise<Note> {
    try {
      // Get current note to handle image updates
      const currentNote = await this.getNoteById(id)
      if (!currentNote) {
        throw new Error('Note not found')
      }

      let updatedImages = [...(currentNote.images || [])]

      // Upload new images if provided
      if (newImageFiles && newImageFiles.length > 0) {
        const uploadResults = await CloudinaryImageService.uploadMultipleImages(newImageFiles)
        const newImages: NoteImage[] = uploadResults.map((result, index) => ({
          id: `img_${Date.now()}_${index}`,
          url: result.url,
          cloudinary_public_id: result.public_id,
          caption: noteData.images?.[updatedImages.length + index]?.caption || ''
        }))
        updatedImages = [...updatedImages, ...newImages]
      }

      const updateData = {
        ...noteData,
        images: noteData.images !== undefined ? noteData.images : updatedImages,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('notes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update note: ${error.message}`)
      }

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        images: data.images || [],
        tags: data.tags || []
      }
    } catch (error) {
      console.error('Error updating note:', error)
      throw new Error(`Failed to update note: ${error}`)
    }
  }

  static async deleteNote(id: string): Promise<void> {
    try {
      // Get note to delete associated images
      const note = await this.getNoteById(id)
      if (!note) {
        throw new Error('Note not found')
      }

      // Delete associated images from Cloudinary
      if (note.images && note.images.length > 0) {
        const publicIds = note.images
          .map(img => img.cloudinary_public_id)
          .filter(Boolean) as string[]
        
        if (publicIds.length > 0) {
          try {
            await CloudinaryImageService.deleteMultipleImages(publicIds)
          } catch (imageError) {
            console.error('Failed to delete images from Cloudinary:', imageError)
            // Continue with note deletion even if image deletion fails
          }
        }
      }

      // Soft delete the note
      const { error } = await supabase
        .from('notes')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) {
        throw new Error(`Failed to delete note: ${error.message}`)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      throw new Error(`Failed to delete note: ${error}`)
    }
  }

  static async toggleFavorite(id: string): Promise<Note> {
    try {
      const currentNote = await this.getNoteById(id)
      if (!currentNote) {
        throw new Error('Note not found')
      }

      const { data, error } = await supabase
        .from('notes')
        .update({ 
          favorite: !currentNote.favorite,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to toggle favorite: ${error.message}`)
      }

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        images: data.images || [],
        tags: data.tags || []
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw new Error(`Failed to toggle favorite: ${error}`)
    }
  }

  static async incrementViewCount(id: string): Promise<void> {
    try {
      const { error } = await supabase.rpc('increment_note_view_count', { note_id: id })

      if (error) {
        throw new Error(`Failed to increment view count: ${error.message}`)
      }
    } catch (error) {
      console.error('Error incrementing view count:', error)
      // Don't throw error for view count failures as it's not critical
    }
  }

  static async getUniqueSubjects(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('subject')
        .eq('is_active', true)

      if (error) {
        throw new Error(`Failed to fetch subjects: ${error.message}`)
      }

      const subjects = [...new Set(data?.map(item => item.subject) || [])]
      return subjects.filter(Boolean)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return []
    }
  }

  static async getUniqueClasses(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('class')
        .eq('is_active', true)

      if (error) {
        throw new Error(`Failed to fetch classes: ${error.message}`)
      }

      const classes = [...new Set(data?.map(item => item.class) || [])]
      return classes.filter(Boolean)
    } catch (error) {
      console.error('Error fetching classes:', error)
      return []
    }
  }

  static async removeImageFromNote(noteId: string, imageId: string): Promise<Note> {
    try {
      const note = await this.getNoteById(noteId)
      if (!note) {
        throw new Error('Note not found')
      }

      const imageToRemove = note.images.find(img => img.id === imageId)
      const updatedImages = note.images.filter(img => img.id !== imageId)

      // Delete image from Cloudinary
      if (imageToRemove?.cloudinary_public_id) {
        try {
          await CloudinaryImageService.deleteImage(imageToRemove.cloudinary_public_id)
        } catch (imageError) {
          console.error('Failed to delete image from Cloudinary:', imageError)
          // Continue with note update even if image deletion fails
        }
      }

      const { data, error } = await supabase
        .from('notes')
        .update({ 
          images: updatedImages,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to remove image from note: ${error.message}`)
      }

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        images: data.images || [],
        tags: data.tags || []
      }
    } catch (error) {
      console.error('Error removing image from note:', error)
      throw new Error(`Failed to remove image from note: ${error}`)
    }
  }
}
