import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

/**
 * Update existing Cloudinary resources to have public access
 * Run this once to fix existing PDFs
 */
export async function updateExistingPDFsAccess() {
  try {
    // Get all resources in the pdfs folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'raw',
      prefix: 'pdfs/', // Adjust if your folder name is different
      max_results: 100
    })

    console.log(`Found ${result.resources.length} PDF resources`)

    // Update each resource to have anonymous access
    for (const resource of result.resources) {
      try {
        await cloudinary.api.update(resource.public_id, {
          resource_type: 'raw',
          access_control: { access_type: 'anonymous' }
        })
        console.log(`✅ Updated ${resource.public_id}`)
      } catch (error) {
        console.error(`❌ Failed to update ${resource.public_id}:`, error)
      }
    }

    console.log('🎉 All PDF access control updates completed!')
    return { success: true, updated: result.resources.length }
  } catch (error) {
    console.error('Error updating PDF access:', error)
    return { success: false, error }
  }
}

// Example usage (you can run this once to fix existing files):
// updateExistingPDFsAccess().then(result => console.log(result))
