"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

type ChatSession = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  lastUpdated: string
}

type ChatStore = {
  messages: Message[]
  chatSessions: Record<string, ChatSession>
  currentSessionId: string | null
  addMessage: (message: Message) => void
  clearMessages: () => void
  startNewChat: () => void
  switchChat: (sessionId: string) => void
  deleteChat: (sessionId: string) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      chatSessions: {},
      currentSessionId: null,

      addMessage: (message) => {
        set((state) => {
          const currentId = state.currentSessionId

          // If no current session, create one
          if (!currentId) {
            const newId = Date.now().toString()
            const newSession: ChatSession = {
              id: newId,
              title: message.content.slice(0, 30) + (message.content.length > 30 ? "..." : ""),
              messages: [message],
              createdAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            }

            return {
              messages: [message],
              currentSessionId: newId,
              chatSessions: {
                ...state.chatSessions,
                [newId]: newSession,
              },
            }
          }

          // Update existing session
          const updatedMessages = [...state.messages, message]
          const updatedSessions = {
            ...state.chatSessions,
            [currentId]: {
              ...state.chatSessions[currentId],
              messages: updatedMessages,
              lastUpdated: new Date().toISOString(),
              // Update title if this is the first user message
              title:
                state.chatSessions[currentId].messages.length === 0 && message.role === "user"
                  ? message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "")
                  : state.chatSessions[currentId].title,
            },
          }

          return {
            messages: updatedMessages,
            chatSessions: updatedSessions,
          }
        })
      },

      clearMessages: () => {
        set((state) => {
          const currentId = state.currentSessionId
          if (!currentId) return state

          // Create a new session instead of clearing the current one
          const newId = Date.now().toString()
          const newSession: ChatSession = {
            id: newId,
            title: "New Conversation",
            messages: [],
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          }

          return {
            messages: [],
            currentSessionId: newId,
            chatSessions: {
              ...state.chatSessions,
              [newId]: newSession,
            },
          }
        })
      },

      startNewChat: () => {
        const newId = Date.now().toString()
        const newSession: ChatSession = {
          id: newId,
          title: "New Conversation",
          messages: [],
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        }

        set({
          messages: [],
          currentSessionId: newId,
          chatSessions: {
            ...get().chatSessions,
            [newId]: newSession,
          },
        })
      },

      switchChat: (sessionId) => {
        const session = get().chatSessions[sessionId]
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages,
          })
        }
      },

      deleteChat: (sessionId) => {
        set((state) => {
          const { [sessionId]: _, ...remainingSessions } = state.chatSessions

          // If we're deleting the current session, switch to another one or create new
          let newCurrentId = state.currentSessionId
          let newMessages = state.messages

          if (sessionId === state.currentSessionId) {
            const sessionIds = Object.keys(remainingSessions)
            if (sessionIds.length > 0) {
              newCurrentId = sessionIds[0]
              newMessages = remainingSessions[newCurrentId].messages
            } else {
              // No sessions left, create a new one
              const newId = Date.now().toString()
              const newSession: ChatSession = {
                id: newId,
                title: "New Conversation",
                messages: [],
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              }

              newCurrentId = newId
              newMessages = []
              remainingSessions[newId] = newSession
            }
          }

          return {
            chatSessions: remainingSessions,
            currentSessionId: newCurrentId,
            messages: newMessages,
          }
        })
      },
    }),
    {
      name: "gyanjyoti-chat-storage",
    },
  ),
)
