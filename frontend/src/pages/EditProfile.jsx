import Input from "../components/Input";
import Button from "../components/Button";
import { HiUserCircle, HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../features/authSlice";
import Avatar from "../components/Avatar";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState({
    username: user.username || "",
    email: user.email || "",
    full_name: user.full_name || "",
    avatar: user.avatar || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));

    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("full_name", userData.full_name);
      if (userData.avatar instanceof File) {
        formData.append("avatar", userData.avatar);
      }
      dispatch(updateProfile(formData)).unwrap();
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-11/12 mx-auto bg-slate-950">
        <div className="w-full flex items-center justify-center flex-col mb-12">
          {userData.avatar ? (
            <Avatar src={preview ? `${preview}` : `http://localhost:8000${userData.avatar}`} alt={userData.full_name} />
          ) : (
            <HiUserCircle className="w-26 h-26 text-slate-800 dark:text-slate-200" />
          )}
          
          <label className="cursor-pointer">
            <HiPencilSquare className="text-md md:text-md lg:text-lg xl:text-xl text-slate-900 dark:text-slate-300 drop-shadow" />
            <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          </label>
        </div>
        <Input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <Input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          type="text"
          name="full_name"
          value={userData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <Button
          type="submit"
          name={loading ? 'Saving...' : 'Save'}
          disabled={loading}
        />
      </form>
    </div>
  );
}