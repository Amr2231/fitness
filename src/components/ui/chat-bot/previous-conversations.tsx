import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { ChevronRight, Plus } from "lucide-react";
import { getSessions, type ChatSession } from "@/lib/storage";

/**
 * @param onLoadSession Load previous chat by ID
 * @param onNewChat Start a new chat session
 */
export default function PreviousConversations({ 
  onLoadSession, 
  onNewChat 
}: { 
  onLoadSession: (id: string) => void,
  onNewChat: () => void 
}) {
  const t = useTranslations("Chat");
  const [conversations, setConversations] = useState<ChatSession[]>([]);

  // Load sessions on mount
  useEffect(() => {
    const load = () => setConversations(getSessions());
    load();
    
    // Auto-update list on new message
    window.addEventListener("chat_sessions_updated", load);
    return () => window.removeEventListener("chat_sessions_updated", load);
  }, []);

  return (
    <div className="bg-linear-to-b from-white/5 w-65.75 h-71 py-6 px-4 to-white/0 rounded-2xl border border-white/10 backdrop-blur-xl  flex flex-col ">
      {/* Header */}
      <div className="pb-4 flex justify-between items-center border-b border-white/10 mb-4">
        <h3 className="text-white font-semibold text-xl font-baloo tracking-tight">
          {t("previousConversations")}
        </h3>
        {/* New Chat Button */}
        <button 
          onClick={onNewChat}
          className="text-white/60 hover:text-primary transition-colors cursor-pointer"
          title="New Chat"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-hidden">
        {conversations.length === 0 ? (
          <p className="text-white/40 text-xs text-center mt-6">No previous conversations</p>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onLoadSession(conversation.id)}
              className="w-full flex items-center justify-between py-3 hover:bg-white/5 transition-colors group cursor-pointer text-left"
            >
              <div className="flex-1 truncate pr-2">
                <p className="text-white/80 text-xs group-hover:text-white transition-colors truncate">
                  {conversation.preview}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-primary/60 group-hover:text-primary transition-colors shrink-0"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}