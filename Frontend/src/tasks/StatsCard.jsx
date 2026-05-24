export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-[#111827] p-5 rounded-2xl border border-white/10 shadow-lg">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>

      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}