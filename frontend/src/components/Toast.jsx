import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthMessages } from "../features/authSlice";
import { clearQuizMessages } from "../features/quizSlice";

export default function Toast() {
  const dispatch = useDispatch();

  const { message: authMessage, error: authError } = useSelector((state) => state.auth);
  const { message: quizMessage, error: quizError } = useSelector((state) => state.quiz);

  useEffect(() => {
    let timer;
    if (authMessage || authError) {
      timer = setTimeout(() => dispatch(clearAuthMessages()), 3000);
    }
    if (quizMessage || quizError) {
      timer = setTimeout(() => dispatch(clearQuizMessages()), 3000);
    }
    return () => clearTimeout(timer);
  }, [authMessage, authError, quizMessage, quizError, dispatch]);

  if (!authMessage && !authError && !quizMessage && !quizError) return null;

  return (
    <div className="fixed top-5 right-5 z-60 space-y-2 transition-all duration-100 ease-in-out">
      {authMessage && (
        <div className="bg-green-300 text-green-950 px-4 py-1.5 rounded-md shadow">
          {authMessage}
        </div>
      )}
      {authError && (
        <div className="bg-rose-300 text-rose-950 px-4 py-1.5 rounded-md shadow">
          {authError}
        </div>
      )}
      {quizMessage && (
        <div className="bg-green-300 text-green-950 px-4 py-1.5 rounded-md shadow">
          {quizMessage}
        </div>
      )}
      {quizError && (
        <div className="bg-rose-300 text-rose-950 px-4 py-1.5 rounded-md shadow">
          {quizError}
        </div>
      )}
    </div>
  );
}