"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  PenLine,
  Download,
  Star,
  StarOff,
  Clock,
  Tag,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface NoteImage {
  id: string
  url: string
  caption?: string
}

interface Note {
  id: string
  title: string
  content: string
  subject: string
  class: string
  createdAt: Date
  updatedAt: Date
  favorite: boolean
  tags: string[]
  images: NoteImage[]
}

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const fullScreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isFullScreen])

  // Sample data with images
  const notes: Note[] = [
    {
      id: "1",
      title: "Newton's Laws of Motion",
      content:
        "1. First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n2. Second Law: Force equals mass times acceleration (F = ma).\n\n3. Third Law: For every action, there is an equal and opposite reaction.",
      subject: "Physics",
      class: "Class 11",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-20"),
      favorite: true,
      tags: ["mechanics", "laws", "important"],
      images: [
        {
          id: "img1",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Newton's First Law Illustration",
        },
        {
          id: "img2",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Newton's Second Law Diagram",
        },
        {
          id: "img3",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Newton's Third Law Example",
        },
      ],
    },
    {
      id: "2",
      title: "Organic Chemistry Functional Groups",
      content:
        "Key functional groups in organic chemistry:\n\n- Alcohols (-OH)\n- Aldehydes (-CHO)\n- Ketones (-CO-)\n- Carboxylic acids (-COOH)\n- Esters (-COO-)\n- Amines (-NH2)",
      subject: "Chemistry",
      class: "Class 12",
      createdAt: new Date("2023-11-05"),
      updatedAt: new Date("2023-11-10"),
      favorite: false,
      tags: ["organic", "functional groups"],
      images: [
        {
          id: "img4",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Organic Chemistry Functional Groups Chart",
        },
      ],
    },
    {
      id: "3",
      title: "Integration Formulas",
      content:
        "Important integration formulas:\n\n∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C, n ≠ -1\n∫ 1/x dx = ln|x| + C\n∫ eˣ dx = eˣ + C\n∫ sin(x) dx = -cos(x) + C\n∫ cos(x) dx = sin(x) + C",
      subject: "Mathematics",
      class: "Class 12",
      createdAt: new Date("2023-09-22"),
      updatedAt: new Date("2023-09-25"),
      favorite: true,
      tags: ["calculus", "formulas", "important"],
      images: [
        {
          id: "img5",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Integration Formulas Sheet",
        },
        {
          id: "img6",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Integration Examples",
        },
      ],
    },
    {
      id: "4",
      title: "Cell Structure and Functions",
      content:
        "Cell organelles and their functions:\n\n1. Nucleus: Contains genetic material\n2. Mitochondria: Powerhouse of the cell\n3. Endoplasmic Reticulum: Protein synthesis and transport\n4. Golgi Apparatus: Packaging and secretion\n5. Lysosomes: Digestion and waste removal",
      subject: "Biology",
      class: "Class 11",
      createdAt: new Date("2023-10-30"),
      updatedAt: new Date("2023-11-02"),
      favorite: false,
      tags: ["cell biology", "organelles"],
      images: [
        {
          id: "img7",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Cell Structure Diagram",
        },
        {
          id: "img8",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Mitochondria Electron Microscope Image",
        },
        {
          id: "img9",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Golgi Apparatus Illustration",
        },
      ],
    },
    {
      id: "5",
      title: "Indian Freedom Movement Timeline",
      content:
        "Key events in the Indian Freedom Movement:\n\n1857: First War of Independence\n1885: Formation of Indian National Congress\n1919: Jallianwala Bagh Massacre\n1930: Salt March by Gandhi\n1942: Quit India Movement\n1947: Independence and Partition",
      subject: "History",
      class: "Class 10",
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-08-18"),
      favorite: false,
      tags: ["freedom movement", "timeline"],
      images: [
        {
          id: "img10",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Gandhi's Salt March Photo",
        },
        {
          id: "img11",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Indian Independence Day Celebration",
        },
      ],
    },
    {
      id: "6",
      title: "Parts of Speech",
      content:
        "The eight parts of speech in English:\n\n1. Noun: Person, place, thing, or idea\n2. Pronoun: Replaces a noun\n3. Verb: Action or state\n4. Adjective: Describes a noun\n5. Adverb: Modifies a verb, adjective, or another adverb\n6. Preposition: Shows relationship\n7. Conjunction: Connects words or phrases\n8. Interjection: Expresses emotion",
      subject: "English",
      class: "Class 9",
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2023-07-22"),
      favorite: true,
      tags: ["grammar", "basics"],
      images: [
        {
          id: "img12",
          url: "/placeholder.svg?height=400&width=600",
          caption: "Parts of Speech Chart",
        },
      ],
    },
  ]

  // Get unique subjects and classes for filters
  const subjects = Array.from(new Set(notes.map((note) => note.subject)))
  const classes = Array.from(new Set(notes.map((note) => note.class)))

  // Filter notes based on search term, subject, and class
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = activeSubject === "All" || note.subject === activeSubject
    const matchesClass = activeClass === "All" || note.class === activeClass
    return matchesSearch && matchesSubject && matchesClass
  })

  const toggleFavorite = (id: string) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for note ${id}`)
  }

  const openNoteViewer = (note: Note) => {
    setSelectedNote(note)
    setCurrentImageIndex(0)
    setIsDialogOpen(true)
  }

  const handleDownloadNote = (note: Note) => {
    // In a real app, this would generate a PDF or other format for download
    console.log(`Downloading note: ${note.title}`)
    alert(`Downloading note: ${note.title}`)
  }

  const handleUploadImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // In a real app, this would upload the file to a server
      console.log("File selected:", files[0].name)
      alert(`Image uploaded: ${files[0].name}`)
      // Reset the input
      e.target.value = ""
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
              {subjects.map((subject) => (
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
              {classes.map((cls) => (
                <DropdownMenuItem key={cls} onClick={() => setActiveClass(cls)}>
                  {cls}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="h-8 bg-[#f0b429] hover:bg-[#f0b429]/90 text-white">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> New Note
          </Button>
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
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <PenLine className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Notes Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="overflow-hidden hover:shadow-md transition-shadow border-l-4 h-full flex flex-col"
              style={{
                borderLeftColor:
                  note.subject === "Physics"
                    ? "#1e40af"
                    : note.subject === "Chemistry"
                      ? "#059669"
                      : note.subject === "Mathematics"
                        ? "#7c3aed"
                        : note.subject === "Biology"
                          ? "#10b981"
                          : note.subject === "History"
                            ? "#f59e0b"
                            : note.subject === "English"
                              ? "#e91e63"
                              : "#64748b",
              }}
            >
              {note.images.length > 0 && (
                <div className="relative aspect-[4/3] bg-gray-100">
                  <img
                    src={note.images[0].url || "/placeholder.svg"}
                    alt={note.images[0].caption || note.title}
                    className="w-full h-full object-cover"
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
                <button onClick={() => toggleFavorite(note.id)} className="flex-shrink-0">
                  {note.favorite ? (
                    <Star className="h-4 w-4 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-grow">
                <p className="text-gray-600 line-clamp-3 text-xs whitespace-pre-line">{note.content}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="outline" className="text-xs bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30">
                    {note.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[#f0b429]/10 text-[#f0b429] border-[#f0b429]/30">
                    {note.class}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-1 border-t bg-gray-50 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(note.updatedAt).toLocaleDateString()}
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
                <Button
                  onClick={() => selectedNote && handleDownloadNote(selectedNote)}
                  variant="outline"
                  className="border-[#1e40af] text-[#1e40af]"
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
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

              {/* Thumbnail Navigation */}
              {selectedNote && selectedNote.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 pb-2 mb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {selectedNote.images.map((image, index) => (
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
                  ))}
                </div>
              )}

              {/* Note Content */}
              <div className="bg-white p-3 rounded-md border whitespace-pre-line text-xs text-gray-700 max-h-[200px] overflow-y-auto">
                {selectedNote?.content}
              </div>
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
                    <span>{selectedNote?.updatedAt.toLocaleDateString()}</span>
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
                      setCurrentImageIndex(currentImageIndex + 1)
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
