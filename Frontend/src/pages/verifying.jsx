import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailToken } from "../services/api";

export default function Verifying() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
  const verify = async () => {
    try {
      console.log("CALLING API...");

      const res = await verifyEmailToken(token);

      console.log("API RESPONSE:", res); // 👈 check this

      navigate("/");

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  verify();
}, [token]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#020617] text-white">
      {status === "loading" && (
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-purple-500 rounded-full mx-auto mb-4"></div>
          <p>Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <p className="text-green-400">✅ Email verified! Redirecting...</p>
      )}

      {status === "error" && (
        <p className="text-red-400">❌ Invalid or expired link</p>
      )}
    </div>
  );
}