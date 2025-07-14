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
      <div className="p-6 border-b border-gray-100">
        <Button
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-[#275cc3] to-[#e20869] hover:from-[#275cc3]/90 hover:to-[#e20869]/90 text-white rounded-xl shadow-lg shadow-[#275cc3]/25 hover:shadow-xl hover:shadow-[#275cc3]/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Chat
        </Button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#275cc3]/30 focus:border-[#275cc3] focus:bg-white transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {filteredSessions.length > 0 ? (
              filteredSessions.map(([id, session]) => (
                <div
                  key={id}
                  className={`flex items-center justify-between rounded-xl transition-all duration-200 ${
                    id === currentSessionId 
                      ? "bg-gradient-to-r from-[#275cc3]/10 to-[#e20869]/10 border border-[#275cc3]/20" 
                      : "hover:bg-gray-50 border border-transparent"
                  } group relative`}
                >
                  <button
                    className={`flex-1 text-left flex items-start h-auto py-4 px-4 rounded-xl transition-all duration-200 ${
                      id === currentSessionId ? "text-[#275cc3] font-medium" : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => handleSelectChat(id)}
                  >
                    <MessageSquare className="mr-3 h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div className="truncate flex-1">
                      <div className="truncate text-sm">
                        {session.title || "New Conversation"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(session.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </button>

                  <button
                    className="h-8 w-8 p-0 mr-2 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg hover:bg-gray-100"
                    onClick={() => toggleMenu(id)}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </button>

                  {menuOpenFor === id && (
                    <div className="absolute right-2 top-full mt-2 z-50 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      <button
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => handleRenameChat(id, session.title)}
                      >
                        <Pencil className="mr-3 h-4 w-4" />
                        <span>Rename</span>
                      </button>
                      <button
                        className="w-full flex items-center px-4 py-3 text-sm text-[#e20869] hover:bg-[#e20869]/10 transition-colors"
                        onClick={() => {
                          deleteChat(id)
                          setMenuOpenFor(null)
                        }}
                      >
                        <Trash2 className="mr-3 h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                No conversations found
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Rename Dialog */}
      {isRenaming && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Rename conversation</h3>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter a new name"
              className="w-full mb-6 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsRenaming(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
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
