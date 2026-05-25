import { useState } from "react";
import { onAddSubtask } from "../services/api";
import { useContext } from "react";
import { useTodo } from "../context/listContext";

export default function AddSubtask({ taskId, onClose, setTasks }) {
  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    const response = await onAddSubtask(taskId, form.title);

    setTasks((prev) =>
      prev.map((task) =>
        task._id === response.data._id ? response.data : task,
      ),
    );

    setForm({
      title: "",
    });

    onClose();
  };

  return (
    <div className="bg-[#0f172a] p-5 rounded-2xl border border-white/10 shadow-xl w-full">
      <h2 className="text-white text-lg font-semibold mb-4">Add Subtask</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subtask Input */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Write your subtask..."
          className="
            w-full
            bg-[#020617]
            border border-gray-700
            rounded-xl
            px-4 py-3
            text-sm text-white
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          "
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            text-white
            py-3
            rounded-xl
            font-medium
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Adding..." : "+ Add Subtask"}
        </button>
      </form>
    </div>
  );
}
