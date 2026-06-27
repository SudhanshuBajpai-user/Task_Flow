import { useState, useEffect } from "react";
import { useProfile } from "../context/userContext";
import { updateUser } from "../services/api";
import { useTodo } from "../context/listContext";

export default function Profile() {
  const { user, setUser } = useProfile();
  const { tasks } = useTodo();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    occupation: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        location: user.location || "",
        occupation: user.occupation || "",
        profilePhoto: user.profilePhoto || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.complete).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white">
      {/* Page Title */}

      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      {/* Profile Card */}

      <div className="bg-[#0f172a] rounded-3xl border border-white/10 shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left Side */}

          <div className="flex items-center gap-6">
            {/* Avatar */}

            <div className="relative">
              <img
                src={
                  form.profilePhoto ||
                  "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=" +
                    form.name
                }
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover"
              />

              {editMode && (
                <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition">
                  📷
                </button>
              )}
            </div>

            {/* User Info */}

            <div>
              <h2 className="text-3xl font-semibold">{form.name || "User"}</h2>

              <p className="text-gray-400 mt-2">
                {form.occupation || "No Occupation Added"}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Joined{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "-"}
              </p>
            </div>
          </div>

          {/* Edit Button */}

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400">Total Tasks</h3>

          <p className="text-3xl font-bold mt-2">{totalTasks}</p>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400">Completed</h3>

          <p className="text-3xl font-bold mt-2 text-green-400">
            {completedTasks}
          </p>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400">Pending</h3>

          <p className="text-3xl font-bold mt-2 text-yellow-400">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400">Completion</h3>

          <p className="text-3xl font-bold mt-2 text-purple-400">
            {completionRate}%
          </p>
        </div>
      </div>

      {/* Personal Information */}

      <div className="bg-[#0f172a] rounded-3xl border border-white/10 mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className="
                w-full
                bg-[#020617]
                border border-white/10
                rounded-xl
                px-4 py-3
                disabled:opacity-70
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editMode}
              className="
                w-full
                bg-[#020617]
                border border-white/10
                rounded-xl
                px-4 py-3
                disabled:opacity-70
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="+91 XXXXX XXXXX"
              className="
                w-full
                bg-[#020617]
                border border-white/10
                rounded-xl
                px-4 py-3
                disabled:opacity-70
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Occupation
            </label>

            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Engineering Student"
              className="
                w-full
                bg-[#020617]
                border border-white/10
                rounded-xl
                px-4 py-3
                disabled:opacity-70
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Location</label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Kanpur, India"
              className="
                w-full
                bg-[#020617]
                border border-white/10
                rounded-xl
                px-4 py-3
                disabled:opacity-70
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Bio</label>

            <textarea
              rows="4"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Tell us something about yourself..."
              className=" w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 resize-none disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Account Information */}

      <div className="bg-[#0f172a] rounded-3xl border border-white/10 mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-6">Account Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">User ID</p>
            <p className="mt-2 break-all text-white">{user?._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email Verification</p>
            <p className="mt-2 text-green-400">
              {user?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Account Created</p>
            <p className="mt-2">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Last Updated</p>
            <p className="mt-2">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}

      {editMode && (
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              if (user) {
                setForm({
                  name: user.name || "",
                  email: user.email || "",
                  bio: user.bio || "",
                  phone: user.phone || "",
                  location: user.location || "",
                  occupation: user.occupation || "",
                  profilePhoto: user.profilePhoto || "",
                });
              }

              setEditMode(false);
            }}
            className=" px-6 py-3 rounded-xl border border-white/10 bg-[#1e293b] hover:bg-[#334155] transition"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                /*
                  TODO

                  const response =
                    await updateProfile(form);

                  setUser(response.data);

                */
                const response = await updateUser(form);
                
                setUser(response.data);

                setEditMode(false);
              } catch (err) {
                console.error(err);
              }
            }}
            className=" px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
