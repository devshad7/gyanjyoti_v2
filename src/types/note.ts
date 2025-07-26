export interface NoteImage {
  id: string
  url: string
  caption?: string
  cloudinary_public_id?: string
}

export interface Note {
  id: string
  title: string
  subject: string
  class: string
  tags: string[]
  images: NoteImage[]
  created_at: Date
  updated_at: Date
  favorite: boolean
  is_active: boolean
  created_by?: string
  view_count: number
}

export interface NoteCreateInput {
  title: string
  subject: string
  class: string
  tags?: string[]
  images?: NoteImage[]
  favorite?: boolean
  created_by?: string
}

export interface NoteUpdateInput {
  title?: string
  subject?: string
  class?: string
  tags?: string[]
  images?: NoteImage[]
  favorite?: boolean
}

export interface NoteFilters {
  subject?: string
  class?: string
  favorite?: boolean
  search?: string
  tags?: string[]
  limit?: number
  offset?: number
}

export interface NoteResponse {
  data: Note[]
  total: number
  page: number
  totalPages: number
}

export interface NoteImageUpload {
  file: File
  caption?: string
}
