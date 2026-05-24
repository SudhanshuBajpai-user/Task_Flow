import { useState } from "react";

export default function TaskList({
  title,
  tasks = [],
  onDelete,
  onComplete,
  onEdit,
  addSubtask,
  openTask,
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
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task._id}
              onClick={() => openTask(task)}
              className={`
                flex justify-between items-center
                p-4 rounded-2xl
                transition-all duration-300
                group cursor-pointer
                border

                ${
                  task.priority === "high"
                    ? `
                      border-red-500/70
                      bg-gradient-to-r
                      from-red-500/10
                      to-red-500/[0.03]

                      shadow-[0_0_25px_rgba(239,68,68,0.15)]
                    `
                    : task.priority === "medium"
                      ? `
                      border-yellow-500/40
                      bg-yellow-500/[0.03]
                    `
                      : `
                      border-green-500/30
                      bg-green-500/[0.02]
                    `
                }

                hover:scale-[1.01]
              `}
            >
              {/* Left Side */}
              <div className="flex items-center gap-3">
                {/* Rounded Checkbox */}
                <input
                  type="checkbox"
                  checked={task.complete || false}
                  onChange={() => onComplete(task._id)}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    w-5 h-5
                    rounded-full
                    border border-white/20
                    bg-[#0f172a]
                    accent-purple-500
                    cursor-pointer
                    overflow-hidden
                  "
                />

                {/* Task Content */}
                <div>
                  <p
                    className={`
                      text-sm font-medium

                      ${
                        task.priority === "high" ? "text-red-100" : "text-white"
                      }
                    `}
                    title="Double click to edit"
                  >
                    {task.title}
                  </p>

                  {/* Tags */}
                  {task.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="
                              text-[10px]
                              px-2 py-1
                              rounded-full
                              bg-purple-500/20
                              text-purple-300
                              border border-purple-500/20
                            "
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3 relative">
                {/* Priority Badge */}
                <span
                  className={`
                    text-xs px-2 py-1 rounded-md capitalize
                    ${
                      priorityStyles[task.priority] ||
                      "bg-gray-500/20 text-gray-400"
                    }
                  `}
                >
                  {task.priority}
                </span>

                {/* Three Dots */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setOpenMenuId(openMenuId === task._id ? null : task._id);
                  }}
                  className="
                    opacity-0
                    group-hover:opacity-100
                    transition
                    text-gray-400
                    hover:text-white
                    px-1
                    text-lg
                  "
                >
                  ⋮
                </button>

                {/* Dropdown Menu */}
                {openMenuId === task._id && (
                  <div
                    className="
                      absolute
                      right-0 top-10
                      w-44
                      bg-[#1e293b]
                      border border-white/10
                      rounded-2xl
                      shadow-2xl
                      overflow-hidden
                      z-50
                      backdrop-blur-xl
                    "
                  >
                    <button
                      onClick={() => onEdit(task._id)}
                      className="
                        block w-full text-left
                        px-4 py-3 text-sm
                        text-white
                        hover:bg-white/10
                        transition
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => addSubtask(task._id)}
                      className="
                        block w-full text-left
                        px-4 py-3 text-sm
                        text-white
                        hover:bg-white/10
                        transition
                      "
                    >
                      Add Subtasks
                    </button>

                    <button
                      onClick={() => onDelete(task._id)}
                      className="
                        block w-full text-left
                        px-4 py-3 text-sm
                        text-red-400
                        hover:bg-red-500/10
                        transition
                      "
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
