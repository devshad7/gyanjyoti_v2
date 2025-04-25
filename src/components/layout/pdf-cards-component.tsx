"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, FileText, Download, Eye, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PDF {
  id: string
  title: string
  subject: string
  class: string
  uploadDate: Date
  thumbnail: string
  url: string
  favorite: boolean
  pages: number
  fileSize: string
}

interface PDFCardsComponentProps {
  className?: string
}

export default function PDFCardsComponent({ className }: PDFCardsComponentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSubject, setActiveSubject] = useState<string>("All")
  const [activeClass, setActiveClass] = useState<string>("All")
  const [selectedPDF, setSelectedPDF] = useState<PDF | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Sample data
  const pdfs: PDF[] = [
    {
      id: "1",
      title: "Physics Mechanics Notes",
      subject: "Physics",
      class: "Class 11",
      uploadDate: new Date("2023-10-15"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: true,
      pages: 24,
      fileSize: "2.4 MB",
    },
    {
      id: "2",
      title: "Organic Chemistry Fundamentals",
      subject: "Chemistry",
      class: "Class 12",
      uploadDate: new Date("2023-11-05"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: false,
      pages: 36,
      fileSize: "3.8 MB",
    },
    {
      id: "3",
      title: "Calculus and Integration",
      subject: "Mathematics",
      class: "Class 12",
      uploadDate: new Date("2023-09-22"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: true,
      pages: 42,
      fileSize: "4.1 MB",
    },
    {
      id: "4",
      title: "Cell Biology and Genetics",
      subject: "Biology",
      class: "Class 11",
      uploadDate: new Date("2023-10-30"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: false,
      pages: 28,
      fileSize: "3.2 MB",
    },
    {
      id: "5",
      title: "Modern Indian History",
      subject: "History",
      class: "Class 10",
      uploadDate: new Date("2023-08-15"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: false,
      pages: 32,
      fileSize: "2.9 MB",
    },
    {
      id: "6",
      title: "English Grammar and Composition",
      subject: "English",
      class: "Class 9",
      uploadDate: new Date("2023-07-20"),
      thumbnail: "/placeholder.svg?height=400&width=300",
      url: "/sample.pdf",
      favorite: true,
      pages: 18,
      fileSize: "1.6 MB",
    },
  ]

  // Get unique subjects and classes for filters
  const subjects = Array.from(new Set(pdfs.map((pdf) => pdf.subject)))
  const classes = Array.from(new Set(pdfs.map((pdf) => pdf.class)))

  // Filter PDFs based on search term, subject, and class
  const filteredPDFs = pdfs.filter((pdf) => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = activeSubject === "All" || pdf.subject === activeSubject
    const matchesClass = activeClass === "All" || pdf.class === activeClass
    return matchesSearch && matchesSubject && matchesClass
  })

  const toggleFavorite = (id: string) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for PDF ${id}`)
  }

  const openPDFViewer = (pdf: PDF) => {
    setSelectedPDF(pdf)
    setIsDialogOpen(true)
  }

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

          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={cn("h-8 w-8 p-0", viewMode === "grid" ? "bg-[#f0b429]" : "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={cn("h-8 w-8 p-0", viewMode === "list" ? "bg-[#f0b429]" : "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search PDFs..."
            className="pl-8 h-8 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* PDF Cards */}
      {filteredPDFs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No PDFs Found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPDFs.map((pdf) => (
            <Card
              key={pdf.id}
              className="overflow-hidden hover:shadow-md transition-shadow group border-l-4 h-full flex flex-col"
              style={{
                borderLeftColor:
                  pdf.subject === "Physics"
                    ? "#1e40af"
                    : pdf.subject === "Chemistry"
                      ? "#059669"
                      : pdf.subject === "Mathematics"
                        ? "#7c3aed"
                        : pdf.subject === "Biology"
                          ? "#10b981"
                          : pdf.subject === "History"
                            ? "#f59e0b"
                            : pdf.subject === "English"
                              ? "#e91e63"
                              : "#64748b",
              }}
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img src={pdf.thumbnail || "/placeholder.svg"} alt={pdf.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleFavorite(pdf.id)}
                  className="absolute top-2 right-2 h-7 w-7 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  {pdf.favorite ? (
                    <Star className="h-3.5 w-3.5 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-3.5 w-3.5 text-gray-400" />
                  )}
                </button>
              </div>
              <CardHeader className="p-3 pb-1">
                <h3 className="font-medium text-sm line-clamp-2">{pdf.title}</h3>
              </CardHeader>
              <CardContent className="p-3 pt-0 pb-1 flex-grow">
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="text-xs bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30">
                    {pdf.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[#e91e63]/10 text-[#e91e63] border-[#e91e63]/30">
                    {pdf.class}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-1 text-xs text-gray-500 flex justify-between items-center border-t bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  {pdf.pages} pg
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openPDFViewer(pdf)}
                  className="h-7 px-2 text-[#1e40af]"
                >
                  <Eye className="h-3 w-3 mr-1" /> View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPDFs.map((pdf) => (
            <Card
              key={pdf.id}
              className="overflow-hidden hover:shadow-sm transition-shadow border-l-4"
              style={{
                borderLeftColor:
                  pdf.subject === "Physics"
                    ? "#1e40af"
                    : pdf.subject === "Chemistry"
                      ? "#059669"
                      : pdf.subject === "Mathematics"
                        ? "#7c3aed"
                        : pdf.subject === "Biology"
                          ? "#10b981"
                          : pdf.subject === "History"
                            ? "#f59e0b"
                            : pdf.subject === "English"
                              ? "#e91e63"
                              : "#64748b",
              }}
            >
              <div className="flex flex-row">
                <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                  <img
                    src={pdf.thumbnail || "/placeholder.svg"}
                    alt={pdf.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm line-clamp-1">{pdf.title}</h3>
                    <button onClick={() => toggleFavorite(pdf.id)}>
                      {pdf.favorite ? (
                        <Star className="h-4 w-4 text-[#f0b429] fill-[#f0b429]" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="outline" className="text-xs bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30">
                      {pdf.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-[#e91e63]/10 text-[#e91e63] border-[#e91e63]/30">
                      {pdf.class}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {pdf.pages} pages
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openPDFViewer(pdf)}
                      className="h-7 px-2 bg-[#1e40af] hover:bg-[#1e40af]/90"
                    >
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* PDF Viewer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span className="text-lg font-medium">{selectedPDF?.title}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#1e40af] text-[#1e40af]" asChild>
                  <a href={selectedPDF?.url} download>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </a>
                </Button>
                <button onClick={() => toggleFavorite(selectedPDF?.id || "")}>
                  {selectedPDF?.favorite ? (
                    <Star className="h-5 w-5 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="bg-gray-100 rounded-md p-2 h-[70vh] flex items-center justify-center">
            <div className="bg-white shadow-lg w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="h-12 w-12 mx-auto text-[#1e40af] mb-4" />
                <h3 className="text-xl font-bold mb-4">PDF Viewer</h3>
                <p className="text-gray-600 mb-4">
                  In a real implementation, the PDF would be displayed here using a PDF viewer library.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button className="bg-[#1e40af] hover:bg-[#1e40af]/90" asChild>
                    <a href={selectedPDF?.url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" /> Open in New Tab
                    </a>
                  </Button>
                  <Button variant="outline" className="border-[#1e40af] text-[#1e40af]" asChild>
                    <a href={selectedPDF?.url} download>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </a>
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Subject: {selectedPDF?.subject} | Class: {selectedPDF?.class}
                  </p>
                  <p>
                    Pages: {selectedPDF?.pages} | Size: {selectedPDF?.fileSize}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

