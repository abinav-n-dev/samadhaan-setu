import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { sendChatMessage, ChatMessage } from '../../services/geminiChatService';
import {
  Sparkles,
  X,
  Minus,
  Send,
  RotateCcw,
  Bot,
  User,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const SetuAiChatbot: React.FC = () => {
  const { role, currentUser } = useAppState();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('GovTech AI v2.6');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'init-1',
        sender: 'assistant',
        text: `**Namaste! I am Setu AI Sahayak, your civic intelligence co-pilot.**\n\nI can help you track ground grievances, explore university Capstone challenges, explain AI priority scores, or navigate CSR funding. How can I assist you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Setu AI Core',
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Role-based quick prompt chips
  const getSuggestedPrompts = () => {
    switch (role) {
      case 'citizen':
        return [
          'Status of Dumka water report #JH-1042',
          'How do I report a broken handpump?',
          'हिंदी में समझाएं',
        ];
      case 'student':
      case 'mentor':
        return [
          'Show water challenges needing IoT solutions',
          'How to apply for Section 135 CSR grants?',
          'What is BIT Mesra AquaShield project?',
        ];
      case 'government':
        return [
          'Summarize Dumka district water crisis',
          'How is the AI Priority Score calculated?',
          'Show duplicate complaint clusters in Hansdiha',
        ];
      case 'industry':
      case 'ngo':
        return [
          'Show verified student projects needing CSR',
          'Explain CSR Section 135 compliance',
          'How do field NGOs verify milestones?',
        ];
      default:
        return [
          'What is SamadhanSetu?',
          'Explore Dumka water challenge',
          'How does AI priority scoring work?',
        ];
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages, {
        userRole: role,
        userName: currentUser?.name || 'Guest User',
      });

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: response.modelUsed,
      };

      if (response.modelUsed) {
        setActiveModel(response.modelUsed);
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered a temporary connection issue. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Fallback',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'assistant',
        text: `**Conversation reset.** How can I help you across the SamadhanSetu civic ecosystem?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeModel,
      },
    ]);
  };

  // Helper to render markdown-like text with bold, bullets, and deep links
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      // Check if line contains a challenge reference like CH-2026-089 or report #JH-1042
      const challengeMatch = line.match(/(CH-2026-\d+)/);
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Parse bold segments **bold**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

      const renderedContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <div key={idx} className={`${isBullet ? 'flex items-start gap-1.5 ml-2 my-0.5' : 'my-0.5'}`}>
          {isBullet && <span className="text-emerald-600 font-bold">•</span>}
          <div className="flex-1">
            {renderedContent}
            {challengeMatch && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate(`/challenges/${challengeMatch[1]}`);
                }}
                className="inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-300 dark:border-emerald-700 transition"
              >
                <span>View {challengeMatch[1]}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 group border border-slate-700 dark:border-emerald-500"
          aria-label="Open Setu AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-emerald-400 dark:text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1">
              <span>Setu AI Sahayak</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <div className="text-[10px] text-slate-300 dark:text-emerald-100 leading-tight">
              GovTech AI Engine
            </div>
          </div>
        </button>
      )}

      {/* Expanded Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-100px)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600/90 flex items-center justify-center border border-emerald-400/40">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold tracking-tight">Setu AI Sahayak</h3>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    GovTech AI v2.6
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="capitalize">{role} Desk</span>
                  <span>•</span>
                  <span>SIH 2026 GovTech</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
                title="Minimize chat"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context / Persona Banner */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="truncate">
              Logged in as <strong className="text-slate-700 dark:text-slate-200">{currentUser?.name || 'Evaluator'}</strong>
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Live Co-Pilot
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed shadow-2xs ${
                      isAssistant
                        ? 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                        : 'bg-slate-900 text-white dark:bg-emerald-600 rounded-br-none'
                    }`}
                  >
                    {isAssistant ? renderFormattedText(msg.text) : msg.text}

                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isAssistant ? 'text-slate-400 dark:text-slate-500' : 'text-slate-300 dark:text-emerald-100'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.modelUsed && isAssistant && (
                        <span>• Setu AI</span>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-0.5 text-[10px] font-bold">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing / Thinking Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 flex items-center gap-1.5 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Setu AI is analyzing...
                  </span>
                  <span className="flex gap-1 items-center ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Suggested questions for you:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {getSuggestedPrompts().map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="text-[11px] text-left px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg border border-slate-200 dark:border-slate-700 transition shadow-2xs disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Setu AI anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-xl transition shadow-xs flex items-center justify-center shrink-0 disabled:cursor-not-allowed"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-1.5">
              <span className="text-[9px] text-slate-400 dark:text-slate-500">
                SamadhanSetu Civic Intelligence Engine • Smart India Hackathon 2026
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

