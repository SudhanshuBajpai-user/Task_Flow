import { useMemo, useState } from "react";
import { useTodo } from "../context/listContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Graph() {
  const { tasks } = useTodo();

  const [view, setView] = useState("7days");

  const chartData = useMemo(() => {
    const dailyData = {};

    tasks.forEach((task) => {
      const taskDate = new Date(task.date).toISOString().split("T")[0];

      if (!dailyData[taskDate]) {
        dailyData[taskDate] = {
          total: 0,
          completed: 0,
        };
      }

      dailyData[taskDate].total++;

      const completedDate = task.completedAt
        ? new Date(task.completedAt).toISOString().split("T")[0]
        : null;

      if (task.complete && completedDate === taskDate) {
        dailyData[taskDate].completed++;
      }
    });

    const formatted = Object.entries(dailyData)
      .map(([date, values]) => ({
        date,
        total: values.total,
        completed: values.completed,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return view === "7days" ? formatted.slice(-7) : formatted.slice(-30);
  }, [tasks, view]);

  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Productivity Analytics
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Total Tasks vs Completed Tasks
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("7days")}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              view === "7days"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-300"
            }`}
          >
            Last 7 Days
          </button>

          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              view === "month"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-300"
            }`}
          >
            Last Month
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            {/* Total Tasks */}
            <Bar dataKey="total" fill="#6366f1" radius={[8, 8, 0, 0]} />

            {/* Completed Tasks */}
            <Bar dataKey="completed" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
