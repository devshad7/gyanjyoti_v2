"use client"

import { useState, useRef } from "react"
import { 
  Plus, 
  Upload, 
  X, 
  Save, 
  Loader2, 
  ImageIcon, 
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useNotes, useNotesMetadata } from "@/hooks/use-notes"
import { NoteCreateInput } from "@/types/note"

interface AdminNotesFormProps {
  className?: string
}

export default function AdminNotesForm({ className }: AdminNotesFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    tags: "",
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageCaptions, setImageCaptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { createNote } = useNotes()
  const { subjects, classes } = useNotesMetadata()

  // Predefined options
  const predefinedSubjects = [
    "Mathematics", "Science",  "English", "DBMS","DSA & C++", "CHERM","DDM",
    "Nepali", "Social Studies", "Computer Science", "Economics", "Account"
  ]
  
  const predefinedClasses = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "Class 11", "Class 12", "Bachelor", "Master"
  ]

  const allSubjects = [...new Set([...predefinedSubjects, ...subjects])]
  const allClasses = [...new Set([...predefinedClasses, ...classes])]

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Calculate total file size
  const totalFileSize = selectedImages.reduce((total, file) => total + file.size, 0)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length !== files.length) {
      setErrorMessage("Please select only image files")
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }

    // Validate file sizes (5MB per file, 20MB total)
    const maxFileSize = 5 * 1024 * 1024 // 5MB
    const maxTotalSize = 20 * 1024 * 1024 // 20MB
    
    const oversizedFiles = validFiles.filter(file => file.size > maxFileSize)
    if (oversizedFiles.length > 0) {
      setErrorMessage(`File size too large. Maximum 5MB per image. Found ${oversizedFiles.length} oversized file(s).`)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    // Check total size including existing files
    const currentTotalSize = selectedImages.reduce((total, file) => total + file.size, 0)
    const newTotalSize = validFiles.reduce((total, file) => total + file.size, 0)
    
    if (currentTotalSize + newTotalSize > maxTotalSize) {
      setErrorMessage("Total file size too large. Maximum 20MB for all images combined.")
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    // Limit number of images
    const totalImages = selectedImages.length + validFiles.length
    if (totalImages > 10) {
      setErrorMessage("Maximum 10 images allowed")
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }

    setSelectedImages(prev => [...prev, ...validFiles])
    setImageCaptions(prev => [...prev, ...validFiles.map(() => "")])

    // Create preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    // Revoke the preview URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index])
    
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setImageCaptions(prev => prev.filter((_, i) => i !== index))
  }

  const updateImageCaption = (index: number, caption: string) => {
    setImageCaptions(prev => prev.map((c, i) => i === index ? caption : c))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      class: "",
      tags: "",
    })
    setSelectedImages([])
    setImageCaptions([])
    
    // Revoke all preview URLs
    imagePreviews.forEach(url => URL.revokeObjectURL(url))
    setImagePreviews([])
    
    setSubmitStatus('idle')
    setErrorMessage("")
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.subject || !formData.class) {
      setErrorMessage("Please fill in all required fields")
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }

    // In development, allow notes without images for testing
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (selectedImages.length === 0 && !isDevelopment) {
      setErrorMessage("Please upload at least one image")
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage("")

    try {
      const noteData: NoteCreateInput = {
        title: formData.title.trim(),
        subject: formData.subject,
        class: formData.class,
        tags: formData.tags 
          ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
          : [],
        created_by: "admin" // You can get this from auth context
      }

      await createNote(noteData, selectedImages)
      
      setSubmitStatus('success')
      setTimeout(() => {
        resetForm()
        setIsOpen(false)
      }, 2000)

    } catch (error) {
      console.error('Error creating note:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create note')
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn("bg-[#1e40af] hover:bg-[#1e40af]/90", className)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Study Note</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter note title"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange("subject", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {allSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => handleInputChange("class", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClasses.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tags (comma separated)
                </label>
                <Input
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="e.g., important, exam, revision"
                  disabled={isSubmitting}
                />
                {formData.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Images {process.env.NODE_ENV === 'development' ? '(Optional in Development)' : ''}</span>
                {selectedImages.length > 0 && (
                  <span className="text-sm font-normal text-gray-500">
                    {selectedImages.length}/10 files • {formatFileSize(totalFileSize)}/20MB
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="w-full border-dashed border-2 h-20"
                >
                  <Upload className="h-6 w-6 mr-2" />
                  Upload Images (Max 10, 5MB each)
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Maximum 5MB per image, 20MB total. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative border rounded-lg p-2">
                      <div className="aspect-video bg-gray-100 rounded mb-2 relative overflow-hidden">
                        <img
                          src={imagePreviews[index]}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <Input
                        placeholder="Caption (optional)"
                        value={imageCaptions[index]}
                        onChange={(e) => updateImageCaption(index, e.target.value)}
                        className="text-xs"
                        disabled={isSubmitting}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 truncate flex-1">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400 ml-2 flex-shrink-0">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedImages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No images uploaded yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Messages */}
          {submitStatus === 'error' && errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {submitStatus === 'success' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Note created successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1e40af] hover:bg-[#1e40af]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Note
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
