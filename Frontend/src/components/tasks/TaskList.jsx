import { useState } from "react";
export default function TaskList({
  title,
  tasks = [],
  onDelete,
  onComplete,
  onEdit,
  isOpen,
}) {
  const pendingTasks = tasks.filter((task) => !task.complete);
  const [openMenuId, setOpenMenuId] = useState(null);

  const priorityStyles = {
    low: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400",
  };

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
              {/* Left */}
              <div className="flex items-center gap-3">
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

              {/* Right */}
              <div className="flex items-center gap-3 relative">
                {/* Priority Badge */}
                <span
                  className={`
      text-xs px-2 py-1 rounded-md capitalize
      ${priorityStyles[task.priority] || "bg-gray-500/20 text-gray-400"}
    `}
                >
                  {task.priority}
                </span>

                {/* Three dots button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setOpenMenuId(openMenuId === task._id ? null : task._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-white px-1"
                >
                  ⋮
                </button>

                {/* Dropdown */}
                {openMenuId === task._id && (
                  <div className="absolute right-0 top-8 w-40 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <button
                      onClick={() => onEdit(task._id)}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onComplete(task._id)}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => onDelete(task._id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
