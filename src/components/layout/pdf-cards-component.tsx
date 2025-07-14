"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, FileText, Download, Eye, Star, StarOff, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { usePDFs } from "@/hooks/use-pdfs"
import { useMetadata } from "@/hooks/use-metadata"
import { PDF } from "@/types/pdf"
import PDFViewer from "./pdf-viewer"

interface PDFCardsComponentProps {
  className?: string
}

export default function PDFCardsComponent({ className }: PDFCardsComponentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSubject, setActiveSubject] = useState<string>("All")
  const [activeClass, setActiveClass] = useState<string>("All")
  const [selectedPDF, setSelectedPDF] = useState<PDF | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isViewerDialogOpen, setIsViewerDialogOpen] = useState(false)

  // Use custom hooks for data management
  const {
    pdfs,
    loading,
    error,
    pagination,
    updateFilters,
    loadMore,
    toggleFavorite: togglePDFFavorite,
    downloadPDF
  } = usePDFs({
    initialFilters: {
      isActive: true
    }
  })

  const { subjects, classes } = useMetadata()

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    updateFilters({
      subject: activeSubject === "All" ? undefined : activeSubject,
      class: activeClass === "All" ? undefined : activeClass,
      searchTerm: value || undefined,
      isActive: true
    })
  }

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject)
    updateFilters({
      subject: subject === "All" ? undefined : subject,
      class: activeClass === "All" ? undefined : activeClass,
      searchTerm: searchTerm || undefined,
      isActive: true
    })
  }

  const handleClassChange = (className: string) => {
    setActiveClass(className)
    updateFilters({
      subject: activeSubject === "All" ? undefined : activeSubject,
      class: className === "All" ? undefined : className,
      searchTerm: searchTerm || undefined,
      isActive: true
    })
  }

  const toggleFavorite = async (id: string) => {
    try {
      await togglePDFFavorite(id)
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  const openPDFViewer = (pdf: PDF) => {
    setSelectedPDF(pdf)
    setIsViewerDialogOpen(true)
  }

  const handleDownload = async (id: string) => {
    try {
      await downloadPDF(id)
    } catch (error) {
      console.error("Failed to download PDF:", error)
    }
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
              <DropdownMenuItem onClick={() => handleSubjectChange("All")}>All Subjects</DropdownMenuItem>
              {subjects.map((subject) => (
                <DropdownMenuItem key={subject} onClick={() => handleSubjectChange(subject)}>
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
              <DropdownMenuItem onClick={() => handleClassChange("All")}>All Classes</DropdownMenuItem>
              {classes.map((cls) => (
                <DropdownMenuItem key={cls} onClick={() => handleClassChange(cls)}>
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
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search PDFs..."
            className="pl-8 h-8 text-sm"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && pdfs.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#1e40af]" />
          <span className="ml-2 text-gray-600">Loading PDFs...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <FileText className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-1">Error Loading PDFs</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* PDF Cards */}
      {!loading && !error && pdfs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No PDFs Found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : !loading && !error && viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {pdfs.map((pdf) => (
            <Card
              key={pdf.id}
              className="overflow-hidden hover:shadow-md transition-shadow py-0 gap-2 h-full flex flex-col"
            >
              <div className="relative aspect-[3/2] bg-gray-100">
                <img 
                  src={pdf.thumbnail || "/assets/eng.jpeg"} 
                  alt={pdf.title} 
                  className="w-full h-full object-cover" 
                />
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
              <CardContent className="p-3 pt-0 flex-grow border-b">
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="text-xs bg-[#1e40af]/10 text-[#1e40af] border-[#1e40af]/30">
                    {pdf.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[#e91e63]/10 text-[#e91e63] border-[#e91e63]/30">
                    {pdf.class}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-1 text-xs text-gray-500 flex justify-between items-center bg-gray-50">
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
      ) : !loading && !error && (
        <div className="space-y-2">
          {pdfs.map((pdf) => (
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

      {/* Load More Button */}
      {!loading && !error && pagination.hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            variant="outline"
            className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af]/10"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Load More PDFs
              </>
            )}
          </Button>
        </div>
      )}

      {/* PDF Viewer Dialog */}
      <Dialog open={isViewerDialogOpen} onOpenChange={setIsViewerDialogOpen}>
        <DialogContent className="max-w-7xl w-[98vw] h-[95vh] md:w-[95vw] md:h-[90vh] p-0">
          <DialogHeader className="p-3 md:p-4 border-b">
            <DialogTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-base md:text-lg font-medium truncate max-w-[60%] sm:max-w-none">
                {selectedPDF?.title}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#1e40af] text-[#1e40af] text-xs md:text-sm"
                  onClick={() => selectedPDF && handleDownload(selectedPDF.id)}
                >
                  <Download className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Download
                </Button>
                <button onClick={() => selectedPDF && toggleFavorite(selectedPDF.id)}>
                  {selectedPDF?.favorite ? (
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-[#f0b429] fill-[#f0b429]" />
                  ) : (
                    <StarOff className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedPDF && (
            <div className="flex-1 p-2 md:p-4 overflow-hidden">
              <PDFViewer 
                pdfUrl={selectedPDF.url} 
                title={selectedPDF.title}
                className="h-full w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
