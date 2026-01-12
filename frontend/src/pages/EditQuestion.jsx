import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionById, updateQuestion } from "../features/quizSlice";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import AccessDenied from "../components/AccessDenied";

export default function EditQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, questionDetail } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ text: '', options: [] });
  const [correctOptionId, setCorrectOptionId] = useState(null);

  useEffect(() => {
    if (user.is_superuser) {
      dispatch(fetchQuestionById(id));
    }
  }, [user, dispatch, id]);

  useEffect(() => {
    if (questionDetail) {
      setFormData({
        text: questionDetail.text || '',
        options: questionDetail.options || [],
      });

      const correctOption = questionDetail.options.find(opt => opt.is_correct);
      if (correctOption) {
        setCorrectOptionId(correctOption.id);
      }
    }
  }, [questionDetail]);

  const handleChange = (e, index) => {
    const updatedOptions = formData.options.map((opt, i) => 
      i === index ? { ...opt, text: e.target.value } : opt
    );
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleCorrectChange = (optionId) => {
    setCorrectOptionId(optionId);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOptions = formData.options.map(opt=> ({
      ...opt,
      is_correct: opt.id === correctOptionId,
    }));

    const updatedData = {
      text: formData.text,
      options: updatedOptions,
    };

    console.log("Sending payload:", updatedData);
    dispatch(updateQuestion({ id, updatedData }));
    navigate("/");
  }

  if (!user?.is_superuser) return <AccessDenied />
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 mx-auto">
        <Input
          type="text"
          value={formData.text}
          onChange={(e) => setFormData({...formData, text: e.target.value })}
          placeholder="Enter Question"
        />
        {formData.options.map((option, index) => (
            <div key={option.id} className="w-full">
              <Input
                type="text"
                value={option.text}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Option ${index + 1}`}
                className="relative"
              />
              <input
                type="checkbox"
                checked={correctOptionId === option.id}
                onChange={() => handleCorrectChange(option.id)}
                name="correctOption"
                className="w-5 h-5 -ml-8 mt-3 absolute bg-rose-600 text-rose-600 accent-rose-500"
              />
            </div>
          ))}
        <Button
          type="submit"
          disabled={loading}
          name={loading ? 'Updating...' : 'Update Question'}
        />
      </form>
    </div>
  );
}
