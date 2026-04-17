import { useTodo } from "../context/listContext";
import { completeTasks } from "../services/api";

export function useCompleteTask() {
  const { tasks, setTasks } = useTodo();

  const completeTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const res = await completeTasks(id, {
        complete: !task.complete,
      });

      if (res.status === 200) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data.task : t))
        );
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return { completeTask };
}