//components/MessageInput.tsx
import React, { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  onTyping: (isTyping: boolean) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onTyping,
  disabled,
}) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Auto-focus textarea
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage("");
      setIsTyping(false);
      onTyping(false);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }

    // Typing indicator logic
    if (!isTyping && text.length > 0 && !disabled) {
      setIsTyping(true);
      onTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTyping(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-end space-x-3">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? "Connecting..." : "Type a message..."}
              disabled={disabled}
              rows={1}
              className="w-full bg-transparent outline-none resize-none text-gray-800 placeholder-gray-400 max-h-[120px]"
              style={{ minHeight: "2.5rem" }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className={`
              p-3 rounded-full transition-all flex-shrink-0
              ${
                !message.trim() || disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-chat-primary text-white hover:bg-chat-secondary transform hover:scale-105"
              }
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
