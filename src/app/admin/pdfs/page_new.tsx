"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Library } from "lucide-react"
import PDFUploadForm from '@/components/PDFUploadForm'


export default function AdminPDFPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUploadSuccess = () => {
    // Trigger refresh of PDF manager
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">PDF Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage educational PDFs</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload PDF
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <PDFUploadForm onUploadSuccess={handleUploadSuccess} />
        </TabsContent>

       
      </Tabs>
    </div>
  )
}
