import Sidebar from "../layout/Sidebar";
import Profile from "../layout/Profile";
import StatsCard from "../tasks/StatsCard";
import TaskList from "../tasks/TaskList";
import AddTaskModal from "../Models/AddTaskModel";
import EditTaskModal from "../tasks/EditTasksModel";
import FloatingButton from "../layout/FloatingButton";
import Graph from "../components/Graph";
import AddSubtask from "../tasks/AddSubtasks";
import TaskDetailsModal from "../Models/TaskDetailModel";
import { useStartTask } from "../hooks/useStartTasks";
import { useStartProfile } from "../hooks/useUserProfile";

import { deleteTasks, logoutUser } from "../services/api";

import { useNavigate } from "react-router-dom";

import { useCompleteTask } from "../components/completed";
import { useTaskDate } from "../hooks/useTaskDate";
import { useTodo } from "../context/listContext";
import { useProfile } from "../context/userContext";

import { useState } from "react";

export default function Dashboard() {

  useStartTask();
  useStartProfile();


  const { tasks, setTasks, loading } = useTodo();

  const navigate = useNavigate();

  const { todayTasks, tomorrowTasks, completed } = useTaskDate(tasks);

  const { completeTask } = useCompleteTask();

  /* ---------------- MODALS ---------------- */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  /* ---------- SUBTASK MODAL ---------- */

  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const [selectedSubTaskId, setSelectedSubTaskId] = useState(null);

  /* ---------- TASK DETAILS ---------- */

  const [showTaskDetails, setShowTaskDetails] = useState(false);

  /* ---------------- IMPORTANT ---------------- */

  // derive fresh task every rerender
  const selectedTask = tasks.find((task) => task._id === selectedTaskId);

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (id) => {
    setSelectedTaskId(id);

    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-[#0b1220] text-white">
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        navigate={navigate}
        className="hidden md:flex"
      />

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-2">
            <Profile />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="
                animate-spin
                rounded-full
                h-12 w-12
                border-b-2
                border-purple-500
              "
            />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
            >
              <StatsCard title="Total" value={tasks.length} />

              <StatsCard
                title="Completed"
                value={completed.length}
                color="text-green-400"
              />

              <StatsCard
                title="Pending"
                value={tasks.length - completed.length}
              />
            </div>

            {/* Today Tasks */}
            <TaskList
              title="Today"
              tasks={todayTasks}
              onDelete={handleDelete}
              onComplete={completeTask}
              onEdit={handleEdit}
              addSubtask={(taskId) => {
                setSelectedSubTaskId(taskId);

                setShowSubtaskModal(true);
              }}
              openTask={(task) => {
                setSelectedTaskId(task._id);
                setShowTaskDetails(true);
              }}
            />

            {/* Tomorrow Tasks */}
            <TaskList
              title="Tomorrow"
              tasks={tomorrowTasks}
              onDelete={handleDelete}
              onComplete={completeTask}
              onEdit={handleEdit}
              addSubtask={(taskId) => {
                setSelectedSubTaskId(taskId);

                setShowSubtaskModal(true);
              }}
              openTask={(task) => {
                setSelectedTaskId(task._id);
                setShowTaskDetails(true);
              }}
            />
          </>
        )}

        {/* Graph */}
        <Graph />

        {/* Floating Add Button */}
        <FloatingButton onClick={() => setIsModalOpen(true)} />

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Edit Modal */}
        <EditTaskModal
          isOpen={isEditOpen}
          taskId={selectedTaskId}
          onClose={() => setIsEditOpen(false)}
        />

        {/* Add Subtask Modal */}
        {showSubtaskModal && (
          <div
            className="
              fixed inset-0
              bg-black/50
              flex items-center
              justify-center
              z-50
            "
          >
            <div className="w-full max-w-md">
              <AddSubtask
                taskId={selectedSubTaskId}
                onClose={() => setShowSubtaskModal(false)}
              />
            </div>
          </div>
        )}

        {/* Task Details Modal */}
        {showTaskDetails && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setShowTaskDetails(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addSubtask={(taskId) => {
              setSelectedSubTaskId(taskId);

              setShowSubtaskModal(true);
            }}
          />
        )}
      </main>
    </div>
  );
}
