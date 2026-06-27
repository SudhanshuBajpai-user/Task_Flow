export default function Sidebar({ onLogout, navigate }) {
  return (
    <aside className="w-64 min-w-64 h-screen sticky top-0 bg-[#0b1220] border-r border-white/10 flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          ⚡ TaskFlow
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Stay organized. Stay productive.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-500/10 hover:text-purple-300 transition"
        >
          📊
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-500/10 hover:text-purple-300 transition"
        >
          ✅
          <span>Tasks</span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-500/10 hover:text-purple-300 transition"
        >
          👤
          <span>Profile</span>
        </button>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition font-semibold"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}