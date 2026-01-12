import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
// import { Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.quiz);

  if (!isAuthChecked) {
    return <p>Authenticating...</p>;
  }

  if (!user) return <Navigate to="/auth" replace />

 return (
  <div className="w-full min-h-screen relative bg-slate-50 dark:bg-slate-900">
    <Sidebar />
    {loading && <Loader />}
    <div className={`w-full lg:w-10/12 h-full top-0 right-0 absolute pt-16 md:pt-18 lg:pt-20 xl:pt-20 pb-8 px-2 md:px-4 lg:px-6 xl:px-8`}>
      {children}
    </div>
  </div>
 );
}