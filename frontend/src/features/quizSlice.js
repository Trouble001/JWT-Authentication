import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Fetch all quizzes
export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/quiz/", { withCredentials: true });
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch quiz detail
export const fetchQuizDetail = createAsyncThunk("quiz/fetchQuizDetail", async (quizId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`quiz/${quizId}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch quiz detail
export const fetchQuizAttempt = createAsyncThunk("quiz/fetchQuizAttempt", async (quizId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`quiz/quiz_attempt/${quizId}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Submit Attempt
export const submitAttempt = createAsyncThunk("quiz/submitAttempt", async ({ quizId, answers }, thunkAPI) => {
  const response = await axiosInstance.post("/quiz/submit/", {
    quiz_id: quizId,
    answers: answers,
  }, { withCredentials: true });
  return response.data;
});

// Add Question
export const addSubject = createAsyncThunk("quiz/addSubject", async (formData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/quiz/add_subject/", formData);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Add Question
export const addQuestion = createAsyncThunk("quiz/addQuestion", async (questionData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/quiz/add_question/", questionData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch Question By Id
export const fetchQuestionById = createAsyncThunk('quiz/fetchQuestionById', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/quiz/questions/${id}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Subject
export const updateSubject = createAsyncThunk('quiz/updateSubject', async ({id, updatedData}, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/quiz/${id}/`, updatedData);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete Subject
export const deleteSubject = createAsyncThunk('quiz/deleteSubject', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/quiz/${id}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Question
export const updateQuestion = createAsyncThunk('quiz/updateQuestion', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/quiz/questions/${id}/`, updatedData);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Question
export const deleteQuestion = createAsyncThunk('quiz/deleteQuestion', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/quiz/questions/${id}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    selectedQuiz: null,
    result: null,
    questionDetail: null,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null;
    },
    clearQuizMessages: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Quiz
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Quiz Deatils
      .addCase(fetchQuizDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuiz = action.payload;
      })
      .addCase(fetchQuizDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Quiz Deatils
      .addCase(fetchQuizAttempt.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuiz = action.payload;
      })
      .addCase(fetchQuizAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit Quiz Attempt
      .addCase(submitAttempt.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(submitAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Subject
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Question
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Question By Id
      .addCase(fetchQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.questionDetail = action.payload;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // Update Subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Subject Updated";
        state.selectedQuiz = action.payload.quiz;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Question
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Question Updated";
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Subject Deleted";

        const deletedQuizId = action.meta.arg;
        if (state.quizzes) {
          state.quizzes = state.quizzes.filter((q) => q.id !== deletedQuizId);
        }
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Question
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Question Deleted";

        const deletedId = action.meta.arg
        if(state.selectedQuiz && state.selectedQuiz.questions) {
          state.selectedQuiz.questions = state.selectedQuiz.questions.filter((q) => q.id !== deletedId);
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearSelectedQuiz, clearQuizMessages } = quizSlice.actions;
export default quizSlice.reducer;