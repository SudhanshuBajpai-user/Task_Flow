import { useEffect, useState } from "react";
import { profile } from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      {/* Name + Email */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-xs text-gray-400">{user.email}</span>
      </div>
    </div>
  );
}