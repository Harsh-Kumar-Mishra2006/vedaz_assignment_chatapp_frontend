import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import Header from "./Header";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { type Message, type TypingUser } from "../types";
import toast from "react-hot-toast";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { isConnected, sendMessage, onEvent, emitEvent } = useSocket();

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Load previous messages
  useEffect(() => {
    const cleanup = onEvent("previous_messages", (messages: Message[]) => {
      setMessages(messages);
      setTimeout(scrollToBottom, 100);
    });

    return cleanup;
  }, [onEvent, scrollToBottom]);

  // Handle incoming messages
  useEffect(() => {
    const cleanup = onEvent("message_received", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(scrollToBottom, 100);
    });

    return cleanup;
  }, [onEvent, scrollToBottom]);

  // Handle typing indicators
  useEffect(() => {
    const cleanup = onEvent("user_typing", (data: TypingUser) => {
      setTypingUsers((prev) => {
        if (data.isTyping) {
          return prev.includes(data.username) ? prev : [...prev, data.username];
        } else {
          return prev.filter((name) => name !== data.username);
        }
      });
    });

    return cleanup;
  }, [onEvent]);

  // Handle errors
  useEffect(() => {
    const cleanup = onEvent("error", (error: string) => {
      toast.error(error);
    });

    return cleanup;
  }, [onEvent]);

  // Send message handler
  const handleSendMessage = useCallback(
    (message: string) => {
      if (!user) return;

      const messageData: Message = {
        username: user.username,
        message: message.trim(),
        userId: user.userId,
        timestamp: new Date().toISOString(),
      };

      const success = sendMessage(messageData);
      if (!success) {
        toast.error("Failed to send message");
      }
    },
    [user, sendMessage],
  );

  // Typing handler
  const handleTyping = useCallback(
    (isTyping: boolean) => {
      if (!user) return;

      if (isTyping) {
        emitEvent("typing", { username: user.username });
      } else {
        emitEvent("stop_typing", { username: user.username });
      }
    },
    [user, emitEvent],
  );

  return (
    <div className="flex flex-col h-screen bg-chat-background">
      <Header />

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Be the first to send a message!</p>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble
              key={message.id || message._id || index}
              message={message}
              isOwnMessage={message.username === user?.username}
            />
          ))}

          <TypingIndicator users={typingUsers} />

          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput
        onSend={handleSendMessage}
        onTyping={handleTyping}
        disabled={!isConnected}
      />
    </div>
  );
};

export default ChatScreen;
