// src/components/layout/Sidebar.tsx

import React from 'react';
import { Plus, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Conversation } from '../../types/types';

interface SidebarProps {
  conversations: Conversation[];
  activeConversation?: string;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  conversations,
  activeConversation,
  onNewChat,
  onSelectConversation,
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed top-14 left-0 bottom-0 z-40 w-[260px] bg-gray-5 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-[260px]'
        }`}
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Modern styled button for New Chat */}
          <div className="flex h-11 items-center px-4 mt-5">
            <button
              onClick={onNewChat}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200"
            >
              <Plus className="h-5 w-5" />
              New Chat
            </button>
          </div>

          <div className="mt-4 px-4 text-xs font-medium text-gray-600">
            RECENT
          </div>

          <div className="flex-1 overflow-y-auto pt-2">
            <div className="flex flex-col gap-1 px-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors duration-200 hover:bg-gray-200 ${
                    activeConversation === conv.id
                      ? 'bg-gray-300 text-black'
                      : 'text-gray-600'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all text-left">
                    {conv.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`fixed top-[80px] transition-all duration-300 z-50 rounded-lg p-2 text-gray-600 hover:bg-gray-100 ${
          isOpen ? 'left-[260px]' : 'left-2'
        }`}
      >
        {isOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
