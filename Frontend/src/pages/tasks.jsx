import { useState } from "react";
import { useTodo } from "../context/listContext";
import { useTaskDate } from "../hooks/useTaskDate";
import TaskList from "../components/tasks/TaskList";
import EditTaskModal from "../components/tasks/EditTasksModel";
import { useCompleteTask } from "../components/completed";
import { useStartTask } from "../hooks/useStartTasks";
import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { logoutUser, deleteTasks } from "../services/api";
import { useLocation } from "react-router-dom";

export default function Tasks() {
  useStartTask();
  const navigate = useNavigate();
const location = useLocation();
  const { tasks, setTasks } = useTodo();
  const {
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    dueTasks,
  } = useTaskDate(tasks);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { completeTask } = useCompleteTask();

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit
  const handleEdit = (id) => {
    setSelectedTaskId(id);
    setIsEditOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        navigate={navigate}
        className="hidden md:flex bg-[#020617]/95"
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-white">
          My Tasks
        </h1>

        {/* Sections */}
        <div className="grid gap-8">
          
          <TaskList
            title="Today"
            tasks={todayTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />

          <TaskList
            title="Tomorrow"
            tasks={tomorrowTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />

          <TaskList
            title="Due Tasks"
            tasks={dueTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />

          <TaskList
            title="Completed Tasks"
            tasks={completedTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />

          <TaskList
            title="Upcoming Tasks"
            tasks={upcomingTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />
        </div>

        {/* Modal */}
        <EditTaskModal
          isOpen={isEditOpen}
          taskId={selectedTaskId}
          onClose={() => setIsEditOpen(false)}
        />
      </div>
    </div>
  );
}