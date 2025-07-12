import React, { useState } from "react";
import Login from "../components/Login";
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
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-11/12 lg:w-8/12 outline outline-slate-300 px-10 py-8 rounded-md shadow-md">
          {isLogin ? <Login /> : <Register />}
          <div className={`mt-2 flex items-center justify-between`}>
            <div className="flex items-center justify-center">
              <p className="mr-1 text-md text-slate-800">{isLogin ? 'Dont have an account?' : 'Already have an account?'}</p>
              <button className="text-slate-800 cursor-pointer" onClick={handleToggle}>{isLogin ? 'Register' : 'Login'}</button>
            </div>
            {isLogin && (
              <a className="text-slate-800 cursor-pointer" href="/forgot-password">Forgot Password</a>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-slate-800 font-bold text-8xl lg:text-9xl drop-shadow">imagery</h2>
        {/* <p className="text-slate-600 font-medium text-xl">Indias top quiz plateform with 1000+ Questions</p> */}
      </div>
    </div>
  );
}