import React from "react";

export default function Button({ onClick, name }) {
  return (
    <button className="w-full bg-green-600 text-white outline outline-green-600 hover:bg-green-700 px-8 py-2 shadow rounded-md cursor-pointer" onClick={onClick}>{name}</button>
  );
}