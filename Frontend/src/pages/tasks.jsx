import { useTodo } from "../context/listContext";
import AddItem from "../components/AddItem";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useCompleteTask} from "../components/completed";
import { deleteTasks } from "../services/api";
import { useTaskDate } from "../hooks/useTaskDate";

// ✅ Utils
const getPriorityColor = (p) => {
  const map = {
    High: "bg-red-400",
    Medium: "bg-yellow-400",
    Low: "bg-green-400",
  };
  return map[p] || "bg-gray-400";
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString();

export default function TasksPage() {
  const { tasks, setTasks } = useTodo();
  const navigate = useNavigate();
  const { completeTask } = useCompleteTask();

  const {
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    dueTasks,
    completed,
  } = useTaskDate(tasks);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ✅ Task Card
  const TaskCard = ({ task, showDate, isCompleted }) => (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        {!isCompleted && (
          <input
            type="checkbox"
            checked={!!task.complete}
            onChange={() => completeTask(task._id)}
          />
        )}

        <div>
          <p
            className={
              isCompleted
                ? "line-through text-gray-400"
                : "text-gray-800 font-medium"
            }
          >
            {task.title}
          </p>

          <div className="flex gap-2 mt-1 items-center">
            <span
              className={`text-xs px-2 py-1 rounded text-white ${getPriorityColor(task.priority)}`}
            >
              {task.priority}
            </span>

            {showDate && (
              <span className="text-xs text-gray-400">
                {formatDate(task.date)}
              </span>
            )}
          </div>
        </div>
      </div>

      {!isCompleted && (
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-400 hover:text-red-600"
        >
          ✕
        </button>
      )}
    </motion.div>
  );

  // ✅ Section Component
  const Section = ({
    title,
    tasks = [],
    color = "",
    showDate = false,
    isCompleted = false,
  }) => (
    <div className="bg-white rounded-3xl p-5 shadow-xl">
      <h2 className={`text-xl font-semibold mb-4 ${color}`}>{title}</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              showDate={showDate}
              isCompleted={isCompleted}
            />
          ))}
        </div>
      )}
    </div>
  );

  // ✅ Config-based sections (CLEAN)
  const sections = [
    { title: "Today", tasks: todayTasks },
    { title: "Tomorrow", tasks: tomorrowTasks },
    {
      title: "Due Tasks",
      tasks: dueTasks,
      color: "text-red-500",
      showDate: true,
    },
    { title: "Upcoming", tasks: upcomingTasks, showDate: true },
    { title: "Completed", tasks: completed, isCompleted: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-2 bg-white/20 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-6 shadow-lg text-white">
          <div className="text-xl font-bold mb-4">TaskFlow</div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20"
            >
              🏠 Dashboard
            </button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/30 font-medium">
              📋 Tasks
            </button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20">
              📊 Analytics
            </button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20">
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="col-span-10 space-y-6">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>

          <div className="grid grid-cols-2 gap-6">
            {sections.map((sec, i) => (
              <Section key={i} {...sec} />
            ))}
          </div>

          {/* Add Task */}
          <div className="bg-white rounded-3xl p-5 shadow-xl">
            <h2 className="mb-3 text-lg font-semibold">Add Task</h2>
            <AddItem />
          </div>
        </div>
      </div>
    </div>
  );
}