"use client"

import { useState } from "react"

/**
 * InputBar component for sending messages
 * @param {Object} props - Component props
 * @param {Function} props.onSend - Callback function when message is sent
 */
const InputBar = ({ onSend }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto flex items-end rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
        <textarea
          className="flex-1 p-3 focus:outline-none resize-none max-h-32"
          placeholder="Ask about the news..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default InputBar
