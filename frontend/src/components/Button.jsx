import React from "react";

export default function Button({ disabled, name, type }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full bg-yellow-600 text-white outline outline-yellow-600 hover:bg-yellow-700 px-8 py-2 shadow rounded-md cursor-pointer"
      >{name}</button>
  );
}