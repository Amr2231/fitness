import { memo } from "react";
import { Bot, User } from "lucide-react";

type ChatMessageProps = {
  role: "user" | "bot";
  text: string;
  userAvatar?: string;
};

const ChatMessage = memo(
  function ChatMessage({
    role,
    text,
    userAvatar,
  }: ChatMessageProps) {
    const isUser = role === "user";

    return (
      <div
        dir="ltr"
        className={`flex items-start gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 overflow-hidden border border-white/10 bg-black shadow-[0_0_10px_-2px_var(--color-primary)]">
          {isUser ? (
            userAvatar ? (
              <img
                src={userAvatar}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="text-white/70" />
            )
          ) : (
            <Bot size={16} className="text-white/70" />
          )}
        </div>

        <div
          dir="auto"
          className={`p-4 max-w-[80%] shadow-md text-sm leading-relaxed transition-all backdrop-blur-sm ${
            isUser
              ? "bg-primary/50 text-white rounded-2xl rounded-tr-sm"
              : "bg-zinc-950/50 text-white/90 rounded-2xl rounded-tl-sm backdrop-blur-sm  border-white/5"
          }`}
        >
          <p className="text-start whitespace-pre-wrap text-wrap">{text}</p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.role === nextProps.role &&
      prevProps.text === nextProps.text &&
      prevProps.userAvatar === nextProps.userAvatar
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
