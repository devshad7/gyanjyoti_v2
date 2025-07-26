"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Maximize2, Minimize2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PDFViewerProps {
  pdfUrl: string
  title?: string
  className?: string
}

export default function PDFViewer({ pdfUrl, title = "Document", className }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  // Load PDF
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pdfUrl])

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
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
      <div className="flex items-center justify-between p-2 md:p-3 border-b bg-gradient-to-r from-[#f0b429] to-[#f6e05e]">
        <h2 className="font-semibold text-sm md:text-lg truncate max-w-[60%]">{title}</h2>
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="hover:bg-yellow-400/20 h-8 w-8 md:h-10 md:w-10">
            {isFullscreen ? <Minimize2 className="h-4 w-4 md:h-5 md:w-5" /> : <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-yellow-400/20 h-8 w-8 md:h-10 md:w-10" asChild>
            <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 p-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-gray-600 font-medium">PDF Controls:</span>
          <span className="text-xs text-gray-500 hidden sm:block">Use PDF viewer&apos;s built-in navigation</span>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <span className="text-xs md:text-sm text-gray-600">Zoom controls available in PDF viewer</span>
        </div>

        <div className="relative flex items-center">
          <Search className="absolute left-2 h-3 w-3 md:h-4 md:w-4 text-gray-400" />
          <Input 
            placeholder="Search in PDF..." 
            className="pl-7 md:pl-8 h-7 md:h-8 w-[120px] md:w-[150px] lg:w-[200px] text-xs md:text-sm" 
            disabled 
          />
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-2 md:p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] md:h-[500px]">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-t-[#f0b429] border-r-[#1e40af] border-b-[#e91e63] border-l-[#f0b429] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-sm md:text-base">Loading document...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] md:h-[500px]">
            <div className="text-center p-4 md:p-8 max-w-md">
              <div className="text-red-500 text-4xl md:text-6xl mb-4">🔒</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-red-600">Access Restricted</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                This PDF is currently blocked for delivery. Please contact admin to make it publicly accessible.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-4">
                <p className="text-xs md:text-sm text-yellow-800">
                  <strong>Admin Fix:</strong> Go to Cloudinary Media Library → Select this PDF → Change &quot;Blocked for delivery&quot; to &quot;Public&quot;
                </p>
              </div>
              <Button 
                onClick={() => window.open(pdfUrl, '_blank')} 
                className="bg-[#1e40af] hover:bg-[#1e40af]/90 text-sm md:text-base"
                size="sm"
              >
                Try Opening Direct Link
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0 rounded-lg shadow-lg"
              style={{
                minHeight: '400px',
              }}
              title={title}
              loading="lazy"
              onError={() => setError("Failed to load PDF")}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-1 md:p-2 border-t bg-gray-50 flex justify-center items-center">
        <div className="text-xs md:text-sm text-gray-500">Powered by GyanJyoti</div>
      </div>
    </div>
  )
}