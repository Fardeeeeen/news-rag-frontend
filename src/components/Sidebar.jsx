// Sidebar.jsx
"use client"

const Sidebar = ({ onResetSession }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        <button className="sidebar-item active w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Chat</span>
        </button>

        <button className="sidebar-item w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>News Feed</span>
        </button>

        <button className="sidebar-item w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span>Saved Articles</span>
        </button>

        <button
          className="sidebar-item w-full text-left flex items-center justify-center bg-[#0e1f32] hover:bg-[#0c1a29] text-white px-4 py-2 rounded-lg shadow-md transition-colors mt-4"
          onClick={onResetSession}
        >
          Reset Chat
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
