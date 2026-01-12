import React from "react";

export default function Button({ disabled, name, type }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full bg-linear-to-r from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-600 text-rose-50 font-semibold outline outline-red-500 dark:outline-red-600 hover:from-rose-600 hover:to-red-600 px-8 py-2.5 shadow rounded-md cursor-pointer transition-colors duration-100"
      >{name}</button>
  );
}