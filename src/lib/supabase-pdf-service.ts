import { v2 as cloudinary } from 'cloudinary'
import { supabase } from './supabase'
import { PDF, PDFCreateInput, PDFUpdateInput, PDFFilters, PDFResponse } from '@/types/pdf'
import PDFCompressor from './pdf-compressor'

interface DatabasePDFRow {
  id: string;
  title: string;
  description?: string;
  subject: string;
  class: string;
  tags?: string[];
  upload_date: string;
  thumbnail?: string;
  url: string;
  favorite: boolean;
  pages: number;
  file_size: string;
  download_count?: number;
  created_by?: string;
  updated_at?: string;
  is_active?: boolean;
}

// Configure Cloudinary - Support both URL format and individual env vars
const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  // If CLOUDINARY_URL is set, Cloudinary will auto-configure API key/secret
  ...(process.env.CLOUDINARY_URL ? {} : {
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }),
  secure: true // Always use HTTPS
}

// Validate Cloudinary configuration
if (!cloudinaryConfig.cloud_name) {
  console.error('Cloudinary cloud_name missing:', {
    cloud_name: !!cloudinaryConfig.cloud_name,
    using_url: !!process.env.CLOUDINARY_URL,
    url_preview: process.env.CLOUDINARY_URL?.substring(0, 30) + '...'
  })
  throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is required. Please check your environment variables.')
}

// Additional validation for non-URL format
if (!process.env.CLOUDINARY_URL && (!cloudinaryConfig.api_key || !cloudinaryConfig.api_secret)) {
  console.error('Cloudinary API credentials missing:', {
    api_key: !!cloudinaryConfig.api_key,
    api_secret: !!cloudinaryConfig.api_secret
  })
  throw new Error('CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are required when not using CLOUDINARY_URL.')
}

cloudinary.config(cloudinaryConfig)

// Configure larger upload limits if needed
console.log('Cloudinary initialized with config:', {
  cloud_name: cloudinaryConfig.cloud_name,
  has_api_key: !!(cloudinaryConfig.api_key || process.env.CLOUDINARY_URL),
  has_api_secret: !!(cloudinaryConfig.api_secret || process.env.CLOUDINARY_URL),
  using_url_format: !!process.env.CLOUDINARY_URL
})

