import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <h4 className="text-3xl text-center text-rose-600 font-bold mb-6">Login</h4>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="relative"
      />
      <button type="button" className="-ml-8 mt-3 absolute">
        {showPassword ? (
          <HiEyeSlash
          className="text-xl text-slate-800 dark:text-slate-100"
          onClick={handleToggle}
        />
        ) : (
          <HiEye
          className="text-xl text-slate-800 dark:text-slate-100"
          onClick={handleToggle}
        />
        )}
      </button>
      <Button
        type="submit"
        name={loading ? "Logging in..." : "Login"}
        disabled={loading}
      />
    </form>
  );
}