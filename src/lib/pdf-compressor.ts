/**
 * PDF Compression Utility
 * Helps users reduce PDF file sizes for upload
 */

export class PDFCompressor {
  static readonly MAX_FREE_TIER_SIZE = 10 * 1024 * 1024; // 10MB Cloudinary free tier limit
  static readonly RECOMMENDED_SIZE = 5 * 1024 * 1024; // 5MB recommended for better performance

  /**
   * Check if file needs compression
   */
  static needsCompression(file: File): boolean {
    return file.size > this.MAX_FREE_TIER_SIZE;
  }

  /**
   * Get compression recommendations
   */
  static getCompressionAdvice(file: File): {
    needsCompression: boolean;
    currentSizeMB: string;
    maxAllowedMB: string;
    recommendations: string[];
  } {
    const currentSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const maxAllowedMB = (this.MAX_FREE_TIER_SIZE / (1024 * 1024)).toFixed(0);
    
    const recommendations = [
      "Use online PDF compressors like SmallPDF, ILovePDF, or PDF24",
      "Reduce image quality in the PDF if it contains many images", 
      "Remove unnecessary pages or content",
      "Save as PDF with lower quality settings from the original document",
      "Split large PDFs into smaller chapters if appropriate"
    ];

    return {
      needsCompression: this.needsCompression(file),
      currentSizeMB,
      maxAllowedMB,
      recommendations
    };
  }

  /**
   * Generate helpful error message for oversized files
   */
  static getOversizeErrorMessage(file: File): string {
    const advice = this.getCompressionAdvice(file);
    
    return `File size (${advice.currentSizeMB}MB) exceeds the ${advice.maxAllowedMB}MB limit for free Cloudinary uploads. 

Please compress your PDF using:
• Online tools like SmallPDF.com or ILovePDF.com
• Adobe Acrobat's "Reduce File Size" feature
• Print to PDF with lower quality settings

Target size: Under ${advice.maxAllowedMB}MB for best results.`;
  }
}

export default PDFCompressor;
