"use client";

import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ChevronDown,
  Save,
  Trash2,
  Clock,
  Search,
  Plus,
  PenLine,
  FileText,
  Star,
  StarOff,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
  category: string;
}

interface NotesComponentProps {
  className?: string;
  initialNotes?: Note[];
}

export default function NotesComponent({
  className,
  initialNotes = [],
}: NotesComponentProps) {
  const [notes, setNotes] = useState<Note[]>(
    initialNotes.length > 0
      ? initialNotes
      : [
          {
            id: "1",
            title: "Welcome to GyanJyoti Notes",
            content:
              "Start taking notes for your studies. Use the formatting tools above to organize your thoughts.",
            createdAt: new Date(),
            updatedAt: new Date(),
            favorite: true,
            category: "General",
          },
        ]
  );

  const [selectedNoteId, setSelectedNoteId] = useState<string>(
    notes[0]?.id || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([
    "General",
    "Study",
    "Personal",
  ]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editableNote, setEditableNote] = useState<Note | null>(null);

  useEffect(() => {
    if (selectedNoteId) {
      const note = notes.find((n) => n.id === selectedNoteId);
      if (note) {
        setEditableNote(note);
      }
    }
  }, [selectedNoteId, notes]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
      category: "General",
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (!editableNote) return;

    setNotes(
      notes.map((note) =>
        note.id === editableNote.id
          ? { ...editableNote, updatedAt: new Date() }
          : note
      )
    );
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(notes[0]?.id || "");
    }
  };

  const handleToggleFavorite = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const formatText = (format: string) => {
    if (!editableNote) return;

    let newContent = editableNote.content;

    switch (format) {
      case "bold":
        newContent += " **bold text** ";
        break;
      case "italic":
        newContent += " *italic text* ";
        break;
      case "list":
        newContent += "\n- List item 1\n- List item 2\n- List item 3";
        break;
      case "ordered-list":
        newContent += "\n1. First item\n2. Second item\n3. Third item";
        break;
      default:
        break;
    }

    setEditableNote({ ...editableNote, content: newContent });
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row h-auto border rounded-lg shadow-lg overflow-hidden bg-white",
        className
      )}
    >
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r flex flex-col bg-gradient-to-b from-[#1e40af]/5 to-white">
        {/* Search and Add */}
        <div className="p-3 border-b">
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search paper and notes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={handleCreateNote}
            className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> New Note
          </Button>
        </div>

        {/* Categories */}
        <div className="p-3 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm">Categories</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveCategory("All")}>
                  All Notes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveCategory("Favorites")}
                >
                  Favorites
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={activeCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("All")}
              className={activeCategory === "All" ? "bg-[#1e40af]" : ""}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "Favorites" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("Favorites")}
              className={activeCategory === "Favorites" ? "bg-[#e91e63]" : ""}
            >
              Favorites
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-[#f0b429]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notes found</div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNoteId(note.id);
                  setIsEditing(false);
                }}
                className={cn(
                  "p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                  selectedNoteId === note.id &&
                    "bg-[#1e40af]/10 border-l-4 border-l-[#1e40af]"
                )}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  {note.favorite && (
                    <Star className="h-4 w-4 text-[#f0b429] flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {note.content}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(note.updatedAt).toLocaleDateString()}
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {note.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
