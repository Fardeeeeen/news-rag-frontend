NewsRAG Chatbot

NewsRAG is a Retrieval-Augmented Generation (RAG) chatbot designed to provide real-time news updates in response to user queries. It crawls news articles from RSS feeds, processes and indexes them using ChromaDB, and generates conversational responses using Google’s Gemini LLM. The backend is built with FastAPI, using Redis for session management, while the frontend is a responsive Next.js application with a clean, modern UI styled with Tailwind CSS.
Features

News Crawling: Fetches articles from RSS feeds using feedparser and NewsPlease.
Text Processing: Splits articles into ~150-word passages for efficient retrieval.
Vector Search: Indexes passages in ChromaDB with all-MiniLM-L6-v2 embeddings for semantic search.
Conversational AI: Uses Google Gemini (gemini-1.5-flash) to generate context-aware responses.
Session Management: Persists chat history in Redis and local storage for seamless conversations.
Responsive UI: Next.js frontend with a chat window, sidebar, input bar, and relevant articles panel.
Reset Functionality: Allows users to clear chat sessions and start fresh.
Mock Articles: Displays placeholder articles related to the current topic (to be replaced with real data).

Tech Stack

Frontend:
Next.js 15.2.4, React 18.3.1
Tailwind CSS for styling
Axios for API requests
UUID for session management


Containerization: Docker, Docker Compose
Dependencies: See backend/requirements.txt, backend/package.json, and frontend/package.json

Prerequisites

Python 3.10+
Node.js 18+ and npm
Docker and Docker Compose
Google API key for Gemini (GOOGLE_API_KEY)
RSS feed URLs in backend/data/raw/news_rss.txt
Redis server (included in Docker Compose)

Installation
1. Clone the Repository
git clone https://github.com/fardeeeeen/news-rag-frontend
cd news-rag-frontend
2. Set Up Environment Variables
Create a .env file in the root directory with the following:
GOOGLE_API_KEY=your_google_api_key
REDIS_URL=redis://redis:6379/0
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

For production, update NEXT_PUBLIC_API_BASE_URL to your backend’s deployed URL (e.g., https://your-backend.onrender.com).
3. Backend Setup
Option 1: Using Docker Compose
docker-compose up --build

This starts:

The FastAPI backend on http://localhost:8000
A Redis instance on port 6379

Option 2: Run Locally
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000

4. Frontend Setup
cd frontend
npm install
npm run dev

Open http://localhost:3000 in your browser to access the chat interface.
5. Prepare News Data
To crawl and index news articles:

Ensure RSS feed URLs are listed in backend/data/raw/news_rss.txt.

Run the crawler:
python backend/embed/crawl_with_newsplease.py


Process articles into passages:
python backend/ingest/split_passages.py


Index passages in ChromaDB:
python backend/ingest/embed_and_index_chroma.py



Usage

Open the frontend at http://localhost:3000.
Type a query (e.g., "What’s the latest tech news?") in the input bar.
The chatbot retrieves relevant news passages, combines them with chat history, and responds using Gemini.
View mock related articles in the right panel (visible on larger screens).
Use the sidebar’s "Reset Chat" button to clear the session and start a new conversation.
Chat history is persisted in local storage and Redis for continuity.

API Endpoints

POST /chat: Send a user message and receive a response.
Request: { "session_id": str, "message": str }
Response: { "response": str, "session_history": [{ "user": str, "bot": str }] }


DELETE /session/{session_id}: Clear a session’s chat history.
POST /debug_raw: Debug raw Gemini responses for a given message.

Project Structure

├── frontend/
│   ├── components/
│   │   ├── ChatWindow.jsx           # Chat message display
│   │   ├── Footer.jsx               # Page footer
│   │   ├── InputBar.jsx             # Message input form
│   │   ├── RelevantArticles.jsx     # Mock related articles
│   │   └── Sidebar.jsx              # Navigation sidebar
│   ├── services/
│   │   └── chatService.js           # API client
│   ├── App.jsx                      # Main app component
│   ├── index.jsx                    # Entry point
│   ├── index.css                    # Global styles
│   └── package.json                 # Frontend dependencies
├── Dockerfile                       # Backend container
├── docker-compose.yml               # Service configuration
└── README.md                        # Project documentation

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements

NewsPlease for article crawling.
ChromaDB for vector storage.
Google Gemini for conversational AI.
FastAPI for the backend API.
Next.js for the frontend framework.
Tailwind CSS for styling.
Redis for session management.

Future Improvements

Dynamic Articles: Replace mock articles in RelevantArticles.jsx with real data fetched from the backend.
News Feed & Saved Articles: Implement functionality for the "News Feed" and "Saved Articles" sidebar buttons.
Error Handling: Enhance frontend error messages for network or API failures.
Authentication: Add user authentication for personalized news preferences.
Testing: Add unit tests for frontend components and backend endpoints.
Deployment: Document deployment steps for platforms like Render or Vercel.

