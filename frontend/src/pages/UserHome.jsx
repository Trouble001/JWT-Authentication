import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserHome({ quizzes }) {

  useEffect(() => {
    console.log(quizzes)
  }, []);

  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="border border-slate-300 rounded-md p-2 flex items-center justify-between">
          <h3 className="text-md">{quiz.title}</h3>
          <Link to={`/quiz-attempt/${quiz.id}`} className="text-rose-500">Attempt</Link>
        </div>
      ))}
    </div>
  );
}
