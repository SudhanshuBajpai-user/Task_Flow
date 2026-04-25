import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../services/api";

export default function Verify({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const check = async () => {
      try {
        await verifyUser();
        setStatus("success");
      } catch {
        setStatus("fail");
      }
    };

    check();
  }, []);

  if (status === "loading") {
    return <div>Checking...</div>;
  }

  if (status === "fail") {
    return <Navigate to="/login" replace />;
  }

  return children;
}