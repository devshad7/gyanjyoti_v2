import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
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

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      if (thumbnail) {
        uploadFormData.append("thumbnail", thumbnail);
      }
      uploadFormData.append("title", formData.title);
      uploadFormData.append("subject", formData.subject);
      uploadFormData.append("class", formData.class);
      uploadFormData.append("description", formData.description);
      uploadFormData.append("tags", formData.tags);

      const response = await fetch("/api/pdfs", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();

      toast({
        title: "Upload successful",
        description: `PDF "${formData.title}" has been uploaded successfully.`,
      });

      // Reset form
      setFile(null);
      setThumbnail(null);
      setFormData({
        title: "",
        subject: "",
        class: "",
        description: "",
        tags: "",
      });

      // Reset file inputs
      const fileInput = document.getElementById("pdf-file") as HTMLInputElement;
      const thumbnailInput = document.getElementById(
        "thumbnail-file"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      if (thumbnailInput) thumbnailInput.value = "";

      onUploadSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to upload PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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
            <Label htmlFor="thumbnail-file">Thumbnail (Optional)</Label>
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
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science and Technology</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="neplai">Nepali</SelectItem>
                <SelectItem value="social-science">Social Science</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="optional-maths">Optional Maths</SelectItem>
                <SelectItem value="dbms">DBMS</SelectItem>
                <SelectItem value="dsa-c++">DSA & C++</SelectItem>
                <SelectItem value="ddm">DDM</SelectItem>
                <SelectItem value="cherm">CHERM</SelectItem>
                <SelectItem value="fca">FCA</SelectItem>
                <SelectItem value="fes">FES</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="wd">WD</SelectItem>
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
          <Button
            type="submit"
            className="w-full"
            disabled={isUploading || !file}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
