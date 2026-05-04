import React, { useState } from "react";
import InputField from "../components/Inputfields";
import Button from "../components/Button";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res.status === 200) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.log("ERROR:", err.response);

      const status = err.response?.status;

      if (status === 400) {
        toast.error("Invalid credentials");
      } else if (status === 403) {
        toast.error("Email not verified");
        setTimeout(() => {
          navigate("/verify-email", {
            state: { email: err.response?.data?.email },
          });
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <Button
          text={loading ? "Logging in..." : "Login"}
          type="submit"
          disabled={loading}
        />

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
