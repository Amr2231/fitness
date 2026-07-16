
---

# 🇬🇧 English Documentation

## Overview

The **SmartCoach** chatbot is a fully-functional, multilingual chat widget component that provides an interactive conversation interface for users. It's a sophisticated UI component built with React, featuring real-time messaging, state management, and support for i18n (Internationalization).

## Architecture Overview

```
SmartCoach (Main Component)
├── ChatToggleButton (module-button.tsx)
├── ChatInput (chat-input.tsx)
├── ChatMessage (message.tsx)
├── PreviousConversations (previous-conversations.tsx)
└── Custom Hooks
    ├── useChat (use-chat.ts)
    └── useClickOutside (use-click-outside.ts)
```

---

## 📁 File Structure & Purpose

### 1. **chat-bot.tsx** - Main Component
**Purpose:** Core orchestrator of the entire chatbot system. Manages all state, renders child components, and handles user interactions.

**Key Features:**
- Chat modal state management
- Message display and scrolling
- Event listener management (click-outside)
- Translation integration
- Loading states and animations

**Props:** None (uses hooks internally)

**State Managed:**
```typescript
isOpen: boolean              // Whether modal is visible
input: string              // Current user input text
showPreviousConversations: boolean  // Menu visibility toggle
messages: Message[]        // Array of all chat messages
isLoading: boolean         // Loading state during API calls
```

**Key Methods:**
```typescript
handleToggle()           // Open/close chat modal
handleMenuToggle()       // Open/close previous conversations menu
handleSend()             // Send user message
handleInputChange()      // Update input field
handleClickOutsideChat() // Close modal when clicking outside
```

**Dependencies:**
- `useChat()` hook - Message state management
- `useClickOutside()` hook - Click detection
- `useTranslations()` - i18n support from `use-intl`

---

### 2. **chat-input.tsx** - Input Component
**Purpose:** Renders the input field where users type their messages.

**Props:**
```typescript
value: string              // Current input value
onChange: (val: string) => void  // Callback when input changes
onSend: () => void         // Callback when sending message
disabled?: boolean         // Disable input (default: false)
placeholder?: string       // Input placeholder text (default: "Ask Me Anything")
```

**Features:**
- Form submission handling (Enter key)
- Icon display (pen icon)
- Send button with validation
- Disabled state during loading
- Memoized for performance optimization

**Returns:**
- Input field with integrated send button
- Prevents empty message submission

---

### 3. **message.tsx** - Message Display Component
**Purpose:** Renders individual chat messages (user or bot).

**Props:**
```typescript
role: "user" | "bot"       // Who sent the message
text: string               // Message content
userAvatar?: string        // User profile image URL (optional)
```

**Features:**
- Different styling for user vs bot messages
- Avatar display with fallback icons
- User avatar image support
- Memoized rendering with custom comparison
- Responsive text wrapping

**Styling:**
- User messages: Primary color background, right-aligned
- Bot messages: Dark background, left-aligned
- Icons: User icon or Bot icon with custom styling

---

### 4. **module-button.tsx** - Toggle Button Component
**Purpose:** Displays the button to open/close the chat modal.

**Props:**
```typescript
onClick: () => void        // Callback to toggle modal
isOpen: boolean            // Current modal state
botImage: string          // Path to bot image/avatar
```

**Features:**
- Animated transitions
- Shows bot image
- Dynamic button text based on state (Open/Close)
- Memoized for performance
- Fixed positioning with smooth animations

**Returns:**
- Button with bot image above it
- Changes position when modal opens/closes

---

### 5. **previous-conversations.tsx** - Conversation History Component
**Purpose:** Shows a list of previous chat conversations (placeholder for future API integration).

**Props:** None

**State:**
- Static array of 10 dummy conversations (to be replaced with API data)

**Features:**
- Scrollable conversation list
- Hover effects on items
- Conversation item renderer with preview text
- Translated header
- Uses `useTranslations()` for i18n

**Future Enhancement:**
- Replace `PREVIOUS_CONVERSATIONS` array with API call to fetch real conversation history
- Add click handler to load selected conversation

---

### 6. **use-chat.ts** - Custom Hook
**Purpose:** Manages all chat state, message logic, and bot interaction.

