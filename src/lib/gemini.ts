import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is not defined.");

const ai = new GoogleGenAI({ apiKey });

// the initial context and system instructions for the chat
const INITIAL_HISTORY = [
  {
    role: "user",
    parts: [
      {
        text: "Context: You are a Smart Fitness Coach. Answer briefly and motivationally. and nicely don't answer on things out of fitness topics",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Understood! I am your Smart Fitness Coach. How can I help you today?",
      },
    ],
  },
];

let chatHistory: any[] = [...INITIAL_HISTORY];

export const sendFitnessMessage = async (message: string): Promise<string> => {
  try {
    chatHistory.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: chatHistory,
    });

    const botReply = response.text!;
    chatHistory.push({ role: "model", parts: [{ text: botReply }] });

    return botReply;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getGeminiHistory = () => chatHistory;

// to set the history when loading old sessions from local storage
export const setGeminiHistory = (history: any[]) => {
  chatHistory = [...history];
};

// to reset the history when starting a new chat
export const resetGeminiHistory = () => {
  chatHistory = [...INITIAL_HISTORY];
};
