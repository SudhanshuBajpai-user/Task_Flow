import Sidebar from "../components/layout/Sidebar";
import Profile from "../components/layout/Profile";
import StatsCard from "../components/tasks/StatsCard";
import TaskList from "../components/tasks/TaskList";
import AddTaskModal from "../components/tasks/AddTaskModel";
import FloatingButton from "../components/layout/FloatingButton";

import { deleteTasks, logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";

import { useCompleteTask } from "../components/completed";
import { useStartTask } from "../hooks/useStartTasks";
import { useTaskDate } from "../hooks/useTaskDate";
import { useTodo } from "../context/listContext";
import { useState } from "react";

export default function Dashboard() {
  useStartTask(); // initial fetch

  const { tasks, setTasks, loading } = useTodo();
  const navigate = useNavigate();

  const { todayTasks, tomorrowTasks, completed } = useTaskDate(tasks);
  const { completeTask } = useCompleteTask();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔐 Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b1220] text-white">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} navigate={navigate} className="hidden md:flex" />

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* 🔥 Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          {/* Profile top-right */}
          <div className="hover:bg-white/10 p-2 rounded-xl transition">
            <Profile />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* 📊 Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard title="Total" value={tasks.length} />
              <StatsCard
                title="Completed"
                value={completed.length}
                color="text-green-400"
              />
              <StatsCard title="Pending" value={tasks.length - completed.length} />
            </div>

            {/* 📋 Task Lists */}
            <TaskList
              title="Today"
              tasks={todayTasks}
              onDelete={handleDelete}
              onComplete={completeTask}
            />

            <TaskList
              title="Tomorrow"
              tasks={tomorrowTasks}
              onDelete={handleDelete}
              onComplete={completeTask}
            />
          </>
        )}

        {/* ➕ Add Task (temporary, will replace with modal later) */}
        <FloatingButton onClick={() => setIsModalOpen(true)} />

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}
