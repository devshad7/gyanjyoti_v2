
import Link from "next/link"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors">
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Gyan Jyoti AI
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-blue-700">Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
