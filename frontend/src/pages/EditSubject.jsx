import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import AccessDenied from "../components/AccessDenied";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuizDetail, updateSubject } from "../features/quizSlice";

export default function EditSubject() {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const { loading, selectedQuiz } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuizDetail(id));
  }, [dispatch, id])

  useEffect(() => {
    if (selectedQuiz) {
      setFormData({
        title: selectedQuiz.title || "",
        description: selectedQuiz.description || ""
      })
    }
  }, [selectedQuiz]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const updatedData = {title: formData.title, description: formData.description}
      dispatch(updateSubject({id, updatedData})).unwrap();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }


  if (!user?.is_superuser) return <AccessDenied />

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 mx-auto">
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Subject Name"
        />
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Button
          type="submit"
          disabled={loading}
          name={loading ? 'Updating...' : 'Update Subject'}
        />
      </form>
    </div>
  );
}