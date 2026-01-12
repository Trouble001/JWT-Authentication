import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, fetchQuizzes } from "../features/quizSlice";
import { Link } from "react-router-dom";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";
import AccessDenied from "../components/AccessDenied";
import UserHome from "./UserHome";

export default function Home() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  const { quizzes } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (isAuthChecked && user) {
      dispatch(fetchQuizzes());
    }
  }, [user, isAuthChecked, dispatch]);

  useEffect(() => {
    console.log(quizzes);
  })

  const handleDelete = (quizId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteSubject(quizId));
      // navigate("/");
    }
  }

  if (!user?.is_superuser) return <UserHome quizzes={quizzes} />


  return (
    <table className="border-collapse w-full text-left text-xs md:text-sm lg:text-base xl:text-md table-auto border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-950">
      <thead className="">
        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-300">
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">S.N.</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Subject</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Description</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Total Questions</th>
          <th className="px-2 py-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {quizzes?.map((quiz, index) => (
        <tr key={quiz.id} className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300">
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{index + 1}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700"><Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link></td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{quiz.description}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{quiz.questions.length}</td>
          <td className="px-2 py-1 flex flex-row items-center justify-start">
            <Link className="mr-1" to={`/subjects/edit/${quiz.id}`}>
              <HiPencilSquare className="text-base md:text-md lg:text-lg xl:text-xl text-slate-900 dark:text-slate-300 drop-shadow" />
            </Link>
            <button onClick={() => handleDelete(quiz.id)} className="ml-1 cursor-pointer">
              <HiTrash className="text-base md:text-md lg:text-lg xl:text-xl text-rose-500 dark:text-rose-600 drop-shadow" />
            </button>
          </td>  
        </tr>
      ))}
      </tbody>
    </table>
  );
}