**Parameters:**
```typescript
initialMessage: string     // Bot's greeting message
errorMessage?: string      // Error message if bot fails
```

**Returns:**
```typescript
{
  messages: Message[]      // All messages in conversation
  isLoading: boolean       // API call status
  sendMessage()            // Send user message and get bot response
  addMessage()             // Manually add message (internal)
  addBotMessage()          // Add bot-specific message (internal)
}
```

**Message Type:**
```typescript
export type Message = {
  id: string               // Unique timestamp-based ID
  role: "user" | "bot"     // Sender type
  text: string             // Message content
}
```

**Features:**
- Unique message IDs (timestamp-based)
- Async message sending with error handling
- Loading state management
- Try-catch error handling
- Currently simulates API call with 1-second delay

**TODO:**
- Replace simulation with actual Gemini API integration
- Implement real API endpoint

---

### 7. **use-click-outside.ts** - Custom Hook
**Purpose:** Detects clicks outside a DOM element and executes a callback.

**Parameters:**
```typescript
ref: RefObject<HTMLDivElement | null>  // Element to monitor
callback: () => void                   // Function to call
isActive?: boolean                     // Enable/disable (default: true)
```

**Features:**
- Uses `mousedown` event (better UX)
- Conditional activation
- Automatic cleanup on unmount
- Prevents event listener accumulation

**Use Cases:**
- Close modals when clicking outside
- Close dropdown menus
- Close tooltips/popovers

---

## 📊 Data Flow

```
User Types Message
    ↓
handleInputChange() → updates input state
    ↓
User presses Enter or clicks Send
    ↓
handleSend() → calls sendMessage() hook
    ↓
useChat hooks creates user Message object
    ↓
Sets isLoading = true (shows spinner)
    ↓
Simulates API delay (1 second)
    ↓
Bot response added to messages
    ↓
isLoading = false → spinner disappears
    ↓
Component re-renders with new message
    ↓
Auto-scroll to latest message
```

---

## 🌍 Internationalization (i18n)

All text is translated via `use-intl` library. Translation keys in `messages/en.json` and `messages/ar.json`:

```json
"Chat": {
  "initialMessage": "Hello, How can I assist you today?",
  "openButton": "Hey Ask Me",
  "closeButton": "Tap To Close",
  "header": "Smart Coach",
  "placeholder": "Ask Me Anything",
  "loading": "Smart Coach is thinking...",
  "errorMessage": "Sorry, something went wrong. Please try again.",
  "previousConversations": "Previous Conversations",
  "menuLabel": "Chat menu"
}
```

---

## 🎯 Key Features

✅ **Real-time Messaging** - Instant message display  
✅ **Multilingual Support** - English & Arabic  
✅ **Auto-scroll** - Scrolls to latest message  
✅ **Loading States** - Visual feedback during API calls  
✅ **Click-outside Detection** - Close on external clicks  
✅ **Memoization** - Performance optimized components  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Error Handling** - Graceful error messages  
✅ **Smooth Animations** - CSS transitions  

---

## 💾 State Management Summary

| State | Type | Purpose |
|-------|------|---------|
| `isOpen` | boolean | Modal visibility |
| `input` | string | Current input value |
| `showPreviousConversations` | boolean | Menu visibility |
| `messages` | Message[] | Chat history |
| `isLoading` | boolean | API loading state |

---

## 🚀 Usage Example

```tsx
import SmartCoach from '@/components/ui/chat-bot/chat-bot';

export function HomePage() {
  return (
    <div>
      <h1>Welcome to Fitness App</h1>
      <SmartCoach />  {/* Just drop it in! */}
    </div>
  );
}
```

---

## ⚙️ Configuration

**API Integration (Future):**
```typescript
// In use-chat.ts, replace:
await new Promise((resolve) => setTimeout(resolve, 1000));

// With:
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: userMessage })
});
const botResponse = await response.json();
```

---

## 🔧 Performance Optimizations

✅ Memoized components (ChatMessage, ChatToggleButton)  
✅ Useeffect for event listeners (prevents accumulation)  
✅ Callback memoization with useCallback  
✅ RequestAnimationFrame for smooth scrolling  
✅ No unnecessary re-renders  

---

## BY FADY



