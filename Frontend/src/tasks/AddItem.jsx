import { useTodo } from "../context/listContext";
import { useStartTask } from "../hooks/useStartTasks";
import { addUserTask } from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

function AddItem() {
const { tasks, setTasks } = useTodo();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    priority: "Low",
    complete: false,
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    setLoading(true);

    try {
      const response = await addUserTask({
        title: form.title,
        priority: form.priority.toLowerCase(),
        complete: form.complete,
        date: form.date,
      });

      if (response.status === 201) {
        setTasks((prev) => [...prev, response.data]);
        toast.success("Task added successfully!");
        setForm({
          title: "",
          priority: "Low",
          complete: false,
          date: "",
        });
      }
    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task Input */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Write your task..."
        className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Row: Priority + Date */}
      <div className="flex gap-3">
        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="flex-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="flex-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl disabled:opacity-50"
      >
        {loading ? "Adding..." : "+ Add Task"}
      </button>
    </form>
  );
}

export default AddItem;
