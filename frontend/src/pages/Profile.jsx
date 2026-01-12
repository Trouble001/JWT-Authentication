import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, logoutUser } from "../features/authSlice";
import { HiHome, HiPlusCircle, HiUserCircle, HiUserGroup, HiCog6Tooth } from "react-icons/hi2";
import { useEffect } from "react";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  })

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await dispatch(clearUser());
      navigate("/auth");
      console.log("Logged out");
    } catch (error) {
      console.error(error || "Logout failed");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {user.avatar ? <Avatar src={`http://localhost:8000${user.avatar}`} alt={user.full_name} /> : <HiUserCircle className="w-26 h-26 text-slate-800 dark:text-slate-200" />}
        
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">{user?.full_name}</h2>
        <p className="text-md text-slate-800 dark:text-slate-200">{user?.username}</p>
        <button className="bg-rose-500 px-6 py-1.5 mt-2 text-sm text-rose-50 font-medium rounded-lg shadow flex items-center justify-center hover:bg-rose-600 cursor-pointer" onClick={handleLogout}>{loading ? 'Logout...' : 'Logout'}</button>
        <Link to={'/profile/edit'} className="bg-rose-500 px-6 py-1.5 mt-2 text-sm text-rose-50 font-medium rounded-lg shadow flex items-center justify-center hover:bg-rose-600 cursor-pointer">Edit Profile</Link>
      </div>
    </div>
  );
}
