import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../features/authSlice";


export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(form);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("login/", form);
      // await dispatch(fetchUser());
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h4 className="text-xl text-center text-slate-800 font-medium mb-4">Login into your account</h4>
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
      <Button onClick={handleSubmit} name="Login" />
    </div>
  );
}