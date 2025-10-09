import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  resource_type: string
  format: string
  duration?: number
  width?: number
  height?: number
}

export class CloudinaryService {
  // Upload video to Cloudinary
  static async uploadVideo(
    file: Buffer | string,
    options: {
      folder?: string
      public_id?: string
      resource_type?: "video"
    } = {},
  ): Promise<CloudinaryUploadResult> {
    try {
      // Convert Buffer to base64 data URI if needed
      let uploadFile: string
      if (file instanceof Buffer) {
        uploadFile = `data:video/mp4;base64,${file.toString("base64")}`
      } else {
        uploadFile = file as string
      }
      const result = await cloudinary.uploader.upload(uploadFile, {
        resource_type: "video",
        folder: options.folder || "gyanjyoti/videos",
        public_id: options.public_id,
        quality: "auto",
        format: "mp4",
      })

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        resource_type: result.resource_type,
        format: result.format,
        duration: result.duration,
        width: result.width,
        height: result.height,
      }
    } catch (error) {
      console.error("Cloudinary video upload error:", error)
      throw new Error("Failed to upload video to Cloudinary")
    }
  }

  // Upload image to Cloudinary
  static async uploadImage(
    file: Buffer | string,
    options: {
      folder?: string
      public_id?: string
    } = {},
  ): Promise<CloudinaryUploadResult> {
    try {
      // Convert Buffer to base64 data URI if needed
      let uploadFile: string
      if (file instanceof Buffer) {
        uploadFile = `data:image/png;base64,${file.toString("base64")}`
      } else {
        uploadFile = file as string
      }
      const result = await cloudinary.uploader.upload(uploadFile, {
        resource_type: "image",
        folder: options.folder || "gyanjyoti/images",
        public_id: options.public_id,
        // quality: "auto", // optional, can remove if issues persist
      })

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        resource_type: result.resource_type,
        format: result.format,
        width: result.width,
        height: result.height,
      }
    } catch (error) {
      console.error("Cloudinary image upload error:", error)
      throw new Error("Failed to upload image to Cloudinary")
    }
  }

  // Delete resource from Cloudinary
  static async deleteResource(publicId: string, resourceType: "image" | "video" = "image") {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      })
      return result
    } catch (error) {
      console.error("Cloudinary delete error:", error)
      throw new Error("Failed to delete resource from Cloudinary")
    }
  }

  // Generate video thumbnail
  static generateVideoThumbnail(
    publicId: string,
    options: {
      width?: number
      height?: number
      quality?: string
    } = {},
  ) {
    return cloudinary.url(publicId, {
      resource_type: "video",
      format: "jpg",
      width: options.width || 400,
      height: options.height || 300,
      crop: "fill",
      quality: options.quality || "auto",
    })
  }

  // Generate optimized video URL
  static generateVideoUrl(
    publicId: string,
    options: {
      quality?: string
      format?: string
    } = {},
  ) {
    return cloudinary.url(publicId, {
      resource_type: "video",
      quality: options.quality || "auto",
      format: options.format || "mp4",
    })
  }
}

export default CloudinaryService
