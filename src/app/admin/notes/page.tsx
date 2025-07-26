"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  Eye, 
  Star, 
  StarOff,
  MoreHorizontal,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useNotes, useNotesMetadata } from "@/hooks/use-notes"
import AdminNotesForm from "@/components/admin-notes-form"
import { Note } from "@/types/note"

export default function AdminNotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSubject, setActiveSubject] = useState<string>("All")
  const [activeClass, setActiveClass] = useState<string>("All")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    notes,
    loading,
    error,
    total,
    toggleFavorite,
    deleteNote,
    fetchNotes
  } = useNotes()

  const {
    subjects,
    classes,
    loading: metadataLoading
  } = useNotesMetadata()

  // Filter notes based on search and filters
  const handleFilterChange = () => {
    const filters = {
      subject: activeSubject !== "All" ? activeSubject : undefined,
      class: activeClass !== "All" ? activeClass : undefined,
      search: searchTerm || undefined
    }
    fetchNotes(filters)
  }

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  const handleDeleteClick = (note: Note) => {
    setNoteToDelete(note)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return

    setIsDeleting(true)
    try {
      await deleteNote(noteToDelete.id)
      setDeleteDialogOpen(false)
      setNoteToDelete(null)
    } catch (error) {
      console.error('Failed to delete note:', error)
    } finally {
      setIsDeleting(false)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes Management</h1>
          <p className="text-gray-600 mt-1">Manage study notes and materials</p>
        </div>
        <AdminNotesForm />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#1e40af]/10 rounded-full">
                <Eye className="h-4 w-4 text-[#1e40af]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notes</p>
                <p className="text-2xl font-bold">{total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#f0b429]/10 rounded-full">
                <Star className="h-4 w-4 text-[#f0b429]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold">
                  {notes.filter(note => note.favorite).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#e91e63]/10 rounded-full">
                <Filter className="h-4 w-4 text-[#e91e63]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#059669]/10 rounded-full">
                <Filter className="h-4 w-4 text-[#059669]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Classes</p>
                <p className="text-2xl font-bold">{classes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full sm:w-48">
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {activeSubject}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setActiveSubject("All")}>
                    All Subjects
                  </DropdownMenuItem>
                  {!metadataLoading && subjects.map((subject) => (
                    <DropdownMenuItem 
                      key={subject} 
                      onClick={() => setActiveSubject(subject)}
                    >
                      {subject}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full sm:w-48">
              <label className="text-sm font-medium mb-2 block">Class</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {activeClass}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setActiveClass("All")}>
                    All Classes
                  </DropdownMenuItem>
                  {!metadataLoading && classes.map((cls) => (
                    <DropdownMenuItem 
                      key={cls} 
                      onClick={() => setActiveClass(cls)}
                    >
                      {cls}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button onClick={handleFilterChange} className="bg-[#1e40af] hover:bg-[#1e40af]/90">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Notes List ({total} total)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#1e40af]" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No notes found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Favorite</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{note.title}</p>
                          {note.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {note.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {note.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{note.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSubjectColor(note.subject)}>
                          {note.subject}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getClassColor(note.class)}>
                          {note.class}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {note.images.length} image{note.images.length !== 1 ? 's' : ''}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleToggleFavorite(note.id)}
                          className="hover:scale-110 transition-transform"
                        >
                          {note.favorite ? (
                            <Star className="h-4 w-4 text-[#f0b429] fill-[#f0b429]" />
                          ) : (
                            <StarOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(note.created_at).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit Note
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteClick(note)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Note
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete&quot;{noteToDelete?.title}&quot;? This action cannot be undone.
              All associated images will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Note"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
