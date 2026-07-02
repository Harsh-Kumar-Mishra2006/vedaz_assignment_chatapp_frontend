//components/TypingIndicator.tsx
import React from "react";

interface TypingIndicatorProps {
  users: string[];
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  if (!users.length) return null;

  const displayText =
    users.length === 1
      ? `${users[0]} is typing...`
      : `${users.length} people are typing...`;

  return (
    <div className="px-4 py-2">
      <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-1 mr-2">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>
        <span className="text-sm text-gray-600">{displayText}</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
