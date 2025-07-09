import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-5/12 h-auto mx-auto outline outline-slate-400 px-10 py-8 rounded-md shadow-md">
        {isLogin ? <Login /> : <Register />}
        <div>
          <p className="mt-2 text-md text-slate-800">{isLogin ? 'Dont have an account?' : 'Already have an account?'}</p>
          <button onClick={handleToggle}>{isLogin ? 'Register' : 'Login'}</button>
        </div>
      </div>
    </div>
  );
}