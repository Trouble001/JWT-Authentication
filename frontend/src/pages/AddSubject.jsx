import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addSubject } from "../features/quizSlice";
import AccessDenied from "../components/AccessDenied";

export default function AddSubject() {
  const { loading } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChnage = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description) {
        console.log("Please fill all the fields.");
      }
      dispatch(addSubject(formData)).unwrap();
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
          onChange={handleChnage}
          placeholder="Subject Name"
        />
        <Input
          type="text"
          name="description"
          value={formData.description} 
          onChange={handleChnage}
          placeholder="Description"
        />
        <Button
          type="submit"
          disabled={loading}
          name={loading ? 'Adding...' : 'Add Subject'}
        />
      </form>
    </div>
  );
}