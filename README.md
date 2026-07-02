# 💬 Real-Time Chat Application - Frontend

A modern, responsive **Real-Time Chat Application Frontend** built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Socket.IO Client**. The application provides an intuitive chat interface with real-time messaging, typing indicators, persistent user sessions, and seamless communication with the backend.

---

# ✨ Features

- 💬 Real-time chat using Socket.IO
- 🚀 Fast development with Vite
- ⚛️ React 19 + TypeScript
- 🎨 Responsive UI using Tailwind CSS
- 🔔 Beautiful notifications using React Hot Toast
- ⌨️ Live typing indicators
- 📜 Automatic loading of previous messages
- 🕒 Formatted timestamps using date-fns
- 💾 User session persistence using Local Storage
- 🔄 Automatic Socket.IO reconnection
- 📱 Responsive chat interface
- ⚡ Auto-scroll to newest messages
- 📶 Online / Offline connection status

---

# 🛠 Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React 19         | Frontend Library        |
| TypeScript       | Type Safety             |
| Vite             | Build Tool              |
| Tailwind CSS     | Styling                 |
| Socket.IO Client | Real-Time Communication |
| Axios            | API Requests            |
| React Hot Toast  | Notifications           |
| React Router DOM | Routing                 |
| date-fns         | Date Formatting         |

---

# 📁 Project Structure

```
chat-app-frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ChatScreen.tsx
│   │   ├── Header.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── TypingIndicator.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/
│   │   └── useSocket.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── constants.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

# 🏗 Frontend Architecture

```
                User

                  │

                  ▼

              React App

                  │

      ┌───────────┴────────────┐

      ▼                        ▼

 Authentication           Socket Hook

      │                        │

      ▼                        ▼

 Login Screen          Socket.IO Client

      │                        │

      ▼                        ▼

   Chat Screen  ◄────────► Backend

      │

      ▼

 Components

 ├── Header

 ├── MessageBubble

 ├── MessageInput

 └── TypingIndicator
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move inside frontend

```bash
cd chat-app-frontend
```

Install dependencies

```bash
npm install
```

---

# 📄 Environment Variables

Create a `.env` file inside the project root.

```env
REACT_APP_API_URL=http://localhost:3000

REACT_APP_SOCKET_URL=http://localhost:3000
```

If `REACT_APP_SOCKET_URL` is not provided, the application automatically uses `REACT_APP_API_URL`.

---

# ▶️ Run the Application

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# 📱 Application Flow

```
Open Website

      │

      ▼

Login Screen

      │

Enter Username

      │

      ▼

Save User in Local Storage

      │

      ▼

Connect to Socket Server

      │

      ▼

Load Previous Messages

      │

      ▼

Open Chat Screen

      │

      ▼

Real-Time Messaging
```

---

# 🧩 Components Overview

## LoginScreen

Responsible for

- Username validation
- User login
- Session creation
- Redirecting to chat

---

## ChatScreen

Responsible for

- Loading previous messages
- Receiving live messages
- Sending messages
- Managing typing indicators
- Auto scrolling

---

## Header

Displays

- Logged in username
- Connection status
- Logout button

---

## MessageBubble

Displays

- Chat message
- Sender
- Timestamp
- Own message styling

---

## MessageInput

Features

- Auto-resizing textarea
- Send on Enter
- Shift + Enter for new line
- Typing event handling

---

## TypingIndicator

Shows

```
Harsh is typing...
```

or

```
2 people are typing...
```

---

# 🔌 Socket.IO Events

## Client → Server

### new_message

```typescript
socket.emit("new_message", {
  username,
  message,
  userId,
});
```

---

### typing

```typescript
socket.emit("typing", {
  username,
});
```

---

### stop_typing

```typescript
socket.emit("stop_typing", {
  username,
});
```

---

# Server → Client

## previous_messages

Loads previous chat history.

```typescript
socket.on("previous_messages", callback);
```

---

## message_received

Receives newly broadcasted message.

```typescript
socket.on("message_received", callback);
```

---

## user_typing

Receives typing status.

```typescript
socket.on("user_typing", callback);
```

---

## error

Receives server-side errors.

```typescript
socket.on("error", callback);
```

---

# 🔐 Authentication

The application uses a lightweight client-side authentication approach.

On login:

- Username is validated
- User ID is generated
- User is stored in Local Storage
- Session persists after refresh

Stored object

```json
{
  "username": "Harsh",
  "userId": "user_172000000",
  "loginTime": "2026-07-01T18:30:00.000Z"
}
```

---

# 📦 Local Storage

```
chat_user
```

Stores

- Username
- User ID
- Login Time

---

# 📂 Custom Hooks

## useSocket()

Provides

- Socket connection
- Auto reconnection
- Send message
- Emit custom events
- Listen to events
- Connection status

Returns

```typescript
{
  (socket, isConnected, sendMessage, emitEvent, onEvent);
}
```

---

# 📚 Type Definitions

## Message

```typescript
interface Message {
  username: string;
  message: string;
  userId: string;
  timestamp: string;
}
```

---

## User

```typescript
interface User {
  username: string;
  userId: string;
}
```

---

## TypingUser

```typescript
interface TypingUser {
  username: string;
  isTyping: boolean;
}
```

---

# 🎨 UI Features

- Responsive Layout
- Modern Chat Design
- Auto Scroll
- Online Status Indicator
- Toast Notifications
- Loading Spinner
- Rounded Chat Bubbles
- Mobile Friendly
- Smooth Animations
- Typing Animation
- Auto-resizing Input

---

# 🔄 Communication Flow

```
User Types Message

        │

        ▼

MessageInput

        │

        ▼

ChatScreen

        │

        ▼

useSocket()

        │

        ▼

Socket.IO Server

        │

        ▼

MongoDB Storage

        │

        ▼

Broadcast Message

        │

        ▼

All Connected Clients
```

---

# 📦 Dependencies

```
react
react-dom
typescript
vite
tailwindcss
socket.io-client
axios
react-hot-toast
react-router-dom
date-fns
autoprefixer
postcss
```

---

# 🚀 Future Improvements

- JWT Authentication
- User Avatars
- Emoji Picker
- File & Image Sharing
- Dark Mode
- Group Chats
- Message Reactions
- Read Receipts
- Online Users List
- Push Notifications
- Voice Messages
- Video Calling
- Message Search
- Infinite Chat History
- Message Editing & Deletion

---

# 👨‍💻 Author

**Harsh Kumar Mishra**

Frontend Developer

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Socket.IO Client**.
