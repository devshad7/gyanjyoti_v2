export interface PDF {
  id: string
  title: string
  subject: string
  class: string
  uploadDate: Date
  thumbnail?: string
  url: string
  favorite: boolean
  pages: number
  fileSize: string
  description?: string
  tags?: string[]
  downloadCount?: number
  createdBy?: string
  updatedAt?: Date
  isActive?: boolean
}

export interface PDFCreateInput {
  title: string
  subject: string
  class: string
  description?: string
  tags?: string[]
  file: File
  thumbnail?: File
}

export interface PDFUpdateInput {
  id: string
  title?: string
  subject?: string
  class?: string
  description?: string
  tags?: string[]
  favorite?: boolean
  isActive?: boolean
  downloadCount?: number
}

export interface PDFFilters {
  subject?: string
  class?: string
  searchTerm?: string
  favoriteOnly?: boolean
  isActive?: boolean
}

export interface PDFResponse {
  pdfs: PDF[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
