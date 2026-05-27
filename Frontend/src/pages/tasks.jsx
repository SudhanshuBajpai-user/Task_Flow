import { useState } from "react";

import { useTodo } from "../context/listContext";
import { useTaskDate } from "../hooks/useTaskDate";

import TaskList from "../tasks/TaskList";
import CompletedTasks from "../tasks/CompletedTasks";

import EditTaskModal from "../tasks/EditTasksModel";
import AddTaskModal from "../Models/AddTaskModel";
import AddSubtask from "../tasks/AddSubtasks";
import TaskDetailsModal from "../Models/TaskDetailModel";

import { useCompleteTask } from "../components/completed";
import { useStartTask } from "../hooks/useStartTasks";

import Sidebar from "../layout/Sidebar";
import FloatingButton from "../layout/FloatingButton";

import { useNavigate } from "react-router-dom";

import { logoutUser, deleteTasks } from "../services/api";

export default function Tasks() {
  useStartTask();

  const navigate = useNavigate();
  const { tasks, setTasks } = useTodo();
  const { todayTasks, tomorrowTasks, upcomingTasks, completedTasks, dueTasks } =
    useTaskDate(tasks);

  /* ---------------- MODALS ---------------- */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const [selectedSubTaskId, setSelectedSubTaskId] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  /* ---------------- CURRENT TASK ---------------- */

  const selectedTask = tasks.find((task) => task._id === selectedTaskId);

  /* ---------------- COMPLETE ---------------- */

  const { completeTask } = useCompleteTask();

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
    <div
      className="
        flex
        min-h-screen
        bg-[#020617]
        text-white
        overflow-x-hidden
      "
    >
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} navigate={navigate} />

      {/* Main */}
      <div
        className="
          flex-1
          h-screen
          overflow-y-auto
          overflow-x-hidden
          px-8 py-8
          min-w-0
        "
      >
        {/* Title */}
        <h1
          className="
            text-3xl
            font-semibold
            mb-8
          "
        >
          My Tasks
        </h1>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          {/* Today */}
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

          {/* Tomorrow */}
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

          {/* Due */}
          <TaskList
            title="Due Tasks"
            tasks={dueTasks}
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

          {/* Upcoming */}
          <TaskList
            title="Upcoming Tasks"
            tasks={upcomingTasks}
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

          {/* Completed */}
          <div className="xl:col-span-2">
            <CompletedTasks tasks={tasks} onDelete={handleDelete} />
          </div>
        </div>
      </div>

      {/* Floating Button */}
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
            backdrop-blur-sm
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
    </div>
  );
}
