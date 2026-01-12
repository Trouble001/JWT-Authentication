import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSelectedQuiz } from "../features/quizSlice";
import { useEffect } from "react";

export default function QuizResult() {
  const { user } = useSelector((state) => state.auth);
  const { result, selectedQuiz } = useSelector((state) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearSelectedQuiz());
    navigate("/");
  };

  if (!result) {
    return <p>No result ot display.</p>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-300">Quiz Result</h2>
      <div className="bg-white dark:bg-slate-950 flex flex-col items-start justify-center outline outline-slate-200 dark:outline-slate-800 p-4 rounded-md shadow mt-4">
        <h4 className="text-lg text-slate-700 dark:text-slate-200">Mr/Miss - <strong>{user.full_name}</strong></h4>
        <h4 className="text-md text-slate-700 dark:text-slate-300">You are successfully attempt the subject <strong>"{selectedQuiz?.title}"</strong> level quiz and scored <strong>{result.score}</strong> out of <strong>{selectedQuiz?.questions.length}</strong>. We will wish you success for your upcoming quiz context. Good Luck!</h4>
        <button
          className="text-sm font-medium text-rose-50 bg-rose-500 dark:bg-rose-600 mt-4 flex items-center justify-center rounded py-1.5 px-3 cursor-pointer"
          onClick={handleClick}>Back to Home</button>
      </div>
    </div>
  );
}