export class SupabasePDFService {
  private static validateEnvironment() {
    // During build time, skip validation to avoid build errors
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('Supabase environment variables not available during build')
      return false
    }
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables are not configured properly')
    }
    return true
  }

  static async uploadFile(file: File, folder: string = "pdfs"): Promise<string> {
    if (!this.validateEnvironment()) return Promise.reject(new Error('Environment not ready'))
    try {
      // Check if file exceeds Cloudinary free tier limits
      if (PDFCompressor.needsCompression(file)) {
        throw new Error(PDFCompressor.getOversizeErrorMessage(file));
      }

      // File size validation (keep our 50MB app limit for future upgrades)
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB, but got ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      }

      // Debug: Log file and config info
      console.log('PDF upload validation:', {
        fileName: file.name,
        fileSize: file.size,
        fileSizeMB: (file.size / (1024 * 1024)).toFixed(2) + 'MB',
        maxCloudinaryMB: (PDFCompressor.MAX_FREE_TIER_SIZE / (1024 * 1024)) + 'MB',
        maxAppMB: (MAX_FILE_SIZE / (1024 * 1024)) + 'MB',
        needsCompression: PDFCompressor.needsCompression(file),
        cloud_name: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        cloud_name_value: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.substring(0, 5) + '...'
      })

      // Convert File to buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      return new Promise((resolve, reject) => {
        console.log('Starting Cloudinary upload for file:', {
          name: file.name,
          size: file.size,
          sizeMB: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
        })

        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "raw", // For PDF files
            public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
            access_control: { access_type: 'anonymous' },
            invalidate: true,
            timeout: 120000, // 2 minutes timeout
            // Force allow large files
            overwrite: true,
            notification_url: undefined, // Disable notifications that might interfere
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error)
              // Check if it's a size limit error and provide helpful message
              if (error.message && error.message.includes('File size too large')) {
                const newError = new Error(`File too large for Cloudinary free tier. File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB. Try upgrading your Cloudinary plan or compress the PDF.`)
                reject(newError)
              } else {
                reject(error)
              }
            } else {
              console.log("Cloudinary upload successful:", {
                url: result?.secure_url,
                public_id: result?.public_id,
                bytes: result?.bytes
              })
              resolve(result?.secure_url || "")
            }
          }
        ).end(buffer)
      })
    } catch (error) {
      console.error("Upload file error:", error)
      throw new Error(`Cloudinary upload failed: ${error}`)
    }
  }

  static async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" })
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error)
    }
  }

  static async createPDF(input: PDFCreateInput): Promise<PDF> {
    try {
      // Upload the file to Cloudinary
      const url = await this.uploadFile(input.file, "pdfs")
      
      // Upload thumbnail if provided
      let thumbnailUrl = undefined
      if (input.thumbnail) {
        thumbnailUrl = await this.uploadFile(input.thumbnail, "thumbnails")
      }

      const now = new Date().toISOString()
      
      const { data, error } = await supabase
        .from('pdfs')
        .insert({
          title: input.title,
          description: input.description || null,
          subject: input.subject,
          class: input.class,
          tags: input.tags || null,
          upload_date: now,
          thumbnail: thumbnailUrl || null,
          url,
          favorite: false,
          pages: 0, // Will be calculated later
          file_size: `${(input.file.size / 1024 / 1024).toFixed(2)} MB`,
          download_count: 0,
          created_by: 'admin',
          updated_at: now,
          is_active: true,
          created_at: now
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return SupabasePDFService.mapDatabaseRowToPDF(data as DatabasePDFRow)
    } catch (error) {
      console.error('PDF creation error details:', error)
      
      if (error instanceof Error) {
        throw new Error(`Failed to create PDF: ${error.message}`)
      } else {
        throw new Error(`Failed to create PDF: ${JSON.stringify(error)}`)
      }
    }
  }

  static async getPDFs(filters?: PDFFilters, page = 1, limit = 20): Promise<PDFResponse> {
    try {
      let query = supabase
        .from('pdfs')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('upload_date', { ascending: false })

      // Apply filters
      if (filters?.subject) {
        query = query.ilike('subject', `%${filters.subject}%`)
      }
      
      if (filters?.class) {
        query = query.eq('class', filters.class)
      }
      
      if (filters?.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%, description.ilike.%${filters.searchTerm}%`)
      }
      
      if (filters?.favoriteOnly) {
        query = query.eq('favorite', true)
      }

      if (filters?.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive)
      }

      // Pagination
      const startIndex = (page - 1) * limit
      query = query.range(startIndex, startIndex + limit - 1)

      const { data, error, count } = await query

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      const pdfs = (data || []).map(this.mapDatabaseRowToPDF)
      
      return {
        pdfs,
        total: count || 0,
        page,
        limit,
        hasMore: (count || 0) > startIndex + limit
      }
    } catch (error) {
      throw new Error(`Failed to fetch PDFs: ${error}`)
    }
  }

  static async getPDFById(id: string): Promise<PDF | null> {
    if (!this.validateEnvironment()) return null
    try {
      const { data, error } = await supabase
        .from('pdfs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') { // Row not found
          return null
        }
        throw new Error(`Database error: ${error.message}`)
      }

      return this.mapDatabaseRowToPDF(data)
    } catch (error) {
      console.error('Error fetching PDF by ID:', error)
      return null
    }
  }

  static async updatePDF(id: string, updates: PDFUpdateInput): Promise<PDF | null> {
    try {
      const { data, error } = await supabase
        .from('pdfs')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') { // Row not found
          return null
        }
        throw new Error(`Database error: ${error.message}`)
      }

      return this.mapDatabaseRowToPDF(data)
    } catch (error) {
      console.error('Error updating PDF:', error)
      return null
    }
  }

  static async deletePDF(id: string): Promise<boolean> {
    try {
      // First get the PDF to delete the file from Cloudinary
      const pdf = await this.getPDFById(id)
      
      if (!pdf) {
        return false
      }

      // Delete from database
      const { error } = await supabase
        .from('pdfs')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      // Delete file from Cloudinary
      if (pdf.url) {
        try {
          const urlParts = pdf.url.split('/')
          const publicIdWithExtension = urlParts[urlParts.length - 1]
          const publicId = `pdfs/${publicIdWithExtension.split('.')[0]}`
          await this.deleteFile(publicId)
        } catch (error) {
          console.error("Error deleting file from Cloudinary:", error)
        }
      }

      return true
    } catch (error) {
      console.error('Error deleting PDF:', error)
      return false
    }
  }

  static async toggleFavorite(id: string): Promise<PDF | null> {
    try {
      // First get current favorite status
      const currentPDF = await this.getPDFById(id)
      if (!currentPDF) {
        return null
      }

      const { data, error } = await supabase
        .from('pdfs')
        .update({
          favorite: !currentPDF.favorite,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return this.mapDatabaseRowToPDF(data)
    } catch (error) {
      console.error('Error toggling favorite:', error)
      return null
    }
  }

  static async incrementDownloadCount(id: string): Promise<void> {
    this.validateEnvironment()
    try {
      const { error } = await supabase.rpc('increment_download_count', {
        pdf_id: id
      })

      if (error) {
        // If the RPC doesn't exist, fallback to manual increment
        const currentPDF = await this.getPDFById(id)
        if (currentPDF) {
          await supabase
            .from('pdfs')
            .update({
              download_count: (currentPDF.downloadCount || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
        }
      }
    } catch (error) {
      console.error('Error incrementing download count:', error)
    }
  }

  static async getClasses(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('pdfs')
        .select('class')
        .eq('is_active', true)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      const classes = [...new Set((data || []).map((row: { class: any; }) => row.class as string))] as string[]
      return classes.sort()
    } catch (error) {
      console.error('Error fetching classes:', error)
      return []
    }
  }

  static async getSubjects(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('pdfs')
        .select('subject')
        .eq('is_active', true)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      const subjects = [...new Set((data || []).map((row: { subject: any; }) => row.subject))] as string[]
      return subjects.sort()
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return []
    }
  }

  static generateSignedUrl(publicId: string): string {
    try {
      // Generate a signed URL that's valid for 1 hour
      const signedUrl = cloudinary.utils.url(publicId, {
        resource_type: "raw",
        sign_url: true,
        type: "upload"
      })
      return signedUrl
    } catch (error) {
      console.error("Error generating signed URL:", error)
      return ""
    }
  }

  static extractPublicIdFromUrl(url: string): string {
    // Extract public_id from Cloudinary URL
    const match = url.match(/\/upload\/v\d+\/(.+)/)
    return match ? match[1] : ""
  }
  
  // Helper method to map database row to PDF interface
  private static mapDatabaseRowToPDF(row: DatabasePDFRow): PDF {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      subject: row.subject,
      class: row.class,
      tags: row.tags || [],
      uploadDate: new Date(row.upload_date),
      thumbnail: row.thumbnail,
      url: row.url,
      favorite: row.favorite,
      pages: row.pages,
      fileSize: row.file_size,
      downloadCount: row.download_count,
      createdBy: row.created_by,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
      isActive: row.is_active
    }
  }
}
