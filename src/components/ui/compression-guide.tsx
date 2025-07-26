"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle, ExternalLink, FileDown, Zap, Shield, Clock } from "lucide-react"

interface CompressionGuideProps {
  className?: string
}

export default function CompressionGuide({ className }: CompressionGuideProps) {
  const [isOpen, setIsOpen] = useState(false)

  const compressionTools = [
    {
      name: "SmallPDF",
      url: "https://smallpdf.com/compress-pdf",
      description: "Easy to use, good compression ratio",
      features: ["Free daily limit", "Good quality", "Fast processing"],
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: "ILovePDF",
      url: "https://www.ilovepdf.com/compress_pdf",
      description: "Multiple compression levels available",
      features: ["Batch processing", "Various levels", "No registration needed"],
      icon: <FileDown className="h-5 w-5" />
    },
    {
      name: "PDF24",
      url: "https://tools.pdf24.org/en/compress-pdf",
      description: "Privacy-focused, processes locally when possible",
      features: ["Privacy focused", "Local processing", "Multiple formats"],
      icon: <Shield className="h-5 w-5" />
    }
  ]

  const compressionTips = [
    "Choose 'High compression' for educational PDFs with lots of text",
    "Use 'Medium compression' if your PDF has important images",
    "Remove unnecessary pages before compressing",
    "Scan quality: Use 150-300 DPI instead of 600+ DPI",
    "Image PDFs compress better than text-heavy PDFs"
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={className}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Compression Help
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            PDF Compression Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Why compress */}
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              <strong>File size limit:</strong> Our free tier supports PDFs up to 10MB. 
              Larger files need compression to upload successfully.
            </AlertDescription>
          </Alert>

          {/* Recommended tools */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Recommended Compression Tools</h3>
            <div className="grid gap-4">
              {compressionTools.map((tool, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600">{tool.icon}</div>
                      <div>
                        <h4 className="font-medium">{tool.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(tool.url, '_blank')}
                      className="shrink-0"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Compression Tips</h3>
            <ul className="space-y-2">
              {compressionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target sizes */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Target File Sizes</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Badge className="bg-green-100 text-green-800 mb-1">Ideal</Badge>
                <p>Under 5MB - Fast upload & viewing</p>
              </div>
              <div>
                <Badge className="bg-yellow-100 text-yellow-800 mb-1">Acceptable</Badge>
                <p>5-10MB - Will work fine</p>
              </div>
            </div>
          </Card>

          {/* Close button */}
          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>
              Got it, thanks!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
