//components/MessageBubble.tsx
import React from "react";
import { format } from "date-fns";
import { type Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  const formatTime = (timestamp: string | Date) => {
    try {
      return format(new Date(timestamp), "h:mm a");
    } catch {
      return "Invalid time";
    }
  };

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-3`}
    >
      <div className={`max-w-[70%] ${isOwnMessage ? "order-2" : "order-1"}`}>
        {!isOwnMessage && (
          <div className="text-xs text-gray-600 font-medium mb-1 ml-2">
            {message.username}
          </div>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isOwnMessage
              ? "bg-chat-primary text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none shadow-md"
          }`}
        >
          <div className="break-words">{message.message}</div>

          <div
            className={`text-[10px] mt-1 ${
              isOwnMessage ? "text-white/70" : "text-gray-400"
            } flex justify-end`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
