import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserDetail, updateUser } from "../features/authSlice";
import AccessDenied from "../components/AccessDenied";


export default function UpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userDetail, loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    username: "", email: "", full_name: "", is_active: false, is_staff: false, is_superuser: false
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (userDetail) {
      setUserData({
        username: userDetail.username || "",
        email: userDetail.email || "",
        full_name: userDetail.full_name || "",
        is_active: userDetail.is_active || false,
        is_staff: userDetail.is_staff || false,
        is_superuser: userDetail.is_superuser || false
      });
    }
  }, [userDetail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser({id: userDetail.id, userData})).unwrap();
      navigate("/users");
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
        <div className="w-full flex items-center justify-start mb-4 ml-2">
          <div className="flex items-center mr-4">
            <input className="w-4 h-4 mr-2 accent-rose-500 dark:accent-rose-600" type="checkbox" name="is_active" checked={userData.is_active} onChange={handleChange} />
            <p className="text-slate-800 dark:text-slate-200">Active</p>
          </div>
          <div className="flex items-center mr-4">
            <input className="w-4 h-4 mr-2 accent-rose-500 dark:accent-rose-600" type="checkbox" name="is_staff" checked={userData.is_staff} onChange={handleChange} />
            <p className="text-slate-800 dark:text-slate-200">Staff</p>
          </div>
          <div className="flex items-center mr-4">
            <input className="w-4 h-4 mr-2 accent-rose-500 dark:accent-rose-600" type="checkbox" name="is_superuser" checked={userData.is_superuser} onChange={handleChange} />
            <p className="text-slate-800 dark:text-slate-200">Admin</p>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          name={loading ? 'Updating...' : 'Update User'}
        />
      </form>
    </div>
  );
}