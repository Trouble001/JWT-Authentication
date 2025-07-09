import React from "react";

export default function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 outline outline-slate-300 mb-4 rounded-md shadow"
    />
  );
}