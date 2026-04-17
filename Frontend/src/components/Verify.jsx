import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyUser } from "../services/api";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await verifyUser();

        console.log("Verification success");

        if (res.status === 200) {
          navigate("/dashboard");
        }

      } catch (err) {
        console.log("Verification failed:", err);
        navigate("/login");
      }
    };

    check();
  }, [navigate]);

  return <div>Checking...</div>;
};

export default Verify;