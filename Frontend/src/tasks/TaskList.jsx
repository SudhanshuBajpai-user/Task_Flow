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
    low: `
      border-green-500/30
      bg-green-500/[0.02]
      shadow-[0_0_12px_rgba(34,197,94,0.08)]
    `,

    medium: `
      border-yellow-500/40
      bg-yellow-500/[0.03]
      shadow-[0_0_12px_rgba(234,179,8,0.08)]
    `,

    high: `
      border-red-500/70
      bg-gradient-to-r
      from-red-500/10
      to-red-500/[0.03]
      shadow-[0_0_25px_rgba(239,68,68,0.15)]
    `,
  };

  return (
    <div
      className="
        bg-[#0f172a]
        rounded-3xl
        shadow-xl
        p-5
        border border-gray-800
      "
    >
      {/* Header */}
      <h3
        className="
          mb-5
          text-2xl
          font-semibold
          text-white
        "
      >
        {title}
      </h3>

      {/* Empty */}
      {pendingTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks available</p>
      ) : (
        <div className="space-y-4 overflow-visible">
          {pendingTasks.map((task) => (
            <div
              key={task._id}
              onClick={() => openTask(task)}
              className={` flex justify-between items-center p-4 rounded-2xl transition-all duration-200 group cursor-pointer border hover:border-white/20 hover:shadow-xl
                ${priorityStyles[task.priority] || "border-white/10"}
              `}
            >
              {/* LEFT */}
              <div
                className="
                  flex items-center gap-4
                "
              >
                {/* Checkbox */}
                <input type="checkbox" checked={task.complete || false} onChange={() =>onComplete(task._id)}
                    onClick={(e) =>
                      e.stopPropagation()
                    }

                    className="
                      mt-1
                      min-w-5
                      min-h-5
                      appearance-none
                      rounded-full
                      border-2
                      cursor-pointer
                      transition-all duration-200
                      flex-shrink-0"
                  />

                {/* Task Content */}
                <div>
                  {/* Title */}
                  <p
                    className={`text-sm md:text-base font-medium break-words overflow-hidden text-white
                      ${
                        task.priority === "high" ? "text-red-100" : "text-white"
                      }
                    `}
                  >
                    {task.title}
                  </p>

                  {/* Tags */}
                  {task.tags?.length > 0 && (
                    <div
                      className="
                        flex flex-wrap
                        gap-2 mt-2
                      "
                    >
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="
                              text-[10px]
                              px-2 py-1
                              rounded-full
                              bg-purple-500/20
                              text-purple-300
                              border
                              border-purple-500/20
                            "
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex items-center
                  gap-3
                  relative
                "
              >
                {/* Priority */}
                <span
                  className={`
                    text-xs
                    px-3 py-1
                    rounded-xl
                    capitalize

                    ${
                      task.priority === "high"
                        ? `
                          bg-red-500/20
                          text-red-300
                        `
                        : task.priority === "medium"
                          ? `
                            bg-yellow-500/20
                            text-yellow-300
                          `
                          : `
                            bg-green-500/20
                            text-green-300
                          `
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
                  className={`
                    transition-all duration-200
                    text-gray-400
                    hover:text-white
                    px-1

                    ${
                      openMenuId === task._id
                        ? "opacity-100"
                        : `
                          opacity-0
                          group-hover:opacity-100
                        `
                    }
                  `}
                >
                  ⋮
                </button>

                {/* Dropdown */}
                {openMenuId === task._id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                      absolute
                      right-0
                      top-[120%]
                      min-w-[180px]
                      z-[9999]
                      rounded-2xl
                      border border-white/10
                      bg-[#1e293b]
                      backdrop-blur-xl
                      shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                    "
                  >
                    {/* Edit */}
                    <button
                      onClick={() => {
                        onEdit(task._id);
                        setOpenMenuId(null);
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-3
                        text-sm text-white
                        hover:bg-white/10
                        transition
                      "
                    >
                      Edit
                    </button>

                    {/* Add Subtasks */}
                    <button
                      onClick={() => {
                        addSubtask(task._id);
                        setOpenMenuId(null);
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-3
                        text-sm text-white
                        hover:bg-white/10
                        transition
                      "
                    >
                      Add Subtasks
                    </button>

                    {/* Divider */}
                    <div className="h-px bg-white/10" />

                    {/* Delete */}
                    <button
                      onClick={() => {
                        onDelete(task._id);
                        setOpenMenuId(null);
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-3
                        text-sm
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
