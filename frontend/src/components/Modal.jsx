import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitAttempt } from "../features/quizSlice";

export default function Modal({ setModalOpen, answers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { selectedQuiz, loading } = useSelector((state) => state.quiz);

  const handleConfirm = () => {
    dispatch(submitAttempt({ quizId: selectedQuiz.id, answers }))
      .then(() => {
        navigate("/quiz-result");
      });
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setModalOpen(false);
  }

  return (
    <div className="w-full h-screen z-50 fixed top-0 left-0 bg-slate-200 dark:bg-slate-900 flex items-center justify-center transition-all duration-200">
      <div className="w-8/12 sm:w-6/12 md:w-5/12 lg:w-5/12 xl:w-4/12 h-3/12 lg:h-4/12 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 mx-auto px-8 text-center rounded-2xl shadow-2xl absolute flex flex-col items-center justify-center">
        <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-medium text-slate-800 dark:text-slate-300">Are sure you want to submit your answers?</h3>
        <div className="w-11/12 flex items-center justify-center mt-6">
          <button
            className="w-full bg-rose-500 dark:bg-rose-600 text-rose-50 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base font-medium px-4 py-2 flex items-center justify-center rounded-md cursor-pointer shadow mr-4" 
            onClick={handleConfirm}>Confirm</button>
          <button
            className="w-full outline outline-rose-500 dark:outline-rose-600 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base font-medium text-rose-500 dark:text-rose-600 px-4 py-2 flex items-center justify-center rounded-md cursor-pointer shadow" 
            onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}