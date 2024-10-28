// src/components/common/ChatInput.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl p-4">
        <div className="relative flex items-end bg-white rounded-lg border border-black/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Unleash Insights"
            rows={1}
            className="w-full resize-none bg-transparent py-3 px-4 outline-none"
            style={{ maxHeight: '200px' }}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className={`p-2 m-1 rounded-lg ${
              disabled || !input.trim()
                ? 'text-gray-400'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
