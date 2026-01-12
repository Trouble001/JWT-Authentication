import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import quizReducer from "../features/quizSlice";
import categoryReducer from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    categories: categoryReducer,
  },
});