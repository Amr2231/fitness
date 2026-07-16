import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "use-intl";
import { AlignLeft } from "lucide-react";
import ChatToggleButton from "./module-button";
import ChatMessage from "./message";
import ChatInput from "./chat-input";
import PreviousConversations from "./previous-conversations";
import BotImage from "@/assets/images/Bot.png";
import { cn } from "@/lib/utils/tailwind-merge";
import { useChat } from "./hooks/use-chat";
import { useClickOutside } from "./hooks/use-click-outside";

/**
 * SmartCoach Component - Main chat widget component
 *
 * Features:
 * - Toggle open/close chat modal
 * - Send and receive messages
 * - Auto-scroll to latest messages
 * - Click-outside to close modal
 * - Loading states during message send
 * - Memoized callbacks for performance
 * - Responsive design with smooth animations
 *
 * @component
 * @example
 * <SmartCoach />
 */

export type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function SmartCoach() {
  // TRANSLATIONS
  const t = useTranslations("Chat");

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showPreviousConversations, setShowPreviousConversations] =
    useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // CUSTOM HOOKS
  /** Chat state management including messages and loading state */
  const { messages, isLoading, sendMessage, loadChatSession, startNewChat } =
    useChat("Hello!");

  // HANDLERS
  /**
   * Toggle menu open/close state
   */
  const handleMenuToggle = useCallback(() => {
    setShowPreviousConversations((prev) => !prev);
  }, []);

  // Click outside handler.. only for chat modal
  const handleClickOutsideChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Attach click-outside listeners - called at top level of component
  useClickOutside(menuRef, handleMenuToggle, showPreviousConversations);
  useClickOutside(modalRef, handleClickOutsideChat, isOpen);

  // Auto scroll to latest message
  const scrollToBottom = useCallback(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  // Auto scroll when new message arrive
  useEffect(() => {
    if (messages.length > 0 && isOpen) {
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages.length, isOpen, scrollToBottom]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  /**
   * Send message handler
   * Validates input, sends through custom hook, and clears input field
   */
  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    setInput("");
    await sendMessage(input || t("initialMessage"));
  }, [input, sendMessage, t]);

  /**
   * Toggle modal open/close state
   */
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <div className="relative">
      <ChatToggleButton
        isOpen={isOpen}
        onClick={handleToggle}
        botImage={BotImage}
      />

      {/* modal */}
      <div
        ref={modalRef}
        className={cn(
          "bg-chat bg-position-[70%_center] bg-cover fixed bottom-0 right-20 z-50 w-93.75 h-188.25 flex flex-col overflow-hidden border-2 border-primary rounded-3xl transition-all duration-500 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/*  blur */}
        <div className="absolute inset-0 backdrop-blur-xs bg-primary/1 -z-10" />

        <div className="flex justify-between items-center px-8 pt-10 pb-4">
          <h2 className="text-white text-xl font-extrabold tracking-tight">
            {t("header")}
          </h2>
          <button
            onClick={handleMenuToggle}
            aria-label={t("menuLabel")}
            className="text-primary p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <AlignLeft className="rotate-x-180" size={28} />
          </button>
        </div>

        {/* Previous Conversations Menu - Positioned at top-left */}
        {showPreviousConversations && (
          <>
            <div
              className="absolute inset-0 z-10 bg-black/50 rounded-3xl cursor-pointer"
              onClick={handleMenuToggle}
            />
            {/* Menu Container */}
            <div ref={menuRef} className="absolute top-0 left-0 z-20">
              <PreviousConversations
                onLoadSession={loadChatSession}
                onNewChat={startNewChat}
              />
            </div>
          </>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5 scroll-bar-hidden ">
          {/* Display all messages with memoization for performance */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} text={msg.text} />
          ))}

          {/* Loading indicator when bot is processing */}
          {isLoading && (
            <div className="flex items-center gap-2 text-primary/70 text-xs font-medium px-4 animate-pulse">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              {t("loading")}
            </div>
          )}
          {/* Invisible element used as scroll target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Component */}
        <ChatInput
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onSend={handleSend}
          disabled={isLoading}
          placeholder={t("placeholder")}
        />
      </div>
    </div>
  );
}
