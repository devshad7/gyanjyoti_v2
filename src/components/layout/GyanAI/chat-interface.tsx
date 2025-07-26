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
import { TypingIndicator } from "./typing-indicator";
const GyanLogo = "/assets/Gyan_logo.png";
import Navbar from "@/components/layout/Navbar";
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
     <>
     <Navbar />
    <div className="flex max-w-7xl mx-auto h-screen">
      {/* Mobile backdrop overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      <div
        className={`fixed inset-y-0 left-0 z-20 w-72 sm:w-80 bg-white/95 backdrop-blur-md border-r border-gray-100 shadow-xl transform transition-all duration-300 ease-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:bg-white md:shadow-none`}
      >
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#275cc3] to-[#e20869] text-transparent bg-clip-text">
                    Gyan AI
                  </h1>
                </div>
                {/* Close button for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSidebar(false)}
                  className="md:hidden hover:bg-[#e20869]/10 transition-colors h-8 w-8"
                >
                  <svg
                    className="h-4 w-4 text-[#e20869]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <p className="text-sm text-gray-500">
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
        <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
       
        </div>

        <div className="flex-1 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          <ScrollArea className="h-full px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6 animate-fade-in">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-20 h-20 sm:w-32 sm:h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={GyanLogo}
                      alt="Gyan Jyoti AI - Educational Assistant"
                      className="h-16 w-20 sm:h-20 sm:w-32 object-contain"
                    />
                    
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#275cc3] to-[#f1ab0f] rounded-full opacity-20 animate-ping"></div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#275cc3] via-[#f1ab0f] to-[#e20869] text-transparent bg-clip-text leading-tight">
                  Welcome to Gyan Jyoti AI
                </h1>
                <p className="text-gray-600 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 px-4">
                  Your intelligent educational companion designed to enhance learning.
                  Ask questions, explore concepts, and accelerate your educational journey.
                </p>
                
                {/* Quick action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl mb-6 sm:mb-8 px-4">
                  <button
                    onClick={() => handleSendMessage("Explain a complex topic in simple terms")}
                    className="p-3 sm:p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#275cc3] group text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#275cc3]/10 rounded-lg flex items-center justify-center group-hover:bg-[#275cc3]/20 transition-colors">
                        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-[#275cc3]" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm sm:text-base">Explain Concepts</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Break down complex topics into digestible explanations</p>
                  </button>
                  
                  <button
                    onClick={() => handleSendMessage("Help me solve a math problem step by step")}
                    className="p-3 sm:p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#f1ab0f] group text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#f1ab0f]/10 rounded-lg flex items-center justify-center group-hover:bg-[#f1ab0f]/20 transition-colors">
                        <span className="text-[#f1ab0f] font-bold text-xs sm:text-sm">∑</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm sm:text-base">Solve Problems</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Get step-by-step solutions to your problems</p>
                  </button>
                  
                  <button
                    onClick={() => handleSendMessage("Create a study plan for my exam preparation")}
                    className="p-3 sm:p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#e20869] group text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#e20869]/10 rounded-lg flex items-center justify-center group-hover:bg-[#e20869]/20 transition-colors">
                        <span className="text-[#e20869] font-bold text-xs sm:text-sm">📚</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm sm:text-base">Study Plans</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Get personalized learning strategies and schedules</p>
                  </button>
                </div>

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
              <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                {messages.map((message) =>
                  message.role && message.timestamp ? (
                    <Message
                      key={message.id}
                      message={{
                        id: message.id.toString(),
                        role: message.role,
                        content: message.content || "",
                        timestamp: message.timestamp,
                      }}
                    />
                  ) : null
                )}
                
                {/* Show loading indicator when bot is responding */}
                {loading && (
                  <div className="flex items-start gap-2 sm:gap-4 animate-slide-up px-2 sm:px-0">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-[#275cc3] to-[#e20869] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#275cc3]/25">
                      <img src={GyanLogo} alt="Gyan AI Assistant" className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 object-contain filter brightness-0 invert" />
                    </div>
                    <div className="bg-white border border-gray-100 text-gray-900 max-w-[75%] sm:max-w-[65%] md:max-w-[70%] min-w-0 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                
                {apiError && (
                  <div className="my-4 sm:my-6 px-2 sm:px-0">
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

        <div className="px-3 py-3 sm:px-6 sm:py-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={loading}
              disabled={apiError?.isRateLimit}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
