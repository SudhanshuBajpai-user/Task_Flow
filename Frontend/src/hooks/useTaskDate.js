import { useMemo } from "react";

export const useTaskDate = (tasks = []) => {
  const formatLocalDate = (date) => {
    const d = new Date(date);
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  };

  const today = formatLocalDate(new Date());

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = formatLocalDate(tomorrowDate);

  const dayAfterTomorrowDate = new Date();
  dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);
  const dayAfterTomorrow = formatLocalDate(dayAfterTomorrowDate);

  return useMemo(() => {
    let todayTasks = [];
    let tomorrowTasks = [];
    let upcomingTasks = [];
    let dueTasks = [];

    tasks.forEach((task) => {
      if (!task || !task.date) return;

      const taskDate = formatLocalDate(task.date);

      if (taskDate < today ) {
        dueTasks.push(task);
      } else if (taskDate === today ) {
        todayTasks.push(task);
      } else if (taskDate === tomorrow ) {
        tomorrowTasks.push(task);
      } else if (taskDate >= dayAfterTomorrow ) {
        upcomingTasks.push(task);
      }
    });

    const completedTasks = tasks.filter((t) => t?.complete);

    const percent =
      tasks.length === 0 ? 0 : (completedTasks.length / tasks.length) * 100;

    upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    dueTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      todayTasks,
      tomorrowTasks,
      upcomingTasks,
      dueTasks,
      completed: completedTasks,
      percent,
    };
  }, [tasks]);
};
