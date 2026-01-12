import React from "react";

export default function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="bg-white dark:bg-slate-950 w-full px-4 py-2.5 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-800 outline-none mb-3 rounded-md"
    />
  );
}