"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "@/components/layout/GyanAI/message";
import { ChatInput } from "@/components/layout/GyanAI/chat-input";
import { Button } from "@/components/ui/button";
import { Trash2, BookOpen, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/chat-store";
import { ChatHistory } from "@/components/layout/GyanAI/chat-history";
import { useMobile } from "@/hooks/use-mobile";
import { FallbackMessage } from "@/components/layout/GyanAI/fallback-message";
const GyanLogo = "/assets/Gyan_logo.png";

type ApiErrorType = {
  message: string;
  isRateLimit: boolean;
} | null;

export function ChatInterface() {
  const { messages, addMessage, clearMessages } = useChatStore() as {
    messages: Array<{
      id: string;
      role: "user" | "assistant";
      content: string;
      timestamp: string;
    }>;
    addMessage: (message: {
      id: string;
      role: string;
      content: string;
      timestamp: string;
    }) => void;
    clearMessages: () => void;
  };
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useMobile();
  const [apiError, setApiError] = useState<ApiErrorType>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    addMessage({
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    });

    setLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        const isRateLimit =
          response.status === 429 || data?.isRateLimit === true;
        throw new Error(
          data?.message || data?.error || "Failed to get response"
        );
      }

      addMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.response ||
          "Sorry, I couldn't generate a response at this time.",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      const isRateLimit =
        error instanceof Error &&
        (error.message.includes("rate limit") ||
          error.message.includes("quota") ||
          error.message.includes("high demand"));

      setApiError({
        message: errorMessage,
        isRateLimit,
      });

      addMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isRateLimit
          ? "I'm currently experiencing high demand and have reached my usage limits. Please try again in a moment or ask a simpler question."
          : "Sorry, I encountered an error. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setApiError(null);
  };

  return (
    <div className="flex w-full h-screen">
      <div
        className={`fixed inset-y-0 left-0 z-20 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">Gyan AI</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your Educational Assistant
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatHistory
              onSelectChat={() => isMobile && setShowSidebar(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-163 w-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5 text-blue-400" />
            </Button>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md ">
              Educational Assistant
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            title="Clear conversation"
            className="text-gray-500 hover:text-brand-pink hover:bg-pink-50"
          >
            
          </Button>
        </div>

        <div className="flex-1 overflow-hidden bg-gradient-to-b from-blue-50 to-white-200">
          <ScrollArea className="h-full px-4 py-3 sm:px-6 sm:py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="w-32 h-24 mt-14 relative">
                  <div className="absolute inset-0 bg-brand-gold opacity-20 rounded-full animate-pulse"></div>
                  <img
                    src={GyanLogo}
                    alt="Gyan Logo"
                    className="h-16 w-24 text-brand-gold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
                  Welcome to Gyan Jyoti AI
                </h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg md:text-xl leading-relaxed tracking-wide">
                  Your smart educational companion is here to help you learn
                  better and faster. Ask anything, and let&quot;s start this
                  learning journey together.
                </p>

                {apiError && (
                  <div className="mt-8 w-full max-w-md space-y-4">
                    <FallbackMessage
                      error={apiError.message}
                      isRateLimit={!!apiError.isRateLimit}
                      onRetry={handleRetry}
                    />
                    {messages.map((message) => (
                      <Message
                        key={message.id}
                        message={{
                          id: message.id.toString(),
                          role: message.role as "user" | "assistant",
                          content: message.content,
                          timestamp: message.timestamp,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map((message) =>
                  message.role && message.content && message.timestamp ? (
                    <Message
                      key={message.id}
                      message={{
                        id: message.id.toString(),
                        role: message.role,
                        content: message.content,
                        timestamp: message.timestamp,
                      }}
                    />
                  ) : null
                )}
                {apiError && (
                  <div className="my-4">
                    <FallbackMessage
                      error={apiError.message}
                      isRateLimit={!!apiError.isRateLimit}
                      onRetry={handleRetry}
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="px-4 py-2 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={loading}
              disabled={apiError?.isRateLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
