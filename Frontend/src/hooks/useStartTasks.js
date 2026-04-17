import { useEffect } from "react";
import { useTodo } from "../context/listContext";
import { getTasks } from "../services/api";

export const useStartTask = () => {
  const { setTasks, setLoading } = useTodo();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await getTasks();
        setTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setLoading]);
};