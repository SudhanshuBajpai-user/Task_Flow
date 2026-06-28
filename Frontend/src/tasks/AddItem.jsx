import { useTodo } from "../context/listContext";
import { addUserTask } from "../services/api";

import { useState } from "react";

import toast from "react-hot-toast";

function AddItem() {
  const { setTasks } = useTodo();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    priority: "Low",
    complete: false,
    date: "",
    tag: "",
  });

  /* ---------------- TODAY DATE ---------------- */

  const todayDate = new Date().toISOString().split("T")[0];

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SUBMIT ---------------- */

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
        tag: form.tag,
      });

      if (response.status === 201) {
        setTasks((prev) => [...prev, response.data]);

        toast.success("Task added successfully!");

        setForm({
          title: "",
          priority: "Low",
          complete: false,
          date: "",
          tag: "",
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
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
      "
    >
      {/* Title */}
      <div>
        <label
          className="
            text-sm
            text-gray-400
            mb-2
            block
          "
        >
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Write your task..."
          className="
            w-full
            bg-[#020617]
            border border-gray-700
            rounded-2xl
            px-4 py-3
            text-sm text-white
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
            transition
          "
        />
      </div>

      {/* Priority + Date */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        {/* Priority */}
        <div>
          <label
            className="
              text-sm
              text-gray-400
              mb-2
              block
            "
          >
            Priority
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="
              w-full
              bg-[#020617]
              border border-gray-700
              rounded-2xl
              px-4 py-3
              text-sm text-white
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              transition
            "
          >
            <option value="Low">🟢 Low</option>

            <option value="Medium">🟡 Medium</option>

            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            className="
              text-sm
              text-gray-400
              mb-2
              block
            "
          >
            Due Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            min={todayDate}
            required
            onChange={handleChange}
            className="
              w-full
              bg-[#020617]
              border border-gray-700
              rounded-2xl
              px-4 py-3
              text-sm text-gray-300
              cursor-pointer
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              transition
              color-scheme-dark
              [&::-webkit-calendar-picker-indicator]:invert
              [&::-webkit-calendar-picker-indicator]:opacity-70
              hover:[&::-webkit-calendar-picker-indicator]:opacity-100
            "
          />
        </div>
      </div>

      {/* Tag */}
      <div>
        <label
          className="
            text-sm
            text-gray-400
            mb-2
            block
          "
        >
          Tag
        </label>

        <input
          type="text"
          name="tag"
          value={form.tag}
          onChange={handleChange}
          placeholder="Example: Work"
          className="
            w-full
            bg-[#020617]
            border border-gray-700
            rounded-2xl
            px-4 py-3
            text-sm text-white
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
            transition
          "
        />

        <p
          className="
            text-xs
            text-gray-500
            mt-2
          "
        >
          Only one tag allowed
        </p>
      </div>

      {/* Submit */}
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
          rounded-2xl
          font-medium
          hover:opacity-90
          transition-all
          disabled:opacity-50
          disabled:cursor-not-allowed
          shadow-lg
          shadow-purple-500/20
        "
      >
        {loading ? "Adding..." : "+ Add Task"}
      </button>
    </form>
  );
}

export default AddItem;
