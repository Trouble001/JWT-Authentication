import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { forgotPassword } from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      console.log("Reset link sent to your email")
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      console.error(error || "Could not send reset link");
    }
  }

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border border-slate-300 dark:border-slate-800 px-10 py-8 rounded-md">
        <h2 className="text-lg font-medium text-center text-slate-900 dark:text-slate-200 mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
          <Input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            name={loading ? 'Sending...' : 'Send Reset Link'}></Button>
        </form>
      </div>
    </div>
  );
}