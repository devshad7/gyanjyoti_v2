"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, Filter, ChevronDown, PenLine, Download, Star, StarOff, Clock, Tag, ImageIcon, ChevronLeft, ChevronRight, X, Maximize2, ZoomIn, ZoomOut, Loader2, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { useNotes, useNotesMetadata } from "@/hooks/use-notes"
import { Note } from "@/types/note"

interface NotesCardsComponentProps {
  className?: string
}

export default function NotesCardsComponent({ className }: NotesCardsComponentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSubject, setActiveSubject] = useState<string>("All")
  const [activeClass, setActiveClass] = useState<string>("All")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const fullScreenRef = useRef<HTMLDivElement>(null)

  // Utility function to safely format dates
  const formatDate = (date: string | Date): string => {
    try {
      if (!date) return 'N/A'
      return date instanceof Date 
        ? date.toLocaleDateString()
        : new Date(date).toLocaleDateString()
    } catch {
      return 'N/A'
    }
  }

  // Use the custom hooks
  const {
    notes,
    loading,
    error,
    toggleFavorite,
    fetchNotes
  } = useNotes()

  const {
    subjects,
    classes,
    loading: metadataLoading,
    error: metadataError
  } = useNotesMetadata()

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(() => ({
    subject: activeSubject !== "All" ? activeSubject : undefined,
    class: activeClass !== "All" ? activeClass : undefined,
    search: searchTerm || undefined,
    favorite: activeSubject === "Favorites" ? true : undefined
  }), [searchTerm, activeSubject, activeClass])

  // Maximum number of thumbnails to show in the dialog
  const MAX_THUMBNAILS_TO_SHOW = 2

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isFullScreen])

  // Filter notes based on search and filters
  useEffect(() => {
    fetchNotes(filters)
  }, [filters, fetchNotes])

  const handleToggleFavorite = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await toggleFavorite(id)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  const openNoteViewer = (note: Note) => {
    setSelectedNote(note)
    setCurrentImageIndex(0)
    setIsDialogOpen(true)
  }

  const handleDownloadNote = (note: Note) => {
    try {
      // Create a simple text file with note details
      const content = `Title: ${note.title}
Subject: ${note.subject}
Class: ${note.class}
Tags: ${note.tags.join(', ')}
Created: ${formatDate(note.created_at)}
Updated: ${formatDate(note.updated_at)}

Images: ${note.images.length} image(s)

Note Details:
- Favorite: ${note.favorite ? 'Yes' : 'No'}
- View Count: ${note.view_count || 0}
${note.images.length > 0 ? '\nImage URLs:\n' + note.images.map((img, idx) => `${idx + 1}. ${img.url}${img.caption ? ` (${img.caption})` : ''}`).join('\n') : ''}
`
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${note.title.replace(/[^a-zA-Z0-9\s]/g, '_').replace(/\s+/g, '_')}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading note:', error)
      alert('Failed to download note. Please try again.')
    }
  }

  const nextImage = () => {
    if (selectedNote && currentImageIndex < selectedNote.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (selectedNote && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const getSubjectColor = (subject: string) => {
    const colors = {
      Physics: "bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30",
      Chemistry: "bg-[#059669]/10 text-[#059669] border-[#059669]/30",
      Mathematics: "bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/30",
      Biology: "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30",
      History: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30",
      English: "bg-[#e91e63]/10 text-[#e91e63] border-[#e91e63]/30",
    }
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getClassColor = (cls: string) => {
    return "bg-[#f0b429]/10 text-[#f0b429] border-[#f0b429]/30"
  }

  const openFullScreen = (imageUrl: string) => {
    setFullScreenImage(imageUrl)
    setIsFullScreen(true)
    setZoomLevel(1)
  }

  const closeFullScreen = () => {
    setIsFullScreen(false)
    setFullScreenImage(null)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  useEffect(() => {
    if (!selectedNote || !isDialogOpen) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      // Minimum swipe distance (px)
      const minSwipeDistance = 50

      if (touchEndX - touchStartX > minSwipeDistance && currentImageIndex > 0) {
        // Swiped right
        setCurrentImageIndex(currentImageIndex - 1)
      } else if (
        touchStartX - touchEndX > minSwipeDistance &&
        selectedNote &&
        currentImageIndex < selectedNote.images.length - 1
      ) {
        // Swiped left
        setCurrentImageIndex(currentImageIndex + 1)
      }
    }

    const carouselElement = document.querySelector(".image-carousel")
    if (carouselElement) {
      carouselElement.addEventListener("touchstart", handleTouchStart as EventListener)
      carouselElement.addEventListener("touchend", handleTouchEnd as EventListener)

      return () => {
        carouselElement.removeEventListener("touchstart", handleTouchStart as EventListener)
        carouselElement.removeEventListener("touchend", handleTouchEnd as EventListener)
      }
    }
  }, [selectedNote, isDialogOpen, currentImageIndex])

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-white p-3 rounded-lg shadow-sm border mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-[#1e40af] text-[#1e40af]">
                <Filter className="h-3.5 w-3.5 mr-1.5" /> Subject
                <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveSubject("All")}>All Subjects</DropdownMenuItem>
              {!metadataLoading && subjects.map((subject) => (
                <DropdownMenuItem key={subject} onClick={() => setActiveSubject(subject)}>
                  {subject}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-[#e91e63] text-[#e91e63]">
                <Filter className="h-3.5 w-3.5 mr-1.5" /> Class
                <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveClass("All")}>All Classes</DropdownMenuItem>
              {!metadataLoading && classes.map((cls) => (
                <DropdownMenuItem key={cls} onClick={() => setActiveClass(cls)}>
                  {cls}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notes..."
            className="pl-8 h-8 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Notes Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#1e40af]" />
          </div>
        ) : error ? (
          <div className="col-span-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : notes.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <PenLine className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Notes Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          notes.map((note: Note) => (
            <Card
              key={note.id}
              className="overflow-hidden hover:shadow-md py-0 gap-2 transition-shadow h-full flex flex-col"
            >
              {note.images.length > 0 && (
                <div className="relative aspect-[3/2] bg-gray-100">
                  <img
                    src={note.images[0]?.url || "/assets/eng.jpeg"}
                    alt={note.images[0]?.caption || note.title}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/assets/eng.jpeg"
                    }}
                  />
                  {note.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-0.5 text-xs flex items-center">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {note.images.length}
                    </div>
                  )}
                </div>
              )}
              <CardHeader className="p-3 pb-1 flex flex-row justify-between items-start">
                <h3 className="font-medium text-sm line-clamp-2">{note.title}</h3>
                <button onClick={(e) => handleToggleFavorite(note.id, e)} className="flex-shrink-0">
                  {note.favorite ? (
                    <Star className="h-4 w-4 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-grow border-b">
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="outline" className="text-xs bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30">
                    {note.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[#f0b429]/10 text-[#f0b429] border-[#f0b429]/30">
                    {note.class}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="px-3 py-3 bg-gray-50 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(note.updated_at)}
                </div>
                <Button
                  size="sm"
                  onClick={() => openNoteViewer(note)}
                  className="h-7 px-2 bg-[#1e40af] hover:bg-[#1e40af]/90 text-xs"
                >
                  <PenLine className="h-3 w-3 mr-1" /> View
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Note Viewer Dialog with Image Carousel */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-3 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedNote?.title}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFavorite(selectedNote?.id || "")}>
                  {selectedNote?.favorite ? (
                    <Star className="h-5 w-5 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-w-0">
              {/* Image Carousel */}
              {selectedNote && selectedNote.images.length > 0 ? (
                <div className="relative mb-4 w-full image-carousel">
                  <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden w-full">
                    <img
                      src={selectedNote.images[currentImageIndex].url || "/placeholder.svg"}
                      alt={selectedNote.images[currentImageIndex].caption || selectedNote.title}
                      className="w-full h-full object-contain cursor-zoom-in"
                      onClick={() => openFullScreen(selectedNote.images[currentImageIndex].url)}
                    />
                  </div>

                  {/* Image Caption */}
                  {selectedNote.images[currentImageIndex].caption && (
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {selectedNote.images[currentImageIndex].caption}
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {selectedNote.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className={cn(
                          "absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1",
                          currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-black/70",
                        )}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={currentImageIndex === selectedNote.images.length - 1}
                        className={cn(
                          "absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1",
                          currentImageIndex === selectedNote.images.length - 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-black/70",
                        )}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedNote.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs rounded-full px-2 py-1">
                      {currentImageIndex + 1} / {selectedNote.images.length}
                    </div>
                  )}

                  {/* Maximize button */}
                  <button
                    onClick={() => openFullScreen(selectedNote.images[currentImageIndex].url)}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              ) : null}

              {/* Thumbnail Navigation - Limited to MAX_THUMBNAILS_TO_SHOW */}
              {selectedNote && selectedNote.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 pb-2 mb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {selectedNote.images.map((image, index) => {
                    // Only show the first MAX_THUMBNAILS_TO_SHOW thumbnails
                    if (index < MAX_THUMBNAILS_TO_SHOW) {
                      return (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 snap-start",
                            currentImageIndex === index ? "border-[#1e40af]" : "border-transparent",
                          )}
                        >
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.caption || `Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      )
                    } else if (index === MAX_THUMBNAILS_TO_SHOW) {
                      // Show a "+X more" button for remaining images
                      const remainingCount = selectedNote.images.length - MAX_THUMBNAILS_TO_SHOW
                      return (
                        <button
                          key="more-images"
                          onClick={() => setCurrentImageIndex(MAX_THUMBNAILS_TO_SHOW)}
                          className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 border-transparent bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700"
                        >
                          +{remainingCount} more
                        </button>
                      )
                    }
                    return null
                  })}
                </div>
              )}
            </div>

            <div className="lg:w-56 space-y-3">
              <div className="bg-gray-50 p-3 rounded-md border">
                <h4 className="font-medium text-xs mb-2 flex items-center">
                  <Tag className="h-3 w-3 mr-1" /> Details
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Subject:</span>
                    <Badge variant="outline" className={selectedNote ? getSubjectColor(selectedNote.subject) : ""}>
                      {selectedNote?.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Class:</span>
                    <Badge variant="outline" className={selectedNote ? getClassColor(selectedNote.class) : ""}>
                      {selectedNote?.class}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Updated:</span>
                    <span>{formatDate(selectedNote?.updated_at ?? "")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Images:</span>
                    <span>{selectedNote?.images.length || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md border">
                <h4 className="font-medium text-xs mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedNote?.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => selectedNote && handleDownloadNote(selectedNote)}
                className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90 text-xs py-1 h-auto"
              >
                <Download className="h-3 w-3 mr-1" /> Download Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Full Screen Image Viewer */}
      {isFullScreen && fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          ref={fullScreenRef}
          onClick={closeFullScreen}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image container with zoom */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
              <img
                src={fullScreenImage || "/placeholder.svg"}
                alt="Full screen view"
                className="max-h-full max-w-full object-contain transition-transform duration-200 ease-in-out"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full p-2">
              <button
                onClick={handleZoomOut}
                className="text-white p-1 hover:bg-black/30 rounded-full"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-5 w-5" />
              </button>

              <button onClick={handleResetZoom} className="text-white px-2 py-1 hover:bg-black/30 rounded-full text-sm">
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={handleZoomIn}
                className="text-white p-1 hover:bg-black/30 rounded-full"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation for multiple images */}
            {selectedNote && selectedNote.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (currentImageIndex > 0) {
                      setCurrentImageIndex(currentImageIndex - 1)
                      setFullScreenImage(selectedNote.images[currentImageIndex - 1].url)
                      setZoomLevel(1)
                    }
                  }}
                  disabled={currentImageIndex === 0}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 ${
                    currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-black/70"
                  }`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedNote && currentImageIndex < selectedNote.images.length - 1) {
                      setCurrentImageIndex(currentImageIndex                      + 1)
                      setFullScreenImage(selectedNote.images[currentImageIndex + 1].url)
                      setZoomLevel(1)
                    }
                  }}
                  disabled={currentImageIndex === selectedNote.images.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 ${
                    currentImageIndex === selectedNote.images.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-black/70"
                  }`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 text-white bg-black/50 rounded-full px-3 py-1 text-sm">
                  {currentImageIndex + 1} / {selectedNote.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

