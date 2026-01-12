import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <div className="w-full h-14 top-0 fixed border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 z-50">
      <div className="w-11/12 h-full mx-auto flex items-center justify-between">
        <Link className="text-xl font-semibold text-slate-900 dark:text-slate-100" to="/"><span className="text-rose-600">Q</span>uizzer</Link>

      </div>
    </div>
  );
}