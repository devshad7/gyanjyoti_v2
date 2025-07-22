import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  FileText,
  Download,
  Heart,
  HeartOff,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PDFCompressor from "@/lib/pdf-compressor";

interface PDFUploadFormProps {
  onUploadSuccess?: () => void;
}

export default function PDFUploadForm({ onUploadSuccess }: PDFUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    tags: "",
  });
  const { toast } = useToast();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        // Check file type
        if (selectedFile.type !== "application/pdf") {
          toast({
            title: "Invalid file type",
            description: "Please select a PDF file.",
            variant: "destructive",
          });
          return;
        }

        // Check if file needs compression (Cloudinary free tier limit)
        if (PDFCompressor.needsCompression(selectedFile)) {
          const advice = PDFCompressor.getCompressionAdvice(selectedFile);
          toast({
            title: "File too large for free upload",
            description: `File size is ${advice.currentSizeMB}MB. Maximum is ${advice.maxAllowedMB}MB. Please compress your PDF first.`,
            variant: "destructive",
          });
          // Clear the file input
          e.target.value = "";
          return;
        }

        // File is valid
        setFile(selectedFile);
        const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
        toast({
          title: "File selected",
          description: `PDF file selected (${fileSizeMB}MB). Ready to upload.`,
        });
      }
    },
    [toast]
  );

  const handleThumbnailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (selectedFile.type.startsWith("image/")) {
          setThumbnail(selectedFile);
        } else {
          toast({
            title: "Invalid file type",
            description: "Please select an image file for thumbnail.",
            variant: "destructive",
          });
        }
      }
    },
    [toast]
  );

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const uploadWithRetry = async (uploadFormData: FormData, controller: AbortController, maxRetries = 2): Promise<Response> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Upload attempt ${attempt + 1}/${maxRetries + 1}`);
        
        const response = await fetch("/api/pdfs", {
          method: "POST",
          body: uploadFormData,
          signal: controller.signal,
        });

        // If we get a response, return it (even if not ok, we'll handle it in the caller)
        return response;

      } catch (error) {
        lastError = error as Error;
        console.warn(`Upload attempt ${attempt + 1} failed:`, error);

        // Don't retry for certain types of errors
        if (error instanceof Error) {
          if (error.name === 'AbortError' || 
              error.message.includes('413') || 
              error.message.includes('File size too large')) {
            throw error; // Don't retry for timeout or file size errors
          }
        }

        // If this isn't the last attempt, wait before retrying
        if (attempt < maxRetries) {
          const retryDelay = Math.min(1000 * Math.pow(2, attempt), 5000); // Exponential backoff, max 5s
          console.log(`Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If we get here, all attempts failed
    throw lastError || new Error('Upload failed after retries');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.subject || !formData.class) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Additional file size check for production environment
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: "File size exceeds 10MB limit. Please compress your PDF and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file); // Changed from "pdf" to "file"
      if (thumbnail) {
        uploadFormData.append("thumbnail", thumbnail);
      }
      uploadFormData.append("title", formData.title);
      uploadFormData.append("subject", formData.subject);
      uploadFormData.append("class", formData.class);
      uploadFormData.append("description", formData.description);
      uploadFormData.append("tags", formData.tags);

      // Create an AbortController for timeout handling
      controller = new AbortController();
      timeoutId = setTimeout(() => {
        if (controller) controller.abort();
      }, 60000); // 60 seconds

      // Simulate upload progress
      progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 90) return prev + Math.random() * 10;
          return prev;
        });
      }, 500);

      // Remove the custom headers that might cause issues
      const response = await uploadWithRetry(uploadFormData, controller);

      // Clean up intervals and timeouts
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        let errorMessage = "Upload failed. Please try again.";
        
        // Handle specific error cases with more detailed messaging
        if (response.status === 413) {
          errorMessage = "File size too large for upload. Please compress your PDF to under 10MB and try again.";
        } else if (response.status === 504 || response.status === 502) {
          errorMessage = "Upload timeout. Please try again with a smaller file or better internet connection.";
        } else if (response.status === 422 || response.status === 400) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || "Invalid file format or missing required fields.";
          } catch {
            errorMessage = "Invalid file. Please check your PDF and try again.";
          }
        } else if (response.status === 500) {
          try {
            const errorData = await response.json();
            // Check for specific server errors
            if (errorData.error?.includes('Cloudinary') || errorData.error?.includes('CLOUDINARY')) {
              errorMessage = "File upload service is temporarily unavailable. Please try again later.";
            } else if (errorData.error?.includes('Supabase') || errorData.error?.includes('Database')) {
              errorMessage = "Database service is temporarily unavailable. Please try again later.";
            } else if (errorData.error?.includes('size too large') || errorData.error?.includes('too large for Cloudinary')) {
              errorMessage = "File size exceeds service limits. Please compress your PDF and try again.";
            } else {
              errorMessage = errorData.error || "Server error occurred. Please try again later.";
            }
          } catch {
            errorMessage = "Server error occurred. Please try again later.";
          }
        } else if (response.status === 503) {
          errorMessage = "Upload service is temporarily unavailable. Please try again later.";
        } else if (response.status === 404) {
          errorMessage = "Upload endpoint not found. Please contact support.";
        } else if (response.status === 408) {
          errorMessage = "Request timeout. Please try again with a smaller file.";
        } else {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || `Server error (${response.status}): ${response.statusText}`;
          } catch {
            errorMessage = `Server error (${response.status}): ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      // Parse the response
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      console.log("Upload result:", result);

      toast({
        title: "Upload successful",
        description: `PDF "${formData.title}" has been uploaded successfully.`,
      });

      // Reset form
      setFile(null);
      setThumbnail(null);
      setUploadProgress(0);
      setRetryCount(0);
      setFormData({
        title: "",
        subject: "",
        class: "",
        description: "",
        tags: "",
      });

      // Reset file inputs safely
      try {
        const fileInput = document.getElementById("pdf-file") as HTMLInputElement;
        const thumbnailInput = document.getElementById("thumbnail-file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        if (thumbnailInput) thumbnailInput.value = "";
      } catch (inputError) {
        console.warn("Error resetting file inputs:", inputError);
      }

      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMessage = "Failed to upload PDF. Please try again.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Upload timeout (60 seconds exceeded). The file may be too large or your connection is slow. Please try again with a smaller file.";
        } else if (error.message.includes("File size too large") || 
                   error.message.includes("Body exceeded") ||
                   error.message.includes("size exceeds")) {
          errorMessage = "File size too large for upload. Please compress your PDF to under 10MB and try again.";
        } else if (error.message.includes("NetworkError") || 
                   error.message.includes("Failed to fetch") ||
                   error.message.includes("network")) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.message.includes("Cloudinary") || 
                   error.message.includes("upload service")) {
          errorMessage = "File upload service is temporarily unavailable. Please try again later.";
        } else if (error.message.includes("Supabase") || 
                   error.message.includes("Database")) {
          errorMessage = "Database service is temporarily unavailable. Please try again later.";
        } else if (error.message.includes("timeout") || 
                   error.message.includes("TIMEOUT")) {
          errorMessage = "Upload timeout. Please try again with a smaller file or check your internet connection.";
        } else if (error.message.includes("CORS") || 
                   error.message.includes("Cross-Origin")) {
          errorMessage = "Security error. Please refresh the page and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // Clean up in finally block to ensure it always runs
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
      setRetryCount(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    const fileInput = document.getElementById("pdf-file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    const thumbnailInput = document.getElementById(
      "thumbnail-file"
    ) as HTMLInputElement;
    if (thumbnailInput) thumbnailInput.value = "";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload PDF
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="pdf-file">PDF File *</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              Maximum file size: 10MB (Cloudinary free tier limit)
            </p>

            {/* Compression help */}
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-xs text-yellow-800">
                  <p className="font-medium mb-1">Large PDF?</p>
                  <p>
                    Compress your PDF using online tools like{" "}
                    <a
                      href="https://smallpdf.com/compress-pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      SmallPDF
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://www.ilovepdf.com/compress-pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      ILovePDF
                    </a>{" "}
                    to reduce file size below 10MB.
                  </p>
                </div>
              </div>
            </div>
            {file && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                  <Badge variant="secondary">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail-file">Thumbnail *</Label>
            <Input
              id="thumbnail-file"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              disabled={isUploading}
            />
            {thumbnail && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail preview"
                    className="h-8 w-8 object-cover rounded"
                  />
                  <span className="text-sm">{thumbnail.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeThumbnail}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter PDF title"
              disabled={isUploading}
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
              disabled={isUploading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science and Technology</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Nepali">Nepali</SelectItem>
                <SelectItem value="Social-studies">Social Studies</SelectItem>
                <SelectItem value="Computer-science">Computer Science</SelectItem>
                <SelectItem value="Optional Maths">Optional Maths</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>
                <SelectItem value="Account">Account</SelectItem>
                <SelectItem value="DBMS">DBMS</SelectItem>
                <SelectItem value="DSA & C++">DSA & C++</SelectItem>
                <SelectItem value="DDM">DDM</SelectItem>
                <SelectItem value="CHERM">CHERM</SelectItem>
                <SelectItem value="FCA">FCA</SelectItem>
                <SelectItem value="FES">FES</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="WD">WD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <Label htmlFor="class">Class *</Label>
            <Select
              value={formData.class}
              onValueChange={(value) => handleInputChange("class", value)}
              disabled={isUploading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter PDF description"
              className="w-full p-2 border rounded-md resize-none"
              rows={3}
              disabled={isUploading}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="e.g., exam, notes, practice"
              disabled={isUploading}
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || !file}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Uploading... {Math.round(uploadProgress)}%
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload PDF
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
