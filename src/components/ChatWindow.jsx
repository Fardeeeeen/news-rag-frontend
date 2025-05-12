"use client"

import { useRef, useEffect } from "react"

/**
 * ChatWindow component displays a scrollable list of messages
 */
const ChatWindow = ({ messages }) => {
  const endRef = useRef(null)

  // Auto-scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (ts) =>
    ts
      ? new Date(ts).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : ""

  return (
    <div
      className="flex-1 px-6 py-4 overflow-y-auto"
      aria-live="polite"
      aria-label="Chat messages"
    >
      <div className="space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Start a conversation
            </h3>
            <p className="text-gray-500 mt-1">
              Ask about the latest news or any topic you're interested in.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            {msg.user && (
              <div className="flex justify-end mb-4 pr-4">
                <div className="flex flex-col items-end">
                  <div
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg 
                               max-w-lg w-fit whitespace-normal shadow"
                  >
                    {msg.user}
                  </div>
                  <span className="mt-1 text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            )}

            {msg.bot && (
              <div className="flex justify-start mb-4 pl-4">
                <div className="flex flex-col items-start">
                  <div
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg 
                               max-w-lg w-fit whitespace-normal shadow"
                  >
                    {msg.bot}
                  </div>
                  <span className="mt-1 text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={endRef} />
      </div>
    </div>
  )
}

export default ChatWindow
