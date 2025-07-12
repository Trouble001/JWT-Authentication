import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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

  return (
    <form onSubmit={handleSubmit} className="">
      <h4 className="text-xl text-center text-slate-900 font-medium mb-4">Login into your account</h4>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        name={loading ? "Logging in..." : "Login"}
        disabled={loading}
      />
    </form>
  );
}