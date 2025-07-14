import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { PDF, PDFCreateInput, PDFUpdateInput, PDFFilters, PDFResponse } from '@/types/pdf'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// In-memory storage for PDF metadata (in production, use a real database)
const pdfs: PDF[] = []
let nextId = 1

export class CloudinaryPDFService {
  static async uploadFile(file: File, folder: string = "pdfs"): Promise<string> {
    try {
      // Convert File to buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "raw", // For PDF files
            public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
          },
          (error, result: UploadApiResponse | undefined) => {
            if (error) {
              reject(error)
            } else {
              resolve(result?.secure_url || "")
            }
          }
        ).end(buffer)
      })
    } catch (error) {
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
    const id = (nextId++).toString()
    const now = new Date()
    
    // Upload the file to Cloudinary
    const url = await this.uploadFile(input.file, "pdfs")
    
    // Upload thumbnail if provided
    let thumbnailUrl = undefined
    if (input.thumbnail) {
      thumbnailUrl = await this.uploadFile(input.thumbnail, "thumbnails")
    }
    
    const pdf: PDF = {
      id,
      title: input.title,
      description: input.description || '',
      subject: input.subject,
      class: input.class,
      tags: input.tags || [],
      uploadDate: now,
      thumbnail: thumbnailUrl,
      url,
      favorite: false,
      pages: 0, // Will be calculated later
      fileSize: `${(input.file.size / 1024 / 1024).toFixed(2)} MB`,
      downloadCount: 0,
      createdBy: 'admin',
      updatedAt: now,
      isActive: true
    }
    
    pdfs.push(pdf)
    return pdf
  }

  static async getPDFs(filters?: PDFFilters, page = 1, limit = 20): Promise<PDFResponse> {
    let filteredPDFs = [...pdfs]
    
    // Apply filters
    if (filters?.subject) {
      filteredPDFs = filteredPDFs.filter(pdf => 
        pdf.subject.toLowerCase().includes(filters.subject!.toLowerCase())
      )
    }
    
    if (filters?.class) {
      filteredPDFs = filteredPDFs.filter(pdf => pdf.class === filters.class)
    }
    
    if (filters?.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      filteredPDFs = filteredPDFs.filter(pdf =>
        pdf.title.toLowerCase().includes(searchTerm) ||
        (pdf.description && pdf.description.toLowerCase().includes(searchTerm)) ||
        (pdf.tags && pdf.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      )
    }
    
    if (filters?.favoriteOnly) {
      filteredPDFs = filteredPDFs.filter(pdf => pdf.favorite)
    }
    
    if (filters?.isActive !== undefined) {
      filteredPDFs = filteredPDFs.filter(pdf => pdf.isActive === filters.isActive)
    }
    
    // Sort by upload date (newest first)
    filteredPDFs.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPDFs = filteredPDFs.slice(startIndex, endIndex)
    
    return {
      pdfs: paginatedPDFs,
      total: filteredPDFs.length,
      page,
      limit,
      hasMore: endIndex < filteredPDFs.length
    }
  }

  static async getPDFById(id: string): Promise<PDF | null> {
    return pdfs.find(pdf => pdf.id === id) || null
  }

  static async updatePDF(id: string, updates: PDFUpdateInput): Promise<PDF | null> {
    const pdfIndex = pdfs.findIndex(pdf => pdf.id === id)
    
    if (pdfIndex === -1) {
      return null
    }
    
    pdfs[pdfIndex] = {
      ...pdfs[pdfIndex],
      ...updates,
      updatedAt: new Date()
    }
    
    return pdfs[pdfIndex]
  }

  static async deletePDF(id: string): Promise<boolean> {
    const pdfIndex = pdfs.findIndex(pdf => pdf.id === id)
    
    if (pdfIndex === -1) {
      return false
    }
    
    const pdf = pdfs[pdfIndex]
    
    // Extract public_id from Cloudinary URL for deletion
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
    
    pdfs.splice(pdfIndex, 1)
    return true
  }

  static async toggleFavorite(id: string): Promise<PDF | null> {
    const pdfIndex = pdfs.findIndex(pdf => pdf.id === id)
    
    if (pdfIndex === -1) {
      return null
    }
    
    pdfs[pdfIndex].favorite = !pdfs[pdfIndex].favorite
    if (pdfs[pdfIndex].updatedAt) {
      pdfs[pdfIndex].updatedAt = new Date()
    }
    
    return pdfs[pdfIndex]
  }

  static async incrementDownloadCount(id: string): Promise<void> {
    const pdfIndex = pdfs.findIndex(pdf => pdf.id === id)
    
    if (pdfIndex !== -1) {
      if (pdfs[pdfIndex].downloadCount !== undefined) {
        pdfs[pdfIndex].downloadCount!++
      } else {
        pdfs[pdfIndex].downloadCount = 1
      }
      if (pdfs[pdfIndex].updatedAt) {
        pdfs[pdfIndex].updatedAt = new Date()
      }
    }
  }

  static async getClasses(): Promise<string[]> {
    const classes = [...new Set(pdfs.map(pdf => pdf.class))]
    return classes.sort()
  }

  static async getSubjects(): Promise<string[]> {
    const subjects = [...new Set(pdfs.map(pdf => pdf.subject))]
    return subjects.sort()
  }
}
