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
import CompletedTasks from "../components/tasks/CompletedTasks";
import FloatingButton from "../components/layout/FloatingButton";
import AddTaskModal from "../components/tasks/AddTaskModel";


export default function Tasks() {
  useStartTask();

  const navigate = useNavigate();
  const { tasks, setTasks } = useTodo();
  
  const {
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    dueTasks,
  } = useTaskDate(tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { completeTask } = useCompleteTask();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    setSelectedTaskId(id);
    setIsEditOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* Sidebar (fixed width) */}
      <Sidebar onLogout={handleLogout} navigate={navigate} />

      {/* Main */}
      <div className="flex-1 overflow-y-auto px-8 py-8">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-8">My Tasks</h1>

        {/* 🔥 Responsive grid for laptop */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

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
            title="Upcoming Tasks"
            tasks={upcomingTasks}
            onDelete={handleDelete}
            onComplete={completeTask}
            onEdit={handleEdit}
          />

          {/* Full width row */}
          <div className="xl:col-span-2">
            <CompletedTasks tasks={tasks} onDelete={handleDelete}/>
          </div>

        </div>
      </div>
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      
              {/* Add Task Modal */}
              <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
      
      {/* Modal */}
      <EditTaskModal
        isOpen={isEditOpen}
        taskId={selectedTaskId}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}