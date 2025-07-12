import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, isAuthChecked } = useSelector(s => s.auth);

  if (!isAuthChecked) {
    return <p>Checking session...</p>;
  }

  if (!user) return <Navigate to="/auth" replace />

 return children;
}