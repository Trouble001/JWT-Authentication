import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../features/authSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("logout/", {}, { withCredentials: true });
    dispatch(clearUser());
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p>Full Name: {user?.full_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
