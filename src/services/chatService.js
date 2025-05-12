import axios from "axios"

// Configure axios defaults
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers.common["Content-Type"] = "application/json"

/**
 * Service for interacting with the chat API
 */
const chatService = {
  /**
   * Send a message to the chat API
   * @param {string} sessionId - The current session ID
   * @param {string} message - The message to send
   * @returns {Promise<Object>} - The response containing bot response and session history
   */
  sendMessage: async (sessionId, message) => {
    try {
      const response = await axios.post("/chat", {
        session_id: sessionId,
        message,
      })
      return response.data
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  },

  /**
   * Reset the current chat session
   * @param {string} sessionId - The session ID to reset
   * @returns {Promise<void>}
   */
  resetSession: async (sessionId) => {
    try {
      await axios.delete(`/session/${sessionId}`)
    } catch (error) {
      console.error("Error resetting session:", error)
      throw error
    }
  },
}

export default chatService
