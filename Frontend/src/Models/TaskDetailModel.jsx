import { useTodo } from "../context/listContext";

import { subTaskComplete } from "../services/api";

export default function TaskDetailsModal({
  task,
  onClose,
  onEdit,
  onDelete,
  addSubtask,
}) {
  const { setTasks } = useTodo();

  if (!task) return null;

  /* ---------------- COMPLETE SUBTASK ---------------- */

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
        backdrop-blur-sm
      "
    >
      {/* Modal */}
      <div
        className="
          bg-[#0f172a]
          w-full max-w-lg
          rounded-3xl
          border border-white/10
          p-6
          shadow-2xl
          max-h-[85vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2
              className="
                text-2xl
                font-semibold
                text-white
                break-all
              "
            >
              {task.title}
            </h2>

            {/* Tags */}
            <div
              className="
              flex gap-2
              mt-3
              flex-wrap
            "
            >
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

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div
          className="
          h-px
          bg-white/10
          my-6
        "
        />

        {/* Subtasks */}
        <div>
          <div
            className="
            flex justify-between
            items-center
            mb-4
          "
          >
            <h3
              className="
                text-sm
                text-gray-400
                uppercase
                tracking-wide
              "
            >
              Subtasks
            </h3>

            <button
              onClick={() => addSubtask(task._id)}
              className="
                text-sm
                px-3 py-1.5
                rounded-xl
                bg-blue-500/20
                text-blue-300
                hover:bg-blue-500/30
                transition
              "
            >
              + Add
            </button>
          </div>

          <div className="space-y-3">
            {task.subtasks?.length > 0 ? (
              task.subtasks.map((subtask, index) => (
                <div
                  key={index}
                  className="
                      flex items-center gap-3
                      bg-white/5
                      p-3
                      rounded-2xl
                      border border-white/5
                    "
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={subtask.complete}
                    onChange={() =>
                      handleSubTaskComplete(task._id, subtask._id)
                    }
                    className="
                        accent-blue-500
                        w-4 h-4
                        cursor-pointer
                      "
                  />

                  {/* Subtask Title */}
                  <span
                    className={`
                        text-sm
                        transition

                        ${
                          subtask.complete
                            ? "line-through text-gray-500"
                            : "text-white"
                        }
                      `}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))
            ) : (
              <div
                className="
                  text-center
                  py-8
                  text-gray-500
                  text-sm
                  bg-white/5
                  rounded-2xl
                "
              >
                No subtasks yet
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="
          flex gap-3
          mt-8
        "
        >
          {/* Edit */}
          <button
            onClick={() => onEdit(task._id)}
            className="
              flex-1
              py-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition
            "
          >
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="
              flex-1
              py-3
              rounded-2xl
              bg-red-500/20
              text-red-300
              hover:bg-red-500/30
              transition
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
