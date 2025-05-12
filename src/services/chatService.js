// src/services/chatService.js
import axios from "axios";

/**
 * Determine base URL:
 * - Uses NEXT_PUBLIC_API_BASE_URL if set (deployed environment)
 * - Otherwise defaults to localhost for local development
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Configure axios defaults
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

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
      const { data } = await axios.post("/chat", {
        session_id: sessionId,
        message,
      });
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  /**
   * Reset the current chat session
   * @param {string} sessionId - The session ID to reset
   * @returns {Promise<void>}
   */
  resetSession: async (sessionId) => {
    try {
      await axios.delete(`/session/${sessionId}`);
    } catch (error) {
      console.error("Error resetting session:", error);
      throw error;
    }
  },
};

export default chatService;
