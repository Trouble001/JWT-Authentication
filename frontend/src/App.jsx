import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/authSlice";
import { fetchQuizzes } from "./features/quizSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication";
import Toast from "./components/Toast";
import QuizAttempt from "./pages/QuizAttempt";
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetSuccess = lazy(() => import("./pages/ResetSuccess"));
const QuizDetail = lazy(() => import("./pages/QuizDetail"));
const QuizResult = lazy(() => import("./pages/QuizResult"));
const AddQuestion = lazy(() => import("./pages/AddQuestion"));
const EditQuestion = lazy(() => import("./pages/EditQuestion"));
const AddSubject = lazy(() => import("./pages/AddSubject"));
const Settings = lazy(() => import("./pages/Settings"));
const EditSubject = lazy(() => import("./pages/EditSubject"));
const Users = lazy(() => import("./pages/Users"));
const UpdateUser = lazy(() => import("./pages/UpdateUser"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Toast />
      <Authentication />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add-subject" element={<ProtectedRoute><AddSubject /></ProtectedRoute>} />
          <Route path="/add-question" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
          <Route path="/subjects/edit/:id" element={<ProtectedRoute><EditSubject /></ProtectedRoute>} />
          <Route path="/questions/edit/:id" element={<ProtectedRoute><EditQuestion /></ProtectedRoute>} />
          <Route path="/users/edit/:id" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

          <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizDetail /></ProtectedRoute>} />
          <Route path="/quiz-attempt/:quizId" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />

          <Route path="/quiz-result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
        </Routes>
        </Suspense>
    </BrowserRouter>
  );
}
