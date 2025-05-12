import axios from "axios"
import chatService from "../services/chatService"

// Mock axios
jest.mock("axios")

describe("chatService", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("sendMessage", () => {
    it("should send a message and return the response data", async () => {
      // Mock data
      const sessionId = "test-session-id"
      const message = "Hello, world!"
      const responseData = {
        response: "Bot response",
        session_history: [{ user: "Hello, world!" }, { bot: "Bot response" }],
      }

      // Mock axios.post to return the response data
      axios.post.mockResolvedValueOnce({ data: responseData })

      // Call the function
      const result = await chatService.sendMessage(sessionId, message)

      // Assertions
      expect(axios.post).toHaveBeenCalledWith("/chat", {
        session_id: sessionId,
        message,
      })
      expect(result).toEqual(responseData)
    })

    it("should throw an error when the API call fails", async () => {
      // Mock data
      const sessionId = "test-session-id"
      const message = "Hello, world!"
      const error = new Error("API error")

      // Mock axios.post to throw an error
      axios.post.mockRejectedValueOnce(error)

      // Call the function and expect it to throw
      await expect(chatService.sendMessage(sessionId, message)).rejects.toThrow("API error")

      // Assertions
      expect(axios.post).toHaveBeenCalledWith("/chat", {
        session_id: sessionId,
        message,
      })
    })
  })

  describe("resetSession", () => {
    it("should reset the session", async () => {
      // Mock data
      const sessionId = "test-session-id"

      // Mock axios.delete to resolve
      axios.delete.mockResolvedValueOnce({})

      // Call the function
      await chatService.resetSession(sessionId)

      // Assertions
      expect(axios.delete).toHaveBeenCalledWith(`/session/${sessionId}`)
    })

    it("should throw an error when the API call fails", async () => {
      // Mock data
      const sessionId = "test-session-id"
      const error = new Error("API error")

      // Mock axios.delete to throw an error
      axios.delete.mockRejectedValueOnce(error)

      // Call the function and expect it to throw
      await expect(chatService.resetSession(sessionId)).rejects.toThrow("API error")

      // Assertions
      expect(axios.delete).toHaveBeenCalledWith(`/session/${sessionId}`)
    })
  })
})
