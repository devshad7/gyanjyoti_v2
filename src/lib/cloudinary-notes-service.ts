import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

// Check for required environment variables
const requiredEnvVars = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

// Validate configuration
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('Missing Cloudinary environment variables:', missingVars.map(v => `CLOUDINARY_${v.toUpperCase()}`))
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: requiredEnvVars.cloud_name,
  api_key: requiredEnvVars.api_key,
  api_secret: requiredEnvVars.api_secret,
})

export interface CloudinaryUploadResult {
  url: string
  public_id: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}

export class CloudinaryImageService {
  static async uploadImage(file: File, folder: string = "notes"): Promise<CloudinaryUploadResult> {
    // Check if Cloudinary is configured
    if (missingVars.length > 0) {
      // In development, return a mock result to allow testing
      if (process.env.NODE_ENV === 'development') {
        console.warn('Cloudinary not configured. Using mock image URL for development.')
        return {
          url: '/assets/placeholder.svg', // Use a placeholder image
          public_id: `mock_${Date.now()}_${file.name}`,
          width: 800,
          height: 600,
          format: 'svg',
          bytes: file.size
        }
      }
      throw new Error(`Cloudinary not configured. Missing environment variables: ${missingVars.map(v => `CLOUDINARY_${v.toUpperCase()}`).join(', ')}`)
    }

    try {
      // Convert File to buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
            transformation: [
              { quality: "auto", fetch_format: "auto" },
              { width: 1200, height: 1200, crop: "limit" }
            ],
            public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
          },
          (error, result: UploadApiResponse | undefined) => {
            if (error) {
              reject(new Error(`Cloudinary upload failed: ${error.message}`))
            } else if (!result) {
              reject(new Error('Cloudinary upload failed: No result returned'))
            } else {
              resolve({
                url: result.secure_url,
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes
              })
            }
          }
        ).end(buffer)
      })
    } catch (error) {
      throw new Error(`Image upload failed: ${error}`)
    }
  }

  static async uploadMultipleImages(files: File[], folder: string = "notes"): Promise<CloudinaryUploadResult[]> {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, folder))
      return await Promise.all(uploadPromises)
    } catch (error) {
      throw new Error(`Multiple image upload failed: ${error}`)
    }
  }

  static async deleteImage(publicId: string): Promise<void> {
    // Skip deletion for mock images in development
    if (publicId.startsWith('mock_') && process.env.NODE_ENV === 'development') {
      console.warn('Skipping deletion of mock image in development mode')
      return
    }

    // Check if Cloudinary is configured
    if (missingVars.length > 0) {
      console.warn('Cloudinary not configured. Cannot delete image:', publicId)
      return
    }

    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error)
      throw new Error(`Failed to delete image: ${error}`)
    }
  }

  static async deleteMultipleImages(publicIds: string[]): Promise<void> {
    try {
      const deletePromises = publicIds.map(id => this.deleteImage(id))
      await Promise.all(deletePromises)
    } catch (error) {
      console.error("Error deleting multiple images from Cloudinary:", error)
      throw new Error(`Failed to delete images: ${error}`)
    }
  }

  static getOptimizedUrl(publicId: string, width?: number, height?: number): string {
    if (!publicId) return ''
    
    // Return mock images as-is in development
    if (publicId.startsWith('mock_') || publicId.startsWith('/assets/')) {
      return publicId.startsWith('/') ? publicId : `/assets/${publicId}`
    }

    // Check if Cloudinary is configured
    if (missingVars.length > 0) {
      return '/assets/placeholder.svg'
    }
    
    const transformations = []
    if (width || height) {
      transformations.push(`c_limit,w_${width || 'auto'},h_${height || 'auto'}`)
    }
    transformations.push('q_auto', 'f_auto')
    
    return cloudinary.url(publicId, {
      transformation: transformations
    })
  }

  static getThumbnailUrl(publicId: string, width: number = 300, height: number = 200): string {
    if (!publicId) return ''
    
    // Return mock images as-is in development
    if (publicId.startsWith('mock_') || publicId.startsWith('/assets/')) {
      return publicId.startsWith('/') ? publicId : `/assets/${publicId}`
    }

    // Check if Cloudinary is configured
    if (missingVars.length > 0) {
      return '/assets/placeholder.svg'
    }
    
    return cloudinary.url(publicId, {
      transformation: [
        { width, height, crop: "fill", gravity: "center" },
        { quality: "auto", fetch_format: "auto" }
      ]
    })
  }
}
