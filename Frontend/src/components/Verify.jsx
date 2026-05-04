import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../services/api";

export default function Verify({ children }) {
  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        await verifyUser();
        setStatus("success");
      } catch (err) {
        const statusCode = err.response?.status;

        if (statusCode === 403) {
          setEmail(err.response?.data?.email);
          setStatus("unverified");
        } else {
          setStatus("fail");
        }
      }
    };

    check();
  }, []);

  if (status === "loading") {
    return <div className="text-white text-center mt-10">Checking...</div>;
  }

  if (status === "fail") {
    return <Navigate to="/login" replace />;
  }

  if (status === "unverified") {
    return (
      <Navigate
        to="/verify-email"
        replace
        state={{ email }}
      />
    );
  }

  return children;
}