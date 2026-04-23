import { useTodo } from "../context/listContext";
import { useState } from "react";
import { editTask } from "../services/api";

export default function EditTask({ taskId, onClose }) {
  const { tasks, setTasks } = useTodo();

  const task = tasks.find((t) => t._id === taskId);

  const [form, setForm] = useState({
    title: task?.title || "",
    priority: task?.priority || "Low",
    date: task?.date || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await editTask(taskId, {title: form.title,
        priority: form.priority.toLowerCase(),
        date: form.date});

      if (res.status === 200) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === taskId ?{...task,title: form.title,
        priority: form.priority.toLowerCase(),
        date: form.date}: t
          )
        );

        if (onClose) onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    name="title"
    value={form.title}
    onChange={handleChange}
    placeholder="Task title"
    className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

  <select
    name="priority"
    value={form.priority}
    onChange={handleChange}
    className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
  >
    <option value="Low">🟢 Low</option>
    <option value="Medium">🟡 Medium</option>
    <option value="High">🔴 High</option>
  </select>

  <input
    type="date"
    name="date"
    value={form.date}
    onChange={handleChange}
    className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

  <button
  type="submit"
  className="
    w-full 
    bg-gradient-to-r from-purple-500 to-pink-500 
    text-white py-2.5 
    rounded-xl font-medium
    shadow-md
    hover:opacity-90 
    hover:scale-[1.01]
    active:scale-[0.98]
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  Update Task
</button>
</form>
  );
}