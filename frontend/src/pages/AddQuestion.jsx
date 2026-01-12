import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, fetchQuizzes } from "../features/quizSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import AccessDenied from "../components/AccessDenied";

export default function AddQuestion() {
  const dispatch = useDispatch();
  const { loading, quizzes } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuizId || !questionText || options.some(opt => opt.trim() === "") || correctOptionIndex === null) {
      console.log("Please fill all the fields");
      return;
    }

    const payload = {
      quiz: selectedQuizId,
      text: questionText,
      options: options.map((option, index) => ({
        text: option,
        is_correct: index === correctOptionIndex
      }))
    };

    dispatch(addQuestion(payload)).unwrap();
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOptionIndex(null);
    // navigate("/add-question");
  };

  if (!user?.is_superuser) return <AccessDenied />
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 mx-auto">
        <select
          value={selectedQuizId}
          onChange={(e) => setSelectedQuizId(e.target.value)}
          className="bg-white dark:bg-slate-950 w-full px-4 py-2.5 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-800 outline-none mb-3 rounded-md"
        >
          <option value="">Subject</option>
          {quizzes.map((quiz) => (
            <option
              key={quiz.id}
              value={quiz.id}
              className="bg-white dark:bg-slate-950 w-full px-4 py-2 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-800 outline-none rounded-md"
            >
            {quiz.title}
            </option>
          ))}
        </select>
        <Input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter Question"
        />
        {options.map((option, index) => (
            <div key={index} className="w-full">
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="relative"
              />
              <input
                type="checkbox"
                name="correctOption"
                checked={correctOptionIndex === index}
                onChange={() => setCorrectOptionIndex(index)}
                className="w-5 h-5 -ml-8 mt-3 absolute bg-rose-600 text-rose-600 accent-rose-500"
              />
            </div>
          ))}
        <Button
          type="submit"
          disabled={loading}
          name={loading ? 'Adding...' : 'Add Question'}
        />
      </form>
    </div>
  );
}
