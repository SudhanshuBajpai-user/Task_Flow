import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificationLink } from "../services/api";

export default function VerifyEmail() {
  const location = useLocation();
  const data = location.state;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.email) {
      console.log(data.email);
    }
  }, [data]);

  const handleVerify = async () => {
    if (!data?.email) return;

    try {
      setLoading(true);
      await verificationLink(data.email);
      alert("Verification link sent to your email!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
      <div className="w-full max-w-md bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-lg space-y-6">
        
        <h2 className="text-xl font-semibold text-center">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-400 text-center">
          Click below to receive a verification link
        </p>

        <div className="bg-[#0f172a] p-3 rounded-xl border border-white/10 text-sm text-gray-300 text-center">
          {data?.email || "No email found"}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`
            w-full py-3 rounded-xl font-medium text-white transition
            ${loading 
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            }
          `}
        >
          {loading ? "Sending..." : "Send Verification Link"}
        </button>

      </div>
    </div>
  );
}