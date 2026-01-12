import React, { useState } from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
  }

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-screen md:grid grid-cols-2 z-50 absolute">
      <div className="flex items-center justify-center bg-rose-600">
        <h2 className="text-6xl font-bold text-rose-50 drop-shadow">optional</h2>
      </div>

      <div className="w-full h-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-11/12 md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
          {isLogin ? <Login /> : <Register />}
          <div className="w-full flex items-center justify-end">
            {isLogin && <Link className="text-rose-600 cursor-pointer" to="/forgot-password">Forgot Password</Link> }
          </div>
          <div className="flex items-center justify-center mt-8">
            <p className="text-lg text-slate-800 dark:text-slate-300 mr-1">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button className="text-lg text-rose-600 cursor-pointer" onClick={handleToggle}>{isLogin ? 'Register' : 'Login'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}