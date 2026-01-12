import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteQuestion, fetchQuizDetail } from "../features/quizSlice";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";

export default function QuizDetail() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const { selectedQuiz, loading } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuizDetail(quizId));
  }, [dispatch, quizId]);

  const handleDelete = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion(questionId));
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <table className="border-collapse w-full text-left text-xs md:text-sm lg:text-base xl:text-md table-auto border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-950">
      <thead className="">
        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-300">
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">S.N.</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Question</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Option A</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Option B</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Option C</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Option D</th>

          <th className="px-2 py-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {selectedQuiz?.questions?.map((question, index) => (
        <tr key={index} className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300">
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{index + 1}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{question.text}</td>
          {question?.options?.map((option, index) => (
            <td key={index} className={`px-2 py-1 border-r border-slate-200 dark:border-slate-700 ${option.is_correct && 'text-green-500'}`}>{option.text}</td>
          ))}
          <td className="px-2 py-1 flex flex-row items-center justify-start">
            <Link className="mr-1" to={`/questions/edit/${question.id}`}>
              <HiPencilSquare className="text-base md:text-md lg:text-lg xl:text-xl text-slate-900 dark:text-slate-300 drop-shadow" />
            </Link>
            <button onClick={() => handleDelete(question.id)} className="ml-1 cursor-pointer">
              <HiTrash className="text-base md:text-md lg:text-lg xl:text-xl text-rose-500 dark:text-rose-600 drop-shadow" />
            </button>
          </td>   
        </tr>
      ))}
      </tbody>
    </table>
  );
}