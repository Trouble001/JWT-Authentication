import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className="w-full h-full">
      <h4 className="text-2xl text-slate-900 dark:text-slate-200 font-medium">Settings</h4>
      <ul className="shadow mt-2">
        <li className="px-2 py-2 border-b border-slate-300 dark:border-slate-700 flex items-center justify-between">
          <label className="text-slate-800 dark:text-slate-200">Color Preferences</label>
          <button onClick={toggleTheme} className={`w-12 rounded-full border p-0.5 flex items-center cursor-pointer ${theme === 'dark' ? 'bg-rose-500 border-rose-500' : 'bg-white border-slate-200 dark:border-white'} transition-all duration-500 ease-in-out`}>
            <div className={`w-6 h-5.5 drop-shadow ${theme === 'dark' ? 'bg-slate-100 translate-x-4.5' : 'bg-slate-700 translate-x-0'} rounded-full transition-all duration-500 ease-in-out`}></div>
          </button>
        </li>
      </ul>
    </div>
  );
}