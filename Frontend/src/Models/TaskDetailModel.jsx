import { subTaskComplete } from "../services/api";

export default function TaskDetailsModal({
  task,
  onClose,
  onEdit,
  onDelete,
  addSubtask,
  setTasks,
}) {
  if (!task) return null;
  const handleSubTaskComplete = async (taskId, subTaskId) => {
    try {
      const response = await subTaskComplete(taskId, subTaskId);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === response.data._id ? response.data : task,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
    "
    >
      <div
        className="
        bg-[#0f172a]
        w-full max-w-lg
        rounded-3xl
        border border-white/10
        p-6
        shadow-2xl
      "
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-white">{task.title}</h2>

            <div className="flex gap-2 mt-3 flex-wrap">
              {task.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="
                    px-2 py-1
                    rounded-full
                    text-xs
                    bg-purple-500/20
                    text-purple-300
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
            "
          >
            ✕
          </button>
        </div>

        {/* Subtasks */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-3">Subtasks</h3>

          <div className="space-y-2">
            {task.subtasks?.length > 0 ? (
              task.subtasks.map((subtask, index) => (
                <div
                  key={index}
                  className=" flex items-center gap-3 bg-white/5 p-3 rounded-xl"
                >
                  <input
                    type="checkbox"
                    checked={subtask.complete}
                    onChange={() =>
                      handleSubTaskComplete(task._id, subtask._id)
                    }
                    className="accent-blue-500 w-4 h-4"
                  />

                  <span
                    className={`text-sm ${subtask.complete ? "line-through text-gray-500" : "text-white"}`}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No subtasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
