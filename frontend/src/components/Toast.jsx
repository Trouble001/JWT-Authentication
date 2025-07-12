import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../features/authSlice";


export default function Toast() {
  const { message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch])

  if (!message && !error) return null;
  
  return (
    <div className="fixed top-5 right-5 z-50">
      {message && (
        <div className="bg-green-300 text-green-900 px-4 py-1.5 rounded-md shadow">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-300 text-red-900 px-4 py-1.5 rounded-md shadow">
          {error}
        </div>
      )}
    </div>
  );
}