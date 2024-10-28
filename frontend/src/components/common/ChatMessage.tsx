// src/components/common/ChatMessage.tsx

import React from 'react';
import { User as UserIcon, Bot } from 'lucide-react';
import type { Message } from '../../types/types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`py-8 ${isUser ? 'bg-gray-5' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto flex gap-6 px-4">
        <div
          className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-gray-800' : 'bg-teal-600'
          }`}
        >
          {isUser ? (
            <UserIcon className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="prose prose-slate max-w-none">{message.content}</div>
      </div>
    </div>
  );
}
