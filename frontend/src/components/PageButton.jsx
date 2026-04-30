import React from "react";

export default function PageButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1.5 shadow bg-slate-950 text-slate-50 rounded-md cursor-pointer text-sm"
      >{name}</button>
  );
}