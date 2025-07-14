import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { PDF, PDFCreateInput, PDFUpdateInput, PDFFilters, PDFResponse } from "@/types/pdf"

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const PDFS_DIR = path.join(UPLOAD_DIR, 'pdfs')
const THUMBNAILS_DIR = path.join(UPLOAD_DIR, 'thumbnails')

// Simple in-memory database (you can replace with a JSON file or SQLite later)
let pdfsDatabase: PDF[] = []

export class LocalPDFService {
  static async ensureDirectories() {
    try {
      if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true })
      if (!existsSync(PDFS_DIR)) await mkdir(PDFS_DIR, { recursive: true })
      if (!existsSync(THUMBNAILS_DIR)) await mkdir(THUMBNAILS_DIR, { recursive: true })
    } catch (error) {
      console.error('Error creating directories:', error)
    }
  }

  static async uploadFile(file: File, subfolder: string): Promise<string> {
    try {
      await this.ensureDirectories()
      
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const uploadPath = subfolder === 'pdfs' ? PDFS_DIR : THUMBNAILS_DIR
      const filePath = path.join(uploadPath, fileName)
      
      // Convert File to Buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Write file to disk
      await writeFile(filePath, buffer)
      
      // Return public URL
      return `/uploads/${subfolder}/${fileName}`
    } catch (error) {
      throw new Error(`Local upload failed: ${error}`)
    }
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), 'public', filePath)
      if (existsSync(fullPath)) {
        await unlink(fullPath)
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  static getFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  static async createPDF(input: PDFCreateInput): Promise<PDF> {
    try {
      console.log("LocalPDFService.createPDF started:", input.title)

      // Validate file
      if (!input.file || input.file.size === 0) {
        throw new Error("Invalid file provided")
      }

      if (input.file.type !== "application/pdf") {
        throw new Error("File must be a PDF")
      }

      // Upload main PDF file
      const pdfUrl = await this.uploadFile(input.file, 'pdfs')
      console.log("PDF uploaded to:", pdfUrl)
      
      // Upload thumbnail if provided
      let thumbnailUrl = ""
      if (input.thumbnail) {
        thumbnailUrl = await this.uploadFile(input.thumbnail, 'thumbnails')
        console.log("Thumbnail uploaded to:", thumbnailUrl)
      }

      const now = new Date()
      const pdf: PDF = {
        id: Date.now().toString(), // Simple ID generation
        title: input.title,
        subject: input.subject,
        class: input.class,
        description: input.description || "",
        tags: input.tags || [],
        url: pdfUrl,
        thumbnail: thumbnailUrl,
        uploadDate: now,
        updatedAt: now,
        favorite: false,
        pages: 0,
        fileSize: this.getFileSize(input.file.size),
        downloadCount: 0,
        isActive: true,
        createdBy: "admin"
      }

      // Save to "database" (in memory for now)
      pdfsDatabase.push(pdf)
      console.log("PDF saved with ID:", pdf.id)
      
      return pdf
    } catch (error) {
      console.error("Error in LocalPDFService.createPDF:", error)
      throw error
    }
  }

  static async getPDFs(filters: PDFFilters = {}, page: number = 1, pageLimit: number = 12): Promise<PDFResponse> {
    try {
      let filteredPdfs = [...pdfsDatabase]

      // Apply filters
      if (filters.subject && filters.subject !== "All") {
        filteredPdfs = filteredPdfs.filter(pdf => pdf.subject === filters.subject)
      }
      
      if (filters.class && filters.class !== "All") {
        filteredPdfs = filteredPdfs.filter(pdf => pdf.class === filters.class)
      }
      
      if (filters.favoriteOnly) {
        filteredPdfs = filteredPdfs.filter(pdf => pdf.favorite)
      }

      if (filters.isActive !== undefined) {
        filteredPdfs = filteredPdfs.filter(pdf => pdf.isActive === filters.isActive)
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        filteredPdfs = filteredPdfs.filter(pdf => 
          pdf.title.toLowerCase().includes(searchLower) ||
          pdf.description?.toLowerCase().includes(searchLower) ||
          pdf.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }

      // Sort by upload date (newest first)
      filteredPdfs.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())

      // Apply pagination
      const startIndex = (page - 1) * pageLimit
      const endIndex = startIndex + pageLimit
      const paginatedPdfs = filteredPdfs.slice(startIndex, endIndex)

      return {
        pdfs: paginatedPdfs,
        total: filteredPdfs.length,
        page,
        limit: pageLimit,
        hasMore: endIndex < filteredPdfs.length
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error)
      throw new Error("Failed to fetch PDFs")
    }
  }

  static async getPDFById(id: string): Promise<PDF | null> {
    return pdfsDatabase.find(pdf => pdf.id === id) || null
  }

  static async updatePDF(input: PDFUpdateInput): Promise<PDF | null> {
    try {
      const index = pdfsDatabase.findIndex(pdf => pdf.id === input.id)
      if (index === -1) return null

      pdfsDatabase[index] = {
        ...pdfsDatabase[index],
        ...input,
        updatedAt: new Date()
      }

      return pdfsDatabase[index]
    } catch (error) {
      console.error("Error updating PDF:", error)
      throw new Error("Failed to update PDF")
    }
  }

  static async deletePDF(id: string): Promise<boolean> {
    try {
      const pdf = await this.getPDFById(id)
      if (!pdf) return false

      // Delete files
      if (pdf.url) await this.deleteFile(pdf.url)
      if (pdf.thumbnail) await this.deleteFile(pdf.thumbnail)

      // Remove from database
      pdfsDatabase = pdfsDatabase.filter(p => p.id !== id)
      
      return true
    } catch (error) {
      console.error("Error deleting PDF:", error)
      throw new Error("Failed to delete PDF")
    }
  }

  static async toggleFavorite(id: string): Promise<PDF | null> {
    const pdf = await this.getPDFById(id)
    if (!pdf) return null

    return await this.updatePDF({
      id,
      favorite: !pdf.favorite
    })
  }

  static async incrementDownloadCount(id: string): Promise<void> {
    const pdf = await this.getPDFById(id)
    if (pdf) {
      await this.updatePDF({
        id,
        downloadCount: (pdf.downloadCount || 0) + 1
      })
    }
  }

  static async getSubjects(): Promise<string[]> {
    const subjects = new Set(pdfsDatabase.map(pdf => pdf.subject))
    return Array.from(subjects).sort()
  }

  static async getClasses(): Promise<string[]> {
    const classes = new Set(pdfsDatabase.map(pdf => pdf.class))
    return Array.from(classes).sort()
  }
}
