import { useProfile } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useProfile();

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/profile")}
      className="
        flex
        items-center
        gap-3

        bg-[#0f172a]

        border
        border-white/10

        rounded-2xl

        px-4
        py-2

        hover:bg-[#172033]
        hover:border-purple-500/40

        transition-all
        duration-200
      "
    >
      {/* Profile Photo */}
      <img
        src={
          user?.profilePhoto ||
          `https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${encodeURIComponent(
            user?.name || "User"
          )}`
        }
        alt="Profile"
        className="
          w-12
          h-12

          rounded-full

          object-cover

          border-2
          border-purple-500
        "
      />

      {/* User Details */}
      <div className="text-left">

        <h2
          className="
            text-white
            font-semibold
            text-base
            leading-none
          "
        >
          {user?.name || "Loading..."}
        </h2>

        <p
          className="
            text-xs
            text-gray-400
            mt-1
          "
        >
          {user?.email || "No Email"}
        </p>

      </div>
    </button>
  );
}