import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Toast from "./components/Toast";
import ResetSuccess from "./pages/ResetSuccess";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
