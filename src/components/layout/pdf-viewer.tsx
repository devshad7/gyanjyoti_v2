"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Search, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface PDFViewerProps {
  pdfUrl: string
  title?: string
  className?: string
}

export default function PDFViewer({ pdfUrl, title = "Document", className }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Simulate PDF loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTotalPages(Math.floor(Math.random() * 20) + 5) // Simulate random page count
    }, 1500)

    return () => clearTimeout(timer)
  }, [pdfUrl])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col rounded-lg overflow-hidden border shadow-lg transition-all duration-300 bg-white",
        isFullscreen ? "fixed inset-0 z-50" : "relative",
        className,
      )}
    >
      {/* Header with title and controls */}
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-[#f0b429] to-[#f6e05e]">
        <h2 className="font-semibold text-lg truncate">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="hover:bg-yellow-400/20">
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-yellow-400/20" asChild>
            <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af]/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(Math.max(1, Number.parseInt(e.target.value) || 1), totalPages))}
              className="w-16 h-8 text-center"
            />
            <span className="text-sm text-gray-500">/ {totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af]/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="border-[#e91e63] text-[#e91e63] hover:bg-[#e91e63]/10"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 2}
            className="border-[#e91e63] text-[#e91e63] hover:bg-[#e91e63]/10"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative flex items-center">
          <Search className="absolute left-2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-8 h-8 w-[150px] md:w-[200px]" />
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <div className="w-16 h-16 border-4 border-t-[#f0b429] border-r-[#1e40af] border-b-[#e91e63] border-l-[#f0b429] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading document...</p>
          </div>
        ) : (
          <div
            className="mx-auto bg-white shadow-lg transition-all duration-300 animate-fade-in"
            style={{
              width: `${8.5 * scale}in`,
              height: `${11 * scale}in`,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            <div className="w-full h-full flex items-center justify-center border">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold mb-4">
                  Page {currentPage} of {totalPages}
                </h3>
                <p className="text-gray-600">PDF content would display here</p>
                <div className="mt-8 flex justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gyan_logo-YiLLfGijHwOQwpUOroIoyogeZAoTil.png"
                    alt="GyanJyoti Logo"
                    className="w-32 h-auto opacity-20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-500">Powered by GyanJyoti</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Zoom:</span>
          <Slider
            value={[scale * 100]}
            min={50}
            max={200}
            step={10}
            className="w-24"
            onValueChange={(value) => setScale(value[0] / 100)}
          />
        </div>
      </div>
    </div>
  )
}
