// App.jsx
"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import ChatWindow from "./components/ChatWindow"
import InputBar from "./components/InputBar"
import Sidebar from "./components/Sidebar"
import RelevantArticles from "./components/RelevantArticles"
import Footer from "./components/Footer"
import chatService from "./services/chatService"

/**
 * Main App component that manages state and connects components
 */
export default function App() {
  const [messages, setMessages] = useState([])
  const [sessionId, setSessionId] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")

  // Initialize session ID & load from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("chatSessionId") || uuidv4()
    localStorage.setItem("chatSessionId", storedId)
    setSessionId(storedId)

    const storedMessages = localStorage.getItem("chatMessages")
    if (storedMessages) setMessages(JSON.parse(storedMessages))
  }, [])

  // Persist messages
  useEffect(() => {
    if (messages.length) {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  const extractTopic = (message) => {
    const words = message.split(" ").filter(w => w.length > 4)
    return words[Math.floor(Math.random() * words.length)] || ""
  }

  const handleSendMessage = async (text) => {
    const timestamp = new Date()
    setMessages(prev => [...prev, { user: text, timestamp }])
    setLoading(true)

    const topic = extractTopic(text)
    setCurrentTopic(topic)

    try {
      const { response } = await chatService.sendMessage(sessionId, text)
      setTimeout(() => {
        setMessages(prev => [...prev, { bot: response, timestamp: new Date() }])
        setLoading(false)
      }, 1000)
    } catch {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { bot: "Sorry, there was an error.", timestamp: new Date() },
        ])
        setLoading(false)
      }, 1000)
    }
  }

  const handleResetSession = async () => {
    try {
      await chatService.resetSession(sessionId)
      const newId = uuidv4()
      localStorage.setItem("chatSessionId", newId)
      setSessionId(newId)
      setMessages([])
      localStorage.removeItem("chatMessages")
      setCurrentTopic("")
    } catch (e) {
      console.error("Failed to reset session:", e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-[#0e1f32] shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white ml-6">NewsRAG</h1>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onResetSession={handleResetSession} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col">
              <ChatWindow messages={messages} />

              {loading && (
                <div className="px-4 py-2 text-center text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    {[0,150,300].map(delay => (
                      <div
                        key={delay}
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <InputBar onSend={handleSendMessage} />
            </div>

            <RelevantArticles currentTopic={currentTopic} />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}