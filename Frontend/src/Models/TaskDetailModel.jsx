export default function TaskDetailsModal({
  task,
  onClose,
  onEdit,
  onDelete,
  addSubtask,
}) {
  if (!task) return null;

  return (
    <div className="
      fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
    ">
      <div className="
        bg-[#0f172a]
        w-full max-w-lg
        rounded-3xl
        border border-white/10
        p-6
        shadow-2xl
      ">

        {/* Header */}
        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-2xl font-semibold text-white">
              {task.title}
            </h2>

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
          <h3 className="text-sm text-gray-400 mb-3">
            Subtasks
          </h3>

          <div className="space-y-2">
            {task.subtasks?.length > 0 ? (
              task.subtasks.map((subtask, index) => (
                <div
                  key={index}
                  className="
                    flex items-center gap-3
                    bg-white/5
                    p-3
                    rounded-xl
                  "
                >
                  <input
                    type="checkbox"
                    checked={subtask.complete}
                    readOnly
                    className="accent-blue-500"
                  />

                  <span className="text-white text-sm">
                    {subtask.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No subtasks yet
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="
          mt-8
          flex gap-3
        ">
          <button
            onClick={() => onEdit(task._id)}
            className="
              flex-1
              bg-white/10
              hover:bg-white/20
              py-3
              rounded-xl
              transition
            "
          >
            Edit
          </button>

          <button
            onClick={() => addSubtask(task._id)}
            className="
              flex-1
              bg-blue-500/20
              text-blue-300
              hover:bg-blue-500/30
              py-3
              rounded-xl
              transition
            "
          >
            Add Subtask
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="
              flex-1
              bg-red-500/20
              text-red-300
              hover:bg-red-500/30
              py-3
              rounded-xl
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