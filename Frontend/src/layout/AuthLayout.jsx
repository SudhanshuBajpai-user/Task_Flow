export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[#08192f] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-[#081f43] border border-slate-800 p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
