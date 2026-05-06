export default function CompletedTasks({
  title = "Completed Tasks",
  tasks = [],
  onDelete,
}) {
  const completed = tasks.filter((task) => Boolean(task.complete));

  return (
    <div className="bg-[#0f172a] rounded-2xl shadow-md p-5 border border-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>

      {completed.length === 0 ? (
        <p className="text-gray-500 text-sm">No completed tasks</p>
      ) : (
        <div className="space-y-2">
          {completed.map((task) => (
            <div
              key={task._id}
              className="
                flex justify-between items-center
                bg-[#020617] p-3 rounded-xl
                border border-white/5
                opacity-70
              "
            >
              {/* ✅ Strike-through text */}
              <p className="text-sm text-gray-300 line-through">
                {task.title}
              </p>

              {/* ✅ Delete */}
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-400 hover:text-red-500"
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