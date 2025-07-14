import { useState, useEffect, useCallback } from "react"
import { PDF, PDFFilters, PDFResponse } from "@/types/pdf"

export interface UsePDFsOptions {
  initialFilters?: PDFFilters
  autoFetch?: boolean
}

export function usePDFs(options: UsePDFsOptions = {}) {
  const { initialFilters = {}, autoFetch = true } = options
  
  const [pdfs, setPdfs] = useState<PDF[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PDFFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    hasMore: false
  })

  const fetchPDFs = useCallback(async (newFilters?: PDFFilters, page: number = 1) => {
    setLoading(true)
    setError(null)
    
    try {
      const activeFilters = newFilters || filters
      const params = new URLSearchParams()
      
      if (activeFilters.subject) params.append("subject", activeFilters.subject)
      if (activeFilters.class) params.append("class", activeFilters.class)
      if (activeFilters.searchTerm) params.append("search", activeFilters.searchTerm)
      if (activeFilters.favoriteOnly) params.append("favoriteOnly", "true")
      if (activeFilters.isActive !== undefined) params.append("isActive", String(activeFilters.isActive))
      
      params.append("page", String(page))
      params.append("limit", String(pagination.limit))
      
      const response = await fetch(`/api/pdfs?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch PDFs")
      }
      
      const data: PDFResponse = await response.json()
      
      if (page === 1) {
        setPdfs(data.pdfs)
      } else {
        setPdfs(prev => [...prev, ...data.pdfs])
      }
      
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        hasMore: data.hasMore
      })
      
      if (newFilters) {
        setFilters(newFilters)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch PDFs")
    } finally {
      setLoading(false)
    }
  }, [filters, pagination.limit])

  const loadMore = () => {
    if (!loading && pagination.hasMore) {
      fetchPDFs(filters, pagination.page + 1)
    }
  }

  const refetch = () => {
    fetchPDFs(filters, 1)
  }

  const updateFilters = (newFilters: PDFFilters) => {
    fetchPDFs(newFilters, 1)
  }

  const toggleFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/pdfs/${id}/toggle-favorite`, {
        method: "POST"
      })
      
      if (!response.ok) {
        throw new Error("Failed to toggle favorite")
      }
      
      const updatedPdf: PDF = await response.json()
      
      setPdfs(prev => 
        prev.map(pdf => pdf.id === id ? updatedPdf : pdf)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle favorite")
    }
  }

  const downloadPDF = async (id: string) => {
    try {
      const response = await fetch(`/api/pdfs/${id}/download`, {
        method: "POST"
      })
      
      if (!response.ok) {
        throw new Error("Failed to download PDF")
      }
      
      const { url, title } = await response.json()
      
      // Create a download link
      const link = document.createElement("a")
      link.href = url
      link.download = title
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download PDF")
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchPDFs()
    }
  }, [autoFetch, fetchPDFs])

  return {
    pdfs,
    loading,
    error,
    filters,
    pagination,
    fetchPDFs,
    loadMore,
    refetch,
    updateFilters,
    toggleFavorite,
    downloadPDF
  }
}
