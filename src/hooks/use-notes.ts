import { useState, useEffect, useCallback } from 'react'
import { Note, NoteFilters, NoteResponse, NoteCreateInput, NoteUpdateInput } from '@/types/note'

interface UseNotesReturn {
  notes: Note[]
  loading: boolean
  error: string | null
  total: number
  page: number
  totalPages: number
  fetchNotes: (filters?: NoteFilters) => Promise<void>
  createNote: (noteData: NoteCreateInput, imageFiles?: File[]) => Promise<Note>
  updateNote: (id: string, noteData: NoteUpdateInput, newImageFiles?: File[]) => Promise<Note>
  deleteNote: (id: string) => Promise<void>
  toggleFavorite: (id: string) => Promise<void>
  removeImage: (noteId: string, imageId: string) => Promise<void>
  refetch: () => Promise<void>
}

export function useNotes(initialFilters?: NoteFilters): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [currentFilters, setCurrentFilters] = useState<NoteFilters>(initialFilters || {})

  const fetchNotes = useCallback(async (filters: NoteFilters = {}) => {
    try {
      setLoading(true)
      setError(null)
      setCurrentFilters(filters)

      const params = new URLSearchParams()
      
      if (filters.subject) params.append('subject', filters.subject)
      if (filters.class) params.append('class', filters.class)
      if (filters.favorite !== undefined) params.append('favorite', filters.favorite.toString())
      if (filters.search) params.append('search', filters.search)
      if (filters.tags && filters.tags.length > 0) params.append('tags', filters.tags.join(','))
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.offset) params.append('offset', filters.offset.toString())

      const response = await fetch(`/api/notes?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch notes')
      }

      const noteResponse: NoteResponse = result.data
      setNotes(noteResponse.data)
      setTotal(noteResponse.total)
      setPage(noteResponse.page)
      setTotalPages(noteResponse.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes')
      console.error('Error fetching notes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createNote = async (noteData: NoteCreateInput, imageFiles?: File[]): Promise<Note> => {
    try {
      setError(null)
      
      const formData = new FormData()
      formData.append('title', noteData.title)
      formData.append('subject', noteData.subject)
      formData.append('class', noteData.class)
      
      if (noteData.tags && noteData.tags.length > 0) {
        formData.append('tags', noteData.tags.join(','))
      }
      
      if (noteData.favorite !== undefined) {
        formData.append('favorite', noteData.favorite.toString())
      }
      
      if (noteData.created_by) {
        formData.append('created_by', noteData.created_by)
      }

      // Add image files
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file, index) => {
          formData.append(`image_${index}`, file)
          if (noteData.images && noteData.images[index]?.caption) {
            formData.append(`caption_${index}`, noteData.images[index].caption || '')
          }
        })
      }

      const response = await fetch('/api/notes', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create note')
      }

      const newNote: Note = result.data
      setNotes(prev => [newNote, ...prev])
      setTotal(prev => prev + 1)

      return newNote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create note'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateNote = async (id: string, noteData: NoteUpdateInput, newImageFiles?: File[]): Promise<Note> => {
    try {
      setError(null)
      
      const formData = new FormData()
      
      if (noteData.title) formData.append('title', noteData.title)
      if (noteData.subject) formData.append('subject', noteData.subject)
      if (noteData.class) formData.append('class', noteData.class)
      if (noteData.tags) formData.append('tags', noteData.tags.join(','))
      if (noteData.favorite !== undefined) formData.append('favorite', noteData.favorite.toString())

      // Add new image files
      if (newImageFiles && newImageFiles.length > 0) {
        newImageFiles.forEach((file, index) => {
          formData.append(`new_image_${index}`, file)
        })
      }

      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        body: formData
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to update note')
      }

      const updatedNote: Note = result.data
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note))

      return updatedNote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update note'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const deleteNote = async (id: string): Promise<void> => {
    try {
      setError(null)
      
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete note')
      }

      setNotes(prev => prev.filter(note => note.id !== id))
      setTotal(prev => prev - 1)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const toggleFavorite = async (id: string): Promise<void> => {
    try {
      setError(null)
      
      const response = await fetch(`/api/notes/${id}/favorite`, {
        method: 'POST'
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to toggle favorite')
      }

      const updatedNote: Note = result.data
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle favorite'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const removeImage = async (noteId: string, imageId: string): Promise<void> => {
    try {
      setError(null)
      
      const response = await fetch(`/api/notes/${noteId}/images/${imageId}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to remove image')
      }

      const updatedNote: Note = result.data
      setNotes(prev => prev.map(note => note.id === noteId ? updatedNote : note))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove image'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const refetch = useCallback(() => fetchNotes(currentFilters), [fetchNotes, currentFilters])

  useEffect(() => {
    fetchNotes(initialFilters || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNotes])

  return {
    notes,
    loading,
    error,
    total,
    page,
    totalPages,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    removeImage,
    refetch
  }
}

export function useNotesMetadata() {
  const [subjects, setSubjects] = useState<string[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/notes/metadata')
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch metadata')
        }

        setSubjects(result.data.subjects)
        setClasses(result.data.classes)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metadata')
        console.error('Error fetching notes metadata:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [])

  return {
    subjects,
    classes,
    loading,
    error
  }
}
