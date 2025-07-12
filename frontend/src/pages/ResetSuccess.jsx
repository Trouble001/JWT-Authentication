import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ResetSuccess() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.opener) {
        window.close();
      } else {
        window.location.href = "/auth";
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center">
      <h4 className="text-3xl text-slate-300">Your password has been successfully reset!</h4>
      <h4 className="text-lg text-slate-400">wait a moment while we redirecting you to the login...</h4>
    </div>
  );
}