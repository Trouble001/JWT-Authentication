import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../features/authSlice";
import { Navigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ uid, token, password })).unwrap();
      console.log("Password reset successful!");
      navigate("/reset-success");
    } catch (error) {
      console.error(error || "Failed to reset password");
    }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border border-slate-300 dark:border-slate-800 px-10 py-8 rounded-md">
        <h2 className="text-lg font-medium text-center text-slate-900 dark:text-slate-200 mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
          <Input
            type="password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            name={loading ? 'Resetting...' : 'Reset'}></Button>
        </form>
      </div>
    </div>
  );
}