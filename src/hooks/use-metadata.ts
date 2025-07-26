import { useState, useEffect } from "react"

export interface UseMetadataReturn {
  subjects: string[]
  classes: string[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMetadata(): UseMetadataReturn {
  const [subjects, setSubjects] = useState<string[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetadata = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [subjectsResponse, classesResponse] = await Promise.all([
        fetch("/api/pdfs/metadata/subjects"),
        fetch("/api/pdfs/metadata/classes")
      ])
      
      if (!subjectsResponse.ok || !classesResponse.ok) {
        throw new Error("Failed to fetch metadata")
      }
      
      const [subjectsData, classesData] = await Promise.all([
        subjectsResponse.json(),
        classesResponse.json()
      ])
      
      setSubjects(subjectsData.subjects || [])
      setClasses(classesData.classes || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metadata")
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchMetadata()
  }

  useEffect(() => {
    fetchMetadata()
  }, [])

  return {
    subjects,
    classes,
    loading,
    error,
    refetch
  }
}
