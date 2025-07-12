import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, logoutUser } from "../features/authSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <h2>Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p>Full Name: {user?.full_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
