"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Plus, ChevronLeft, ChevronRight, Trash2, Sparkles, Brain, Cpu, Database } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SidebarProps {
  currentConvId: string | null;
  setCurrentConvId: (id: string | null) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isAuthenticated: boolean;
}

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o (OpenAI)", icon: <Sparkles className="w-3.5 h-3.5" />, desc: "High reasoning & text completions." },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet (Anthropic)", icon: <Brain className="w-3.5 h-3.5" />, desc: "Deep analytical & code synthesis." },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (Google)", icon: <Cpu className="w-3.5 h-3.5" />, desc: "Massive context & logical search." }
];

export default function Sidebar({
  currentConvId,
  setCurrentConvId,
  selectedModel,
  setSelectedModel,
  onNewChat,
  isOpen,
  setIsOpen,
  isAuthenticated
}: SidebarProps) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchConversations = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setConversations([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timeoutId = setTimeout(() => {
      fetchConversations();
    }, 0);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchConversations();
    });

    return () => {
      clearTimeout(timeoutId);
      if (subscription) subscription.unsubscribe();
    };
  }, [isAuthenticated, fetchConversations, supabase.auth]);

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase.from("conversations").delete().eq("id", id);
    if (!error) {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (currentConvId === id) {
        setCurrentConvId(null);
      }
    }
  };

  return (
    <div
      className={`relative h-[calc(100vh-4rem)] border-r border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md transition-all duration-300 flex flex-col z-20 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Collapse Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-5 w-6 h-6 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--accent-color)] text-[var(--text-secondary)] hover:text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
      >
        {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      {/* New Chat Button */}
      <div className="p-4">
        {isOpen ? (
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent-color)] hover:opacity-90 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer active:scale-98 shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Thread
          </button>
        ) : (
          <button
            onClick={onNewChat}
            title="New Thread"
            className="w-8 h-8 mx-auto flex items-center justify-center rounded-xl bg-[var(--accent-color)] text-white hover:opacity-90 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Model Router Selector */}
      {isOpen && (
        <div className="px-4 py-2 border-b border-[var(--glass-border)]">
          <span className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2.5">
            Model Router
          </span>
          <div className="space-y-1.5">
            {MODELS.map((modelOption) => {
              const active = selectedModel === modelOption.id;
              return (
                <button
                  key={modelOption.id}
                  onClick={() => setSelectedModel(modelOption.id)}
                  className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer text-xs flex gap-2.5 items-center ${
                    active
                      ? "border-[var(--accent-color)] bg-[var(--accent-color)]/5 text-[var(--accent-color)] font-bold shadow-sm"
                      : "border-[var(--glass-border)] bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-slate-500/5"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${active ? 'bg-[var(--accent-color)]/10' : 'bg-slate-500/5'}`}>
                    {modelOption.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate leading-none">{modelOption.name}</span>
                    <span className="block text-[8px] text-[var(--text-secondary)] mt-0.5 leading-none font-normal truncate">
                      {modelOption.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Guest Session Status Widget */}
      {!isAuthenticated && isOpen && (
        <div className="mx-4 my-4 p-3 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-2.5 flex-shrink-0">
          <div className="text-[10px] font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
            Guest Session
          </div>
          <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed">
            Conversation is temporary. Chats, files, and settings will not be saved.
          </p>
          <ul className="space-y-1.5 text-[9px] text-[var(--text-secondary)] font-medium pl-0 list-none">
            <li className="flex items-center gap-1.5">⏱ Conversation is temporary</li>
            <li className="flex items-center gap-1.5">🧠 No Memory</li>
            <li className="flex items-center gap-1.5">📁 No File Uploads</li>
          </ul>
          <button
            onClick={() => window.location.href = "/login"}
            className="w-full py-2 bg-[var(--accent-color)] hover:opacity-90 text-white font-semibold text-[8px] uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm text-center"
          >
            Upgrade to Workspace
          </button>
        </div>
      )}

      {/* Collapsed Guest Icon indicator */}
      {!isAuthenticated && !isOpen && (
        <div className="mt-auto mb-4 mx-auto" title="Guest Session (Temporary)">
          <div className="w-8 h-8 rounded-xl border border-dashed border-red-500/20 bg-red-500/5 flex items-center justify-center text-xs">
            🔓
          </div>
        </div>
      )}

      {/* History Threads list (Only if Authenticated) */}
      {isAuthenticated && (
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin">
          {isOpen && (
            <span className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-1">
              Chat Streams
            </span>
          )}
          
          {loading && isOpen && (
            <div className="text-[10px] text-[var(--text-secondary)] py-2 animate-pulse font-medium">
              Syncing histories...
            </div>
          )}

          {!loading && conversations.length === 0 && isOpen && (
            <div className="text-[10px] text-[var(--text-secondary)] py-6 text-center italic leading-relaxed">
              No active threads. Let's initialize a new sequence.
            </div>
          )}

          {conversations.map((conv) => {
            const active = currentConvId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => setCurrentConvId(conv.id)}
                className={`w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between group ${
                  active
                    ? "bg-slate-500/10 text-[var(--text-primary)] font-bold border border-[var(--glass-border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-slate-500/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-color)] shrink-0" />
                  {isOpen && (
                    <span className="truncate pr-2 font-display">{conv.title}</span>
                  )}
                </div>
                
                {isOpen && (
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 p-1 rounded-lg transition-all cursor-pointer"
                    title="Purge thread"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
