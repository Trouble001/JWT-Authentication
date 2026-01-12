import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchQuizAttempt, submitAttempt } from "../features/quizSlice";
import Modal from "../components/Modal";

export default function QuizAttempt() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { selectedQuiz, loading } = useSelector((state) => state.quiz);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchQuizAttempt(quizId));
  }, [dispatch, quizId]);

  const handleSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  // const handleSubmit = () => {
  //   dispatch(submitAttempt({ quizId: selectedQuiz.id, answers }))
  //     .then(() => {
  //       navigate("/quiz-result");
  //       // dispatch(clearSelectedQuiz());
  //     });
  // };

  const handleSubmit = () => {
    setModalOpen(true);
  };

  return (
    <div className="w-full lg:w-10/12 xl:w-8/12 mx-auto bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-6 py-4 shadow-md rounded">
      {modalOpen && <Modal setModalOpen={setModalOpen} answers={answers} />}
      {selectedQuiz && (
        <div>
          <h2 className="text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium text-slate-900 dark:text-slate-200 text-center mb-4">{selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((question, index) => (
            <div className="mb-4" key={question.id}>
              <p className="text-sm sm:text-base md:text-md lg:text-lg xl:text-xl text-slate-900 dark:text-slate-200 font-medium mb-2">{index + 1}. {question.text}</p>
              <ul>
                {question.options.map((option) => (
                  <li className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-base text-slate-800 dark:text-slate-300 ml-5 flex items-center mb-2" key={option.id}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      onChange={() => handleSelect(question.id, option.id)}
                      className="mr-2 w-3 xl:w-3 h-3 xl:h-3 accent-rose-600"
                    />
                    {option.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <button
        className="bg-rose-500 dark:bg-rose-600 text-rose-50 text-sm sm:text-sm md:text-sm lg:text-base xl:text-base font-medium cursor-pointer px-6 sm:px-6 md:px-8 lg:px-8 xl:px-10 py-1 rounded-md shadow"
        onClick={handleSubmit}>{loading ? 'Submiting...' : 'Submit'}</button>
    </div>
  );
}