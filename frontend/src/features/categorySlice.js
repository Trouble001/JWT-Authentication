import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import axios from "axios";


// Fetch all categories
export const fetchCategories = createAsyncThunk("quiz/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8000/quiz/");
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

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
  },
});

export default categorySlice.reducer;