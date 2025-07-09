import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", full_name: "", password: "" });
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
      await axios.post("register/", form);
      navigate("/auth");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h4 className="text-xl text-center text-slate-800 font-medium mb-4">Create Account</h4>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Full Name"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} name="Register" />
    </div>
  );
}