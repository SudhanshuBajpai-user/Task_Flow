export default function TaskList({
  title,
  tasks=[],
  onDelete,
  onComplete,
  onEdit,
}) {
  const pendingTasks = tasks.filter((task) => !task.complete);

  return (
    <div className="bg-[#0f172a] rounded-2xl shadow-md p-5 border border-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>

      {pendingTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks available</p>
      ) : (
        <div className="space-y-2">
          {pendingTasks.map((task) => (
            <div
              key={task._id}
              onDoubleClick={() => onEdit(task._id)}
              className="flex justify-between items-center bg-[#020617] p-3 rounded-xl border border-white/5 hover:border-purple-500/40 transition group cursor-pointer"
            >
              <div className="flex items-center gap-3 bg-[#020617] hover:bg-[#020617]/80 
rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.complete || false}
                  onChange={() => onComplete(task._id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 accent-purple-500"
                />

                <p className="text-sm text-white" title="Double click to edit">
                  {task.title}
                </p>
              </div>

              <button
                onClick={() => onDelete(task._id)}
                className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-500"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}