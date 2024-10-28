import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatInput } from '../components/common/ChatInput';
import { ChatMessage } from '../components/common/ChatMessage';
import type { Conversation, Message } from '../types/types';
import { HeaderUser } from '../components/layout/Header';
import { Bot } from 'lucide-react';

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Alpha',
    messages: [
      {
        id: 'm1',
        content: 'Hello, how can I assist you today?',
        role: 'assistant',
        timestamp: new Date(),
      },
      {
        id: 'm2',
        content: 'Can you provide the latest sales figures?',
        role: 'user',
        timestamp: new Date(),
      },
    ],
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'Marketing Meeting Notes',
    messages: [
      {
        id: 'm1',
        content: 'Let me know if you need the latest marketing strategy updates.',
        role: 'assistant',
        timestamp: new Date(),
      },
    ],
    timestamp: new Date(),
  },
];

const UserDashboard: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current;
      const isNearBottom = scrollHeight - clientHeight - scrollTop < 100;

      if (isNearBottom) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [conversations]);

  const handleNewChat = () => {
    const newConv: Conversation = {
      id: (conversations.length + 1).toString(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setConversations([newConv, ...conversations]);
    setActiveConversationId(newConv.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (message: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: (activeConversation.messages.length + 1).toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversation.id
        ? { ...conv, messages: [...conv.messages, newMessage] }
        : conv
    );

    setConversations(updatedConversations);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderUser />

      <div className="flex pt-14 h-[calc(100vh-56px)]">
        <Sidebar
          conversations={conversations}
          activeConversation={activeConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className={`flex-1 relative transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : 'ml-0'}`}>
          <div
            ref={chatContainerRef}
            className="h-[calc(100vh-120px)] overflow-y-auto pb-32"
          >
            {activeConversation ? (
              <div className="pb-32">
                {activeConversation.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={chatEndRef} /> {/* This element helps with scrolling */}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-gray-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  How can I help you today?
                </h1>
                <p className="text-gray-500 max-w-xl">
                  I'm a ChatGPT clone ready to assist you with any questions or tasks you might have.
                  Feel free to start a conversation!
                </p>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-20 right-0 z-50 bg-white">
            <ChatInput onSend={handleSendMessage} disabled={false} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
