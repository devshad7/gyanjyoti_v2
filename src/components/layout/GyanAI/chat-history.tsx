"use client"

import { useChatStore } from "@/lib/chat-store"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Search, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface ChatHistoryProps {
  onSelectChat: () => void
}

export function ChatHistory({ onSelectChat }: ChatHistoryProps) {
  const { chatSessions, currentSessionId, startNewChat, switchChat, deleteChat } = useChatStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isRenaming, setIsRenaming] = useState(false)
  const [chatToRename, setChatToRename] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null)

  const filteredSessions = Object.entries(chatSessions)
    .filter(([id, session]) => {
      if (!searchTerm) return true
      return session.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort(([, a], [, b]) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())

  const handleNewChat = () => {
    startNewChat()
    onSelectChat()
  }

  const handleSelectChat = (id: string) => {
    switchChat(id)
    onSelectChat()
  }

  const handleRenameChat = (id: string, currentTitle: string) => {
    setChatToRename(id)
    setNewTitle(currentTitle)
    setIsRenaming(true)
    setMenuOpenFor(null)
  }

  const handleSaveRename = () => {
    if (chatToRename && newTitle.trim()) {
      useChatStore.setState((state) => ({
        chatSessions: {
          ...state.chatSessions,
          [chatToRename]: {
            ...state.chatSessions[chatToRename],
            title: newTitle.trim(),
          },
        },
      }))
      setIsRenaming(false)
      setChatToRename(null)
      setNewTitle("")
    }
  }

  const toggleMenu = (id: string) => {
    setMenuOpenFor(menuOpenFor === id ? null : id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> New Chat
        </Button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {filteredSessions.length > 0 ? (
              filteredSessions.map(([id, session]) => (
                <div
                  key={id}
                  className={`flex items-center justify-between rounded-lg ${
                    id === currentSessionId ? "bg-blue-100" : "hover:bg-gray-100"
                  } group relative`}
                >
                  <button
                    className={`flex-1 text-left flex items-start h-auto py-3 px-3 rounded-lg ${
                      id === currentSessionId ? "text-blue-600 font-medium" : "text-black"
                    }`}
                    onClick={() => handleSelectChat(id)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                    <div className="truncate">
                      {session.title || "New Conversation"}
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(session.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </button>

                  <button
                    className="h-8 w-8 p-0 mr-1 flex items-center justify-center text-gray-600 hover:text-black"
                    onClick={() => toggleMenu(id)}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </button>

                  {menuOpenFor === id && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-40 bg-gray-900 text-white rounded-md shadow-lg border border-gray-800 overflow-hidden">
                      <button
                        className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-800"
                        onClick={() => handleRenameChat(id, session.title)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Rename</span>
                      </button>
                      <button
                        className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-gray-800"
                        onClick={() => {
                          deleteChat(id)
                          setMenuOpenFor(null)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">No conversations found</div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Rename Dialog */}
      {isRenaming && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Rename conversation</h3>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter a new name"
              className="w-full mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsRenaming(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSaveRename}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
