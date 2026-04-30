import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { registerUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", full_name: "", password: "" });
  const [checkPass, setCheckPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (form.password !== checkPass) {
      alert("Password do not match!");
    } else {
        try {
          await dispatch(registerUser(form)).unwrap();
          navigate("/");
          console.log("Registration Successful!");
        } catch (error) {
          console.log(error);
        }
    }
  };

  const handleToggle = () => {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <h4 className="text-3xl text-center text-rose-600 font-bold mb-6">Create an account</h4>
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
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        name="password2"
        value={checkPass}
        onChange={(e) => setCheckPass(e.target.value)}
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
        name={loading ? "Creating..." : "Create"}
        disabled={loading}
      />
    </form>
  );
}