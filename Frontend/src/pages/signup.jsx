import React, { useState } from "react";
import InputField from "../components/Inputfields";
import Button from "../components/Button";
import AuthLayout from "../layout/AuthLayout";
import { signupUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await signupUser(form);

    console.log("SUCCESS:", res);

    if (res.status === 201) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }

  } catch (err) {
    console.log("ERROR:", err.response);

    if (err.response?.status === 400) {
      toast.error("User already exists. Please login.");
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <InputField type="email" name="email" placeholder="Email Address" onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Password" onChange={handleChange} />
        <InputField type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

        <Button text={loading ? "Creating account..." : "Signup"} type="submit" disabled={loading} />

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;