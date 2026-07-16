// src/lib/storage.ts

export const STORAGE_KEY = "fitness_chat_sessions";

export interface ChatSession {
  id: string;
  preview: string;
  messages: any[];
  geminiHistory: any[];
  updatedAt: number;
}

export const saveSession = (session: ChatSession) => {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex((s) => s.id === session.id);

  if (existingIndex >= 0) {
    // update existing session
    sessions[existingIndex] = session;
  } else {
    //add new session at the beginning of the list
    sessions.unshift(session);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  // to notify the UI to refresh the sessions list
  window.dispatchEvent(new Event("chat_sessions_updated"));
};

export const getSessions = (): ChatSession[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getSessionById = (id: string): ChatSession | undefined => {
  const sessions = getSessions();
  return sessions.find((s) => s.id === id);
};
