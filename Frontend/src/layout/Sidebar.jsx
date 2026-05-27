export default function Sidebar({ onLogout, navigate }) {
  return (
    <aside className="w-64  min-w-64 h-screen sticky  top-0 bg-[#0b1220] border-r border-white/10 flex flex-col flex-shrink-0">
      
      {/* Logo */}
      <div className="p-6 text-xl font-semibold tracking-tight">
        ⚡ TaskFlow
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5"
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5"
        >
          ✅ Tasks
        </button>
      </nav>

      {/* 🔥 FIXED LOGOUT */}
      <div className="px-4 pb-6 mt-auto">
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}