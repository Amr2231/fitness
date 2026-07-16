import { useState, useCallback } from "react";
import { sendFitnessMessage, getGeminiHistory, setGeminiHistory, resetGeminiHistory } from "@/lib/gemini";
import { saveSession, getSessionById, type ChatSession } from "@/lib/storage";

export type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export function useChat(initialMessage: string, errorMessage: string = "Sorry, error.") {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", text: initialMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Track current session ID
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());

  // Save conversation to LocalStorage
  const saveCurrentChat = useCallback((newMessages: Message[]) => {
    if (newMessages.length <= 1) return; // Prevent saving empty chats
    
    // Use first user message as session preview
    const previewText = newMessages.find(m => m.role === "user")?.text || "New Conversation";
    
    const session: ChatSession = {
      id: currentSessionId,
      preview: previewText.substring(0, 30) + (previewText.length > 30 ? "..." : ""),
      messages: newMessages,
      geminiHistory: getGeminiHistory(),
      updatedAt: Date.now(),
    };
    saveSession(session);
  }, [currentSessionId]);

  const addMessage = useCallback((role: "user" | "bot", text: string) => {
    const newMsg: Message = { id: Date.now().toString(), role, text };
    setMessages((prev) => {
      const updatedMessages = [...prev, newMsg];
      // Sync to storage after state update
      setTimeout(() => saveCurrentChat(updatedMessages), 50); 
      return updatedMessages;
    });
    return newMsg;
  }, [saveCurrentChat]);

  const addBotMessage = useCallback((text: string) => {
    return addMessage("bot", text);
  }, [addMessage]);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return;
      addMessage("user", userMessage);
      setIsLoading(true);

      try {
        const botResponse = await sendFitnessMessage(userMessage);
        addBotMessage(botResponse);
      } catch (error) {
        console.error("Failed to get bot response:", error);
        addBotMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, addBotMessage, errorMessage]
  );

  // Load existing session data
  const loadChatSession = useCallback((sessionId: string) => {
    const session = getSessionById(sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
      setGeminiHistory(session.geminiHistory); // Sync AI context
    }
  }, []);

  // Initialize a fresh chat session
  const startNewChat = useCallback(() => {
    setCurrentSessionId(Date.now().toString());
    setMessages([{ id: "1", role: "bot", text: initialMessage }]);
    resetGeminiHistory(); // Clear AI context
  }, [initialMessage]);

  return { messages, isLoading, sendMessage, loadChatSession, startNewChat };
}