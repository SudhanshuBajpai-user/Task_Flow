export default function Sidebar({ onLogout, navigate }) {
  return (
    <aside className="w-64 bg-[#0b1220] border-r border-white/10 flex flex-col">
      <div className="p-6 text-xl font-semibold tracking-tight">
        ⚡ TaskFlow
      </div>

      <nav className="flex-1 px-3 space-y-2">
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 text-purple-400">
          📊 Dashboard
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5"
        >
          ✅ Tasks
        </button>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}