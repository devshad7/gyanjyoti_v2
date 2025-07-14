interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className = "" }: TypingIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-[#275cc3] rounded-full animate-bounce"></div>
        <div 
          className="w-2 h-2 bg-[#275cc3] rounded-full animate-bounce" 
          style={{animationDelay: '0.1s'}}
        ></div>
        <div 
          className="w-2 h-2 bg-[#275cc3] rounded-full animate-bounce" 
          style={{animationDelay: '0.2s'}}
        ></div>
      </div>
      <span className="text-sm text-gray-500">Thinking...</span>
    </div>
  );
}
